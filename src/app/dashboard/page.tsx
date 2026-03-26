'use client';

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  Zap, Droplets, Flame, ArrowLeft, TrendingUp, AlertCircle, 
  ThermometerSnowflake, Lightbulb, ShowerHead, Waves, Factory, 
  Wind, UploadCloud, PieChart, Sparkles, Download, CheckCircle2
} from "lucide-react";
import { Outfit, Inter } from "next/font/google";
import { useTheme } from "../components/ThemeProvider";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// --- THE AI KNOWLEDGE BASE ---
// This acts as our fake AI backend. It knows which items are "High Load" (red) and which are efficient (green).
const ITEM_DATABASE: Record<string, any> = {
  // Electricity
  ac: { name: 'AC Unit', isHigh: true, value: 1500, icon: ThermometerSnowflake, tip: "Reduce daytime AC usage by 2 hours to save ~₹450/month." },
  fridge: { name: 'Refrigerator', isHigh: false, value: 400, icon: Zap, tip: "Running efficiently." },
  pump: { name: '1HP Submersible Pump', isHigh: true, value: 1200, icon: Factory, tip: "Pump running 30% longer than regional average. Check for pipe leaks." },
  fans: { name: 'Ceiling Fans & Lights', isHigh: false, value: 250, icon: Wind, tip: "Highly efficient usage." },
  // Water
  shower: { name: 'Showers & Bath', isHigh: true, value: 600, icon: ShowerHead, tip: "Cut shower time by 2 mins to save 1,500L of water monthly." },
  toilet: { name: 'Flush Tanks', isHigh: false, value: 300, icon: Waves, tip: "Normal usage detected." },
  garden: { name: 'Garden / Lawn', isHigh: true, value: 800, icon: Droplets, tip: "Watering at night instead of noon reduces evaporation waste by 40%." },
  livestock: { name: 'Livestock Care', isHigh: false, value: 400, icon: Factory, tip: "Stable agricultural usage." },
  // Gas
  stove: { name: 'Gas Stove', isHigh: false, value: 300, icon: Flame, tip: "Efficient cooking habits detected." },
  geyser: { name: 'Gas Water Heater', isHigh: true, value: 650, icon: ThermometerSnowflake, tip: "Lower geyser temp to 45°C to save half a cylinder per month." },
  lpg: { name: 'LPG Cylinders', isHigh: false, value: 900, icon: UploadCloud, tip: "Standard consumption." },
  piped: { name: 'Piped City Gas', isHigh: false, value: 500, icon: Waves, tip: "Optimal flow rate." },
};

const UTILITY_CONFIG = {
  electricity: { title: "Electricity", icon: Zap, color: "amber", unit: "₹" },
  water: { title: "Water", icon: Droplets, color: "cyan", unit: "Liters" },
  gas: { title: "Gas", icon: Flame, color: "rose", unit: "₹" },
};

