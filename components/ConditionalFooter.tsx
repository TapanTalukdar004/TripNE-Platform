"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();

  // Hide the footer completely on the login/signup auth route
  if (pathname === '/login') {
    return null;
  }

  return <Footer />;
}
