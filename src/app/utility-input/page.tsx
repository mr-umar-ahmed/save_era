'use client';

import Link from "next/link";
import { 
  Zap, 
  Droplets, 
  Flame, // Added Flame icon
  UploadCloud, 
  FileText, 
  ArrowRight, 
  ScanLine, 
  Info,
  CheckCircle2
} from "lucide-react";
import { Outfit, Inter } from "next/font/google";
import { useState } from "react";

// 1. Font Setup
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function UtilityInput() {
  // Simple state to simulate file drop interactions
  const [elecFile, setElecFile] = useState(false);
  const [waterFile, setWaterFile] = useState(false); // Added for consistency
  const [gasFile, setGasFile] = useState(false);     // Added Gas state

  return (
    <div className={`${outfit.variable} ${inter.variable} min-h-screen bg-[#050B08] text-white font-sans selection:bg-emerald-500/30 relative overflow-x-hidden`}>
      
      {/* 2. BACKGROUND FX */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[100px]" />
        {/* Additional warm glow for Gas */}
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-rose-500/5 rounded-full blur-[120px]" />
        
        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        {/* Noise */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 py-12 md:py-20">
        
        {/* 3. HEADER */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md mb-4">
            <ScanLine className="w-4 h-4 text-emerald-400 mr-2 animate-pulse" />
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest">AI Vision Enabled</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black font-display tracking-tight text-white">
            Sync Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-emerald-400">Utilities</span>
          </h1>
          <p className="text-white/50 text-lg md:text-xl font-light max-w-2xl mx-auto">
            Upload your bills. Our AI extracts usage data, costs, and carbon footprint instantly.
          </p>
        </div>

        {/* 4. MAIN GRID - Updated to support 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 mb-16">
          
          {/* === ELECTRICITY CARD === */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/20 to-transparent rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative h-full bg-[#0A0F0D] border border-white/10 rounded-[2.5rem] p-8 overflow-hidden hover:border-amber-500/30 transition-colors duration-500">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 group-hover:bg-amber-500 group-hover:text-black transition-all duration-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                    <Zap className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold font-display">Electricity</h2>
                    <p className="text-xs text-amber-500/60 font-mono uppercase tracking-wider">MESCOM • KA-52</p>
                  </div>
                </div>
                {elecFile && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
              </div>

              {/* Upload Zone */}
              <div 
                onClick={() => setElecFile(!elecFile)}
                className={`relative h-48 rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center cursor-pointer overflow-hidden group/upload
                ${elecFile 
                  ? 'border-emerald-500/50 bg-emerald-500/5' 
                  : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-amber-500/50'
                }`}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover/upload:opacity-100 group-hover/upload:animate-[scan_2s_ease-in-out_infinite]" />
                
                <div className="z-10 text-center space-y-3">
                  <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center transition-all ${elecFile ? 'bg-emerald-500 text-black' : 'bg-white/5 text-white/40'}`}>
                    {elecFile ? <CheckCircle2 className="w-6 h-6" /> : <UploadCloud className="w-6 h-6" />}
                  </div>
                  <p className="font-medium text-white/80">
                    {elecFile ? 'Bill_Oct_2025.pdf' : 'Drop PDF or Click'}
                  </p>
                  {!elecFile && <span className="text-xs text-white/30">Supports PDF, JPG</span>}
                </div>
              </div>

              {/* Manual Input Fallback */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-wider ml-1">Total (₹)</label>
                  <input type="text" defaultValue="4,500" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white font-mono focus:outline-none focus:border-amber-500/50 focus:bg-amber-500/5 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-wider ml-1">Units (kWh)</label>
                  <input type="text" defaultValue="800" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white font-mono focus:outline-none focus:border-amber-500/50 focus:bg-amber-500/5 transition-all" />
                </div>
              </div>
            </div>
          </div>

          {/* === WATER CARD === */}
          <div className="group relative">
             <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 to-transparent rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative h-full bg-[#0A0F0D] border border-white/10 rounded-[2.5rem] p-8 overflow-hidden hover:border-cyan-500/30 transition-colors duration-500">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-all duration-500 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                    <Droplets className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold font-display">Water</h2>
                    <p className="text-xs text-cyan-500/60 font-mono uppercase tracking-wider">RUWSS • Local</p>
                  </div>
                </div>
                {waterFile && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
              </div>

              {/* Upload Zone */}
              <div 
                onClick={() => setWaterFile(!waterFile)}
                className={`relative h-48 rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center cursor-pointer overflow-hidden group/upload
                ${waterFile 
                  ? 'border-emerald-500/50 bg-emerald-500/5' 
                  : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-cyan-500/50'
                }`}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover/upload:opacity-100 group-hover/upload:animate-[scan_2s_ease-in-out_infinite]" />
                <div className="z-10 text-center space-y-3">
                  <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center transition-all ${waterFile ? 'bg-emerald-500 text-black' : 'bg-white/5 text-white/40'}`}>
                    {waterFile ? <CheckCircle2 className="w-6 h-6" /> : <UploadCloud className="w-6 h-6" />}
                  </div>
                  <p className="font-medium text-white/80">{waterFile ? 'Bill_H2O.pdf' : 'Drop PDF or Click'}</p>
                  {!waterFile && <span className="text-xs text-white/30">Supports PDF, JPG</span>}
                </div>
              </div>

              {/* Manual Input Fallback */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-wider ml-1">Total (₹)</label>
                  <input type="text" defaultValue="1,200" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white font-mono focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-wider ml-1">Volume (L)</label>
                  <input type="text" defaultValue="45k" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white font-mono focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all" />
                </div>
              </div>
            </div>
          </div>

          {/* === GAS & FUEL CARD (NEW) === */}
          <div className="group relative">
             <div className="absolute inset-0 bg-gradient-to-b from-rose-500/20 to-transparent rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative h-full bg-[#0A0F0D] border border-white/10 rounded-[2.5rem] p-8 overflow-hidden hover:border-rose-500/30 transition-colors duration-500">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 group-hover:bg-rose-500 group-hover:text-black transition-all duration-500 shadow-[0_0_20px_rgba(244,63,94,0.2)]">
                    <Flame className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold font-display">Gas & Fuel</h2>
                    <p className="text-xs text-rose-500/60 font-mono uppercase tracking-wider">HP/Indane • Piped</p>
                  </div>
                </div>
                {gasFile && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
              </div>

              {/* Upload Zone */}
              <div 
                onClick={() => setGasFile(!gasFile)}
                className={`relative h-48 rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center cursor-pointer overflow-hidden group/upload
                ${gasFile 
                  ? 'border-emerald-500/50 bg-emerald-500/5' 
                  : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-rose-500/50'
                }`}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent opacity-0 group-hover/upload:opacity-100 group-hover/upload:animate-[scan_2s_ease-in-out_infinite]" />
                <div className="z-10 text-center space-y-3">
                  <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center transition-all ${gasFile ? 'bg-emerald-500 text-black' : 'bg-white/5 text-white/40'}`}>
                    {gasFile ? <CheckCircle2 className="w-6 h-6" /> : <UploadCloud className="w-6 h-6" />}
                  </div>
                  <p className="font-medium text-white/80">{gasFile ? 'Bill_Gas.pdf' : 'Drop PDF or Click'}</p>
                  {!gasFile && <span className="text-xs text-white/30">Supports PDF, JPG</span>}
                </div>
              </div>

              {/* Manual Input Fallback */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-wider ml-1">Total (₹)</label>
                  <input type="text" defaultValue="980" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white font-mono focus:outline-none focus:border-rose-500/50 focus:bg-rose-500/5 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-wider ml-1">Cylinders</label>
                  <input type="text" defaultValue="1.5" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white font-mono focus:outline-none focus:border-rose-500/50 focus:bg-rose-500/5 transition-all" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 5. FOOTER ACTION */}
        <div className="flex flex-col items-center">
            <Link
            href="/dashboard"
            className="group relative inline-flex items-center justify-center gap-3 bg-white text-[#050B08] px-12 py-5 rounded-full text-xl font-bold tracking-tight shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(16,185,129,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
            <span className="relative z-10">Process & Analyze</span>
            <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
            
            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            
            <div className="mt-6 flex items-center gap-2 text-white/30 text-sm">
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