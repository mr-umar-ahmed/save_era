'use client';

import Link from "next/link";
import { 
  Home, 
  Bell, 
  Trophy, 
  Settings, 
  Leaf, 
  Zap, 
  Droplets, 
  Wind, 
  ChevronLeft, 
  TrendingUp,
  Target,
  ArrowRight,
  Menu
} from "lucide-react";
import { Outfit, Inter } from "next/font/google";

// 1. Setup Premium Fonts
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Navigation Data
const navItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/alerts", label: "Alerts", icon: Bell },
  { href: "/challenges", label: "Win", icon: Trophy },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function ImpactPage() {
  return (
    <div className={`${outfit.variable} ${inter.variable} min-h-screen bg-[#050B08] text-white font-sans selection:bg-emerald-500/30`}>
      
      {/* 2. BACKGROUND FX: Glowing Orbs & Noise Texture */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-[20%] right-[20%] w-[300px] h-[300px] bg-lime-500/10 rounded-full blur-[100px]" />
        {/* Noise overlay for texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row h-screen overflow-hidden">
        
        {/* =========================================
            DESKTOP SIDEBAR (Glassmorphism) 
           ========================================= */}
        <aside className="hidden md:flex flex-col w-72 h-full border-r border-white/5 bg-white/[0.02] backdrop-blur-2xl p-6">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)]">
              <Leaf className="text-white w-6 h-6 fill-white/20" />
            </div>
            <span className="text-2xl font-bold tracking-tight font-display">SAVERA</span>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${item.label === 'Home' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
              >
                <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-900/50 to-teal-900/50 border border-emerald-500/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-emerald-500/20">
                <Target className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-sm font-bold text-emerald-100">Daily Goal</span>
            </div>
            <p className="text-xs text-emerald-200/70 mb-3">Reduce consumption by 5% today.</p>
            <div className="h-1.5 w-full bg-emerald-950 rounded-full overflow-hidden">
              <div className="h-full w-[75%] bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
            </div>
          </div>
        </aside>

        {/* =========================================
            MAIN CONTENT AREA
           ========================================= */}
        <main className="flex-1 overflow-y-auto scrollbar-hide">
          {/* Mobile Header */}
          <header className="md:hidden sticky top-0 z-50 bg-[#050B08]/80 backdrop-blur-xl border-b border-white/5 px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold font-display text-lg tracking-wide">SAVERA</span>
            </div>
            <button className="p-2 rounded-full bg-white/5 border border-white/10">
              <Bell className="w-5 h-5 text-white/80" />
            </button>
          </header>

          <div className="max-w-7xl mx-auto p-4 md:p-10 md:pb-20 space-y-8">
            
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <Link href="/dashboard" className="hidden md:inline-flex items-center gap-2 text-sm text-white/40 hover:text-emerald-400 transition mb-4">
                  <ChevronLeft className="w-4 h-4" /> Back to Dashboard
                </Link>
                <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight text-white mb-2">
                  Impact <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Matrix</span>
                </h1>
                <p className="text-white/50 text-lg font-light max-w-lg">
                  Real-time visualization of your environmental footprint and financial efficiency.
                </p>
              </div>

              <div className="flex gap-3">
                <button className="px-5 py-2.5 rounded-full bg-emerald-500 text-[#050B08] font-bold text-sm hover:bg-emerald-400 transition shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  Download Report
                </button>
                <button className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-white/10 transition">
                  Share Stats
                </button>
              </div>
            </div>

            {/* BENTO GRID LAYOUT */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              
              {/* 1. Main Savings Card (Spans 2 cols) */}
              <div className="col-span-1 md:col-span-2 relative group overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-900/40 to-black border border-emerald-500/20 p-8 shadow-2xl">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition duration-500">
                  <Zap className="w-48 h-48 text-emerald-400 rotate-12" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                      Total Savings
                    </span>
                  </div>
                  <h2 className="text-6xl md:text-7xl font-black font-display text-white tracking-tighter mt-4">
                    ₹12,450
                  </h2>
                  <p className="text-white/60 text-lg mt-2 font-light">
                    Thats equivalent to <span className="text-emerald-300 font-medium">3 months</span> of free electricity.
                  </p>

                  <div className="mt-8 flex items-center gap-4">
                     <div className="flex -space-x-3">
                        {[1,2,3].map(i => (
                          <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-emerald-800 flex items-center justify-center text-xs font-bold text-white/80">
                            You
                          </div>
                        ))}
                     </div>
                     <span className="text-sm text-white/50">Top 5% in your area</span>
                  </div>
                </div>
              </div>

              {/* 2. Water Card */}
              <div className="col-span-1 md:col-span-1 relative group rounded-[2rem] bg-[#0A1210] border border-white/5 p-6 hover:border-blue-500/30 transition duration-300">
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400">
                    <Droplets className="w-6 h-6" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="mt-8">
                  <p className="text-4xl font-bold font-display">89.2k <span className="text-lg text-white/40 font-normal">L</span></p>
                  <p className="text-sm text-white/50 mt-1">Water Conserved</p>
                </div>
                {/* Visualizer */}
                <div className="mt-6 flex gap-1 h-12 items-end">
                   {[40, 60, 35, 70, 50, 80].map((h, i) => (
                      <div key={i} style={{ height: `${h}%`}} className="flex-1 bg-blue-900/40 rounded-sm hover:bg-blue-500 transition-colors" />
                   ))}
                </div>
              </div>

              {/* 3. CO2 Card */}
              <div className="col-span-1 md:col-span-1 relative group rounded-[2rem] bg-[#0A1210] border border-white/5 p-6 hover:border-lime-500/30 transition duration-300">
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-2xl bg-lime-500/10 text-lime-400">
                    <Wind className="w-6 h-6" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="mt-8">
                  <p className="text-4xl font-bold font-display">4.2 <span className="text-lg text-white/40 font-normal">Tons</span></p>
                  <p className="text-sm text-white/50 mt-1">CO₂ Reduced</p>
                </div>
                 {/* Visualizer */}
                 <div className="mt-6 flex gap-1 h-12 items-end">
                   {[30, 45, 60, 40, 75, 50].map((h, i) => (
                      <div key={i} style={{ height: `${h}%`}} className="flex-1 bg-lime-900/40 rounded-sm hover:bg-lime-500 transition-colors" />
                   ))}
                </div>
              </div>

              {/* 4. Milestone / Gamification Card (Wide) */}
              <div className="col-span-1 md:col-span-3 lg:col-span-4 rounded-[2rem] bg-gradient-to-r from-amber-900/20 via-black to-black border border-amber-500/20 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px]" />
                
                <div className="flex items-center gap-6 relative z-10">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-b from-amber-300 to-amber-600 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.4)] shrink-0">
                    <span className="text-2xl md:text-3xl">🥇</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-display text-white">Gold Badge Incoming</h3>
                    <p className="text-white/60 text-sm md:text-base">You are only ₹2,550 away from the next tier.</p>
                  </div>
                </div>

                <div className="w-full md:w-1/2 relative z-10">
                  <div className="flex justify-between text-xs font-bold tracking-widest text-amber-500/80 mb-2 uppercase">
                    <span>Progress</span>
                    <span>80%</span>
                  </div>
                  <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <div className="h-full w-[80%] bg-gradient-to-r from-amber-400 to-yellow-200 shadow-[0_0_20px_rgba(251,191,36,0.5)] animate-pulse" />
                  </div>
                </div>
              </div>

            </div>
          </div>
          
          {/* Spacer for bottom nav on mobile */}
          <div className="h-28 md:hidden" />
        </main>
      </div>

      {/* =========================================
          MOBILE BOTTOM NAV (Floating Dock)
         ========================================= */}
      <div className="md:hidden fixed bottom-6 left-4 right-4 z-50">
        <nav className="bg-[#050B08]/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] flex justify-around items-center p-2">
          {navItems.map((item) => {
            const isActive = item.label === "Home"; // Demo logic
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 ${isActive ? 'bg-white/10' : ''}`}
              >
                {isActive && (
                  <span className="absolute -top-1 w-1 h-1 bg-emerald-400 rounded-full shadow-[0_0_8px_#34d399]" />
                )}
                <item.icon 
                  className={`w-6 h-6 mb-1 ${isActive ? 'text-emerald-400' : 'text-white/40'}`} 
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Global Style Overrides for Fonts */}
      <style jsx global>{`
        :root {
          --font-outfit: ${outfit.style.fontFamily};
          --font-inter: ${inter.style.fontFamily};
        }
        .font-display {
          font-family: var(--font-outfit), sans-serif;
        }
        .font-sans {
          font-family: var(--font-inter), sans-serif;
        }
      `}</style>
    </div>
  );
}