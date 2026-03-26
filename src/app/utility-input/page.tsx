'use client';

import Link from "next/link";
import { 
  Zap, 
  Droplets, 
  Flame, // Added for Gas
  UploadCloud, 
  ArrowRight, 
  ScanLine, 
  Info,
  CheckCircle2,
  Sun,
  Moon,
  FileText
} from "lucide-react";
import { Outfit, Inter } from "next/font/google";
import { useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// 1. Font Setup
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// ==============================================================================
// THEME CONFIGURATION
// ==============================================================================

const THEME = {
  dark: {
    bg: "bg-[#050B08]",
    text: "text-white",
    textMuted: "text-white/50",
    cardBg: "bg-[#0A0F0D] border-white/10",
    scannerBg: "bg-white/[0.02] border-white/10 hover:bg-white/[0.04]",
    scannerActive: "bg-emerald-500/10 border-emerald-500/50",
    inputBg: "bg-white/5 border-white/10 text-white focus:bg-white/10",
    toggleBg: "bg-white/5 hover:bg-white/10 border-white/10",
    blob1: "bg-emerald-500/10",
    blob2: "bg-teal-500/10"
  },
  light: {
    bg: "bg-[#FFFFFF]",
    text: "text-[#0F172A]",
    textMuted: "text-[#6B7280]",
    cardBg: "bg-white border-gray-200 shadow-xl",
    scannerBg: "bg-gray-50 border-gray-200 hover:bg-gray-100",
    scannerActive: "bg-emerald-50 border-emerald-500",
    inputBg: "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white",
    toggleBg: "bg-gray-100 hover:bg-gray-200 border-gray-200",
    blob1: "bg-emerald-200/40",
    blob2: "bg-blue-200/40"
  }
};

export default function UtilityInput() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [fileUploaded, setFileUploaded] = useState(false);
  const colors = THEME[theme];

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`${outfit.variable} ${inter.variable} min-h-screen ${colors.bg} ${colors.text} font-sans transition-colors duration-300 relative overflow-x-hidden`}>
      
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <button 
          onClick={toggleTheme}
          className={`p-3 rounded-full border transition-all ${colors.toggleBg}`}
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* 2. BACKGROUND FX */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[120px] transition-colors duration-700 ${colors.blob1}`} />
        <div className={`absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] rounded-full blur-[100px] transition-colors duration-700 ${colors.blob2}`} />
        <div className={`absolute inset-0 bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20
           ${theme === 'dark' 
             ? 'bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]' 
             : 'bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)]'
           }`} 
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 md:py-20">
        
        {/* 3. HEADER */}
        <div className="text-center mb-12 space-y-4">
          <div className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full border backdrop-blur-md mb-4
            ${theme === 'dark' ? 'border-emerald-500/30 bg-emerald-500/10' : 'border-emerald-200 bg-emerald-50'}`}>
            <ScanLine className={`w-4 h-4 mr-2 animate-pulse ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`} />
            <span className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-emerald-300' : 'text-emerald-800'}`}>
              AI Vision Enabled
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black font-display tracking-tight">
            Sync Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500">Utilities</span>
          </h1>
          <p className={`text-lg md:text-xl font-light max-w-2xl mx-auto ${colors.textMuted}`}>
            Upload any bill. Our AI automatically detects provider, usage, and costs for Electricity, Water, and Gas.
          </p>
        </div>

        {/* 4. UNIFIED SCANNER */}
        <div className="max-w-3xl mx-auto mb-20">
           <div 
             onClick={() => setFileUploaded(!fileUploaded)}
             className={`relative h-64 rounded-[2.5rem] border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center cursor-pointer overflow-hidden group/upload
               ${fileUploaded ? colors.scannerActive : colors.scannerBg}
             `}
           >
             {/* Scanning Line Animation */}
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover/upload:opacity-100 group-hover/upload:animate-[scan_2s_ease-in-out_infinite]" />
             
             <div className="z-10 text-center space-y-4">
               <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg
                 ${fileUploaded 
                   ? 'bg-emerald-500 text-white' 
                   : theme === 'dark' ? 'bg-white/10 text-white/40' : 'bg-white text-gray-400 border border-gray-200'
                 }`}>
                 {fileUploaded ? <CheckCircle2 className="w-8 h-8" /> : <UploadCloud className="w-8 h-8" />}
               </div>
               
               <div>
                 <p className="font-bold text-lg">
                   {fileUploaded ? 'Files Uploaded Successfully' : 'Drop Bills Here or Click to Browse'}
                 </p>
                 <div className={`flex items-center justify-center gap-2 mt-2 text-sm ${colors.textMuted}`}>
                    <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> Elec</span> • 
                    <span className="flex items-center gap-1"><Droplets className="w-3 h-3" /> Water</span> • 
                    <span className="flex items-center gap-1"><Flame className="w-3 h-3" /> Gas</span>
                 </div>
               </div>
               
               {!fileUploaded && (
                 <span className={`text-xs px-3 py-1 rounded-full ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-200/50'}`}>
                   Supports PDF, JPG, PNG
                 </span>
               )}
             </div>
           </div>
        </div>

        {/* 5. MANUAL ENTRY GRID (Cards) */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          
          {/* === ELECTRICITY === */}
          <div className={`relative p-6 rounded-3xl border transition-colors group ${colors.cardBg} hover:border-amber-500/30`}>
             <div className="flex items-center justify-between mb-6">
               <div className={`p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500`}>
                 <Zap className="w-6 h-6" />
               </div>
               <span className="text-xs font-bold uppercase tracking-wider text-amber-500/60">KA-52</span>
             </div>
             <h3 className="text-xl font-bold mb-4">Electricity</h3>
             <div className="space-y-3">
               <div>
                 <label className={`text-[10px] font-bold uppercase tracking-wider ml-1 ${colors.textMuted}`}>Amount</label>
                 <input type="text" defaultValue="₹4,500" className={`w-full rounded-xl px-4 py-2 border outline-none font-mono ${colors.inputBg} focus:border-amber-500/50`} />
               </div>
               <div>
                 <label className={`text-[10px] font-bold uppercase tracking-wider ml-1 ${colors.textMuted}`}>Units (kWh)</label>
                 <input type="text" defaultValue="800" className={`w-full rounded-xl px-4 py-2 border outline-none font-mono ${colors.inputBg} focus:border-amber-500/50`} />
               </div>
             </div>
          </div>

          {/* === WATER === */}
          <div className={`relative p-6 rounded-3xl border transition-colors group ${colors.cardBg} hover:border-cyan-500/30`}>
             <div className="flex items-center justify-between mb-6">
               <div className={`p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-500`}>
                 <Droplets className="w-6 h-6" />
               </div>
               <span className="text-xs font-bold uppercase tracking-wider text-cyan-500/60">RUWSS</span>
             </div>
             <h3 className="text-xl font-bold mb-4">Water Supply</h3>
             <div className="space-y-3">
               <div>
                 <label className={`text-[10px] font-bold uppercase tracking-wider ml-1 ${colors.textMuted}`}>Amount</label>
                 <input type="text" defaultValue="₹1,200" className={`w-full rounded-xl px-4 py-2 border outline-none font-mono ${colors.inputBg} focus:border-cyan-500/50`} />
               </div>
               <div>
                 <label className={`text-[10px] font-bold uppercase tracking-wider ml-1 ${colors.textMuted}`}>Volume (L)</label>
                 <input type="text" defaultValue="45k" className={`w-full rounded-xl px-4 py-2 border outline-none font-mono ${colors.inputBg} focus:border-cyan-500/50`} />
               </div>
             </div>
          </div>

          {/* === GAS === */}
          <div className={`relative p-6 rounded-3xl border transition-colors group ${colors.cardBg} hover:border-rose-500/30`}>
             <div className="flex items-center justify-between mb-6">
               <div className={`p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500`}>
                 <Flame className="w-6 h-6" />
               </div>
               <span className="text-xs font-bold uppercase tracking-wider text-rose-500/60">HP GAS</span>
             </div>
             <h3 className="text-xl font-bold mb-4">Gas / Fuel</h3>
             <div className="space-y-3">
               <div>
                 <label className={`text-[10px] font-bold uppercase tracking-wider ml-1 ${colors.textMuted}`}>Amount</label>
                 <input type="text" defaultValue="₹950" className={`w-full rounded-xl px-4 py-2 border outline-none font-mono ${colors.inputBg} focus:border-rose-500/50`} />
               </div>
               <div>
                 <label className={`text-[10px] font-bold uppercase tracking-wider ml-1 ${colors.textMuted}`}>Cylinders</label>
                 <input type="text" defaultValue="1" className={`w-full rounded-xl px-4 py-2 border outline-none font-mono ${colors.inputBg} focus:border-rose-500/50`} />
               </div>
             </div>
          </div>

        </div>

        {/* 6. FOOTER ACTION */}
        <div className="flex flex-col items-center">
            <Link
            href="/dashboard"
            className={`group relative inline-flex items-center justify-center gap-3 px-12 py-5 rounded-full text-xl font-bold tracking-tight transition-all duration-300
              ${theme === 'dark' 
                ? 'bg-white text-[#050B08] hover:shadow-[0_0_60px_-15px_rgba(16,185,129,0.5)]' 
                : 'bg-[#0F172A] text-white hover:shadow-[0_0_40px_-10px_rgba(0,0,0,0.3)]'}`}
            >
            <span className="relative z-10">Process & Analyze</span>
            <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <div className={`mt-6 flex items-center gap-2 text-sm ${colors.textMuted}`}>
                <Info className="w-4 h-4" />
                <p>Data is encrypted and used only for your impact score.</p>
            </div>
        </div>

      </div>

      <style jsx global>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        :root {
          --font-outfit: ${outfit.style.fontFamily};
          --font-inter: ${inter.style.fontFamily};
        }
        .font-display { font-family: var(--font-outfit), sans-serif; }
        .font-sans { font-family: var(--font-inter), sans-serif; }
      `}</style>
    </div>
  );
}