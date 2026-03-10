import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

import Navbar from "@/components/Navbar";
import ConditionalFooter from "@/components/ConditionalFooter";
import AuthProvider from "@/components/AuthProvider";
import { getSession } from "@/lib/session";
import ChatWidget from "@/components/ChatWidget";
import Preloader from "@/components/Preloader";

export const metadata: Metadata = {
  title: "TripNE - Explore Northeast India",
  description: "Wander More, Spend Less. Explore the eight jewels of Northeast India with TripNE.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} antialiased font-sans`} suppressHydrationWarning>
        <Preloader />
        <AuthProvider>
          <SmoothScroll>
            <Navbar />
            {children}
            <ConditionalFooter />
          </SmoothScroll>
        </AuthProvider>
        <ChatWidget />
        <Toaster position="bottom-right" theme="dark" richColors />
      </body>
    </html>
  );
}
