"use server";

import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function signupUser(formData: FormData) {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const firstName = formData.get("firstName") as string || "";
  const lastName = formData.get("lastName") as string || "";

  if (!username || !email || !password) {
    return { error: "Username, email, and password are required" };
  }

  await dbConnect();

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    if (!existingUser.passwordHash && existingUser.email === email) {
      return { error: "This email is registered securely via Google. Please click 'Continue with Google' below to sign in." };
    }
    return { error: "User already exists with that email or username" };
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  const name = `${firstName} ${lastName}`.trim();

  await User.create({
    name: name || username,
    username,
    email,
    passwordHash,
  });

  // Notice we no longer create the custom cookie or redirect here.
  // NextAuth handles this on the client-side seamlessly via signIn('credentials')
  return { success: true };
}
