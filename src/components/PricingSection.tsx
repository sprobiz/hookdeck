"use client";

import { useState } from "react";
import PayPalButton from "./PayPalButton";
import { Check, Zap, Crown, Building2 } from "lucide-react";

interface PricingSectionProps {
  onPlanSelected?: (plan: string) => void;
}

export default function PricingSection({ onPlanSelected }: PricingSectionProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>("pro");
  const [isSuccess, setIsSuccess] = useState(false);

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: "19",
      description: "개인 창업자 및 발표가 간헐적인 실무자",
      icon: Zap,
      features: [
        "월 최대 20개 슬라이드 덱 생성",
        "클릭 1초 PPTX 파워포인트 파일 다운로드",
        "기본 비즈니스 테마 3종",
        "표준 속도 AI 처리 큐",
        "상업적 이용 라이선스 포함",
      ],
      popular: false,
    },
    {
      id: "pro",
      name: "Pro (추천 주력)",
      price: "39",
      description: "매주 보고서/제안서를 만드는 기획자, 강사, 컨설턴트",
      icon: Crown,
      features: [
        "월 최대 60개 슬라이드 덱 생성 (여유로운 한도)",
        "무제한 PPTX 파워포인트 다운로드",
        "프리미엄 4대 테마 (다크/미니멀/크리에이티브 등)",
        "지표 및 메트릭스(KPI) 자동 시각화 레이아웃",
        "초고속 VIP 전용 AI 생성 파이프라인",
        "24시간 우선 고객 지원",
      ],
      popular: true,
    },
    {
      id: "agency",
      name: "Agency",
      price: "89",
      description: "다수의 고객 제안서를 납품하는 외주사 및 전문 에이전시",
      icon: Building2,
      features: [
        "무제한(Unlimited) 슬라이드 덱 생성",
        "팀원 최대 5인 동시 접속 계정",
        "커스텀 브랜드 컬러/로고 워터마크 커스터마이징",
        "최우선 전용 GPU 슬롯 배정",
        "1:1 온보딩 및 전담 지원",
      ],
      popular: false,
    },
  ];

  const handlePaymentSuccess = (details: any) => {
    console.log("Payment Approved:", details);
    setIsSuccess(true);
    if (onPlanSelected && selectedPlan) {
      onPlanSelected(selectedPlan);
    }
    alert(`결제가 정상적으로 완료되었습니다! (${selectedPlan?.toUpperCase()} 플랜 활성화 완료)`);
  };

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="px-4 py-1.5 text-xs font-bold tracking-wider uppercase rounded-full bg-blue-100 text-blue-700">
          Transparent Pricing
        </span>
        <h2 className="mt-4 text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          무료 체험으로 낭비할 시간 없이,<br />
          <span className="text-blue-600">압도적인 시간 레버리지</span>를 즉시 누리세요
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-600">
          단 1건의 제안서 수주 또는 야근 1시간 절감만으로도 구독 비용 이상의 가치를 창출합니다.
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
                  ? "bg-gradient-to-b from-blue-50/70 to-white border-2 border-blue-600 shadow-xl shadow-blue-500/10 scale-105 z-10"
                  : "bg-white border border-slate-200 hover:border-slate-300 shadow-sm"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-xs font-black uppercase tracking-wider rounded-full shadow-md">
                  Most Popular · 베스트 초이스
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-600">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    월간 구독
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900">{plan.name}</h3>
                <p className="mt-1 text-xs text-slate-500 min-h-[32px]">{plan.description}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-slate-900">
                    ${plan.price}
                  </span>
                  <span className="text-sm font-semibold text-slate-500">/ 월</span>
                </div>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* PayPal 결제 버튼 영역 */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                {isSelected ? (
                  <div>
                    <div className="text-xs text-center font-medium text-slate-500 mb-2">
                      PayPal Live 즉시 안전 결제
                    </div>
                    <PayPalButton
                      planName={plan.name}
                      amount={plan.price}
                      onSuccess={handlePaymentSuccess}
                    />
                  </div>
                ) : (
                  <button
                    onClick={() => setSelectedPlan(plan.id)}
                    className="w-full py-3 px-4 rounded-xl text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
                  >
                    이 플랜 선택하기
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {isSuccess && (
        <div className="mt-12 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center text-emerald-800 text-sm font-semibold">
          🎉 결제가 확인되었습니다! 이제 상단 입력창에서 무제한 고품질 슬라이드를 생성해 보세요.
        </div>
      )}
    </section>
  );
}
