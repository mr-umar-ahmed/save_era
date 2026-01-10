'use client';

import Link from "next/link";
import Sidebar from "@/app/components/Sidebar"; // IMPORT SIDEBAR
import { 
  Zap, 
  Droplets, 
  ArrowLeft, 
  TrendingUp, 
  AlertCircle, 
  Timer,
  Lightbulb,
  Fan,
  ShowerHead,
  PieChart
} from "lucide-react";
import { Outfit, Inter } from "next/font/google";

// 1. Font Setup
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// 2. Demo Data
const breakdownData = {
  electricity: {
    total: 4500,
    items: [
      { name: 'AC Unit', percent: 45, value: '₹2,025', color: 'bg-red-500', icon: Fan },
      { name: 'Geyser', percent: 25, value: '₹1,125', color: 'bg-orange-500', icon: Zap },
      { name: 'Lights', percent: 15, value: '₹675', color: 'bg-amber-500', icon: Lightbulb },
      { name: 'Other', percent: 15, value: '₹675', color: 'bg-slate-600', icon: PieChart },
    ]
  },
  water: {
    total: 1200,
    items: [
      { name: 'Shower', percent: 40, value: '₹480', color: 'bg-cyan-500', icon: ShowerHead },
      { name: 'Taps', percent: 30, value: '₹360', color: 'bg-blue-500', icon: Droplets },
      { name: 'Laundry', percent: 20, value: '₹240', color: 'bg-indigo-500', icon: Timer },
      { name: 'Other', percent: 10, value: '₹120', color: 'bg-slate-600', icon: PieChart },
    ]
  }
};

