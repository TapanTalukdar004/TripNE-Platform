"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signupUser } from "@/app/actions/auth";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const BACKGROUND_IMAGES = [
  '/images/head2.jpg',
  '/images/head8.jpg',
  '/images/img1.jpg'
];

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const emailOrUsername = formData.get(isLogin ? "username" : "email") as string;
    const password = formData.get("password") as string;
    
    // For Signups, we need to extract the extra fields
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const newUsername = formData.get("username") as string;

    try {
      if (!isLogin) {
        // Run the custom server action to physically create the User document in MongoDB
        const res = await signupUser(formData);
        if (res?.error) {
          toast.error(res.error);
          return;
        }
        
        // If signup worked, automatically log them in using NextAuth underneath!
        const signInRes = await signIn("credentials", {
          redirect: false,
          username: emailOrUsername,
          password: password,
        });

        if (signInRes?.error) {
          toast.error(signInRes.error);
        } else {
          router.push("/");
          router.refresh();
        }
      } else {
        // Direct Login Flow
        const signInRes = await signIn("credentials", {
          redirect: false,
          username: emailOrUsername, // This acts as either email or username in our backend logic
          password: password,
        });

        if (signInRes?.error) {
          toast.error("Invalid credentials. Please try again.");
        } else {
          router.push("/");
          router.refresh();
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <main className="min-h-screen bg-[#333338] dark:bg-[#1a1a1f] flex justify-center pt-28 pb-12 px-4 sm:px-8 font-sans">
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[1050px] bg-[#232328] rounded-[24px] shadow-2xl flex flex-col md:flex-row overflow-hidden border border-zinc-800"
      >
        {/* Left Side - Image Board with Auto-Slider */}
        <div className="hidden md:flex md:w-5/12 relative overflow-hidden bg-[#1a1a1f]">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${BACKGROUND_IMAGES[currentImageIndex]}')` }}
            />
          </AnimatePresence>
          {/* Subtle gradient overlay to match aesthetic */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#232328] via-[#232328]/20 to-[#232328]/80 mix-blend-overlay opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1f] via-transparent to-transparent opacity-90" />
          
          <div className="absolute top-8 left-8 flex items-center gap-2">
            <span className="font-serif font-bold text-white text-2xl tracking-tight">TRIP<span className="text-blue-500">NE</span></span>
          </div>

          <Link href="/" className="absolute top-8 right-6 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white text-xs px-5 py-2 rounded-full flex items-center gap-2 transition-colors">
             Back to website <ArrowLeft size={12} className="rotate-180" />
          </Link>

          <div className="absolute bottom-12 left-8 right-8 text-center text-white">
            <h2 className="text-3xl font-serif mb-3 leading-tight tracking-tight drop-shadow-lg">
              Capturing Moments, <br/> Creating Memories
            </h2>
            <div className="flex justify-center gap-2 mt-6">
              {BACKGROUND_IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  className={`h-1 rounded-full transition-all duration-500 cursor-pointer ${
                    i === currentImageIndex ? 'w-8 bg-white' : 'w-4 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-7/12 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
          
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-semibold text-white mb-3">
              {isLogin ? "Sign in to TripNE" : "Create an account"}
            </h1>
            <p className="text-[#a0a0a5] text-sm">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                type="button" 
                onClick={() => setIsLogin(!isLogin)} 
                className="text-[#7c5ce5] hover:text-[#9e83f5] underline underline-offset-4 decoration-[#7c5ce5]/40 font-medium transition-colors"
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <AnimatePresence mode="popLayout">
              {!isLogin && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex gap-4 overflow-hidden"
                >
                  <div className="w-1/2">
                    <input 
                      name="firstName"
                      type="text" 
                      required={!isLogin} 
                      className="w-full bg-[#2a2a32] border border-transparent rounded-[12px] px-5 py-4 text-zinc-200 text-sm focus:outline-none focus:border-[#5a48ab] focus:ring-1 focus:ring-[#5a48ab] transition-all placeholder:text-[#6a6a72]"
                      placeholder="First name"
                    />
                  </div>
                  <div className="w-1/2">
                    <input 
                      name="lastName"
                      type="text" 
                      required={!isLogin}
                      className="w-full bg-[#2a2a32] border border-transparent rounded-[12px] px-5 py-4 text-zinc-200 text-sm focus:outline-none focus:border-[#5a48ab] focus:ring-1 focus:ring-[#5a48ab] transition-all placeholder:text-[#6a6a72]"
                      placeholder="Last name"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <input 
                name={isLogin ? "username" : "email"}
                type={isLogin ? "text" : "email"} 
                required 
                className="w-full bg-[#2a2a32] border border-transparent rounded-[12px] px-5 py-4 text-zinc-200 text-sm focus:outline-none focus:border-[#5a48ab] focus:ring-1 focus:ring-[#5a48ab] transition-all placeholder:text-[#6a6a72]"
                placeholder={isLogin ? "Username" : "Email address"}
              />
            </div>

            <div className="relative">
              <input 
                name="password"
                type={showPassword ? "text" : "password"} 
                required 
                className="w-full bg-[#2a2a32] border border-transparent rounded-[12px] px-5 py-4 text-zinc-200 text-sm focus:outline-none focus:border-[#5a48ab] focus:ring-1 focus:ring-[#5a48ab] transition-all placeholder:text-[#6a6a72]"
                placeholder={isLogin ? "Password" : "Enter your password"}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-[#6a6a72] hover:text-zinc-300 transition-colors"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <AnimatePresence mode="popLayout">
              {!isLogin && (
                 <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-3 pt-4 overflow-hidden"
                 >
                   <input 
                     name="username"
                     type="text" 
                     required={!isLogin} 
                     className="w-full bg-[#2a2a32] border border-transparent rounded-[12px] px-5 py-4 text-zinc-200 text-sm focus:outline-none focus:border-[#5a48ab] focus:ring-1 focus:ring-[#5a48ab] transition-all placeholder:text-[#6a6a72]"
                     placeholder="Choose a username"
                   />
                 </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="popLayout">
              {!isLogin && (
                 <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-3 pt-2 overflow-hidden"
                 >
                   <input type="checkbox" id="terms" required={!isLogin} className="w-4 h-4 rounded-sm bg-[#2a2a32] border-transparent text-[#7c5ce5] focus:ring-[#7c5ce5] focus:ring-offset-0 cursor-pointer" />
                   <label htmlFor="terms" className="text-xs text-[#a0a0a5] cursor-pointer">
                     I agree to the <Link href="/terms" className="text-[#a0a0a5] underline hover:text-white transition-colors">Terms & Conditions</Link>
                   </label>
                 </motion.div>
              )}
            </AnimatePresence>

            <button 
              type="submit"
              className="w-full py-4 mt-8 bg-[#7c5ce5] hover:bg-[#6b4bd4] text-white rounded-[12px] text-sm font-semibold transition-colors active:scale-[0.98]"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="mt-10 flex items-center gap-4">
            <div className="h-px bg-[#35353d] flex-1"></div>
            <span className="text-[11px] text-[#6a6a72] uppercase tracking-wider font-semibold">Or continue with</span>
            <div className="h-px bg-[#35353d] flex-1"></div>
          </div>

          <div className="mt-8 flex gap-4">
            <a 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                signIn('google', { callbackUrl: '/' });
              }}
              className="flex-1 flex items-center justify-center gap-3 bg-transparent border border-[#35353d] hover:bg-[#2a2a32] hover:border-[#45454d] text-zinc-300 rounded-[12px] py-3.5 text-sm font-medium transition-all cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
              </svg>
              Google
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="flex-1 flex items-center justify-center gap-3 bg-transparent border border-[#35353d] hover:bg-[#2a2a32] hover:border-[#45454d] text-zinc-300 rounded-[12px] py-3.5 text-sm font-medium transition-all cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.19 2.31-.88 3.5-1.02 1.53-.19 2.93.43 3.84 1.6-3.1 1.77-2.5 5.79.52 7.02-.75 1.83-1.61 3.4-2.94 4.57zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              Apple
            </a>
          </div>

        </div>
      </motion.div>

    </main>
  );
}
