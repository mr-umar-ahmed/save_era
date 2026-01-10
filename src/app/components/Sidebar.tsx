'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, PieChart, Leaf, Trophy, Lightbulb, 
  Bell, Zap, Home, Settings 
} from 'lucide-react';

const SIDEBAR_ITEMS = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Analysis', href: '/breakdown', icon: PieChart },
  { name: 'My Impact', href: '/impact', icon: Leaf },
  { name: 'Missions', href: '/challenges', icon: Trophy },
  { name: 'Fixes', href: '/recommendations', icon: Lightbulb },
  { name: 'Alerts', href: '/alerts', icon: Bell },
  { name: 'Add Bill', href: '/utility-input', icon: Zap },
  { name: 'Setup', href: '/household-setup', icon: Home },
  { name: 'Config', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    // HIDDEN on Mobile (lg:block), Sticky position for scrolling
    <aside className="hidden lg:block w-[260px] shrink-0">
      <div className="sticky top-24 h-[calc(100vh-120px)] bg-[#0A0F0D]/60 backdrop-blur-md rounded-[2rem] border border-white/10 p-4 flex flex-col gap-2">
        
        {/* Header Label */}
        <div className="px-4 py-2 mb-2">
           <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest">Quick Nav</h3>
        </div>
        
        {/* Navigation Links */}
        <div className="flex-1 space-y-1 overflow-y-auto custom-scrollbar">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
                  ${isActive 
                    ? 'bg-emerald-500 text-[#050B08] shadow-[0_0_20px_rgba(16,185,129,0.4)] font-bold' 
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                  }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-[#050B08]' : 'text-white/40 group-hover:text-white'}`} />
                {item.name}
              </Link>
            )
          })}
        </div>

        {/* User Profile Mini-Card */}
        <div className="mt-auto p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3 hover:bg-white/10 transition-colors cursor-pointer">
           <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center text-[#050B08] text-xs font-bold">
             RS
           </div>
           <div>
             <p className="text-xs font-bold text-white">Rahul Sharma</p>
             <p className="text-[10px] text-white/40">Pro Plan • Raichur</p>
           </div>
        </div>

      </div>
    </aside>
  );
}