import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const newBooking = await Booking.create(body);

    return NextResponse.json(
      { success: true, bookingId: newBooking._id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Booking Creation Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create booking" },
      { status: 500 }
    );
  }
}
