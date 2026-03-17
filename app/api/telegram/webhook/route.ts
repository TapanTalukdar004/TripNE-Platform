import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import mongoose from 'mongoose';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // console.log("Telegram Webhook Body:", JSON.stringify(body, null, 2));

    const message = body.message;
    if (!message || !message.text) {
      return NextResponse.json({ ok: true }); // Always respond 200 to Telegram
    }

    const chatId = message.chat.id;
    const text = message.text;

    // Handle /start command with parameter (e.g., /start <userId>)
    if (text.startsWith('/start')) {
      const parts = text.split(' ');
      if (parts.length > 1) {
        const userId = parts[1]; // MongoDB ObjectId string
        
        await dbConnect();
        
        // 1. Verify user exists
        const user = await User.findById(userId);
        if (!user) {
          await sendTelegramMessage(chatId, "❌ **User account not found.**\n\nPlease try connecting again from the Profile page on our website.");
          return NextResponse.json({ ok: true });
        }

        // 2. Update user with chat ID Using RAW MongoDB to bypass Mongoose Strict mode
        await mongoose.connection.db!.collection('users').updateOne(
          { _id: new mongoose.Types.ObjectId(userId) },
          { 
            $set: { 
              telegramChatId: chatId.toString(),
              telegramUsername: message.from?.username || ''
            } 
          }
        );

        await sendTelegramMessage(chatId, "✅ **Connected with TripNE!**\n\nYou will now receive your custom quotes and itineraries directly here in Telegram.");
      } else {
        await sendTelegramMessage(chatId, "Welcome to **TripNE Support Bot**! 🏔️\n\nTo connect your account, please visit the **Profile page** on our website and click 'Connect Telegram'.");
      }
    }

    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error("Telegram Webhook Error:", error);
    return NextResponse.json({ ok: true }); // Return OK to avoid Telegram re-sending retries on code errors
  }
}

async function sendTelegramMessage(chatId: string | number, text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return;

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: 'Markdown', // Enable bold/italic
    }),
  });
}
