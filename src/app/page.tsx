"use client";

import { useState } from "react";
import { Sparkles, Layers, Sliders, Globe, ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import SlideViewer from "@/components/SlideViewer";
import PricingSection from "@/components/PricingSection";
import { DeckResponse } from "@/types/deck";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [slideCount, setSlideCount] = useState(6);
  const [language, setLanguage] = useState<"ko" | "en">("ko");
  const [style, setStyle] = useState<"minimal" | "corporate" | "creative" | "dark">("minimal");
  const [loading, setLoading] = useState(false);
  const [deck, setDeck] = useState<DeckResponse | null>(null);

  const sampleTopics = [
    "2026 AI 에이전트 시장 전망 및 B2B 사업 제안서",
    "스타트업 시드 투자 유치를 위한 10분 피치덱 (IR Deck)",
    "친환경 모빌리티 배터리 재활용 사업 타당성 분석",
    "B2B SaaS 기업을 위한 고객 획득(CAC) 최적화 전략",
  ];

  const handleGenerate = async (selectedTopic?: string) => {
    const targetTopic = selectedTopic || topic;
    if (!targetTopic.trim()) {
      alert("발표 주제나 내용을 입력해 주세요!");
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
          language,
          style,
        }),
      });

      if (!res.ok) {
        throw new Error("슬라이드 생성 실패");
      }

      const data = await res.json();
      setDeck(data);
      // 생성 완료 시 뷰어 위치로 부드럽게 스크롤
      setTimeout(() => {
        const viewer = document.getElementById("viewer-section");
        if (viewer) viewer.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err: any) {
      console.error(err);
      alert("슬라이드 생성 중 오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* 글로벌 네비게이션 헤더 */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 font-black">
              M
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-lg tracking-tight">MagicDeck</span>
              <span className="text-blue-600 font-extrabold text-lg">.ai</span>
            </div>
            <span className="ml-2 px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-blue-50 text-blue-600 border border-blue-100">
              v2.0 PRO
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setLanguage((prev) => (prev === "ko" ? "en" : "ko"))}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
            >
              <Globe className="w-3.5 h-3.5" />
              {language === "ko" ? "🇰🇷 한국어" : "🇺🇸 English"}
            </button>
            <a
              href="#pricing"
              className="px-4 py-2 text-xs font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition"
            >
              구독 요금제 보기
            </a>
          </div>
        </div>
      </header>

      {/* 메인 히어로 섹션 */}
      <main className="flex-1">
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            야근 없는 10배 생산성 · 3시간 걸리던 PPT를 45초 만에
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            아이디어 한 줄로 완성하는<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500">
              고품질 비즈니스 슬라이드 덱
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            프롬프트를 입력하면 Gemini 엔진이 목차부터 본문 카피, 핵심 지표까지 완전 자동 기획하고
            <strong> 즉시 수정 가능한 순정 파워포인트(.pptx) 파일</strong>로 다운로드해 드립니다.
          </p>

          {/* 메인 생성기 대화형 카드 */}
          <div className="mt-10 p-4 sm:p-6 bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/50 text-left">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              발표 주제 또는 기획안 개요 입력
            </label>
            <textarea
              rows={3}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="예: 2026 생성형 AI B2B 솔루션 시장 진입 전략 및 분기별 매출 로드맵"
              className="w-full p-4 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none text-slate-800 text-sm sm:text-base resize-none transition"
            />

            {/* 샘플 추천 토픽 칩 */}
            <div className="mt-3 flex flex-wrap gap-2 items-center">
              <span className="text-xs text-slate-400 font-medium">추천 주제:</span>
              {sampleTopics.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTopic(item);
                    handleGenerate(item);
                  }}
                  className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition truncate max-w-[220px]"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* 세부 옵션 컨트롤러 */}
            <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-blue-600" /> 슬라이드 장수
                </label>
                <select
                  value={slideCount}
                  onChange={(e) => setSlideCount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 bg-white outline-none focus:border-blue-500"
                >
                  <option value={4}>4장 (간단 요약)</option>
                  <option value={6}>6장 (핵심 표준 덱)</option>
                  <option value={8}>8장 (상세 비즈니스 덱)</option>
                  <option value={10}>10장 (풀 패키지 IR 덱)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 flex items-center gap-1">
                  <Sliders className="w-3.5 h-3.5 text-blue-600" /> 디자인 테마
                </label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 bg-white outline-none focus:border-blue-500"
                >
                  <option value="minimal">모던 미니멀 (화이트/블루)</option>
                  <option value="corporate">코퍼레이트 (그레이/로열)</option>
                  <option value="dark">다크 테크 (슬레이트 블랙)</option>
                  <option value="creative">크리에이티브 (웜 앰버)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-blue-600" /> 출력 언어
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 bg-white outline-none focus:border-blue-500"
                >
                  <option value="ko">한국어 (Korean)</option>
                  <option value="en">English (글로벌 영문)</option>
                </select>
              </div>
            </div>

            {/* 생성 CTA 버튼 */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>서버리스 초고속 엔진 가동 중 (평균 3초 소요)</span>
              </div>

              <button
                disabled={loading}
                onClick={() => handleGenerate()}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 disabled:opacity-50 transition"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>AI 슬라이드 기획 및 렌더링 중...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>원클릭 AI 슬라이드 덱 생성</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* 생성된 슬라이드 뷰어 섹션 */}
        {deck && (
          <section id="viewer-section" className="py-12 bg-slate-100/60 border-y border-slate-200 px-4">
            <SlideViewer slides={deck.slides} deckTitle={deck.title} style={style} />
          </section>
        )}

        {/* 소셜 프루프 & 신뢰 지표 */}
        <section className="py-12 bg-white border-b border-slate-200 text-center">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-black text-slate-900">45초</div>
              <div className="text-xs text-slate-500 mt-1 font-medium">평균 슬라이드 완성 속도</div>
            </div>
            <div>
              <div className="text-3xl font-black text-blue-600">100%</div>
              <div className="text-xs text-slate-500 mt-1 font-medium">순정 .pptx 파워포인트 호환</div>
            </div>
            <div>
              <div className="text-3xl font-black text-slate-900">85%+</div>
              <div className="text-xs text-slate-500 mt-1 font-medium">문서 작성 소요시간 절감</div>
            </div>
            <div>
              <div className="text-3xl font-black text-emerald-600">365일 24h</div>
              <div className="text-xs text-slate-500 mt-1 font-medium">무중단 클라우드 서버리스 가동</div>
            </div>
          </div>
        </section>

        {/* 요금제 섹션 */}
        <PricingSection />
      </main>

      {/* 풋터 */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
              M
            </div>
            <span className="font-bold text-slate-200 text-sm">MagicDeck AI</span>
            <span>© 2026 S-Probiz Inc. All rights reserved.</span>
          </div>

          <div className="flex gap-6">
            <a href="#pricing" className="hover:text-white transition">요금제</a>
            <a href="#" className="hover:text-white transition">이용약관</a>
            <a href="#" className="hover:text-white transition">개인정보처리방침</a>
            <a href="mailto:contact@s-probiz.com" className="hover:text-white transition">제휴/지원 문의</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
