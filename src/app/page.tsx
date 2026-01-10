'use client';

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowRight, Leaf, ShieldAlert, Zap, Home, Building2, 
  Radio, CloudLightning, Globe2, Lock, 
  ScanLine, BarChart3, Wifi, Battery, Fingerprint, Loader2,
  LayoutGrid, ChevronDown, CheckCircle2, Menu, X
} from "lucide-react";
import { Outfit, Inter } from "next/font/google";
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  PanInfo,
  useSpring,
  useInView
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
// SHARED UI COMPONENTS
// ==============================================================================

// Spotlight Effect Card for Desktop
const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={cn("relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0A0F0D] group", className)}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(16, 185, 129, 0.15), transparent 40%)`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

// Animated Counter for Desktop Stats
const Counter = ({ value }: { value: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const springValue = useSpring(0, { bounce: 0, duration: 2000 });
  const displayValue = useTransform(springValue, (latest) => Math.floor(latest));

  useEffect(() => {
    if (isInView) springValue.set(value);
  }, [isInView, value, springValue]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
};

// ==============================================================================
// MOBILE VIEW COMPONENT (App-like Onboarding)
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
        className="absolute -top-[20%] -left-[20%] w-[140%] h-[60%] blur-[120px] opacity-40 transition-colors duration-700 pointer-events-none"
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
            // 3. ROLE SELECTION SCREEN
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
// Sub-Component: Role Selection
// ----------------------------------------------------------------------
function RoleSelectionStep() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (roleId: string) => {
    setSelected(roleId);
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
    <div className="w-full aspect-square max-w-[320px] bg-white/[0.03] border border-white/10 rounded-[2rem] relative overflow-hidden flex items-center justify-center shadow-2xl backdrop-blur-sm">
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
// DESKTOP VIEW COMPONENT (SaaS Landing Page)
// ==============================================================================

function DesktopView() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const navBackground = useTransform(scrollY, [0, 50], ["rgba(5, 11, 8, 0)", "rgba(5, 11, 8, 0.8)"]);

  return (
    <div className="min-h-screen bg-[#050B08] text-white font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      
      {/* Dynamic Nav */}
      <motion.nav style={{ backgroundColor: navBackground }} className="fixed top-0 left-0 right-0 z-50 flex justify-center py-6 px-4 backdrop-blur-md transition-all border-b border-transparent">
        <div className="w-full max-w-7xl flex justify-between items-center px-4">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-500/10 p-2 rounded-lg">
              <Leaf className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="font-display font-bold tracking-wide text-xl">SAVERA</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
            <a href="#ecosystem" className="hover:text-emerald-400 transition-colors">Ecosystem</a>
            <a href="#emergency" className="hover:text-emerald-400 transition-colors">Emergency</a>
            <a href="#tech" className="hover:text-emerald-400 transition-colors">Azure AI</a>
          </div>
          <Link href="/auth" className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold hover:bg-emerald-400 transition-colors shadow-lg shadow-white/10">
            Login
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-[110vh] flex flex-col items-center justify-center overflow-hidden pt-20">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px] animate-pulse mix-blend-screen" />
          <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px] opacity-20 mask-image:radial-gradient(ellipse_at_center,black,transparent)" />
        </div>

        <motion.div style={{ opacity, y }} className="relative z-10 text-center px-4 max-w-5xl mx-auto space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 backdrop-blur-md mb-4"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-emerald-100 uppercase tracking-widest">Microsoft Imagine Cup Aligned</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl md:text-8xl lg:text-9xl font-black font-display tracking-tighter leading-[0.9] bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40"
          >
            Energy Intel <br /> For Everyone.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Savera connects household consumption, community efficiency, and government planning into one unified <span className="text-emerald-400 font-normal">sustainable protocol</span>.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="pt-8 flex flex-col md:flex-row gap-6 justify-center items-center"
          >
            <Link 
              href="/auth" 
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.4)] transition-all duration-300"
            >
              <span>Initialize Protocol</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div style={{ opacity }} className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/20">
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* Ecosystem Section (Bento Grid) */}
      <section id="ecosystem" className="relative z-10 py-32 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-sm font-bold text-emerald-500 uppercase tracking-widest mb-4">The Ecosystem</h2>
          <h3 className="text-4xl md:text-6xl font-black font-display text-white mb-6">Unified Intelligence</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
          
          {/* Household Card */}
          <SpotlightCard className="md:col-span-2 p-10 flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-12 opacity-10">
                <Home className="w-48 h-48 text-emerald-500 transform translate-x-12 -translate-y-12" />
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-8 ring-1 ring-emerald-500/40">
                <Zap className="w-7 h-7 text-emerald-400" />
              </div>
              <h4 className="text-3xl font-bold font-display mb-4">Household & Individual</h4>
              <p className="text-white/50 mb-8 max-w-lg leading-relaxed text-lg">
                We analyze utility billing data to estimate energy and water usage across appliances, helping you identify inefficiencies.
              </p>
              <div className="flex gap-3 flex-wrap">
                {['Appliance Breakdown', 'Carbon Tracking', 'Bill Forecasting'].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-emerald-200/80">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </SpotlightCard>

          {/* Community Card */}
          <SpotlightCard className="p-10 flex flex-col">
            <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-8 ring-1 ring-blue-500/40">
              <Building2 className="w-7 h-7 text-blue-400" />
            </div>
            <h4 className="text-2xl font-bold font-display mb-2">Communities</h4>
            <p className="text-white/50 text-sm leading-relaxed mb-auto">
              Automate efficiency in shared spaces like schools and offices.
            </p>
            <div className="bg-blue-500/10 rounded-2xl p-6 border border-blue-500/20 mt-6 text-center">
              <div className="text-xs text-blue-300 font-mono mb-1 uppercase tracking-wider">Optimization</div>
              <div className="text-5xl font-black text-white flex justify-center items-baseline">
                <Counter value={94} /><span className="text-xl text-white/40">%</span>
              </div>
            </div>
          </SpotlightCard>

          {/* Government Card */}
          <SpotlightCard className="md:col-span-3 p-10 flex flex-col md:flex-row items-center gap-12 bg-gradient-to-r from-[#0A0F0D] to-[#120a05]">
             <div className="flex-1">
              <div className="w-14 h-14 bg-amber-500/20 rounded-2xl flex items-center justify-center mb-8 ring-1 ring-amber-500/40">
                <Globe2 className="w-7 h-7 text-amber-400" />
              </div>
              <h4 className="text-3xl font-bold font-display mb-4">Grid & Governance</h4>
              <p className="text-white/50 leading-relaxed text-lg max-w-xl">
                Aggregation enables authorities to understand regional demand patterns and peak-load stress, supporting infrastructure planning during scarcity.
              </p>
            </div>
            <div className="flex-1 w-full h-full min-h-[200px] bg-black/40 rounded-3xl border border-white/5 p-6 backdrop-blur-sm flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono text-amber-500 flex items-center gap-2">
                   <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"/> LIVE LOAD
                </span>
                <span className="text-xs text-white/30 font-mono">KARNATAKA REGION</span>
              </div>
              <div className="flex-1 flex items-end gap-2 px-2">
                 {[30, 50, 45, 60, 80, 55, 40, 70, 90, 60, 40, 50].map((h, i) => (
                   <motion.div 
                    key={i}
                    initial={{ height: "10%" }}
                    whileInView={{ height: `${h}%` }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    className="flex-1 bg-gradient-to-t from-amber-900/40 to-amber-500 rounded-t-sm"
                   />
                 ))}
              </div>
            </div>
          </SpotlightCard>
        </div>
      </section>

      {/* Emergency Section */}
      <section id="emergency" className="relative py-32 border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050B08] via-[#1a0505] to-[#050B08]" />
        
        {/* Radar Effect Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-red-500/10 rounded-full opacity-50 pointer-events-none">
           <div className="w-full h-full rounded-full animate-[spin_10s_linear_infinite] border-t border-red-500/30 bg-gradient-to-tr from-transparent to-red-900/5" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 text-red-400 border border-red-500/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-red-950/30 shadow-[0_0_20px_-5px_rgba(220,38,38,0.4)]"
            >
              <Radio className="w-3 h-3 animate-pulse" />
              Crisis Protocol Active
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black font-display leading-[0.9]">
              Lifeline when <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">Grid Fails.</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed max-w-lg">
              During extreme weather, Savera transforms into a critical communication channel. It delivers verified, location-specific alerts via low-bandwidth protocols (2G/SMS).
            </p>
          </div>

          {/* Interactive Phone Mockup */}
          <div className="flex-1 flex justify-center">
            <motion.div 
               initial={{ y: 50, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               viewport={{ once: true }}
               className="w-[320px] bg-[#0A0A0A] border border-white/10 rounded-[3rem] p-4 shadow-2xl relative"
            >
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl border-b border-l border-r border-white/10 z-20" />
               <div className="h-full bg-[#111] rounded-[2.5rem] overflow-hidden relative min-h-[600px]">
                 {/* Map Background */}
                 <div className="absolute inset-0 bg-neutral-900 opacity-50 grayscale" style={{ backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                 
                 {/* Notification Pop */}
                 <motion.div 
                  animate={{ y: [20, 0], opacity: [0, 1] }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  className="absolute bottom-6 left-4 right-4 bg-red-500/10 border border-red-500/40 backdrop-blur-xl p-4 rounded-2xl"
                 >
                    <div className="flex gap-3">
                      <div className="bg-red-500 text-white p-2 rounded-lg h-fit">
                        <ShieldAlert className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="text-red-100 font-bold text-sm">Flash Flood Warning</h5>
                        <p className="text-red-200/60 text-xs mt-1">Grid shutdown in 10m. Switch to battery.</p>
                      </div>
                    </div>
                 </motion.div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Azure Tech Stack (Grid) */}
      <section id="tech" className="py-32 bg-[#050B08] border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-display mb-16 text-white/40">Powered by Enterprise Infrastructure</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <CloudLightning />, title: "Azure Cognitive", desc: "Processing billing data at national scale." },
              { icon: <Globe2 />, title: "Regional Awareness", desc: "Modular configs for local utility policies." },
              { icon: <Lock />, title: "Entra ID Security", desc: "Enterprise-grade identity & privacy." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 border border-white/5 rounded-3xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors relative group"
              >
                 <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                 <div className="w-12 h-12 bg-[#0A0F0D] rounded-xl border border-white/10 flex items-center justify-center mx-auto mb-6 relative z-10 text-blue-400">
                   {item.icon}
                 </div>
                 <h3 className="text-xl font-bold mb-2 relative z-10">{item.title}</h3>
                 <p className="text-white/40 text-sm relative z-10">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <section className="py-32 relative overflow-hidden flex flex-col items-center">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-center px-4"
        >
          <h2 className="text-5xl md:text-8xl font-black font-display mb-8 tracking-tight">
            Ready to Optimize?
          </h2>
          <div className="p-[2px] rounded-full bg-gradient-to-r from-emerald-500 via-blue-500 to-emerald-500 inline-block">
            <Link 
              href="/auth" 
              className="block px-12 py-5 bg-[#050B08] rounded-full text-xl font-bold text-white hover:bg-white hover:text-black transition-colors"
            >
              Get Started
            </Link>
          </div>
        </motion.div>

        <div className="mt-24 text-white/20 text-sm">© 2026 Savera Protocol. Microsoft Imagine Cup.</div>
      </section>
    </div>
  );
}

// ==============================================================================
// MAIN EXPORT
// ==============================================================================
export default function SaveraLanding() {
  return (
    <div className={`${outfit.variable} ${inter.variable} font-sans antialiased bg-[#050B08]`}>
      <div className="block md:hidden">
        <MobileView />
      </div>
      <div className="hidden md:block">
        <DesktopView />
      </div>
    </div>
  );
}