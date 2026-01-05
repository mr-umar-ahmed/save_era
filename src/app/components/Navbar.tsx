'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Leaf, LayoutDashboard, Zap, Trophy, Bell, Settings, Lightbulb, PieChart, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Defined routes based on your folder structure (excluding gov-admin and demo)
const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Usage Breakdown', href: '/breakdown', icon: PieChart },
  { name: 'Impact & Legacy', href: '/impact', icon: Leaf },
  { name: 'Weekly Challenges', href: '/challenges', icon: Trophy },
  { name: 'Smart Recommendations', href: '/recommendations', icon: Lightbulb },
  { name: 'Alerts', href: '/alerts', icon: Bell },
  { name: 'Utility Input', href: '/utility-input', icon: Zap },
  { name: 'Household Setup', href: '/household-setup', icon: Home },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050B08]/80 backdrop-blur-md border-b border-white/10 h-16">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        
        {/* Logo Area */}
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
            <Leaf className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="font-bold text-lg tracking-wide text-white">SAVERA</span>
        </Link>

        {/* Dropdown Menu Container */}
        <div className="relative" ref={menuRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isOpen 
                    ? 'bg-emerald-500 text-[#050B08] shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                }`}
            >
                <span>Navigate</span>
                {isOpen ? <X className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {/* Animated Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute right-0 top-full mt-3 w-64 bg-[#0A0F0D] border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-2"
                    >
                        <div className="max-h-[80vh] overflow-y-auto custom-scrollbar">
                            <div className="px-4 py-2 text-xs font-bold text-white/40 uppercase tracking-widest">
                                Menu
                            </div>
                            
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-3 text-sm transition-all border-l-2 ${
                                            isActive 
                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500 font-medium' 
                                            : 'text-white/70 hover:bg-white/5 hover:text-white border-transparent'
                                        }`}
                                    >
                                        <item.icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-white/40'}`} />
                                        {item.name}
                                    </Link>
                                );
                            })}

                            <div className="h-px bg-white/10 my-2 mx-4" />
                            
                            <Link 
                                href="/auth"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors border-l-2 border-transparent"
                            >
                                Logout
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}