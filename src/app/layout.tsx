import type { Metadata, Viewport } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar"; // Import your persistent Navbar component

// 1. Setup Global Fonts
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

// 2. Separate Viewport (Next.js 14+ Best Practice)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#050B08", // Matches the dark background
};

export const metadata: Metadata = {
  title: {
    default: "Savera - AI Household Energy Intelligence",
    template: "%s | Savera",
  },
  description:
    "AI-powered household resource intelligence for electricity & water. Save money, reduce waste, get real-time government alerts.",
  keywords: [
    "energy", "water", "savings", "AI", "smart", "household", "Raichur", "Karnataka", "GovTech"
  ],
  authors: [{ name: "Savera Team" }],
  creator: "Savera Team",
  publisher: "Savera",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Savera - Smart Energy & Water Management",
    description: "AI-powered app for households to manage electricity & water intelligently.",
    type: "website",
    siteName: "Savera",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Savera UI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Savera App",
    description: "Save money, reduce waste, get government alerts.",
    images: ["/twitter-image.jpg"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Savera",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-[100dvh] bg-[#050B08] text-white overflow-x-hidden selection:bg-emerald-500/30 selection:text-emerald-50"
        style={{
          // Safe area for iPhone X+ notches
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        {/* Global Scrollbar Styling */}
        <style>{`
          ::-webkit-scrollbar { width: 8px; }
          ::-webkit-scrollbar-track { background: #050B08; }
          ::-webkit-scrollbar-thumb { background: #1f2937; border-radius: 4px; }
          ::-webkit-scrollbar-thumb:hover { background: #34d399; }
          html { scroll-behavior: smooth; }
        `}</style>
        
        {/* Persistent Navbar across all pages */}
        <Navbar />
        
        {/* Main content area with padding to prevent being hidden by the fixed Navbar */}
        <main className="pt-16 relative z-0">
          {children}
        </main>
      </body>
    </html>
  );
}