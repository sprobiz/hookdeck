"use client";

import { useState } from "react";
import PayPalButton from "./PayPalButton";
import { Check, Zap, Crown, Building2, ShieldCheck, Sparkles, CheckCircle2, ArrowRight, FileDown } from "lucide-react";
import { translations, Language } from "@/utils/translations";
import { UserPlan } from "@/types/deck";

interface PricingSectionProps {
  lang: Language;
  userPlan?: UserPlan;
  onPlanSelected?: (plan: UserPlan) => void;
}

export default function PricingSection({ lang, userPlan = "free", onPlanSelected }: PricingSectionProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>("pro");
  const [celebrationPlan, setCelebrationPlan] = useState<string | null>(null);
  const t = translations[lang].pricing;

  const plans = [
    {
      id: "single",
      name: t.singleName,
      price: "9.99",
      billingType: t.oneTime || "one-time",
      description: t.singleDesc,
      icon: FileDown,
      features: t.singleFeatures,
      popular: false,
      isSinglePass: true,
    },
    {
      id: "starter",
      name: t.starterName,
      price: "19",
      billingType: t.monthly,
      description: t.starterDesc,
      icon: Zap,
      features: t.starterFeatures,
      popular: false,
      isSinglePass: false,
    },
    {
      id: "pro",
      name: t.proName,
      price: "39",
      billingType: t.monthly,
      description: t.proDesc,
      icon: Crown,
      features: t.proFeatures,
      popular: true,
      isSinglePass: false,
    },
    {
      id: "agency",
      name: t.agencyName,
      price: "89",
      billingType: t.monthly,
      description: t.agencyDesc,
      icon: Building2,
      features: t.agencyFeatures,
      popular: false,
      isSinglePass: false,
    },
  ];

  const handlePaymentSuccess = (details: any, planId?: string) => {
    console.log("Payment Approved:", details, "Plan:", planId);
    const activePlan = (planId || selectedPlan || "pro") as UserPlan;
    if (typeof window !== "undefined") {
      localStorage.setItem("hookdeck_user_plan", activePlan);
    }
    setCelebrationPlan(activePlan);
    if (onPlanSelected) {
      onPlanSelected(activePlan);
    }
  };

  const closeCelebrationModal = () => {
    setCelebrationPlan(null);
    // 스튜디오 뷰어로 부드럽게 스크롤 이동
    const studioElem = document.getElementById("ai-studio");
    if (studioElem) {
      studioElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* 🎉 결제 완료 축하 모달 (Post-Payment Experience) */}
      {celebrationPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md p-8 rounded-3xl bg-slate-900 border-2 border-emerald-500 shadow-2xl shadow-emerald-500/20 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 animate-bounce">
              <Sparkles className="w-8 h-8" />
            </div>

            <span className="px-3 py-1 text-xs font-black uppercase rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {lang === "ko" ? "결제 승인 완료 • 즉시 활성화됨" : "PAYMENT CONFIRMED • ACTIVATED"}
            </span>

            <h3 className="mt-4 text-2xl font-black text-white">
              {lang === "ko"
                ? `🎉 축하합니다! ${celebrationPlan.toUpperCase()} 플랜 적용 완료`
                : `🎉 Congratulations! ${celebrationPlan.toUpperCase()} Plan Unlocked`}
            </h3>

            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              {lang === "ko"
                ? "모든 워터마크가 제거되었으며, 20+ 전문 프레임워크와 발표자 대본이 내장된 순정 .pptx 무제한 다운로드가 활성화되었습니다."
                : "All watermarks removed. Unlimited native .pptx exports with 20+ executive frameworks & embedded speaker notes are now ready."}
            </p>

            <div className="mt-6 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-left space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{lang === "ko" ? "100% 클린 슬라이드 (워터마크 완전 제거)" : "100% Clean Exports (Zero Watermark)"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{lang === "ko" ? "모든 장표 발표자 대본(Speaker Notes) 잠금 해제" : "Full Presenter Speech Notes Unlocked"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{lang === "ko" ? "원클릭 순정 파워포인트(.pptx) 저장" : "Instant Native .pptx Download"}</span>
              </div>
            </div>

            <button
              onClick={closeCelebrationModal}
              className="mt-6 w-full py-3.5 px-6 rounded-xl font-black text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:opacity-95 shadow-xl shadow-emerald-500/25 transition flex items-center justify-center gap-2"
            >
              <span>{lang === "ko" ? "스튜디오에서 프레젠테이션 제작하기" : "Open Studio & Build Decks"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="px-4 py-1.5 text-xs font-bold tracking-wider uppercase rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
          {t.badge}
        </span>
        <h2 className="mt-4 text-3xl sm:text-5xl font-black text-white tracking-tight">
          {t.title}
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
          {t.desc}
        </p>

        {/* 🚀 4단계 초고속 인스턴트 프로세스 안내 배너 */}
        <div className="mt-8 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-left">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="w-5 h-5 rounded-full bg-pink-500/20 text-pink-400 font-black flex items-center justify-center flex-shrink-0">1</span>
              <span className="text-slate-300">{lang === "ko" ? "결제 즉시 자동 활성화 (대기열 0초)" : "Instant Zero-Queue Activation"}</span>
            </div>
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="w-5 h-5 rounded-full bg-pink-500/20 text-pink-400 font-black flex items-center justify-center flex-shrink-0">2</span>
              <span className="text-slate-300">{lang === "ko" ? "워터마크 완전 제거 + 대본 탑재" : "100% Clean PPTX + Notes"}</span>
            </div>
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="w-5 h-5 rounded-full bg-pink-500/20 text-pink-400 font-black flex items-center justify-center flex-shrink-0">3</span>
              <span className="text-slate-300">{lang === "ko" ? "웹 실시간 수정 & 무제한 다운로드" : "Live Web Editing & Downloads"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isSelected = selectedPlan === plan.id;
          const isCurrentActive = userPlan === plan.id;

          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative flex flex-col justify-between p-7 rounded-3xl transition-all cursor-pointer ${
                isCurrentActive
                  ? "bg-gradient-to-b from-emerald-950/40 via-slate-900 to-slate-900 border-2 border-emerald-500 shadow-2xl shadow-emerald-500/20 md:scale-105 z-10"
                  : plan.popular
                  ? "bg-gradient-to-b from-blue-900/40 via-slate-900 to-slate-900 border-2 border-blue-500 shadow-2xl shadow-blue-500/20 md:scale-105 z-10"
                  : plan.isSinglePass
                  ? "bg-gradient-to-b from-pink-950/40 via-slate-900 to-slate-900 border-2 border-pink-500/60 shadow-xl shadow-pink-500/15"
                  : "bg-slate-900/80 border border-slate-800 hover:border-slate-700 shadow-lg"
              }`}
            >
              {isCurrentActive ? (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-black uppercase tracking-wider rounded-full shadow-md whitespace-nowrap">
                  {lang === "ko" ? "현재 이용 중인 플랜" : "CURRENT ACTIVE PLAN"}
                </div>
              ) : plan.popular ? (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-black uppercase tracking-wider rounded-full shadow-md whitespace-nowrap">
                  {t.popularBadge}
                </div>
              ) : plan.isSinglePass ? (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[11px] font-black uppercase tracking-wider rounded-full shadow-md whitespace-nowrap">
                  {t.singlePassBadge || "1-DECK PASS"}
                </div>
              ) : null}

              <div>
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-2xl border ${
                    plan.isSinglePass
                      ? "bg-pink-500/10 text-pink-400 border-pink-500/20"
                      : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                    plan.isSinglePass
                      ? "bg-pink-950/60 text-pink-300 border-pink-800/60"
                      : "bg-slate-800 text-slate-400 border-slate-700"
                  }`}>
                    {plan.billingType}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold text-white">{plan.name}</h3>
                <p className="mt-1 text-xs text-slate-400 min-h-[32px]">{plan.description}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                    ${plan.price}
                  </span>
                  <span className="text-sm font-semibold text-slate-400">{plan.billingType}</span>
                </div>

                <ul className="mt-8 space-y-3.5">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* PayPal 결제 버튼 영역 */}
              <div className="mt-8 pt-6 border-t border-slate-800">
                {isCurrentActive ? (
                  <div className="py-3 px-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-center text-xs font-bold text-emerald-400">
                    {lang === "ko" ? "✓ 플랜 멤버십 이용 중" : "✓ Active Subscription"}
                  </div>
                ) : isSelected ? (
                  <div>
                    <div className="text-[11px] text-center font-medium text-slate-400 mb-2 flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                      {t.paypalNotice}
                    </div>
                    <PayPalButton
                      planId={plan.id}
                      planName={plan.name}
                      amount={plan.price}
                      onSuccess={handlePaymentSuccess}
                    />
                  </div>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPlan(plan.id);
                    }}
                    className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 transition border border-slate-700"
                  >
                    {t.selectPlan}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