export default function BreakdownPage() {
  return (
    <div className={`${outfit.variable} ${inter.variable} min-h-screen bg-[#050B08] text-white font-sans selection:bg-emerald-500/30 relative overflow-x-hidden`}>
      
      {/* 3. BACKGROUND FX */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px]" />
        {/* Grid & Noise */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
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
                {/* 4. HEADER */}
                <div className="flex flex-col items-center text-center mb-16">
                  <Link href="/dashboard" className="inline-flex items-center gap-2 text-white/40 hover:text-emerald-400 transition-colors text-sm font-medium mb-6">
                    <ArrowLeft className="w-4 h-4" /> Back to Overview
                  </Link>
                  <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
                    <PieChart className="w-4 h-4 text-emerald-400 mr-2" />
                    <span className="text-xs font-bold text-white/70 uppercase tracking-widest">AI Analysis Complete</span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight text-white mb-4">
                    Consumption <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Deep Dive</span>
                  </h1>
                  <p className="text-white/50 text-lg max-w-2xl">
                    Our AI has disaggregated your utility bills to identify exactly where every Rupee goes.
                  </p>
                </div>

                {/* 5. VISUALIZATION GRID */}
                <div className="grid lg:grid-cols-2 gap-8 mb-16">
                  
                  {/* === ELECTRICITY CHART === */}
                  <div className="bg-[#0A0F0D]/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Zap className="w-64 h-64 text-amber-400 -rotate-12" />
                    </div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <h2 className="text-2xl font-bold font-display text-white">Electricity Split</h2>
                          <p className="text-white/40 text-sm">Total Bill: <span className="text-white font-mono">₹{breakdownData.electricity.total}</span></p>
                        </div>
                        <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                          <Zap className="w-6 h-6" />
                        </div>
                      </div>

                      {/* Custom Bar Chart Visualization */}
                      <div className="space-y-6">
                        {breakdownData.electricity.items.map((item, i) => (
                          <div key={i} className="group/bar">
                            <div className="flex justify-between text-sm mb-2">
                              <span className="flex items-center gap-2 font-medium text-white/80">
                                <item.icon className="w-4 h-4 text-white/40" /> {item.name}
                              </span>
                              <span className="font-mono text-white/60">{item.value} ({item.percent}%)</span>
                            </div>
                            <div className="h-4 bg-white/5 rounded-full overflow-hidden">
                              <div 
                                style={{ width: `${item.percent}%` }} 
                                className={`h-full ${item.color} shadow-[0_0_15px_rgba(0,0,0,0.3)] relative group-hover/bar:brightness-110 transition-all duration-500`}
                              >
                                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* === WATER CHART === */}
                  <div className="bg-[#0A0F0D]/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Droplets className="w-64 h-64 text-cyan-400 -rotate-12" />
                    </div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <h2 className="text-2xl font-bold font-display text-white">Water Usage</h2>
                          <p className="text-white/40 text-sm">Total Bill: <span className="text-white font-mono">₹{breakdownData.water.total}</span></p>
                        </div>
                        <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                          <Droplets className="w-6 h-6" />
                        </div>
                      </div>

                      {/* Custom Bar Chart Visualization */}
                      <div className="space-y-6">
                        {breakdownData.water.items.map((item, i) => (
                          <div key={i} className="group/bar">
                            <div className="flex justify-between text-sm mb-2">
                              <span className="flex items-center gap-2 font-medium text-white/80">
                                <item.icon className="w-4 h-4 text-white/40" /> {item.name}
                              </span>
                              <span className="font-mono text-white/60">{item.value} ({item.percent}%)</span>
                            </div>
                            <div className="h-4 bg-white/5 rounded-full overflow-hidden">
                              <div 
                                style={{ width: `${item.percent}%` }} 
                                className={`h-full ${item.color} shadow-[0_0_15px_rgba(0,0,0,0.3)] relative group-hover/bar:brightness-110 transition-all duration-500`}
                              >
                                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 6. AI INSIGHTS GRID */}
                <h2 className="text-2xl font-bold text-white mb-8 pl-2 border-l-4 border-emerald-500">AI Findings & Anomalies</h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                  
                  <div className="bg-red-950/20 border border-red-500/30 p-6 rounded-3xl hover:bg-red-900/20 transition-colors group">
                    <div className="flex items-start justify-between mb-4">
                       <div className="p-2 bg-red-500/20 rounded-lg text-red-400"><AlertCircle className="w-6 h-6" /></div>
                       <span className="text-xs font-bold text-red-400 uppercase tracking-widest">Critical</span>
                    </div>
                    <p className="text-3xl font-black text-white mb-1 group-hover:scale-105 transition-transform origin-left">AC Unit</p>
                    <p className="text-white/60 text-sm">Consuming 45% of total electricity.</p>
                  </div>

                  <div className="bg-emerald-950/20 border border-emerald-500/30 p-6 rounded-3xl hover:bg-emerald-900/20 transition-colors group">
                    <div className="flex items-start justify-between mb-4">
                       <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400"><TrendingUp className="w-6 h-6" /></div>
                       <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Opportunity</span>
                    </div>
                    <p className="text-3xl font-black text-white mb-1 group-hover:scale-105 transition-transform origin-left">₹420/mo</p>
                    <p className="text-white/60 text-sm">Potential savings by reducing shower time.</p>
                  </div>

                  <div className="bg-blue-950/20 border border-blue-500/30 p-6 rounded-3xl hover:bg-blue-900/20 transition-colors group">
                    <div className="flex items-start justify-between mb-4">
                       <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400"><TrendingUp className="w-6 h-6" /></div>
                       <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Comparison</span>
                    </div>
                    <p className="text-3xl font-black text-white mb-1 group-hover:scale-105 transition-transform origin-left">+12%</p>
                    <p className="text-white/60 text-sm">Your usage vs. similar 3BHK homes.</p>
                  </div>

                  <div className="bg-purple-950/20 border border-purple-500/30 p-6 rounded-3xl hover:bg-purple-900/20 transition-colors group">
                    <div className="flex items-start justify-between mb-4">
                       <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400"><Zap className="w-6 h-6" /></div>
                       <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Projection</span>
                    </div>
                    <p className="text-3xl font-black text-white mb-1 group-hover:scale-105 transition-transform origin-left">₹30k/yr</p>
                    <p className="text-white/60 text-sm">Total annual savings potential.</p>
                  </div>

                </div>

                {/* 7. FOOTER CTA */}
                <div className="flex flex-col items-center">
                    <Link
                    href="/recommendations"
                    className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-[#050B08] px-12 py-5 rounded-full text-xl font-bold tracking-tight shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_0_60px_-15px_rgba(16,185,129,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                    >
                    <span className="relative z-10">Get Actionable Fixes</span>
                    <ArrowLeft className="w-6 h-6 relative z-10 group-hover:translate-x-1 rotate-180 transition-transform" />
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-lg group-hover:blur-xl transition-all opacity-0 group-hover:opacity-100" />
                    </Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}