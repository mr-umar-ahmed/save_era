'use client';

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Activity, Users, Send, Map, ShieldAlert, Megaphone, 
  CheckCircle2, Radio, ArrowUpRight, ArrowDownRight, 
  Minus, Siren, Lock, Bell, Clock, Zap, Droplets, AlertTriangle, Shield,
  ThermometerSun, Server
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Outfit, Inter } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// --- MULTI-TENANT CONFIGURATION ---
const DEPARTMENT_CONFIGS: Record<string, any> = {
  gescom: {
    id: "gescom",
    name: "GESCOM Power Command",
    systemStatus: "Grid Stress: High",
    color: "amber",
    accent: "text-amber-500",
    bgAccent: "bg-amber-500",
    chartColor: "#f59e0b",
    icon: Zap,
    kpis: [
      { label: "Active Smart Meters", value: "45,230", sub: "Network Uptime: 99.9%", icon: Users },
      { label: "Peak Demand (Raichur)", value: "842 MW", sub: "+12% from average", icon: Zap },
      { label: "Load Shedding", value: "14.2 MW", sub: "Averted via Smart DR", icon: Activity },
      { label: "Alerts Dispatched", value: "1,247", sub: "Last 24 Hours", icon: Radio },
    ],
    chartLabel: "Aggregate Grid Demand (MW)",
    regions: [
      { region: "North Sub-Station", usage: 88, status: "Critical", trend: "up" },
      { region: "South Sector", usage: 45, status: "Stable", trend: "down" },
      { region: "Industrial Zone", usage: 62, status: "Moderate", trend: "flat" },
      { region: "Rural Feeder A", usage: 30, status: "Optimal", trend: "down" },
    ],
    alerts: [
      { title: "Transformer Overload", loc: "Sector 4", sev: "Critical", time: "Just now" },
      { title: "Frequency Drop", loc: "Grid Feed Alpha", sev: "Warning", time: "1h ago" },
    ]
  },
  kuwsdb: {
    id: "kuwsdb",
    name: "KUWSDB Water Command",
    systemStatus: "Reservoir Level: Nominal",
    color: "cyan",
    accent: "text-cyan-500",
    bgAccent: "bg-cyan-500",
    chartColor: "#06b6d4",
    icon: Droplets,
    kpis: [
      { label: "Active Flow Nodes", value: "12,405", sub: "Pressure: Normal", icon: Activity },
      { label: "Daily Distribution", value: "89 ML", sub: "Raichur District", icon: Droplets },
      { label: "Leakage Detected", value: "2.4%", sub: "Down from 5%", icon: CheckCircle2 },
      { label: "Maintenance Tickets", value: "42", sub: "Open complaints", icon: Radio },
    ],
    chartLabel: "System Flow Rate (MegaLiters/Hr)",
    regions: [
      { region: "Main Treatment Plant", usage: 82, status: "High Load", trend: "up" },
      { region: "North Zone Pipes", usage: 40, status: "Stable", trend: "flat" },
      { region: "City Center Valves", usage: 65, status: "Moderate", trend: "up" },
      { region: "Agricultural Output", usage: 20, status: "Optimal", trend: "down" },
    ],
    alerts: [
      { title: "Pressure Drop", loc: "Main Pipeline B", sev: "Critical", time: "Just now" },
      { title: "Scheduled Maintenance", loc: "Sector 2", sev: "Warning", time: "1h ago" },
    ]
  },
  ddma: {
    id: "ddma",
    name: "DDMA Crisis Command",
    systemStatus: "Threat Level: Elevated",
    color: "red",
    accent: "text-red-500",
    bgAccent: "bg-red-500",
    chartColor: "#ef4444",
    icon: ShieldAlert,
    kpis: [
      { label: "Active Field Units", value: "142", sub: "Deployed Personnel", icon: Users },
      { label: "Evacuation Zones", value: "2", sub: "Active Protocols", icon: Map },
      { label: "Cell Broadcasts", value: "85k", sub: "Citizens reached", icon: Radio },
      { label: "Helpline Volume", value: "High", sub: "+40% spike detected", icon: Siren },
    ],
    chartLabel: "Incident Reporting Volume (Tickets/Hr)",
    regions: [
      { region: "Flood Risk Zone", usage: 90, status: "Critical", trend: "up" },
      { region: "City Center", usage: 35, status: "Stable", trend: "down" },
      { region: "Highway NH7", usage: 70, status: "Moderate", trend: "up" },
      { region: "Shelter Camps", usage: 45, status: "Optimal", trend: "flat" },
    ],
    alerts: [
      { title: "Flash Flood Warning", loc: "River Bank Area", sev: "Critical", time: "Just now" },
      { title: "Highway Landslide", loc: "NH7 Route", sev: "Critical", time: "10m ago" },
    ]
  }
};

