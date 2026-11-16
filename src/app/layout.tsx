import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MagicDeck AI - 아이디어 한 줄로 완성하는 비즈니스 슬라이드 덱 생성기",
  description: "야근 없는 10배 생산성! Gemini 엔진 기반 고품질 비즈니스 슬라이드 자동 기획 및 순정 .pptx 파일 다운로드 서비스",
  keywords: ["AI PPT", "AI 슬라이드 생성", "프레젠테이션 자동화", "MagicSlides 대안", "피치덱 생성기"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
