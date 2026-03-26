'use client';

import Link from "next/link";
import { 
  Zap, 
  Droplets, 
  ThermometerSun, 
  Wrench, 
  FileText, 
  ArrowLeft, 
  ShieldCheck, 
  Settings, 
  Wifi, 
  WifiOff,
  Activity,
  RadioTower,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { Outfit, Inter } from "next/font/google";
import { useState } from "react";
import { useTheme } from "../components/ThemeProvider";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const alerts = [
  {
    id: 1,
    type: "outage",
    icon: Zap,
    title: "Critical Grid Load Event",
    message: "Mandatory load shedding protocols activated for North Raichur. Switch high-drain appliances off immediately.",
    time: "Today 8:00 PM - 11:00 PM",
    severity: "critical",
    action: "Acknowledge",
    color: "red",
    hash: "0x8F2A...9C1"
  },
  {
    id: 2,
    type: "emergency",
    icon: ThermometerSun,
    title: "Thermal Stress Warning",
    message: "Extreme heat index detected. AC efficiency will drop by 15%. Recommend setting thermostat to 26°C.",
    time: "Today 2:00 PM",
    severity: "high",
    action: "Optimize Setup",
    color: "orange",
    hash: "0x4B1E...7A2"
  },
  {
    id: 3,
    type: "conservation",
    icon: Activity,
    title: "Frequency Drop Advisory",
    message: "Regional grid frequency dropped to 49.8Hz. Voluntary conservation requested to prevent rolling blackouts.",
    time: "Today 5:00 PM",
    severity: "medium",
    action: "Join Co-op",
    color: "amber",
    hash: "0x9C3D...2F4"
  },
  {
    id: 4,
    type: "maintenance",
    icon: Wrench,
    title: "RUWSS Infrastructure Sync",
    message: "Scheduled pipeline pressure testing in Sector 4. Minor water discoloration possible upon resumption.",
    time: "Tomorrow 6:00 AM",
    severity: "low",
    action: "View Map",
    color: "cyan",
    hash: "0x1A8B...5E6"
  },
  {
    id: 5,
    type: "bill",
    icon: FileText,
    title: "Usage Anomaly Detected",
    message: "Submersible pump ran 2 hours longer than normal today. Please verify mechanical integrity.",
    time: "Yesterday",
    severity: "info",
    action: "View Analysis",
    color: "purple",
    hash: "0x7D2F...8B9"
  },
];

export default function AlertsPage() {
  const { theme, colors } = useTheme();
  const [offlineMode, setOfflineMode] = useState(true);

  return (
    <div className={`${outfit.variable} ${inter.variable} min-h-screen ${colors.bg} ${colors.text} font-sans selection:bg-emerald-500/30 relative overflow-x-hidden`}>
      
      {/* BACKGROUND FX */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className={`absolute top-[-20%] left-[20%] w-[600px] h-[600px] rounded-full blur-[120px] transition-colors duration-1000 ${offlineMode ? 'bg-emerald-500/10' : 'bg-red-500/10'}`} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px]" />
        <div className={`absolute inset-0 bg-[size:32px_32px] opacity-20 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]
           ${theme === 'dark' 
             ? 'bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]' 
             : 'bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)]'
           }`} 
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:py-12">
        
        {/* HEADER & NAV */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <Link href="/dashboard" className={`inline-flex items-center gap-2 font-bold transition-colors hover:text-emerald-500 text-sm ${colors.textMuted}`}>
              <ArrowLeft className="w-4 h-4" /> Return to Dashboard
            </Link>
            
            <div className="flex items-center gap-3 mb-2 mt-4">
                <div className={`px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${theme === 'dark' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-700'}`}>
                    <RadioTower className="w-3.5 h-3.5" /> Secure Channel Active
                </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-black font-display tracking-tight text-white flex items-center gap-3">
              System <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Alerts</span>
            </h1>
            <p className={`text-sm max-w-lg mt-2 ${colors.textMuted}`}>
              Encrypted real-time telemetry from MESCOM, RUWSS, and District Authorities.
            </p>
          </div>

          <div className="flex gap-3">
            <div className={`px-5 py-3 rounded-2xl border flex flex-col items-center justify-center min-w-[100px] ${theme === 'dark' ? 'bg-red-500/10 border-red-500/20' : 'bg-red-50 border-red-100'}`}>
              <span className="text-2xl font-bold text-red-500 font-display">1</span>
              <span className="text-[10px] uppercase tracking-widest text-red-500/70 font-bold">Critical</span>
            </div>
            <div className={`px-5 py-3 rounded-2xl border flex flex-col items-center justify-center min-w-[100px] ${theme === 'dark' ? 'bg-amber-500/10 border-amber-500/20' : 'bg-amber-50 border-amber-100'}`}>
              <span className="text-2xl font-bold text-amber-500 font-display">2</span>
              <span className="text-[10px] uppercase tracking-widest text-amber-500/70 font-bold">Warnings</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-8">
          
          {/* ALERTS FEED (Left Column) */}
          <div className="space-y-5">
            {alerts.map((alert) => (
              <div 
                key={alert.id}
                className={`group relative overflow-hidden rounded-[2rem] border backdrop-blur-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-xl
                  ${alert.color === 'red' ? (theme === 'dark' ? 'bg-red-950/20 border-red-500/30 shadow-[0_0_30px_-10px_rgba(239,68,68,0.2)]' : 'bg-red-50 border-red-200') : ''}
                  ${alert.color === 'orange' ? (theme === 'dark' ? 'bg-orange-950/20 border-orange-500/30' : 'bg-orange-50 border-orange-200') : ''}
                  ${alert.color === 'amber' ? (theme === 'dark' ? 'bg-amber-950/20 border-amber-500/30' : 'bg-amber-50 border-amber-200') : ''}
                  ${alert.color === 'cyan' ? (theme === 'dark' ? 'bg-cyan-950/20 border-cyan-500/30' : 'bg-cyan-50 border-cyan-200') : ''}
                  ${alert.color === 'purple' ? (theme === 'dark' ? 'bg-purple-950/20 border-purple-500/30' : 'bg-purple-50 border-purple-200') : ''}
                `}
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-r from-${alert.color}-500/10 to-transparent`} />

                <div className="relative p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
                  
                  {/* Icon Box */}
                  <div className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center border shadow-inner
                    ${alert.color === 'red' ? 'bg-red-500/20 border-red-500/40 text-red-500' : ''}
                    ${alert.color === 'orange' ? 'bg-orange-500/20 border-orange-500/40 text-orange-500' : ''}
                    ${alert.color === 'amber' ? 'bg-amber-500/20 border-amber-500/40 text-amber-500' : ''}
                    ${alert.color === 'cyan' ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-500' : ''}
                    ${alert.color === 'purple' ? 'bg-purple-500/20 border-purple-500/40 text-purple-500' : ''}
                  `}>
                    <alert.icon className="w-7 h-7" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 w-full">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h3 className={`text-xl font-bold font-display ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{alert.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border
                        ${alert.color === 'red' ? 'bg-red-500/10 border-red-500/20 text-red-500 animate-pulse' : ''}
                        ${alert.color === 'orange' ? 'bg-orange-500/10 border-orange-500/20 text-orange-500' : ''}
                        ${alert.color === 'amber' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : ''}
                        ${alert.color === 'cyan' ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-500' : ''}
                        ${alert.color === 'purple' ? 'bg-purple-500/10 border-purple-500/20 text-purple-500' : ''}
                      `}>
                        {alert.severity}
                      </span>
                    </div>
                    
                    <p className={`text-sm leading-relaxed mb-6 ${theme === 'dark' ? 'text-white/70' : 'text-gray-600'}`}>{alert.message}</p>
                    
                    <div className={`flex flex-wrap items-center justify-between gap-4 pt-4 border-t ${theme === 'dark' ? 'border-white/5' : 'border-gray-200'}`}>
                      <div className="flex items-center gap-4">
                        <span className={`text-[10px] font-mono flex items-center gap-2 ${colors.textMuted}`}>
                          <Activity className="w-3 h-3" /> {alert.time}
                        </span>
                        <span className={`hidden sm:flex text-[10px] font-mono items-center gap-1 px-2 py-0.5 rounded border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white/30' : 'bg-gray-100 border-gray-200 text-gray-400'}`}>
                          <ShieldCheck className="w-3 h-3" /> {alert.hash}
                        </span>
                      </div>
                      
                      <button className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]
                        ${alert.color === 'red' ? 'bg-red-500 text-white shadow-red-500/20 hover:bg-red-600' : (theme === 'dark' ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-gray-900 text-white hover:bg-gray-800')}
                      `}>
                        {alert.action}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SIDEBAR SETTINGS (Right Column) */}
          <div className="space-y-6">
            
            {/* Offline Status / Failsafe Toggle */}
            <div className={`relative overflow-hidden rounded-[2.5rem] p-8 border transition-all duration-500 shadow-lg
              ${offlineMode 
                ? (theme === 'dark' ? 'bg-emerald-950/20 border-emerald-500/30 shadow-emerald-500/5' : 'bg-emerald-50 border-emerald-200') 
                : (theme === 'dark' ? 'bg-red-950/20 border-red-500/30 shadow-red-500/5' : 'bg-red-50 border-red-200')
              }
            `}>
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl border ${offlineMode ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-500' : 'bg-red-500/20 border-red-500/30 text-red-500'}`}>
                    {offlineMode ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className={`font-bold text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Cell Broadcast</h3>
                    <p className={`text-[10px] uppercase tracking-widest font-bold ${offlineMode ? 'text-emerald-500' : 'text-red-500'}`}>
                      {offlineMode ? 'Fallback Armed' : 'Disconnected'}
                    </p>
                  </div>
                </div>
                
                {/* Hardware-style toggle */}
                <button 
                  onClick={() => setOfflineMode(!offlineMode)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-300 outline-none ${offlineMode ? 'bg-emerald-500' : 'bg-red-500'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 shadow-sm ${offlineMode ? 'left-7' : 'left-1'}`} />
                </button>
              </div>

              <p className={`text-xs leading-relaxed relative z-10 ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>
                Savera automatically caches critical infrastructure alerts via encrypted SMS protocols when internet connections drop in Raichur.
              </p>

              {offlineMode && (
                <div className="absolute -bottom-10 -right-10 opacity-10">
                   <RadioTower className="w-40 h-40 text-emerald-500" />
                </div>
              )}
            </div>

            {/* Filter Panel */}
            <div className={`backdrop-blur-xl border rounded-[2.5rem] p-8 ${colors.cardBg}`}>
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-5 h-5 text-blue-500" />
                <h3 className={`text-lg font-bold font-display ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Filter Feeds</h3>
              </div>

              <div className="space-y-2">
                {['Critical Outages', 'Conservation Specs', 'Billing Analytics', 'Maintenance Syncs'].map((item, i) => (
                  <label key={i} className={`flex items-center justify-between p-3 rounded-xl cursor-pointer group transition-colors ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}>
                    <span className={`text-sm font-medium transition-colors ${theme === 'dark' ? 'text-white/70 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'}`}>{item}</span>
                    <div className="relative inline-flex h-5 w-9 items-center rounded-full bg-gray-400 transition-colors peer-checked:bg-blue-500 has-[:checked]:bg-blue-500">
                      <input type="checkbox" defaultChecked className="peer sr-only" />
                      <span className="inline-block h-3 w-3 transform rounded-full bg-white transition peer-checked:translate-x-4 ml-1 shadow-sm" />
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Trusted Sources */}
            <div className={`backdrop-blur-xl border rounded-[2.5rem] p-8 ${colors.cardBg}`}>
              <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-6 flex items-center gap-2 ${colors.textMuted}`}>
                <ShieldCheck className="w-4 h-4" /> Verified Signature Nodes
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-2xl border flex flex-col items-center text-center gap-3 ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                  <Zap className="w-6 h-6 text-amber-500" />
                  <span className={`text-xs font-bold ${theme === 'dark' ? 'text-white/90' : 'text-gray-800'}`}>MESCOM</span>
                </div>
                <div className={`p-4 rounded-2xl border flex flex-col items-center text-center gap-3 ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                  <Droplets className="w-6 h-6 text-cyan-500" />
                  <span className={`text-xs font-bold ${theme === 'dark' ? 'text-white/90' : 'text-gray-800'}`}>RUWSS</span>
                </div>
              </div>
              <div className={`mt-6 pt-6 border-t text-center ${theme === 'dark' ? 'border-white/5' : 'border-gray-100'}`}>
                 <p className={`text-[10px] font-mono flex items-center justify-center gap-2 ${colors.textMuted}`}>
                   <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Data streams verified via Government APIs.
                 </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}