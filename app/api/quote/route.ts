import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import TripQuery from '@/models/TripQuery';
import { generateText } from 'ai';
import { createGroq } from '@ai-sdk/groq';
import { Resend } from 'resend';
import { TripQuoteEmail } from '@/components/emails/TripQuoteEmail';
import { render } from '@react-email/render';

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

    // Step 3: Email Delivery (TESTING MODE)
    // Render the React Email component to pure HTML
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
      throw new Error(`Failed to send email: ${emailResponse.error.message}`);
    }

    // Step 4: Database Finalization
    await TripQuery.findByIdAndUpdate(newQuery._id, {
      status: 'COMPLETED',
      aiGeneratedQuote: aiGeneratedHtml,
      isEmailedToUser: true
    });

    return NextResponse.json({ success: true, message: 'Quote generated and emailed.' }, { status: 200 });

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
