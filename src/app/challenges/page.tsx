'use client';

import Link from "next/link";
import { 
  Trophy, Flame, Zap, Droplets, Lightbulb, 
  ArrowLeft, Users, User, Target, Crown, Medal, 
  Star, ChevronRight, Shield, Activity
} from "lucide-react";
import { Outfit, Inter } from "next/font/google";
import { useTheme } from "../components/ThemeProvider";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const challenges = [
  {
    id: 1, title: "Peak Aversion", description: "Delay heavy appliance use during 6 PM - 9 PM grid stress hours.",
    icon: Activity, xp: 150, badge: "Grid Saver", progress: 4, total: 5, savings: "₹120", color: "red", status: "active"
  },
  {
    id: 2, title: "The 26°C Protocol", description: "Calibrate AC to 26°C+ for 7 consecutive days.",
    icon: Flame, xp: 50, badge: "Cool Master", progress: 5, total: 7, savings: "₹200", color: "amber", status: "active"
  },
  {
    id: 3, title: "Hydro Dash", description: "Optimize pump run-times to reduce water waste.",
    icon: Droplets, xp: 75, badge: "Aqua Guard", progress: 3, total: 7, savings: "₹150", color: "cyan", status: "active"
  },
  {
    id: 4, title: "Zero Standby", description: "Eliminate phantom loads from plugged-in electronics.",
    icon: Shield, xp: 100, badge: "Phantom", progress: 0, total: 7, savings: "₹80", color: "emerald", status: "locked"
  },
];

const leaderboard = [
  { rank: 1, name: "Priya S.", points: 2450, avatar: "bg-purple-500", sector: "North Sector" },
  { rank: 2, name: "Rahul P.", points: 2180, avatar: "bg-blue-500", sector: "East Sector" },
  { rank: 3, name: "You", points: 1895, avatar: "bg-emerald-500", isMe: true, sector: "North Sector" },
  { rank: 4, name: "Anjali K.", points: 1620, avatar: "bg-pink-500", sector: "South Sector" },
];

