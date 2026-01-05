'use client';

import Link from "next/link";
import { 
  Activity, 
  AlertTriangle, 
  Users, 
  Send, 
  Map, 
  BarChart3, 
  ShieldAlert, 
  Megaphone, 
  CheckCircle2, 
  Radio,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Siren,
  Lock
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Outfit, Inter } from "next/font/google";

// 1. Font Setup
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// 2. Mock Data for Chart
const loadData = [
  { time: '00:00', load: 40, capacity: 100 },
  { time: '04:00', load: 35, capacity: 100 },
  { time: '08:00', load: 65, capacity: 100 },
  { time: '12:00', load: 75, capacity: 100 },
  { time: '16:00', load: 85, capacity: 100 },
  { time: '20:00', load: 92, capacity: 100 }, // Peak
  { time: '23:59', load: 60, capacity: 100 },
];

const regionalData = [
  { region: "North Sector", usage: 88, status: "Critical", trend: "up", color: "red" },
  { region: "South Sector", usage: 45, status: "Stable", trend: "down", color: "emerald" },
  { region: "East Sector", usage: 62, status: "Moderate", trend: "flat", color: "amber" },
  { region: "West Sector", usage: 30, status: "Optimal", trend: "down", color: "cyan" },
];

export default function GovAdminPage() {
  return (
    <div className={`${outfit.variable} ${inter.variable} min-h-screen bg-[#020617] text-white font-sans selection:bg-blue-500/30 relative overflow-x-hidden`}>
      
      {/* 3. BACKGROUND FX */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[20%] w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px]" />
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      </div>

      {/* 4. TOP BAR */}
      <header className="relative z-20 border-b border-white/10 bg-[#020617]/80 backdrop-blur-md sticky top-0">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
           <div className="flex items-center gap-4">
             <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
               <ShieldAlert className="w-5 h-5 text-white" />
             </div>
             <div>
               <h1 className="text-lg font-bold font-display tracking-wide">SAVERA <span className="text-blue-500">GOV</span></h1>
               <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Mescom Command Node • Auth Level 4</p>
             </div>
           </div>
           
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10">
                 <span className="relative flex h-2 w-2">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                 </span>
                 <span className="text-xs font-bold text-red-400 uppercase tracking-wider">Grid Stress: High</span>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-right">
                <p className="text-xs font-bold text-white">Admin Officer</p>
                <p className="text-[10px] text-white/40">ID: KA-8821</p>
              </div>
           </div>
        </div>
      </header>

      <main className="relative z-10 max-w-[1600px] mx-auto p-6 lg:p-10 space-y-8">

        {/* 5. KPI ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Active Nodes", value: "45,230", sub: "+12% this week", icon: Users, color: "blue" },
            { label: "Alerts Dispatched", value: "1,247", sub: "Last 30 days", icon: Radio, color: "indigo" },
            { label: "Load Shedding Averted", value: "2.4 MW", sub: "Via Demand Response", icon: Activity, color: "emerald" },
            { label: "Water Conserved", value: "89 ML", sub: "Regional Aggregation", icon: CheckCircle2, color: "cyan" },
          ].map((stat, i) => (
            <div key={i} className="bg-[#0f172a]/50 backdrop-blur-sm border border-white/5 p-6 rounded-2xl hover:bg-white/5 transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <p className="text-xs font-bold text-white/40 uppercase tracking-widest">{stat.label}</p>
                <stat.icon className={`w-5 h-5 text-${stat.color}-400 group-hover:scale-110 transition-transform`} />
              </div>
              <p className="text-3xl font-black font-display text-white">{stat.value}</p>
              <p className={`text-xs mt-2 font-medium text-${stat.color}-400/80`}>{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* 6. MAIN GRID (Charts & Map) */}
        <div className="grid lg:grid-cols-3 gap-6 h-auto">
          
          {/* Regional Status Grid */}
          <div className="lg:col-span-2 bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 lg:p-8">
             <div className="flex items-center justify-between mb-8">
               <h2 className="text-xl font-bold font-display flex items-center gap-2">
                 <Map className="w-5 h-5 text-blue-400" /> Regional Load Matrix
               </h2>
               <div className="flex gap-2">
                 <span className="w-2 h-2 rounded-full bg-red-500"></span><span className="text-xs text-white/40">Critical</span>
                 <span className="w-2 h-2 rounded-full bg-emerald-500 ml-2"></span><span className="text-xs text-white/40">Stable</span>
               </div>
             </div>

             <div className="grid md:grid-cols-2 gap-4">
               {regionalData.map((region, i) => (
                 <div key={i} className={`relative overflow-hidden p-5 rounded-2xl border bg-black/20 
                    ${region.color === 'red' ? 'border-red-500/30' : 'border-white/5'}
                 `}>
                    <div className="flex justify-between items-start z-10 relative">
                       <div>
                          <h3 className="font-bold text-lg">{region.region}</h3>
                          <p className={`text-xs font-mono uppercase mt-1 ${
                             region.color === 'red' ? 'text-red-400' : 
                             region.color === 'emerald' ? 'text-emerald-400' :
                             region.color === 'amber' ? 'text-amber-400' : 'text-cyan-400'
                          }`}>Status: {region.status}</p>
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
                    {/* Progress Bar Background */}
                    <div className="absolute bottom-0 left-0 h-1 bg-white/10 w-full">
                       <div style={{width: `${region.usage}%`}} className={`h-full ${
                          region.color === 'red' ? 'bg-red-500' : 
                          region.color === 'emerald' ? 'bg-emerald-500' :
                          region.color === 'amber' ? 'bg-amber-500' : 'bg-cyan-500'
                       }`} />
                    </div>
                 </div>
               ))}
             </div>

             {/* Integrated Chart */}
             <div className="mt-8 pt-8 border-t border-white/5">
                <div className="flex items-center justify-between mb-4">
                   <h3 className="text-sm font-bold text-white/60 uppercase tracking-widest">Aggregate Peak Demand</h3>
                   <span className="text-xs font-mono text-red-400 animate-pulse">LIVE FEED ●</span>
                </div>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={loadData}>
                      <defs>
                        <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 10}} />
                      <YAxis hide domain={[0, 100]} />
                      <Tooltip 
                        contentStyle={{backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px'}}
                        itemStyle={{color: '#fff'}}
                      />
                      <Area type="monotone" dataKey="load" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorLoad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
             </div>
          </div>

          {/* Action Column */}
          <div className="space-y-6">
            
            {/* Active Alert Feed */}
            <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 h-[400px] overflow-y-auto">
               <h2 className="text-lg font-bold font-display mb-4 flex items-center gap-2">
                  <Siren className="w-5 h-5 text-red-400" /> Live Incidents
               </h2>
               <div className="space-y-3">
                  {[
                    { title: "Grid Stress", loc: "North Sector", sev: "Critical", time: "2m ago" },
                    { title: "Pipeline Maint.", loc: "Central Zone", sev: "Warning", time: "1h ago" },
                    { title: "Heatwave Spike", loc: "All Regions", sev: "Info", time: "3h ago" },
                  ].map((alert, i) => (
                    <div key={i} className={`p-4 rounded-xl border flex items-start justify-between ${
                        alert.sev === 'Critical' ? 'bg-red-500/10 border-red-500/20' : 
                        alert.sev === 'Warning' ? 'bg-amber-500/10 border-amber-500/20' : 'bg-blue-500/10 border-blue-500/20'
                    }`}>
                       <div>
                          <p className={`text-xs font-bold uppercase ${
                              alert.sev === 'Critical' ? 'text-red-400' : 
                              alert.sev === 'Warning' ? 'text-amber-400' : 'text-blue-400'
                          }`}>{alert.sev}</p>
                          <p className="font-bold text-sm mt-1">{alert.title}</p>
                          <p className="text-xs text-white/40">{alert.loc}</p>
                       </div>
                       <span className="text-[10px] text-white/30 font-mono">{alert.time}</span>
                    </div>
                  ))}
               </div>
            </div>

            {/* Compose Card */}
            <div className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-6">
               <h2 className="text-lg font-bold font-display mb-4 flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-blue-400" /> Broadcast
               </h2>
               
               

               <form className="space-y-4 mt-4">
                  <div>
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Priority Level</label>
                    <select className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-blue-500 outline-none mt-1">
                      <option>⚠️ Critical (Push Notification + SMS)</option>
                      <option>ℹ️ Advisory (Push Only)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Message</label>
                    <textarea 
                      rows={3}
                      className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-blue-500 outline-none mt-1 resize-none"
                      placeholder="Enter grid load reduction request..."
                    />
                  </div>
                  <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors">
                     <Send className="w-4 h-4" /> Transmit to 45k Users
                  </button>
               </form>
            </div>

          </div>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-center gap-4 text-[10px] text-white/20 uppercase tracking-widest">
           <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> 256-bit Encrypted</span>
           <span>•</span>
           <span>Government Authorized Use Only</span>
        </div>

      </main>
    </div>
  );
}