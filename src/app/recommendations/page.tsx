'use client';

import Link from "next/link";
import Sidebar from "@/app/components/Sidebar"; // IMPORT SIDEBAR
import { 
  Check, 
  Clock, 
  Bot, 
  Zap, 
  Droplets, 
  Lightbulb, 
  Thermometer, 
  ArrowRight, 
  Sparkles,
  Wrench,
  Shirt,
  Cpu,
  Target
} from "lucide-react";
import { Outfit, Inter } from "next/font/google";

// 1. Font Setup
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// 2. Data
const recommendations = [
  {
    id: 1,
    title: "AC Optimization Protocol",
    desc: "Shift setpoint to 26°C. Current avg: 22°C.",
    savings: "₹850",
    time: "2 min",
    type: "quick-win",
    icon: Thermometer,
    color: "emerald",
    category: "Cooling"
  },
  {
    id: 2,
    title: "Hydro-Efficiency Cycle",
    desc: "Reduce shower duration by 2 mins/day.",
    savings: "₹420",
    time: "Daily",
    type: "quick-win",
    icon: Droplets,
    color: "cyan",
    category: "Water"
  },
  {
    id: 3,
    title: "Lumen Upgrade",
    desc: "Replace 5 incandescent bulbs with LEDs.",
    savings: "₹650",
    time: "1 hour",
    type: "medium",
    icon: Lightbulb,
    color: "amber",
    category: "Lighting"
  },
  {
    id: 4,
    title: "Smart Load Balancing",
    desc: "Run washing machine only at full capacity.",
    savings: "₹380",
    time: "Habit",
    type: "quick-win",
    icon: Shirt,
    color: "purple",
    category: "Appliance"
  },
  {
    id: 5,
    title: "Hardware Retrofit",
    desc: "Install low-flow shower heads.",
    savings: "₹200",
    time: "High Effort",
    type: "long-term",
    icon: Wrench,
    color: "blue",
    category: "Hardware"
  },
];

