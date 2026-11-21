"use client";

import { useState } from "react";
import { Mic, CheckCircle2, Monitor, FileText, ArrowRight, Sparkles, Volume2, ShieldCheck, ChevronRight } from "lucide-react";
import { Language } from "@/utils/translations";

interface SpeakerNotesShowcaseProps {
  lang: Language;
}

export default function SpeakerNotesShowcase({ lang }: SpeakerNotesShowcaseProps) {
  const isKo = lang === "ko";
  const [activeSlide, setActiveSlide] = useState(0);

  const demoSlides = [
    {
      tab: isKo ? "슬라이드 1: 핵심 문제 제기" : "Slide 1: Core Problem",
      title: isKo ? "전 세계 B2B 세일즈의 73%가 '준비되지 않은 발표'로 결렬됩니다" : "73% of B2B Enterprise Pitches Fail Due to Poor Delivery",
      subtitle: isKo ? "슬라이드 디자인보다 중요한 것은 발표자가 말하는 1분의 스토리텔링입니다" : "It's never just the slides. It's the 60-second narrative in the room.",
      kpis: [
        { label: isKo ? "미팅 이탈률" : "Pitch Churn", value: "73%", color: "text-rose-400" },
        { label: isKo ? "소요 시간" : "Avg Prep Time", value: "4.8 hrs", color: "text-amber-400" },
        { label: isKo ? "HookDeck 대안" : "With HookDeck", value: "45 sec", color: "text-emerald-400" },
      ],
      notes: isKo
        ? "🎙️ [1분 발표 스크립트 - 파워포인트 비고란 실제 탑재 내용]\n\"안녕하십니까 심사위원 및 파트너 여러분. 오늘 프레젠테이션의 핵심은 '준비되지 않은 발표를 어떻게 45초 만에 완벽한 비즈니스 딜로 전환하는가'입니다. 슬라이드를 보시다시피 기존 팀들은 장표 디자인에만 5시간을 쓰고 정작 발표장에서는 무슨 말을 해야 할지 몰라 계약을 놓쳤습니다. HookDeck은 장표뿐만 아니라 발표자가 지금 읽고 계시는 이 1분 대본까지 완벽히 제공합니다.\""
        : "🎙️ [1-Min Speech Script - Pre-loaded in PowerPoint Notes Section]\n\"Good morning everyone. Today’s presentation is not just about making slides—it’s about closing high-stakes enterprise deals. As you see on the screen, 73% of pitches fail not because the product is bad, but because the speaker loses momentum in the first 60 seconds. HookDeck solves both: the high-impact visual deck and the exact presenter cues I am reading right now.\"",
    },
    {
      tab: isKo ? "슬라이드 2: 성장 지표 (KPI)" : "Slide 2: Traction & ARR",
      title: isKo ? "출시 3분기 만에 연간 반복 매출(ARR) $4.2M 돌파" : "Surpassing $4.2M ARR in 3 Quarters Post-Launch",
      subtitle: isKo ? "순수 바이럴 및 고효율 B2B 레퍼런스를 통한 폭발적 확장" : "Hyper-growth driven by organic product-led loops and enterprise adoption",
      kpis: [
        { label: isKo ? "전년 대비 성장률" : "YoY Growth", value: "+380%", color: "text-emerald-400" },
        { label: isKo ? "순매출 유지율" : "NDR Rate", value: "138%", color: "text-pink-400" },
        { label: isKo ? "고객 획득 비용" : "CAC Payback", value: "< 2.4 mo", color: "text-cyan-400" },
      ],
      notes: isKo
        ? "🎙️ [1분 발표 스크립트 - 파워포인트 비고란 실제 탑재 내용]\n\"2번 슬라이드로 넘어가겠습니다. 여기 380%라는 숫자가 보이실 겁니다. 이는 단순한 웹 트래픽이 아닌, 실 결제 고객들의 연간 반복 매출 성장률입니다. 특히 고객 획득 비용(CAC) 회수 기간이 2.4개월 미만으로 떨어졌다는 것은, 투자금을 투입하는 즉시 이익이 회수되는 견고한 현금 창출 머신이 완성되었음을 의미합니다.\""
        : "🎙️ [1-Min Speech Script - Pre-loaded in PowerPoint Notes Section]\n\"Moving to slide two. Notice the 380% ARR acceleration. This isn't vanity traffic; it's high-retention corporate accounts. With our CAC payback compressed under 2.4 months, every dollar of capital injected turns directly into self-sustaining cash flow without burning runway.\"",
    },
    {
      tab: isKo ? "슬라이드 3: 투자 유치 제안" : "Slide 3: The Ask & Call-to-Action",
      title: isKo ? "Series-A $5M 투자 유치: 글로벌 시장 석권을 위한 파트너십" : "$5M Series-A Ask: Accelerating Global Distribution",
      subtitle: isKo ? "북미 및 아시아 엔터프라이즈 세일즈망 구축과 차세대 AI 파이프라인 확장" : "Expanding enterprise sales infrastructure across North America & APAC",
      kpis: [
        { label: isKo ? "유치 희망 금액" : "Target Round", value: "$5.0M", color: "text-pink-400" },
        { label: isKo ? "런웨이 확보" : "Runway Target", value: "24 Months", color: "text-indigo-400" },
        { label: isKo ? "목표 기업가치" : "Target Cap", value: "$35M", color: "text-emerald-400" },
      ],
      notes: isKo
        ? "🎙️ [1분 발표 스크립트 - 파워포인트 비고란 실제 탑재 내용]\n\"마지막으로 이번 라운드의 제안입니다. 저희는 24개월의 안정적인 런웨이를 확보하고 글로벌 세일즈 파이프라인을 3배로 확장하기 위해 500만 달러 규모의 시리즈 A 라운드를 진행합니다. 오늘 발표를 들으신 심사역님들과 함께 다음 유니콘으로 도약하길 기대합니다. 경청해 주셔서 감사합니다. 질의응답 받겠습니다.\""
        : "🎙️ [1-Min Speech Script - Pre-loaded in PowerPoint Notes Section]\n\"To conclude: we are raising a $5M Series-A to fund our enterprise expansion and secure a 24-month operational runway. We invite you to join us in defining the future of presentation AI. Thank you for your time, and I am now open to your questions.\"",
    },
  ];

  const current = demoSlides[activeSlide];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-400 text-xs font-black uppercase tracking-wider mb-4 shadow-lg shadow-pink-500/10">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isKo ? "경쟁 툴(Gamma, Canva)에는 없는 독보적 1등 기능" : "THE UNFAIR ADVANTAGE VS GAMMA & CANVA"}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          {isKo ? (
            <>
              파워포인트 <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-indigo-400 bg-clip-text text-transparent">비고란(Speaker Notes)</span>에<br />
              장표별 1분 발표 대본이 통째로 들어있습니다
            </>
          ) : (
            <>
              Full 1-Min Speech Scripts Embedded in Every<br />
              <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-indigo-400 bg-clip-text text-transparent">PowerPoint Speaker Notes Section</span>
            </>
          )}
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
          {isKo
            ? "슬라이드만 예쁘면 뭐 하나요? 발표장에서 떨리지 않도록, 장표마다 말해야 할 핵심 멘트를 AI가 대신 기획하여 순정 .pptx 파일 비고란에 영구 삽입해 드립니다."
            : "Other tools only give you pretty slides. HookDeck gives you the exact words to speak. Download native .pptx and open Presenter View—your speech cues are already there."}
        </p>
      </div>

      {/* Interactive Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
        {demoSlides.map((slide, idx) => (
          <button
            key={idx}
            onClick={() => setActiveSlide(idx)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 border ${
              activeSlide === idx
                ? "bg-pink-500 text-white border-pink-400 shadow-lg shadow-pink-500/25"
                : "bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700"
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${activeSlide === idx ? "bg-white animate-pulse" : "bg-slate-600"}`} />
            <span>{slide.tab}</span>
          </button>
        ))}
      </div>

      {/* Main Interactive Comparison UI Frame */}
      <div className="max-w-5xl mx-auto rounded-3xl bg-slate-950 border-2 border-slate-800 shadow-2xl overflow-hidden">
        {/* Top OS Window Bar */}
        <div className="px-6 py-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-3 text-xs font-semibold text-slate-400 hidden sm:inline">
              Microsoft PowerPoint™ — Presenter View Dual Display (Native .pptx)
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/20">
            <Monitor className="w-3.5 h-3.5" />
            <span>{isKo ? "듀얼 모니터 발표자 보기 연동" : "Dual Presenter View"}</span>
          </div>
        </div>

        {/* Dual Window Grid: Screen vs Presenter Speech Notes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
          {/* Left: What Audience Sees (Slide Screen) */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-[#0b1021] to-[#070b14]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded bg-slate-800 text-slate-300">
                  {isKo ? "청중에게 보이는 화면 (16:9 HD)" : "AUDIENCE PROJECTOR VIEW"}
                </span>
                <span className="text-xs font-bold text-pink-400">HookDeck PRO Engine</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white leading-snug mb-2">
                {current.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6">
                {current.subtitle}
              </p>

              {/* KPI metrics row */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {current.kpis.map((kpi, kIdx) => (
                  <div key={kIdx} className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80">
                    <div className={`text-xl sm:text-2xl font-black ${kpi.color}`}>
                      {kpi.value}
                    </div>
                    <div className="text-[11px] font-semibold text-slate-400 mt-0.5">
                      {kpi.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800/60 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{isKo ? "순정 파워포인트 호환 100%" : "100% Native PowerPoint (.pptx)"}</span>
              </span>
              <span className="text-slate-400 font-mono">16:9 Widescreen</span>
            </div>
          </div>

          {/* Right: What You (Presenter) See in PowerPoint Notes Section */}
          <div className="lg:col-span-5 p-6 sm:p-8 bg-[#0d1428] flex flex-col justify-between relative">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                  <Mic className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
                  <span>{isKo ? "발표자만 보는 비고란 대본" : "PRESENTER SPEECH SCRIPT"}</span>
                </span>
                <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>~60s Speech</span>
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-pink-500/30 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-line shadow-inner">
                {current.notes}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="text-slate-300 font-medium">
                {isKo ? "💡 다운로드한 .pptx 열고 '발표자 보기' 누르면 끝" : "💡 Open .pptx & press 'Presenter View'"}
              </span>
              <span className="font-bold text-pink-400">Instant Sync</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature comparison mini banner */}
      <div className="mt-8 max-w-4xl mx-auto p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-400 font-black">VS Gamma / Canva</span>
          <span>{isKo ? "기존 툴은 슬라이드 디자인만 제공 → 발표자는 여전히 무슨 말을 할지 불안함" : "Standard AI tools only generate visual slides, leaving presenters anxious."}</span>
        </div>
        <div className="flex items-center gap-2 font-bold text-emerald-400 whitespace-nowrap">
          <CheckCircle2 className="w-4 h-4" />
          <span>{isKo ? "HookDeck: 발표 장표 + 1분 대본 동시 완성" : "HookDeck: Slides + 1-Min Speech Notes"}</span>
        </div>
      </div>
    </section>
  );
}
