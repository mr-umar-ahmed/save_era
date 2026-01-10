'use client';

import Link from "next/link";
import Sidebar from "@/app/components/Sidebar"; // IMPORT SIDEBAR
import { 
  User, 
  Mail, 
  Phone, 
  Globe, 
  Bell, 
  Shield, 
  Lock, 
  Trash2, 
  LogOut, 
  ChevronRight, 
  ToggleLeft, 
  ToggleRight,
  Download,
  FileText,
  AlertTriangle,
  Smartphone,
  Key
} from "lucide-react";
import { Outfit, Inter } from "next/font/google";
import { useState } from "react";

// 1. Font Setup
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function SettingsPage() {
  // Simple state for toggles
  const [toggles, setToggles] = useState({
    push: true,
    email: false,
    sms: true,
    offline: true,
    shareData: false,
    shareGov: true,
    marketing: false
  });

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className={`${outfit.variable} ${inter.variable} min-h-screen bg-[#050B08] text-white font-sans selection:bg-emerald-500/30 relative overflow-x-hidden`}>
      
      {/* 2. BACKGROUND FX */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8">
        
        {/* LAYOUT GRID: SIDEBAR + CONTENT */}
        <div className="flex flex-col lg:flex-row gap-6">

            {/* SIDEBAR */}
            <div className="hidden lg:block w-[260px] shrink-0">
                <Sidebar />
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 min-w-0">
                
                {/* Inner container to keep settings form narrow/centered */}
                <div className="max-w-4xl mx-auto py-4 md:py-12">
                    
                    {/* 3. HEADER */}
                    <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-4">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-bold text-white/60 uppercase tracking-widest">System V1.2.0</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight text-white mb-4">
                        System <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Config</span>
                    </h1>
                    <p className="text-white/50 text-lg">Manage your identity, data protocols, and security layers.</p>
                    </div>

                    <div className="space-y-8">
                    
                    {/* SECTION 1: IDENTITY */}
                    <section className="bg-[#0A0F0D]/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <User className="w-32 h-32 text-blue-400 -rotate-12" />
                        </div>
                        
                        <h2 className="text-xl font-bold font-display text-white mb-6 flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400"><User className="w-5 h-5" /></div>
                            Identity
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                            <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                <input type="text" defaultValue="Rahul Sharma" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-10 pr-4 text-white font-medium focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all" />
                            </div>
                            </div>

                            <div className="space-y-2">
                            <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Email Node</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                <input type="email" defaultValue="rahul@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-10 pr-4 text-white font-medium focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all" />
                            </div>
                            </div>

                            <div className="space-y-2">
                            <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Comms Link</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                <input type="tel" defaultValue="+91 98765 43210" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-10 pr-4 text-white font-medium focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all" />
                            </div>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button className="px-6 py-3 rounded-xl bg-white text-black font-bold hover:bg-blue-400 transition-colors shadow-lg">
                            Save Changes
                            </button>
                        </div>
                    </section>

                    {/* SECTION 2: PREFERENCES & NOTIFICATIONS (Grid Layout) */}
                    <div className="grid md:grid-cols-2 gap-8">
                        
                        {/* Preferences */}
                        <section className="bg-[#0A0F0D]/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8">
                        <h2 className="text-xl font-bold font-display text-white mb-6 flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400"><Globe className="w-5 h-5" /></div>
                            Localization
                        </h2>
                        
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Language Protocol</label>
                                <select className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white font-medium focus:outline-none focus:border-purple-500/50 appearance-none cursor-pointer hover:bg-white/10 transition-all">
                                <option className="bg-[#0A0F0D]">🇬🇧 English</option>
                                <option className="bg-[#0A0F0D]">🇮🇳 Kannada</option>
                                <option className="bg-[#0A0F0D]">🇮🇳 Hindi</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Metrics</label>
                                <select className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white font-medium focus:outline-none focus:border-purple-500/50 appearance-none cursor-pointer hover:bg-white/10 transition-all">
                                <option className="bg-[#0A0F0D]">📏 Metric (₹, kWh, L)</option>
                                <option className="bg-[#0A0F0D]">📏 Imperial</option>
                                </select>
                            </div>
                        </div>
                        </section>

                        {/* Notifications */}
                        <section className="bg-[#0A0F0D]/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8">
                        <h2 className="text-xl font-bold font-display text-white mb-6 flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400"><Bell className="w-5 h-5" /></div>
                            Alerts Matrix
                        </h2>

                        <div className="space-y-2">
                            {[
                                { id: 'push', label: 'Push Notifications', desc: 'Real-time device alerts' },
                                { id: 'email', label: 'Email Reports', desc: 'Weekly summaries' },
                                { id: 'sms', label: 'SMS Fallback', desc: 'Critical alerts only' },
                                { id: 'offline', label: 'Offline Mode', desc: 'Cache alerts locally' },
                            ].map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group" onClick={() => handleToggle(item.id as keyof typeof toggles)}>
                                <div>
                                    <p className="font-bold text-white group-hover:text-emerald-400 transition-colors">{item.label}</p>
                                    <p className="text-xs text-white/40">{item.desc}</p>
                                </div>
                                <div className={`transition-colors duration-300 ${toggles[item.id as keyof typeof toggles] ? 'text-emerald-400' : 'text-white/20'}`}>
                                    {toggles[item.id as keyof typeof toggles] ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                                </div>
                                </div>
                            ))}
                        </div>
                        </section>
                    </div>

                    {/* SECTION 3: SECURITY & DATA */}
                    <section className="bg-[#0A0F0D]/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8">
                        <div className="flex items-center gap-3 mb-8">
                        <Shield className="w-6 h-6 text-white" />
                        <h2 className="text-xl font-bold font-display text-white">Security & Data Protocols</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Access Control</h3>
                            <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-left group">
                                <span className="font-bold text-white flex items-center gap-3"><Smartphone className="w-4 h-4 text-white/50" /> 2FA Status</span>
                                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">Active</span>
                            </button>
                            <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-left group">
                                <span className="font-bold text-white flex items-center gap-3"><Key className="w-4 h-4 text-white/50" /> Change Password</span>
                                <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white" />
                            </button>
                            <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-left group">
                                <span className="font-bold text-white flex items-center gap-3"><LogOut className="w-4 h-4 text-white/50" /> Terminate Sessions</span>
                                <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Data Governance</h3>
                            <button className="w-full flex items-center justify-between p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 hover:border-blue-500/30 transition-all text-left group">
                                <span className="font-bold text-blue-400 flex items-center gap-3"><Download className="w-4 h-4" /> Export Archive</span>
                                <ChevronRight className="w-4 h-4 text-blue-400/50 group-hover:text-blue-400" />
                            </button>
                            <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-left group">
                                <span className="font-bold text-white flex items-center gap-3"><FileText className="w-4 h-4 text-white/50" /> Privacy Manifesto</span>
                                <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white" />
                            </button>
                        </div>
                        </div>
                    </section>

                    {/* DANGER ZONE */}
                    <section className="bg-red-950/20 backdrop-blur-xl border border-red-500/30 rounded-[2rem] p-8">
                        <div className="flex items-center gap-3 mb-4">
                        <AlertTriangle className="w-6 h-6 text-red-500" />
                        <h2 className="text-xl font-bold font-display text-red-500">Hazard Zone</h2>
                        </div>
                        <p className="text-white/50 text-sm mb-6 max-w-xl">
                        Irreversible actions. Deleting your account will scrub all energy data, badges, and history from the Savera mainframe.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                        <button className="px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-bold hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2">
                            <Trash2 className="w-4 h-4" /> Delete Data
                        </button>
                        <button className="px-6 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-500 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                            <Lock className="w-4 h-4" /> Deactivate Account
                        </button>
                        </div>
                    </section>

                    {/* FOOTER */}
                    <div className="text-center pt-8 border-t border-white/10">
                        <Link href="/dashboard" className="text-white/40 hover:text-white font-bold text-sm transition-colors mb-4 inline-block">
                            ← Return to Dashboard
                        </Link>
                        <div className="flex justify-center gap-6 text-[10px] text-white/20 uppercase tracking-widest font-mono">
                        <span>Savera Inc.</span>
                        <span>•</span>
                        <span>Encrypted</span>
                        <span>•</span>
                        <span>BLR-KA</span>
                        </div>
                    </div>

                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}