'use client';

import Link from "next/link";
import { 
  User, Mail, Phone, Globe, Bell, Shield, Lock, 
  Trash2, LogOut, ChevronRight, Download, FileText,
  AlertTriangle, Smartphone, Key, Check, Server, Fingerprint, Network
} from "lucide-react";
import { Outfit, Inter } from "next/font/google";
import { useState } from "react";
import { useTheme } from "../components/ThemeProvider";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function SettingsPage() {
  const { theme, colors } = useTheme();
  
  const [toggles, setToggles] = useState({
    push: true, email: false, sms: true, offline: true, 
    shareGov: true, zeroKnowledge: true
  });

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const ToggleSwitch = ({ active }: { active: boolean }) => (
    <div className={`w-11 h-6 rounded-full relative transition-colors duration-300 ${active ? 'bg-emerald-500' : (theme === 'dark' ? 'bg-white/20' : 'bg-gray-300')}`}>
       <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${active ? 'left-6' : 'left-1'}`} />
    </div>
  );

  return (
    <div className={`${outfit.variable} ${inter.variable} min-h-screen ${colors.bg} ${colors.text} font-sans transition-colors duration-300 relative overflow-x-hidden`}>
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] transition-colors ${theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-200/40'}`} />
        <div className={`absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] transition-colors ${theme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-200/40'}`} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border backdrop-blur-md mb-4 ${theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-emerald-200 bg-emerald-50'}`}>
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/60' : 'text-emerald-700'}`}>Node Security Active</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black font-display tracking-tight mb-3">
            System <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Command</span>
          </h1>
        </div>

        <div className="space-y-8">
          
          {/* SECTION: DATA VAULT & SECURITY */}
          <section className={`backdrop-blur-xl border rounded-[2rem] p-8 overflow-hidden relative group transition-all duration-300 ${colors.cardBg}`}>
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
               <Shield className="w-32 h-32 text-blue-400 -rotate-12" />
             </div>
             
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 relative z-10 border-b border-white/10 pb-6">
                <div>
                   <h2 className="text-xl font-bold font-display flex items-center gap-3">
                     <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-100 text-blue-600'}`}><Lock className="w-5 h-5" /></div>
                     Cryptographic Vault
                   </h2>
                   <p className={`text-sm mt-2 ${colors.textMuted}`}>Your utility data is anonymized before reaching the regional grid.</p>
                </div>
                <div className="text-right flex items-center gap-3 bg-black/20 p-3 rounded-xl border border-white/5">
                   <Fingerprint className="w-8 h-8 text-emerald-400" />
                   <div>
                      <p className="text-[10px] font-bold uppercase text-white/50 tracking-widest">Encryption</p>
                      <p className="text-sm font-mono font-bold text-emerald-400">AES-256-GCM</p>
                   </div>
                </div>
             </div>

             <div className="grid md:grid-cols-2 gap-8 relative z-10">
                <div className="space-y-4">
                  <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 ${colors.textMuted}`}>Active Sessions</h3>
                  <div className={`p-4 rounded-xl border flex items-start gap-4 ${theme === 'dark' ? 'bg-white/5 border-emerald-500/30' : 'bg-emerald-50 border-emerald-200'}`}>
                     <Server className="w-5 h-5 text-emerald-500 mt-1" />
                     <div>
                        <p className="font-bold text-sm">Raichur Local Node (Current)</p>
                        <p className={`text-xs font-mono mt-1 ${colors.textMuted}`}>IP: 192.168.1.44 • Syncing Grid Data</p>
                     </div>
                  </div>
                  <button className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all text-left group ${theme === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                     <span className="font-bold flex items-center gap-3"><LogOut className={`w-4 h-4 ${colors.textMuted}`} /> Terminate Remote Sessions</span>
                     <ChevronRight className={`w-4 h-4 ${colors.textMuted} group-hover:opacity-100 opacity-60`} />
                  </button>
                </div>

                <div className="space-y-4">
                  <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 ${colors.textMuted}`}>Data Governance</h3>
                  <div className={`flex items-center justify-between p-4 rounded-xl border transition-colors cursor-pointer group ${theme === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-gray-200 hover:bg-gray-50'}`} onClick={() => handleToggle('shareGov')}>
                     <div>
                        <p className={`font-bold transition-colors ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Share Aggregated Data</p>
                        <p className={`text-xs mt-1 ${colors.textMuted}`}>Allow local gov to use anonymous load data.</p>
                     </div>
                     <ToggleSwitch active={toggles.shareGov} />
                  </div>
                  <button className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all text-left group ${theme === 'dark' ? 'bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20' : 'bg-blue-50 border-blue-300 hover:bg-blue-100'}`}>
                     <span className="font-bold text-blue-500 flex items-center gap-3"><Download className="w-4 h-4 opacity-70" /> Download Encrypted Archive</span>
                     <ChevronRight className="w-4 h-4 text-blue-500/50 group-hover:text-blue-500" />
                  </button>
                </div>
             </div>
          </section>

          {/* SECTION: PREFERENCES (Grid Layout) */}
          <div className="grid md:grid-cols-2 gap-8">
            <section className={`backdrop-blur-xl border rounded-[2rem] p-8 ${colors.cardBg}`}>
              <h2 className="text-xl font-bold font-display mb-6 flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-100 text-purple-600'}`}><Globe className="w-5 h-5" /></div>
                  Localization
              </h2>
              <div className="space-y-4">
                  <div className="space-y-2">
                    <label className={`text-xs font-bold uppercase tracking-widest ml-1 ${colors.textMuted}`}>Language Protocol</label>
                    <select className={`w-full rounded-xl py-3 px-4 font-medium border outline-none transition-all appearance-none cursor-pointer focus:ring-2 focus:ring-purple-500/20 ${colors.inputBg} ${colors.border}`}>
                       <option>🇬🇧 English</option>
                       <option>🇮🇳 Kannada</option>
                       <option>🇮🇳 Hindi</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className={`text-xs font-bold uppercase tracking-widest ml-1 ${colors.textMuted}`}>Metrics</label>
                    <select className={`w-full rounded-xl py-3 px-4 font-medium border outline-none transition-all appearance-none cursor-pointer focus:ring-2 focus:ring-purple-500/20 ${colors.inputBg} ${colors.border}`}>
                       <option>📏 Metric (₹, kWh, L)</option>
                    </select>
                  </div>
              </div>
            </section>

            <section className={`backdrop-blur-xl border rounded-[2rem] p-8 ${colors.cardBg}`}>
              <h2 className="text-xl font-bold font-display mb-6 flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-100 text-emerald-600'}`}><Network className="w-5 h-5" /></div>
                  Grid Comms
              </h2>
              <div className="space-y-1">
                  {[
                    { id: 'push', label: 'Smart Grid Alerts', desc: 'Real-time device notifications' },
                    { id: 'sms', label: 'SMS Fallback', desc: 'CBT protocol for low-network areas' },
                    { id: 'offline', label: 'Offline Caching', desc: 'Store data during blackouts' },
                  ].map((item) => (
                    <div key={item.id} className={`flex items-center justify-between p-3 rounded-xl transition-colors cursor-pointer group ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`} onClick={() => handleToggle(item.id as keyof typeof toggles)}>
                      <div>
                        <p className={`font-bold transition-colors ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{item.label}</p>
                        <p className={`text-xs ${colors.textMuted}`}>{item.desc}</p>
                      </div>
                      <ToggleSwitch active={toggles[item.id as keyof typeof toggles]} />
                    </div>
                  ))}
              </div>
            </section>
          </div>

          <section className={`backdrop-blur-xl border rounded-[2rem] p-8 ${theme === 'dark' ? 'bg-red-950/20 border-red-500/30' : 'bg-red-50 border-red-100'}`}>
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                <h2 className="text-xl font-bold font-display text-red-500">Hazard Zone</h2>
              </div>
              <p className={`text-sm mb-6 max-w-xl ${theme === 'dark' ? 'text-white/60' : 'text-red-800/70'}`}>
                Irreversible actions. Deleting your account will scrub all telemetry data, badges, and history from the Savera mainframe.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className={`px-6 py-3 rounded-xl border font-bold transition-all flex items-center justify-center gap-2 ${theme === 'dark' ? 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white' : 'bg-white border-red-200 text-red-600 hover:bg-red-50'}`}>
                  <Trash2 className="w-4 h-4" /> Scrub Identity
                </button>
              </div>
          </section>

          <div className={`text-center pt-8 border-t ${colors.border}`}>
            <Link href="/dashboard" className={`font-bold text-sm transition-colors mb-4 inline-block hover:opacity-100 ${colors.textMuted} opacity-70`}>
                ← Return to Dashboard
            </Link>
            <div className={`flex justify-center gap-6 text-[10px] uppercase tracking-widest font-mono ${colors.textMuted}`}>
              <span>Savera Core V1</span>
              <span>•</span>
              <span>End-to-End Encrypted</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}