import { CreditCard, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Payments - TripNE",
};

export default function PaymentsPage() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-sm border border-zinc-100 dark:border-zinc-800">
      <div className="flex items-center gap-3 mb-8">
        <CreditCard size={24} className="text-blue-500" />
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Payment Methods</h2>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-950 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800 text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 mb-4 shadow-inner">
          <ShieldCheck size={32} />
        </div>
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Secure Checkout Enabled</h3>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
          TripNE utilizes enterprise-grade gateways (e.g., Razorpay/Stripe) to process all transactions securely. We do not persist raw card configurations internally.
        </p>
      </div>

      <div className="opacity-60 cursor-not-allowed group transition-opacity hover:opacity-100">
        <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-4">Saved Cards</h3>
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 text-center flex flex-col items-center justify-center gap-4 transition-colors group-hover:bg-zinc-50 dark:group-hover:bg-zinc-950">
          <CreditCard size={32} className="text-zinc-400 dark:text-zinc-600" />
          <p className="font-medium">You don't have any saved payment methods yet.</p>
        </div>
      </div>
    </div>
  );
}
