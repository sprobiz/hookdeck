import type { Metadata } from "next";
import "./globals.css";
import "../../public/output.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hookdeck.digital"),
  title: "HookDeck PRO - High-Converting AI Presentation Deck Builder with Notes",
  description:
    "Turn any idea into executive pitch decks with 20+ specialized frameworks & embedded speaker notes in 45s. Native .pptx export.",
  keywords: [
    "AI Presentation Deck",
    "Pitch Deck Generator",
    "PPTX AI Builder",
    "Speaker Notes Presentation",
    "Executive Slide Deck",
    "Startup Pitch Deck AI",
    "PowerPoint AI Generator",
    "HookDeck PRO",
  ],
  authors: [{ name: "HookDeck PRO Team", url: "https://www.hookdeck.digital" }],
  creator: "HookDeck PRO",
  publisher: "HookDeck PRO",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.hookdeck.digital",
    languages: {
      "en-US": "https://www.hookdeck.digital",
      "ko-KR": "https://www.hookdeck.digital?lang=ko",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ko_KR"],
    url: "https://www.hookdeck.digital",
    siteName: "HookDeck PRO",
    title: "HookDeck PRO - High-Converting AI Presentation Deck Builder with Notes",
    description:
      "Turn any idea into executive pitch decks with 20+ specialized frameworks & embedded speaker notes in 45s. Native .pptx export.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HookDeck PRO - High-Converting AI Presentation Deck Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HookDeck PRO - High-Converting AI Presentation Deck Builder with Notes",
    description:
      "Turn any idea into executive pitch decks with 20+ specialized frameworks & embedded speaker notes in 45s. Native .pptx export.",
    images: ["/og-image.png"],
    creator: "@hookdeck_pro",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="stylesheet" href="/output.css" />
      </head>
      <body className="antialiased bg-[#070b14] text-slate-100">{children}</body>
    </html>
  );
}
