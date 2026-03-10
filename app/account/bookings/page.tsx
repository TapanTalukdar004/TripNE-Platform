import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { CalendarDays, ArrowRight } from "lucide-react";
import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";

export const metadata = {
  title: "My Bookings - TripNE",
};

export default async function BookingsPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) return null;

  await dbConnect();
  
  const userId = (session.user as any).id;
  
  // Fetch user bookings natively
  const bookings = await Booking.find({ userId: userId }).sort({ bookingDate: -1 }).lean();

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-sm border border-zinc-100 dark:border-zinc-800">
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2 mb-8">
        <CalendarDays size={24} className="text-blue-500" /> My Bookings
      </h2>
      
      {bookings.length === 0 ? (
        <div className="bg-zinc-50 dark:bg-zinc-950 rounded-2xl p-12 text-center border border-zinc-100 dark:border-zinc-800 shadow-sm">
          <p className="text-zinc-500 dark:text-zinc-400 text-lg mb-6">You don't have any bookings yet.</p>
          <Link 
            href="/packages"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold transition-all shadow-md shadow-blue-500/20"
          >
            Explore Packages <ArrowRight size={18} />
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking: any) => (
            <div key={booking._id.toString()} className="bg-zinc-50 dark:bg-zinc-950 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-6 hover:shadow-md transition-shadow">
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">
                  Package ID: <span className="text-blue-600 dark:text-blue-400 font-mono tracking-tight">{booking.packageId}</span>
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                  Booked on: {new Date(booking.bookingDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 sm:gap-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl">
                <div className="text-center min-w-[60px]">
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mb-1">Travelers</p>
                  <p className="font-bold text-zinc-900 dark:text-white">{booking.numPeople}</p>
                </div>
                <div className="w-[1px] h-8 bg-zinc-200 dark:bg-zinc-800 hidden sm:block" />
                <div className="text-center min-w-[80px]">
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mb-1">Total Price</p>
                  <p className="font-bold text-zinc-900 dark:text-white">₹{booking.totalPrice.toLocaleString()}</p>
                </div>
                <div className="w-[1px] h-8 bg-zinc-200 dark:bg-zinc-800 hidden sm:block" />
                <div className="text-center min-w-[80px]">
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mb-1">Status</p>
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold leading-none ${
                    booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                    : booking.status === 'cancelled' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                  }`}>
                    {booking.status.replace("_", " ")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
