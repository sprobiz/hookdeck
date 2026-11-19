"use client";

import { useState } from "react";
import { Check, Sparkles, Mic, Palette } from "lucide-react";
import { THEMES_LIST, ThemePreset } from "@/utils/themes";
import { Language } from "@/utils/translations";

interface ThemeShowcaseProps {
  selectedThemeId: string;
  onSelectTheme: (themeId: string) => void;
  lang: Language;
}

export default function ThemeShowcase({
  selectedThemeId,
  onSelectTheme,
  lang,
}: ThemeShowcaseProps) {
  // 대표 6가지 시각적 핵심 테마 선정
  const showcaseThemeIds = [
    "dark-tech",
    "wall-street",
    "swiss-minimal",
    "cyberpunk",
    "luxury-gold",
    "deep-indigo",
  ];

  const featuredThemes = showcaseThemeIds
    .map((id) => THEMES_LIST.find((th) => th.id === id))
    .filter(Boolean) as ThemePreset[];

  return (
    <div className="w-full my-4">
      <div className="flex items-center justify-between mb-2.5">
        <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-pink-400" />
          <span>{lang === "ko" ? "대표 비주얼 테마 실시간 미리보기 (Visual Themes)" : "Executive Visual Theme Showcase"}</span>
        </label>
        <span className="text-[11px] text-pink-400 font-semibold hidden sm:inline">
          {lang === "ko" ? "원클릭으로 즉시 스타일 적용" : "Click card to select"}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {featuredThemes.map((theme) => {
          const isSelected = selectedThemeId === theme.id;

          return (
            <div
              key={theme.id}
              onClick={() => onSelectTheme(theme.id)}
              className={`group relative flex flex-col justify-between p-3 rounded-2xl cursor-pointer transition-all duration-200 border text-left ${
                isSelected
                  ? "ring-2 ring-pink-500 border-pink-500 shadow-lg shadow-pink-500/20 scale-[1.02]"
                  : "border-slate-800 bg-slate-900/90 hover:border-slate-700 hover:scale-[1.01]"
              }`}
            >
              {/* 테마 헤더 정보 */}
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-[11px] font-bold text-slate-200 truncate group-hover:text-pink-400 transition">
                  {lang === "ko" ? theme.nameKo.split(" (")[0] : theme.nameEn.split(" (")[0]}
                </span>
                {isSelected ? (
                  <span className="w-4 h-4 rounded-full bg-pink-500 flex items-center justify-center text-white flex-shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                ) : (
                  <span
                    className="w-3 h-3 rounded-full border border-white/20 flex-shrink-0"
                    style={{ backgroundColor: `#${theme.accent}` }}
                  />
                )}
              </div>

              {/* 실제 미니 슬라이드 캔버스 시각적 프리뷰 */}
              <div
                className="w-full aspect-[16/10] rounded-xl p-2.5 flex flex-col justify-between border shadow-inner transition-transform"
                style={{
                  backgroundColor: `#${theme.bg}`,
                  borderColor: `#${theme.cardBg}`,
                }}
              >
                {/* 상단 미니 배지 & 액센트 라인 */}
                <div className="flex items-center justify-between">
                  <span
                    className="text-[8px] font-bold px-1.5 py-0.5 rounded"
                    style={{
                      backgroundColor: `#${theme.cardBg}`,
                      color: `#${theme.accent}`,
                    }}
                  >
                    HOOKDECK
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `#${theme.accent}` }} />
                </div>

                {/* 슬라이드 가상 타이틀 & 콘텐트 바 */}
                <div className="my-auto space-y-1">
                  <div
                    className="text-[10px] font-extrabold truncate leading-tight"
                    style={{ color: `#${theme.title}` }}
                  >
                    AI Deck Architecture
                  </div>
                  <div className="space-y-0.5">
                    <div
                      className="w-11/12 h-1 rounded-full opacity-80"
                      style={{ backgroundColor: `#${theme.text}` }}
                    />
                    <div
                      className="w-3/4 h-1 rounded-full opacity-60"
                      style={{ backgroundColor: `#${theme.text}` }}
                    />
                  </div>
                </div>

                {/* 하단 미니 메트릭 & 스피커 노트 인디케이터 */}
                <div
                  className="flex items-center justify-between pt-1 border-t text-[7px]"
                  style={{
                    borderColor: `#${theme.cardBg}`,
                    color: `#${theme.text}`,
                  }}
                >
                  <div className="flex items-center gap-0.5" style={{ color: `#${theme.accent}` }}>
                    <Mic className="w-2 h-2" />
                    <span>Notes</span>
                  </div>
                  <span style={{ color: `#${theme.accent}` }}>+450% ARR</span>
                </div>
              </div>

              {/* 하단 컬러 팔레트 칩 표시 */}
              <div className="mt-2 flex items-center justify-between text-[9px] text-slate-400">
                <span className="font-mono uppercase opacity-75">#{theme.bg}</span>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: `#${theme.title}` }} />
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: `#${theme.accent}` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
