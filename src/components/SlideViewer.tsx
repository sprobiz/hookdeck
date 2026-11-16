"use client";

import { useState } from "react";
import { SlideItem } from "@/types/deck";
import { ChevronLeft, ChevronRight, Download, Sparkles, Copy, Check } from "lucide-react";
import { exportToPPTX } from "@/utils/exportPptx";
import { translations, Language } from "@/utils/translations";

interface SlideViewerProps {
  slides: SlideItem[];
  deckTitle: string;
  style: string;
  lang: Language;
}

export default function SlideViewer({ slides, deckTitle, style, lang }: SlideViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const t = translations[lang].viewer;

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
        return "bg-slate-950 text-white border-slate-800";
      case "corporate":
        return "bg-slate-900 text-slate-100 border-slate-800";
      case "creative":
        return "bg-[#1c1815] text-[#f7eee4] border-[#382f28]";
      default:
        return "bg-white text-slate-900 border-slate-200";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      {/* 툴바 */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 mb-4 bg-slate-900/90 backdrop-blur border border-slate-800 rounded-2xl shadow-xl">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            {t.slide} {currentIndex + 1} / {slides.length}
          </span>
          <span className="text-sm font-medium text-slate-200 truncate max-w-[200px] sm:max-w-xs">
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
            onClick={() => exportToPPTX({ title: deckTitle, description: "", slides }, style)}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-lg shadow-md shadow-blue-500/20 transition"
          >
            <Download className="w-3.5 h-3.5" />
            {t.downloadPptx}
          </button>
        </div>
      </div>

      {/* 16:9 슬라이드 캔버스 프레임 */}
      <div className="relative w-full aspect-[16/9] shadow-2xl rounded-2xl overflow-hidden border border-slate-800 transition-all">
        <div className={`w-full h-full p-8 md:p-14 flex flex-col justify-between ${getStyleClass()}`}>
          {currentSlide.layout === "title" ? (
            <div className="flex flex-col items-center justify-center flex-1 text-center">
              <span className="px-3 py-1 mb-4 text-xs font-bold tracking-widest uppercase rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                Strategic Deck
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 max-w-2xl">
                {currentSlide.title}
              </h1>
              {currentSlide.subtitle && (
                <p className="text-base md:text-xl font-medium text-blue-400 max-w-xl">
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
                  <p className="text-sm md:text-base text-blue-400 font-medium mb-6">
                    {currentSlide.subtitle}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-auto">
                {currentSlide.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center shadow-inner"
                  >
                    <div className="text-3xl md:text-4xl font-black text-blue-400 mb-2">
                      {m.value}
                    </div>
                    <div className="text-xs md:text-sm font-semibold opacity-80">{m.label}</div>
                  </div>
                ))}
              </div>
              <div className="text-right text-xs opacity-50">SlideForge.ai Generated</div>
            </div>
          ) : (
            <div className="flex flex-col h-full justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">{currentSlide.title}</h2>
                {currentSlide.subtitle && (
                  <p className="text-sm md:text-base text-blue-400 font-medium mb-6">
                    {currentSlide.subtitle}
                  </p>
                )}
              </div>
              <ul className="space-y-4 my-auto">
                {currentSlide.content.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-base md:text-lg">
                    <span className="w-2 h-2 mt-2.5 rounded-full bg-blue-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="text-right text-xs opacity-50">SlideForge.ai Generated</div>
            </div>
          )}

          {/* 슬라이드 번호 풋터 */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-700/50 text-xs opacity-60">
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
                ? "border-blue-500 ring-2 ring-blue-500/20 bg-blue-950/40 text-blue-300"
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
