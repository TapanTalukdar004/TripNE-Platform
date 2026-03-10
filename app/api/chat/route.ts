import { generateText } from 'ai';
import { createGroq } from '@ai-sdk/groq';

// Initialize the provider
const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const { text } = await generateText({
    model: groq('llama-3.3-70b-versatile') as any,
    messages,
    system: "You are the elite travel concierge for TripNE, specializing exclusively in Northeast India. Your responses must be incredibly crisp, punchy, and highly structured. Rule 1: NEVER write long introductory or concluding paragraphs. Rule 2: Use Markdown formatting heavily (bolding, bullet points) to make information scannable. Rule 3: For itineraries, write a maximum of 2 short sentences per day. Cut the fluff. Deliver high-value, direct travel facts, prices, and logistics."
  });

  // Return standard JSON to avoid streaming disconnects
  return Response.json({ text }); 
}
