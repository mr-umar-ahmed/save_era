'use client';

import React, { createContext, useContext } from 'react';

// 1. Create a context that ONLY knows about Dark Mode
const ThemeContext = createContext({
  theme: 'dark',
  colors: {
    bg: 'bg-[#050B08]',
    text: 'text-white',
    textMuted: 'text-white/50',
    cardBg: 'bg-[#0A0F0D] border-white/10',
    sidebarBg: 'bg-[#0A0F0D] border-r border-white/10',
    border: 'border-white/10',
    inputBg: 'bg-black/30'
  },
  toggleTheme: () => {} // Dummy function that does nothing
});

// 2. Export the Provider that forces these values globally
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeContext.Provider value={{
      theme: 'dark',
      colors: {
        bg: 'bg-[#050B08]',
        text: 'text-white',
        textMuted: 'text-white/50',
        cardBg: 'bg-[#0A0F0D] border-white/10',
        sidebarBg: 'bg-[#0A0F0D] border-r border-white/10',
        border: 'border-white/10',
        inputBg: 'bg-black/30'
      },
      toggleTheme: () => console.log("Theme locked to Dark Mode for Demo")
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3. Export the hook for the components to use
export const useTheme = () => useContext(ThemeContext);