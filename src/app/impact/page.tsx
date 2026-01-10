'use client';

import Link from "next/link";
import Sidebar from "@/app/components/Sidebar"; // IMPORT SIDEBAR
import { 
  Trophy, 
  TreePine, 
  Droplets, 
  Zap, 
  ArrowRight, 
  Award, 
  Medal, 
  Share2, 
  Download,
  ChevronRight,
  Leaf,
  Waves
} from "lucide-react";
import { Outfit, Inter } from "next/font/google";

// 1. Font Setup
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function ImpactPage() {
  return (
    <div className={`${outfit.variable} ${inter.variable} min-h-screen bg-[#050B08] text-white font-sans selection:bg-emerald-500/30 relative overflow-x-hidden`}>
      
      {/* 2. BACKGROUND FX */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8">
        
        {/* LAYOUT GRID: SIDEBAR + CONTENT */}
        <div className="flex flex-col lg:flex-row gap-6">

            {/* SIDEBAR */}
            <div className="hidden lg:block w-[260px] shrink-0">
                <Sidebar />
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 min-w-0">
                
                {/* 3. HEADER */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
                  <div className="space-y-2">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 text-white/40 hover:text-emerald-400 transition-colors text-sm font-medium">
                      <ChevronRight className="w-4 h-4 rotate-180" /> Back to Dashboard
                    </Link>
                    <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight text-white">
                      Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Legacy</span>
                    </h1>
                    <p className="text-white/50 text-lg max-w-lg">
                      Quantifying your contribution to a sustainable future.
                    </p>
                  </div>

                  <div className="flex gap-3">
                      <button className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium text-sm transition flex items-center gap-2">
                        <Download className="w-4 h-4" /> Report
                      </button>
                      <button className="px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#050B08] font-bold text-sm transition flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                        <Share2 className="w-4 h-4" /> Share Impact
                      </button>
                  </div>
                </div>

                {/* 4. MAIN IMPACT GRID */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  
                  {/* Card 1: Money (Gold/Amber) */}
                  <div className="group relative bg-[#0A0F0D]/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 overflow-hidden hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-1">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Zap className="w-32 h-32 text-amber-400 -rotate-12" />
                    </div>
                    
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                        <span className="text-xl font-bold">₹</span>
                      </div>
                      <p className="text-sm font-bold text-white/40 uppercase tracking-widest mb-1">Total Savings</p>
                      <h2 className="text-5xl font-black font-display text-white mb-4">12,450</h2>
                      
                      <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
                        <p className="text-amber-200/80 text-sm font-medium flex items-center gap-2">
                          <Zap className="w-4 h-4" /> Equals 3 months free electricity
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Water (Cyan) */}
                  <div className="group relative bg-[#0A0F0D]/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 overflow-hidden hover:border-cyan-500/30 transition-all duration-500 hover:-translate-y-1">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Droplets className="w-32 h-32 text-cyan-400 -rotate-12" />
                    </div>
                    
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                        <Droplets className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-bold text-white/40 uppercase tracking-widest mb-1">Water Conserved</p>
                      <h2 className="text-5xl font-black font-display text-white mb-4">89.2k <span className="text-2xl text-white/50">L</span></h2>
                      
                      <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10">
                        <p className="text-cyan-200/80 text-sm font-medium flex items-center gap-2">
                          <Waves className="w-4 h-4" /> Equals 36 swimming pools
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: CO2 (Emerald) */}
                  <div className="group relative bg-[#0A0F0D]/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 overflow-hidden hover:border-emerald-500/30 transition-all duration-500 hover:-translate-y-1">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Leaf className="w-32 h-32 text-emerald-400 -rotate-12" />
                    </div>
                    
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                        <Leaf className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-bold text-white/40 uppercase tracking-widest mb-1">Carbon Reduced</p>
                      <h2 className="text-5xl font-black font-display text-white mb-4">4.2 <span className="text-2xl text-white/50">Tons</span></h2>
                      
                      <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                        <p className="text-emerald-200/80 text-sm font-medium flex items-center gap-2">
                          <TreePine className="w-4 h-4" /> Equals 89 trees planted
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* 5. MILESTONE PROGRESS */}
                <div className="grid lg:grid-cols-[2fr_1fr] gap-6 mb-12">
                  
                  {/* Progress Bar Card */}
                  <div className="relative bg-gradient-to-r from-emerald-900/20 to-teal-900/20 backdrop-blur-xl border border-emerald-500/20 rounded-[2.5rem] p-8 md:p-10">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Trophy className="w-5 h-5 text-yellow-400" />
                            <h3 className="text-yellow-400 font-bold uppercase tracking-widest text-sm">Next Milestone</h3>
                          </div>
                          <p className="text-3xl font-black font-display text-white">Gold Badge Status</p>
                          <p className="text-white/60 mt-1">Reach ₹15,000 in total savings to unlock.</p>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-4xl font-black font-display text-white">82%</p>
                          <p className="text-emerald-400 text-sm font-bold">On Track</p>
                        </div>
                      </div>

                      <div className="relative h-6 bg-black/40 rounded-full overflow-hidden mb-4 border border-white/5">
                        <div className="absolute top-0 left-0 h-full w-[82%] bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_20px_rgba(16,185,129,0.5)]" />
                        {/* Striped pattern overlay */}
                        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[size:20px_20px]" />
                      </div>
                      
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-white/40">Current: ₹12,450</span>
                        <span className="text-white">Goal: ₹15,000</span>
                      </div>
                  </div>

                  {/* Motivation Card */}
                  <div className="bg-[#0A0F0D]/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-center items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center shadow-[0_0_30px_rgba(251,191,36,0.4)] mb-4 animate-pulse">
                        <Medal className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-white font-bold text-lg mb-2">Almost There!</p>
                      <p className="text-white/60 text-sm mb-6">Just <span className="text-white font-bold">₹2,550</span> more to reach Gold status.</p>
                      <Link href="/recommendations" className="text-emerald-400 hover:text-emerald-300 text-sm font-bold underline underline-offset-4 decoration-emerald-500/30 hover:decoration-emerald-500 transition-all">
                        View ways to save →
                      </Link>
                  </div>

                </div>

                {/* 6. ACHIEVEMENTS ROW */}
                <div className="mb-16">
                  <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                    <Award className="w-5 h-5 text-purple-400" /> Recent Awards
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "Green Start", icon: Leaf, color: "emerald", date: "Oct 2025" },
                      { label: "Power User", icon: Zap, color: "amber", date: "Nov 2025" },
                      { label: "Water Saver", icon: Droplets, color: "cyan", date: "Dec 2025" },
                      { label: "Eco Warrior", icon: Trophy, color: "purple", date: "Locked", locked: true },
                    ].map((item, i) => (
                      <div key={i} className={`p-4 rounded-2xl border flex items-center gap-4 transition-all
                          ${item.locked 
                            ? 'bg-white/5 border-white/5 opacity-50' 
                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                          }
                        `}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center 
                          ${item.locked ? 'bg-white/10 text-white/30' : `bg-${item.color}-500/20 text-${item.color}-400`}
                        `}>
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm">{item.label}</p>
                          <p className="text-[10px] text-white/40 uppercase tracking-wider">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 7. FOOTER ACTION */}
                <div className="flex justify-center">
                  <Link
                    href="/challenges"
                    className="group relative inline-flex items-center justify-center gap-3 bg-white text-[#050B08] px-10 py-4 rounded-full text-lg font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                      <Trophy className="w-5 h-5" />
                      <span>Join Weekly Challenges</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

            </div>
        </div>
      </div>
      
      {/* Helper icon for water visual */}
      <div className="hidden">
        <Waves />
      </div>

    </div>
  );
}