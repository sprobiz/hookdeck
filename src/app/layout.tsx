import type { Metadata } from "next";
import "./globals.css";
import "../../public/output.css";

export const metadata: Metadata = {
  title: "HookDeck PRO - High-Converting AI Presentation Deck Builder",
  description: "Turn ideas into executive strategic pitch decks in 45s. Native .pptx export, zero-downtime serverless architecture.",
  keywords: ["AI Slide Deck", "Pitch Deck AI", "Presentation Generator", "PPTX AI", "HookDeck"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="stylesheet" href="/output.css" />
      </head>
      <body className="antialiased bg-[#070b14] text-slate-100">{children}</body>
    </html>
  );
}
