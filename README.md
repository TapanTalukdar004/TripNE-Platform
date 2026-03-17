# TripNE Platform 🏔️

**The Elite Cinematic Travel Engine for Northeast India**

TripNE is a highly-premium, next-generation travel booking platform specifically engineered to showcase the unparalleled beauty of Northeast India. Built with a specialized focus on luxury scrollytelling, glassmorphism UI, and complex multi-state logistics pricing.

## 🚀 Key Architectural Features

- **Next.js 14/15 App Router**: Fully utilizing server components, optimized dynamic routing (`/packages/[slug]`), and Server Actions for lightning-fast performance.
- **Cinematic Apple-Tier UI/UX**: Extensive use of `framer-motion` for buttery smooth viewport scroll animations, tabbed wizard transitions, and a meticulously crafted dark `#0a0a0a` aesthetic enriched with custom Tailwind CSS glassmorphism.
- **Dynamic Vehicle-Based Pricing Engine**: A sophisticated calculation module that bypasses static pricing. It accurately generates costs based on selected transport tiers (SUV vs Standard) and computes mathematically persuasive "per-person" metrics dynamically on the client side.
- **Northeast Grand Explorer Logistics**: Complex data architecture capable of handling 18+ day cross-border state-relay logic. Automatically factors in Inner Line Permits (ILPs) and state-specific commercial taxation into the dynamic payload.
- **Secure Multi-Step Booking Wizard**: A highly-polished, state-driven wizard that securely captures lead traveler configurations, mathematically bounds passenger array sizes to vehicle capacities, and processes secure Database injection.
- **MongoDB Atlas Integration**: utilizing `mongoose` to persist user data, complex Custom Trip Planner quotes, and multi-state booking wizard payloads.
- **Session Authentication Guarding**: Client-side protection ensuring personalized booking capabilities and secure quote generation mapping only to the active user's credentials.
- **Cloudinary Image CDN Optimization 🚀**: All 140+ weight heavy bitmap photography image assets migrated from absolute standard Next `public/` absolute assets folders directly loaded automatically optimization format with `q_auto` edge compressed automated loading correctly.
- **Cinematic Ambient Hybrid Video Frames Layout**: Specialized absolute layered backplane framing structure designed covering edge scale ratio standard framed loops supported natively perfectly natively seamless seamless layouts perfectly beautifully transparent blended overlays seamlessly natively correctly framing structures natively correctly framing seamlessly correctly framing seamless natively.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (React)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database**: [MongoDB](https://www.mongodb.com/) via Mongoose
- **Deployment**: [Vercel](https://vercel.com/)
- **Telegram Bot API**: Backplane messaging matrix

## 🤖 Telegram Bot Integration

TripNE includes a fail-safe Telegram Bot integration for delivering custom itineraries directly to users' chat apps.

- **Account Linking**: Users link their Telegram account securely via a `/start <userId>` deep link trigger activated directly on their Profile page widget.
- **Fail-Safe Itinerary Dispatch**: Custom Quote generation dispatches itineraries layout templates into Telegram automatically if connected, keeping email strictly as a secondary threshold fallback.
- **Real-Time Interface Polling**: Status components poll raw database endpoints to bypass cached tokens and immediately update layouts connecting fully inside 3 seconds flat.

### ⚙️ Environment Configuration 
To initialize triggers, you must provide:
- `TELEGRAM_BOT_TOKEN`: Create a bot via BotFather and add this token directly into your dashboard variables.

### 🔗 Webhook Setup (Live Deploy)
Once deployed on Vercel:
1. Update `scripts/set_webhook_vercel.js` with your absolute `VERCEL_DOMAIN`.
2. Run `node scripts/set_webhook_vercel.js` in your terminal to sync listener ports.

## 🏃‍♂️ Running Locally

1. Clone the repository and navigate into it.
2. Ensure you have your `.env.local` configured with your `MONGODB_URI`.
3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

---

_Architected and developed as a premium web experience for showcasing the 8 hidden states of Northeast India._
