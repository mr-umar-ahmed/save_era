'use client';

import React from "react";
import { 
  Activity, 
  Users, 
  Send, 
  Map, 
  ShieldAlert, 
  Megaphone, 
  CheckCircle2, 
  Radio,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Siren,
  Lock,
  Menu,
  Bell
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Outfit, Inter } from "next/font/google";

// --- 1. FONTS & CONFIG ---
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// --- 2. MOCK DATA ---
const CHART_DATA = [
  { time: '00:00', load: 40 }, { time: '04:00', load: 35 },
  { time: '08:00', load: 65 }, { time: '12:00', load: 75 },
  { time: '16:00', load: 85 }, { time: '20:00', load: 92 },
  { time: '23:59', load: 60 },
];

const REGIONAL_DATA = [
  { region: "North Sector", usage: 88, status: "Critical", trend: "up", color: "red" },
  { region: "South Sector", usage: 45, status: "Stable", trend: "down", color: "emerald" },
  { region: "East Sector", usage: 62, status: "Moderate", trend: "flat", color: "amber" },
  { region: "West Sector", usage: 30, status: "Optimal", trend: "down", color: "cyan" },
];

const KPI_DATA = [
  { label: "Active Nodes", value: "45,230", sub: "+12% this week", icon: Users, color: "blue" },
  { label: "Alerts Dispatched", value: "1,247", sub: "Last 30 days", icon: Radio, color: "indigo" },
  { label: "Load Shedding", value: "2.4 MW", sub: "Averted via DR", icon: Activity, color: "emerald" },
  { label: "Water Conserved", value: "89 ML", sub: "Regional Aggregation", icon: CheckCircle2, color: "cyan" },
];

const ALERT_DATA = [
  { title: "Grid Stress Spike", loc: "North Sector", sev: "Critical", time: "2m ago" },
  { title: "Pipeline Maint.", loc: "Central Zone", sev: "Warning", time: "1h ago" },
  { title: "Heatwave Index", loc: "All Regions", sev: "Info", time: "3h ago" },
];

// --- 3. SUB-COMPONENTS (For Structure) ---

const StatCard = ({ item }: { item: typeof KPI_DATA[0] }) => (
  <div className="bg-[#0f172a]/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl hover:bg-white/[0.03] transition-colors group relative overflow-hidden">
    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-${item.color}-400`}>
      <item.icon className="w-16 h-16 transform translate-x-4 -translate-y-4" />
    </div>
    <div className="relative z-10">
      <div className="flex items-center gap-2 mb-3">
        <div className={`p-2 rounded-lg bg-${item.color}-500/10`}>
           <item.icon className={`w-4 h-4 text-${item.color}-400`} />
        </div>
        <p className="text-xs font-bold text-white/40 uppercase tracking-widest">{item.label}</p>
      </div>
      <p className="text-3xl font-black font-display text-white tracking-tight">{item.value}</p>
      <p className={`text-xs mt-1 font-medium text-${item.color}-400/80`}>{item.sub}</p>
    </div>
  </div>
);

const RegionCard = ({ region }: { region: typeof REGIONAL_DATA[0] }) => (
  <div className={`relative overflow-hidden p-5 rounded-2xl border bg-black/20 backdrop-blur-sm group hover:scale-[1.01] transition-transform
    ${region.color === 'red' ? 'border-red-500/30 shadow-[0_0_30px_-10px_rgba(239,68,68,0.2)]' : 'border-white/5'}
  `}>
    <div className="flex justify-between items-start z-10 relative">
      <div>
        <h3 className="font-bold text-white">{region.region}</h3>
        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase mt-2 border ${
           region.color === 'red' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 
           region.color === 'emerald' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
           region.color === 'amber' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
        }`}>
          {region.status}
        </span>
      </div>
      <div className="text-right">
        <p className="text-2xl font-black font-display">{region.usage}%</p>
        <div className="flex items-center justify-end gap-1 text-xs text-white/40">
          {region.trend === 'up' && <ArrowUpRight className="w-3 h-3 text-red-400" />}
          {region.trend === 'down' && <ArrowDownRight className="w-3 h-3 text-emerald-400" />}
          {region.trend === 'flat' && <Minus className="w-3 h-3 text-white/40" />}
          <span>Load</span>
        </div>
      </div>
    </div>
    {/* Progress Bar */}
    <div className="absolute bottom-0 left-0 h-1 bg-white/5 w-full">
      <div 
        style={{width: `${region.usage}%`}} 
        className={`h-full transition-all duration-1000 ${
          region.color === 'red' ? 'bg-red-500' : 
          region.color === 'emerald' ? 'bg-emerald-500' :
          region.color === 'amber' ? 'bg-amber-500' : 'bg-cyan-500'
        }`} 
      />
    </div>
  </div>
);

