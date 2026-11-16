import { DeckRequest, DeckResponse, SlideItem } from "@/types/deck";

export function generateSmartDeck(req: DeckRequest): DeckResponse {
  const isKo = req.language === "ko";
  const count = req.slideCount || 6;
  const userTopic = req.topic.trim();

  if (isKo) {
    const slides: SlideItem[] = [
      {
        id: 1,
        slideNumber: 1,
        title: userTopic,
        subtitle: "전략적 사업 기획 및 실행 마스터플랜",
        layout: "title",
        content: ["기획 및 분석: HookDeck PRO", "발표 일자: 2026. 11"],
      },
      {
        id: 2,
        slideNumber: 2,
        title: "1. 시장 기회 및 핵심 과제 분석",
        subtitle: `Market Opportunity for "${userTopic}"`,
        layout: "bullets",
        content: [
          `'${userTopic}' 분야의 폭발적인 시장 수요 급증 및 니즈 다변화`,
          "기존 솔루션의 높은 비용 구조와 느린 실행 속도로 인한 시장 진입 장벽",
          "경량화된 디지털 자동화 솔루션 도입을 통한 초기 시장 선점 기회",
        ],
      },
      {
        id: 3,
        slideNumber: 3,
        title: "2. 기대 성과 및 핵심 목표 지표 (KPI)",
        subtitle: "Key Performance Indicators",
        layout: "metrics",
        content: [],
        metrics: [
          { label: "업무 생산성 향상", value: "+380%" },
          { label: "운영 비용 절감율", value: "85%" },
          { label: "목표 손익분기점", value: "3개월 내" },
        ],
      },
      {
        id: 4,
        slideNumber: 4,
        title: "3. 차별화 전략 및 비즈니스 모델",
        subtitle: "Unique Value Proposition & Moat",
        layout: "bullets",
        content: [
          "경쟁사 대비 10배 빠른 Time-to-Value(가치 제공 소요시간) 구현",
          "초저비용 고효율 구조 설계를 통한 보수적 안전마진 85% 이상 확보",
          "글로벌(PayPal/카드) 결제 기반 확장성 및 클라우드 무중단 24시간 가동",
        ],
      },
      {
        id: 5,
        slideNumber: 5,
        title: "4. 단계별 실행 로드맵 (Action Plan)",
        subtitle: "Execution & Scaling Milestones",
        layout: "bullets",
        content: [
          "Phase 1: 핵심 타깃 고객 100명 온보딩 및 빠른 시장 피드백 수렴",
          "Phase 2: 전환율 극대화 마케팅 파이프라인 가동 및 정기 구독 유치",
          "Phase 3: B2B 제휴 및 글로벌 시장 확장 가속화",
        ],
      },
      {
        id: 6,
        slideNumber: 6,
        title: "5. 결론 및 향후 계획 (Next Steps)",
        subtitle: "Summary & Action Items",
        layout: "bullets",
        content: [
          `'${userTopic}' 프로젝트의 실현 가능성 및 압도적 마진 구조 검증 완료`,
          "즉각적인 실행을 위한 파트너십 구축 및 리소스 배분 진행",
          "문의 및 제휴: contact@s-probiz.com | Powered by HookDeck PRO",
        ],
      },
      {
        id: 7,
        slideNumber: 7,
        title: "6. 재무 추정 및 예상 수익성",
        subtitle: "Financial Projections",
        layout: "metrics",
        content: [],
        metrics: [
          { label: "1차년도 예상 MRR", value: "$30K+" },
          { label: "목표 영업이익률", value: "85%" },
          { label: "고객 생애 가치(LTV)", value: "$450" },
        ],
      },
      {
        id: 8,
        slideNumber: 8,
        title: "7. 리스크 관리 및 대응 방안",
        subtitle: "Risk Mitigation Strategy",
        layout: "bullets",
        content: [
          "기술 의존도 리스크: 멀티 벤더 및 서버리스 엣지 아키텍처로 무중단 운영",
          "마케팅 리스크: 고전환 랜딩페이지 및 오가닉 바이럴 루프 구축",
          "규제/결제 리스크: 글로벌 공식 표준 결제(PayPal) 단일 체제로 안전성 확보",
        ],
      },
      {
        id: 9,
        slideNumber: 9,
        title: "8. 조직 역량 및 실행 체계",
        subtitle: "Team & Execution Capabilities",
        layout: "bullets",
        content: [
          "기획-개발-배포-마케팅 원스톱 실행 능력을 갖춘 린(Lean) 1인 법인 모델",
          "초기 고정비 제로화 원칙을 통한 철저한 흑자 경영 유지",
          "데이터 기반 빠른 A/B 테스트 및 주간 단위 기능 고도화",
        ],
      },
      {
        id: 10,
        slideNumber: 10,
        title: "9. Q&A 및 연락처",
        subtitle: "Thank You",
        layout: "title",
        content: [
          `감사합니다. '${userTopic}' 발표를 마칩니다.`,
          "Contact: contact@s-probiz.com | HookDeck PRO",
        ],
      },
    ];

    return {
      title: `${userTopic} 전략 기획서`,
      description: `HookDeck PRO 엔진으로 기획된 ${userTopic} 프레젠테이션`,
      slides: slides.slice(0, count),
    };
  }

  // English Mode
  const slides: SlideItem[] = [
    {
      id: 1,
      slideNumber: 1,
      title: userTopic,
      subtitle: "Strategic Masterplan & Execution Roadmap",
      layout: "title",
      content: ["Architected with HookDeck PRO", "November 2026"],
    },
    {
      id: 2,
      slideNumber: 2,
      title: "1. Market Challenge & Opportunity",
      subtitle: `Key Drivers for "${userTopic}"`,
      layout: "bullets",
      content: [
        `Surging global demand and fragmented market landscape in '${userTopic}'`,
        "Incumbent solutions suffering from sluggish delivery and heavy cost structures",
        "Clear blue-ocean advantage via agile, lightweight automation systems",
      ],
    },
    {
      id: 3,
      slideNumber: 3,
      title: "2. Key Growth & Performance Metrics",
      subtitle: "Target KPI Milestones",
      layout: "metrics",
      content: [],
      metrics: [
        { label: "Productivity Gain", value: "+380%" },
        { label: "Cost Reduction", value: "85%" },
        { label: "Payback Period", value: "< 90 Days" },
      ],
    },
    {
      id: 4,
      slideNumber: 4,
      title: "3. Competitive Advantage & Unit Economics",
      subtitle: "Why We Win",
      layout: "bullets",
      content: [
        "10x faster time-to-value compared to legacy manual workflows",
        "Zero-maintenance serverless architecture locking in 85%+ net operating margins",
        "Frictionless global checkout via official PayPal Live integration",
      ],
    },
    {
      id: 5,
      slideNumber: 5,
      title: "4. Execution & Scaling Roadmap",
      subtitle: "From Validation to Scale",
      layout: "bullets",
      content: [
        "Milestone 1: Production launch and initial 100 paying customers onboarding",
        "Milestone 2: Automated recurring subscription scaling & referral loops",
        "Milestone 3: Strategic B2B licensing & enterprise agency accounts",
      ],
    },
    {
      id: 6,
      slideNumber: 6,
      title: "5. Conclusion & Actionable Next Steps",
      subtitle: "Summary & Action Items",
      layout: "bullets",
      content: [
        `Feasibility and unit economics for '${userTopic}' fully validated`,
        "Immediate execution focus on distribution and paying customer acquisition",
        "Inquiries: contact@s-probiz.com | Powered by HookDeck PRO",
      ],
    },
    {
      id: 7,
      slideNumber: 7,
      title: "6. Financial Outlook & Projections",
      subtitle: "Financial Projections",
      layout: "metrics",
      content: [],
      metrics: [
        { label: "Target Year 1 MRR", value: "$30K+" },
        { label: "Target Net Margin", value: "85%" },
        { label: "Customer LTV", value: "$450" },
      ],
    },
    {
      id: 8,
      slideNumber: 8,
      title: "7. Strategic Risk Mitigation",
      subtitle: "Risk Management",
      layout: "bullets",
      content: [
        "Tech Risk: Serverless edge fallback ensuring zero system downtime",
        "Marketing Risk: High-converting psychological hooks & organic viral loops",
        "Billing Risk: Single PayPal standard infrastructure protecting transactions",
      ],
    },
    {
      id: 9,
      slideNumber: 9,
      title: "8. Operational Agility",
      subtitle: "Team & Execution Capabilities",
      layout: "bullets",
      content: [
        "Lean single-operator corporate structure optimizing speed and capital efficiency",
        "Zero fixed server overhead guaranteeing profitability from Day 1",
        "Data-driven weekly iteration cycle based on live user feedback",
      ],
    },
    {
      id: 10,
      slideNumber: 10,
      title: "9. Q&A & Contact",
      subtitle: "Thank You",
      layout: "title",
      content: [
        `Thank you for your attention on '${userTopic}'.`,
        "Contact: contact@s-probiz.com | HookDeck PRO",
      ],
    },
  ];

  return {
    title: `${userTopic} - Executive Deck`,
    description: `Executive presentation generated for ${userTopic}`,
    slides: slides.slice(0, count),
  };
}
