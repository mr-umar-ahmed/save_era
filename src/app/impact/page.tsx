'use client';

import Link from "next/link";
import { 
  Trophy, TreePine, Droplets, Zap, ArrowRight, 
  Award, Medal, Share2, Download, ChevronRight,
  Leaf, Waves, Activity, Sparkles
} from "lucide-react";
import { Outfit, Inter } from "next/font/google";
import { useTheme } from "../components/ThemeProvider";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function ImpactPage() {
  const { theme, colors } = useTheme();

  return (
    <div className={`${outfit.variable} ${inter.variable} min-h-screen ${colors.bg} ${colors.text} font-sans transition-colors duration-300 relative overflow-x-hidden`}>
      
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-[-20%] left-[20%] w-[600px] h-[600px] rounded-full blur-[120px] transition-colors ${theme === 'dark' ? 'bg-emerald-500/10' : 'bg-emerald-200/40'}`} />
        <div className={`absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full blur-[100px] transition-colors ${theme === 'dark' ? 'bg-teal-500/10' : 'bg-teal-200/40'}`} />
        <div className={`absolute inset-0 bg-[size:40px_40px] opacity-20 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]
           ${theme === 'dark' 
             ? 'bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]' 
             : 'bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)]'
           }`} 
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:py-12">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-2">
            <Link href="/dashboard" className={`inline-flex items-center gap-2 text-sm font-bold transition-colors hover:text-emerald-500 ${colors.textMuted}`}>
              <ChevronRight className="w-4 h-4 rotate-180" /> Back to Base
            </Link>
            <div className="flex items-center gap-3 mb-2 mt-4">
                <div className={`px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${theme === 'dark' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-700'}`}>
                    <Sparkles className="w-3.5 h-3.5" /> Lifetime Impact Matrix
                </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight">
              Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Legacy</span>
            </h1>
          </div>

          <div className="flex gap-3">
             <button className={`px-5 py-2.5 rounded-full border text-sm font-bold transition flex items-center gap-2 ${theme === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white' : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'}`}>
               <Download className="w-4 h-4" /> Export ESG Data
             </button>
             <button className="px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm transition flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
               <Share2 className="w-4 h-4" /> Share Impact
             </button>
          </div>
        </div>

        {/* 4. MAIN IMPACT GRID */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          
          <div className={`group relative backdrop-blur-xl border rounded-[2.5rem] p-8 overflow-hidden transition-all duration-500 hover:-translate-y-1 ${colors.cardBg} hover:border-amber-500/50`}>
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Zap className="w-32 h-32 text-amber-500 -rotate-12" />
            </div>
            <div className="relative z-10">
              <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-6 shadow-sm ${theme === 'dark' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 'bg-amber-50 border-amber-200 text-amber-600'}`}>
                <span className="text-xl font-bold">₹</span>
              </div>
              <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${colors.textMuted}`}>Wealth Retained</p>
              <h2 className="text-5xl font-black font-display mb-4 text-white">12,450</h2>
              <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-amber-500/5 border-amber-500/10' : 'bg-amber-50 border-amber-100'}`}>
                <p className={`text-xs font-bold leading-relaxed ${theme === 'dark' ? 'text-amber-200/80' : 'text-amber-800'}`}>
                  Offsetting enough power to run a local Raichur clinic for 3 days.
                </p>
              </div>
            </div>
          </div>

          <div className={`group relative backdrop-blur-xl border rounded-[2.5rem] p-8 overflow-hidden transition-all duration-500 hover:-translate-y-1 ${colors.cardBg} hover:border-cyan-500/50`}>
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Droplets className="w-32 h-32 text-cyan-500 -rotate-12" />
            </div>
            <div className="relative z-10">
              <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-6 shadow-sm ${theme === 'dark' ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-500' : 'bg-cyan-50 border-cyan-200 text-cyan-600'}`}>
                <Droplets className="w-6 h-6" />
              </div>
              <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${colors.textMuted}`}>Water Conserved</p>
              <h2 className="text-5xl font-black font-display mb-4 text-white">89.2k <span className={`text-2xl ${colors.textMuted}`}>L</span></h2>
              <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-cyan-500/5 border-cyan-500/10' : 'bg-cyan-50 border-cyan-100'}`}>
                <p className={`text-xs font-bold leading-relaxed ${theme === 'dark' ? 'text-cyan-200/80' : 'text-cyan-800'}`}>
                  Crucial conservation during Karnataka's peak dry season.
                </p>
              </div>
            </div>
          </div>

          <div className={`group relative backdrop-blur-xl border rounded-[2.5rem] p-8 overflow-hidden transition-all duration-500 hover:-translate-y-1 ${colors.cardBg} hover:border-emerald-500/50`}>
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Activity className="w-32 h-32 text-emerald-500 -rotate-12" />
            </div>
            <div className="relative z-10">
              <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-6 shadow-sm ${theme === 'dark' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-emerald-50 border-emerald-200 text-emerald-600'}`}>
                <Activity className="w-6 h-6" />
              </div>
              <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${colors.textMuted}`}>Peak Grid Relief</p>
              <h2 className="text-5xl font-black font-display mb-4 text-white">14.2 <span className={`text-2xl ${colors.textMuted}`}>kW</span></h2>
              <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-emerald-50 border-emerald-100'}`}>
                <p className={`text-xs font-bold leading-relaxed ${theme === 'dark' ? 'text-emerald-200/80' : 'text-emerald-800'}`}>
                  You successfully reduced load during 4 critical grid stress events.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* MILESTONE PROGRESS */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-6 mb-12">
          <div className={`relative backdrop-blur-xl border rounded-[2.5rem] p-8 md:p-10 ${theme === 'dark' ? 'bg-gradient-to-r from-emerald-950/40 to-teal-950/20 border-emerald-500/20' : 'bg-white border-emerald-100 shadow-sm'}`}>
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
               <div>
                 <div className="flex items-center gap-2 mb-2">
                   <Trophy className="w-5 h-5 text-yellow-500" />
                   <h3 className="text-yellow-500 font-bold uppercase tracking-widest text-sm">Next Protocol Rank</h3>
                 </div>
                 <p className="text-3xl font-black font-display text-white">Tier 3 Smart Node</p>
                 <p className={`mt-1 font-medium ${colors.textMuted}`}>Reach ₹15,000 in grid savings to unlock.</p>
               </div>
               
               <div className="text-right">
                 <p className="text-4xl font-black font-display text-white">82%</p>
                 <p className="text-emerald-500 text-sm font-bold">Parameters Optimal</p>
               </div>
             </div>

             <div className={`relative h-6 rounded-full overflow-hidden mb-4 border ${theme === 'dark' ? 'bg-black/40 border-white/5' : 'bg-gray-100 border-gray-200'}`}>
                <div className="absolute top-0 left-0 h-full w-[82%] bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_20px_rgba(16,185,129,0.5)]" />
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[size:20px_20px]" />
             </div>
             
             <div className="flex justify-between text-sm font-bold font-mono text-white/50">
               <span>[SYS_VAL]: ₹12,450</span>
               <span>[TARGET]: ₹15,000</span>
             </div>
          </div>

          <div className={`backdrop-blur-xl border rounded-[2.5rem] p-8 flex flex-col justify-center items-center text-center ${colors.cardBg}`}>
             <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center shadow-[0_0_30px_rgba(251,191,36,0.4)] mb-4 animate-pulse">
               <Medal className="w-8 h-8 text-white" />
             </div>
             <p className="font-bold text-lg mb-2 text-white">Grid Honors</p>
             <p className={`text-xs font-medium mb-6 ${colors.textMuted}`}>You are in the top 5% of efficient households in your sector.</p>
             <Link href="/challenges" className="text-emerald-400 hover:text-emerald-300 text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-1">
               Join Next Mission <ArrowRight className="w-3 h-3" />
             </Link>
          </div>
        </div>

      </div>
    </div>
  );
}