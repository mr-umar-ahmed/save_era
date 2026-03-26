'use client';

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowRight, Leaf, ShieldAlert, Zap, Home, Building2, 
  Radio, CloudLightning, Globe2, Lock, 
  ChevronDown, CheckCircle2, Battery, Wifi,
  ScanLine, Cpu, Activity, Lightbulb, Target, Network, Layers
} from "lucide-react";
import { Outfit, Inter } from "next/font/google";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring,
  useInView
} from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useTheme } from "./components/ThemeProvider";

// 1. Font Configuration
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// ==============================================================================
// UTILITIES & SHARED COMPONENTS
// ==============================================================================

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
      className={cn(
        `relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0A0F0D] transition-colors duration-300 group shadow-2xl`,
        className
      )}
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

// ==============================================================================
// MAIN PAGE COMPONENT
// ==============================================================================

export default function SaveraLanding() {
  const { colors } = useTheme();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const y = useTransform(scrollY, [0, 300], [0, 100]);

  return (
    <div className={`${outfit.variable} ${inter.variable} w-full font-sans antialiased bg-[#050B08] text-white transition-colors duration-300 min-h-screen selection:bg-emerald-500/30 overflow-x-hidden`}>
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
        
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[10%] left-[10%] w-[600px] h-[600px] rounded-full blur-[120px] animate-pulse mix-blend-screen bg-emerald-500/20" />
          <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] rounded-full blur-[120px] mix-blend-screen bg-blue-600/20" />
          <div className="absolute inset-0 bg-[size:60px_60px] opacity-20 mask-image:radial-gradient(ellipse_at_center,black,transparent) bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]" />
        </div>

        <motion.div style={{ opacity, y }} className="relative z-10 text-center px-4 max-w-5xl mx-auto space-y-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md mb-4"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
              The Sustainable Future Protocol
            </span>
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
            className="text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed text-white/60"
          >
            SavEra bridges the gap between individual resource waste and macro-level grid stress. We transform dead utility data into a <span className="font-bold text-emerald-400">live behavioral engine</span> for citizens and a <span className="font-bold text-blue-400">SCADA command center</span> for governments.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="pt-8 flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link 
              href="/auth" 
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_40px_-5px_rgba(16,185,129,0.4)] bg-emerald-500 text-black hover:bg-emerald-400"
            >
              <Zap className="w-5 h-5" />
              <span>Initialize Platform</span>
            </Link>
            <a 
              href="#architecture" 
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 border border-white/20 bg-white/5 text-white hover:bg-white/10"
            >
              <span>View Architecture</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div style={{ opacity }} className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/30">
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* ================= HOW IT WORKS (THE GOLDEN PATH) ================= */}
      <section className="relative z-10 py-32 px-4 border-t border-white/5 bg-[#020617]/50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4 text-emerald-500">The Golden Path</h2>
            <h3 className="text-4xl md:text-5xl font-black font-display mb-6">How SavEra Works</h3>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">A seamless pipeline from analog paper bills to digital automated savings.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-blue-500/0 z-0" />

            {[
              {
                step: "01",
                icon: <Home className="w-6 h-6 text-emerald-400" />,
                title: "Contextualize Habitat",
                desc: "Tell the AI about your property type and local high-drain appliances (e.g., 1HP Submersible Pumps in semi-urban sectors)."
              },
              {
                step: "02",
                icon: <ScanLine className="w-6 h-6 text-teal-400" />,
                title: "AI Bill Extraction",
                desc: "Upload standard MESCOM or utility bills. Our edge-computed OCR strips the raw units and cross-references them with local tariffs."
              },
              {
                step: "03",
                icon: <Lightbulb className="w-6 h-6 text-amber-400" />,
                title: "Automate Fixes",
                desc: "Receive localized AI diagnostic reports and click 'Automate' to instantly apply energy-saving protocols to your smart home."
              }
            ].map((item, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-full bg-[#0A0F0D] border-2 border-white/10 flex items-center justify-center mb-8 relative shadow-xl group-hover:border-emerald-500/50 transition-colors duration-500">
                  <div className="absolute inset-2 rounded-full bg-white/5 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-emerald-500 text-black font-black text-sm flex items-center justify-center">
                    {item.step}
                  </span>
                </div>
                <h4 className="text-2xl font-bold font-display mb-4">{item.title}</h4>
                <p className="text-white/60 leading-relaxed max-w-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= THE DUAL-SIDED ECOSYSTEM ================= */}
      <section id="architecture" className="relative z-10 py-32 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-4 text-blue-500">B2B2C Architecture</h2>
          <h3 className="text-4xl md:text-6xl font-black font-display mb-6">A Two-Sided Protocol</h3>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">SavEra empowers the individual while supplying vital macro-telemetry to local governments.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* THE RESIDENT LAYER (B2C) */}
          <SpotlightCard className="p-10 flex flex-col justify-between border-emerald-500/20">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <Layers className="w-64 h-64 text-emerald-500 transform translate-x-12 -translate-y-12" />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-8">
                Layer 1: The Citizen
              </div>
              <h4 className="text-4xl font-black font-display mb-4">Household Control</h4>
              <p className="text-white/60 mb-10 leading-relaxed text-lg max-w-md">
                We turn the boring chore of paying utility bills into an engaging, gamified "Mission Center."
              </p>
              
              <ul className="space-y-6">
                {[
                  { title: "Statistical Disaggregation", desc: "Estimates water/gas breakdown without needing expensive smart meters." },
                  { title: "Behavioral Gamification", desc: "Earn XP and badges through co-op community challenges." },
                  { title: "One-Click System Upgrades", desc: "Instantly apply AI-recommended fixes to optimize consumption." }
                ].map((feature, idx) => (
                  <li key={idx} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div>
                      <h5 className="font-bold text-white">{feature.title}</h5>
                      <p className="text-sm text-white/50 mt-1">{feature.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </SpotlightCard>

          {/* THE GOVERNMENT LAYER (B2G) */}
          <SpotlightCard className="p-10 flex flex-col justify-between border-blue-500/20">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <Globe2 className="w-64 h-64 text-blue-500 transform translate-x-12 -translate-y-12" />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest mb-8">
                Layer 2: The Authority
              </div>
              <h4 className="text-4xl font-black font-display mb-4">Grid Governance</h4>
              <p className="text-white/60 mb-10 leading-relaxed text-lg max-w-md">
                Aggregated, anonymized data feeds directly into a SCADA-style dashboard for utility providers.
              </p>
              
              <ul className="space-y-6">
                {[
                  { title: "Live IoT Telemetry", desc: "Simulated polling pipeline processes real-time load matrices across sectors." },
                  { title: "Predictive Grid Stress", desc: "Identifies regional overload thresholds before blackouts occur." },
                  { title: "Targeted Infrastructure Planning", desc: "Data-driven insights for where to deploy new substations or pipelines." }
                ].map((feature, idx) => (
                  <li key={idx} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 mt-1">
                      <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <h5 className="font-bold text-white">{feature.title}</h5>
                      <p className="text-sm text-white/50 mt-1">{feature.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </SpotlightCard>

        </div>
      </section>

      {/* ================= EMERGENCY / OFFLINE SECTION ================= */}
      <section id="emergency" className="relative py-32 border-t border-white/5 overflow-hidden bg-gradient-to-b from-[#050B08] via-red-950/10 to-[#050B08]">
        
        {/* Radar Effect Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-red-500/10 rounded-full opacity-50 pointer-events-none">
           <div className="w-full h-full rounded-full animate-[spin_10s_linear_infinite] border-t border-red-500/30 bg-gradient-to-tr from-transparent to-red-900/5" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 text-red-400 border border-red-500/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-red-500/10 shadow-[0_0_20px_-5px_rgba(239,68,68,0.4)]"
            >
              <Radio className="w-3 h-3 animate-pulse" />
              Disaster Management Domain
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black font-display leading-[0.9]">
              Lifeline when <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">Grid Fails.</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed max-w-lg">
              Standard utility apps fail when the power cuts out and Wi-Fi drops. SavEra integrates <span className="text-white font-bold">Cell Broadcast Technology (CBT)</span> via Ntfy protocols.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm font-medium text-white/80"><CheckCircle2 className="w-4 h-4 text-red-500" /> Bypasses local ISP outages</li>
              <li className="flex items-center gap-3 text-sm font-medium text-white/80"><CheckCircle2 className="w-4 h-4 text-red-500" /> Government pushes instant rolling-blackout alerts</li>
              <li className="flex items-center gap-3 text-sm font-medium text-white/80"><CheckCircle2 className="w-4 h-4 text-red-500" /> Caches critical offline safety protocols</li>
            </ul>
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
                  className="absolute top-12 left-4 right-4 bg-black/80 backdrop-blur-xl border border-red-500/40 p-4 rounded-2xl shadow-2xl"
                 >
                    <div className="flex gap-3">
                      <div className="bg-red-500/20 border border-red-500/50 text-red-500 p-2 rounded-lg h-fit shrink-0">
                        <ShieldAlert className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex justify-between items-start">
                          <h5 className="text-white font-bold text-sm">⚠️ SAVERA GRID COMMAND</h5>
                          <span className="text-[10px] text-white/40">Now</span>
                        </div>
                        <p className="text-white/70 text-xs mt-1 leading-snug">Critical Load: Reduce AC usage immediately. Grid shutdown in 10m.</p>
                      </div>
                    </div>
                 </motion.div>

                 {/* Offline Indicator */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <Wifi className="w-12 h-12 text-rose-500 animate-pulse mb-2" />
                    <span className="text-rose-500 font-mono text-xs tracking-widest">NO SIGNAL</span>
                 </div>
                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/80 px-4 py-2 rounded-full border border-white/10">
                    <Battery className="w-4 h-4 text-emerald-400" />
                    <span className="text-[10px] text-white/80 font-bold uppercase tracking-widest">Offline Cache Mode</span>
                 </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= TECH STACK ================= */}
      <section id="tech" className="py-32 border-t border-white/5 relative bg-[#0A0F0D]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-display mb-16 text-white">Powered by Production-Grade Tech</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: <Cpu />, title: "Next.js 14 App Router", desc: "Server-side rendering & optimized edge routing." },
              { icon: <Activity />, title: "Recharts & Motion", desc: "High-performance data visualization & telemetry." },
              { icon: <Network />, title: "API Polling Engine", desc: "Simulated local mesh network for IoT meter injection." },
              { icon: <Lock />, title: "Zero-Knowledge", desc: "AES-256 encrypted payload structure for user privacy." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] rounded-3xl transition-colors relative group text-left"
              >
                 <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 relative z-10 text-emerald-400">
                   {item.icon}
                 </div>
                 <h3 className="text-lg font-bold mb-2 text-white">{item.title}</h3>
                 <p className="text-white/50 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER / CTA ================= */}
      <section className="py-32 relative overflow-hidden flex flex-col items-center border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative z-10 text-center px-4"
        >
          <h2 className="text-5xl md:text-7xl font-black font-display mb-8 tracking-tight text-white">
            Ready to Optimize?
          </h2>
          <Link 
            href="/auth" 
            className="inline-flex items-center gap-3 px-12 py-5 rounded-full text-xl font-bold transition-all bg-emerald-500 text-black hover:bg-emerald-400 hover:scale-105 shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)]"
          >
            Access Dashboard
            <ArrowRight className="w-6 h-6" />
          </Link>
        </motion.div>

        <div className="mt-24 text-sm text-white/30 font-mono tracking-widest uppercase">© 2026 Savera Protocol. Raichur, KA.</div>
      </section>
    </div>
  );
}