import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SlideForge PRO - High-Converting AI Presentation Deck Builder",
  description: "Turn ideas into executive strategic pitch decks in 45s. Native .pptx export, zero-downtime serverless architecture.",
  keywords: ["AI Slide Deck", "Pitch Deck AI", "Presentation Generator", "PPTX AI", "SlideForge"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#070b14] text-slate-100">{children}</body>
    </html>
  );
}