export default function RecommendationsPage() {
  return (
    <div className={`${outfit.variable} ${inter.variable} min-h-screen bg-[#050B08] text-white font-sans selection:bg-emerald-500/30 relative overflow-x-hidden`}>
      
      {/* 3. BACKGROUND FX */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[30%] w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8">
        
        {/* LAYOUT GRID: SIDEBAR + CONTENT */}
        <div className="flex flex-col lg:flex-row gap-6">

            {/* SIDEBAR */}
            <div className="hidden lg:block w-[260px] shrink-0">
                <Sidebar />
            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 min-w-0">
                
                {/* 4. HEADER & HUD */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md">
                      <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                      <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">
                        AI Analysis Complete
                      </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight text-white">
                      System <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Upgrades</span>
                    </h1>
                    <p className="text-white/50 text-lg max-w-xl">
                      Applying these 5 patches will increase your household efficiency by 22%.
                    </p>
                  </div>

                  {/* Total Savings HUD */}
                  <div className="bg-[#0A0F0D]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex items-center gap-6 shadow-2xl">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                        <Zap className="w-8 h-8" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Potential Savings</p>
                        <p className="text-4xl font-black font-display text-white">₹2,500<span className="text-sm text-white/40 font-sans font-medium">/mo</span></p>
                      </div>
                  </div>
                </div>

                {/* 5. RECOMMENDATIONS LIST */}
                <div className="space-y-6 mb-20">
                  {recommendations.map((rec) => (
                    <div 
                      key={rec.id}
                      className="group relative bg-[#0A0F0D]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-1 overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:-translate-y-1"
                    >
                      {/* Animated Gradient Border Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-r from-${rec.color}-500/0 via-${rec.color}-500/10 to-${rec.color}-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                      <div className="relative bg-[#0A0F0D] rounded-[1.9rem] p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start md:items-center">
                        
                        {/* Icon & Category */}
                        <div className="flex flex-row md:flex-col items-center gap-4 md:gap-2 min-w-[80px]">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border bg-gradient-to-br shadow-[0_0_15px_rgba(0,0,0,0.5)]
                              ${rec.color === 'emerald' ? 'from-emerald-500/20 to-green-900/20 border-emerald-500/30 text-emerald-400' : ''}
                              ${rec.color === 'cyan' ? 'from-cyan-500/20 to-blue-900/20 border-cyan-500/30 text-cyan-400' : ''}
                              ${rec.color === 'amber' ? 'from-amber-500/20 to-orange-900/20 border-amber-500/30 text-amber-400' : ''}
                              ${rec.color === 'purple' ? 'from-purple-500/20 to-pink-900/20 border-purple-500/30 text-purple-400' : ''}
                              ${rec.color === 'blue' ? 'from-blue-500/20 to-indigo-900/20 border-blue-500/30 text-blue-400' : ''}
                          `}>
                            <rec.icon className="w-6 h-6" />
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-white/30 hidden md:block">{rec.category}</span>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-white font-display">{rec.title}</h3>
                            {rec.type === 'quick-win' && (
                              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wide">
                                Quick Win
                              </span>
                            )}
                          </div>
                          <p className="text-white/60 text-sm mb-4 leading-relaxed">{rec.desc}</p>
                          
                          <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <Target className="w-4 h-4 text-emerald-400" />
                                <span className="text-lg font-bold text-white">{rec.savings}<span className="text-xs text-white/40">/mo</span></span>
                            </div>
                            <div className="h-4 w-px bg-white/10" />
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-white/40" />
                                <span className="text-sm font-medium text-white/60">{rec.time}</span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto">
                          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-emerald-400 transition-colors shadow-lg">
                            <Check className="w-4 h-4" /> Apply
                          </button>
                          <div className="flex gap-3">
                              <button className="flex-1 md:flex-none p-3 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-colors" title="Remind Later">
                                <Clock className="w-4 h-4" />
                              </button>
                              <button className="flex-1 md:flex-none p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 hover:bg-purple-500/20 transition-colors" title="Automate with AI">
                                <Bot className="w-4 h-4" />
                              </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>

                {/* 6. HOW IT WORKS (Diagram Section) */}
                <div className="bg-gradient-to-r from-blue-900/20 to-indigo-900/20 backdrop-blur-xl border border-blue-500/20 rounded-[2.5rem] p-8 md:p-12 mb-20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-5">
                      <Cpu className="w-64 h-64 text-blue-400" />
                    </div>
                    
                    <div className="relative z-10">
                      <div className="mb-8">
                        <h2 className="text-2xl font-bold text-white font-display mb-2">How AI Analyzes Your Home</h2>
                        <p className="text-white/50 text-sm">Understanding the logic behind these recommendations.</p>
                      </div>

                      {/* DIAGRAM TRIGGER */}
                      <div className="w-full bg-black/40 rounded-2xl border border-white/10 p-6 flex flex-col items-center justify-center min-h-[300px]">
                        
                        <p className="mt-4 text-xs text-white/30 font-mono">FIG 1.0: Azure IoT Hub Data Processing Pipeline</p>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-8 mt-12">
                        <div className="flex flex-col gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold border border-blue-500/20">1</div>
                          <h3 className="font-bold text-white">Pattern Recognition</h3>
                          <p className="text-sm text-white/50 leading-relaxed">We compare your usage spikes against 10M+ data points to identify inefficient appliances.</p>
                        </div>
                        <div className="flex flex-col gap-3">
                          <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 font-bold border border-purple-500/20">2</div>
                          <h3 className="font-bold text-white">Contextual Matching</h3>
                          <p className="text-sm text-white/50 leading-relaxed">We cross-reference local weather (Raichur heat) with your cooling patterns.</p>
                        </div>
                        <div className="flex flex-col gap-3">
                          <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold border border-emerald-500/20">3</div>
                          <h3 className="font-bold text-white">Impact Forecasting</h3>
                          <p className="text-sm text-white/50 leading-relaxed">Our models predict financial savings based on your specific tariff rates.</p>
                        </div>
                      </div>
                    </div>
                </div>

                {/* 7. FOOTER NAV */}
                <div className="flex flex-col items-center justify-center space-y-8">
                    <Link 
                      href="/impact"
                      className="group relative px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-[#050B08] rounded-full font-bold text-xl hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_-5px_rgba(16,185,129,0.5)]"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Visualize Impact <ArrowRight className="w-5 h-5" />
                      </span>
                    </Link>
                    
                    <div className="flex gap-6 text-sm font-medium text-white/30">
                      <Link href="/breakdown" className="hover:text-emerald-400 transition-colors">Breakdown</Link>
                      <span>•</span>
                      <Link href="/challenges" className="hover:text-emerald-400 transition-colors">Mission Center</Link>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}