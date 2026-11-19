"use client";

import { useState, useEffect } from "react";
import {
  Sparkles,
  Layers,
  Sliders,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle,
  Palette,
  Clock,
  Compass,
  FileText,
  HelpCircle,
  ChevronDown,
  Loader2,
  Crown,
} from "lucide-react";
import SlideViewer from "@/components/SlideViewer";
import PricingSection from "@/components/PricingSection";
import ThemeShowcase from "@/components/ThemeShowcase";
import { DeckResponse, UserPlan } from "@/types/deck";
import { translations, Language } from "@/utils/translations";
import { THEMES_LIST } from "@/utils/themes";
import { FRAMEWORKS_LIST, detectFrameworkByTopic } from "@/utils/frameworks";

export default function Home() {
  const [lang, setLang] = useState<Language>("en");
  const [topic, setTopic] = useState("");
  const [customInstructions, setCustomInstructions] = useState("");
  const [showCustomOptions, setShowCustomOptions] = useState(false);
  const [frameworkId, setFrameworkId] = useState<string>("auto");
  const [duration, setDuration] = useState<number>(5); // minutes: 3, 5, 10, 20
  const [slideCount, setSlideCount] = useState<number>(8);
  const [themeId, setThemeId] = useState<string>("dark-tech");
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStep, setLoadingStep] = useState(1);
  const [detectedFrameworkName, setDetectedFrameworkName] = useState("");
  const [deck, setDeck] = useState<DeckResponse | null>(null);
  const [userPlan, setUserPlan] = useState<UserPlan>("free");

  // 유저 플랜 hydration
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPlan = localStorage.getItem("hookdeck_user_plan") as UserPlan | null;
      if (savedPlan && ["starter", "pro", "agency"].includes(savedPlan)) {
        setUserPlan(savedPlan);
      }
    }
  }, []);

  const t = translations[lang];

  // 시간 프리셋 변경 핸들러
  const handleDurationChange = (mins: number) => {
    setDuration(mins);
    if (mins === 3) setSlideCount(5);
    else if (mins === 5) setSlideCount(8);
    else if (mins === 10) setSlideCount(12);
    else if (mins === 20) setSlideCount(18);
  };

  const sampleTopicsEn = [
    "2026 AI Agent Market Opportunity (YC Seed Pitch Deck)",
    "High School Climate Change & Clean Energy Lecture",
    "B2B SaaS Growth Framework: Scaling from $1M to $10M ARR",
    "Luxury D2C Brand Launch: Fall Collection Strategy",
  ];

  const sampleTopicsKo = [
    "2026 AI 에이전트 시장 진입 전략 (스타트업 IR 피치덱)",
    "친환경 모빌리티 배터리 재활용 신사업 계획서",
    "대학생을 위한 2026 글로벌 테크 트렌드 특강 세미나",
    "D2C 프리미엄 뷰티 브랜드 런칭 및 마케팅 제안서",
  ];

  const sampleTopics = lang === "ko" ? sampleTopicsKo : sampleTopicsEn;

  const handleGenerate = async (selectedTopic?: string) => {
    const targetTopic = selectedTopic || topic;
    if (!targetTopic.trim()) {
      alert(lang === "ko" ? "발표 주제나 내용을 입력해 주세요!" : "Please enter a presentation topic or idea!");
      return;
    }

    // 감지된 프레임워크 사전 계산
    const detected = frameworkId === "auto" ? detectFrameworkByTopic(targetTopic) : FRAMEWORKS_LIST.find((f) => f.id === frameworkId) || FRAMEWORKS_LIST[0];
    setDetectedFrameworkName(lang === "ko" ? `${detected.icon} ${detected.nameKo}` : `${detected.icon} ${detected.nameEn}`);

    setLoading(true);
    setLoadingProgress(5);
    setLoadingStep(1);

    // 5~6초 동안 감성 Labor Illusion 프로그레스 타이머 가동
    const startTime = Date.now();
    const totalDuration = 5200; // 5.2초

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(95, Math.floor((elapsed / totalDuration) * 100));
      setLoadingProgress(pct);

      if (pct < 25) {
        setLoadingStep(1);
      } else if (pct < 55) {
        setLoadingStep(2);
      } else if (pct < 85) {
        setLoadingStep(3);
      } else {
        setLoadingStep(4);
      }
    }, 150);

    try {
      const resPromise = fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: targetTopic,
          slideCount,
          language: lang,
          style: themeId,
          frameworkId,
          customInstructions,
          duration,
        }),
      });

      const [res] = await Promise.all([
        resPromise,
        // 최소 5초 동안 프로그레스 연출 대기
        new Promise((resolve) => setTimeout(resolve, totalDuration)),
      ]);

      clearInterval(progressInterval);
      setLoadingProgress(100);
      setLoadingStep(5);

      if (!res.ok) {
        throw new Error("Failed to generate deck");
      }

      const data = await res.json();
      
      setTimeout(() => {
        setDeck(data);
        setLoading(false);
        const viewer = document.getElementById("viewer-section");
        if (viewer) viewer.scrollIntoView({ behavior: "smooth" });
      }, 600);
    } catch (err: any) {
      clearInterval(progressInterval);
      console.error(err);
      alert(lang === "ko" ? "슬라이드 생성 중 오류가 발생했습니다." : "Error generating slides. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col justify-between selection:bg-pink-500 selection:text-white">
      {/* 5초~8초 명품 Labor Illusion 로딩 모달 */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-fadeIn">
          <div className="relative w-full max-w-lg p-8 rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl shadow-pink-500/20 text-center">
            {/* 상단 펄스 아이콘 */}
            <div className="relative w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-600 animate-ping opacity-25" />
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-xl shadow-pink-500/30">
                <Sparkles className="w-8 h-8 animate-spin" style={{ animationDuration: "6s" }} />
              </div>
            </div>

            <span className="px-3 py-1 text-[11px] font-bold tracking-widest uppercase rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/30">
              HookDeck AI Synthesis
            </span>

            <h3 className="mt-3 text-2xl font-black text-white">
              {t.loadingModal.title}
            </h3>

            {detectedFrameworkName && (
              <p className="mt-1 text-xs text-pink-400 font-semibold">
                {lang === "ko" ? `특화 프레임워크 적용:` : `Framework:`} {detectedFrameworkName}
              </p>
            )}

            <p className="mt-2 text-xs text-slate-400">
              {t.loadingModal.subtitle}
            </p>

            {/* 실시간 프로그레스 게이지 바 */}
            <div className="mt-6 w-full bg-slate-800/80 rounded-full h-3.5 overflow-hidden p-0.5 border border-slate-700">
              <div
                className="bg-gradient-to-r from-pink-500 via-rose-500 to-indigo-500 h-full rounded-full transition-all duration-300 ease-out flex items-center justify-end pr-1 text-[9px] font-bold text-white"
                style={{ width: `${loadingProgress}%` }}
              >
                {loadingProgress > 15 ? `${loadingProgress}%` : ""}
              </div>
            </div>

            {/* 단계별 체크리스트 애니메이션 */}
            <div className="mt-6 space-y-2.5 text-left text-xs text-slate-300">
              <div className={`flex items-center gap-2.5 transition-all ${loadingStep >= 1 ? "text-white font-medium" : "text-slate-500 opacity-40"}`}>
                {loadingStep > 1 ? (
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                ) : (
                  <Loader2 className="w-4 h-4 text-pink-400 animate-spin flex-shrink-0" />
                )}
                <span>{t.loadingModal.step1}</span>
              </div>

              <div className={`flex items-center gap-2.5 transition-all ${loadingStep >= 2 ? "text-white font-medium" : "text-slate-500 opacity-40"}`}>
                {loadingStep > 2 ? (
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                ) : loadingStep === 2 ? (
                  <Loader2 className="w-4 h-4 text-pink-400 animate-spin flex-shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-700 flex-shrink-0" />
                )}
                <span>{t.loadingModal.step2}</span>
              </div>

              <div className={`flex items-center gap-2.5 transition-all ${loadingStep >= 3 ? "text-white font-medium" : "text-slate-500 opacity-40"}`}>
                {loadingStep > 3 ? (
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                ) : loadingStep === 3 ? (
                  <Loader2 className="w-4 h-4 text-pink-400 animate-spin flex-shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-700 flex-shrink-0" />
                )}
                <span>{t.loadingModal.step3}</span>
              </div>

              <div className={`flex items-center gap-2.5 transition-all ${loadingStep >= 4 ? "text-white font-medium" : "text-slate-500 opacity-40"}`}>
                {loadingStep >= 5 ? (
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                ) : loadingStep === 4 ? (
                  <Loader2 className="w-4 h-4 text-pink-400 animate-spin flex-shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-700 flex-shrink-0" />
                )}
                <span>{t.loadingModal.step4}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-[10px] text-slate-500">
              {lang === "ko"
                ? "💡 생성된 덱은 브라우저에서 바로 클릭하여 수정할 수 있으며, 1분 발표 대본도 함께 탑재됩니다."
                : "💡 Output includes editable slide copy and embedded 1-minute presenter notes in PPTX."}
            </div>
          </div>
        </div>
      )}

      {/* 헤더 네비게이션 */}
      <header className="sticky top-0 z-40 bg-[#0a0f1d]/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3.5 flex items-center justify-between">
          {/* 브랜드 로고 */}
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

          {/* 중앙 네비게이션 */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#generator" className="hover:text-pink-400 transition flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-pink-500" />
              {t.nav.generator}
            </a>
            <a href="#comparison" className="hover:text-slate-100 transition">
              {t.nav.features}
            </a>
            <a href="#pricing" className="hover:text-slate-100 transition">
              {t.nav.pricing}
            </a>
          </nav>

          {/* 우측 언어 토글 및 업그레이드 CTA */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-0.5 text-xs font-semibold">
              <button
                onClick={() => setLang("en")}
                className={`px-2.5 py-1 rounded-lg transition ${
                  lang === "en" ? "bg-pink-500 text-white shadow" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("ko")}
                className={`px-2.5 py-1 rounded-lg transition ${
                  lang === "ko" ? "bg-pink-500 text-white shadow" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                KO
              </button>
            </div>

            {userPlan !== "free" ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Crown className="w-3.5 h-3.5" />
                <span>{userPlan.toUpperCase()} ACTIVE</span>
              </span>
            ) : (
              <a
                href="#pricing"
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 hover:opacity-95 shadow-md shadow-pink-500/20 transition"
              >
                {t.nav.upgrade}
              </a>
            )}
          </div>
        </div>
      </header>

      {/* 메인 히어로 & 제너레이터 섹션 */}
      <main className="flex-1">
        <section id="generator" className="relative pt-12 pb-16 md:pt-16 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* 배경 그라데이션 글로우 */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-pink-600/10 via-indigo-600/5 to-transparent blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            {/* 소셜 프루프 배지 */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-pink-500/30 text-xs font-semibold text-pink-300 shadow-xl mb-6">
              <ShieldCheck className="w-4 h-4 text-pink-400" />
              <span>{t.hero.badge}</span>
            </div>

            {/* 메인 헤드라인 */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.15]">
              {t.hero.titleMain} <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-pink-400 via-rose-300 to-red-400 bg-clip-text text-transparent">
                {t.hero.titleHighlight}
              </span>
            </h1>

            {/* 서브카피 */}
            <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {t.hero.desc}
            </p>

            {/* 인터랙티브 AI 제너레이터 콘솔 */}
            <div className="mt-8 p-4 sm:p-6 rounded-3xl bg-[#0c1222]/95 border border-slate-800 shadow-2xl backdrop-blur text-left">
              <div className="space-y-4">
                {/* 1. 메인 주제 입력창 */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                    <span>{t.hero.inputLabel}</span>
                    <span className="text-[11px] text-pink-400 font-normal">
                      {lang === "ko" ? "✨ 어떤 아이디어도 상관없습니다" : "✨ Any idea or prompt works"}
                    </span>
                  </label>
                  <textarea
                    rows={2}
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder={t.hero.placeholder}
                    className="w-full px-4 py-3 rounded-2xl bg-[#070b14] border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-sm leading-relaxed transition resize-none"
                  />
                </div>

                {/* 2. 목적별 20대 특화 프레임워크 선택 & 발표 시간 프리셋 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* 프레임워크 드롭다운 */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-pink-400" />
                      <span>{t.hero.frameworkLabel}</span>
                    </label>
                    <select
                      value={frameworkId}
                      onChange={(e) => setFrameworkId(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#070b14] border border-slate-700 text-xs font-medium text-slate-200 focus:outline-none focus:border-pink-500 transition cursor-pointer"
                    >
                      <option value="auto">{t.hero.frameworkAuto}</option>
                      {FRAMEWORKS_LIST.map((fw) => (
                        <option key={fw.id} value={fw.id}>
                          {fw.icon} {lang === "ko" ? fw.nameKo : fw.nameEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 발표 시간 & 분량 프리셋 */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-pink-400" />
                      <span>{t.hero.durationLabel}</span>
                    </label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[
                        { mins: 3, label: "3분(5장)", labelEn: "3m (5s)" },
                        { mins: 5, label: "5분(8장)", labelEn: "5m (8s)" },
                        { mins: 10, label: "10분(12장)", labelEn: "10m (12s)" },
                        { mins: 20, label: "20분(18장)", labelEn: "20m (18s)" },
                      ].map((item) => (
                        <button
                          key={item.mins}
                          type="button"
                          onClick={() => handleDurationChange(item.mins)}
                          className={`py-2 px-1 text-[11px] font-bold rounded-xl border transition text-center ${
                            duration === item.mins
                              ? "bg-pink-500 text-white border-pink-400 shadow-md shadow-pink-500/20"
                              : "bg-[#070b14] text-slate-400 border-slate-700/80 hover:text-slate-200 hover:border-slate-600"
                          }`}
                        >
                          {lang === "ko" ? item.label : item.labelEn}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3. 커스텀 지시사항 (원하는 순서/강조점) 토글 */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowCustomOptions(!showCustomOptions)}
                    className="flex items-center gap-1.5 text-xs text-pink-400 hover:text-pink-300 font-semibold transition"
                  >
                    <span>{showCustomOptions ? "▲ " : "▼ "}</span>
                    <span>
                      {lang === "ko"
                        ? "+ 원하는 슬라이드 순서나 강조사항 직접 입력하기 (선택)"
                        : "+ Custom slide order or specific instructions (Optional)"}
                    </span>
                  </button>

                  {showCustomOptions && (
                    <div className="mt-2 p-3 rounded-2xl bg-[#070b14]/90 border border-slate-700/60 animate-fadeIn">
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                        {t.hero.customLabel}
                      </label>
                      <textarea
                        rows={2}
                        value={customInstructions}
                        onChange={(e) => setCustomInstructions(e.target.value)}
                        placeholder={t.hero.customPlaceholder}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-pink-500 resize-none"
                      />
                      <p className="mt-1 text-[10px] text-slate-500">
                        {lang === "ko"
                          ? "💡 '1. 팀소개 2. 문제점 3. 30억 투자유치' 처럼 번호로 적어주시면 해당 순서대로 100% 맞춤형으로 생성됩니다."
                          : "💡 Numbered items like '1. Team, 2. Problem, 3. $3M Ask' will generate custom slides matching your exact sequence."}
                      </p>
                    </div>
                  )}
                </div>

                {/* 4. 대표 테마 비주얼 쇼케이스 & 드롭다운 선택 */}
                <div>
                  <ThemeShowcase
                    selectedThemeId={themeId}
                    onSelectTheme={setThemeId}
                    lang={lang}
                  />

                  <div className="mt-2 flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>{lang === "ko" ? "전체 20+ 전문 테마 선택:" : "All 20+ Executive Themes:"}</span>
                  </div>
                  <select
                    value={themeId}
                    onChange={(e) => setThemeId(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#070b14] border border-slate-700 text-xs font-medium text-slate-200 focus:outline-none focus:border-pink-500 transition cursor-pointer"
                  >
                    {THEMES_LIST.map((th) => (
                      <option key={th.id} value={th.id}>
                        {lang === "ko" ? th.nameKo : th.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 5. 생성 버튼 */}
                <button
                  onClick={() => handleGenerate()}
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 hover:opacity-95 shadow-xl shadow-pink-500/30 transition flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Zap className="w-4 h-4 fill-current group-hover:scale-110 transition" />
                  <span>{loading ? t.hero.generatingBtn : t.hero.generateBtn}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </button>
              </div>

              {/* 하단 속도 & 스펙 보증 */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
                <span className="flex items-center gap-1 text-slate-300">
                  {t.hero.speedNotice}
                </span>
                <span className="text-pink-400 font-semibold">
                  {lang === "ko" ? "💡 생성 후 브라우저에서 바로 클릭 수정 가능" : "💡 Fully editable in web viewer"}
                </span>
              </div>
            </div>

            {/* 추천 주제 칩 목록 */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-slate-400 font-medium">{t.hero.suggested}</span>
              {sampleTopics.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTopic(item);
                    handleGenerate(item);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 생성된 슬라이드 뷰어 섹션 (생성 완료 시 나타남) */}
        {deck && (
          <section id="viewer-section" className="py-8 px-4 sm:px-6 lg:px-8 bg-slate-950/60 border-y border-slate-800/60">
            <div className="max-w-4xl mx-auto mb-4 text-center">
              <span className="px-3 py-1 text-xs font-bold uppercase rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {lang === "ko" ? "✨ 맞춤형 슬라이드 및 1분 발표 대본 완성" : "✨ Bespoke Presentation & Notes Ready"}
              </span>
              <h2 className="mt-2 text-2xl font-black text-white">{deck.title}</h2>
              <p className="text-xs text-slate-400 mt-1">{deck.description}</p>
            </div>
            <SlideViewer
              slides={deck.slides}
              deckTitle={deck.title}
              themeId={themeId}
              lang={lang}
              userPlan={userPlan}
              onUpgradeClick={() => {
                const pricingElem = document.getElementById("pricing");
                if (pricingElem) pricingElem.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </section>
        )}

        {/* 소셜 프루프 수치 섹션 */}
        <section className="py-12 border-y border-slate-800/80 bg-[#090e1c]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl sm:text-4xl font-black text-pink-400 mb-1">{t.socialProof.stat1}</div>
                <div className="text-xs font-medium text-slate-400">{t.socialProof.stat1Label}</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-white mb-1">{t.socialProof.stat2}</div>
                <div className="text-xs font-medium text-slate-400">{t.socialProof.stat2Label}</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 mb-1">{t.socialProof.stat3}</div>
                <div className="text-xs font-medium text-slate-400">{t.socialProof.stat3Label}</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-indigo-400 mb-1">{t.socialProof.stat4}</div>
                <div className="text-xs font-medium text-slate-400">{t.socialProof.stat4Label}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Before / After 비교 섹션 */}
        <section id="comparison" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="px-3 py-1 text-xs font-bold uppercase rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/30">
              {t.comparison.badge}
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black text-white">{t.comparison.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Before 카드 */}
            <div className="p-8 rounded-3xl bg-slate-900/50 border border-rose-950/50 relative overflow-hidden">
              <div className="text-sm font-black text-rose-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                <span>❌</span>
                <span>{t.comparison.beforeTitle}</span>
              </div>
              <ul className="space-y-4">
                {t.comparison.beforePoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-400">
                    <span className="text-rose-500 flex-shrink-0 font-bold">✕</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* After 카드 */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-[#111933] to-[#0d1428] border-2 border-pink-500/40 relative overflow-hidden shadow-2xl shadow-pink-500/10">
              <div className="text-sm font-black text-pink-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                <span>⚡</span>
                <span>{t.comparison.afterTitle}</span>
              </div>
              <ul className="space-y-4">
                {t.comparison.afterPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-200 font-medium">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 100% 공식 PayPal Live 결제 섹션 */}
        <section id="pricing" className="py-16 md:py-24 bg-[#080d1a] border-t border-slate-800/80">
          <PricingSection
            lang={lang}
            userPlan={userPlan}
            onPlanSelected={(newPlan) => setUserPlan(newPlan)}
          />
        </section>
      </main>

      {/* 푸터 */}
      <footer className="border-t border-slate-800/80 bg-[#070b14] py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>{t.footer.rights}</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-300 transition">
              {t.footer.terms}
            </a>
            <a href="#" className="hover:text-slate-300 transition">
              {t.footer.privacy}
            </a>
            <a href="#" className="hover:text-slate-300 transition">
              {t.footer.support}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
