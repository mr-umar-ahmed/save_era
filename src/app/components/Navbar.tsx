'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Moon, Bell, Menu } from 'lucide-react';
import { useTheme } from './ThemeProvider';

// Props to handle mobile menu toggling from Layout
export default function Navbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const { theme, toggleTheme, colors } = useTheme();
  const pathname = usePathname();
  const isPublicPage = ['/', '/auth'].includes(pathname);

  // === 1. PUBLIC LANDING NAVBAR ===
  if (isPublicPage) {
     return (
       <nav className="fixed top-0 left-0 right-0 z-50 h-16 transition-colors duration-300 bg-[#0A0F0D]/80 backdrop-blur-md border-b border-white/10"> <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
              <div className="font-bold text-xl tracking-tight flex items-center gap-2">
                 <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"/> Savera
              </div>
              <div className="flex gap-4 items-center">
                 <button onClick={toggleTheme} className={`p-2 rounded-full border ${colors.border} hover:bg-gray-100/10`}>
                    {theme === 'dark' ? <Sun className="w-4 h-4"/> : <Moon className="w-4 h-4"/>}
                 </button>
                 <Link href="/auth" className="px-5 py-2 bg-white text-black rounded-full text-sm font-bold hover:bg-gray-200 transition-colors">
                    Login
                 </Link>
              </div>
           </div>
        </nav>
     );
  }

  // === 2. APP DASHBOARD HEADER ===
  return (
   <header className="fixed top-0 right-0 left-0 lg:left-64 z-30 h-16 flex items-center justify-between px-4 lg:px-8 transition-all duration-300 bg-[#0A0F0D]/80 backdrop-blur-md border-b border-white/10">      {/* Left: Mobile Menu & Page Title */}
        <div className="flex items-center gap-4">
           <button onClick={onMenuClick} className="lg:hidden p-2 -ml-2 text-gray-400 hover:text-white">
              <Menu className="w-6 h-6" />
           </button>
           {/* Breadcrumb / Title */}
           <div className="hidden md:block">
              <span className={`text-xs font-bold uppercase tracking-wider ${colors.textMuted}`}>Dashboard</span>
              <span className="mx-2 text-gray-600">/</span>
              <span className={`text-sm font-bold ${colors.text}`}>Overview</span>
           </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button 
                onClick={toggleTheme}
                className={`p-2 rounded-full border transition-all ${colors.border} ${theme === 'dark' ? 'hover:bg-white/10 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
            >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Notifications */}
            <button className={`p-2 rounded-full border transition-all ${colors.border} ${theme === 'dark' ? 'hover:bg-white/10 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}>
                <Bell className="w-4 h-4" />
            </button>

            {/* Profile Avatar */}
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-emerald-500/20 cursor-pointer">
                RS
            </div>
        </div>
    </header>
  );
}