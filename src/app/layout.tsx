import type { Metadata, Viewport } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/components/ThemeProvider"; 
import LayoutWrapper from "@/app/components/LayoutWrapper"; 

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const viewport: Viewport = {
  themeColor: "#050B08",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Prevents weird zooming on mobile devices
};

export const metadata: Metadata = {
  title: "Savera | Resource Intelligence",
  description: "AI-powered household resource optimization and grid stability protocol.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} antialiased`} suppressHydrationWarning>
      {/* Added text-white, overflow-x-hidden, and a custom selection color
        to guarantee the dark mode theme is perfectly enforced globally.
      */}
      <body className="bg-[#050B08] text-white min-h-screen overflow-x-hidden selection:bg-emerald-500/30">
        <ThemeProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}