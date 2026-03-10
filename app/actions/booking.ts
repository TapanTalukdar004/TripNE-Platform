"use server";

import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function createBooking(formData: FormData) {
  const session = await getSession();
  
  if (!session) {
    redirect("/login");
  }

  const packageId = formData.get("packageId") as string;
  const numPeople = parseInt(formData.get("numPeople") as string) || 1;
  const pricePerPerson = parseFloat(formData.get("pricePerPerson") as string);

  if (!packageId || !pricePerPerson) {
    return { error: "Invalid booking data" };
  }

  const totalPrice = numPeople * pricePerPerson;

  await dbConnect();

  try {
    const newBooking = await Booking.create({
      userId: session.userId,
      packageId,
      numPeople,
      totalPrice,
      status: "pending_payment"
    });

    // We can redirect the user to their account page to see the booking
    redirect("/account?booking_status=success");
  } catch (error) {
    return { error: "Failed to process booking. Please try again later." };
  }
}
