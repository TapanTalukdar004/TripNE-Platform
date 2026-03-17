import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import mongoose from "mongoose";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    if (!userId) {
      return NextResponse.json({ error: "Missing User ID in session" }, { status: 400 });
    }

    await dbConnect();
    const db = mongoose.connection.db;
    const user = await db!.collection('users').findOne({ _id: new mongoose.Types.ObjectId(userId) });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      connected: !!user.telegramChatId,
      telegramUsername: user.telegramUsername || null
    }, { status: 200 });

  } catch (error: any) {
    console.error("Telegram Status Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
