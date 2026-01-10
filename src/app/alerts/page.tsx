'use client';

import Link from "next/link";
import Sidebar from "@/app/components/Sidebar"; // IMPORT SIDEBAR
import { 
  Zap, 
  Droplets, 
  AlertTriangle, 
  ThermometerSun, 
  Wrench, 
  FileText, 
  ArrowLeft, 
  ShieldCheck, 
  BellRing, 
  Settings, 
  Wifi, 
  WifiOff,
  Activity,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { Outfit, Inter } from "next/font/google";
import { useState } from "react";

// 1. Font Setup
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// 2. Enhanced Data with Styling Logic
const alerts = [
  {
    id: 1,
    type: "outage",
    icon: Zap,
    title: "Power Cut Alert",
    message: "Expected power outage in North Raichur due to grid load.",
    time: "Today 8:00 PM - 11:00 PM",
    severity: "critical",
    action: "Prepare Backup",
    color: "red"
  },
  {
    id: 2,
    type: "emergency",
    icon: ThermometerSun,
    title: "Heat Wave Warning",
    message: "Extreme heat index. Avoid outdoor activities between 2-5 PM.",
    time: "Today 2:00 PM",
    severity: "high",
    action: "Safety Tips",
    color: "orange"
  },
  {
    id: 3,
    type: "conservation",
    icon: Activity,
    title: "Grid Stress Advisory",
    message: "High demand expected. Please increase AC temp by 2°C.",
    time: "Today 5:00 PM",
    severity: "medium",
    action: "Optimize",
    color: "amber"
  },
  {
    id: 4,
    type: "maintenance",
    icon: Wrench,
    title: "Pipeline Maintenance",
    message: "Water supply interrupted for repairs in Sector 4.",
    time: "Tomorrow 6:00 AM",
    severity: "low",
    action: "Details",
    color: "cyan"
  },
  {
    id: 5,
    type: "bill",
    icon: FileText,
    title: "Usage Spike",
    message: "Electricity usage is 20% higher than your average.",
    time: "Yesterday",
    severity: "info",
    action: "Analyze",
    color: "purple"
  },
];

export default function AlertsPage() {
  const [offlineMode, setOfflineMode] = useState(true);

  return (
    <div className={`${outfit.variable} ${inter.variable} min-h-screen bg-[#050B08] text-white font-sans selection:bg-emerald-500/30 relative overflow-x-hidden`}>
      
      {/* 3. BACKGROUND FX */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px]" />
        {/* Grid & Noise */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
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
                
                {/* 4. HEADER & NAV */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                  <div className="space-y-2">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 text-white/40 hover:text-emerald-400 transition-colors text-sm font-medium">
                      <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-black font-display tracking-tight text-white flex items-center gap-3">
                      System Alerts
                      <span className="relative flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                      </span>
                    </h1>
                    <p className="text-white/50 max-w-lg">
                      Real-time feed from MESCOM, RUWSS, and District Authorities.
                    </p>
                  </div>

                  {/* Quick Stats / Legend */}
                  <div className="flex gap-3">
                    <div className="px-5 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 flex flex-col items-center justify-center min-w-[100px]">
                      <span className="text-2xl font-bold text-red-400 font-display">1</span>
                      <span className="text-xs uppercase tracking-wider text-red-400/70 font-bold">Critical</span>
                    </div>
                    <div className="px-5 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col items-center justify-center min-w-[100px]">
                      <span className="text-2xl font-bold text-amber-400 font-display">2</span>
                      <span className="text-xs uppercase tracking-wider text-amber-400/70 font-bold">Warnings</span>
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-[1fr_360px] gap-8">
                  
                  {/* 5. ALERTS FEED (Left Column) */}
                  <div className="space-y-4">
                    {alerts.map((alert) => (
                      <div 
                        key={alert.id}
                        className={`group relative overflow-hidden rounded-3xl border backdrop-blur-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl
                          ${alert.color === 'red' ? 'bg-red-950/20 border-red-500/30 shadow-[0_0_30px_-10px_rgba(239,68,68,0.2)]' : ''}
                          ${alert.color === 'orange' ? 'bg-orange-950/20 border-orange-500/30' : ''}
                          ${alert.color === 'amber' ? 'bg-amber-950/20 border-amber-500/30' : ''}
                          ${alert.color === 'cyan' ? 'bg-cyan-950/20 border-cyan-500/30' : ''}
                          ${alert.color === 'purple' ? 'bg-purple-950/20 border-purple-500/30' : ''}
                        `}
                      >
                        {/* Glow Effect on Hover */}
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-r from-${alert.color}-500/10 to-transparent`} />

                        <div className="relative p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
                          
                          {/* Icon Box */}
                          <div className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center border
                            ${alert.color === 'red' ? 'bg-red-500/20 border-red-500/40 text-red-400' : ''}
                            ${alert.color === 'orange' ? 'bg-orange-500/20 border-orange-500/40 text-orange-400' : ''}
                            ${alert.color === 'amber' ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' : ''}
                            ${alert.color === 'cyan' ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400' : ''}
                            ${alert.color === 'purple' ? 'bg-purple-500/20 border-purple-500/40 text-purple-400' : ''}
                          `}>
                            <alert.icon className="w-7 h-7" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                              <h3 className="text-xl font-bold text-white font-display">{alert.title}</h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border
                                ${alert.color === 'red' ? 'bg-red-500/10 border-red-500/20 text-red-400 animate-pulse' : ''}
                                ${alert.color === 'orange' ? 'bg-orange-500/10 border-orange-500/20 text-orange-400' : ''}
                                ${alert.color === 'amber' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : ''}
                                ${alert.color === 'cyan' ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' : ''}
                                ${alert.color === 'purple' ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' : ''}
                              `}>
                                {alert.severity}
                              </span>
                            </div>
                            
                            <p className="text-white/70 mb-4 leading-relaxed">{alert.message}</p>
                            
                            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5">
                              <span className="text-xs font-mono text-white/40 flex items-center gap-2">
                                <Activity className="w-3 h-3" /> {alert.time}
                              </span>
                              <button className={`px-5 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105 active:scale-95
                                ${alert.color === 'red' ? 'bg-red-500 text-black shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'}
                              `}>
                                {alert.action}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 6. SIDEBAR SETTINGS (Right Column) */}
                  <div className="space-y-6">
                    
                    {/* Control Panel */}
                    <div className="bg-[#0A0F0D]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-2xl">
                      <div className="flex items-center gap-3 mb-6">
                        <Settings className="w-5 h-5 text-emerald-400" />
                        <h3 className="text-lg font-bold text-white font-display">Filter Channels</h3>
                      </div>

                      <div className="space-y-2">
                        {['Critical Outages', 'Conservation Tips', 'Bill Alerts', 'Maintenance'].map((item, i) => (
                          <label key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group">
                            <span className="text-white/70 text-sm font-medium group-hover:text-white transition-colors">{item}</span>
                            <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-white/10 border border-white/5 transition-colors group-hover:border-emerald-500/30 has-[:checked]:bg-emerald-500/20 has-[:checked]:border-emerald-500">
                              <input type="checkbox" defaultChecked className="peer sr-only" />
                              <span className="inline-block h-4 w-4 transform rounded-full bg-white/40 transition peer-checked:translate-x-6 peer-checked:bg-emerald-400 ml-1" />
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Offline Status */}
                    <div className={`rounded-[2rem] p-6 border transition-colors duration-300
                      ${offlineMode ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-red-950/20 border-red-500/30'}
                    `}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${offlineMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                            {offlineMode ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
                          </div>
                          <div>
                            <h3 className="font-bold text-white text-sm">Offline Grid</h3>
                            <p className="text-xs text-white/40">{offlineMode ? 'SMS Fallback Active' : 'Disconnected'}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => setOfflineMode(!offlineMode)}
                          className="text-xs font-bold underline text-white/50 hover:text-white"
                        >
                          Toggle
                        </button>
                      </div>
                      <p className="text-xs text-white/60 leading-relaxed">
                        Savera automatically caches critical alerts via SMS protocol when internet is down in Raichur.
                      </p>
                    </div>

                    {/* Trusted Sources */}
                    <div className="bg-[#0A0F0D] border border-white/10 rounded-[2rem] p-6">
                      <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <ShieldCheck className="w-3 h-3" /> Verified Sources
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex flex-col items-center text-center gap-2">
                          <Zap className="w-5 h-5 text-amber-400" />
                          <span className="text-xs font-bold text-white/80">MESCOM</span>
                        </div>
                        <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex flex-col items-center text-center gap-2">
                          <Droplets className="w-5 h-5 text-cyan-400" />
                          <span className="text-xs font-bold text-white/80">RUWSS</span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/5 text-center">
                          <p className="text-[10px] text-white/30">
                            256-bit Encrypted Government Data Stream
                          </p>
                      </div>
                    </div>

                  </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}