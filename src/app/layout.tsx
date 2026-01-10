import type { Metadata, Viewport } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar"; 
import { ThemeProvider } from "@/app/components/ThemeProvider"; // Assuming you have this, or remove if not

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const viewport: Viewport = {
  themeColor: "#050B08",
};

export const metadata: Metadata = {
  title: "Savera - AI Household Energy Intelligence",
  description: "AI-powered household resource intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} antialiased`}>
      <body className="bg-[#050B08] text-white min-h-screen overflow-x-hidden selection:bg-emerald-500/30">
        {/* If you don't have a ThemeProvider context, you can wrap a div or remove it. 
           I've kept the structure clean.
        */}
        
        {/* Navbar sits at the very top, full width */}
        <Navbar />
        
        {/* Main content area with padding-top to account for the fixed Navbar */}
        <main className="pt-20 relative z-0">
          {children}
        </main>
      </body>
    </html>
  );
}