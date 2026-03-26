'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Mail, 
  Smartphone, 
  ArrowRight, 
  Leaf, 
  MapPin, 
  Map,
  Building2, 
  User, 
  ShieldCheck, 
  KeyRound, 
  Lock, 
  Loader2,
  Eye,
  EyeOff
} from "lucide-react";
import { Outfit, Inter } from "next/font/google";
import { useTheme } from "../components/ThemeProvider";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function AuthPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<'resident' | 'official'>('resident');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Official State
  const [department, setDepartment] = useState('gescom');

  // Resident State
  const [residentName, setResidentName] = useState("");
  const [residentEmail, setResidentEmail] = useState("");
  const [residentCity, setResidentCity] = useState("Raichur, KA");
  const [residentZone, setResidentZone] = useState("");
  
  const { theme, colors } = useTheme(); 

  const handleLogin = async (baseDestination: string) => {
    setIsLoading(true);
    document.cookie = "savera-auth=true; path=/; max-age=86400; SameSite=Lax";
    
    // If official, append the department query parameter so the dashboard can adapt
    const finalDestination = userType === 'official' 
      ? `${baseDestination}?dept=${department}` 
      : baseDestination;

    setTimeout(() => {
      router.push(finalDestination);
      router.refresh(); 
    }, 1500); 
  };

  // Basic validation to enable the resident button
  const isResidentValid = residentName.trim() !== "" && residentEmail.trim() !== "" && residentZone.trim() !== "";

  return (
    <div className={`${outfit.variable} ${inter.variable} min-h-[calc(100vh-64px)] ${colors.bg} ${colors.text} flex items-center justify-center p-4 relative overflow-hidden font-sans transition-colors duration-300`}>
      
      {/* DYNAMIC BACKGROUND FX */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] transition-colors duration-1000 ease-in-out 
          ${userType === 'resident' 
            ? (theme === 'dark' ? 'bg-emerald-500/20' : 'bg-emerald-200/60') 
            : (theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-200/60')}`} 
        />
        <div className={`absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[100px] transition-colors duration-1000 ease-in-out 
          ${userType === 'resident' 
            ? (theme === 'dark' ? 'bg-teal-500/10' : 'bg-teal-200/60') 
            : (theme === 'dark' ? 'bg-indigo-500/10' : 'bg-indigo-200/60')}`} 
        />
      </div>

      <div className="relative z-10 w-full max-w-[440px] py-12">
        
        {/* ROLE SWITCHER */}
        <div className={`relative z-20 mb-6 backdrop-blur-md border p-1 rounded-2xl flex transition-colors duration-300
          ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
           
           <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-xl shadow-sm transition-all duration-300 ease-out 
             ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-100'}
             ${userType === 'resident' ? 'left-1' : 'left-[calc(50%+4px)]'}`} 
           />
           
           <button 
             onClick={() => setUserType('resident')} 
             className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all relative z-10 
             ${userType === 'resident' 
                ? (theme === 'dark' ? 'text-white' : 'text-gray-900') 
                : colors.textMuted}`}
           >
             <User className="w-4 h-4" /> Resident
           </button>
           
           <button 
             onClick={() => setUserType('official')} 
             className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all relative z-10 
             ${userType === 'official' 
                ? (theme === 'dark' ? 'text-blue-200' : 'text-blue-600') 
                : colors.textMuted}`}
           >
             <Building2 className="w-4 h-4" /> Official
           </button>
        </div>

        {/* MAIN CARD */}
        <div className={`backdrop-blur-2xl border rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden transition-all duration-500 shadow-2xl ${colors.cardBg}`}>
          
          <div className="relative z-10 text-center mb-10">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br shadow-[0_0_40px_-10px_rgba(0,0,0,0.3)] mb-6 transition-all duration-500
              ${userType === 'resident' 
                ? 'from-emerald-500 to-teal-600 shadow-emerald-500/20' 
                : 'from-blue-600 to-indigo-600 shadow-blue-500/20'}
            `}>
              {userType === 'resident' ? (
                <Leaf className="w-10 h-10 text-white fill-white/20" />
              ) : (
                <ShieldCheck className="w-10 h-10 text-white fill-white/20" />
              )}
            </div>
            
            <h1 className="text-3xl font-black font-display tracking-tight mb-2">
              {userType === 'resident' ? 'Create Profile' : 'Gov Portal'}
            </h1>
            <p className={`text-sm font-medium ${colors.textMuted}`}>
              {userType === 'resident' ? 'Map your location to your local utility grid.' : 'Restricted access for Nodal Officers.'}
            </p>
          </div>

          {/* === RESIDENT LOGIN === */}
          {userType === 'resident' && (
            <div className="space-y-4 relative z-10 animate-in fade-in slide-in-from-left-4 duration-500">
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button className={`py-3 px-4 rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group border
                  ${theme === 'dark' ? 'bg-white text-[#050B08] border-white hover:bg-emerald-50' : 'bg-white text-gray-800 border-gray-200 hover:border-emerald-200 shadow-sm'}`}>
                  <div className="w-4 h-4 relative flex items-center justify-center font-black">G</div>
                  <span className="text-xs">Google</span>
                </button>

                <button className={`border py-3 px-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2
                  ${theme === 'dark' 
                    ? 'bg-white/5 hover:bg-white/10 border-white/10 text-white' 
                    : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700'}`}>
                  <Smartphone className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs">Phone</span>
                </button>
              </div>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                    <div className={`w-full border-t ${colors.border}`}></div>
                </div>
                <div className="relative flex justify-center">
                    <span className={`px-4 text-xs uppercase tracking-widest font-bold ${theme === 'dark' ? 'bg-[#0b1210] text-white/30' : 'bg-white text-gray-400'}`}>Or Register Manually</span>
                </div>
              </div>

              <div className="space-y-4">
                {/* Name */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className={`h-5 w-5 group-focus-within:text-emerald-500 transition-colors ${colors.textMuted}`} />
                  </div>
                  <input 
                    type="text" 
                    value={residentName}
                    onChange={(e) => setResidentName(e.target.value)}
                    placeholder="Full Name" 
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border focus:ring-4 transition-all outline-none 
                      ${theme === 'dark' ? 'bg-black/30 border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/10 placeholder-white/20 text-white' : 'bg-gray-50 border-gray-200 focus:border-emerald-500 focus:ring-emerald-100 placeholder-gray-400 text-gray-900'}
                    `} 
                  />
                </div>

                {/* Email */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className={`h-5 w-5 group-focus-within:text-emerald-500 transition-colors ${colors.textMuted}`} />
                  </div>
                  <input 
                    type="email" 
                    value={residentEmail}
                    onChange={(e) => setResidentEmail(e.target.value)}
                    placeholder="Email Address" 
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border focus:ring-4 transition-all outline-none 
                      ${theme === 'dark' ? 'bg-black/30 border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/10 placeholder-white/20 text-white' : 'bg-gray-50 border-gray-200 focus:border-emerald-500 focus:ring-emerald-100 placeholder-gray-400 text-gray-900'}
                    `} 
                  />
                </div>

                {/* Grid Location Info */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <MapPin className={`h-4 w-4 group-focus-within:text-emerald-500 transition-colors ${colors.textMuted}`} />
                    </div>
                    <select 
                      value={residentCity}
                      onChange={(e) => setResidentCity(e.target.value)}
                      className={`w-full pl-10 pr-4 py-4 rounded-2xl border focus:ring-4 transition-all outline-none appearance-none text-sm cursor-pointer
                        ${theme === 'dark' ? 'bg-black/30 border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/10 text-white' : 'bg-gray-50 border-gray-200 focus:border-emerald-500 focus:ring-emerald-100 text-gray-900'}
                      `}
                    >
                      <option value="Raichur, KA">Raichur, KA</option>
                      <option value="Bangalore, KA">Bangalore, KA</option>
                      <option value="Mysuru, KA">Mysuru, KA</option>
                      <option value="Hubli, KA">Hubli, KA</option>
                    </select>
                  </div>

                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Map className={`h-4 w-4 group-focus-within:text-emerald-500 transition-colors ${colors.textMuted}`} />
                    </div>
                    <input 
                      type="text" 
                      value={residentZone}
                      onChange={(e) => setResidentZone(e.target.value)}
                      placeholder="Sector / Ward" 
                      className={`w-full pl-10 pr-4 py-4 rounded-2xl border focus:ring-4 transition-all outline-none text-sm
                        ${theme === 'dark' ? 'bg-black/30 border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/10 placeholder-white/20 text-white' : 'bg-gray-50 border-gray-200 focus:border-emerald-500 focus:ring-emerald-100 placeholder-gray-400 text-gray-900'}
                      `} 
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button 
                  onClick={() => handleLogin('/household-setup')}
                  disabled={isLoading || !isResidentValid}
                  className={`group w-full flex items-center justify-center gap-3 py-4 px-8 rounded-2xl text-lg font-bold transition-all 
                    ${isResidentValid 
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:scale-[1.02] active:scale-[0.98]' 
                      : (theme === 'dark' ? 'bg-white/5 border border-white/10 text-white/30 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed')
                    }`}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span>Initialize Grid Node</span>
                      <ArrowRight className={`w-5 h-5 ${isResidentValid ? 'group-hover:translate-x-1 transition-transform' : ''}`} />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* === OFFICIAL LOGIN === */}
          {userType === 'official' && (
            <div className="space-y-4 relative z-10 animate-in fade-in slide-in-from-right-4 duration-500">
              
              <div className={`p-4 rounded-2xl flex gap-3 items-start mb-2 border
                ${theme === 'dark' ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-100'}`}>
                <Lock className={`w-5 h-5 mt-0.5 shrink-0 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                <div>
                    <h4 className={`text-xs font-bold uppercase tracking-wider mb-1 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>Secure Environment</h4>
                    <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-blue-200/70' : 'text-blue-600/80'}`}>
                        Access requires Level 4 security clearance. Select your jurisdiction.
                    </p>
                </div>
              </div>

              {/* Department Selector */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Building2 className={`h-5 w-5 group-focus-within:text-blue-500 transition-colors ${colors.textMuted}`} />
                </div>
                <select 
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className={`w-full pl-12 pr-10 py-4 rounded-2xl border focus:ring-4 appearance-none outline-none cursor-pointer transition-all font-bold
                  ${theme === 'dark' ? 'bg-black/30 border-white/10 focus:border-blue-500/50 focus:ring-blue-500/10 text-white' : 'bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-100 text-gray-900'}`}
                >
                  <option value="gescom">⚡ GESCOM (Energy & Power)</option>
                  <option value="kuwsdb">💧 KUWSDB (Water Supply)</option>
                  <option value="ddma">🛡️ DDMA (Disaster Mgmt)</option>
                </select>
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className={`h-5 w-5 group-focus-within:text-blue-500 transition-colors ${colors.textMuted}`} />
                </div>
                <input 
                  type="text" 
                  placeholder="Officer ID (e.g. KA-8821)" 
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl border focus:ring-4 transition-all outline-none font-mono
                  ${theme === 'dark' ? 'bg-black/30 border-white/10 focus:border-blue-500/50 focus:ring-blue-500/10 placeholder-white/20 text-white' : 'bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-100 placeholder-gray-400 text-gray-900'}`} 
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <KeyRound className={`h-5 w-5 group-focus-within:text-blue-500 transition-colors ${colors.textMuted}`} />
                </div>
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="Secure Password" 
                  className={`w-full pl-12 pr-12 py-4 rounded-2xl border focus:ring-4 transition-all outline-none
                  ${theme === 'dark' ? 'bg-black/30 border-white/10 focus:border-blue-500/50 focus:ring-blue-500/10 placeholder-white/20 text-white' : 'bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-100 placeholder-gray-400 text-gray-900'}`} 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute inset-y-0 right-0 pr-4 flex items-center hover:opacity-100 transition-opacity cursor-pointer ${colors.textMuted} opacity-60`}
                >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <div className="mt-8">
                <button 
                  onClick={() => handleLogin('/gov-admin')}
                  disabled={isLoading}
                  className="group w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-2xl text-lg font-bold shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><span>Authenticate Node</span><ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}