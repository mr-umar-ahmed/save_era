'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Leaf,
  Trophy,
  Bell,
  Home,
  Settings,
  LogOut,
  X,
  Lightbulb,
  TreePine,
  Landmark
} from 'lucide-react';
import { useTheme } from './ThemeProvider';

// Sidebar Items Config
const SIDEBAR_ITEMS = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Carbon Tracker', href: '/carbon-footprint', icon: TreePine },
  { name: 'City Hub', href: '/city-hub', icon: Landmark },
  { name: 'Fixes', href: '/fixes', icon: Lightbulb },
  { name: 'Challenges', href: '/challenges', icon: Trophy },
  { name: 'Impact', href: '/impact', icon: Leaf },
  { name: 'Household Setup', href: '/household-setup', icon: Home },
  { name: 'Alerts', href: '/alerts', icon: Bell },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar({ mobileOpen, setMobileOpen }: { mobileOpen?: boolean, setMobileOpen?: (v: boolean) => void }) {
  const { theme, colors } = useTheme();
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen && setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 transition-transform duration-300 lg:translate-x-0 flex flex-col
        ${colors.sidebarBg}
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${theme === 'dark' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'}`}>
              <Leaf className="w-5 h-5 fill-current" />
            </div>
            <span className={`font-bold text-xl tracking-tight ${colors.text}`}>Savera</span>
          </div>
          {/* Close Button (Mobile Only) */}
          <button onClick={() => setMobileOpen && setMobileOpen(false)} className="lg:hidden text-white/50 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar">
          <p className="px-3 text-xs font-bold text-white/30 uppercase tracking-wider mb-3">Menu</p>
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen && setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
                ${isActive 
                  ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' 
                  : `${colors.textMuted} hover:bg-white/5 hover:text-white`
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-black' : 'group-hover:text-emerald-400 text-white/40'} transition-colors`} />
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Footer / User Profile */}
        <div className={`p-4 border-t shrink-0 ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}>
          <Link
            href="/auth"
            className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold transition-all ${colors.textMuted} hover:bg-red-500/10 hover:text-red-400`}
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </Link>
        </div>
      </aside>
    </>
  );
}