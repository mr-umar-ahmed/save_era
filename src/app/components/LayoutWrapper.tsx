'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Define Public Pages (No Sidebar)
  const isPublicPage = ['/', '/auth'].includes(pathname);

  // 1. PUBLIC LAYOUT
  if (isPublicPage) {
    return (
      <>
        <Navbar />
        {children}
      </>
    );
  }

  // 2. APP LAYOUT
  return (
    <div className="flex min-h-screen">
      {/* Sidebar (Passes state down for mobile handling) */}
      <Sidebar mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />
      
      {/* Main Content */}
      <div className="flex-1 w-full lg:pl-64 transition-all duration-300 flex flex-col">
        
        {/* Navbar sits on top of content area */}
        <Navbar onMenuClick={() => setMobileMenuOpen(true)} />

        {/* Page Content */}
        <div className="flex-1 pt-20 p-4 md:p-8 max-w-7xl mx-auto w-full">
           {children}
        </div>

      </div>
    </div>
  );
}