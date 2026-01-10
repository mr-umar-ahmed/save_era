'use client';

import Link from "next/link";
import Sidebar from "@/app/components/Sidebar"; // IMPORT SIDEBAR
import { 
  Trophy, 
  Flame, 
  Zap, 
  Droplets, 
  Lightbulb, 
  ArrowLeft, 
  Users, 
  Target,
  Crown,
  Medal,
  Star,
  ChevronRight,
  Shield
} from "lucide-react";
import { Outfit, Inter } from "next/font/google";

// 1. Font Setup
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// 2. Data
const challenges = [
  {
    id: 1,
    title: "The 26°C Protocol",
    description: "Keep AC at 26°C+ for 7 days.",
    icon: Flame,
    xp: 50,
    badge: "Cool Master",
    progress: 5,
    total: 7,
    savings: "₹200",
    color: "amber",
    status: "active"
  },
  {
    id: 2,
    title: "Speed Shower",
    description: "Showers under 5 mins.",
    icon: Droplets,
    xp: 75,
    badge: "Hydro Dash",
    progress: 3,
    total: 7,
    savings: "₹120",
    color: "cyan",
    status: "active"
  },
  {
    id: 3,
    title: "Zero Waste",
    description: "< 30L water/day usage.",
    icon: Shield,
    xp: 100,
    badge: "Guardian",
    progress: 0,
    total: 7,
    savings: "₹150",
    color: "emerald",
    status: "locked"
  },
  {
    id: 4,
    title: "LED Upgrade",
    description: "Install 100% LED bulbs.",
    icon: Lightbulb,
    xp: 200,
    badge: "Lightbringer",
    progress: 3,
    total: 5,
    savings: "₹200",
    color: "purple",
    status: "active"
  },
];

const leaderboard = [
  { rank: 1, name: "Priya Sharma", points: 2450, avatar: "bg-purple-500" },
  { rank: 2, name: "Rahul Patel", points: 2180, avatar: "bg-blue-500" },
  { rank: 3, name: "You", points: 1895, avatar: "bg-emerald-500", isMe: true },
  { rank: 4, name: "Anjali Singh", points: 1620, avatar: "bg-pink-500" },
  { rank: 5, name: "Vikram Kumar", points: 1340, avatar: "bg-orange-500" },
];

