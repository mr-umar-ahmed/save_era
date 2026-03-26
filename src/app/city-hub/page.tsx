'use client';

import { useState } from "react";
import Link from "next/link";
import { 
  Landmark, Bus, HeartPulse, Fuel, Briefcase, 
  FileWarning, Megaphone, ArrowLeft, ArrowRight, 
  CheckCircle2, AlertCircle, Clock, Send, ShieldCheck,
  Building, ChevronRight, Activity, AlertTriangle,
  Droplets, Zap, Stethoscope, Tractor
} from "lucide-react";
import { Outfit, Inter } from "next/font/google";
import { useTheme } from "../components/ThemeProvider";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// --- ENHANCED REALISTIC LOCAL DATA ---
const PUBLIC_SERVICES = [
  { id: 1, name: "Highway Authority (NHAI)", status: "NH7 Closed (Landslide at km 42)", icon: AlertTriangle, color: "red" },
  { id: 2, name: "City Water (RUWSS)", status: "Sector 4 Supply: 4 PM - 6 PM", icon: Droplets, color: "cyan" },
  { id: 3, name: "Power Grid (MESCOM)", status: "Load Shedding: North Raichur", icon: Zap, color: "amber" },
  { id: 4, name: "Public Transit (KSRTC)", status: "Intercity Routes Operating", icon: Bus, color: "emerald" },
  { id: 5, name: "RIMS Hospital Board", status: "ICU Beds Available: 12", icon: Stethoscope, color: "blue" },
];

const WELFARE_PROGRAMS = [
  { 
    id: 1, 
    title: "Gruha Jyothi Scheme", 
    desc: "Up to 200 units of free electricity per month for residential connections.", 
    tag: "ENERGY SUBSIDY", 
    deadline: "Ongoing",
    color: "amber"
  },
  { 
    id: 2, 
    title: "Gruha Lakshmi Yojana", 
    desc: "₹2,000 monthly financial assistance to the women heads of households.", 
    tag: "FINANCIAL", 
    deadline: "Verification Open",
    color: "emerald"
  },
  { 
    id: 3, 
    title: "PM-KISAN / Raitha Vidya Nidhi", 
    desc: "Income support and scholarships for children of farmers in Raichur district.", 
    tag: "AGRICULTURE", 
    deadline: "Register by Nov 30",
    color: "blue"
  },
  { 
    id: 4, 
    title: "Yuva Nidhi Employment Drive", 
    desc: "Unemployment allowance for recent graduates and diploma holders.", 
    tag: "EMPLOYMENT", 
    deadline: "Closes Next Week",
    color: "purple"
  }
];

