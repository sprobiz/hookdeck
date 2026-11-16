"use client";

import { useState } from "react";
import { Sparkles, Layers, Sliders, ArrowRight, ShieldCheck, Zap, XCircle, CheckCircle } from "lucide-react";
import SlideViewer from "@/components/SlideViewer";
import PricingSection from "@/components/PricingSection";
import { DeckResponse } from "@/types/deck";
import { translations, Language } from "@/utils/translations";

export default function Home() {
  const [lang, setLang] = useState<Language>("en");
  const [topic, setTopic] = useState("");
  const [slideCount, setSlideCount] = useState(6);
  const [style, setStyle] = useState<"minimal" | "corporate" | "creative" | "dark">("dark");
  const [loading, setLoading] = useState(false);
  const [deck, setDeck] = useState<DeckResponse | null>(null);

  const t = translations[lang];

  const sampleTopicsEn = [
    "2026 AI Agent Market Landscape & B2B Expansion Roadmap",
    "YC Seed Pitch Deck for Next-Gen Developer Productivity Tool",
    "Enterprise AI Governance & Security Architecture Strategy",
    "B2B SaaS Growth Framework: Scaling from $1M to $10M ARR",
  ];

  const sampleTopicsKo = [
    "2026 AI 에이전트 시장 전망 및 B2B 사업 제안서",
    "스타트업 시드 투자 유치를 위한 10분 피치덱 (IR Deck)",
    "친환경 모빌리티 배터리 재활용 사업 타당성 분석",
    "B2B SaaS 기업을 위한 고객 획득(CAC) 최적화 전략",
  ];

  const sampleTopics = lang === "ko" ? sampleTopicsKo : sampleTopicsEn;

  const handleGenerate = async (selectedTopic?: string) => {
    const targetTopic = selectedTopic || topic;
    if (!targetTopic.trim()) {
      alert(lang === "ko" ? "발표 주제나 내용을 입력해 주세요!" : "Please enter a presentation topic or idea!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: targetTopic,
          slideCount,
          language: lang,
          style,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate deck");
      }

      const data = await res.json();
      setDeck(data);
      setTimeout(() => {
        const viewer = document.getElementById("viewer-section");
        if (viewer) viewer.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err: any) {
      console.error(err);
      alert(lang === "ko" ? "슬라이드 생성 중 오류가 발생했습니다." : "Error generating slides. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col justify-between selection:bg-blue-500 selection:text-white">
      {/* 1호 HookThumb 스타일 프리미엄 다크 네비게이션 헤더 */}
      <header className="sticky top-0 z-50 bg-[#0a0f1d]/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3.5 flex items-center justify-between">
          {/* 브랜드 로고 (HookThumb 스타일 엠블럼 + PRO 뱃지) */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-500 to-indigo-600 p-[1.5px] shadow-lg shadow-pink-500/20">
              <div className="w-full h-full bg-[#0a0f1d] rounded-2xl flex items-center justify-center font-black text-white text-lg">
                ⚡
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-white text-lg sm:text-xl tracking-tight">HookDeck</span>
                <span className="px-1.5 py-0.5 text-[10px] font-black uppercase rounded bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-sm">
                  PRO
                </span>
              </div>
              <span className="text-[11px] text-slate-400 hidden sm:block tracking-wide">
                {t.nav.tagline}
              </span>
            </div>
          </div>

          {/* 중앙 네비게이션 링크 */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
            <a href="#generator" className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600/30 rounded-lg border border-blue-500/30 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              {t.nav.generator}
            </a>
            <a href="#comparison" className="px-3.5 py-1.5 text-xs font-medium text-slate-400 hover:text-white transition">
              {t.nav.features}
            </a>
            <a href="#pricing" className="px-3.5 py-1.5 text-xs font-medium text-slate-400 hover:text-white transition">
              {t.nav.pricing}
            </a>
          </nav>

          {/* 우측: 1호 사이트와 100% 동일한 [ EN | KR ] 토글 & Upgrade 버튼 */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* EN | KR 세그먼트 토글 */}
            <div className="flex items-center bg-slate-900 border border-slate-800 p-0.5 rounded-full text-xs font-bold text-slate-400">
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1 rounded-full transition ${
                  lang === "en"
                    ? "bg-blue-600 text-white shadow-sm font-extrabold"
                    : "hover:text-white"
                }`}
              >
                EN
              </button>
              <span className="text-slate-600 px-0.5">|</span>
              <button
                onClick={() => setLang("ko")}
                className={`px-3 py-1 rounded-full transition ${
                  lang === "ko"
                    ? "bg-blue-600 text-white shadow-sm font-extrabold"
                    : "hover:text-white"
                }`}
              >
                KR
              </button>
            </div>

            {/* 업그레이드 CTA (HookThumb 스타일 핑크/레드 그라디언트 캡슐 버튼) */}
            <a
              href="#pricing"
              className="px-4 py-2 text-xs font-bold rounded-full text-white bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 hover:opacity-95 shadow-lg shadow-pink-500/25 transition whitespace-nowrap"
            >
              💳 {t.nav.upgrade}
            </a>
          </div>
        </div>
      </header>

      {/* 메인 히어로 섹션 */}
      <main className="flex-1">
        <section id="generator" className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center overflow-hidden">
          {/* 백그라운드 블루/퍼플 글로우 */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/15 via-indigo-600/10 to-pink-500/10 blur-[130px] -z-10 pointer-events-none" />

          {/* 소셜 프루프 뱃지 */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-blue-400 text-xs font-semibold mb-6 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            {t.hero.badge}
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.15]">
            {t.hero.titleMain} <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-pink-400">
              {t.hero.titleHighlight}
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t.hero.desc}
          </p>

          {/* 핵심 생성기 인터랙티브 카드 */}
          <div className="mt-10 p-5 sm:p-7 bg-[#0d1424] border border-slate-800 rounded-3xl shadow-2xl shadow-black/80 text-left relative z-20">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              {t.hero.inputLabel}
            </label>
            <textarea
              rows={3}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={t.hero.placeholder}
              className="w-full p-4 rounded-2xl bg-[#090d18] border border-slate-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none text-white text-sm sm:text-base resize-none transition placeholder:text-slate-600"
            />

            {/* 추천 토픽 칩 */}
            <div className="mt-3 flex flex-wrap gap-2 items-center">
              <span className="text-xs text-slate-500 font-medium">{t.hero.suggested}</span>
              {sampleTopics.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTopic(item);
                    handleGenerate(item);
                  }}
                  className="text-xs px-3 py-1 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-300 transition truncate max-w-[260px] border border-slate-700/50"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* 세부 옵션 컨트롤러 */}
            <div className="mt-6 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-400" /> {t.hero.slidesCount}
                </label>
                <select
                  value={slideCount}
                  onChange={(e) => setSlideCount(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-800 text-sm font-medium text-slate-200 bg-[#090d18] outline-none focus:border-blue-500"
                >
                  <option value={4}>4 Slides (Summary Deck)</option>
                  <option value={6}>6 Slides (Executive Standard)</option>
                  <option value={8}>8 Slides (Deep Dive Business)</option>
                  <option value={10}>10 Slides (Full Pitch/IR Deck)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-blue-400" /> {t.hero.theme}
                </label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-800 text-sm font-medium text-slate-200 bg-[#090d18] outline-none focus:border-blue-500"
                >
                  <option value="dark">{t.hero.themeDark}</option>
                  <option value="minimal">{t.hero.themeMinimal}</option>
                  <option value="corporate">{t.hero.themeCorporate}</option>
                  <option value="creative">{t.hero.themeCreative}</option>
                </select>
              </div>
            </div>

            {/* 생성 CTA 버튼 */}
            <div className="mt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{t.hero.speedNotice}</span>
              </div>

              <button
                disabled={loading}
                onClick={() => handleGenerate()}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-blue-500/25 disabled:opacity-50 transition"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{t.hero.generatingBtn}</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>{t.hero.generateBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* 생성된 슬라이드 뷰어 섹션 */}
        {deck && (
          <section id="viewer-section" className="py-16 bg-[#0a0f1d] border-y border-slate-800 px-4">
            <SlideViewer slides={deck.slides} deckTitle={deck.title} style={style} lang={lang} />
          </section>
        )}

        {/* 4대 핵심 지표 (Social Proof Counter) */}
        <section className="py-14 bg-[#0a0f1d]/50 border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {t.socialProof.stat1}
              </div>
              <div className="text-xs text-slate-400 mt-1 font-medium">{t.socialProof.stat1Label}</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-blue-400 tracking-tight">
                {t.socialProof.stat2}
              </div>
              <div className="text-xs text-slate-400 mt-1 font-medium">{t.socialProof.stat2Label}</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-pink-400 tracking-tight">
                {t.socialProof.stat3}
              </div>
              <div className="text-xs text-slate-400 mt-1 font-medium">{t.socialProof.stat3Label}</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">
                {t.socialProof.stat4}
              </div>
              <div className="text-xs text-slate-400 mt-1 font-medium">{t.socialProof.stat4Label}</div>
            </div>
          </div>
        </section>

        {/* Before vs After 심리적 전환 섹션 (Hook 장치) */}
        <section id="comparison" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="px-3.5 py-1 text-xs font-bold uppercase rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
              {t.comparison.badge}
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-black text-white">
              {t.comparison.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Before (Old Way) */}
            <div className="p-8 rounded-3xl bg-slate-900/40 border border-red-900/30">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-lg mb-6">
                <XCircle className="w-5 h-5" />
                {t.comparison.beforeTitle}
              </div>
              <ul className="space-y-4">
                {t.comparison.beforePoints.map((p, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-400 text-sm">
                    <span className="text-rose-500 font-bold">✕</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* After (HookDeck Way) */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-blue-950/40 to-slate-900/80 border-2 border-blue-500/50 shadow-xl shadow-blue-500/10">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-lg mb-6">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                {t.comparison.afterTitle}
              </div>
              <ul className="space-y-4">
                {t.comparison.afterPoints.map((p, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-200 text-sm font-medium">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 100% 유료 구독 PayPal 요금제 섹션 */}
        <PricingSection lang={lang} />
      </main>

      {/* 풋터 */}
      <footer className="bg-[#05080f] text-slate-500 py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-900 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-pink-500 flex items-center justify-center text-white font-bold text-xs">
              ⚡
            </div>
            <span className="font-bold text-slate-300 text-sm">HookDeck PRO</span>
            <span>{t.footer.rights}</span>
          </div>

          <div className="flex gap-6">
            <a href="#pricing" className="hover:text-slate-300 transition">{t.nav.pricing}</a>
            <a href="#" className="hover:text-slate-300 transition">{t.footer.terms}</a>
            <a href="#" className="hover:text-slate-300 transition">{t.footer.privacy}</a>
            <a href="mailto:contact@s-probiz.com" className="hover:text-slate-300 transition">{t.footer.support}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
