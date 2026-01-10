'use client';

import { useState } from "react";
import { useRouter } from "next/navigation"; // Changed from Link to useRouter
import { 
  Mail, 
  Smartphone, 
  ArrowRight, 
  Leaf, 
  MapPin,
  Globe,
  Building2,
  User,
  ShieldCheck,
  KeyRound,
  Fingerprint,
  Lock,
  Loader2 // Added loading icon
} from "lucide-react";
import { Outfit, Inter } from "next/font/google";

// 1. Setup Premium Fonts
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function AuthPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<'resident' | 'official'>('resident');
  const [isLoading, setIsLoading] = useState(false);

  // 👇 THE FIX: A real login function that sets the cookie
  const handleLogin = async (destination: string) => {
    setIsLoading(true);
    
    // 1. Set the cookie so Middleware lets us pass
    // (In a real app, this happens after verifying the password with an API)
    document.cookie = "savera-auth=true; path=/; max-age=86400; SameSite=Lax";

    // 2. Wait a tiny bit to ensure cookie is set, then navigate
    setTimeout(() => {
      router.push(destination);
      router.refresh(); // Force Next.js to re-check cookies
    }, 800);
  };

  return (
    <div className={`${outfit.variable} ${inter.variable} min-h-screen bg-[#050B08] flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-emerald-500/30 text-white`}>
      
      {/* 2. BACKGROUND FX */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className={`absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] transition-colors duration-700 ease-in-out ${userType === 'resident' ? 'bg-emerald-500/10' : 'bg-blue-500/10'}`} />
        <div className={`absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[100px] transition-colors duration-700 ease-in-out ${userType === 'resident' ? 'bg-teal-500/10' : 'bg-indigo-500/10'}`} />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* 3. MAIN AUTH CARD */}
      <div className="relative z-10 w-full max-w-[440px]">
        
        {/* Role Toggle Switch */}
        <div className="relative z-20 mb-6 bg-white/5 backdrop-blur-md border border-white/10 p-1 rounded-2xl flex">
           <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white/10 rounded-xl transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${userType === 'resident' ? 'left-1' : 'left-[calc(50%+4px)]'}`} />
           
           <button onClick={() => setUserType('resident')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all relative z-10 ${userType === 'resident' ? 'text-white' : 'text-white/40 hover:text-white/70'}`}>
             <User className="w-4 h-4" /> Resident
           </button>
           <button onClick={() => setUserType('official')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all relative z-10 ${userType === 'official' ? 'text-blue-200' : 'text-white/40 hover:text-white/70'}`}>
             <Building2 className="w-4 h-4" /> Official
           </button>
        </div>

        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden transition-all duration-500">
          
          {/* Header Section */}
          <div className="relative z-10 text-center mb-10">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br shadow-[0_0_25px_rgba(255,255,255,0.1)] mb-6 transition-all duration-500
              ${userType === 'resident' ? 'from-emerald-500 to-teal-600 shadow-emerald-500/20' : 'from-blue-600 to-indigo-600 shadow-blue-500/20'}
            `}>
              {userType === 'resident' ? (
                <Leaf className="w-8 h-8 text-white fill-white/20" />
              ) : (
                <ShieldCheck className="w-8 h-8 text-white fill-white/20" />
              )}
            </div>
            <h1 className="text-3xl font-black font-display text-white tracking-tight mb-2">
              {userType === 'resident' ? 'Welcome Home' : 'Gov Portal'}
            </h1>
            <p className="text-white/50 text-sm md:text-base font-light">
              {userType === 'resident' ? 'Join 45,000+ households saving energy.' : 'Restricted access for MESCOM & RUWSS.'}
            </p>
          </div>

          {/* === RESIDENT FORM === */}
          {userType === 'resident' && (
            <div className="space-y-4 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <button className="w-full bg-white text-[#050B08] py-4 px-6 rounded-2xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group">
                <img src="https://img.icons8.com/color/48/000000/google-logo.png" className="w-5 h-5" alt="Google" />
                <span>Continue with Google</span>
              </button>

              <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-4 px-6 rounded-2xl font-bold transition-all flex items-center justify-center gap-3">
                <Smartphone className="w-5 h-5 text-emerald-400" />
                <span>Continue with Phone</span>
              </button>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                <div className="relative flex justify-center"><span className="bg-[#0b1210] px-4 text-xs text-white/40 uppercase tracking-widest">Or</span></div>
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-white/40 group-focus-within:text-emerald-400 transition-colors" />
                </div>
                <input type="email" placeholder="Enter email address" className="w-full pl-12 pr-4 py-4 bg-black/30 rounded-2xl border border-white/10 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 text-white transition-all outline-none placeholder:text-white/20" />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Globe className="h-5 w-5 text-white/40 group-focus-within:text-emerald-400 transition-colors" />
                </div>
                <select className="w-full pl-12 pr-10 py-4 bg-black/30 rounded-2xl border border-white/10 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 text-white/90 appearance-none outline-none cursor-pointer">
                  <option className="bg-[#050B08]">🇮🇳 India - Raichur</option>
                  <option className="bg-[#050B08]">🇮🇳 India - Bangalore</option>
                  <option className="bg-[#050B08]">🇺🇸 USA - California</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none"><MapPin className="h-4 w-4 text-white/40" /></div>
              </div>

              {/* 👇 FIXED BUTTON: Uses handleLogin instead of Link */}
              <div className="mt-6">
                <button 
                  onClick={() => handleLogin('/household-setup')}
                  disabled={isLoading}
                  className="group w-full flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-[#050B08] py-4 px-8 rounded-2xl text-lg font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span>Start Saving</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* === OFFICIAL FORM === */}
          {userType === 'official' && (
            <div className="space-y-4 relative z-10 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl flex gap-3 items-start mb-2">
                <Lock className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <p className="text-xs text-blue-200/80 leading-relaxed">Access requires Level 4 security clearance. All actions are logged and audited.</p>
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Building2 className="h-5 w-5 text-white/40 group-focus-within:text-blue-400 transition-colors" />
                </div>
                <input type="text" placeholder="Department ID" className="w-full pl-12 pr-4 py-4 bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 text-white placeholder-white/30 transition-all outline-none font-mono" />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <KeyRound className="h-5 w-5 text-white/40 group-focus-within:text-blue-400 transition-colors" />
                </div>
                <input type="password" placeholder="Secure Password" className="w-full pl-12 pr-4 py-4 bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 text-white placeholder-white/30 transition-all outline-none" />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Fingerprint className="h-5 w-5 text-white/40 group-focus-within:text-blue-400 transition-colors" />
                </div>
                <input type="text" placeholder="2FA Code" className="w-full pl-12 pr-4 py-4 bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 text-white placeholder-white/30 transition-all outline-none font-mono tracking-widest" />
              </div>

              {/* 👇 FIXED BUTTON: Uses handleLogin instead of Link */}
              <div className="mt-6">
                <button 
                  onClick={() => handleLogin('/gov-admin')}
                  disabled={isLoading}
                  className="group w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-2xl text-lg font-bold shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span>Authenticate</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
                <p className="mt-4 text-center text-xs text-white/30 font-mono">Session ID: 8821-XCA</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}