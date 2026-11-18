"use client";

import { useState } from "react";
import { SlideItem } from "@/types/deck";
import { ChevronLeft, ChevronRight, Download, Sparkles, Copy, Check, Lock, ArrowDown } from "lucide-react";
import { exportToPPTX } from "@/utils/exportPptx";
import { translations, Language } from "@/utils/translations";
import { getThemeById } from "@/utils/themes";

interface SlideViewerProps {
  slides: SlideItem[];
  deckTitle: string;
  themeId: string;
  lang: Language;
}

export default function SlideViewer({ slides, deckTitle, themeId, lang }: SlideViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const t = translations[lang].viewer;
  const theme = getThemeById(themeId);

  if (!slides || slides.length === 0) return null;

  const currentSlide = slides[currentIndex];

  const handleCopyText = () => {
    const text = `${currentSlide.title}\n\n${currentSlide.content.join("\n")}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadClick = () => {
    // 100% 유료 전환 모달 락 가동
    setShowPaywall(true);
  };

  const scrollToPricing = () => {
    setShowPaywall(false);
    const pricingElem = document.getElementById("pricing");
    if (pricingElem) {
      pricingElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      {/* 100% 유료 전환 페이월 모달 */}
      {showPaywall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg p-8 rounded-3xl bg-slate-900 border-2 border-pink-500/50 shadow-2xl shadow-pink-500/20 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/30">
              <Lock className="w-8 h-8" />
            </div>

            <span className="px-3 py-1 text-xs font-bold uppercase rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/30">
              {lang === "ko" ? "PRO 멤버십 전용 기능" : "PRO MEMBERSHIP EXCLUSIVE"}
            </span>

            <h3 className="mt-4 text-2xl font-black text-white">
              {lang === "ko"
                ? "순정 .pptx 파일 다운로드는 유료 플랜 전용입니다"
                : "Native .pptx Export is a PRO Feature"}
            </h3>

            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              {lang === "ko"
                ? "빈 슬라이드 앞에서 4시간씩 고통받지 마세요. 지금 Pro 플랜을 구독하시면 20+ 프리미엄 테마와 순정 .pptx 원본 다운로드를 즉시 이용하실 수 있습니다."
                : "Stop wasting 4+ hours on blank slides. Upgrade to Pro now to unlock unlimited 20+ Executive Themes and 1-click editable .pptx downloads."}
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <button
                onClick={scrollToPricing}
                className="w-full py-3.5 px-6 rounded-xl font-black text-white bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 hover:opacity-95 shadow-xl shadow-pink-500/30 transition flex items-center justify-center gap-2"
              >
                <span>{lang === "ko" ? "요금제 확인하고 즉시 잠금 해제" : "Unlock Now with PayPal"}</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowPaywall(false)}
                className="text-xs text-slate-400 hover:text-slate-200 transition py-1"
              >
                {lang === "ko" ? "미리보기 계속 확인하기" : "Continue Previewing Deck"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 툴바 */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 mb-4 bg-slate-900/90 backdrop-blur border border-slate-800 rounded-2xl shadow-xl">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/30 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            {t.slide} {currentIndex + 1} / {slides.length}
          </span>
          <span className="text-xs px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
            {lang === "ko" ? theme.nameKo : theme.nameEn}
          </span>
          <span className="text-sm font-medium text-slate-200 truncate max-w-[160px] sm:max-w-xs">
            {deckTitle}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyText}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition border border-slate-700"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? t.copied : t.copyText}
          </button>
          <button
            onClick={handleDownloadClick}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:opacity-95 rounded-lg shadow-md shadow-pink-500/20 transition"
          >
            <Lock className="w-3.5 h-3.5" />
            {t.downloadPptx}
          </button>
        </div>
      </div>

      {/* 16:9 슬라이드 캔버스 프레임 */}
      <div className={`relative w-full aspect-[16/9] shadow-2xl rounded-2xl overflow-hidden border ${theme.cssBorder} transition-all`}>
        <div className={`w-full h-full p-8 md:p-14 flex flex-col justify-between ${theme.cssBg}`}>
          {currentSlide.layout === "title" ? (
            <div className="flex flex-col items-center justify-center flex-1 text-center">
              <span className={`px-3 py-1 mb-4 text-xs font-bold tracking-widest uppercase rounded-full ${theme.cssCard} ${theme.cssAccent}`}>
                HookDeck PRO
              </span>
              <h1 className={`text-3xl md:text-5xl font-extrabold tracking-tight mb-4 max-w-2xl ${theme.cssTitle}`}>
                {currentSlide.title}
              </h1>
              {currentSlide.subtitle && (
                <p className={`text-base md:text-xl font-medium max-w-xl ${theme.cssAccent}`}>
                  {currentSlide.subtitle}
                </p>
              )}
              <div className={`mt-8 flex gap-4 text-xs opacity-60 ${theme.cssText}`}>
                {currentSlide.content.map((item, idx) => (
                  <span key={idx}>{item}</span>
                ))}
              </div>
            </div>
          ) : currentSlide.layout === "metrics" && currentSlide.metrics ? (
            <div className="flex flex-col h-full justify-between">
              <div>
                <h2 className={`text-2xl md:text-4xl font-bold mb-2 ${theme.cssTitle}`}>{currentSlide.title}</h2>
                {currentSlide.subtitle && (
                  <p className={`text-sm md:text-base font-medium mb-6 ${theme.cssAccent}`}>
                    {currentSlide.subtitle}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-auto">
                {currentSlide.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className={`p-6 rounded-2xl ${theme.cssCard} border ${theme.cssBorder} text-center shadow-inner`}
                  >
                    <div className={`text-3xl md:text-4xl font-black mb-2 ${theme.cssAccent}`}>
                      {m.value}
                    </div>
                    <div className={`text-xs md:text-sm font-semibold ${theme.cssText}`}>{m.label}</div>
                  </div>
                ))}
              </div>
              <div className={`text-right text-xs opacity-50 ${theme.cssText}`}>HookDeck PRO Generated</div>
            </div>
          ) : (
            <div className="flex flex-col h-full justify-between">
              <div>
                <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${theme.cssTitle}`}>{currentSlide.title}</h2>
                {currentSlide.subtitle && (
                  <p className={`text-sm md:text-base font-medium mb-6 ${theme.cssAccent}`}>
                    {currentSlide.subtitle}
                  </p>
                )}
              </div>
              <ul className="space-y-4 my-auto">
                {currentSlide.content.map((item, idx) => (
                  <li key={idx} className={`flex items-start gap-3 text-base md:text-lg ${theme.cssText}`}>
                    <span className="w-2 h-2 mt-2.5 rounded-full bg-pink-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className={`text-right text-xs opacity-50 ${theme.cssText}`}>HookDeck PRO Generated</div>
            </div>
          )}

          {/* 슬라이드 번호 풋터 */}
          <div className={`flex justify-between items-center pt-4 border-t border-white/10 text-xs opacity-60 ${theme.cssText}`}>
            <span>{t.confidential}</span>
            <span>{currentIndex + 1} / {slides.length}</span>
          </div>
        </div>

        {/* 이전/다음 버튼 */}
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur disabled:opacity-20 disabled:cursor-not-allowed transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setCurrentIndex((prev) => Math.min(slides.length - 1, prev + 1))}
          disabled={currentIndex === slides.length - 1}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur disabled:opacity-20 disabled:cursor-not-allowed transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* 썸네일 스트립 네비게이션 */}
      <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
        {slides.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`flex-shrink-0 w-24 h-14 rounded-lg border text-left p-1.5 transition text-[10px] truncate ${
              currentIndex === idx
                ? "border-pink-500 ring-2 ring-pink-500/20 bg-pink-950/40 text-pink-300"
                : "border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700"
            }`}
          >
            <div className="font-bold">Slide {idx + 1}</div>
            <div className="opacity-80 truncate">{s.title}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
