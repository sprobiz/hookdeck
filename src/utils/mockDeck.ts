import { DeckRequest, DeckResponse, SlideItem } from "@/types/deck";

export function generateMockDeck(req: DeckRequest): DeckResponse {
  const isKo = req.language === "ko";
  const count = req.slideCount || 6;

  if (isKo) {
    const slides: SlideItem[] = [
      {
        id: 1,
        slideNumber: 1,
        title: req.topic,
        subtitle: "AI 기반 시장 분석 및 실행 전략 프레젠테이션",
        layout: "title",
        content: ["작성자: S-Probiz AI Deck Builder", "일자: 2026. 11"],
      },
      {
        id: 2,
        slideNumber: 2,
        title: "1. 시장 현황 및 핵심 문제 정의",
        subtitle: "Current Landscape & Pain Points",
        layout: "bullets",
        content: [
          "기존 시장 플레이어들의 비효율적인 수작업 프로세스로 인한 시간/비용 낭비 심화",
          "고객 니즈는 급변하나 제품 및 서비스 업데이트 주기 지연",
          "자동화 솔루션 도입을 통한 생산성 10배 혁신 기회 포착",
        ],
      },
      {
        id: 3,
        slideNumber: 3,
        title: "2. 핵심 성장 지표 및 성과",
        subtitle: "Key Performance Metrics",
        layout: "metrics",
        content: [],
        metrics: [
          { label: "예상 생산성 향상", value: "+350%" },
          { label: "시간 절감 효과", value: "85%" },
          { label: "ROI 달성 기간", value: "< 3개월" },
        ],
      },
      {
        id: 4,
        slideNumber: 4,
        title: "3. 차별화 솔루션 아키텍처",
        subtitle: "Competitive Moat & Architecture",
        layout: "bullets",
        content: [
          "독자적인 프롬프트 엔지니어링 기반 원클릭 구조화 파이프라인 구축",
          "초경량 서버리스 아키텍처를 통한 유닛 이코노믹스 극대화(순마진 85%)",
          "B2B/글로벌 사용자를 위한 다국어 및 PPTX 순정 파일 즉시 변환",
        ],
      },
      {
        id: 5,
        slideNumber: 5,
        title: "4. 단계별 실행 로드맵 (Action Plan)",
        subtitle: "Milestones & Phased Execution",
        layout: "bullets",
        content: [
          "Phase 1: 핵심 MVP 런칭 및 초기 타깃 고객 100명 온보딩",
          "Phase 2: 피드백 기반 자동 템플릿 엔진 고도화 및 PayPal 글로벌 구독 확장",
          "Phase 3: B2B 엔터프라이즈 팀 플랜 및 API 연동 라이선스 판매",
        ],
      },
      {
        id: 6,
        slideNumber: 6,
        title: "5. 결론 및 Next Steps",
        subtitle: "Thank You & Q&A",
        layout: "bullets",
        content: [
          "검증된 시장 벤치마킹을 바탕으로 실패 없는 고마진 런칭 달성",
          "지금 바로 무료 프리뷰를 확인하고 정식 구독으로 전환하십시오.",
          "문의: contact@s-probiz.com | Powered by MagicDeck AI",
        ],
      },
    ];

    return {
      title: `${req.topic} 핵심 전략 보고서`,
      description: `Gemini AI 엔진으로 생성된 ${req.topic} 프레젠테이션`,
      slides: slides.slice(0, count),
    };
  }

  // English fallback
  const slides: SlideItem[] = [
    {
      id: 1,
      slideNumber: 1,
      title: req.topic,
      subtitle: "Executive Presentation & Strategic Roadmap",
      layout: "title",
      content: ["Created with MagicDeck AI", "November 2026"],
    },
    {
      id: 2,
      slideNumber: 2,
      title: "1. Market Challenge & Problem Statement",
      subtitle: "Key Industry Bottlenecks",
      layout: "bullets",
      content: [
        "Manual workflows causing excessive operational delays and overhead costs",
        "Growing market demand for rapid, automated content and presentation systems",
        "Clear opportunity to capture high-margin segment with AI automation",
      ],
    },
    {
      id: 3,
      slideNumber: 3,
      title: "2. Key Growth & Performance Metrics",
      subtitle: "Projected Impact",
      layout: "metrics",
      content: [],
      metrics: [
        { label: "Productivity Boost", value: "+350%" },
        { label: "Time Saved", value: "85%" },
        { label: "Payback Period", value: "< 90 Days" },
      ],
    },
    {
      id: 4,
      slideNumber: 4,
      title: "3. Competitive Advantage & Architecture",
      subtitle: "Why We Win",
      layout: "bullets",
      content: [
        "Serverless zero-maintenance infrastructure ensuring 85% operating net margin",
        "Direct native .pptx export compatible with Microsoft PowerPoint & Google Slides",
        "Global multi-language toggle supporting international enterprise workflows",
      ],
    },
    {
      id: 5,
      slideNumber: 5,
      title: "4. Execution Roadmap",
      subtitle: "From MVP to Scaling",
      layout: "bullets",
      content: [
        "Milestone 1: Production launch and initial paid subscriber acquisition",
        "Milestone 2: Automated AI theme presets and PayPal global billing scale",
        "Milestone 3: Agency & enterprise team licensing rollout",
      ],
    },
    {
      id: 6,
      slideNumber: 6,
      title: "5. Conclusion & Actionable Takeaways",
      subtitle: "Next Steps",
      layout: "bullets",
      content: [
        "High-efficiency leverage transforming hours of tedious work into seconds",
        "Ready for full-scale commercialization and distribution",
        "Contact: contact@s-probiz.com | Powered by MagicDeck AI",
      ],
    },
  ];

  return {
    title: `${req.topic} - Executive Strategic Deck`,
    description: `AI-powered strategic deck generated for ${req.topic}`,
    slides: slides.slice(0, count),
  };
}
