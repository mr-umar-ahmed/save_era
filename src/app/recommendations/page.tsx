'use client';

import Link from "next/link";
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
  ChevronRight,
  Cpu,
  Target
} from "lucide-react";
import { Outfit, Inter } from "next/font/google";
import { useTheme } from "../components/ThemeProvider";

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
  const { theme, colors } = useTheme();

  return (
    <div className={`${outfit.variable} ${inter.variable} min-h-screen ${colors.bg} ${colors.text} font-sans transition-colors duration-300 relative overflow-x-hidden`}>
      
      {/* 3. BACKGROUND FX */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-[-10%] left-[30%] w-[800px] h-[800px] rounded-full blur-[120px] transition-colors ${theme === 'dark' ? 'bg-emerald-500/10' : 'bg-emerald-200/40'}`} />
        <div className={`absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] rounded-full blur-[120px] transition-colors ${theme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-200/40'}`} />
        <div className={`absolute inset-0 bg-[size:40px_40px] opacity-20 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]
           ${theme === 'dark' 
             ? 'bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]' 
             : 'bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)]'
           }`} 
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8 md:py-12">
        
        {/* 4. HEADER & HUD */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border backdrop-blur-md ${theme === 'dark' ? 'border-purple-500/30 bg-purple-500/10' : 'border-purple-200 bg-purple-50'}`}>
              <Sparkles className="w-4 h-4 text-purple-500 animate-pulse" />
              <span className="text-xs font-bold text-purple-500 uppercase tracking-widest">
                AI Analysis Complete
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight">
              System <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Upgrades</span>
            </h1>
            <p className={`text-lg max-w-xl ${colors.textMuted}`}>
              Applying these 5 patches will increase your household efficiency by 22%.
            </p>
          </div>

          {/* Total Savings HUD */}
          <div className={`backdrop-blur-xl border rounded-2xl p-6 flex items-center gap-6 shadow-xl ${colors.cardBg}`}>
             <div className={`w-16 h-16 rounded-full border flex items-center justify-center shadow-lg ${theme === 'dark' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-emerald-50 border-emerald-100 text-emerald-600'}`}>
               <Zap className="w-8 h-8" />
             </div>
             <div>
               <p className={`text-xs font-bold uppercase tracking-widest ${colors.textMuted}`}>Potential Savings</p>
               <p className="text-4xl font-black font-display">₹2,500<span className={`text-sm font-sans font-medium ${colors.textMuted}`}>/mo</span></p>
             </div>
          </div>
        </div>

        {/* 5. RECOMMENDATIONS LIST */}
        <div className="space-y-6 mb-20">
          {recommendations.map((rec) => (
            <div 
              key={rec.id}
              className={`group relative backdrop-blur-xl border rounded-[2rem] p-1 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${colors.cardBg} ${theme === 'dark' ? 'hover:border-white/20' : 'hover:border-purple-200'}`}
            >
              {/* Animated Gradient Border Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r from-${rec.color}-500/0 via-${rec.color}-500/10 to-${rec.color}-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

              <div className={`relative rounded-[1.9rem] p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start md:items-center ${theme === 'dark' ? 'bg-[#0A0F0D]' : 'bg-white'}`}>
                
                {/* Icon & Category */}
                <div className="flex flex-row md:flex-col items-center gap-4 md:gap-2 min-w-[80px]">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border bg-gradient-to-br shadow-md
                      ${rec.color === 'emerald' ? (theme === 'dark' ? 'from-emerald-500/20 to-green-900/20 border-emerald-500/30 text-emerald-400' : 'from-emerald-50 to-emerald-100 border-emerald-200 text-emerald-600') : ''}
                      ${rec.color === 'cyan' ? (theme === 'dark' ? 'from-cyan-500/20 to-blue-900/20 border-cyan-500/30 text-cyan-400' : 'from-cyan-50 to-cyan-100 border-cyan-200 text-cyan-600') : ''}
                      ${rec.color === 'amber' ? (theme === 'dark' ? 'from-amber-500/20 to-orange-900/20 border-amber-500/30 text-amber-400' : 'from-amber-50 to-amber-100 border-amber-200 text-amber-600') : ''}
                      ${rec.color === 'purple' ? (theme === 'dark' ? 'from-purple-500/20 to-pink-900/20 border-purple-500/30 text-purple-400' : 'from-purple-50 to-purple-100 border-purple-200 text-purple-600') : ''}
                      ${rec.color === 'blue' ? (theme === 'dark' ? 'from-blue-500/20 to-indigo-900/20 border-blue-500/30 text-blue-400' : 'from-blue-50 to-blue-100 border-blue-200 text-blue-600') : ''}
                  `}>
                    <rec.icon className="w-6 h-6" />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider hidden md:block ${colors.textMuted}`}>{rec.category}</span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold font-display">{rec.title}</h3>
                    {rec.type === 'quick-win' && (
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide border ${theme === 'dark' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-700'}`}>
                        Quick Win
                      </span>
                    )}
                  </div>
                  <p className={`text-sm mb-4 leading-relaxed ${colors.textMuted}`}>{rec.desc}</p>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-emerald-500" />
                        <span className="text-lg font-bold">{rec.savings}<span className={`text-xs ${colors.textMuted}`}>/mo</span></span>
                    </div>
                    <div className={`h-4 w-px ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'}`} />
                    <div className="flex items-center gap-2">
                        <Clock className={`w-4 h-4 ${colors.textMuted}`} />
                        <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white/60' : 'text-gray-500'}`}>{rec.time}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto">
                  <button className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-colors shadow-lg
                    ${theme === 'dark' ? 'bg-white text-black hover:bg-emerald-400' : 'bg-[#0F172A] text-white hover:bg-[#1e293b]'}`}>
                    <Check className="w-4 h-4" /> Apply
                  </button>
                  <div className="flex gap-3">
                      <button className={`flex-1 md:flex-none p-3 rounded-xl border transition-colors ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10' : 'bg-white border-gray-200 text-gray-400 hover:text-gray-700 hover:bg-gray-50'}`} title="Remind Later">
                        <Clock className="w-4 h-4" />
                      </button>
                      <button className={`flex-1 md:flex-none p-3 rounded-xl border transition-colors ${theme === 'dark' ? 'bg-purple-500/10 border-purple-500/30 text-purple-400 hover:bg-purple-500/20' : 'bg-purple-50 border-purple-200 text-purple-600 hover:bg-purple-100'}`} title="Automate with AI">
                        <Bot className="w-4 h-4" />
                      </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* 6. HOW IT WORKS (Diagram Section) */}
        <div className={`backdrop-blur-xl border rounded-[2.5rem] p-8 md:p-12 mb-20 relative overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border-blue-500/20' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100'}`}>
           <div className="absolute top-0 right-0 p-12 opacity-5">
             <Cpu className="w-64 h-64 text-blue-400" />
           </div>
           
           <div className="relative z-10">
             <div className="mb-8">
               <h2 className="text-2xl font-bold font-display mb-2">How AI Analyzes Your Home</h2>
               <p className={`text-sm ${colors.textMuted}`}>Understanding the logic behind these recommendations.</p>
             </div>

             {/* DIAGRAM TRIGGER */}
             <div className={`w-full rounded-2xl border p-6 flex flex-col items-center justify-center min-h-[300px] ${theme === 'dark' ? 'bg-black/40 border-white/10' : 'bg-white/60 border-blue-100'}`}>
               <p className={`mt-4 text-xs font-mono ${colors.textMuted}`}>FIG 1.0: Azure IoT Hub Data Processing Pipeline</p>
             </div>
             
             <div className="grid md:grid-cols-3 gap-8 mt-12">
               <div className="flex flex-col gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border ${theme === 'dark' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-100 text-blue-600 border-blue-200'}`}>1</div>
                  <h3 className="font-bold">Pattern Recognition</h3>
                  <p className={`text-sm leading-relaxed ${colors.textMuted}`}>We compare your usage spikes against 10M+ data points to identify inefficient appliances.</p>
               </div>
               <div className="flex flex-col gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border ${theme === 'dark' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-purple-100 text-purple-600 border-purple-200'}`}>2</div>
                  <h3 className="font-bold">Contextual Matching</h3>
                  <p className={`text-sm leading-relaxed ${colors.textMuted}`}>We cross-reference local weather (Raichur heat) with your cooling patterns.</p>
               </div>
               <div className="flex flex-col gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border ${theme === 'dark' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-100 text-emerald-600 border-emerald-200'}`}>3</div>
                  <h3 className="font-bold">Impact Forecasting</h3>
                  <p className={`text-sm leading-relaxed ${colors.textMuted}`}>Our models predict financial savings based on your specific tariff rates.</p>
               </div>
             </div>
           </div>
        </div>

        {/* 7. FOOTER NAV */}
        <div className="flex flex-col items-center justify-center space-y-8">
           <Link 
             href="/impact"
             className={`group relative px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-bold text-xl hover:scale-105 transition-transform duration-300 shadow-xl`}
           >
             <span className="relative z-10 flex items-center gap-2">
               Visualize Impact <ArrowRight className="w-5 h-5" />
             </span>
           </Link>
           
           <div className={`flex gap-6 text-sm font-medium ${colors.textMuted}`}>
             <Link href="/breakdown" className="hover:text-emerald-500 transition-colors">Breakdown</Link>
             <span>•</span>
             <Link href="/challenges" className="hover:text-emerald-500 transition-colors">Mission Center</Link>
           </div>
        </div>

      </div>
    </div>
  );
}