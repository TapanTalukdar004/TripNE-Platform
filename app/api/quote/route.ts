import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import TripQuery from '@/models/TripQuery';
import { generateText } from 'ai';
import { createGroq } from '@ai-sdk/groq';
import { Resend } from 'resend';
import { TripQuoteEmail } from '@/components/emails/TripQuoteEmail';
import { render } from '@react-email/render';
import User from '@/models/User';
import mongoose from 'mongoose';

const resend = new Resend(process.env.RESEND_API_KEY);
const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerName, customerEmail, destinations, duration, accommodation, travelVision } = body;

    if (!customerName || !customerEmail) {
      return NextResponse.json({ error: 'Name and Email are required.' }, { status: 400 });
    }

    // Step 1: Database Ingestion
    await dbConnect();
    const newQuery = await TripQuery.create({
      customerName,
      customerEmail,
      destinations: destinations || [],
      duration: duration || '',
      accommodation: accommodation || '',
      travelVision: travelVision || '',
      status: 'PENDING'
    });

    // Step 2: AI Processing
    await TripQuery.findByIdAndUpdate(newQuery._id, { status: 'PROCESSING' });

    const promptText = `User Profile:
Name: ${customerName}
Destinations: ${destinations?.join(', ') || 'Northeast India'}
Duration: ${duration || 'Flexible'}
Accommodation: ${accommodation || 'Flexible'}
Custom Vision/Notes: ${travelVision || 'None provided'}

Task: You are an elite travel planner for TripNE (Northeast India). Generate a concise, highly realistic day-by-day itinerary and an estimated price in INR (₹) based on the user's request. Format the output strictly as clean HTML suitable for an email body (e.g., use <h3>, <ul>, <li>, <strong>, <p>). Do not include <html> or <body> tags, just the inner HTML snippet.`;

    const { text: aiGeneratedHtml } = await generateText({
      model: groq('llama-3.3-70b-versatile') as any,
      system: "You are the elite travel concierge for TripNE, specializing exclusively in Northeast India. You are polite, highly knowledgeable, and your goal is to help users plan their dream trips.",
      prompt: promptText,
    });

    // Step 3: Email Delivery (FAIL-SAFE)
    let emailSent = false;
    try {
      const emailHtml = await render(
        TripQuoteEmail({
          customerName,
          destinations: destinations?.join(', ') || 'Northeast India',
          duration: duration || 'your trip',
          aiGeneratedQuote: aiGeneratedHtml
        })
      );

      const emailResponse = await resend.emails.send({
        from: 'TripNE Concierge <onboarding@resend.dev>', // Resend testing domain
        to: [customerEmail],
        subject: 'Your Custom TripNE Itinerary is Ready!',
        html: emailHtml,
      });

      if (emailResponse.error) {
        console.error('Resend Error:', emailResponse.error);
        // Do not throw, continue execution
      } else {
        emailSent = true;
      }
    } catch (emailError: any) {
      console.error('Resend Email Crash Error:', emailError);
    }

    // Step 3b: Telegram Delivery
    try {
      // Find user using RAW MongoDB to avoid Mongoose schema caching filters
      const db = mongoose.connection.db;
      const dbUser = await db!.collection('users').findOne({ email: customerEmail.toLowerCase().trim() });
      if (dbUser && dbUser.telegramChatId) {
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        if (botToken) {
          const telegramText = formatForTelegram(aiGeneratedHtml);
          const telegramMessage = `✨ **Your Custom TripNE Itinerary is Ready!** ✨\n\n` + telegramText;

          // Split message if too long for Telegram (Limit 4096)
          let finalMessage = telegramMessage;
          if (finalMessage.length > 4000) {
             finalMessage = finalMessage.slice(0, 4000) + "\n\n... (Check your email for full details!)";
          }

          const tgResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: dbUser.telegramChatId,
              text: finalMessage,
              parse_mode: 'HTML', 
            }),
          });
          
          if (!tgResponse.ok) {
            console.error("Telegram API Failed:", await tgResponse.text());
          } else {
            console.log("Telegram message sent successfully to:", dbUser.telegramChatId);
          }
        }
      }
    } catch (tgError) {
      console.error("Telegram Delivery Error in Quote Pipeline:", tgError);
    }

    // Step 4: Database Finalization
    await TripQuery.findByIdAndUpdate(newQuery._id, {
      status: 'COMPLETED',
      aiGeneratedQuote: aiGeneratedHtml,
      isEmailedToUser: emailSent
    });

    return NextResponse.json({ success: true, message: 'Quote processed.' }, { status: 200 });

  } catch (error: any) {
    console.error('Custom Quote Pipeline Error:', error);
    
    // Attempt Fallback Updates (Fail-Safe)
    try {
      // Find the most recently pending/processing document matching the email within the last few seconds
      // A more robust implementation would pass the ID securely if possible
    } catch (dbError) {
      console.error('Fallback DB Update Error:', dbError);
    }

    return NextResponse.json({ error: error?.message || 'Internal Server Error' }, { status: 500 });
  }
}

function formatForTelegram(html: string): string {
  if (!html) return "";

  let text = html;

  // 1. Replace <h3> with bold and newline
  text = text.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n<b>$1</b>\n');
  
  // 2. Replace <p> with newlines
  text = text.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n');

  // 3. Handle lists
  text = text.replace(/<ul[^>]*>(.*?)<\/ul>/gi, '$1\n');
  text = text.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n');

  // 4. Handle standard formatting
  text = text.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '<b>$1</b>');
  text = text.replace(/<b[^>]*>(.*?)<\/b>/gi, '<b>$1</b>');
  text = text.replace(/<i[^>]*>(.*?)<\/i>/gi, '<i>$1</i>');
  text = text.replace(/<em[^>]*>(.*?)<\/em>/gi, '<i>$1</i>');

  // 5. Remove any other tags (e.g., div, span, etc.) to prevent parse errors
  text = text.replace(/<[^>]+>/g, '');

  // 6. Clean up multiple newlines
  text = text.replace(/\n{3,}/g, '\n\n').trim();

  return text;
}
