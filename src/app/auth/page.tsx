'use client';

import Link from "next/link";
import { User, Building2, ArrowRight, ShieldCheck, Home } from "lucide-react";
import { Outfit, Inter } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function AuthPage() {
  return (
    <div className={`${outfit.variable} ${inter.variable} min-h-screen bg-[#050B08] text-white font-sans selection:bg-emerald-500/30 flex items-center justify-center p-4 relative`}>
      
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-900/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-emerald-900/10 to-transparent" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black font-display tracking-tight mb-4">Select User Protocol</h1>
          <p className="text-white/50">Identify your role to access the relevant dashboard.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-12">
          
          {/* OPTION 1: RESIDENT (Flow: Household Setup -> Utility -> Dashboard) */}
          <Link href="/household-setup" className="group relative bg-[#0A0F0D]/80 backdrop-blur-xl border border-white/10 hover:border-emerald-500/50 rounded-[2.5rem] p-8 md:p-12 transition-all duration-300 hover:-translate-y-2">
            <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]" />
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Home className="w-10 h-10 text-emerald-400" />
              </div>
              <h2 className="text-3xl font-bold font-display mb-2">Resident</h2>
              <p className="text-white/50 mb-8 text-sm leading-relaxed">
                Manage household consumption, upload bills, and track your personal sustainability score.
              </p>
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-widest">
                <span>Proceed</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* OPTION 2: GOV (Flow: Gov Admin Dashboard) */}
          <Link href="/gov-admin" className="group relative bg-[#0A0F0D]/80 backdrop-blur-xl border border-white/10 hover:border-blue-500/50 rounded-[2.5rem] p-8 md:p-12 transition-all duration-300 hover:-translate-y-2">
            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]" />
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Building2 className="w-10 h-10 text-blue-400" />
              </div>
              <h2 className="text-3xl font-bold font-display mb-2">Government</h2>
              <p className="text-white/50 mb-8 text-sm leading-relaxed">
                Access district-level load metrics, broadcast alerts, and monitor regional efficiency.
              </p>
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm uppercase tracking-widest">
                <span>Secure Login</span>
                <ShieldCheck className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}