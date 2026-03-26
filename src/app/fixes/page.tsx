'use client';

import Link from "next/link";
import { useState } from "react";
import { 
  ArrowLeft, Sparkles, Zap, ThermometerSnowflake, 
  Droplets, Lightbulb, Loader2, CheckCircle2, Clock
} from "lucide-react";
import { Outfit, Inter } from "next/font/google";
import { useTheme } from "../components/ThemeProvider";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// --- MOCK UPGRADE DATA ---
const INITIAL_UPGRADES = [
  { 
    id: 1, 
    title: "AC Optimization Protocol", 
    desc: "Shift setpoint to 26°C. Current avg: 22°C.", 
    category: "COOLING", 
    icon: ThermometerSnowflake, 
    savings: 850, 
    time: "2 min", 
    color: "emerald",
    tag: "QUICK WIN"
  },
  { 
    id: 2, 
    title: "Hydro-Efficiency Cycle", 
    desc: "Reduce shower duration by 2 mins/day using smart timer.", 
    category: "WATER", 
    icon: Droplets, 
    savings: 420, 
    time: "Daily", 
    color: "cyan",
    tag: "QUICK WIN"
  },
  { 
    id: 3, 
    title: "Lumen Upgrade", 
    desc: "Swap 5 remaining incandescent bulbs to 9W LEDs.", 
    category: "LIGHTING", 
    icon: Lightbulb, 
    savings: 320, 
    time: "Hardware", 
    color: "amber",
    tag: "PHYSICAL"
  },
  { 
    id: 4, 
    title: "Vampire Drain Eradication", 
    desc: "Automate smart plugs to cut power to entertainment center at 1AM.", 
    category: "POWER", 
    icon: Zap, 
    savings: 210, 
    time: "5 min", 
    color: "purple",
    tag: "AUTOMATION"
  },
];

