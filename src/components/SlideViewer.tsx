"use client";

import { useState } from "react";
import { SlideItem } from "@/types/deck";
import { ChevronLeft, ChevronRight, Download, Sparkles, Copy, Check } from "lucide-react";
import { exportToPPTX } from "@/utils/exportPptx";

interface SlideViewerProps {
  slides: SlideItem[];
  deckTitle: string;
  style: string;
}

export default function SlideViewer({ slides, deckTitle, style }: SlideViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!slides || slides.length === 0) return null;

  const currentSlide = slides[currentIndex];

  const handleCopyText = () => {
    const text = `${currentSlide.title}\n\n${currentSlide.content.join("\n")}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStyleClass = () => {
    switch (style) {
      case "dark":
        return "bg-slate-900 text-white border-slate-700";
      case "corporate":
        return "bg-slate-50 text-slate-800 border-slate-200";
      case "creative":
        return "bg-amber-50 text-amber-950 border-amber-200";
      default:
        return "bg-white text-slate-900 border-slate-200";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      {/* 툴바 */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 mb-4 bg-white/80 backdrop-blur border border-slate-200 rounded-2xl shadow-sm">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Slide {currentIndex + 1} / {slides.length}
          </span>
          <span className="text-sm font-medium text-slate-600 truncate max-w-[200px] sm:max-w-xs">
            {deckTitle}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyText}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "복사됨" : "텍스트 복사"}
          </button>
          <button
            onClick={() => exportToPPTX({ title: deckTitle, description: "", slides }, style)}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition"
          >
            <Download className="w-3.5 h-3.5" />
            PPTX 다운로드
          </button>
        </div>
      </div>

      {/* 16:9 슬라이드 캔버스 프레임 */}
      <div className="relative w-full aspect-[16/9] shadow-2xl rounded-2xl overflow-hidden border border-slate-200/80 transition-all">
        <div className={`w-full h-full p-8 md:p-14 flex flex-col justify-between ${getStyleClass()}`}>
          {currentSlide.layout === "title" ? (
            <div className="flex flex-col items-center justify-center flex-1 text-center">
              <span className="px-3 py-1 mb-4 text-xs font-bold tracking-widest uppercase rounded-full bg-blue-500/10 text-blue-600">
                Strategic Deck
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 max-w-2xl">
                {currentSlide.title}
              </h1>
              {currentSlide.subtitle && (
                <p className="text-base md:text-xl font-medium text-blue-500 max-w-xl">
                  {currentSlide.subtitle}
                </p>
              )}
              <div className="mt-8 flex gap-4 text-xs opacity-60">
                {currentSlide.content.map((item, idx) => (
                  <span key={idx}>{item}</span>
                ))}
              </div>
            </div>
          ) : currentSlide.layout === "metrics" && currentSlide.metrics ? (
            <div className="flex flex-col h-full justify-between">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold mb-2">{currentSlide.title}</h2>
                {currentSlide.subtitle && (
                  <p className="text-sm md:text-base text-blue-500 font-medium mb-6">
                    {currentSlide.subtitle}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-auto">
                {currentSlide.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center shadow-sm"
                  >
                    <div className="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 mb-2">
                      {m.value}
                    </div>
                    <div className="text-xs md:text-sm font-semibold opacity-80">{m.label}</div>
                  </div>
                ))}
              </div>
              <div className="text-right text-xs opacity-50">MagicDeck AI Generated</div>
            </div>
          ) : (
            <div className="flex flex-col h-full justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">{currentSlide.title}</h2>
                {currentSlide.subtitle && (
                  <p className="text-sm md:text-base text-blue-500 font-medium mb-6">
                    {currentSlide.subtitle}
                  </p>
                )}
              </div>
              <ul className="space-y-4 my-auto">
                {currentSlide.content.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-base md:text-lg">
                    <span className="w-2 h-2 mt-2.5 rounded-full bg-blue-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="text-right text-xs opacity-50">MagicDeck AI Generated</div>
            </div>
          )}

          {/* 슬라이드 번호 풋터 */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-200/30 text-xs opacity-60">
            <span>Confidential & Proprietary</span>
            <span>{currentIndex + 1} / {slides.length}</span>
          </div>
        </div>

        {/* 이전/다음 버튼 */}
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur disabled:opacity-20 disabled:cursor-not-allowed transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setCurrentIndex((prev) => Math.min(slides.length - 1, prev + 1))}
          disabled={currentIndex === slides.length - 1}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur disabled:opacity-20 disabled:cursor-not-allowed transition"
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
                ? "border-blue-600 ring-2 ring-blue-500/20 bg-blue-50"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <div className="font-bold text-slate-700">Slide {idx + 1}</div>
            <div className="text-slate-500 truncate">{s.title}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
