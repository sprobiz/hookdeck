"use client";

import { useState } from "react";
import { SlideItem } from "@/types/deck";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Copy,
  Check,
  Lock,
  ArrowDown,
  Palette,
  Mic,
  Trash2,
  Plus,
  ArrowLeftRight,
  Edit3,
} from "lucide-react";
import { exportToPPTX } from "@/utils/exportPptx";
import { translations, Language } from "@/utils/translations";
import { THEMES_LIST, getThemeById } from "@/utils/themes";
import { UserPlan } from "@/types/deck";

interface SlideViewerProps {
  slides: SlideItem[];
  deckTitle: string;
  themeId: string;
  lang: Language;
  userPlan?: UserPlan;
  onUpgradeClick?: () => void;
}

export default function SlideViewer({
  slides: initialSlides,
  deckTitle,
  themeId: initialThemeId,
  lang,
  userPlan = "free",
  onUpgradeClick,
}: SlideViewerProps) {
  const [slides, setSlides] = useState<SlideItem[]>(initialSlides);
  const [currentThemeId, setCurrentThemeId] = useState<string>(initialThemeId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [copiedNotes, setCopiedNotes] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showNotes, setShowNotes] = useState(true);

  const isFreePlan = userPlan === "free";
  const t = translations[lang].viewer;
  const theme = getThemeById(currentThemeId);

  if (!slides || slides.length === 0) return null;

  const currentSlide = slides[currentIndex] || slides[0];

  // 인라인 텍스트 업데이트 헬퍼
  const updateCurrentSlide = (fields: Partial<SlideItem>) => {
    setSlides((prev) => {
      const updated = [...prev];
      updated[currentIndex] = { ...updated[currentIndex], ...fields };
      return updated;
    });
  };

  // 불릿 포인트 개별 수정
  const updateBulletContent = (idx: number, newText: string) => {
    const updatedContent = [...currentSlide.content];
    updatedContent[idx] = newText;
    updateCurrentSlide({ content: updatedContent });
  };

  // KPI 지표 수정
  const updateMetric = (idx: number, key: "label" | "value", newVal: string) => {
    if (!currentSlide.metrics) return;
    const updatedMetrics = [...currentSlide.metrics];
    updatedMetrics[idx] = { ...updatedMetrics[idx], [key]: newVal };
    updateCurrentSlide({ metrics: updatedMetrics });
  };

  // 슬라이드 추가
  const handleAddSlide = () => {
    const newSlideNum = slides.length + 1;
    const newSlide: SlideItem = {
      id: Date.now(),
      slideNumber: newSlideNum,
      title: lang === "ko" ? "새로운 슬라이드 제목" : "New Slide Title",
      subtitle: lang === "ko" ? "핵심 전략 및 세부 추진 계획" : "Strategic Execution Detail",
      layout: "bullets",
      content: [
        lang === "ko" ? "핵심 내용 첫 번째 포인트를 입력하세요" : "Enter your primary key point here",
        lang === "ko" ? "구체적인 실행 근거 및 데이터를 입력하세요" : "Provide supporting evidence and data here",
        lang === "ko" ? "목표 달성을 위한 액션 아이템을 입력하세요" : "Define key action item to reach objective",
      ],
      speakerNotes:
        lang === "ko"
          ? "이 슬라이드에서 청중에게 전달할 1분 핵심 발표 멘트를 작성하세요."
          : "Add your 1-minute presenter speech guide for this slide here.",
    };
    setSlides([...slides, newSlide]);
    setCurrentIndex(slides.length);
  };

  // 슬라이드 삭제
  const handleDeleteSlide = () => {
    if (slides.length <= 1) {
      alert(lang === "ko" ? "슬라이드는 최소 1장 이상 있어야 합니다." : "Presentation must have at least one slide.");
      return;
    }
    const filtered = slides.filter((_, idx) => idx !== currentIndex);
    // 번호 재정렬
    const renumbered = filtered.map((s, idx) => ({ ...s, slideNumber: idx + 1 }));
    setSlides(renumbered);
    setCurrentIndex((prev) => Math.min(prev, renumbered.length - 1));
  };

  // 슬라이드 좌측(앞으로) 이동
  const handleMoveLeft = () => {
    if (currentIndex === 0) return;
    const updated = [...slides];
    const temp = updated[currentIndex];
    updated[currentIndex] = updated[currentIndex - 1];
    updated[currentIndex - 1] = temp;
    // 번호 재정렬
    const renumbered = updated.map((s, idx) => ({ ...s, slideNumber: idx + 1 }));
    setSlides(renumbered);
    setCurrentIndex(currentIndex - 1);
  };

  // 슬라이드 우측(뒤로) 이동
  const handleMoveRight = () => {
    if (currentIndex === slides.length - 1) return;
    const updated = [...slides];
    const temp = updated[currentIndex];
    updated[currentIndex] = updated[currentIndex + 1];
    updated[currentIndex + 1] = temp;
    // 번호 재정렬
    const renumbered = updated.map((s, idx) => ({ ...s, slideNumber: idx + 1 }));
    setSlides(renumbered);
    setCurrentIndex(currentIndex + 1);
  };

  const handleCopyText = () => {
    const text = `${currentSlide.title}\n\n${currentSlide.content.join("\n")}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyNotes = () => {
    if (!currentSlide.speakerNotes) return;
    navigator.clipboard.writeText(currentSlide.speakerNotes);
    setCopiedNotes(true);
    setTimeout(() => setCopiedNotes(false), 2000);
  };

  const handleDownloadClick = () => {
    if (isFreePlan) {
      setShowPaywall(true);
    } else {
      exportToPPTX({ title: deckTitle, description: "", slides }, currentThemeId, userPlan);
    }
  };

  const scrollToPricing = () => {
    setShowPaywall(false);
    if (onUpgradeClick) {
      onUpgradeClick();
    }
    const pricingElem = document.getElementById("pricing");
    if (pricingElem) {
      pricingElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      {/* 100% 유료 전환 페이월 모달 */}
      {showPaywall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
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
                ? "슬라이드별 1분 발표 대본(Notes)과 20+ 전문 테마가 완벽 탑재된 순정 .pptx 원본을 워터마크 없이 다운로드받아 자유롭게 발표하세요."
                : "Unlock unlimited 20+ Executive Themes, full presenter speech notes, and instant clean .pptx downloads with Pro."}
            </p>

            <div className="mt-7 flex flex-col gap-2.5">
              <button
                onClick={scrollToPricing}
                className="w-full py-3.5 px-6 rounded-xl font-black text-white bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 hover:opacity-95 shadow-xl shadow-pink-500/30 transition flex items-center justify-center gap-2"
              >
                <span>{lang === "ko" ? "PayPal로 PRO 플랜 즉시 업그레이드" : "Upgrade to Pro with PayPal"}</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              {/* 무료 체험자용: 워터마크 포함 3장 요약본 다운로드 */}
              <button
                onClick={() => {
                  setShowPaywall(false);
                  exportToPPTX(
                    { title: `${deckTitle} (Summary Preview)`, description: "", slides: slides.slice(0, 3) },
                    currentThemeId,
                    "free"
                  );
                }}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition border border-slate-700"
              >
                {lang === "ko"
                  ? "무료 3장 요약본 다운로드 (워터마크 포함)"
                  : "Download 3-Slide Free Summary (Watermarked)"}
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

      {/* 스마트 툴바: 테마 원클릭 변경, 슬라이드 순서 이동/추가/삭제 */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 mb-4 bg-slate-900/90 backdrop-blur border border-slate-800 rounded-2xl shadow-xl">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/30 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            {t.slide} {currentIndex + 1} / {slides.length}
          </span>

          {/* 🎨 실시간 원클릭 테마 스위처 드롭다운 */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs">
            <Palette className="w-3.5 h-3.5 text-pink-400" />
            <select
              value={currentThemeId}
              onChange={(e) => setCurrentThemeId(e.target.value)}
              className="bg-transparent text-slate-200 focus:outline-none cursor-pointer font-medium"
            >
              {THEMES_LIST.map((th) => (
                <option key={th.id} value={th.id} className="bg-slate-900 text-slate-200">
                  {lang === "ko" ? th.nameKo : th.nameEn}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1 bg-slate-800/60 p-0.5 rounded-lg border border-slate-700/80">
            <button
              onClick={handleMoveLeft}
              disabled={currentIndex === 0}
              title={lang === "ko" ? "앞 장으로 순서 이동" : "Move slide left"}
              className="p-1 text-xs text-slate-400 hover:text-white disabled:opacity-20 transition"
            >
              ◀
            </button>
            <span className="text-[10px] text-slate-500 font-mono">순서</span>
            <button
              onClick={handleMoveRight}
              disabled={currentIndex === slides.length - 1}
              title={lang === "ko" ? "뒷 장으로 순서 이동" : "Move slide right"}
              className="p-1 text-xs text-slate-400 hover:text-white disabled:opacity-20 transition"
            >
              ▶
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* 슬라이드 추가 */}
          <button
            onClick={handleAddSlide}
            title={lang === "ko" ? "슬라이드 1장 추가" : "Add new slide"}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/60 rounded-lg border border-emerald-500/30 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{lang === "ko" ? "슬라이드 추가" : "Add Slide"}</span>
          </button>

          {/* 슬라이드 삭제 */}
          <button
            onClick={handleDeleteSlide}
            title={lang === "ko" ? "현재 슬라이드 삭제" : "Delete current slide"}
            className="p-1.5 text-slate-400 hover:text-rose-400 bg-slate-800 hover:bg-rose-950/30 rounded-lg border border-slate-700 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleCopyText}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition border border-slate-700"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? t.copied : t.copyText}</span>
          </button>

          <button
            onClick={handleDownloadClick}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-lg transition shadow-md ${
              isFreePlan
                ? "text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:opacity-95 shadow-pink-500/20"
                : "text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:opacity-95 shadow-emerald-500/20"
            }`}
          >
            {isFreePlan ? <Lock className="w-3.5 h-3.5" /> : <ArrowDown className="w-3.5 h-3.5" />}
            {isFreePlan ? `${t.downloadPptx} (PRO)` : t.downloadPptx}
          </button>
        </div>
      </div>

      {/* 안내 배지: 실시간 클릭 수정 지원 */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 px-2 mb-2">
        <span className="flex items-center gap-1 text-pink-400 font-medium">
          <Edit3 className="w-3 h-3" />
          {lang === "ko"
            ? "💡 텍스트를 클릭하면 즉시 자유롭게 수정할 수 있으며, 수정된 내용 그대로 PPTX로 다운로드됩니다."
            : "💡 Click any text to edit directly; your edits will be exported to PPTX."}
        </span>
      </div>

      {/* 16:9 슬라이드 캔버스 프레임 */}
      <div
        className={`relative w-full aspect-[16/9] shadow-2xl rounded-2xl overflow-hidden border ${theme.cssBorder} transition-all`}
      >
        {/* 🔒 무료 체험 워터마크 배지 */}
        {isFreePlan && (
          <div className="absolute top-3.5 right-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 border border-pink-500/40 text-[11px] font-bold text-pink-400 backdrop-blur shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>HookDeck PRO Free Preview (3 Slides)</span>
          </div>
        )}

        <div className={`w-full h-full p-8 md:p-14 flex flex-col justify-between ${theme.cssBg}`}>
          {currentSlide.layout === "title" ? (
            <div className="flex flex-col items-center justify-center flex-1 text-center">
              <span
                className={`px-3 py-1 mb-4 text-xs font-bold tracking-widest uppercase rounded-full ${theme.cssCard} ${theme.cssAccent}`}
              >
                HookDeck PRO
              </span>
              <input
                type="text"
                value={currentSlide.title}
                onChange={(e) => updateCurrentSlide({ title: e.target.value })}
                className={`text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight mb-4 max-w-2xl bg-transparent text-center focus:outline-none focus:ring-1 focus:ring-pink-500/50 rounded-lg p-1 w-full ${theme.cssTitle}`}
              />
              <input
                type="text"
                value={currentSlide.subtitle || ""}
                onChange={(e) => updateCurrentSlide({ subtitle: e.target.value })}
                placeholder={lang === "ko" ? "부제목을 입력하세요" : "Enter subtitle"}
                className={`text-sm sm:text-base md:text-xl font-medium max-w-xl bg-transparent text-center focus:outline-none focus:ring-1 focus:ring-pink-500/50 rounded-lg p-1 w-full ${theme.cssAccent}`}
              />
              <div className={`mt-8 flex gap-4 text-xs opacity-60 ${theme.cssText}`}>
                {currentSlide.content.map((item, idx) => (
                  <input
                    key={idx}
                    type="text"
                    value={item}
                    onChange={(e) => updateBulletContent(idx, e.target.value)}
                    className="bg-transparent text-center focus:outline-none focus:underline"
                  />
                ))}
              </div>
            </div>
          ) : currentSlide.layout === "metrics" && currentSlide.metrics ? (
            <div className="flex flex-col h-full justify-between">
              <div>
                <input
                  type="text"
                  value={currentSlide.title}
                  onChange={(e) => updateCurrentSlide({ title: e.target.value })}
                  className={`text-xl sm:text-2xl md:text-4xl font-bold mb-1 bg-transparent focus:outline-none focus:ring-1 focus:ring-pink-500/50 rounded-lg w-full ${theme.cssTitle}`}
                />
                <input
                  type="text"
                  value={currentSlide.subtitle || ""}
                  onChange={(e) => updateCurrentSlide({ subtitle: e.target.value })}
                  placeholder={lang === "ko" ? "부제목을 입력하세요" : "Enter subtitle"}
                  className={`text-xs sm:text-sm md:text-base font-medium mb-4 bg-transparent focus:outline-none focus:ring-1 focus:ring-pink-500/50 rounded-lg w-full ${theme.cssAccent}`}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-auto">
                {currentSlide.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl ${theme.cssCard} border ${theme.cssBorder} text-center shadow-inner`}
                  >
                    <input
                      type="text"
                      value={m.value}
                      onChange={(e) => updateMetric(idx, "value", e.target.value)}
                      className={`text-2xl sm:text-3xl md:text-4xl font-black mb-2 bg-transparent text-center focus:outline-none focus:ring-1 focus:ring-pink-500/50 rounded w-full ${theme.cssAccent}`}
                    />
                    <input
                      type="text"
                      value={m.label}
                      onChange={(e) => updateMetric(idx, "label", e.target.value)}
                      className={`text-xs sm:text-sm font-semibold bg-transparent text-center focus:outline-none focus:ring-1 focus:ring-pink-500/50 rounded w-full ${theme.cssText}`}
                    />
                  </div>
                ))}
              </div>
              <div className={`text-right text-xs opacity-50 ${theme.cssText}`}>HookDeck PRO Generated</div>
            </div>
          ) : (
            <div className="flex flex-col h-full justify-between">
              <div>
                <input
                  type="text"
                  value={currentSlide.title}
                  onChange={(e) => updateCurrentSlide({ title: e.target.value })}
                  className={`text-xl sm:text-2xl md:text-3xl font-bold mb-1 bg-transparent focus:outline-none focus:ring-1 focus:ring-pink-500/50 rounded-lg w-full ${theme.cssTitle}`}
                />
                <input
                  type="text"
                  value={currentSlide.subtitle || ""}
                  onChange={(e) => updateCurrentSlide({ subtitle: e.target.value })}
                  placeholder={lang === "ko" ? "부제목을 입력하세요" : "Enter subtitle"}
                  className={`text-xs sm:text-sm md:text-base font-medium mb-4 bg-transparent focus:outline-none focus:ring-1 focus:ring-pink-500/50 rounded-lg w-full ${theme.cssAccent}`}
                />
              </div>
              <ul className="space-y-3.5 my-auto">
                {currentSlide.content.map((item, idx) => (
                  <li key={idx} className={`flex items-start gap-3 text-sm sm:text-base md:text-lg ${theme.cssText}`}>
                    <span className="w-2 h-2 mt-2.5 rounded-full bg-pink-500 flex-shrink-0" />
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => updateBulletContent(idx, e.target.value)}
                      className="bg-transparent focus:outline-none focus:ring-1 focus:ring-pink-500/50 rounded p-1 w-full"
                    />
                  </li>
                ))}
              </ul>
              <div className={`text-right text-xs opacity-50 ${theme.cssText}`}>HookDeck PRO Generated</div>
            </div>
          )}

          {/* 슬라이드 번호 풋터 */}
          <div
            className={`flex justify-between items-center pt-3 border-t border-white/10 text-xs opacity-60 ${theme.cssText}`}
          >
            <span>{t.confidential}</span>
            <span>
              {currentIndex + 1} / {slides.length}
            </span>
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
          onClick={() => {
            if (isFreePlan && currentIndex >= 2) {
              setShowPaywall(true);
            } else {
              setCurrentIndex((prev) => Math.min(slides.length - 1, prev + 1));
            }
          }}
          disabled={!isFreePlan && currentIndex === slides.length - 1}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur disabled:opacity-20 disabled:cursor-not-allowed transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* 🎙️ 슬라이드별 1분 발표 대본 (Speaker Notes) 탭 */}
      <div className="mt-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center">
              <Mic className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                {lang === "ko" ? "슬라이드 1분 스피치 대본 (Speaker Notes)" : "1-Minute Presenter Speech Guide"}
                <span className="text-[10px] text-pink-400 font-normal px-2 py-0.5 rounded-full bg-pink-500/10 border border-pink-500/20">
                  {lang === "ko" ? ".pptx 비고란 탑재" : "PPTX Notes Included"}
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyNotes}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 transition"
            >
              {copiedNotes ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              {copiedNotes ? (lang === "ko" ? "복사됨" : "Copied") : lang === "ko" ? "대본 복사" : "Copy Notes"}
            </button>
            <button
              onClick={() => setShowNotes(!showNotes)}
              className="text-[11px] text-slate-400 hover:text-slate-200"
            >
              {showNotes ? (lang === "ko" ? "접기" : "Collapse") : lang === "ko" ? "펼치기" : "Expand"}
            </button>
          </div>
        </div>

        {showNotes && (
          <div className="relative mt-1">
            {isFreePlan && currentIndex >= 1 ? (
              <div className="relative">
                <textarea
                  rows={2}
                  value={currentSlide.speakerNotes ? currentSlide.speakerNotes.slice(0, 50) + "..." : ""}
                  disabled
                  className="w-full p-2.5 text-xs text-slate-400 bg-slate-950/80 border border-slate-800 rounded-xl filter blur-[1.5px] select-none resize-none"
                />
                <div
                  onClick={() => setShowPaywall(true)}
                  className="absolute inset-0 flex items-center justify-center bg-slate-950/70 hover:bg-slate-950/60 rounded-xl cursor-pointer transition border border-pink-500/30 p-2"
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-pink-300">
                    <Lock className="w-3.5 h-3.5 text-pink-400" />
                    <span>
                      {lang === "ko"
                        ? "발표자 대본(Speaker Notes) 전체 보기는 PRO 전용입니다 [즉시 잠금 해제]"
                        : "Full Presenter Speech Notes are Pro Exclusive [Unlock Now]"}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <textarea
                rows={2}
                value={currentSlide.speakerNotes || ""}
                onChange={(e) => updateCurrentSlide({ speakerNotes: e.target.value })}
                placeholder={
                  lang === "ko"
                    ? "이 장표를 띄우고 발표할 핵심 멘트를 작성하세요 (파워포인트 다운로드 시 슬라이드 노트에 자동 저장됩니다)."
                    : "Type speech notes for this slide (automatically embedded in PowerPoint speaker notes)."
                }
                className="w-full p-2.5 text-xs text-slate-200 bg-slate-950/80 border border-slate-800 rounded-xl focus:outline-none focus:border-pink-500/50 leading-relaxed resize-none"
              />
            )}
          </div>
        )}
      </div>

      {/* 썸네일 스트립 네비게이션 */}
      <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
        {slides.map((s, idx) => {
          const isLockedSlide = isFreePlan && idx >= 3;
          return (
            <button
              key={idx}
              onClick={() => {
                if (isLockedSlide) {
                  setShowPaywall(true);
                } else {
                  setCurrentIndex(idx);
                }
              }}
              className={`flex-shrink-0 w-28 h-14 rounded-lg border text-left p-1.5 transition text-[10px] truncate relative ${
                currentIndex === idx
                  ? "border-pink-500 ring-2 ring-pink-500/20 bg-pink-950/40 text-pink-300"
                  : isLockedSlide
                  ? "border-slate-800 bg-slate-950/70 text-slate-500 hover:border-pink-500/40"
                  : "border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between font-bold">
                <span>Slide {idx + 1}</span>
                {isLockedSlide && <Lock className="w-3 h-3 text-pink-400" />}
              </div>
              <div className="opacity-80 truncate mt-0.5">
                {isLockedSlide ? (lang === "ko" ? "🔒 PRO 전용 잠금" : "🔒 Pro Locked") : s.title}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
