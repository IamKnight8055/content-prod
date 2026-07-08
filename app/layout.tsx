import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/effects/CustomCursor";
import Navigation from "@/components/layout/Navigation";
import StickyNavBar from "@/components/layout/StickyNavBar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Pranjal Krishnanand — ECE Student & Embedded Systems Engineer",
  description:
    "Personal portfolio of Pranjal Krishnanand — a 19-year-old Electronics and Communication Engineering student specialising in embedded AI, IoT, FPGA design, and autonomous robotics.",
  keywords: [
    "Pranjal Krishnanand",
    "ECE",
    "Electronics Engineering",
    "Embedded Systems",
    "IoT",
    "FPGA",
    "Robotics",
    "Portfolio",
    "India",
  ],
  authors: [{ name: "Pranjal Krishnanand", url: "https://pranjalkrishnanand.xyz" }],
  creator: "Pranjal Krishnanand",
  openGraph: {
    type: "website",
    url: "https://pranjalkrishnanand.xyz",
    title: "Pranjal Krishnanand — ECE Student & Embedded Systems Engineer",
    description:
      "Portfolio of a 19-year-old ECE student who builds smart hardware, FPGAs, and autonomous robots.",
    siteName: "Pranjal Krishnanand",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pranjal Krishnanand — Portfolio",
    description: "ECE student building embedded AI, IoT & robotics systems.",
    creator: "@iamknight8055",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#09090b] text-white antialiased overflow-x-hidden">
        {/* Film grain noise overlay */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Custom cursor — client only */}
        <CustomCursor />

        {/* Navigation */}
        <Navigation />

        {/* Sticky vertical section nav (desktop only) */}
        <StickyNavBar />

        {/* Main content */}
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