function DashboardContent() {
  const searchParams = useSearchParams();
  const { theme, colors } = useTheme();
  
  // Get data from the URL (passed from Household Setup)
  const type = (searchParams.get('type') as 'electricity' | 'water' | 'gas') || 'electricity';
  const itemsParam = searchParams.get('items');
  const selectedItemsKeys = itemsParam ? itemsParam.split(',') : ['ac', 'fridge']; // Default fallback

  const config = UTILITY_CONFIG[type];
  const cardClass = theme === 'dark' ? 'bg-[#0A0F0D] border-white/10' : 'bg-white border-gray-200 shadow-sm';

  // "Math" Logic: Calculate totals and figure out if we have red/green items
  const activeItems = selectedItemsKeys.map(key => ITEM_DATABASE[key]).filter(Boolean);
  const totalValue = activeItems.reduce((sum, item) => sum + item.value, 0);
  const highLoadItems = activeItems.filter(item => item.isHigh);
  const isOptimal = highLoadItems.length === 0; // If no high-load items, they get a pure green report

  return (
    <div className="relative z-10 max-w-5xl mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-3">
              <div className={`px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${theme === 'dark' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-700'}`}>
                  <Sparkles className="w-3.5 h-3.5" /> AI Analysis Complete
              </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black font-display tracking-tight flex items-center gap-3">
             {config.title} <span className={`text-transparent bg-clip-text bg-gradient-to-r from-${config.color}-400 to-${config.color}-600`}>Overview</span>
          </h1>
        </div>
      </header>

      {/* Main Stats Card */}
      <div className={`p-8 rounded-[2.5rem] border relative overflow-hidden mb-8 transition-all ${cardClass}`}>
        <div className="absolute -top-4 -right-4 p-8 opacity-5">
            <config.icon className={`w-48 h-48 text-${config.color}-500 -rotate-12`} />
        </div>

        <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-white/10 pb-8">
                <div>
                  <h2 className="text-2xl font-bold font-display flex items-center gap-3">
                      Estimated Consumption <config.icon className={`w-5 h-5 text-${config.color}-500`} />
                  </h2>
                  <p className={`text-sm mt-1 ${colors.textMuted}`}>Based on your scanned bill & appliance setup</p>
                </div>
                <div className="text-right">
                  <span className={`text-3xl font-black font-mono text-${config.color}-400`}>
                    {type === 'water' ? '' : '₹'}{totalValue.toLocaleString()}{type === 'water' ? ' L' : ''}
                  </span>
                </div>
            </div>

            {/* Dynamic Appliance Bars */}
            <div className="space-y-6">
                {activeItems.map((item, i) => {
                  const percent = Math.round((item.value / totalValue) * 100);
                  // Dynamic color: Red if High Load, Emerald if efficient
                  const barColor = item.isHigh ? '#EF4444' : '#10B981';

                  return (
                    <div key={i}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="flex items-center gap-2 font-bold">
                              <item.icon className={`w-4 h-4 ${item.isHigh ? 'text-red-400' : 'text-emerald-400'}`} /> 
                              {item.name}
                          </span>
                          <span className="font-mono font-medium opacity-70">
                            {type === 'water' ? '' : '₹'}{item.value} <span className="text-xs ml-1">({percent}%)</span>
                          </span>
                        </div>
                        <div className="h-3 rounded-full overflow-hidden bg-white/5">
                          <div 
                              style={{ width: `${percent}%`, backgroundColor: barColor }} 
                              className="h-full rounded-full shadow-lg transition-all duration-1000 ease-out"
                          />
                        </div>
                    </div>
                  );
                })}
            </div>
        </div>
      </div>

      {/* Dynamic AI Feedback / Diagnostics */}
      <h2 className="text-lg font-bold font-display mb-4 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          AI Diagnostic Report
      </h2>

      <div className="space-y-4 mb-12">
        {/* GREEN PRAISE: Shows if they have NO high-load items, OR as a constant positive reinforcement */}
        <div className={`p-5 rounded-2xl border ${theme === 'dark' ? 'bg-black/40 border-emerald-500/20' : 'bg-white border-emerald-100'}`}>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                  <p className="font-bold text-sm">Efficiency Baseline Good</p>
                  <p className={`text-xs mt-1.5 leading-relaxed ${colors.textMuted}`}>
                    {isOptimal 
                      ? "Excellent! Your selected setup contains no high-drain anomalies. You are in the top 10% of efficient users in your region this month." 
                      : "Base appliances (like fans and lights) are operating within optimal ranges compared to neighborhood averages."}
                  </p>
              </div>
            </div>
        </div>

        {/* RED WARNINGS: Generates dynamically based on the specific high-load items they clicked */}
        {highLoadItems.map((item, i) => (
          <div key={i} className={`p-5 rounded-2xl border ${theme === 'dark' ? 'bg-black/40 border-red-500/20' : 'bg-white border-red-100'}`}>
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                    <p className="font-bold text-sm text-red-400">High Usage Detected: {item.name}</p>
                    <p className={`text-xs mt-1.5 leading-relaxed ${colors.textMuted}`}>
                      {item.tip}
                    </p>
                </div>
              </div>
          </div>
        ))}
      </div>

    </div>
  );
}

// Wrapper to handle Next.js SearchParams safely
export default function DynamicDashboard() {
  const { theme, colors } = useTheme();
  
  return (
    <div className={`${outfit.variable} ${inter.variable} w-full min-h-screen ${colors.bg} ${colors.text} font-sans transition-colors duration-300 p-4 md:p-8`}>
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
         <div className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] opacity-10 ${theme === 'dark' ? 'bg-emerald-500' : 'bg-emerald-200'}`} />
      </div>
      
      <Suspense fallback={<div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div></div>}>
        <DashboardContent />
      </Suspense>
    </div>
  );
}