const ChartSection = () => (
  <div className="mt-6 pt-6 border-t border-white/5">
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="w-2 h-8 bg-blue-500 rounded-full" />
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Aggregate Demand</h3>
          <p className="text-xs text-white/40">Real-time load across all sectors</p>
        </div>
      </div>
      <span className="flex items-center gap-2 text-xs font-mono text-red-400 bg-red-950/30 px-3 py-1 rounded-full border border-red-500/20 animate-pulse">
        <span className="w-2 h-2 rounded-full bg-red-500" /> LIVE FEED
      </span>
    </div>
    <div className="h-[250px] w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={CHART_DATA}>
          <defs>
            <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 10}} dy={10} />
          <YAxis hide domain={[0, 100]} />
          <Tooltip 
            contentStyle={{backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)'}}
            itemStyle={{color: '#fff', fontSize: '12px'}}
            labelStyle={{color: '#94a3b8', marginBottom: '4px', fontSize: '10px', textTransform: 'uppercase'}}
          />
          <Area type="monotone" dataKey="load" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorLoad)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const AlertFeed = () => (
  <div className="bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col h-full min-h-[400px]">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-lg font-bold font-display flex items-center gap-2">
        <Siren className="w-5 h-5 text-red-400" /> Live Incidents
      </h2>
      <button className="text-xs hover:text-white text-white/40 transition-colors">View All</button>
    </div>
    <div className="space-y-3 overflow-y-auto flex-1 pr-2 custom-scrollbar">
      {ALERT_DATA.map((alert, i) => (
        <div key={i} className={`p-4 rounded-xl border flex items-start justify-between transition-all hover:translate-x-1 ${
          alert.sev === 'Critical' ? 'bg-red-500/5 border-red-500/20' : 
          alert.sev === 'Warning' ? 'bg-amber-500/5 border-amber-500/20' : 'bg-blue-500/5 border-blue-500/20'
        }`}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`w-1.5 h-1.5 rounded-full ${
                alert.sev === 'Critical' ? 'bg-red-400' : 
                alert.sev === 'Warning' ? 'bg-amber-400' : 'bg-blue-400'
              }`} />
              <p className={`text-[10px] font-bold uppercase tracking-wider ${
                alert.sev === 'Critical' ? 'text-red-400' : 
                alert.sev === 'Warning' ? 'text-amber-400' : 'text-blue-400'
              }`}>{alert.sev}</p>
            </div>
            <p className="font-bold text-sm text-white">{alert.title}</p>
            <p className="text-xs text-white/40 mt-0.5">{alert.loc}</p>
          </div>
          <span className="text-[10px] text-white/20 font-mono whitespace-nowrap">{alert.time}</span>
        </div>
      ))}
    </div>
  </div>
);

const BroadcastPanel = () => (
  <div className="bg-gradient-to-br from-blue-950/50 to-slate-900/50 backdrop-blur-xl border border-blue-500/20 rounded-3xl p-6 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
    
    <h2 className="text-lg font-bold font-display mb-1 flex items-center gap-2 relative z-10">
      <Megaphone className="w-5 h-5 text-blue-400" /> Quick Broadcast
    </h2>
    <p className="text-xs text-white/40 mb-6 relative z-10">Send alerts to regional subscribers</p>

    <form className="space-y-4 relative z-10">
      <div>
        <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2 block">Priority Level</label>
        <div className="relative">
          <select className="w-full bg-[#020617] border border-white/10 rounded-xl p-3 text-sm text-white focus:border-blue-500 outline-none appearance-none">
            <option>⚠️ Critical (Push + SMS)</option>
            <option>ℹ️ Advisory (Push Only)</option>
          </select>
          <ArrowDownRight className="absolute right-3 top-3.5 w-4 h-4 text-white/20 pointer-events-none" />
        </div>
      </div>
      <div>
        <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2 block">Message Body</label>
        <textarea 
          rows={3}
          className="w-full bg-[#020617] border border-white/10 rounded-xl p-3 text-sm text-white focus:border-blue-500 outline-none resize-none placeholder:text-white/20"
          placeholder="e.g. Reduce load by 15% immediately..."
        />
      </div>
      <button type="button" className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-sm text-white shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]">
         <Send className="w-4 h-4" /> Transmit Signal
      </button>
    </form>
  </div>
);