export default function CityHubPage() {
  const { theme, colors } = useTheme();
  
  const [complaintText, setComplaintText] = useState("");
  const [complaintCategory, setComplaintCategory] = useState("Infrastructure");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintText.trim()) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setComplaintText("");
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className={`${outfit.variable} ${inter.variable} min-h-screen ${colors.bg} ${colors.text} font-sans relative overflow-x-hidden`}>
      
      {/* Background FX */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[10%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:py-12">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <Link href="/dashboard" className={`inline-flex items-center gap-2 font-bold transition-colors hover:text-blue-400 text-sm ${colors.textMuted}`}>
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>
            
            <div className="flex items-center gap-3 mb-2 mt-4">
                <div className={`px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${theme === 'dark' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-700'}`}>
                    <ShieldCheck className="w-3.5 h-3.5" /> Karnataka State Portal API
                </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-black font-display tracking-tight text-white flex items-center gap-3">
              City <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Hub</span>
            </h1>
            <p className={`text-sm max-w-lg mt-2 ${colors.textMuted}`}>
              Live civic telemetry, welfare applications, and direct municipal ticketing.
            </p>
          </div>

          {/* Quick Access to Alerts */}
          <Link href="/alerts" className="group relative shrink-0">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative bg-[#0A0F0D] border border-white/10 rounded-2xl p-5 flex items-center gap-5 hover:bg-white/[0.02] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <Megaphone className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-0.5">Emergency Broadcasts</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">View Active Alerts</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* MAIN LAYOUT GRID */}
        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          
          {/* LEFT COLUMN: SERVICES & WELFARE */}
          <div className="space-y-8">
            
            {/* Live Services Tracker */}
            <section>
              <h2 className="text-xl font-bold font-display mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-400" /> Live Infrastructure Status
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {PUBLIC_SERVICES.map((service) => (
                  <div key={service.id} className="bg-[#0A0F0D] border border-white/10 rounded-[1.5rem] p-5 flex items-start gap-4 hover:border-white/20 transition-colors">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-${service.color}-500/10 text-${service.color}-400`}>
                      <service.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-white mb-1">{service.name}</h3>
                      <p className={`text-xs font-bold uppercase tracking-wider ${
                        service.color === 'amber' ? 'text-amber-400' : 
                        service.color === 'emerald' ? 'text-emerald-400' :
                        service.color === 'red' ? 'text-red-400' :
                        service.color === 'cyan' ? 'text-cyan-400' : 'text-blue-400'
                      }`}>
                        {service.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Welfare & Support Board */}
            <section>
              <h2 className="text-xl font-bold font-display mb-4 flex items-center gap-2 mt-10">
                <Landmark className="w-5 h-5 text-emerald-400" /> State Welfare & Direct Benefit Transfers (DBT)
              </h2>
              <div className="space-y-4">
                {WELFARE_PROGRAMS.map((prog) => (
                  <div key={prog.id} className="group relative overflow-hidden bg-[#0A0F0D] border border-white/10 rounded-[2rem] p-6 hover:border-white/20 transition-all hover:bg-white/[0.02]">
                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                       <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`px-2 py-1 rounded text-[9px] font-black uppercase tracking-wider bg-${prog.color}-500/10 text-${prog.color}-400 border border-${prog.color}-500/20`}>
                              {prog.tag}
                            </span>
                            <span className="text-xs font-mono text-white/40 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {prog.deadline}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-white mb-1">{prog.title}</h3>
                          <p className="text-sm text-white/60">{prog.desc}</p>
                       </div>
                       
                       <div className="shrink-0">
                          <button className="px-6 py-2.5 rounded-xl border border-white/10 text-sm font-bold text-white hover:bg-white/10 transition-colors flex items-center gap-2 w-full justify-center">
                            Apply via Portal <ChevronRight className="w-4 h-4 text-white/50" />
                          </button>
                       </div>
                     </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-3 rounded-xl border border-white/5 border-dashed text-xs font-bold text-white/50 hover:text-white hover:border-white/20 transition-all uppercase tracking-widest">
                Browse Full Scheme Directory
              </button>
            </section>

          </div>

          {/* RIGHT COLUMN: COMPLAINT TICKETING */}
          <aside className="space-y-6">
            <div className="bg-gradient-to-b from-[#0A0F0D] to-[#0A0F0D]/50 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-8 shadow-2xl relative overflow-hidden">
              
              {/* Decorative Header */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />
              
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <FileWarning className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display">Civic Ticketing</h3>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">Direct to Authority</p>
                </div>
              </div>

              <p className="text-sm text-white/60 mb-6 leading-relaxed relative z-10">
                Report infrastructure issues, utility outages, or public safety concerns directly to the respective municipal department.
              </p>

              <form onSubmit={handleSubmitComplaint} className="space-y-4 relative z-10">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-white/50">Issue Category</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <select 
                      value={complaintCategory}
                      onChange={(e) => setComplaintCategory(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:border-blue-500 outline-none appearance-none cursor-pointer"
                    >
                      <option>Infrastructure (Potholes/Roads)</option>
                      <option>Utilities (Water/Power Outage)</option>
                      <option>Sanitation & Waste Collection</option>
                      <option>Public Safety / Transport</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-white/50">Details & Location</label>
                  <textarea 
                    rows={4}
                    value={complaintText}
                    onChange={(e) => setComplaintText(e.target.value)}
                    required
                    placeholder="E.g., Streetlight out on MG Road near Sector 4..."
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-blue-500 outline-none resize-none placeholder:text-white/20"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting || !complaintText.trim() || isSuccess}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg
                    ${isSuccess 
                      ? 'bg-emerald-500 text-black shadow-emerald-500/20' 
                      : isSubmitting
                        ? 'bg-white/10 text-white cursor-wait'
                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/20 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
                    }
                  `}
                >
                  {isSubmitting ? (
                    <span className="animate-pulse uppercase tracking-widest text-[10px]">Encrypting & Routing...</span>
                  ) : isSuccess ? (
                    <><CheckCircle2 className="w-4 h-4" /> Ticket Logged</>
                  ) : (
                    <><Send className="w-4 h-4" /> Route to Department</>
                  )}
                </button>
              </form>

              {isSuccess && (
                 <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center animate-in fade-in zoom-in duration-300">
                   <p className="text-xs font-bold text-emerald-400">Tracking ID: #RCR-{Math.floor(Math.random() * 9000) + 1000}</p>
                   <p className="text-[10px] text-white/50 mt-1">Routed to {complaintCategory} queue.</p>
                 </div>
              )}
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}