export default function ChallengesPage() {
  const { theme, colors } = useTheme();

  return (
    <div className={`${outfit.variable} ${inter.variable} min-h-screen ${colors.bg} ${colors.text} font-sans relative overflow-x-hidden`}>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[700px] h-[700px] bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <Link href="/dashboard" className={`inline-flex items-center gap-2 font-bold transition-colors hover:text-purple-400 text-sm ${colors.textMuted}`}>
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>
            <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight text-white mt-4">
              Mission <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Center</span>
            </h1>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative bg-[#0A0F0D] border border-white/10 rounded-2xl p-4 md:p-5 flex items-center gap-4 min-w-[240px]">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                <Star className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Telemetry Sync Rank</p>
                <p className="text-2xl font-black font-mono text-white">1,895 <span className="text-xs text-purple-400">XP</span></p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          <div className="space-y-8">
            
            <section className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl group">
               <div className="absolute inset-0 bg-gradient-to-r from-blue-950/40 to-indigo-950/40 backdrop-blur-xl" />
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-700" />
               
               <div className="relative p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
                 <div className="relative w-32 h-32 shrink-0">
                    <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#3b82f6" strokeWidth="8" strokeDasharray="283" strokeDashoffset="141" strokeLinecap="round" className="drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-black text-white">50%</span>
                    </div>
                 </div>

                 <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                       <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                       <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Co-op Sector Raid</span>
                    </div>
                    <h2 className="text-3xl font-black font-display text-white mb-2">Grid Stabilization</h2>
                    <p className="text-white/60 text-sm font-medium leading-relaxed mb-6 max-w-md">
                      Team up with households in Raichur North Sector to reduce aggregate load by 10MW this week.
                    </p>
                    
                    <div className="flex items-center justify-center md:justify-start -space-x-3">
                       {[1,2,3,4].map((i) => (
                         <div key={i} className={`w-10 h-10 rounded-full border-2 border-[#050B08] flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br from-gray-700 to-gray-800`}>
                           {i === 1 ? 'You' : <User className="w-4 h-4 opacity-50" />}
                         </div>
                       ))}
                       <div className="w-10 h-10 rounded-full border-2 border-[#050B08] bg-[#0A0F0D] flex items-center justify-center text-white/40 text-xs font-bold">
                         +8k
                       </div>
                    </div>
                 </div>
               </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-5 h-5 text-purple-400" />
                <h2 className="text-xl font-bold font-display text-white">Active Grid Protocols</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {challenges.map((challenge) => (
                  <div 
                    key={challenge.id}
                    className={`group relative overflow-hidden rounded-[2rem] border p-6 transition-all duration-300 hover:scale-[1.02]
                      ${challenge.status === 'locked' 
                        ? 'bg-white/5 border-white/5 opacity-60 grayscale' 
                        : 'bg-[#0A0F0D]/60 backdrop-blur-md border-white/10 hover:bg-white/[0.03] hover:border-white/20'
                      }`}
                  >
                    <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity bg-${challenge.color}-500`} />

                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border bg-gradient-to-br
                          ${challenge.color === 'red' ? 'from-red-500/20 to-orange-500/20 border-red-500/30 text-red-400' : ''}
                          ${challenge.color === 'amber' ? 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400' : ''}
                          ${challenge.color === 'cyan' ? 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-400' : ''}
                          ${challenge.color === 'emerald' ? 'from-emerald-500/20 to-green-500/20 border-emerald-500/30 text-emerald-400' : ''}
                        `}>
                          <challenge.icon className="w-6 h-6" />
                        </div>
                        <div className="text-right">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold font-mono border
                             ${challenge.color === 'red' ? 'bg-red-500/10 border-red-500/20 text-red-400' : ''}
                             ${challenge.color === 'amber' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : ''}
                             ${challenge.color === 'cyan' ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' : ''}
                             ${challenge.color === 'emerald' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : ''}
                           `}>
                            +{challenge.xp} XP
                          </span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-1">{challenge.title}</h3>
                      <p className="text-white/50 text-xs font-medium leading-relaxed mb-6 h-8">{challenge.description}</p>

                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                          <span className="text-white/40">Sync Status</span>
                          <span className="text-white">{challenge.progress} / {challenge.total} Cycles</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <div 
                            style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                            className={`h-full rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)] bg-${challenge.color}-500`} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="bg-[#0A0F0D]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 sticky top-8">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                   <Trophy className="w-5 h-5 text-yellow-400" />
                   <h2 className="text-lg font-bold text-white font-display">Regional Ladder</h2>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-1 rounded">Live Sync</span>
              </div>

              <div className="space-y-3">
                {leaderboard.map((user, index) => (
                  <div 
                    key={index} 
                    className={`relative p-4 rounded-2xl flex items-center gap-4 transition-all
                      ${user.isMe 
                        ? 'bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/30 shadow-lg' 
                        : 'hover:bg-white/5 border border-transparent'
                      }`}
                  >
                    <div className="font-black font-display text-white/30 w-4 text-center text-sm">
                      {index + 1}
                    </div>
                    
                    <div className="relative">
                       <div className={`w-10 h-10 rounded-full ${user.avatar} flex items-center justify-center text-white text-xs font-bold shadow-inner`}>
                         {user.name.charAt(0)}
                       </div>
                       {index < 3 && (
                         <div className="absolute -top-2 -right-1">
                           {index === 0 && <Crown className="w-4 h-4 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]" />}
                           {index === 1 && <Medal className="w-4 h-4 text-gray-300 fill-gray-300" />}
                           {index === 2 && <Medal className="w-4 h-4 text-amber-700 fill-amber-700" />}
                         </div>
                       )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-bold truncate ${user.isMe ? 'text-white' : 'text-white/80'}`}>
                        {user.name} {user.isMe && <span className="text-[10px] uppercase text-purple-400 ml-1">(Node ID)</span>}
                      </p>
                      <p className="text-[10px] font-mono text-white/40 truncate">{user.sector}</p>
                    </div>

                    <div className="text-right">
                       <span className="text-sm font-black font-mono text-white">{user.points}</span>
                    </div>

                    {user.isMe && (
                      <div className="absolute -left-px top-1/2 -translate-y-1/2 w-1 h-8 bg-purple-500 rounded-r-full shadow-[0_0_10px_#a855f7]" />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 text-center">
                <button className="w-full py-3.5 rounded-xl border border-white/10 text-white font-bold text-sm hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                   View Global Rankings <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}