// --- 4. MAIN PAGE COMPONENT ---

export default function GovAdminPage() {
  return (
    <div className={`${outfit.variable} ${inter.variable} min-h-screen bg-[#020617] text-white font-sans selection:bg-blue-500/30 relative overflow-x-hidden`}>
      
      {/* Background FX */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[20%] w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      </div>

      {/* Header */}
      <header className="relative z-20 border-b border-white/5 bg-[#020617]/80 backdrop-blur-md sticky top-0">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
           <div className="flex items-center gap-4">
             <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-900/20">
               <ShieldAlert className="w-5 h-5 text-white" />
             </div>
             <div>
               <h1 className="text-lg font-bold font-display tracking-wide leading-none">SAVERA <span className="text-blue-500">GOV</span></h1>
               <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono mt-1">Mescom Command Node</p>
             </div>
           </div>
           
           <div className="flex items-center gap-6">
             <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/30 bg-red-500/10">
                 <span className="relative flex h-2 w-2">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                 </span>
                 <span className="text-xs font-bold text-red-400 uppercase tracking-wider">Grid Stress: High</span>
             </div>
             
             <div className="flex items-center gap-4 border-l border-white/10 pl-6">
               <button className="text-white/60 hover:text-white transition-colors relative">
                 <Bell className="w-5 h-5" />
                 <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#020617]" />
               </button>
               <div className="text-right hidden sm:block">
                 <p className="text-xs font-bold text-white">Admin Officer</p>
                 <p className="text-[10px] text-white/40">ID: KA-8821</p>
               </div>
               <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                  <Menu className="w-5 h-5 text-white" />
               </button>
             </div>
           </div>
        </div>
      </header>

      <main className="relative z-10 max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 space-y-6">

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {KPI_DATA.map((item, i) => <StatCard key={i} item={item} />)}
        </div>

        {/* Dashboard Core */}
        <div className="grid lg:grid-cols-3 gap-6 h-auto">
          
          {/* Left Column: Regional Map + Chart */}
          <div className="lg:col-span-2 bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 lg:p-8 flex flex-col justify-between">
             <div className="mb-8">
               <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                 <h2 className="text-xl font-bold font-display flex items-center gap-2">
                   <Map className="w-5 h-5 text-blue-400" /> Regional Load Matrix
                 </h2>
                 <div className="flex gap-3 bg-black/20 p-1.5 rounded-lg border border-white/5">
                   <div className="flex items-center gap-1.5 px-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span><span className="text-[10px] font-bold text-white/60 uppercase">Critical</span>
                   </div>
                   <div className="flex items-center gap-1.5 px-2 border-l border-white/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span><span className="text-[10px] font-bold text-white/60 uppercase">Stable</span>
                   </div>
                 </div>
               </div>

               <div className="grid md:grid-cols-2 gap-4">
                 {REGIONAL_DATA.map((region, i) => <RegionCard key={i} region={region} />)}
               </div>
             </div>
             
             <ChartSection />
          </div>

          {/* Right Column: Alerts + Actions */}
          <div className="flex flex-col gap-6">
            <AlertFeed />
            <BroadcastPanel />
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-6 py-4 opacity-40 hover:opacity-100 transition-opacity">
           <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest">
              <Lock className="w-3 h-3" /> 256-bit Encrypted Connection
           </div>
           <div className="w-1 h-1 bg-white/50 rounded-full" />
           <div className="text-[10px] uppercase tracking-widest">
              Auth Level 4 Clearance
           </div>
        </div>

      </main>
    </div>
  );
}