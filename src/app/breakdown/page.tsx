'use client';

import { useState } from "react";
import Link from "next/link";
import { 
  Zap, Droplets, ArrowLeft, TrendingUp, AlertCircle, 
  ThermometerSnowflake, Lightbulb, ShowerHead, PieChart,
  ChevronDown, Download, Calendar, Filter, CheckCircle2,
  Factory, Sparkles
} from "lucide-react";
import { Outfit, Inter } from "next/font/google";
import { useTheme } from "../components/ThemeProvider";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// --- CONTEXTUALIZED AI MOCK DATA (Raichur / Karnataka Focus) ---
const HISTORY_DATA = [
  { month: 'Oct', elec: 4200, water: 1100 },
  { month: 'Nov', elec: 4800, water: 1300 },
  { month: 'Dec', elec: 4500, water: 1200 },
  { month: 'Jan', elec: 3900, water: 1150 },
  { month: 'Feb', elec: 4100, water: 1180 },
  { month: 'Mar', elec: 4500, water: 1200 },
];

const BREAKDOWN = {
  electricity: {
    total: 4500,
    confidence: "94%",
    items: [
      { name: '1HP Submersible Pump', percent: 35, value: '₹1,575', color: '#F97316', icon: Factory },
      { name: 'AC Unit (Master Bed)', percent: 30, value: '₹1,350', color: '#EF4444', icon: ThermometerSnowflake },
      { name: 'Geyser & Heating', percent: 20, value: '₹900', color: '#F59E0B', icon: Zap },
      { name: 'Lighting & Fans', percent: 15, value: '₹675', color: '#3B82F6', icon: Lightbulb },
    ]
  },
  water: {
    total: 1200,
    confidence: "88%",
    items: [
      { name: 'Overhead Tank Fill', percent: 45, value: '₹540', color: '#06B6D4', icon: Factory },
      { name: 'Showers & Bath', percent: 30, value: '₹360', color: '#3B82F6', icon: ShowerHead },
      { name: 'Garden / Outdoor', percent: 15, value: '₹180', color: '#10B981', icon: Droplets },
      { name: 'Kitchen & Drinking', percent: 10, value: '₹120', color: '#64748B', icon: PieChart },
    ]
  }
};

