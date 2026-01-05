'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowRight, Leaf, ShieldAlert, Zap, Home, Building2, 
  Radio, CloudLightning, Globe2, Lock, 
  ScanLine, BarChart3, Wifi, Battery, Fingerprint, Loader2,
  LayoutGrid // <--- Fixed: Added this import
} from "lucide-react";
import { Outfit, Inter } from "next/font/google";
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  PanInfo,
  useMotionValue
} from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// 1. Font Configuration
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// ==============================================================================
// UTILITIES
// ==============================================================================

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ==============================================================================
// COMPONENT 1: MOBILE VIEW
// ==============================================================================

function MobileView() {
  const [step, setStep] = useState<number>(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  
  // Data & Config for Slides
  const slides = [
    {
      id: 0,
      color: "emerald",
      icon: <Leaf className="text-emerald-400" />,
      title: "Eco Intelligence",
      subtitle: "Real-time carbon footprint tracking.",
      stat: "-32% CO₂",
      statLabel: "This Month"
    },
    {
      id: 1,
      color: "amber",
      icon: <ScanLine className="text-amber-400" />,
      title: "Bill Scanner",
      subtitle: "AI breaks down your utility costs.",
      stat: "$142.50",
      statLabel: "Est. Savings"
    },
    {
      id: 2,
      color: "blue",
      icon: <BarChart3 className="text-blue-400" />,
      title: "Community Sync",
      subtitle: "Compare usage with neighbors.",
      stat: "Top 10%",
      statLabel: "Efficiency Rank"
    },
    {
      id: 3,
      color: "rose",
      icon: <Radio className="text-rose-400" />,
      title: "Crisis Mode",
      subtitle: "Offline alerts during grid failure.",
      stat: "ACTIVE",
      statLabel: "Low Bandwidth"
    }
  ];

// Gesture Handler for Swiping
  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
    const swipeConfidenceThreshold = 10000;
    const swipePower = Math.abs(offset.x) * velocity.x;

    if (swipePower < -swipeConfidenceThreshold && step < 4) {
      setDirection(1);
      setStep(step + 1);
    } else if (swipePower > swipeConfidenceThreshold && step > 0) {
      setDirection(-1);
      setStep(step - 1);
    }
  };
  const currentSlide = slides[Math.min(step, 3)];

  return (
    <div className="font-sans h-[100dvh] w-full bg-black text-white overflow-hidden relative flex flex-col">
      
      {/* Dynamic Background Glow */}
      <motion.div 
        animate={{ backgroundColor: step === 0 ? '#064e3b' : step === 1 ? '#78350f' : step === 2 ? '#1e3a8a' : step === 3 ? '#881337' : '#000' }}
        className="absolute -top-[20%] -left-[20%] w-[140%] h-[60%] blur-[120px] opacity-40 transition-colors duration-700"
      />

      {/* Header / Progress */}
      <div className="relative z-20 pt-6 px-6 flex justify-between items-center">
         <div className="flex gap-2 items-center">
            <div className="w-8 h-8 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10">
               {step < 4 ? currentSlide.icon : <Fingerprint className="text-emerald-400"/>}
            </div>
            <span className="font-display font-bold text-sm tracking-widest uppercase opacity-70">Savera</span>
         </div>
         {step < 4 && (
             <div className="flex gap-1">
               {[0,1,2,3].map(i => (
                 <motion.div 
                   key={i}
                   animate={{ 
                     width: i === step ? 24 : 6,
                     backgroundColor: i === step ? "#fff" : "rgba(255,255,255,0.2)"
                   }}
                   className="h-1.5 rounded-full"
                 />
               ))}
             </div>
         )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative z-10 flex flex-col justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          {step < 4 ? (
            <motion.div
              key={step}
              custom={direction}
              variants={{
                enter: (direction: number) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
                center: { zIndex: 1, x: 0, opacity: 1 },
                exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 1000 : -1000, opacity: 0 })
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={handleDragEnd}
              className="absolute inset-0 flex flex-col justify-center px-6"
            >
              {/* 1. VISUAL WIDGET SECTION */}
              <div className="flex-1 flex items-center justify-center py-8">
                 <MobileWidget step={step} />
              </div>

              {/* 2. TEXT CONTENT SECTION */}
              <div className="pb-12 space-y-6">
                 {/* Live Stat Pill */}
                 <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-xl px-4 py-2 rounded-full">
                    <span className={`text-${currentSlide.color}-400 font-bold font-mono`}>{currentSlide.stat}</span>
                    <span className="w-[1px] h-4 bg-white/20"/>
                    <span className="text-xs text-white/50 uppercase tracking-wider">{currentSlide.statLabel}</span>
                 </div>

                 <div>
                   <h1 className="text-5xl font-black font-display leading-[0.9] mb-4">{currentSlide.title}</h1>
                   <p className="text-lg text-white/60 leading-relaxed max-w-[90%]">{currentSlide.subtitle}</p>
                 </div>

                 {/* Swipe Indicator */}
                 <div className="flex items-center gap-2 text-white/30 text-sm font-medium animate-pulse">
                    <span>Swipe to explore</span>
                    <ArrowRight className="w-4 h-4" />
                 </div>
              </div>
            </motion.div>
          ) : (
            // 3. ROLE SELECTION SCREEN (Replaces Auth)
            <RoleSelectionStep key="roles" />
          )}
        </AnimatePresence>
      </div>

      {/* Skip Button (Only on slides) */}
      {step < 4 && (
        <div className="absolute bottom-8 right-6 z-20">
          <button 
             onClick={() => setStep(4)}
             className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all"
          >
             <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------
// Sub-Component: Role Selection (Interactive)
// ----------------------------------------------------------------------
function RoleSelectionStep() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (roleId: string) => {
    setSelected(roleId);
    // Simulate short delay for animation, then redirect
    setTimeout(() => {
      router.push("/auth");
    }, 600);
  };

  const roles = [
    { 
      id: 'individual', 
      icon: <Home className="w-6 h-6" />, 
      title: "Individual / Household", 
      desc: "Track bills & save energy." 
    },
    { 
      id: 'community', 
      icon: <Building2 className="w-6 h-6" />, 
      title: "Community Manager", 
      desc: "Manage school or office complex." 
    },
    { 
      id: 'gov', 
      icon: <LayoutGrid className="w-6 h-6" />, 
      title: "Gov / Utility Provider", 
      desc: "Regional data & planning tools." 
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="absolute inset-0 flex flex-col px-6 pt-24 bg-[#050B08] z-30"
    >
      <div className="space-y-2 mb-10">
        <span className="text-emerald-500 font-bold tracking-wider text-xs uppercase">Configuration</span>
        <h2 className="text-3xl font-bold font-display text-white">How will you use Savera?</h2>
      </div>

      <div className="space-y-4">
        {roles.map((role, idx) => (
          <motion.button
            key={role.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => handleSelect(role.id)}
            disabled={selected !== null}
            className={`w-full flex items-center gap-4 p-5 rounded-2xl border text-left transition-all group relative overflow-hidden
              ${selected === role.id 
                ? "bg-emerald-500 border-emerald-500 text-black scale-[0.98]" 
                : "bg-[#0A0F0D] border-white/10 text-white hover:border-emerald-500/50 hover:bg-emerald-900/10 active:scale-95"
              }`}
          >
             {/* Loading Spinner Overlay */}
             {selected === role.id && (
               <motion.div 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                 className="absolute inset-0 bg-emerald-500 flex items-center justify-center z-10"
               >
                 <Loader2 className="w-6 h-6 animate-spin text-black" />
               </motion.div>
             )}

            <div className={`p-3 rounded-xl transition-colors ${
              selected === role.id ? "bg-black/10 text-black" : "bg-white/5 group-hover:bg-emerald-500 group-hover:text-black"
            }`}>
              {role.icon}
            </div>
            
            <div>
              <h3 className={`font-bold text-lg ${
                selected === role.id ? "text-black" : "text-white group-hover:text-emerald-400"
              }`}>
                {role.title}
              </h3>
              <p className={`text-sm leading-snug ${
                selected === role.id ? "text-black/60" : "text-white/40"
              }`}>
                {role.desc}
              </p>
            </div>
          </motion.button>
        ))}
      </div>
      
      {/* Bottom Brand Mark */}
      <div className="mt-auto pb-8">
        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/20 font-display font-bold">
           N
        </div>
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------------------------
// Sub-Component: Mobile Animated Widgets
// ----------------------------------------------------------------------
function MobileWidget({ step }: { step: number }) {
  const is0 = step === 0;
  const is1 = step === 1;
  const is2 = step === 2;
  const is3 = step === 3;

  return (
    <div className="w-full aspect-square max-w-[320px] bg-white/[0.03] border border-white/10 rounded-[2rem] relative overflow-hidden flex items-center justify-center shadow-2xl">
       {/* Background Grid */}
       <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}/>

       {/* Step 0: Breathing Orb (Eco) */}
       {is0 && (
         <div className="relative">
            <motion.div 
               animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
               transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
               className="absolute inset-0 bg-emerald-500/30 blur-2xl rounded-full"
            />
            <div className="relative z-10 flex flex-col items-center">
               <Leaf className="w-24 h-24 text-emerald-400 mb-4 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
               <div className="bg-emerald-950/50 border border-emerald-500/30 px-3 py-1 rounded-lg">
                  <span className="text-emerald-400 font-mono text-sm">CO₂ Monitor Active</span>
               </div>
            </div>
         </div>
       )}

       {/* Step 1: Scanner (Bill) */}
       {is1 && (
         <div className="relative w-48 h-64 bg-white rounded-xl overflow-hidden shadow-lg p-4 flex flex-col gap-2">
            <div className="w-12 h-12 rounded-full bg-amber-100 mb-2"/>
            <div className="h-2 w-20 bg-gray-200 rounded"/>
            <div className="h-2 w-32 bg-gray-100 rounded"/>
            <div className="mt-4 space-y-2">
               <div className="flex justify-between text-[10px] text-gray-400"><span className="bg-gray-100 w-16 h-2 rounded"/><span>$45.00</span></div>
               <div className="flex justify-between text-[10px] text-gray-400"><span className="bg-gray-100 w-10 h-2 rounded"/><span>$12.50</span></div>
            </div>
            {/* Scan Line */}
            <motion.div 
               animate={{ top: ['0%', '100%', '0%'] }}
               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
               className="absolute left-0 right-0 h-1 bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.8)] z-10"
            />
         </div>
       )}

       {/* Step 2: Bar Chart (Community) */}
       {is2 && (
         <div className="flex items-end gap-4 h-48 px-6">
            <div className="flex flex-col items-center gap-2">
               <span className="text-xs text-white/30">City</span>
               <motion.div initial={{ height: 0 }} animate={{ height: 100 }} className="w-12 bg-white/10 rounded-t-lg" />
            </div>
            <div className="flex flex-col items-center gap-2">
               <span className="text-xs text-white/30">Avg</span>
               <motion.div initial={{ height: 0 }} animate={{ height: 140 }} transition={{ delay: 0.1 }} className="w-12 bg-white/20 rounded-t-lg" />
            </div>
            <div className="flex flex-col items-center gap-2">
               <span className="text-xs text-blue-400 font-bold">You</span>
               <motion.div 
                  initial={{ height: 0 }} 
                  animate={{ height: 80 }} 
                  transition={{ delay: 0.2, type: 'spring' }} 
                  className="w-12 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg relative group"
               >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                     Best
                  </div>
               </motion.div>
            </div>
         </div>
       )}

       {/* Step 3: Radar (Emergency) */}
       {is3 && (
         <div className="relative flex items-center justify-center w-full h-full">
            {[1,2,3].map((i) => (
               <motion.div 
                  key={i}
                  animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
                  className="absolute border border-rose-500/50 rounded-full w-20 h-20"
               />
            ))}
            <div className="w-24 h-24 bg-rose-950/80 border border-rose-500 rounded-full flex flex-col items-center justify-center z-10 relative">
               <Wifi className="w-8 h-8 text-rose-500 animate-pulse" />
               <span className="text-[10px] text-rose-400 mt-1 font-mono">OFFLINE</span>
            </div>
            <div className="absolute bottom-6 flex items-center gap-2 bg-black/50 px-3 py-1 rounded-full border border-white/10">
               <Battery className="w-4 h-4 text-emerald-400" />
               <span className="text-xs font-mono">8h Left</span>
            </div>
         </div>
       )}
    </div>
  );
}


// ==============================================================================
// COMPONENT 2: DESKTOP VIEW
// ==============================================================================

function DesktopView() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const y = useTransform(scrollY, [0, 300], [0, 100]);

  return (
    <div className="min-h-screen bg-[#050B08] text-white font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center py-6 px-4 backdrop-blur-md transition-all border-b border-white/5">
        <div className="w-full max-w-7xl flex justify-between items-center px-4">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-emerald-400" />
            <span className="font-display font-bold tracking-wide text-xl">SAVERA</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
             <Link href="#ecosystem" className="hover:text-white transition-colors">Ecosystem</Link>
             <Link href="#emergency" className="hover:text-white transition-colors">Emergency</Link>
          </div>
          <Link href="/auth" className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold hover:bg-emerald-400 transition-colors">Login</Link>
        </div>
      </nav>

      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />
         <motion.div style={{ opacity, y }} className="relative z-10 text-center px-4 max-w-5xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 backdrop-blur-md mb-4">
               <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"/>
               <span className="text-xs font-bold text-emerald-100 uppercase tracking-widest">Protocol Live</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-black font-display tracking-tighter leading-[0.9] bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
               Energy Intel <br /> For Everyone.
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto font-light">
               The unified sustainable protocol for households, communities, and governance.
            </p>
         </motion.div>
      </section>
    </div>
  );
}

// ==============================================================================
// MAIN EXPORT
// ==============================================================================
export default function SaveraLanding() {
  return (
    <div className={`${outfit.variable} ${inter.variable} font-sans antialiased bg-black`}>
      <div className="block md:hidden">
        <MobileView />
      </div>
      <div className="hidden md:block">
        <DesktopView />
      </div>
    </div>
  );
}