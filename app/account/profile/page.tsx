"use client";

import { useState, useEffect } from "react";
import { User, Phone, Mail, Save, Edit2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "+91 98765 43210", // Concept Placeholder
  });

  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || "",
        email: session.user.email || "",
        phone: "+91 98765 43210", 
      });
    }
  }, [session]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    toast.success("Profile updated successfully!");
    // Wait for the AI backend implementation to actually wire updates
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-sm border border-zinc-100 dark:border-zinc-800">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <User size={24} className="text-blue-500" /> My Profile
        </h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 px-4 py-2 rounded-full transition-colors"
        >
          {isEditing ? <span className="text-zinc-600 dark:text-zinc-400">Cancel</span> : <><Edit2 size={16} /> Edit Profile</>}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                <User size={18} />
              </div>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-zinc-900 dark:text-zinc-100 disabled:opacity-70 disabled:bg-zinc-100 dark:disabled:bg-zinc-900 transition-colors"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Phone Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                <Phone size={18} />
              </div>
              <input
                type="tel"
                disabled={!isEditing}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-zinc-900 dark:text-zinc-100 disabled:opacity-70 disabled:bg-zinc-100 dark:disabled:bg-zinc-900 transition-colors"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                <Mail size={18} />
              </div>
              <input
                type="email"
                disabled={!isEditing}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-zinc-900 dark:text-zinc-100 disabled:opacity-70 disabled:bg-zinc-100 dark:disabled:bg-zinc-900 transition-colors"
                title="Emails linked via Google OAuth cannot be changed."
              />
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-md shadow-blue-500/20 active:scale-95"
            >
              <Save size={18} /> Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
