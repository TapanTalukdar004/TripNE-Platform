import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb-adapter";

import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username / Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        await dbConnect();
        
        // Find user by either email or username to be flexible
        const user = await User.findOne({ 
          $or: [{ email: credentials.username }, { username: credentials.username }] 
        }).select("+passwordHash");

        if (!user || !user.passwordHash) {
          throw new Error("Invalid credentials");
        }

        const isMatch = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!isMatch) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user._id.toString(),
          name: user.username,
          email: user.email,
        };
      }
    })
  ],
  session: {
    // NextAuth requires JWT strategy when mixing OAuth with CredentialsProvider
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        
        // Fetch up-to-date telegram info
        try {
          await dbConnect();
          const dbUser = await User.findById(token.id).select('telegramChatId');
          if (dbUser) {
            (session.user as any).telegramChatId = dbUser.telegramChatId;
          }
        } catch (error) {
          console.error("Session callback DB error:", error);
        }
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
