"use client";

import { useState } from "react";
import PayPalButton from "./PayPalButton";
import { Check, Zap, Crown, Building2, ShieldCheck } from "lucide-react";
import { translations, Language } from "@/utils/translations";

interface PricingSectionProps {
  lang: Language;
  onPlanSelected?: (plan: string) => void;
}

export default function PricingSection({ lang, onPlanSelected }: PricingSectionProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>("pro");
  const [isSuccess, setIsSuccess] = useState(false);
  const t = translations[lang].pricing;

  const plans = [
    {
      id: "starter",
      name: t.starterName,
      price: "19",
      description: t.starterDesc,
      icon: Zap,
      features: t.starterFeatures,
      popular: false,
    },
    {
      id: "pro",
      name: t.proName,
      price: "39",
      description: t.proDesc,
      icon: Crown,
      features: t.proFeatures,
      popular: true,
    },
    {
      id: "agency",
      name: t.agencyName,
      price: "89",
      description: t.agencyDesc,
      icon: Building2,
      features: t.agencyFeatures,
      popular: false,
    },
  ];

  const handlePaymentSuccess = (details: any) => {
    console.log("Payment Approved:", details);
    setIsSuccess(true);
    if (onPlanSelected && selectedPlan) {
      onPlanSelected(selectedPlan);
    }
    alert(
      lang === "ko"
        ? `결제가 정상적으로 완료되었습니다! (${selectedPlan?.toUpperCase()} 플랜 활성화 완료)`
        : `Payment successful! Your ${selectedPlan?.toUpperCase()} plan is now active.`
    );
  };

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="px-4 py-1.5 text-xs font-bold tracking-wider uppercase rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
          {t.badge}
        </span>
        <h2 className="mt-4 text-3xl sm:text-5xl font-black text-white tracking-tight">
          {t.title}
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
          {t.desc}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isSelected = selectedPlan === plan.id;

          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative flex flex-col justify-between p-8 rounded-3xl transition-all cursor-pointer ${
                plan.popular
                  ? "bg-gradient-to-b from-blue-900/40 via-slate-900 to-slate-900 border-2 border-blue-500 shadow-2xl shadow-blue-500/20 md:scale-105 z-10"
                  : "bg-slate-900/80 border border-slate-800 hover:border-slate-700 shadow-lg"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-black uppercase tracking-wider rounded-full shadow-md whitespace-nowrap">
                  {t.popularBadge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                    Billed Monthly
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold text-white">{plan.name}</h3>
                <p className="mt-1 text-xs text-slate-400 min-h-[32px]">{plan.description}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                    ${plan.price}
                  </span>
                  <span className="text-sm font-semibold text-slate-400">{t.monthly}</span>
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
                {isSelected ? (
                  <div>
                    <div className="text-[11px] text-center font-medium text-slate-400 mb-2 flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                      {t.paypalNotice}
                    </div>
                    <PayPalButton
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

      {isSuccess && (
        <div className="mt-12 p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-center text-emerald-300 text-sm font-semibold">
          🎉 Payment confirmed! Your account now has full access to generate unlimited high-converting decks.
        </div>
      )}
    </section>
  );
}
