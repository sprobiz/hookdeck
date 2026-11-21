"use client";

import { useState } from "react";
import { Compass, Sparkles, Check, ArrowRight, Layers, FileText, ChevronRight } from "lucide-react";
import { Language } from "@/utils/translations";

interface FrameworkGalleryProps {
  lang: Language;
  onSelectTopic?: (topic: string, frameworkId?: string) => void;
}

export default function FrameworkGallery({ lang, onSelectTopic }: FrameworkGalleryProps) {
  const isKo = lang === "ko";
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: isKo ? "전체 보기 (20+)" : "All Frameworks" },
    { id: "startup", label: isKo ? "투자 유치 (IR / Pitch)" : "Startup & IR" },
    { id: "strategy", label: isKo ? "경영 전략 & 보고 (QBR)" : "Strategy & QBR" },
    { id: "sales", label: isKo ? "세일즈 & 제안서" : "Sales & Proposals" },
  ];

  const sampleDecks = [
    {
      id: "startup-pitch",
      cat: "startup",
      badge: "YC & Sequoia Standard",
      title: isKo ? "AI B2B Agent 솔루션 Series-A IR 피치덱" : "AI B2B Agent Solution Series-A IR Pitch Deck",
      desc: isKo ? "Problem → Solution → Traction → Business Model → Ask 정통 10장 구성" : "Problem-Solution-Traction-Business Model-Ask standard structure",
      slidesCount: "8~12 Slides",
      sampleKpi: "+480% YoY ARR",
      framework: isKo ? "스타트업 IR 투자유치 프레임워크" : "Startup IR Pitch Deck",
      accent: "from-pink-500/20 to-purple-500/20 border-pink-500/30 text-pink-400",
      themeBg: "#0b1120",
    },
    {
      id: "executive-brief",
      cat: "strategy",
      badge: "McKinsey 3-Box",
      title: isKo ? "신사업 진출 및 2026 전략 기획 보고서" : "2026 Strategic Market Expansion Executive Brief",
      desc: isKo ? "경영진 및 이사회 의사결정을 위한 3단 귀납적 브리프와 리스크 분석" : "3-tier deductive executive briefing with actionable risk matrix",
      slidesCount: "8~15 Slides",
      sampleKpi: "ROI < 4.2 mo",
      framework: isKo ? "경영진 브리프 & 이사회 보고" : "Executive Briefing",
      accent: "from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-400",
      themeBg: "#061325",
    },
    {
      id: "qbr",
      cat: "strategy",
      badge: "Quarterly Business Review",
      title: isKo ? "4분기 실적 분석 및 차년도 OKR 분기 검토 (QBR)" : "Q4 Business Review & Annual OKR Alignment",
      desc: isKo ? "목표 대비 달성률, 주요 이니셔티브, 병목 극복 전략과 핵심 지표" : "Target vs Actual analysis, core blockers, and next quarter sprint OKRs",
      slidesCount: "10~14 Slides",
      sampleKpi: "112% Target Hit",
      framework: isKo ? "분기 비즈니스 리뷰 (QBR)" : "Quarterly Business Review",
      accent: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400",
      themeBg: "#071c18",
    },
    {
      id: "b2b-proposal",
      cat: "sales",
      badge: "High-Ticket Enterprise",
      title: isKo ? "대기업 엔터프라이즈 DX 솔루션 도입 제안서" : "Enterprise Digital Transformation Solution Proposal",
      desc: isKo ? "현업 Pain-Point 진단, 맞춤 아키텍처 제안, 도입 기대효과 및 견적" : "Enterprise diagnostic, tailored architecture, ROI model and scope of work",
      slidesCount: "8~12 Slides",
      sampleKpi: "$340K Savings",
      framework: isKo ? "B2B 엔터프라이즈 솔루션 제안서" : "B2B Sales Proposal",
      accent: "from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400",
      themeBg: "#1a1207",
    },
    {
      id: "product-launch",
      cat: "sales",
      badge: "GTM Go-To-Market",
      title: isKo ? "신규 모바일 앱 론칭 및 글로벌 GTM 마케팅 전략" : "New Mobile Platform Launch & Global GTM Strategy",
      desc: isKo ? "타겟 오디언스, 획득 채널, 론칭 스프린트 일정 및 바이럴 루프 설계" : "Audience segmentation, acquisition loops, and phased rollout timeline",
      slidesCount: "8~12 Slides",
      sampleKpi: "50K Day-1 Beta",
      framework: isKo ? "신제품 론칭 & GTM 전략" : "Product Launch & GTM",
      accent: "from-violet-500/20 to-fuchsia-500/20 border-violet-500/30 text-violet-400",
      themeBg: "#140a24",
    },
    {
      id: "lecture-workshop",
      cat: "strategy",
      badge: "Masterclass & Keynote",
      title: isKo ? "실무자를 위한 AI 생산성 혁신 2시간 워크숍" : "Enterprise AI Productivity & Agentic Automation Keynote",
      desc: isKo ? "개념 정리 → 실습 가이드 → 핵심 요약 및 Q&A로 이어지는 교육형 덱" : "Theory-Practice-Takeaways-Q&A pedagogical lecture structure",
      slidesCount: "12~18 Slides",
      sampleKpi: "98% Satisfaction",
      framework: isKo ? "강의 & 워크숍 마스터클래스" : "Lecture & Workshop",
      accent: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-400",
      themeBg: "#08162b",
    },
  ];

  const filtered = activeCategory === "all"
    ? sampleDecks
    : sampleDecks.filter((d) => d.cat === activeCategory);

  return (
    <section id="frameworks-gallery" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="px-3.5 py-1 text-xs font-black uppercase tracking-wider rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30">
          {isKo ? "20+ 목적별 전문 프레임워크 갤러리" : "20+ PURPOSE-BUILT EXECUTIVE FRAMEWORKS"}
        </span>
        <h2 className="mt-4 text-3xl sm:text-5xl font-black text-white tracking-tight">
          {isKo ? (
            <>
              단순한 템플릿 복사가 아닙니다.<br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent">
                검증된 비즈니스 프레임워크
              </span>
              로 완성합니다
            </>
          ) : (
            <>
              Never Generic Templates.<br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent">
                Proven Executive Frameworks
              </span>
            </>
          )}
        </h2>
        <p className="mt-4 text-base text-slate-300">
          {isKo
            ? "투자 유치부터 이사회 보고, 엔터프라이즈 제안서까지 각 분야 최고 전문가들의 구조를 학습한 AI 엔진이 최적의 목차와 대본을 자동 렌더링합니다."
            : "From Y-Combinator seed decks to Fortune 500 QBRs. Each framework generates tailored slide layouts, metric cards, and presenter speech notes."}
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition border ${
              activeCategory === cat.id
                ? "bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-600/25"
                : "bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((deck) => (
          <div
            key={deck.id}
            className="group p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between hover:scale-[1.01] hover:shadow-2xl"
          >
            <div>
              {/* Badge & Meta */}
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border bg-gradient-to-r ${deck.accent}`}>
                  {deck.badge}
                </span>
                <span className="text-[11px] font-semibold text-slate-400">
                  {deck.slidesCount}
                </span>
              </div>

              {/* Title & Desc */}
              <h3 className="text-lg font-bold text-white group-hover:text-pink-400 transition leading-snug mb-2">
                {deck.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                {deck.desc}
              </p>

              {/* Mini Slide Mockup Preview */}
              <div
                className="w-full aspect-[16/9] rounded-2xl p-4 flex flex-col justify-between border border-white/10 mb-6 shadow-inner"
                style={{ backgroundColor: deck.themeBg }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black tracking-wider text-pink-400 uppercase">
                    HOOKDECK PRO
                  </span>
                  <span className="text-[9px] font-bold text-slate-400">
                    {deck.framework}
                  </span>
                </div>
                <div>
                  <div className="text-xs font-bold text-white truncate mb-1">
                    {deck.title}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-emerald-400">{deck.sampleKpi}</span>
                    <span className="text-[10px] text-slate-400">• Includes 1-Min Notes</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-medium">
                {isKo ? "🎙️ 스피커 노트 탑재 완료" : "🎙️ Speaker Notes Embedded"}
              </span>
              {onSelectTopic && (
                <button
                  type="button"
                  onClick={() => onSelectTopic(deck.title, deck.id)}
                  className="text-xs font-bold text-pink-400 hover:text-pink-300 flex items-center gap-1 group-hover:translate-x-0.5 transition"
                >
                  <span>{isKo ? "이 프레임워크로 생성" : "Use Framework"}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
