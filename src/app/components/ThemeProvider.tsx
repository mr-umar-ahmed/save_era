'use client';

import React, { createContext, useContext, useEffect } from 'react';

// Dark-only color palette
const COLORS = {
  bg: "bg-[#050B08]",
  cardBg: "bg-[#0A0F0D]",
  text: "text-white",
  textMuted: "text-white/60",
  border: "border-white/10",
  primary: "text-emerald-400",
  secondary: "text-purple-400",
  accent: "text-amber-400",
  hover: "hover:bg-white/5",
  blob1: "bg-emerald-500/10",
  blob2: "bg-blue-500/10",
  cardHover: "hover:border-white/20",
};

type ThemeContextType = {
  theme: 'dark';
  toggleTheme: () => void;
  colors: typeof COLORS;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Only external side effects belong here
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme: 'dark',
        toggleTheme: () => {}, // intentionally no-op
        colors: COLORS,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