const INITIAL_CHART_DATA = [
  { time: '14:00', load: 60 }, { time: '14:15', load: 65 },
  { time: '14:30', load: 62 }, { time: '14:45', load: 70 },
  { time: '15:00', load: 75 }, { time: '15:15', load: 82 },
  { time: '15:30', load: 85 },
];

function GovAdminContent() {
  const searchParams = useSearchParams();
  const deptParam = searchParams.get('dept') || 'gescom';
  const config = DEPARTMENT_CONFIGS[deptParam] || DEPARTMENT_CONFIGS['gescom'];

  const [chartData, setChartData] = useState(INITIAL_CHART_DATA);
  const [regionalData, setRegionalData] = useState(config.regions.map((r: any) => ({...r, color: r.usage > 80 ? 'red' : r.usage > 60 ? 'amber' : r.usage > 40 ? 'emerald' : 'cyan'})));
  const [currentTime, setCurrentTime] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // --- IOT SIMULATION ---
  useEffect(() => {
    const fetchIoTData = async () => {
      try {
        const res = await fetch('/api/iot');
        if (!res.ok) return;
        const data = await res.json();

        setChartData(prevData => {
          const newData = [...prevData];
          newData.shift(); 
          const lastTime = prevData[prevData.length - 1].time;
          const [hours, mins] = lastTime.split(':').map(Number);
          const date = new Date();
          date.setHours(hours, mins + 15);
          const newTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
          newData.push({ time: newTime, load: data.load });
          return newData;
        });

        setRegionalData(prevRegions => 
          data.regions.map((newRegionData: any, index: number) => {
            const oldUsage = prevRegions[index]?.usage || 50;
            const newUsage = newRegionData.usage;
            let newColor = "cyan";
            let newStatus = "Optimal";
            if (newUsage > 85) { newColor = "red"; newStatus = "Critical"; }
            else if (newUsage > 60) { newColor = "amber"; newStatus = "Moderate"; }
            else if (newUsage > 40) { newColor = "emerald"; newStatus = "Stable"; }
            return { 
              ...prevRegions[index], 
              usage: newUsage, 
              trend: newUsage > oldUsage ? "up" : newUsage < oldUsage ? "down" : "flat", 
              color: newColor, 
              status: newStatus 
            };
          })
        );
      } catch (error) { }
    };
    fetchIoTData();
    const interval = setInterval(fetchIoTData, 3000); 
    return () => clearInterval(interval);
  }, []);

  // --- COMMAND TERMINAL STATE ---
  const [activeTab, setActiveTab] = useState<'broadcast' | 'portal'>('broadcast');
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("⚠️ Critical (Push + SMS)");
  
  // Portal State
  const [portalCategory, setPortalCategory] = useState("Service Update");
  const [portalTitle, setPortalTitle] = useState("");
  const [portalDesc, setPortalDesc] = useState("");
  
  const [isSending, setIsSending] = useState(false);
  const [sentStatus, setSentStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setSentStatus("idle");
    
    if (activeTab === 'broadcast') {
      try {
        const res = await fetch('/api/broadcast', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, priority }),
        });
        if (res.ok) {
          setSentStatus("success");
          setMessage(""); 
          setTimeout(() => setSentStatus("idle"), 3000); 
        } else setSentStatus("error");
      } catch { setSentStatus("error"); } 
    } else {
      // Simulate pushing to DB for the City Hub
      setTimeout(() => {
        setSentStatus("success");
        setPortalTitle("");
        setPortalDesc("");
        setTimeout(() => setSentStatus("idle"), 3000);
      }, 1000);
    }
    setIsSending(false);
  };

  return (
    <div className={`${outfit.variable} ${inter.variable} h-screen flex flex-col bg-[#020617] text-white font-sans relative overflow-hidden`}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee { 0% { transform: translateX(100vw); } 100% { transform: translateX(-100%); } }
        .animate-marquee { animation: marquee 25s linear infinite; }
      `}} />

      {/* Dynamic Background FX */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className={`absolute top-[-10%] left-[20%] w-[800px] h-[800px] rounded-full blur-[120px] bg-${config.color}-900/20`} />
        <div className="absolute bottom-[-10%] right-[20%] w-[600px] h-[600px] bg-slate-900/50 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      </div>

      <header className="relative z-20 border-b border-white/5 bg-[#020617]/90 backdrop-blur-md shrink-0">
        <div className="w-full px-6 h-16 flex items-center justify-between">
           <div className="flex items-center gap-4">
             <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-${config.color}-900/20 bg-${config.color}-600`}>
               <config.icon className="w-5 h-5 text-white" />
             </div>
             <div>
               <h1 className="text-lg font-bold font-display tracking-wide leading-none">{config.name}</h1>
               <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono mt-1">Authorized Official Interface</p>
             </div>
           </div>
           
           <div className="flex items-center gap-6">
             <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-white/60 border-r border-white/10 pr-6">
                <span className="flex items-center gap-1.5"><ThermometerSun className="w-4 h-4 text-orange-400" /> 38°C Raichur</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-blue-400" /> {mounted ? currentTime : '...'} IST</span>
             </div>

             <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-${config.color}-500/30 bg-${config.color}-500/10`}>
                 <span className="relative flex h-2 w-2">
                   <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${config.color}-400 opacity-75`}></span>
                   <span className={`relative inline-flex rounded-full h-2 w-2 bg-${config.color}-500`}></span>
                 </span>
                 <span className={`text-[10px] font-bold uppercase tracking-widest ${config.accent}`}>{config.systemStatus}</span>
             </div>
             
             <div className="flex items-center gap-4 border-l border-white/10 pl-6">
               <button className="text-white/60 hover:text-white transition-colors relative">
                 <Bell className="w-5 h-5" />
               </button>
               <div className="text-right hidden sm:block">
                 <p className="text-xs font-bold text-white">Nodal Officer</p>
                 <p className="text-[10px] text-white/40 font-mono">ID: KA-8821</p>
               </div>
             </div>
           </div>
        </div>
        <div className={`bg-${config.color}-950/20 border-t border-white/5 py-1 overflow-hidden flex items-center`}>
           <div className={`whitespace-nowrap animate-marquee text-[10px] font-mono ${config.accent} opacity-80 tracking-widest uppercase`}>
              [SYS_MSG] SECURE {config.name} TELEMETRY FEED ACTIVE | NODE LATENCY: 12ms | TLS 1.3 ENCRYPTION | CELL BROADCAST FAILSAFE ARMED
           </div>
        </div>
      </header>

      <main className="relative z-10 w-full flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 flex flex-col">
        <div className="max-w-[1600px] mx-auto w-full space-y-6 flex-1 flex flex-col">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
            {config.kpis.map((item: any, i: number) => (
              <div key={i} className="bg-[#0f172a]/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
                <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity ${config.accent}`}>
                  <item.icon className="w-16 h-16 transform translate-x-4 -translate-y-4" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`p-2 rounded-lg bg-${config.color}-500/10`}>
                       <item.icon className={`w-4 h-4 ${config.accent}`} />
                    </div>
                    <p className="text-xs font-bold text-white/40 uppercase tracking-widest">{item.label}</p>
                  </div>
                  <p className="text-3xl font-black font-display text-white tracking-tight">{item.value}</p>
                  <p className={`text-xs mt-1 font-mono ${config.accent} opacity-80`}>{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6 lg:flex-1 lg:min-h-0">
            <div className="lg:col-span-2 bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col lg:min-h-0">
               <div className="mb-4 shrink-0">
                 <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                   <h2 className="text-xl font-bold font-display flex items-center gap-2">
                     <Map className={`w-5 h-5 ${config.accent}`} /> Regional Sensor Matrix
                   </h2>
                 </div>

                 <div className="grid md:grid-cols-2 gap-4">
                   {regionalData.map((region: any, i: number) => (
                      <div key={i} className={`relative overflow-hidden p-5 rounded-2xl border bg-black/20 backdrop-blur-sm transition-all duration-500 ${region.color === 'red' ? 'border-red-500/30' : 'border-white/5'}`}>
                        <div className="flex justify-between items-start z-10 relative">
                          <div>
                            <h3 className="font-bold text-white">{region.region}</h3>
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase mt-2 border transition-colors duration-300 ${
                               region.color === 'red' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 
                               region.color === 'emerald' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                               region.color === 'amber' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
                            }`}>{region.status}</span>
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
                        <div className="absolute bottom-0 left-0 h-1 bg-white/5 w-full">
                          <div style={{width: `${region.usage}%`}} className={`h-full transition-all duration-1000 bg-${region.color}-500`} />
                        </div>
                      </div>
                   ))}
                 </div>
               </div>
               
               <div className="mt-6 pt-6 border-t border-white/5 lg:flex-1 flex flex-col min-h-[300px] lg:min-h-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-8 rounded-full ${config.bgAccent}`} />
                      <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">{config.chartLabel}</h3>
                      </div>
                    </div>
                    <span className="flex items-center gap-2 text-[10px] font-mono text-red-400 bg-red-950/30 px-3 py-1 rounded-full border border-red-500/20 animate-pulse uppercase tracking-widest">
                      <span className="w-2 h-2 rounded-full bg-red-500" /> LIVE FEED
                    </span>
                  </div>
                  <div className="flex-1 w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorDynamic" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={config.chartColor} stopOpacity={0.4}/>
                            <stop offset="95%" stopColor={config.chartColor} stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 10}} dy={10} />
                        <YAxis hide domain={[0, 100]} />
                        <Tooltip contentStyle={{backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px'}} itemStyle={{color: '#fff', fontSize: '12px'}} />
                        <Area type="monotone" dataKey="load" stroke={config.chartColor} strokeWidth={3} fillOpacity={1} fill="url(#colorDynamic)" isAnimationActive={true} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
            </div>

            <div className="flex flex-col gap-6 lg:min-h-0">
              
              {/* Dynamic Alerts */}
              <div className="bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col lg:flex-1 min-h-[300px] lg:min-h-0">
                <div className="flex items-center justify-between mb-4 shrink-0">
                  <h2 className="text-lg font-bold font-display flex items-center gap-2">
                    <Siren className="w-5 h-5 text-red-400" /> Live Incidents
                  </h2>
                </div>
                <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1">
                  {config.alerts.map((alert: any, i: number) => (
                    <div key={i} className={`p-4 rounded-xl border flex items-start justify-between bg-red-500/5 border-red-500/20`}>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse`} />
                          <p className={`text-[10px] font-bold uppercase tracking-wider text-red-400`}>{alert.sev}</p>
                        </div>
                        <p className="font-bold text-sm text-white">{alert.title}</p>
                        <p className="text-xs text-white/40 mt-0.5">{alert.loc}</p>
                      </div>
                      <span className="text-[10px] text-white/20 font-mono whitespace-nowrap">{alert.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* COMMAND TERMINAL (NEW MULTI-PURPOSE CMS) */}
              <div className={`bg-gradient-to-br from-${config.color}-950/50 to-slate-900/50 backdrop-blur-xl border border-${config.color}-500/20 rounded-3xl p-6 relative overflow-hidden shrink-0`}>
                <div className={`absolute top-0 right-0 w-32 h-32 bg-${config.color}-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2`} />
                
                <h2 className="text-lg font-bold font-display mb-4 flex items-center gap-2 relative z-10">
                  <Server className={`w-5 h-5 ${config.accent}`} /> Command Terminal
                </h2>

                {/* Tabs */}
                <div className="flex bg-black/40 rounded-lg p-1 mb-4 relative z-10 border border-white/5">
                  <button onClick={() => setActiveTab('broadcast')} className={`flex-1 text-xs font-bold py-2 rounded-md transition-colors ${activeTab === 'broadcast' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'}`}>
                    Push Broadcast
                  </button>
                  <button onClick={() => setActiveTab('portal')} className={`flex-1 text-xs font-bold py-2 rounded-md transition-colors ${activeTab === 'portal' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'}`}>
                    City Portal Update
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3 relative z-10">
                  
                  {activeTab === 'broadcast' ? (
                    // FORM 1: Ntfy Cell Broadcast
                    <>
                      <div>
                        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full bg-[#020617] border border-white/10 rounded-xl p-2.5 text-sm text-white focus:border-blue-500 outline-none">
                          <option>⚠️ Critical Cell Broadcast</option>
                          <option>ℹ️ Standard Advisory (Push)</option>
                        </select>
                      </div>
                      <div>
                        <textarea rows={2} value={message} onChange={(e) => setMessage(e.target.value)} required className="w-full bg-[#020617] border border-white/10 rounded-xl p-2.5 text-sm text-white outline-none resize-none placeholder:text-white/20" placeholder={`E.g. ${config.name} reports issue in Sector 4...`} />
                      </div>
                    </>
                  ) : (
                    // FORM 2: City Hub CMS Update
                    <>
                      <div>
                        <select value={portalCategory} onChange={(e) => setPortalCategory(e.target.value)} className="w-full bg-[#020617] border border-white/10 rounded-xl p-2.5 text-sm text-white focus:border-blue-500 outline-none">
                          <option>Public Service Status</option>
                          <option>New Welfare Scheme</option>
                          <option>Infrastructure Closure</option>
                        </select>
                      </div>
                      <div>
                        <input type="text" value={portalTitle} onChange={(e) => setPortalTitle(e.target.value)} required className="w-full bg-[#020617] border border-white/10 rounded-xl p-2.5 text-sm text-white outline-none placeholder:text-white/20" placeholder="Title (e.g. NH7 Closed)" />
                      </div>
                      <div>
                        <textarea rows={2} value={portalDesc} onChange={(e) => setPortalDesc(e.target.value)} required className="w-full bg-[#020617] border border-white/10 rounded-xl p-2.5 text-sm text-white outline-none resize-none placeholder:text-white/20" placeholder="Detailed description for the City Hub..." />
                      </div>
                    </>
                  )}

                  <button type="submit" disabled={isSending || (activeTab === 'broadcast' && !message.trim()) || (activeTab === 'portal' && (!portalTitle.trim() || !portalDesc.trim()))} className={`w-full py-3 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all ${sentStatus === 'success' ? 'bg-emerald-500 text-black' : `bg-${config.color}-600 text-white`} disabled:opacity-50`}>
                    {isSending ? "Processing..." : sentStatus === 'success' ? "Update Published" : activeTab === 'broadcast' ? "Transmit Signal" : "Publish to Portal"}
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function GovAdminPageWrapper() {
  return (
    <Suspense fallback={<div className="h-screen bg-[#020617] flex items-center justify-center text-white">Loading secure terminal...</div>}>
      <GovAdminContent />
    </Suspense>
  );
}