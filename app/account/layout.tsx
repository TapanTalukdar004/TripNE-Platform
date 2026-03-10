import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { UserCircle, CalendarDays, User, CreditCard } from "lucide-react";
import Link from "next/link";

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-24 md:pt-32 pb-12 md:pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Profile Section */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 shadow-sm border border-zinc-100 dark:border-zinc-800 mb-8 md:mb-10 flex flex-col md:flex-row items-center text-center md:text-left gap-4 md:gap-6">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 overflow-hidden border border-zinc-200 dark:border-zinc-700">
            {session.user.image ? (
               <img src={session.user.image} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
               <UserCircle size={48} />
            )}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-1 md:mb-2">Hello, {session.user.name?.split(' ')[0] || "Traveler"}!</h1>
            <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400">Welcome back to your personalized TripNE dashboard.</p>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 shrink-0">
            <nav className="flex flex-col gap-2">
              <Link href="/account/profile" className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <User size={20} /> My Profile
              </Link>
              <Link href="/account/bookings" className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <CalendarDays size={20} /> My Bookings
              </Link>
              <Link href="/account/payments" className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <CreditCard size={20} /> Payments
              </Link>
            </nav>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1">
            {children}
          </div>

        </div>
      </div>
    </main>
  );
}