export default function FixesPage() {
  const { theme, colors } = useTheme();
  
  // State for interactivity
  const [upgrades, setUpgrades] = useState(INITIAL_UPGRADES);
  const [appliedIds, setAppliedIds] = useState<number[]>([]);
  const [loadingIds, setLoadingIds] = useState<number[]>([]);

  // Calculate dynamic savings
  const potentialSavings = upgrades
    .filter(u => !appliedIds.includes(u.id))
    .reduce((sum, u) => sum + u.savings, 0);

  // Handle the "Automate" click
  const handleApply = (id: number) => {
    setLoadingIds(prev => [...prev, id]);
    
    // Simulate API call / Smart Home connection
    setTimeout(() => {
      setLoadingIds(prev => prev.filter(loadingId => loadingId !== id));
      setAppliedIds(prev => [...prev, id]);
    }, 1500);
  };

  return (
    <div className={`${outfit.variable} ${inter.variable} min-h-screen ${colors.bg} ${colors.text} font-sans relative overflow-x-hidden`}>
      
      {/* Background FX */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[10%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8 md:py-12">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <Link href="/dashboard" className={`inline-flex items-center gap-2 font-bold transition-colors hover:text-emerald-400 text-sm ${colors.textMuted}`}>
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>
            
            <div className="flex items-center gap-3 mb-2 mt-4">
                <div className={`px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${theme === 'dark' ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' : 'bg-purple-50 border-purple-200 text-purple-700'}`}>
                    <Sparkles className="w-3.5 h-3.5" /> AI Analysis Complete
                </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight text-white flex items-center gap-3">
              System <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Upgrades</span>
            </h1>
            <p className={`text-sm max-w-lg mt-2 ${colors.textMuted}`}>
              Applying these {upgrades.length - appliedIds.length} patches will increase your household efficiency by 22%.
            </p>
          </div>

          {/* POTENTIAL SAVINGS WIDGET */}
          <div className="relative group shrink-0">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-[2rem] blur-lg opacity-20 transition-opacity" />
            <div className="relative bg-[#0A0F0D] border border-white/10 rounded-[2rem] p-6 flex items-center gap-6 min-w-[240px]">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-emerald-400 fill-emerald-400/20" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">Potential Savings</p>
                <div className="flex items-baseline gap-1 transition-all duration-500">
                  <span className="text-4xl font-black font-mono text-white">₹{potentialSavings.toLocaleString()}</span>
                  <span className="text-sm text-white/40 font-bold">/mo</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* UPGRADES LIST */}
        <div className="space-y-4">
          {upgrades.map((upgrade) => {
            const isApplied = appliedIds.includes(upgrade.id);
            const isLoading = loadingIds.includes(upgrade.id);

            return (
              <div 
                key={upgrade.id} 
                className={`relative overflow-hidden rounded-[2rem] border transition-all duration-500 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6
                  ${isApplied 
                    ? 'bg-emerald-950/20 border-emerald-500/20 opacity-60 grayscale-[50%]' 
                    : 'bg-[#0A0F0D]/80 backdrop-blur-xl border-white/10 hover:border-white/20 hover:bg-white/[0.02]'
                  }
                `}
              >
                {/* Background Glow (Active Only) */}
                {!isApplied && (
                  <div className={`absolute top-0 left-0 w-32 h-32 bg-${upgrade.color}-500/10 rounded-full blur-[60px] pointer-events-none`} />
                )}

                {/* Left: Icon & Category */}
                <div className="flex flex-col items-center gap-3 shrink-0 md:w-24">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-inner transition-colors
                    ${isApplied 
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' 
                      : `bg-${upgrade.color}-500/10 border-${upgrade.color}-500/20 text-${upgrade.color}-400`
                    }
                  `}>
                    {isApplied ? <CheckCircle2 className="w-6 h-6" /> : <upgrade.icon className="w-6 h-6" />}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${colors.textMuted}`}>
                    {upgrade.category}
                  </span>
                </div>

                {/* Middle: Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className={`text-xl font-bold font-display ${isApplied ? 'text-emerald-400' : 'text-white'}`}>
                      {upgrade.title}
                    </h3>
                    {!isApplied && (
                      <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider border
                        ${upgrade.tag === 'QUICK WIN' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-white/5 border-white/10 text-white/50'}
                      `}>
                        {upgrade.tag}
                      </span>
                    )}
                  </div>
                  <p className={`text-sm mb-4 leading-relaxed ${isApplied ? 'text-white/40 line-through' : 'text-white/70'}`}>
                    {upgrade.desc}
                  </p>
                  
                  {/* Metrics Row */}
                  <div className="flex items-center gap-6">
                    <span className={`text-xs font-bold font-mono flex items-center gap-1.5 ${isApplied ? 'text-emerald-500/50' : 'text-emerald-400'}`}>
                      <div className={`w-2 h-2 rounded-full ${isApplied ? 'bg-emerald-500/20' : 'bg-emerald-500 animate-pulse'}`} />
                      ₹{upgrade.savings}/mo
                    </span>
                    <span className={`text-xs font-mono flex items-center gap-1.5 ${colors.textMuted}`}>
                      <Clock className="w-3.5 h-3.5" /> {upgrade.time}
                    </span>
                  </div>
                </div>

                {/* Right: Action Button */}
                <div className="shrink-0 w-full md:w-auto mt-4 md:mt-0">
                  <button 
                    onClick={() => handleApply(upgrade.id)}
                    disabled={isApplied || isLoading}
                    className={`w-full md:w-[140px] h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all
                      ${isApplied 
                        ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 cursor-default' 
                        : isLoading
                          ? 'bg-white/10 text-white cursor-wait'
                          : 'bg-white text-black hover:bg-gray-200 hover:scale-[1.02] active:scale-95 shadow-xl shadow-white/5'
                      }
                    `}
                  >
                    {isLoading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Syncing...</>
                    ) : isApplied ? (
                      <><CheckCircle2 className="w-4 h-4" /> Active</>
                    ) : (
                      "Automate"
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}