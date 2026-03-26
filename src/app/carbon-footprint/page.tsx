'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  TreePine, Car, Plane, Utensils, Zap, ArrowRight, ArrowLeft, 
  Cpu, CheckCircle2, Factory, CloudFog, Sparkles, TrendingDown,
  ChevronRight, Leaf
} from "lucide-react";
import { Outfit, Inter } from "next/font/google";
import { useTheme } from "../components/ThemeProvider";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

type Phase = 'questionnaire' | 'analyzing' | 'results';

export default function CarbonFootprintPage() {
  const { theme, colors } = useTheme();
  
  const [phase, setPhase] = useState<Phase>('questionnaire');
  const [step, setStep] = useState(1);
  const [loadingText, setLoadingText] = useState("");

  // Form State
  const [answers, setAnswers] = useState({
    commute: 'car',
    distance: 15,
    flights: 2,
    diet: 'mixed',
  });

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else startAnalysis();
  };

  const startAnalysis = () => {
    setPhase('analyzing');
    setLoadingText("Aggregating emission vectors...");
    
    setTimeout(() => setLoadingText("Mapping against regional baselines..."), 1500);
    setTimeout(() => setLoadingText("Calculating offset equivalencies..."), 3000);
    setTimeout(() => setPhase('results'), 4500);
  };

  // -------------------------------------------------------------
  // PHASE 1: QUESTIONNAIRE
  // -------------------------------------------------------------
  if (phase === 'questionnaire') {
    return (
      <div className={`${outfit.variable} ${inter.variable} min-h-screen ${colors.bg} ${colors.text} font-sans flex items-center justify-center p-4 relative overflow-hidden`}>
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 w-full max-w-2xl">
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              <TreePine className="w-8 h-8" />
            </div>
            <h1 className="text-3xl md:text-5xl font-black font-display mb-3">Carbon Analyzer</h1>
            <p className={`${colors.textMuted}`}>Help the AI understand your lifestyle parameters.</p>
          </div>

          <div className="bg-[#0A0F0D] border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
            {/* Progress */}
            <div className="flex gap-2 mb-10">
              {[1, 2, 3, 4].map(s => (
                <div key={s} className={`h-2 flex-1 rounded-full transition-all duration-500 ${s <= step ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-white/10'}`} />
              ))}
            </div>

            {/* Q1: Commute Type */}
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3"><Car className="text-emerald-500" /> Primary Commute</h2>
                <div className="grid gap-3">
                  {[
                    { id: 'car', label: 'Gasoline Car' },
                    { id: 'ev', label: 'Electric Vehicle (EV)' },
                    { id: 'transit', label: 'Public Transit / Bus' },
                    { id: 'bike', label: 'Bicycle / Walking' }
                  ].map(opt => (
                    <button 
                      key={opt.id} onClick={() => setAnswers({...answers, commute: opt.id})}
                      className={`p-4 rounded-xl border text-left font-bold transition-all ${answers.commute === opt.id ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Q2: Distance */}
            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3"><Factory className="text-emerald-500" /> Daily Distance</h2>
                <p className={`text-sm mb-6 ${colors.textMuted}`}>Average kilometers traveled per day.</p>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                   <span className="text-6xl font-black font-display text-emerald-400">{answers.distance} <span className="text-2xl text-white/40">km</span></span>
                   <input 
                     type="range" min="0" max="100" value={answers.distance} 
                     onChange={e => setAnswers({...answers, distance: parseInt(e.target.value)})}
                     className="w-full mt-8 accent-emerald-500"
                   />
                </div>
              </div>
            )}

            {/* Q3: Flights */}
            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3"><Plane className="text-emerald-500" /> Air Travel</h2>
                <p className={`text-sm mb-6 ${colors.textMuted}`}>Flights taken in the last 12 months.</p>
                <div className="flex justify-center items-center gap-8 bg-white/5 border border-white/10 rounded-2xl p-8">
                   <button onClick={() => setAnswers(a => ({...a, flights: Math.max(0, a.flights - 1)}))} className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center font-black">-</button>
                   <span className="text-6xl font-black font-display text-emerald-400">{answers.flights}</span>
                   <button onClick={() => setAnswers(a => ({...a, flights: a.flights + 1}))} className="w-12 h-12 rounded-full bg-emerald-500 text-black hover:bg-emerald-400 flex items-center justify-center font-black">+</button>
                </div>
              </div>
            )}

            {/* Q4: Diet */}
            {step === 4 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3"><Utensils className="text-emerald-500" /> Dietary Habits</h2>
                <div className="grid gap-3">
                  {[
                    { id: 'meat_heavy', label: 'Meat Heavy (Daily)' },
                    { id: 'mixed', label: 'Mixed / Balanced' },
                    { id: 'vegetarian', label: 'Vegetarian' },
                    { id: 'vegan', label: 'Vegan / Plant-Based' }
                  ].map(opt => (
                    <button 
                      key={opt.id} onClick={() => setAnswers({...answers, diet: opt.id})}
                      className={`p-4 rounded-xl border text-left font-bold transition-all ${answers.diet === opt.id ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Nav */}
            <div className="mt-10 flex justify-between items-center pt-6 border-t border-white/10">
               {step > 1 ? (
                 <button onClick={() => setStep(step - 1)} className="text-white/50 hover:text-white font-bold flex items-center gap-2 text-sm"><ArrowLeft className="w-4 h-4"/> Back</button>
               ) : <div/>}
               <button onClick={handleNext} className="bg-emerald-500 text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                 {step === 4 ? "Analyze Footprint" : "Next Step"} <ArrowRight className="w-4 h-4"/>
               </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // PHASE 2: AI LOADER
  // -------------------------------------------------------------
  if (phase === 'analyzing') {
    return (
      <div className={`${outfit.variable} ${inter.variable} min-h-screen bg-[#050B08] text-white flex flex-col items-center justify-center relative overflow-hidden font-sans`}>
        <div className="relative w-64 h-64 flex items-center justify-center mb-8">
          <div className="absolute inset-0 rounded-full border-t-2 border-emerald-500 animate-[spin_2s_linear_infinite]" />
          <div className="absolute inset-4 rounded-full border-r-2 border-teal-500 animate-[spin_3s_linear_infinite_reverse]" />
          <div className="absolute inset-8 rounded-full border-b-2 border-blue-500 animate-[spin_1.5s_linear_infinite]" />
          <Cpu className="w-12 h-12 text-emerald-400 relative z-10 animate-pulse" />
        </div>
        <h2 className="text-3xl font-black font-display tracking-tight mb-4">ESG Engine Processing</h2>
        <p className="text-emerald-400 font-mono text-sm tracking-widest uppercase h-6 animate-pulse">
          {loadingText}
        </p>
      </div>
    );
  }

  // -------------------------------------------------------------
  // PHASE 3: RESULTS DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className={`${outfit.variable} ${inter.variable} min-h-screen bg-[#050B08] text-white font-sans overflow-x-hidden relative`}>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <Link href="/household-setup" className="inline-flex items-center gap-2 text-white/50 hover:text-emerald-400 font-bold text-sm mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Setup Hub
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" /> AI Diagnostic Complete
            </div>
            <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight">
              Emissions <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Report</span>
            </h1>
          </div>
          <div className="text-right bg-[#0A0F0D] border border-white/10 p-5 rounded-2xl flex items-center gap-5">
             <CloudFog className="w-10 h-10 text-gray-500" />
             <div>
               <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Total Annual Footprint</p>
               <p className="text-3xl font-black font-mono text-white">4.2 <span className="text-sm text-white/50 font-sans">Tons CO₂e</span></p>
             </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Main Chart */}
          <div className="lg:col-span-2 bg-[#0A0F0D] border border-white/10 rounded-[2rem] p-8">
            <h2 className="text-xl font-bold font-display mb-8">Emission Vectors</h2>
            
            <div className="space-y-6">
              {[
                { label: 'Transport', val: 45, icon: Car, color: 'bg-blue-500' },
                { label: 'Household Energy', val: 35, icon: Zap, color: 'bg-amber-500' },
                { label: 'Diet & Waste', val: 20, icon: Utensils, color: 'bg-emerald-500' }
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm font-bold mb-2">
                     <span className="flex items-center gap-2"><item.icon className="w-4 h-4 text-white/50"/> {item.label}</span>
                     <span>{item.val}%</span>
                  </div>
                  <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full shadow-[0_0_10px_currentColor]`} style={{width: `${item.val}%`}} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between">
               <div>
                 <p className="text-xs text-white/50 uppercase tracking-widest font-bold">Regional Average: 6.1 Tons</p>
                 <p className="text-sm text-emerald-400 font-bold flex items-center gap-1 mt-1"><TrendingDown className="w-4 h-4"/> 31% Below Average</p>
               </div>
               <button className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold transition-colors">
                 Download Report
               </button>
            </div>
          </div>

          {/* Offsets Needed */}
          <div className="bg-gradient-to-b from-emerald-900/20 to-[#0A0F0D] border border-emerald-500/20 rounded-[2rem] p-8 text-center flex flex-col justify-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
             
             <TreePine className="w-16 h-16 text-emerald-500 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
             <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-400 mb-2">Offset Required</h3>
             <p className="text-6xl font-black font-display mb-4">105</p>
             <p className="text-white/60 text-sm mb-8 leading-relaxed">Mature trees needed to completely neutralize your annual carbon footprint.</p>

             <button className="w-full py-4 bg-emerald-500 text-black rounded-xl font-bold hover:bg-emerald-400 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)]">
               Explore Offset Programs
             </button>
          </div>

        </div>

        {/* Recommended Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-bold font-display mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" /> AI-Suggested Mitigations
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
             <div className="bg-[#0A0F0D] border border-white/10 p-5 rounded-2xl flex items-center gap-4 hover:border-purple-500/50 transition-colors group cursor-pointer">
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                  <Leaf className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold">Meatless Mondays</h4>
                  <p className="text-xs text-white/50 mt-1">Reduces footprint by 0.3 Tons/yr.</p>
                </div>
                <ChevronRight className="text-white/30 group-hover:text-purple-400" />
             </div>
             
             <div className="bg-[#0A0F0D] border border-white/10 p-5 rounded-2xl flex items-center gap-4 hover:border-blue-500/50 transition-colors group cursor-pointer">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <Zap className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold">Solar Feasibility Check</h4>
                  <p className="text-xs text-white/50 mt-1">Your roof gets 6hrs of peak sun.</p>
                </div>
                <ChevronRight className="text-white/30 group-hover:text-blue-400" />
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}