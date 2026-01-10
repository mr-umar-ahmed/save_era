'use client';

import Link from "next/link";
import { demoData } from "@/app/lib/data"; // Assuming this exists, or use the mock below
import UsageChart from "@/app/components/Chart";
import Sidebar from "@/app/components/Sidebar"; // IMPORT SIDEBAR
import { 
  Zap, 
  Droplets, 
  ArrowUpRight, 
  ArrowDownRight, 
  Activity, 
  Sparkles,
  LayoutDashboard,
  AlertTriangle,
  Clock
} from "lucide-react";
import { Outfit, Inter } from "next/font/google";

// 1. Font Setup
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Mock Data
const data = {
  electricity: { cost: 4500, waste: 12, units: 850, trend: 'up' },
  water: { cost: 1200, waste: 8, liters: 15000, trend: 'down' },
  savings: { value: '₹12,450', target: '₹15k' },
  stats: { peak: '8-10 PM', rank: 'Top 20%', nextAlert: '6 PM' }
};

export default function Dashboard() {
  return (
    <div className={`${outfit.variable} ${inter.variable} min-h-screen bg-[#050B08] text-white font-sans selection:bg-emerald-500/30 relative overflow-x-hidden`}>
      
      {/* 2. BACKGROUND FX */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8">
        
        {/* LAYOUT GRID: SIDEBAR + CONTENT */}
        <div className="flex flex-col lg:flex-row gap-6">
            
            {/* SIDEBAR COMPONENT */}
            <div className="hidden lg:block w-[260px] shrink-0">
                <Sidebar />
            </div>

            {/* MAIN DASHBOARD CONTENT */}
            <div className="flex-1 min-w-0">
                
                {/* 3. HEADER */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">System Online</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight text-white">
                      Command <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Center</span>
                    </h1>
                    <p className="text-white/50 text-lg mt-2">Real-time biometrics for your home infrastructure.</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                        <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Location</p>
                        <p className="text-white font-medium">Raichur, KA</p>
                    </div>
                    <div className="h-10 w-px bg-white/10 hidden md:block" />
                    <Link href="/settings" className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                        <LayoutDashboard className="w-5 h-5 text-white/70" />
                    </Link>
                  </div>
                </div>

                {/* 4. KPI BENTO GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  
                  {/* Card 1: Electricity (Amber) */}
                  <div className="group relative bg-[#0A0F0D]/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]" />
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          <Zap className="w-6 h-6" />
                        </div>
                        <div className="flex items-center gap-1 text-xs font-bold text-red-400 bg-red-500/10 px-2 py-1 rounded-lg border border-red-500/20">
                          <ArrowUpRight className="w-3 h-3" /> {data.electricity.waste}% Waste
                        </div>
                      </div>
                      <p className="text-white/50 text-sm font-medium">Electricity</p>
                      <p className="text-3xl font-black font-display text-white mt-1">₹{data.electricity.cost}</p>
                      <div className="mt-4 flex items-center gap-2 text-xs text-white/40">
                          <Activity className="w-3 h-3 text-amber-500" />
                          <span>{data.electricity.units} kWh usage</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Water (Cyan) */}
                  <div className="group relative bg-[#0A0F0D]/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 hover:border-cyan-500/30 transition-all duration-500 hover:-translate-y-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]" />
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                          <Droplets className="w-6 h-6" />
                        </div>
                        <div className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
                          <ArrowDownRight className="w-3 h-3" /> Optimal
                        </div>
                      </div>
                      <p className="text-white/50 text-sm font-medium">Water</p>
                      <p className="text-3xl font-black font-display text-white mt-1">₹{data.water.cost}</p>
                      <div className="mt-4 flex items-center gap-2 text-xs text-white/40">
                          <Activity className="w-3 h-3 text-cyan-500" />
                          <span>{data.water.liters.toLocaleString()} L usage</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Savings (Emerald - Main) */}
                  <div className="group relative bg-gradient-to-br from-emerald-900/40 to-teal-900/40 backdrop-blur-xl border border-emerald-500/30 rounded-[2rem] p-6 hover:border-emerald-400/50 transition-all duration-500 hover:-translate-y-1 lg:col-span-1">
                      <div className="absolute top-0 right-0 p-6 opacity-10">
                        <Sparkles className="w-24 h-24 text-emerald-400" />
                      </div>
                      <div className="relative z-10 h-full flex flex-col justify-between">
                        <div>
                          <h3 className="text-emerald-400 font-bold text-sm uppercase tracking-wider mb-1">Total Savings</h3>
                          <p className="text-4xl font-black font-display text-white">{data.savings.value}</p>
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between text-xs text-emerald-200/60 mb-2">
                              <span>Goal: {data.savings.target}</span>
                              <span>82%</span>
                            </div>
                            <div className="h-2 bg-emerald-950 rounded-full overflow-hidden">
                              <div className="h-full w-[82%] bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                            </div>
                        </div>
                      </div>
                  </div>

                  {/* Card 4: Quick HUD */}
                  <div className="bg-[#0A0F0D]/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 flex flex-col justify-between">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-xs font-bold text-white/60 uppercase tracking-widest">Live HUD</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                          <span className="text-sm text-white/40">Peak Hour</span>
                          <span className="text-sm font-bold text-white">{data.stats.peak}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                          <span className="text-sm text-white/40">Efficiency Rank</span>
                          <span className="text-sm font-bold text-emerald-400">{data.stats.rank}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-sm text-white/40">Next Alert</span>
                          <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded text-white">{data.stats.nextAlert}</span>
                        </div>
                      </div>
                  </div>
                </div>

                {/* 5. CHARTS SECTION */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
                  <UsageChart 
                    data={demoData.electricity.appliances}
                    title="Energy Matrix"
                    color="#F59E0B" // Amber
                    total={`₹${demoData.electricity.monthlyCost}`}
                  />
                  <UsageChart 
                    data={demoData.water.fixtures}
                    title="Water Flow"
                    color="#06B6D4" // Cyan
                    total={`₹${demoData.water.monthlyCost}`}
                  />
                </div>

                {/* 6. BOTTOM CTA */}
                <div className="flex flex-col items-center justify-center space-y-8 pb-12">
                  <Link 
                    href="/breakdown"
                    className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Initialize Deep Analysis <ArrowUpRight className="w-5 h-5" />
                    </span>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity" />
                  </Link>
                  
                  <div className="flex gap-6 text-sm font-medium text-white/30">
                    <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
                    <span>•</span>
                    <Link href="/alerts" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Alerts
                    </Link>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Real-time</span>
                  </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}