export default function ChallengesPage() {
  return (
    <div className={`${outfit.variable} ${inter.variable} min-h-screen bg-[#050B08] text-white font-sans selection:bg-amber-500/30 relative overflow-x-hidden`}>
      
      {/* 3. BACKGROUND FX */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[700px] h-[700px] bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px]" />
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
                
                {/* 4. HEADER & HUD */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                  <div className="space-y-2">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 text-white/40 hover:text-emerald-400 transition-colors text-sm font-medium">
                      <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                    </Link>
                    <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight text-white">
                      Mission <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Center</span>
                    </h1>
                  </div>

                  {/* XP HUD */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                    <div className="relative bg-[#0A0F0D] border border-white/10 rounded-2xl p-4 md:p-6 flex items-center gap-4 min-w-[240px]">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                        <Star className="w-6 h-6 text-white fill-white" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white/50 uppercase tracking-widest">Current Rank</p>
                        <p className="text-2xl font-black font-display text-white">1,895 <span className="text-sm text-purple-400">XP</span></p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-[1fr_380px] gap-8">
                  
                  {/* 5. MAIN CONTENT (Left) */}
                  <div className="space-y-12">
                    
                    {/* Active Quests */}
                    <section>
                      <div className="flex items-center gap-3 mb-6">
                        <Target className="w-5 h-5 text-amber-400" />
                        <h2 className="text-xl font-bold font-display text-white">Active Quests</h2>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        {challenges.map((challenge) => (
                          <div 
                            key={challenge.id}
                            className={`group relative overflow-hidden rounded-[2rem] border p-6 transition-all duration-300 hover:scale-[1.01]
                              ${challenge.status === 'locked' 
                                ? 'bg-white/5 border-white/5 opacity-60 grayscale' 
                                : 'bg-[#0A0F0D]/60 backdrop-blur-md border-white/10 hover:bg-white/[0.03] hover:border-white/20 hover:shadow-2xl'
                              }
                            `}
                          >
                            {/* Glowing Accents based on color */}
                            <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity bg-${challenge.color}-500`} />

                            <div className="relative z-10">
                              <div className="flex justify-between items-start mb-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border bg-gradient-to-br
                                  ${challenge.color === 'amber' ? 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400' : ''}
                                  ${challenge.color === 'cyan' ? 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-400' : ''}
                                  ${challenge.color === 'emerald' ? 'from-emerald-500/20 to-green-500/20 border-emerald-500/30 text-emerald-400' : ''}
                                  ${challenge.color === 'purple' ? 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400' : ''}
                                `}>
                                  <challenge.icon className="w-6 h-6" />
                                </div>
                                <div className="text-right">
                                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border
                                     ${challenge.color === 'amber' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : ''}
                                     ${challenge.color === 'cyan' ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' : ''}
                                     ${challenge.color === 'emerald' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : ''}
                                     ${challenge.color === 'purple' ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' : ''}
                                   `}>
                                    +{challenge.xp} XP
                                  </span>
                                </div>
                              </div>

                              <h3 className="text-xl font-bold text-white mb-1">{challenge.title}</h3>
                              <p className="text-white/50 text-sm mb-6">{challenge.description}</p>

                              {/* Progress Bar */}
                              <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                  <span className="text-white/40">Progress</span>
                                  <span className="text-white">{challenge.progress} / {challenge.total}</span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                  <div 
                                    style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                                    className={`h-full rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)] bg-${challenge.color}-500`} 
                                  />
                                </div>
                              </div>

                              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                                    <Zap className="w-3 h-3" /> Saves {challenge.savings}
                                  </div>
                                  {challenge.status === 'locked' ? (
                                    <span className="text-xs text-white/30 font-bold uppercase">Locked</span>
                                  ) : (
                                    <button className="text-xs font-bold text-white hover:text-amber-400 transition-colors flex items-center gap-1">
                                      View Details <ChevronRight className="w-3 h-3" />
                                    </button>
                                  )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Co-op Mission Card */}
                    <section className="relative rounded-[2.5rem] overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/40 to-teal-900/40 border border-emerald-500/20 backdrop-blur-md" />
                        <div className="relative p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
                          
                          {/* Circular Progress (CSS only) */}
                          <div className="relative w-32 h-32 shrink-0">
                            <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
                              <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                              <circle cx="50" cy="50" r="45" fill="none" stroke="#10b981" strokeWidth="8" strokeDasharray="283" strokeDashoffset="141" strokeLinecap="round" className="drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span className="text-2xl font-black text-white">50%</span>
                            </div>
                          </div>

                          <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                                <Users className="w-5 h-5 text-emerald-400" />
                                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Co-op Raid</span>
                            </div>
                            <h2 className="text-3xl font-black font-display text-white mb-2">Carbon Neutral Home</h2>
                            <p className="text-white/60 text-sm mb-6 max-w-md">
                              Team up to reduce carbon footprint by 50%. Top contributors get exclusive Earth Guardian skins.
                            </p>
                            
                            <div className="flex items-center justify-center md:justify-start -space-x-3">
                                {[1,2,3,4].map((i) => (
                                  <div key={i} className={`w-10 h-10 rounded-full border-2 border-[#050B08] flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br from-gray-700 to-gray-800`}>
                                    {i === 1 ? 'You' : 'Dad'}
                                  </div>
                                ))}
                                <div className="w-10 h-10 rounded-full border-2 border-[#050B08] bg-[#0A0F0D] flex items-center justify-center text-white/40 text-xs font-bold">
                                  +2
                                </div>
                            </div>
                          </div>
                        </div>
                    </section>
                  </div>

                  {/* 6. LEADERBOARD SIDEBAR */}
                  <aside className="space-y-6">
                    <div className="bg-[#0A0F0D] border border-white/10 rounded-[2rem] p-6 sticky top-8">
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                          <Trophy className="w-5 h-5 text-yellow-400" />
                          <h2 className="text-lg font-bold text-white font-display">Top Savers</h2>
                        </div>
                        <span className="text-xs font-bold text-white/30 uppercase tracking-wider">This Week</span>
                      </div>

                      <div className="space-y-4">
                        {leaderboard.map((user, index) => (
                          <div 
                            key={index} 
                            className={`relative p-4 rounded-2xl flex items-center gap-4 transition-all
                              ${user.isMe 
                                ? 'bg-white/10 border border-white/20 shadow-lg' 
                                : 'hover:bg-white/5 border border-transparent'
                              }
                            `}
                          >
                            <div className="font-black font-display text-white/30 w-4 text-center">
                              {index + 1}
                            </div>
                            
                            <div className="relative">
                                <div className={`w-10 h-10 rounded-full ${user.avatar} flex items-center justify-center text-white text-xs font-bold shadow-inner`}>
                                  {user.name.charAt(0)}
                                </div>
                                {index < 3 && (
                                  <div className="absolute -top-2 -right-1">
                                    {index === 0 && <Crown className="w-4 h-4 text-yellow-400 fill-yellow-400 drop-shadow-md" />}
                                    {index === 1 && <Medal className="w-4 h-4 text-gray-300 fill-gray-300" />}
                                    {index === 2 && <Medal className="w-4 h-4 text-amber-700 fill-amber-700" />}
                                  </div>
                                )}
                            </div>

                            <div className="flex-1">
                              <p className={`text-sm font-bold ${user.isMe ? 'text-white' : 'text-white/70'}`}>
                                {user.name} {user.isMe && '(You)'}
                              </p>
                              <p className="text-xs text-white/40">{user.points} XP</p>
                            </div>

                            {user.isMe && (
                              <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-500 rounded-l-full shadow-[0_0_10px_#10b981]" />
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 pt-6 border-t border-white/10 text-center">
                        <p className="text-xs text-emerald-400 font-bold mb-3">You are in the top 5%!</p>
                        <button className="w-full py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-emerald-400 hover:scale-[1.02] transition-all">
                            View Full Rankings
                        </button>
                      </div>
                    </div>
                  </aside>

                </div>
            </div>
        </div>
      </div>
    </div>
  );
}