export default function BreakdownPage() {
  const { theme, colors } = useTheme();
  const [selectedMonth, setSelectedMonth] = useState('March 2026');

  const cardClass = theme === 'dark' ? 'bg-[#0A0F0D] border-white/10' : 'bg-white border-gray-200 shadow-sm';

  return (
    <div className={`${outfit.variable} ${inter.variable} w-full min-h-screen ${colors.bg} ${colors.text} font-sans transition-colors duration-300 p-4 md:p-8`}>
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
         <div className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] opacity-20 ${theme === 'dark' ? 'bg-emerald-500/20' : 'bg-emerald-200/40'}`} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <Link href="/dashboard" className={`flex items-center gap-2 text-sm font-medium mb-4 hover:text-emerald-500 transition-colors ${colors.textMuted}`}>
               <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>
            <div className="flex items-center gap-3 mb-3">
                <div className={`px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${theme === 'dark' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-700'}`}>
                    <Sparkles className="w-3.5 h-3.5" /> AI Disaggregation Complete
                </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black font-display tracking-tight">
              Consumption <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Deep Dive</span>
            </h1>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap gap-3">
             <button className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-bold transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                <Calendar className="w-4 h-4 opacity-50" />
                {selectedMonth}
                <ChevronDown className="w-3 h-3 opacity-50" />
             </button>
             <button className={`p-2.5 rounded-xl border transition-all ${theme === 'dark' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20' : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'}`}>
                <Download className="w-4 h-4" />
             </button>
          </div>
        </header>

        {/* Breakdown Cards Grid */}
        <div className="grid xl:grid-cols-2 gap-8 mb-10">
          
          {/* ELECTRICITY SPLIT */}
          <div className={`p-8 rounded-[2.5rem] border relative overflow-hidden group transition-all ${cardClass}`}>
             <div className="absolute -top-4 -right-4 p-8 opacity-5">
                <Zap className="w-48 h-48 text-amber-500 -rotate-12" />
             </div>

             <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                   <div>
                      <h2 className="text-2xl font-bold font-display flex items-center gap-3">
                         Electricity Split <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
                      </h2>
                      <p className={`text-sm mt-1 ${colors.textMuted}`}>Total Bill: <span className="font-mono font-bold text-white">₹{BREAKDOWN.electricity.total}</span></p>
                   </div>
                   <div className="text-right">
                     <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">AI Confidence</span>
                     <span className="text-xl font-black font-mono text-white">{BREAKDOWN.electricity.confidence}</span>
                   </div>
                </div>

                <div className="space-y-6">
                   {BREAKDOWN.electricity.items.map((item, i) => (
                      <div key={i}>
                         <div className="flex justify-between text-sm mb-2">
                            <span className="flex items-center gap-2 font-bold text-white/90">
                               <item.icon className={`w-4 h-4 ${colors.textMuted}`} /> {item.name}
                            </span>
                            <span className={`font-mono font-medium ${colors.textMuted}`}>{item.value} <span className="text-white/30 text-xs ml-1">({item.percent}%)</span></span>
                         </div>
                         <div className={`h-3 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-100'}`}>
                            <div 
                               style={{ width: `${item.percent}%`, backgroundColor: item.color }} 
                               className="h-full rounded-full shadow-lg relative transition-all duration-1000 ease-out"
                            />
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>

          {/* WATER USAGE */}
          <div className={`p-8 rounded-[2.5rem] border relative overflow-hidden group transition-all ${cardClass}`}>
             <div className="absolute -top-4 -right-4 p-8 opacity-5">
                <Droplets className="w-48 h-48 text-cyan-500 -rotate-12" />
             </div>

             <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                   <div>
                      <h2 className="text-2xl font-bold font-display flex items-center gap-3">
                         Water Estimate <Droplets className="w-5 h-5 text-cyan-500 fill-cyan-500" />
                      </h2>
                      <p className={`text-sm mt-1 ${colors.textMuted}`}>Est. Bill: <span className="font-mono font-bold text-white">₹{BREAKDOWN.water.total}</span></p>
                   </div>
                   <div className="text-right">
                     <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">Statistical Match</span>
                     <span className="text-xl font-black font-mono text-white">{BREAKDOWN.water.confidence}</span>
                   </div>
                </div>

                <div className="space-y-6">
                   {BREAKDOWN.water.items.map((item, i) => (
                      <div key={i}>
                         <div className="flex justify-between text-sm mb-2">
                            <span className="flex items-center gap-2 font-bold text-white/90">
                               <item.icon className={`w-4 h-4 ${colors.textMuted}`} /> {item.name}
                            </span>
                            <span className={`font-mono font-medium ${colors.textMuted}`}>{item.value} <span className="text-white/30 text-xs ml-1">({item.percent}%)</span></span>
                         </div>
                         <div className={`h-3 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-100'}`}>
                            <div 
                               style={{ width: `${item.percent}%`, backgroundColor: item.color }} 
                               className="h-full rounded-full shadow-lg relative transition-all duration-1000 ease-out"
                            />
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>

        </div>

        {/* AI Findings & History Row */}
        <div className="grid xl:grid-cols-[1fr_2fr] gap-8 pb-12">
           
           {/* AI FINDINGS */}
           <div className={`p-8 rounded-[2rem] border relative overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-br from-emerald-950/40 to-slate-900/40 border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.05)]' : 'bg-emerald-50/50 border-emerald-100'}`}>
              <h2 className="text-lg font-bold font-display mb-6 flex items-center gap-2 text-emerald-400">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 Diagnostic Report
              </h2>
              
              <div className="space-y-4">
                 <div className={`p-5 rounded-2xl border ${theme === 'dark' ? 'bg-black/40 border-red-500/20' : 'bg-white border-red-100'}`}>
                    <div className="flex items-start gap-3">
                       <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                       <div>
                          <p className="font-bold text-sm text-white">Pump Inefficiency Detected</p>
                          <p className={`text-xs mt-1.5 leading-relaxed ${colors.textMuted}`}>Your 1HP Submersible ran 30% longer than the MESCOM regional average this month. Possible groundwater depletion or pipe leak.</p>
                       </div>
                    </div>
                 </div>
                 
                 <div className={`p-5 rounded-2xl border ${theme === 'dark' ? 'bg-black/40 border-emerald-500/20' : 'bg-white border-emerald-100'}`}>
                    <div className="flex items-start gap-3">
                       <TrendingUp className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                       <div>
                          <p className="font-bold text-sm text-white">Behavioral Optimization</p>
                          <p className={`text-xs mt-1.5 leading-relaxed ${colors.textMuted}`}>Shifting your heavy appliance load to non-peak hours (10PM - 6AM) will improve your Grid Saver score by 40 XP.</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* 6-MONTH TREND CHART */}
           <div className={`p-8 rounded-[2rem] border ${cardClass}`}>
              <div className="flex items-center justify-between mb-8">
                 <h2 className="text-xl font-bold font-display text-white">Historical Overview</h2>
                 <div className="flex items-center gap-4 text-xs font-bold text-white/60">
                    <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-sm bg-amber-500" /> Electricity</div>
                    <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-sm bg-cyan-500" /> Water</div>
                 </div>
              </div>
              
              <div className="h-[250px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={HISTORY_DATA} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                       <CartesianGrid vertical={false} stroke={theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} />
                       <XAxis 
                          dataKey="month" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: theme === 'dark' ? '#666' : '#999', fontSize: 11, fontWeight: 600 }} 
                          dy={10}
                       />
                       <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: theme === 'dark' ? '#666' : '#999', fontSize: 11 }} 
                       />
                       <Tooltip 
                          cursor={{ fill: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }}
                          contentStyle={{ 
                             backgroundColor: theme === 'dark' ? '#0A0F0D' : '#fff', 
                             borderRadius: '16px', 
                             border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #eee',
                             boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
                          }}
                          itemStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#fff' }}
                          labelStyle={{ color: '#666', marginBottom: '8px', fontSize: '11px', textTransform: 'uppercase', fontWeight: 'bold' }}
                       />
                       <Bar dataKey="elec" stackId="a" fill="#F59E0B" radius={[0, 0, 4, 4]} barSize={24} />
                       <Bar dataKey="water" stackId="a" fill="#06B6D4" radius={[4, 4, 0, 0]} barSize={24} />
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </div>

        </div>

      </div>
    </div>
  );
}