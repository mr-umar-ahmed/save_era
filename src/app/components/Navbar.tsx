'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  Leaf,
  Bell,
  ChevronDown,
  LogOut,
  User,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16
                    bg-[#050B08]/90 backdrop-blur-xl
                    border-b border-white/10">
      <div className="max-w-[1600px] mx-auto px-4 h-full flex items-center justify-between">

        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10
                          border border-emerald-500/20
                          flex items-center justify-center
                          shadow-[0_0_15px_-3px_rgba(16,185,129,0.2)]">
            <Leaf className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="font-black text-xl tracking-wide text-white">
            SAVERA
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-4">

          {/* Notifications */}
          <button className="relative p-2 rounded-full
                             text-white/60 hover:text-white
                             hover:bg-white/5">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2
                             bg-red-500 rounded-full
                             border border-[#050B08]" />
          </button>

          <div className="h-6 w-px bg-white/10 hidden md:block" />

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(v => !v)}
              className="flex items-center gap-3 p-1 pr-3
                         rounded-full border border-white/5
                         hover:bg-white/5"
            >
              <div className="w-8 h-8 rounded-full
                              bg-emerald-500/20 border border-emerald-500/30
                              flex items-center justify-center
                              text-emerald-400 text-xs font-bold">
                RS
              </div>

              <div className="hidden md:flex flex-col text-xs">
                <span className="font-bold text-white">
                  Rahul Sharma
                </span>
                <span className="text-white/40">
                  Pro Account
                </span>
              </div>

              <ChevronDown
                className={`w-3 h-3 text-white/40 transition-transform
                  ${isProfileOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-12 w-56
                             rounded-2xl bg-[#0A0F0D]
                             border border-white/10
                             shadow-2xl overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-white/5">
                    <p className="text-sm font-bold text-white">
                      Rahul Sharma
                    </p>
                    <p className="text-xs text-white/50 truncate">
                      rahul@navodaya.edu.in
                    </p>
                  </div>

                  <div className="p-1">
                    <Link href="/settings" className="menu-item">
                      <User className="w-4 h-4" /> Profile
                    </Link>
                    <Link href="/settings" className="menu-item">
                      <Settings className="w-4 h-4" /> Settings
                    </Link>
                  </div>

                  <div className="p-1 border-t border-white/5">
                    <button className="menu-item text-red-400 hover:bg-red-500/10">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(v => !v)}
            className="lg:hidden p-2 rounded-full
                       text-white hover:bg-white/5"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </nav>
  );
}
