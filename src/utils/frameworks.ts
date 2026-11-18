export interface FrameworkSlideTemplate {
  layout: 'title' | 'bullets' | 'metrics';
  titleKo: (topic: string) => string;
  titleEn: (topic: string) => string;
  subtitleKo: string;
  subtitleEn: string;
  contentKo: (topic: string) => string[];
  contentEn: (topic: string) => string[];
  metrics?: { label: string; value: string }[];
  speakerNotesKo: (topic: string) => string;
  speakerNotesEn: (topic: string) => string;
}

export interface FrameworkDefinition {
  id: string;
  nameKo: string;
  nameEn: string;
  icon: string;
  taglineKo: string;
  taglineEn: string;
  keywords: string[];
  slides: FrameworkSlideTemplate[];
}

export const FRAMEWORKS_LIST: FrameworkDefinition[] = [
  // 1. 스타트업 IR 피치덱
  {
    id: "startup-pitch",
    nameKo: "스타트업 IR 피치덱",
    nameEn: "Startup IR Pitch Deck",
    icon: "🚀",
    taglineKo: "투자 유치(Seed~Series A)를 위한 스토리라인과 지표",
    taglineEn: "High-conviction story & metrics for Seed to Series A fundraising",
    keywords: ["ir", "pitch", "피치", "투자", "스타트업", "startup", "seed", "시드", "시리즈", "vc", "엔젤"],
    slides: [
      {
        layout: "title",
        titleKo: (t) => t,
        titleEn: (t) => t,
        subtitleKo: "시드/시리즈A 투자 유치를 위한 IR 피치덱",
        subtitleEn: "Investor Pitch Deck: Strategic Masterplan",
        contentKo: () => ["기획: HookDeck PRO IR Framework", "보안 등급: Confidential"],
        contentEn: () => ["Prepared by: HookDeck PRO IR Framework", "Strictly Confidential"],
        speakerNotesKo: (t) => `안녕하십니까, 투자자 여러분. 오늘 발표할 프로젝트는 '${t}'입니다. 기존 시장의 비효율을 파괴하고 새로운 표준을 제시하는 저희의 비전과 성장 로드맵을 말씀드리겠습니다.`,
        speakerNotesEn: (t) => `Welcome investors. Today I present '${t}'. We are here to disrupt legacy inefficiencies and build the new standard in this fast-growing market.`
      },
      {
        layout: "bullets",
        titleKo: () => "1. 시장의 치명적인 문제점 (Problem)",
        titleEn: () => "1. The Pain Point & Market Inefficiency",
        subtitleKo: "기존 고객들이 겪는 높은 비용과 시간 낭비",
        subtitleEn: "Why legacy solutions fail current demand",
        contentKo: (t) => [
          `'${t}' 영역에서 기존 솔루션들의 지나치게 높은 도입 비용과 느린 실행 속도`,
          "파편화된 워크플로우로 인해 실질 업무 생산성이 70% 이상 저하되는 현실",
          "고객의 즉각적인 니즈를 해결해 주는 통합 표준 플랫폼의 부재"
        ],
        contentEn: (t) => [
          `Legacy tools in '${t}' are prohibitively expensive and excruciatingly slow`,
          "Fragmented workflows degrade team execution productivity by over 70%",
          "Absence of an all-in-one agile platform addressing immediate modern needs"
        ],
        speakerNotesKo: () => "고객들은 이미 대안을 찾기 위해 필사적입니다. 높은 비용과 느린 속도로 인한 페인포인트가 누적되었으며, 바로 지금이 시장 진입의 골든타임입니다.",
        speakerNotesEn: () => "Customers are desperately looking for a better alternative. The compounding friction in legacy tools creates the exact wedge we are capitalizing on."
      },
      {
        layout: "bullets",
        titleKo: () => "2. 우리의 독보적 해결책 (Solution & Moat)",
        titleEn: () => "2. Our Unfair Solution & Defensibility",
        subtitleKo: "경쟁사 대비 10배 빠른 Time-to-Value 구현",
        subtitleEn: "10x faster Time-to-Value with defensible moat",
        contentKo: (t) => [
          `'${t}' 프로세스를 완전 자동화하여 소요 시간을 4시간에서 45초로 90% 이상 단축`,
          "직관적인 UX와 자체 개발 엔진을 통해 초기 학습 곡선 제로화 달성",
          "선점 효과 및 데이터 플라이휠을 통한 경쟁사 모방 불가능한 기술적 해자 구축"
        ],
        contentEn: (t) => [
          `Automating '${t}' from 4 hours down to 45 seconds (>90% reduction)`,
          "Frictionless UX ensuring zero onboarding learning curve for teams",
          "Proprietary engine & data compounding flywheel building an impenetrable moat"
        ],
        speakerNotesKo: () => "저희 솔루션은 단순히 10% 개선된 것이 아니라, 10배 빠르고 10배 간편합니다. 고객이 체험하는 즉시 바이럴이 일어나는 핵심 이유입니다.",
        speakerNotesEn: () => "This is not an incremental 10% improvement; it is a 10x breakthrough in execution speed and cost efficiency."
      },
      {
        layout: "metrics",
        titleKo: () => "3. 시장 규모 및 성장성 (TAM/SAM/SOM)",
        titleEn: () => "3. Market Opportunity & Growth Trajectory",
        subtitleKo: "연평균 34% 성장하는 글로벌 타깃 시장",
        subtitleEn: "Fast-expanding global market with 34% CAGR",
        contentKo: () => [],
        contentEn: () => [],
        metrics: [
          { label: "글로벌 전체 시장 (TAM)", value: "$24.8B" },
          { label: "초기 타깃 시장 (SOM)", value: "$620M" },
          { label: "연평균 성장률 (CAGR)", value: "+34.2%" }
        ],
        speakerNotesKo: () => "저희가 진입하는 시장은 240억 달러 규모로 연 34%씩 고속 성장 중입니다. 초기 거점인 6억 달러 SOM을 18개월 내 집중 장악하겠습니다.",
        speakerNotesEn: () => "We are tackling a $24.8B TAM expanding at 34% CAGR. Our immediate beachhead SOM represents a high-margin $620M capture opportunity."
      },
      {
        layout: "bullets",
        titleKo: () => "4. 비즈니스 모델 및 유닛 이코노믹스",
        titleEn: () => "4. Monetization & Unit Economics",
        subtitleKo: "85% 이상의 압도적인 순마진 구조",
        subtitleEn: "Predictable recurring revenue with 85%+ gross margin",
        contentKo: () => [
          "B2B SaaS 기반 월/연간 구독 모델 및 사용량 기반 종량제 결합",
          "고객 획득 비용(CAC) 대비 고객 생애 가치(LTV) 비율 4.5배 이상 달성",
          "글로벌 자동 결제 체계를 통한 국경 없는 글로벌 무중단 현금흐름 창출"
        ],
        contentEn: () => [
          "Scalable B2B SaaS recurring subscription combined with tiered usage",
          "Strong unit economics with LTV/CAC ratio sustained at 4.5x+",
          "Frictionless global payment rails enabling borderless revenue generation"
        ],
        speakerNotesKo: () => "수익 구조는 단순하고 견고합니다. 서버리스 아키텍처로 원가를 극소화하여 85% 이상의 총마진을 유지하며 빠른 현금 회수를 달성합니다.",
        speakerNotesEn: () => "Our unit economics prove capital efficiency from day one. With an 85% gross margin, each new cohort generates strong recurring free cash flow."
      },
      {
        layout: "bullets",
        titleKo: () => "5. 투자금 유치 규모 및 사용 계획 (The Ask)",
        titleEn: () => "5. The Ask & Capital Allocation",
        subtitleKo: "다음 18개월 동안 폭발적 스케일업을 달성하기 위한 라운드",
        subtitleEn: "18-Month Runway to Achieve Breakout Milestones",
        contentKo: (t) => [
          `목표 유치 금액: 15억 원 (Runway 18개월 확보 및 손익분기점 조기 돌파)`,
          "자금 배분: 제품 R&D 50%, 글로벌 마케팅 & GTM 35%, 운영 예비비 15%",
          `'${t}' 시장의 No.1 글로벌 카테고리 킬러로 도약할 기회에 동참해 주십시오`
        ],
        contentEn: (t) => [
          "Target Raise: $1.5M for 18-month runway to reach profitability milestone",
          "Allocation: 50% Core Engineering, 35% Global GTM & Growth, 15% Ops Reserve",
          `Join us in establishing the definitive global standard for '${t}'`
        ],
        speakerNotesKo: () => "이번 15억 원의 투자 라운드를 통해 제품을 완성하고 글로벌 시장 침투를 본격화하겠습니다. 함께 시장을 정의할 파트너가 되어 주십시오.",
        speakerNotesEn: () => "With this $1.5M raise, we will scale our go-to-market engine and cement our leadership position. We invite you to partner with us."
      }
    ]
  },

  // 2. 신규 사업계획서
  {
    id: "business-plan",
    nameKo: "신규 사업계획서",
    nameEn: "New Business Plan",
    icon: "💼",
    taglineKo: "신사업 기획, 타당성 분석 및 실행 마스터플랜",
    taglineEn: "Feasibility study, revenue modeling & execution masterplan",
    keywords: ["사업계획서", "신사업", "사업", "기획서", "plan", "business plan", "타당성", "수익모델"],
    slides: [
      {
        layout: "title",
        titleKo: (t) => `${t} 신규 사업 추진 계획서`,
        titleEn: (t) => `${t} - Strategic Business Plan`,
        subtitleKo: "사업 타당성 분석 및 단계별 실행 마스터플랜",
        subtitleEn: "Comprehensive Feasibility & Execution Masterplan",
        contentKo: () => ["작성 부서: 신사업전략추진단", "실행 승인용"],
        contentEn: () => ["Strategic Planning Division", "Executive Board Review"],
        speakerNotesKo: (t) => `본 보고서는 신규 사업 기회인 '${t}'의 시장 타당성 및 구체적인 비즈니스 실행 계획을 승인받기 위해 작성되었습니다.`,
        speakerNotesEn: (t) => `This presentation outlines the business case and execution blueprint for our new venture: '${t}'.`
      },
      {
        layout: "bullets",
        titleKo: () => "1. 사업 추진 배경 및 필요성",
        titleEn: () => "1. Executive Summary & Strategic Rationale",
        subtitleKo: "내외부 환경 분석을 통한 신성장 동력 확보",
        subtitleEn: "Aligning market tailwinds with core strategic capabilities",
        contentKo: (t) => [
          `기존 주력 사업의 성장 한계를 돌파하기 위한 '${t}' 분야로의 포트폴리오 확장`,
          "디지털 전환 및 소비자 라이프스타일 변화에 따른 신규 수익 파이프라인 창출",
          "당사 기존 인프라 및 네트워크 자산을 재활용하여 초기 런칭 비용 60% 절감 가능"
        ],
        contentEn: (t) => [
          `Expanding beyond traditional revenue plateaus into high-margin '${t}'`,
          "Capitalizing on macro industry tailwinds to secure high-yield new revenue streams",
          "Leveraging existing corporate infrastructure to cut initial launch overhead by 60%"
        ],
        speakerNotesKo: () => "기존 사업의 성장률이 정체되는 현시점에서, 이 신사업은 당사의 10년을 책임질 핵심 파이프라인이 될 것입니다.",
        speakerNotesEn: () => "Entering this space unlocks defensive hedging against core slowdown while opening high-margin upside."
      },
      {
        layout: "metrics",
        titleKo: () => "2. 핵심 목표 지표 및 손익 추정 (3개년)",
        titleEn: () => "2. Financial Projections & Break-Even Analysis",
        subtitleKo: "안정적인 현금흐름과 빠른 손익분기점(BEP) 달성",
        subtitleEn: "Robust cash-flow modeling and accelerated payback timeline",
        contentKo: () => [],
        contentEn: () => [],
        metrics: [
          { label: "1차년도 목표 매출", value: "35억 원" },
          { label: "목표 영업이익률", value: "28.5%" },
          { label: "예상 손익분기점", value: "6개월 내" },
        ],
        speakerNotesKo: () => "보수적인 관점에서 추정해도 런칭 후 6개월 차에 BEP를 돌파하며, 1차년도 영업이익률 28%를 달성합니다.",
        speakerNotesEn: () => "Even under conservative scenarios, the venture reaches cash breakeven within 6 months, delivering 28.5% operating margin in Year 1."
      },
      {
        layout: "bullets",
        titleKo: () => "3. 단계별 실행 로드맵 (Action Milestones)",
        titleEn: () => "3. Phased Execution Roadmap",
        subtitleKo: "초기 검증부터 대규모 확장까지 3단계 프로세스",
        subtitleEn: "From pilot validation to scale in 3 structured phases",
        contentKo: () => [
          "Phase 1 (M1~M3): 핵심 MVP 출시 및 얼리어답터 1,000명 대상 현장 테스트",
          "Phase 2 (M4~M8): 공격적 마케팅 집행 및 기업 파트너십 10건 이상 체결",
          "Phase 3 (M9~M12): 자동화 시스템 도입 및 해외 시장 라이선싱 확장"
        ],
        contentEn: () => [
          "Phase 1 (M1~M3): Pilot MVP launch and beta testing with 1,000 target users",
          "Phase 2 (M4~M8): Scaled commercial rollout and securing 10+ anchor B2B accounts",
          "Phase 3 (M9~M12): Workflow automation and cross-border regional expansion"
        ],
        speakerNotesKo: () => "무모하게 자본을 투입하지 않고, 단계별 마일스톤 검증을 거치는 린(Lean) 방식으로 리스크를 철저히 통제하겠습니다.",
        speakerNotesEn: () => "We follow a disciplined stage-gate execution model, minimizing downside risk while aggressively locking in early traction."
      },
      {
        layout: "bullets",
        titleKo: () => "4. 리스크 관리 및 기대 효과",
        titleEn: () => "4. Risk Mitigation & Long-term ROI",
        subtitleKo: "선제적 리스크 헤징을 통한 지속 가능한 성장 확보",
        subtitleEn: "Proactive risk mitigation ensuring predictable upside",
        contentKo: (t) => [
          "시장 진입 지연 리스크: 기 구축된 솔루션 모듈 활용으로 런칭 기간 50% 단축",
          "수익성 저하 리스크: 사전 계약 중심의 B2B 고객 선확보로 현금흐름 안정성 확보",
          `'${t}' 선점을 통해 전사적 기업 가치 및 신성장 밸류에이션 2배 이상 증대`
        ],
        contentEn: (t) => [
          "Time-to-market risk: Modular architecture cuts go-live timeline by 50%",
          "Margin contraction risk: Pre-sold enterprise contracts guarantee cash buffer",
          `Cementing market leadership in '${t}' doubles long-term enterprise valuation`
        ],
        speakerNotesKo: () => "예상되는 리스크에 대한 사전 방어책을 수립 완료하였으며, 즉각적인 사업 추진 승인을 요청드립니다.",
        speakerNotesEn: () => "With all risk vectors hedged and commercial pathways mapped, we request formal executive authorization to launch."
      }
    ]
  },

  // 3. 마케팅 & 광고 제안서
  {
    id: "marketing-sales",
    nameKo: "마케팅 & 광고 제안서",
    nameEn: "Marketing & Sales Pitch",
    icon: "🎯",
    taglineKo: "고전환 퍼널, 타깃 분석 및 ROAS 극대화 캠페인",
    taglineEn: "High-converting funnels, audience targeting & ROAS optimization",
    keywords: ["마케팅", "광고", "제안서", "marketing", "ads", "sales", "세일즈", "퍼널", "roas", "캠페인", "홍보"],
    slides: [
      {
        layout: "title",
        titleKo: (t) => `${t} 통합 마케팅 전략 제안서`,
        titleEn: (t) => `${t} - Integrated Marketing Strategy`,
        subtitleKo: "고객 획득 비용 절감 및 전환율 극대화 캠페인",
        subtitleEn: "Performance Marketing & Customer Acquisition Strategy",
        contentKo: () => ["기획: 퍼포먼스 그로스 랩", "목표: ROAS 450%+ 달성"],
        contentEn: () => ["Growth Marketing Team", "Target ROAS: 450%+"],
        speakerNotesKo: (t) => `안녕하십니까. 오늘은 '${t}'의 매출을 3배 이상 폭발시킬 수 있는 데이터 기반 통합 마케팅 캠페인 전략을 제안드립니다.`,
        speakerNotesEn: (t) => `Today we present our data-driven growth marketing blueprint designed to scale '${t}' customer acquisition predictably.`
      },
      {
        layout: "bullets",
        titleKo: () => "1. 타깃 고객 분석 및 페인포인트",
        titleEn: () => "1. Ideal Customer Profile (ICP) & Core Triggers",
        subtitleKo: "전환 결정을 망설이게 만드는 핵심 심리 분석",
        subtitleEn: "Unlocking purchasing psychology and friction points",
        contentKo: (t) => [
          `핵심 타깃: '${t}' 니즈를 가졌으나 기존 대안에 실망한 25-45세 구매 결정권자`,
          "핵심 불만: 복잡한 구매 과정과 신뢰할 수 없는 정보로 인한 구매 이탈율 72%",
          "해결 트리거: 즉각적인 효과 체감(Aha-moment)을 입증하는 소셜 프루프 및 시각 자료"
        ],
        contentEn: (t) => [
          `Primary ICP: Decision-makers seeking '${t}' frustrated with outdated legacy alternatives`,
          "Drop-off cause: Friction-heavy checkout and lack of transparent social proof (72% drop-off)",
          "Conversion catalyst: Instant 'Aha-moment' demonstrations and verified peer proof"
        ],
        speakerNotesKo: () => "타깃 고객들은 상품 자체보다 '즉각적인 문제 해결의 확신'을 원합니다. 이들의 심리적 장벽을 해소하는 것이 이번 캠페인의 시작입니다.",
        speakerNotesEn: () => "Our target audience demands frictionless certainty. Removing cognitive friction is the foundation of this campaign."
      },
      {
        layout: "metrics",
        titleKo: () => "2. 캠페인 핵심 목표 KPI",
        titleEn: () => "2. Target Campaign Performance Benchmarks",
        subtitleKo: "정량적 데이터로 증명하는 퍼포먼스 마케팅",
        subtitleEn: "Measurable metrics driving direct bottom-line revenue",
        contentKo: () => [],
        contentEn: () => [],
        metrics: [
          { label: "목표 광고수익률 (ROAS)", value: "480%" },
          { label: "고객 획득비용 (CAC)", value: "-45% 절감" },
          { label: "랜딩페이지 전환율 (CVR)", value: "8.4%" },
        ],
        speakerNotesKo: () => "단순 노출이 아닌 실질 매출 전환에 집중합니다. CAC를 45% 줄이면서 ROAS 480%를 목표로 세팅했습니다.",
        speakerNotesEn: () => "We optimize for revenue velocity, not vanity impressions. We model a 480% ROAS with a 45% reduction in CAC."
      },
      {
        layout: "bullets",
        titleKo: () => "3. 3단계 퍼널 믹스 및 크리에이티브 전략",
        titleEn: () => "3. Full-Funnel Omnichannel Architecture",
        subtitleKo: "인지부터 구매 및 재구매까지 이어지는 전환 루프",
        subtitleEn: "Converting cold awareness into high-retention advocates",
        contentKo: () => [
          "TOFU (인지): 숏폼 영상 및 후킹 메시지를 통한 대규모 오가닉 바이럴 확산",
          "MOFU (고려): 인터랙티브 데모 및 비교 분석 콘텐츠를 통한 신뢰 구축",
          "BOFU (전환): 시간 제한 프로모션 및 리타겟팅을 통한 즉각적인 결제 유도"
        ],
        contentEn: () => [
          "Top-of-Funnel: Viral short-form hooks driving qualified high-intent traffic",
          "Middle-of-Funnel: Interactive product teardowns and case study validation",
          "Bottom-of-Funnel: Scarcity-driven retargeting and frictionless checkout triggers"
        ],
        speakerNotesKo: () => "단일 광고가 아닌 3단계 유기적 퍼널을 통해, 유입된 고객이 이탈하지 않고 결제까지 직행하도록 설계했습니다.",
        speakerNotesEn: () => "This full-funnel structure nurtures cold visitors into committed buyers through progressive commitment micro-steps."
      }
    ]
  },

  // 4. 경영 & 전략 컨설팅 보고서
  {
    id: "strategic-consulting",
    nameKo: "경영 & 전략 컨설팅",
    nameEn: "Strategic Consulting",
    icon: "📊",
    taglineKo: "맥킨지식 3C/SWOT 분석, 핵심 과제 도출 및 실행 자문",
    taglineEn: "McKinsey-style 3C/SWOT analysis, issue prioritization & roadmap",
    keywords: ["컨설팅", "전략", "consulting", "strategy", "swot", "경영", "보고서", "맥킨지", "자문"],
    slides: [
      {
        layout: "title",
        titleKo: (t) => `${t} 경영 전략 컨설팅 보고서`,
        titleEn: (t) => `${t} - Strategic Transformation Report`,
        subtitleKo: "경쟁 우위 확보 및 비즈니스 혁신 실행 자문",
        subtitleEn: "Executive Advisory for Operational & Strategic Excellence",
        contentKo: () => ["발행: 전략경영 컨설팅 그룹", "Confidential / Board Only"],
        contentEn: () => ["Management Consulting Practice", "Board of Directors Review"],
        speakerNotesKo: (t) => `경영진 여러분, 본 자문 보고서는 '${t}' 환경 변화에 대응하여 기업 경쟁력을 극대화하기 위한 구조적 혁신 방안을 담고 있습니다.`,
        speakerNotesEn: (t) => `Members of the board, this executive briefing delivers clear strategic imperatives to dominate '${t}'.`
      },
      {
        layout: "bullets",
        titleKo: () => "1. 거시 환경 및 경쟁 지형 분석 (3C)",
        titleEn: () => "1. Macro Landscape & Competitive Dynamics",
        subtitleKo: "고객, 경쟁사, 자사 역량의 입체적 진단",
        subtitleEn: "Comprehensive audit of Customer, Competitor & Company capabilities",
        contentKo: (t) => [
          `시장(Customer): '${t}'에 대한 고객의 기대 수준이 편의성과 개인화 중심으로 급변`,
          "경쟁사(Competitor): 전통 기업들의 디지털 전환 지연으로 시장 틈새 공간 발생",
          "자사(Company): 차별화된 데이터 자산을 보유하고 있으나 조직 간 사일로 현상 잔존"
        ],
        contentEn: (t) => [
          `Customers: Demanding hyper-personalized, instant delivery in '${t}'`,
          "Competitors: Legacy incumbents paralyzed by technical debt and slow decision cycles",
          "Company: High-value latent assets hindered by operational silos across units"
        ],
        speakerNotesKo: () => "경쟁사들의 둔화된 움직임은 당사에게 절호의 기회입니다. 조직의 파편화를 해소하고 핵심 역량을 집중해야 합니다.",
        speakerNotesEn: () => "Competitor inertia opens an immediate strategic window. We must mobilize our latent strengths to capture market share."
      },
      {
        layout: "metrics",
        titleKo: () => "2. 전략 실행 시 기대 성과 (Strategic ROI)",
        titleEn: () => "2. Projected Strategic Impact & Value Creation",
        subtitleKo: "구조 혁신을 통한 재무 및 운영 효율화 지표",
        subtitleEn: "Quantifiable gains in operating leverage and margin expansion",
        contentKo: () => [],
        contentEn: () => [],
        metrics: [
          { label: "운영 원가 절감", value: "-32%" },
          { label: "의사결정 속도 향상", value: "3.2x" },
          { label: "신규 EBITDA 기여도", value: "+18.5%" }
        ],
        speakerNotesKo: () => "이 전략이 성공적으로 안착하면 운영 비용을 32% 절감함과 동시에 EBITDA 18% 성장을 달성할 수 있습니다.",
        speakerNotesEn: () => "Executing this restructuring delivers a 32% cost reduction while unlocking 18.5% incremental EBITDA growth."
      },
      {
        layout: "bullets",
        titleKo: () => "3. 핵심 3대 혁신 과제 (Strategic Imperatives)",
        titleEn: () => "3. Top 3 Strategic Transformation Pillars",
        subtitleKo: "단기 승리와 중장기 해자를 구축하는 3개 트랙",
        subtitleEn: "Balancing quick wins with defensible long-term advantages",
        contentKo: () => [
          "Pillar 1: 핵심 워크플로우의 디지털 자동화 및 데이터 파이프라인 통합",
          "Pillar 2: 고객 접점(CX) 혁신을 통한 리텐션 및 교차 판매율 40% 제고",
          "Pillar 3: 애자일 TF 조직 구성을 통한 시장 기회 포착 시간 50% 단축"
        ],
        contentEn: () => [
          "Pillar 1: Modernizing core workflows and enterprise data connectivity",
          "Pillar 2: Elevating digital customer touchpoints to expand retention by 40%",
          "Pillar 3: Deploying cross-functional agile pods to accelerate product iterations"
        ],
        speakerNotesKo: () => "이 3대 과제는 서로 유기적으로 연결되어 있으며, 즉시 1단계 태스크포스 구성을 권고드립니다.",
        speakerNotesEn: () => "These three pillars compound each other. We advise establishing an Executive PMO to oversee Phase 1 execution."
      }
    ]
  },

  // 5. 제품 런칭 & 키노트
  {
    id: "product-launch",
    nameKo: "제품 런칭 & 키노트",
    nameEn: "Product Launch & Keynote",
    icon: "⚡",
    taglineKo: "신제품 공개, 기능 시연 및 고객 언패킹 발표",
    taglineEn: "High-impact keynote unveiling features, live demos & launch roadmap",
    keywords: ["런칭", "키노트", "제품", "출시", "product", "launch", "keynote", "신제품", "언팩"],
    slides: [
      {
        layout: "title",
        titleKo: (t) => `Introducing ${t}`,
        titleEn: (t) => `Introducing ${t}`,
        subtitleKo: "새로운 표준을 제시하는 차세대 혁신 제품 공식 발표",
        subtitleEn: "The Next-Generation Standard Unveiled",
        contentKo: () => ["공식 키노트 프레젠테이션", "Global Launch 2026"],
        contentEn: () => ["Official Product Keynote", "Global Launch 2026"],
        speakerNotesKo: (t) => `신사숙녀 여러분, 오래 기다리셨습니다. 오늘 우리는 '${t}'를 완전히 재정의할 혁신적인 신제품을 여러분께 공개합니다.`,
        speakerNotesEn: (t) => `Ladies and gentlemen, thank you for being here. Today we are redefining what is possible in '${t}'.`
      },
      {
        layout: "bullets",
        titleKo: () => "1. 제품 개발 비전: 왜 지금인가?",
        titleEn: () => "1. The Product Vision: Why Now?",
        subtitleKo: "사용자의 목소리에서 시작된 근본적인 질문",
        subtitleEn: "Crafted directly from thousands of user conversations",
        contentKo: (t) => [
          `모두가 '${t}'를 복잡하고 어렵게 다룰 때, 우리는 가장 단순한 해답을 찾았습니다`,
          "더 이상 여러 도구를 번갈아 쓰며 시간을 낭비할 필요가 없습니다",
          "직관적이고 아름다운 인터페이스 안에 프로급 성능을 완벽히 압축했습니다"
        ],
        contentEn: (t) => [
          `While others made '${t}' convoluted and burdensome, we obsessed over radical simplicity`,
          "Eliminating the need to juggle 5 different tools just to achieve one clean outcome",
          "Engineered enterprise-grade horsepower behind an effortlessly elegant interface"
        ],
        speakerNotesKo: () => "우리는 사용자의 고통을 지켜보며 타협하지 않았습니다. 복잡함을 걷어내고 본질에만 집중했습니다.",
        speakerNotesEn: () => "We refused to compromise. We engineered away every piece of friction so you can focus purely on creating value."
      },
      {
        layout: "metrics",
        titleKo: () => "2. 혁신적인 3대 벤치마크 성능",
        titleEn: () => "2. Unprecedented Performance Benchmarks",
        subtitleKo: "기존 세대 대비 압도적인 개선 수치",
        subtitleEn: "Quantified leaps over previous generation standards",
        contentKo: () => [],
        contentEn: () => [],
        metrics: [
          { label: "작업 소요 시간", value: "10배 단축" },
          { label: "초기 셋업 소요 시간", value: "3분 이내" },
          { label: "사용자 만족도 점수", value: "98.7%" }
        ],
        speakerNotesKo: () => "이 제품은 이전 세대보다 10배 빠르며, 첫 셋업까지 3분이면 충분합니다. 실제 베타 테스터들의 만족도는 98.7%였습니다.",
        speakerNotesEn: () => "Benchmark tests show an order-of-magnitude leap: 10x faster workflow speeds with sub-3-minute onboarding."
      },
      {
        layout: "bullets",
        titleKo: () => "3. 출시 일정 및 얼리버드 혜택",
        titleEn: () => "3. Availability & Exclusive Early Access",
        subtitleKo: "오늘부터 즉시 사용 가능한 공식 일정",
        subtitleEn: "Global availability begins today with limited benefits",
        contentKo: () => [
          "공식 런칭: 오늘부터 글로벌 전 지역 즉시 가입 및 이용 가능",
          "얼리버드 프로모션: 런칭 기념 선착순 1,000명 한정 평생 40% 할인 제공",
          "전담 온보딩: 엔터프라이즈 도입 팀을 위한 1:1 기술 지원 및 커스텀 마이그레이션 지원"
        ],
        contentEn: () => [
          "Global Availability: Instant onboarding opens today worldwide",
          "Early Adopter Benefit: First 1,000 users lock in lifetime 40% pricing tier",
          "Dedicated Concierge: White-glove enterprise migration and 24/7 dedicated Slack channel"
        ],
        speakerNotesKo: () => "오늘부터 전 세계 누구나 바로 시작하실 수 있습니다. 특별 혜택을 놓치지 마시고 지금 직접 경험해 보십시오.",
        speakerNotesEn: () => "Doors are officially open. Claim your exclusive access now and elevate your workflow today."
      }
    ]
  },

  // 6. 강의 & 학술 세미나
  {
    id: "lecture-seminar",
    nameKo: "강의 & 학술 세미나",
    nameEn: "Lecture & Academic Seminar",
    icon: "🎓",
    taglineKo: "체계적인 학습 목표, 핵심 이론, 실습 과제 및 Q&A",
    taglineEn: "Structured learning objectives, core concepts, case studies & Q&A",
    keywords: ["강의", "수업", "세미나", "학술", "lecture", "seminar", "교육", "학습", "수업자료", "발표"],
    slides: [
      {
        layout: "title",
        titleKo: (t) => `${t}: 핵심 이론 및 실무 적용 마스터클래스`,
        titleEn: (t) => `${t}: Foundations & Advanced Masterclass`,
        subtitleKo: "이론적 배경부터 현업 실전 적용 사례까지",
        subtitleEn: "From Core Theoretical Principles to Real-World Case Studies",
        contentKo: () => ["강의자: 전문 강사진", "학습 레벨: All Levels"],
        contentEn: () => ["Course Instructor: Academic Lead", "Target Level: All Audiences"],
        speakerNotesKo: (t) => `수강생 여러분 환영합니다. 오늘 세미나에서는 '${t}'의 핵심 원리와 실무에서 바로 응용할 수 있는 실전 가이드를 다루겠습니다.`,
        speakerNotesEn: (t) => `Welcome students and colleagues. Today's session covers essential concepts and hands-on applications of '${t}'.`
      },
      {
        layout: "bullets",
        titleKo: () => "1. 오늘의 핵심 학습 목표 (Learning Objectives)",
        titleEn: () => "1. Core Learning Objectives",
        subtitleKo: "강의 종료 후 얻게 되는 3가지 핵심 역량",
        subtitleEn: "Key takeaways you will master by the end of this session",
        contentKo: (t) => [
          `'${t}'의 역사적 배경과 등장 원인을 명확하게 이해한다`,
          "핵심 메커니즘과 동작 원리를 단계별 구조로 분해하여 설명할 수 있다",
          "실제 비즈니스 및 학업 환경에서 직면하는 문제를 해결하는 프레임워크를 습득한다"
        ],
        contentEn: (t) => [
          `Understand the theoretical foundation and historical context behind '${t}'`,
          "Deconstruct complex mechanisms into actionable, modular mental models",
          "Apply proven frameworks to solve real-world problem scenarios independently"
        ],
        speakerNotesKo: () => "단순 암기가 아닌, 원리를 이해하고 실제로 응용할 수 있는 실질적인 역량을 갖추는 것이 목표입니다.",
        speakerNotesEn: () => "Our goal today is deep functional comprehension rather than superficial memorization."
      },
      {
        layout: "bullets",
        titleKo: () => "2. 심층 개념 분석 및 실전 사례 연구",
        titleEn: () => "2. Deep Dive: Concepts in Practice",
        subtitleKo: "성공과 실패 사례를 통해 배우는 핵심 인사이트",
        subtitleEn: "Analyzing verified case studies and practical breakdowns",
        contentKo: () => [
          "성공 요인: 이론을 현장에 적용할 때 표준화된 체크리스트를 준수한 경우 성공률 80% 상승",
          "실패 원인: 기초 원리를 간과하고 단기적인 툴에만 의존하여 발생하는 병목 현상",
          "모범 프랙티스: 점진적 반복(Iterative) 접근법을 통해 리스크를 분산하고 학습 속도 가속화"
        ],
        contentEn: () => [
          "Success Factor: Teams adhering to structured analytical checklists saw an 80% higher outcome rate",
          "Common Failure: Over-relying on superficial tools while neglecting foundational mechanics",
          "Best Practice: Deploying an iterative feedback loop to validate assumptions early"
        ],
        speakerNotesKo: () => "이론과 현실의 괴리를 좁히는 유일한 방법은 케이스 스터디입니다. 이 실패 사례를 주목해 주시기 바랍니다.",
        speakerNotesEn: () => "Case studies bridge theory and reality. Notice how this team avoided pitfalls by validating assumptions."
      },
      {
        layout: "bullets",
        titleKo: () => "3. 핵심 요약 및 질의응답 (Q&A)",
        titleEn: () => "3. Summary, Review & Discussion",
        subtitleKo: "오늘 다룬 핵심 내용 총정리 및 토론",
        subtitleEn: "Recap of key frameworks and open forum Q&A",
        contentKo: (t) => [
          `'${t}'의 성공적 적용은 체계적인 프레임워크 준수에서 시작됩니다`,
          "제공된 실습 템플릿과 체크리스트를 활용하여 각자의 프로젝트에 바로 적용해 보십시오",
          "질문 및 피드백: 자유롭게 마이크를 켜시거나 채팅창에 남겨주시기 바랍니다"
        ],
        contentEn: (t) => [
          `Mastery of '${t}' begins with disciplined application of proven mental models`,
          "Utilize the provided checklist and template in your ongoing assignments",
          "Open Floor: Please feel free to raise questions or share perspective in discussion"
        ],
        speakerNotesKo: () => "경청해 주셔서 감사합니다. 지금부터 궁금하신 점이나 토론하고 싶은 주제에 대해 질문을 받겠습니다.",
        speakerNotesEn: () => "Thank you for your active participation. Let us now transition into our interactive Q&A forum."
      }
    ]
  },

  // 7. 회사소개서 & 포트폴리오
  {
    id: "company-profile",
    nameKo: "회사소개서 & 포트폴리오",
    nameEn: "Company Profile",
    icon: "🏢",
    taglineKo: "기업 비전, 주요 사업 역량, 파트너십 및 레퍼런스",
    taglineEn: "Corporate credentials, core capabilities, client track record & contact",
    keywords: ["회사소개", "소개서", "회사", "포트폴리오", "company", "profile", "portfolio", "역량"],
    slides: [
      {
        layout: "title",
        titleKo: (t) => `${t} 기업 소개서`,
        titleEn: (t) => `${t} - Company Overview`,
        subtitleKo: "신뢰와 전문성으로 고객의 비즈니스 성공을 만듭니다",
        subtitleEn: "Empowering Partner Growth with Proven Expertise",
        contentKo: () => ["공식 회사소개서", "Corporate Credentials 2026"],
        contentEn: () => ["Official Credentials", "Corporate Overview 2026"],
        speakerNotesKo: (t) => `안녕하십니까. 귀사와의 상생 파트너십을 위해 '${t}'의 핵심 역량과 성공 레퍼런스를 소개해 드립니다.`,
        speakerNotesEn: (t) => `Welcome partners. Today we share the core strengths, mission and track record of '${t}'.`
      },
      {
        layout: "bullets",
        titleKo: () => "1. 기업 개요 및 핵심 역량",
        titleEn: () => "1. Corporate Mission & Core Competencies",
        subtitleKo: "업계 최고의 전문성과 실행력을 갖춘 파트너",
        subtitleEn: "Built on rigorous execution and client-centric outcomes",
        contentKo: (t) => [
          `설립 이념: '${t}' 영역에서 가장 신뢰받는 최고의 비즈니스 솔루션 제공`,
          "핵심 역량: 10년 이상의 베테랑 전문가 그룹과 자체 기술 인프라 보유",
          "차별성: 기획부터 실행, 유지보수까지 원스톱 풀사이클 책임 관리제 운영"
        ],
        contentEn: (t) => [
          `Core Purpose: Establishing the premier benchmark standard in '${t}'`,
          "Execution Strength: Seasoned domain veterans backed by dedicated proprietary infrastructure",
          "Differentiator: End-to-end full-lifecycle accountability from discovery to deployment"
        ],
        speakerNotesKo: () => "당사는 단순한 외주 대행사가 아니라, 고객사의 성장을 함께 고민하는 든든한 전략 파트너입니다.",
        speakerNotesEn: () => "We operate not merely as an external vendor, but as an embedded strategic partner invested in your ROI."
      },
      {
        layout: "metrics",
        titleKo: () => "2. 누적 성과 및 고객 신뢰 지표",
        titleEn: () => "2. Verified Track Record & Client Trust",
        subtitleKo: "숫자로 증명하는 파트너십 성과",
        subtitleEn: "Hard evidence demonstrating compounding partner value",
        contentKo: () => [],
        contentEn: () => [],
        metrics: [
          { label: "누적 성공 프로젝트", value: "350+ 건" },
          { label: "고객사 재계약률", value: "94.2%" },
          { label: "평균 고객 만족도", value: "4.9 / 5.0" }
        ],
        speakerNotesKo: () => "350개 이상의 성공 프로젝트와 94%의 재계약률이 당사의 신뢰도를 객관적으로 증명합니다.",
        speakerNotesEn: () => "Over 350 completed engagements with a 94.2% renewal rate validate our unwavering commitment to quality."
      },
      {
        layout: "bullets",
        titleKo: () => "3. 주요 고객 레퍼런스 및 제휴 문의",
        titleEn: () => "3. Trusted References & Contact Channels",
        subtitleKo: "귀사의 다음 성공 스토리를 함께 만듭니다",
        subtitleEn: "Ready to accelerate your next breakthrough milestone",
        contentKo: () => [
          "주요 파트너십: 국내외 유수 엔터프라이즈 및 혁신 스타트업 50여 개 사",
          "맞춤형 컨설팅: 귀사의 현 상황에 최적화된 파일럿 프로젝트 무상 제안 가능",
          "공식 문의: contact@s-probiz.com | 전담 매니저 24시간 내 회신"
        ],
        contentEn: () => [
          "Key Clientele: Serving leading global enterprises and breakout tech innovators",
          "Custom Tailoring: Complimentary diagnostic assessment tailored to your organization",
          "Direct Outreach: contact@s-probiz.com | Guaranteed dedicated specialist response in 24h"
        ],
        speakerNotesKo: () => "귀사에 최적화된 맞춤형 솔루션을 제안드릴 준비가 되어 있습니다. 언제든 편하게 문의해 주시기 바랍니다.",
        speakerNotesEn: () => "We stand ready to co-create your next success chapter. Let us open an exploratory conversation today."
      }
    ]
  },

  // 8. 분기/연간 실적 보고 (QBR)
  {
    id: "qbr-sales",
    nameKo: "분기/연간 실적 보고 (QBR)",
    nameEn: "Quarterly Business Review",
    icon: "📈",
    taglineKo: "매출 실적, KPI 달성률 분석, 부진 원인 및 차분기 목표",
    taglineEn: "Revenue milestones, KPI performance, variance analysis & next goals",
    keywords: ["실적", "qbr", "분기", "매출", "연간", "보고", "review", "quarterly", "성과"],
    slides: [
      {
        layout: "title",
        titleKo: (t) => `${t} 분기 실적 보고서`,
        titleEn: (t) => `${t} - Quarterly Business Review`,
        subtitleKo: "핵심 성과 분석 및 차기 분기 성장 전략",
        subtitleEn: "Operational Performance Review & Next Quarter Priorities",
        contentKo: () => ["보고: 경영기획실", "대상: 경영진 및 이사회"],
        contentEn: () => ["Strategic Finance & Operations", "Executive Leadership"],
        speakerNotesKo: (t) => `경영진 여러분, 이번 분기 '${t}'에 대한 실적 분석 및 차기 분기 중점 실행 과제를 보고드리겠습니다.`,
        speakerNotesEn: (t) => `Leadership team, this quarterly review breaks down our financial performance and forward priorities for '${t}'.`
      },
      {
        layout: "metrics",
        titleKo: () => "1. 분기 핵심 실적 하이라이트",
        titleEn: () => "1. Top-Line Financial Highlights",
        subtitleKo: "주요 재무 지표 및 목표 달성률 점검",
        subtitleEn: "Core revenue performance against targets",
        contentKo: () => [],
        contentEn: () => [],
        metrics: [
          { label: "분기 매출 달성률", value: "112%" },
          { label: "영업이익 (EBITDA)", value: "+24.8%" },
          { label: "신규 고객 유치수", value: "1,420개사" }
        ],
        speakerNotesKo: () => "이번 분기는 전반적인 시장 침체에도 불구하고 목표 매출의 112%를 초과 달성하며 견고한 이익을 거두었습니다.",
        speakerNotesEn: () => "Despite macroeconomic headwinds, we outpaced target revenue at 112% while expanding EBITDA margins by 24.8%."
      },
      {
        layout: "bullets",
        titleKo: () => "2. 성과 동인 및 보완 과제 분석",
        titleEn: () => "2. Growth Drivers & Variance Root Causes",
        subtitleKo: "어디서 잘했고, 어디서 개선이 필요한가?",
        subtitleEn: "What accelerated our growth and what friction points emerged",
        contentKo: () => [
          "성공 요인: 엔터프라이즈 대형 고객 수주 확대 및 핵심 제품 번들링 전략 주효",
          "개선 과제: 중소형 고객 세그먼트의 초기 온보딩 이탈률 소폭 증가",
          "대응 조치: 자동 온보딩 가이드 배포 및 CS 응답 시간 15분 이내로 단축 조치 완료"
        ],
        contentEn: () => [
          "Primary Driver: Large enterprise contract wins and successful product suite bundling",
          "Identified Gap: Slight uptick in SMB customer friction during month-1 onboarding",
          "Corrective Action: Rolled out automated self-serve workflows and streamlined CS queues to <15 min"
        ],
        speakerNotesKo: () => "대형 고객 수주가 실적을 견인했으나, SMB 고객들의 이탈률을 방어하기 위해 즉각적인 개선 조치를 단행했습니다.",
        speakerNotesEn: () => "Enterprise expansions carried our volume. We proactively mobilized corrective steps to shore up SMB velocity."
      },
      {
        layout: "bullets",
        titleKo: () => "3. 차기 분기 중점 실행 과제",
        titleEn: () => "3. Priority Initiatives for Next Quarter",
        subtitleKo: "지속적인 성장 모멘텀 유지를 위한 3대 과제",
        subtitleEn: "Three focused bets to accelerate compounding momentum",
        contentKo: (t) => [
          `'${t}' 기반의 글로벌 신규 마켓 침투 가속화`,
          "기존 고객 대상 업셀(Upsell) 및 크로스셀 파이프라인 30% 확대",
          "핵심 엔지니어링 리소스 보강을 통한 신규 기능 출시 주기 2주로 단축"
        ],
        contentEn: (t) => [
          `Accelerating cross-border expansion capitalizing on '${t}'`,
          "Expanding net revenue retention via a 30% expansion in enterprise upsell pipeline",
          "Compressing feature release cycles down to bi-weekly cadence via modular tooling"
        ],
        speakerNotesKo: () => "다음 분기에도 공격적인 고객 확장과 유지율 강화를 통해 연간 목표를 반드시 초과 달성하겠습니다.",
        speakerNotesEn: () => "These strategic priorities guarantee we sustain market velocity and exceed our annual board targets."
      }
    ]
  },

  // 9. IT 기술 & 시스템 아키텍처
  {
    id: "tech-architecture",
    nameKo: "IT 기술 & 시스템 아키텍처",
    nameEn: "Tech & Architecture Review",
    icon: "💻",
    taglineKo: "시스템 아키텍처 구성, 기술 스택, 고가용성 및 보안 설계",
    taglineEn: "Architecture blueprints, tech stacks, high availability & security",
    keywords: ["기술", "아키텍처", "시스템", "tech", "architecture", "it", "개발", "인프라", "보안", "클라우드"],
    slides: [
      {
        layout: "title",
        titleKo: (t) => `${t} 시스템 아키텍처 기술 사양서`,
        titleEn: (t) => `${t} - Technical Architecture Blueprint`,
        subtitleKo: "초고확장성, 고가용성 및 엔터프라이즈 보안 설계",
        subtitleEn: "High-Availability, Resilient & Enterprise-Grade Infrastructure",
        contentKo: () => ["문서: 수석 시스템 아키텍트 그룹", "Technical Review Pass"],
        contentEn: () => ["Lead Architecture Council", "RFC Approved Specification"],
        speakerNotesKo: (t) => `엔지니어링 팀 여러분, 본 장표는 '${t}'의 고확장성 시스템 아키텍처 구성 및 기술적 안정성 설계 기준을 설명합니다.`,
        speakerNotesEn: (t) => `Engineering leads, this document outlines the core architecture and resilience guarantees of '${t}'.`
      },
      {
        layout: "bullets",
        titleKo: () => "1. 아키텍처 설계 원칙 및 핵심 기술 스택",
        titleEn: () => "1. Core Design Tenets & Technology Stack",
        subtitleKo: "유지보수성과 유연성을 극대화한 모던 아키텍처",
        subtitleEn: "Modern modular decoupled stack built for hyperscale",
        contentKo: (t) => [
          `마이크로서비스 & 서버리스 기반: '${t}' 트래픽 급증 시 0.1초 내 자동 스케일아웃`,
          "프론트엔드: Next.js 14 App Router 및 Tailwind CSS 기반의 초경량 렌더링",
          "백엔드 & 데이터: 글로벌 엣지 API 캐싱과 데이터 무결성을 보장하는 고성능 DB 설계"
        ],
        contentEn: (t) => [
          `Serverless & Event-Driven: Instant horizontal auto-scaling under massive traffic spikes in '${t}'`,
          "Client Layer: Next.js App Router with ultra-lean hydration and zero bloated dependencies",
          "Data Infrastructure: Multi-region distributed edge replication guaranteeing sub-10ms response"
        ],
        speakerNotesKo: () => "단일 장애점(SPOF)을 원천 차단하고 서버리스 엣지 환경에서 즉각적인 탄력성을 발휘하도록 설계했습니다.",
        speakerNotesEn: () => "We eliminated all Single Points of Failure, engineering an infrastructure capable of handling 100x traffic surge seamlessly."
      },
      {
        layout: "metrics",
        titleKo: () => "2. 시스템 가용성 및 성능 SLA 지표",
        titleEn: () => "2. SLA Metrics & Reliability Benchmarks",
        subtitleKo: "미션 크리티컬 환경을 위한 무중단 성능 보장",
        subtitleEn: "Empirically verified uptime and latency benchmarks",
        contentKo: () => [],
        contentEn: () => [],
        metrics: [
          { label: "서비스 가동률 (Uptime)", value: "99.99%" },
          { label: "평균 P95 지연 시간", value: "< 45ms" },
          { label: "동시 처리 트래픽", value: "100K+ QPS" }
        ],
        speakerNotesKo: () => "99.99% 가동률 SLA와 P95 45ms 이하의 응답 속도를 보장하며, 글로벌 서비스에 즉각 투입 가능합니다.",
        speakerNotesEn: () => "Guaranteed 99.99% uptime with p95 response times remaining sub-45ms across global regions."
      },
      {
        layout: "bullets",
        titleKo: () => "3. 엔터프라이즈 보안 및 재해 복구(DR) 체계",
        titleEn: () => "3. Enterprise Security & Disaster Recovery",
        subtitleKo: "엔드투엔드 암호화 및 자동 롤백 파이프라인",
        subtitleEn: "Zero-trust compliance and automated zero-downtime rollback",
        contentKo: () => [
          "보안 정책: 전송 및 저장 데이터 AES-256 비트 암호화 및 제로 트러스트(Zero Trust) 적용",
          "재해 복구(DR): 글로벌 멀티 리전 실시간 백업 체계를 통한 RTO 1분, RPO 0 달성",
          "CI/CD 파이프라인: 정적 분석 및 보안 취약점 자동 검사 후 카나리(Canary) 무중단 배포"
        ],
        contentEn: () => [
          "Security Protocol: End-to-end AES-256 encryption at rest and in transit with Zero Trust controls",
          "Disaster Recovery: Active-active multi-region failover ensuring RTO <1 min and zero data loss",
          "Automated Delivery: Canary deployments gated by automated integration and vulnerability suites"
        ],
        speakerNotesKo: () => "철저한 제로 트러스트 정책을 적용하여 규제 준수와 엔터프라이즈 보안 기준을 모두 충족했습니다.",
        speakerNotesEn: () => "By adhering to rigorous zero-trust controls, our platform fulfills SOC2 and enterprise compliance audits out of the box."
      }
    ]
  },

  // 10. 정부 지원사업 & 공공 입찰
  {
    id: "grant-rfp",
    nameKo: "정부 지원사업 & 공공 입찰",
    nameEn: "Grant & Public RFP",
    icon: "🏛️",
    taglineKo: "지원사업 배경, 기술 개발 목표, 추진 체계 및 공공 파급효과",
    taglineEn: "Public grant compliance, technical milestones, execution & social impact",
    keywords: ["정부", "지원사업", "rfp", "입찰", "공공", "과제", "r&d", "정부지원", "제안서"],
    slides: [
      {
        layout: "title",
        titleKo: (t) => `${t} 사업계획 제안서`,
        titleEn: (t) => `${t} - Government Grant & Public RFP`,
        subtitleKo: "혁신 기술 개발 및 국가·사회적 파급효과 창출 계획",
        subtitleEn: "Innovation Proposal for Public Sector & Technology Grants",
        contentKo: () => ["주관기관: 기술사업화 추진단", "공공 과제 제안용"],
        contentEn: () => ["Grant Proposal Team", "Public RFP Assessment"],
        speakerNotesKo: (t) => `평가위원 여러분 안녕하십니까. 본 과제는 '${t}'를 통해 국가 산업 경쟁력을 제고하고 공공의 편익을 극대화하기 위해 제안되었습니다.`,
        speakerNotesEn: (t) => `Distinguished committee members, this RFP proposal addresses strategic public sector innovation in '${t}'.`
      },
      {
        layout: "bullets",
        titleKo: () => "1. 사업 추진 배경 및 정책적 부합성",
        titleEn: () => "1. Strategic Background & Public Alignment",
        subtitleKo: "국가 핵심 육성 정책 및 산업 수요와의 일치성",
        subtitleEn: "Direct alignment with public mandates and national strategic priorities",
        contentKo: (t) => [
          `정부의 미래 핵심 신산업 육성 로드맵과 '${t}'의 정책적 부합성 100% 충족`,
          "외산 솔루션 의존 탈피 및 국산 원천 기술 자립화를 통한 기술 주권 확보",
          "공공 부문 및 취약 계층의 디지털 정보 격차를 해소하는 실질적 복지 기여"
        ],
        contentEn: (t) => [
          `Directly fulfills national policy initiatives prioritizing modernization in '${t}'`,
          "Eliminates dependency on overseas foreign software by establishing domestic sovereign IP",
          "Closes public digital divide by democratizing critical capability access for all citizens"
        ],
        speakerNotesKo: () => "본 과제는 단순한 기술 개발을 넘어, 국가 전략 산업의 자립도 향상과 정책 목표 달성에 직결됩니다.",
        speakerNotesEn: () => "This initiative fulfills strategic government priorities while delivering measurable public dividends."
      },
      {
        layout: "metrics",
        titleKo: () => "2. 정량적 연구개발 목표 및 기대 효과",
        titleEn: () => "2. Quantitative R&D Targets & Impact",
        subtitleKo: "공인 시험기관 인증 기준의 정량 목표 수립",
        subtitleEn: "Empirical certification milestones validated by accredited agencies",
        contentKo: () => [],
        contentEn: () => [],
        metrics: [
          { label: "국산화 자립률", value: "100%" },
          { label: "성능 향상 배수", value: "3.5배" },
          { label: "신규 고용 창출", value: "25명+" }
        ],
        speakerNotesKo: () => "100% 원천 국산화를 달성하고 기존 대비 3.5배 성능 향상과 양질의 청년 일자리 25개를 창출하겠습니다.",
        speakerNotesEn: () => "Our proposal commits to 100% sovereign capability, a 3.5x performance multiple, and creating 25+ high-skill domestic jobs."
      },
      {
        layout: "bullets",
        titleKo: () => "3. 사업비 운용 계획 및 성과 확산 방안",
        titleEn: () => "3. Budget Allocation & Community Diffusion",
        subtitleKo: "투명한 예산 집행과 결과물의 공공 공유 계획",
        subtitleEn: "Transparent capital stewardship and broad public dissemination",
        contentKo: () => [
          "예산 배분: 연구인력 인건비 60%, 연구 장비 및 시제품 제작 30%, 지재권 취득 10%",
          "투명성 확보: 공공 연구비 관리 시스템을 통한 전 집행 내역 실시간 모니터링",
          "성과 공유: 개발 완료 후 공공 오픈소스 및 교육 기관 무료 라이선스 배포"
        ],
        contentEn: () => [
          "Budget Discipline: 60% R&D personnel, 30% prototyping hardware, 10% IP defense",
          "Auditing Rigor: Transparent real-time procurement tracking via public accounting channels",
          "Public Benefit: Open-source reference components distributed royalty-free to academia"
        ],
        speakerNotesKo: () => "국민의 세금으로 집행되는 사업비인 만큼 투명하고 엄정하게 집행하여 최대의 공공 성과를 도출하겠습니다.",
        speakerNotesEn: () => "We view these public funds with fiduciary reverence, guaranteeing maximum economic and social ROI."
      }
    ]
  },

  // 11. ESG & 지속가능경영
  {
    id: "esg-sustainability",
    nameKo: "ESG & 지속가능경영",
    nameEn: "ESG & Sustainability",
    icon: "🌿",
    taglineKo: "탄소중립 로드맵, 친환경 공급망, 사회적 책임 및 투명한 지배구조",
    taglineEn: "Net-zero roadmap, green supply chain, CSR & transparent governance",
    keywords: ["esg", "친환경", "탄소중립", "지속가능", "sustainability", "csr", "환경", "녹색"],
    slides: [
      {
        layout: "title",
        titleKo: (t) => `${t} ESG 지속가능경영 보고서`,
        titleEn: (t) => `${t} - ESG & Sustainability Blueprint`,
        subtitleKo: "지속 가능한 성장과 책임 있는 미래를 위한 실천 전략",
        subtitleEn: "Actionable Net-Zero Pathways & Corporate Social Responsibility",
        contentKo: () => ["발행: ESG 지속가능경영위원회", "Global Standards Compliance"],
        contentEn: () => ["ESG Leadership Committee", "GRI & SASB Frameworks"],
        speakerNotesKo: (t) => `주주 및 이해관계자 여러분, 오늘 발표는 '${t}'를 기반으로 지속 가능한 기업 가치를 창출하기 위한 ESG 실행 로드맵입니다.`,
        speakerNotesEn: (t) => `Stakeholders, today we present our comprehensive ESG roadmap to build durable, sustainable leadership in '${t}'.`
      },
      {
        layout: "bullets",
        titleKo: () => "1. 환경(E) 실천: 2030 탄소중립 로드맵",
        titleEn: () => "1. Environmental (E): Net-Zero Acceleration",
        subtitleKo: "친환경 전환을 통한 스코프 1, 2, 3 배출량 감축",
        subtitleEn: "Systematic Scope 1, 2, and 3 carbon reduction strategy",
        contentKo: (t) => [
          `'${t}' 전 과정에 친환경 에너지 및 재활용 자재 적용률 85% 이상 확대`,
          "데이터센터 및 제조 시설 100% 재생에너지(RE100) 전환 계획 수립",
          "공급망 협력사 대상 탄소 배출량 모니터링 시스템 무상 보급 지원"
        ],
        contentEn: (t) => [
          `Achieving 85%+ sustainable material utilization throughout the '${t}' lifecycle`,
          "Transitioning corporate data operations to 100% renewable energy contracts (RE100)",
          "Deploying cloud carbon-accounting tools across tier-1 supply partners without charge"
        ],
        speakerNotesKo: () => "환경 경영은 규제 대응이 아니라 미래 기업 생존의 필수 조건입니다. 2030년까지 탄소중립을 선도하겠습니다.",
        speakerNotesEn: () => "Environmental stewardship is no longer defensive compliance; it is our primary competitive differentiator."
      },
      {
        layout: "metrics",
        titleKo: () => "2. ESG 핵심 성과 달성 지표",
        titleEn: () => "2. Verified Sustainability Benchmarks",
        subtitleKo: "글로벌 공시 기준(GRI/SASB) 충족 지표",
        subtitleEn: "Audited metrics aligned with global disclosure standards",
        contentKo: () => [],
        contentEn: () => [],
        metrics: [
          { label: "온실가스 배출 감축률", value: "-48%" },
          { label: "친환경 패키징 도입율", value: "92%" },
          { label: "글로벌 ESG 종합 등급", value: "AA 등급" }
        ],
        speakerNotesKo: () => "온실가스를 48% 감축하고 친환경 패키징을 92% 달성하여 글로벌 ESG 최고 수준인 AA 등급을 획득했습니다.",
        speakerNotesEn: () => "Slashing emissions by 48% and hitting 92% green packaging secured our leadership AA sustainability rating."
      },
      {
        layout: "bullets",
        titleKo: () => "3. 사회(S) 및 지배구조(G) 투명성 강화",
        titleEn: () => "3. Social (S) & Governance (G) Excellence",
        subtitleKo: "포용적 조직문화와 건전한 이사회 중심 경영",
        subtitleEn: "Inclusive culture coupled with independent fiduciary governance",
        contentKo: () => [
          "사회(Social): 다양성·형평성·포용성(DEI) 지수 강화 및 협력사 상생 펀드 운용",
          "지배구조(Governance): 사외이사 비율 60% 이상 유지 및 윤리경영 감사제도 강화",
          "공시 투명성: 연례 ESG 지속가능경영 보고서의 투명한 대외 공시 및 피드백 수렴"
        ],
        contentEn: () => [
          "Social (S): Expanding Diversity, Equity & Inclusion (DEI) metrics alongside partner growth grants",
          "Governance (G): Maintaining 60%+ independent board directors and zero-tolerance ethics policies",
          "Disclosure: Annual transparent impact reports published for public inspection and audit"
        ],
        speakerNotesKo: () => "모든 이해관계자의 신뢰를 받는 투명한 지배구조와 상생 문화를 통해 영속 가능한 기업을 만들겠습니다.",
        speakerNotesEn: () => "Transparent governance and ethical stakeholder alignment ensure compounding enterprise value over decades."
      }
    ]
  },

  // 12. 사내 조직문화 & 온보딩
  {
    id: "hr-culture",
    nameKo: "사내 조직문화 & 온보딩",
    nameEn: "HR Culture & Onboarding",
    icon: "👥",
    taglineKo: "기업 핵심 가치, 사내 복지/제도 및 신규 입사자 적응 가이드",
    taglineEn: "Core values, benefits, operating principles & new hire onboarding",
    keywords: ["인사", "온보딩", "문화", "hr", "조직문화", "복지", "신규입사", "입사", "culture", "onboarding"],
    slides: [
      {
        layout: "title",
        titleKo: (t) => `${t} 팀에 오신 것을 환영합니다!`,
        titleEn: (t) => `Welcome to ${t} - Culture & Onboarding`,
        subtitleKo: "우리가 일하는 방식과 핵심 가치 핸드북",
        subtitleEn: "Our Operating Principles, Culture & Day-1 Guide",
        contentKo: () => ["발행: 피플 & 컬처 팀", "신규 입사자 필독"],
        contentEn: () => ["People & Culture Team", "New Teammate Edition"],
        speakerNotesKo: (t) => `새로운 동료 여러분, 환영합니다! 오늘 이 시간은 여러분이 '${t}' 팀에서 최고의 역량을 펼치실 수 있도록 우리의 문화와 일하는 방식을 공유하는 자리입니다.`,
        speakerNotesEn: (t) => `Welcome aboard! Today we share our culture, principles and everything you need to thrive at '${t}'.`
      },
      {
        layout: "bullets",
        titleKo: () => "1. 우리의 3대 핵심 가치 (Core Values)",
        titleEn: () => "1. Our Non-Negotiable Core Values",
        subtitleKo: "모든 의사결정의 나침반이 되는 3가지 원칙",
        subtitleEn: "The three guiding pillars behind every team decision",
        contentKo: () => [
          "자율과 책임 (Extreme Ownership): 완벽한 지시를 기다리지 않고 문제를 스스로 정의하고 끝까지 해결합니다",
          "탁월함에 대한 집착 (Obsession with Quality): 고객에게 부끄럽지 않은 완성도 높은 결과물만을 전달합니다",
          "투명한 피드백 (Radical Candor): 비난이 아닌 성장을 위해 솔직하고 직접적인 피드백을 즉시 나눕니다"
        ],
        contentEn: () => [
          "Extreme Ownership: We don't wait for permission; we identify roadblocks and own solutions end-to-end",
          "Relentless Quality: We take unyielding pride in our craft and never ship compromised work to users",
          "Radical Candor: Direct, compassionate and timely feedback given openly to elevate the entire squad"
        ],
        speakerNotesKo: () => "이 세 가지 가치는 벽에 걸어두는 표어가 아닙니다. 우리가 승진하고, 채용하고, 매일 토론할 때 사용하는 실제 판단 기준입니다.",
        speakerNotesEn: () => "These values are living operating principles used daily to hire, review and make tough trade-offs."
      },
      {
        layout: "metrics",
        titleKo: () => "2. 팀 구성 및 복지 인프라",
        titleEn: () => "2. Team Vitals & Comprehensive Benefits",
        subtitleKo: "최고의 동료들과 최상의 몰입 환경",
        subtitleEn: "Designed to remove friction so you can do your life's best work",
        contentKo: () => [],
        contentEn: () => [],
        metrics: [
          { label: "자율 원격 근무율", value: "100%" },
          { label: "연간 자기계발비", value: "300만 원" },
          { label: "직무 만족도 점수", value: "9.2 / 10" }
        ],
        speakerNotesKo: () => "업무에 몰입할 수 있도록 100% 자율 근무와 아낌없는 자기계발 지원을 아우르는 최상의 복지를 제공합니다.",
        speakerNotesEn: () => "We provide complete schedule autonomy and dedicated growth stipends so you can maintain peak performance."
      },
      {
        layout: "bullets",
        titleKo: () => "3. 첫 달(Day 1 ~ Day 30) 온보딩 로드맵",
        titleEn: () => "3. Your 30-Day Onboarding Roadmap",
        subtitleKo: "조급해하지 않고 자연스럽게 적응하는 3단계",
        subtitleEn: "A structured path to achieve early impact comfortably",
        contentKo: () => [
          "Week 1: 버디(Buddy) 매칭 및 툴 셋업 완료, 동료들과의 가벼운 1:1 티타임 진행",
          "Week 2~3: 첫 미니 프로젝트 수행을 통한 전반적인 워크플로우 및 코드베이스 적응",
          "Week 4: 30일 회고 미팅 및 향후 분기 개인 목표(OKR) 수립"
        ],
        contentEn: () => [
          "Week 1: Dedicated buddy match, environment onboarding, and informal coffee 1:1s across teams",
          "Week 2-3: Shipping your first small scoped milestone to absorb our deployment cadences",
          "Week 4: 30-day reflection debrief and co-authoring your upcoming quarterly OKRs"
        ],
        speakerNotesKo: () => "처음부터 모든 것을 잘할 필요는 없습니다. 든든한 버디가 함께할 테니 편하게 질문하고 적응해 나가십시오.",
        speakerNotesEn: () => "You are not expected to know everything on day one. Lean on your buddy and enjoy the journey."
      }
    ]
  },

  // 13. 행사 & 컨퍼런스 기획안
  {
    id: "event-conference",
    nameKo: "행사 & 컨퍼런스 기획안",
    nameEn: "Event & Conference",
    icon: "🎪",
    taglineKo: "행사 콘셉트, 타임테이블, 연사 라인업, 스폰서십 및 예산안",
    taglineEn: "Concept brief, agenda timetable, speaker roster, sponsors & budget",
    keywords: ["행사", "컨퍼런스", "이벤트", "축제", "conference", "event", "기획안", "스폰서", "연사", "세미나"],
    slides: [
      {
        layout: "title",
        titleKo: (t) => `${t} 컨퍼런스 총괄 기획서`,
        titleEn: (t) => `${t} - Annual Global Summit Proposal`,
        subtitleKo: "글로벌 리더들이 모이는 네트워킹과 인사이트의 장",
        subtitleEn: "Convening Industry Innovators & Global Thought Leaders",
        contentKo: () => ["기획: 컨퍼런스 조직위원회", "행사 승인 및 후원 유치용"],
        contentEn: () => ["Executive Steering Committee", "Sponsorship & Logistics Edition"],
        speakerNotesKo: (t) => `관계자 여러분, 본 기획서는 '${t}'를 주제로 산업계 최고의 혁신가들과 청중을 연결하는 대규모 컨퍼런스 실행 계획입니다.`,
        speakerNotesEn: (t) => `Partners, this master brief outlines our execution strategy to convene the flagship conference for '${t}'.`
      },
      {
        layout: "bullets",
        titleKo: () => "1. 행사 콘셉트 및 개최 목적",
        titleEn: () => "1. Event Vision & Value Proposition",
        subtitleKo: "단순한 정보 전달을 넘어 실질적인 비즈니스 연결 창출",
        subtitleEn: "Transforming standard keynotes into an active business catalyst",
        contentKo: (t) => [
          `슬로건: '${t}'의 미래를 직접 보고, 듣고, 연결하라`,
          "개최 목적: 산학연 최고 전문가들의 지식 공유 및 스타트업-투자자 1:1 밋업 지원",
          "차별성: 온라인 하이브리드 동시 송출을 통해 글로벌 참가자 접근성 극대화"
        ],
        contentEn: (t) => [
          `Theme: Connect, Discover, and Lead the Future of '${t}'`,
          "Purpose: Bridging thought leaders, top innovators, and active capital allocators",
          "Format: Immersive in-person summit paired with interactive real-time global live streaming"
        ],
        speakerNotesKo: () => "참가자들이 세션만 듣고 떠나는 행사가 아니라, 실제 비즈니스 제휴와 계약이 성사되는 비즈니스 페스티벌로 기획했습니다.",
        speakerNotesEn: () => "We designed this summit not as passive lectures, but as an active marketplace of ideas and deal flow."
      },
      {
        layout: "metrics",
        titleKo: () => "2. 예상 참가 규모 및 미디어 파급력",
        titleEn: () => "2. Projected Audience & Media Footprint",
        subtitleKo: "사전 등록 및 온오프라인 참여 지표 추정",
        subtitleEn: "Forecasted registration and global media impressions",
        contentKo: () => [],
        contentEn: () => [],
        metrics: [
          { label: "예상 현장 참관객", value: "2,500명+" },
          { label: "온라인 라이브 시청", value: "50,000뷰" },
          { label: "초청 글로벌 연사", value: "30명+" }
        ],
        speakerNotesKo: () => "2,500명의 오프라인 VIP 참관객과 5만 명 이상의 온라인 라이브 시청자를 유치할 계획입니다.",
        speakerNotesEn: () => "We forecast 2,500+ onsite attendees alongside 50,000+ digital livestream viewers across 40 countries."
      },
      {
        layout: "bullets",
        titleKo: () => "3. 스폰서십 패키지 및 후원 혜택",
        titleEn: () => "3. Tiered Sponsorship ROI Packages",
        subtitleKo: "후원사의 브랜드 인지도 및 리드 획득 극대화",
        subtitleEn: "Maximizing sponsor brand equity and direct executive lead capture",
        contentKo: () => [
          "다이아몬드 (1개 사): 메인 무대 독점 네이밍 및 기조 연설 30분 세션 배정",
          "골드 (5개 사): 전시장 중앙 대형 홍보 부스 제공 및 VIP 네트워킹 만찬 초대",
          "공식 후원 문의: event@s-probiz.com | 부스 마감 전 조기 신청 권장"
        ],
        contentEn: () => [
          "Diamond Tier: Exclusive mainstage title sponsorship and prime 30-minute keynote slot",
          "Gold Tier: Premium exhibition pavilion presence and private invitations to the VIP Gala",
          "Inquiries: event@s-probiz.com | Limited booth allocation awarded on rolling review"
        ],
        speakerNotesKo: () => "후원 기업의 브랜드가 가장 빛날 수 있는 다각적인 프로모션 혜택을 준비했습니다.",
        speakerNotesEn: () => "Our sponsorship tiers deliver direct high-touch executive access and unmatched brand resonance."
      }
    ]
  },

  // 14. 학술 연구 & 논문 디펜스
  {
    id: "research-thesis",
    nameKo: "학술 연구 & 논문 발표",
    nameEn: "Academic Research & Thesis",
    icon: "🔬",
    taglineKo: "연구 배경, 가설 설정, 실험 방법론, 실증 데이터 및 학술적 시사점",
    taglineEn: "Literature review, hypotheses, methodologies, empirical findings & defense",
    keywords: ["연구", "논문", "학술", "디펜스", "thesis", "research", "paper", "실험", "가설", "학회"],
    slides: [
      {
        layout: "title",
        titleKo: (t) => `${t}에 관한 실증적 연구 및 결과 고찰`,
        titleEn: (t) => `Empirical Investigation into ${t}`,
        subtitleKo: "석·박사 학위 논문 및 학술대회 심사 발표",
        subtitleEn: "Thesis Defense & Empirical Scientific Findings",
        contentKo: () => ["연구자: 연구책임자", "소속: 대학원 학술연구소"],
        contentEn: () => ["Principal Investigator", "Doctoral Defense Committee"],
        speakerNotesKo: (t) => `심사위원 여러분 안녕하십니까. 본 논문은 '${t}'에 대한 실증적 분석을 통해 기존 학계의 한계를 규명하고 새로운 모델을 제안합니다.`,
        speakerNotesEn: (t) => `Honored committee members, this defense presents rigorous empirical findings investigating '${t}'.`
      },
      {
        layout: "bullets",
        titleKo: () => "1. 연구 배경 및 선행 연구의 한계",
        titleEn: () => "1. Theoretical Background & Literature Gap",
        subtitleKo: "기존 이론의 불완전성과 본 연구의 가설 설정",
        subtitleEn: "Limitations of existing paradigms and our central thesis hypothesis",
        contentKo: (t) => [
          `문제의식: 기존 문헌에서는 '${t}'의 복합적인 변수 상호작용을 충분히 설명하지 못함`,
          "선행 연구 한계: 표본 수의 제한 및 정적인 횡단면 분석에 머물러 인과관계 입증 미흡",
          "본 연구 가설: 시계열 패널 데이터와 머신러닝 분석을 결합하여 동적 인과 메커니즘을 규명"
        ],
        contentEn: (t) => [
          `Theoretical Gap: Existing scholarship lacks explanatory power regarding non-linear variables in '${t}'`,
          "Methodological Constraint: Prior studies relied on small static cross-sectional sample cohorts",
          "Core Hypothesis: Longitudinal panel tracking paired with modern algorithms resolves the causal mechanism"
        ],
        speakerNotesKo: () => "기존 연구들은 정적 분석에만 그쳐 실제 메커니즘을 설명하는 데 한계가 있었습니다. 본 연구는 이 공백을 메우고자 합니다.",
        speakerNotesEn: () => "Previous literature treated these dynamics statically. Our work uncovers the true longitudinal causality."
      },
      {
        layout: "metrics",
        titleKo: () => "2. 연구 방법론 및 데이터 표본 신뢰도",
        titleEn: () => "2. Empirical Methodology & Data Rigor",
        subtitleKo: "통계적 유의성과 표본 타당성 검증",
        subtitleEn: "Statistical significance and model robustness validation",
        contentKo: () => [],
        contentEn: () => [],
        metrics: [
          { label: "총 유효 표본 수", value: "N = 12,450" },
          { label: "모형 설명력 (R²)", value: "0.874" },
          { label: "유의수준 (p-value)", value: "p < 0.001" }
        ],
        speakerNotesKo: () => "12,000건 이상의 유효 표본을 통해 모형 설명력 R² 0.874와 p값 0.001 미만의 높은 통계적 신뢰도를 확보했습니다.",
        speakerNotesEn: () => "With over 12,000 observations, our model demonstrates an R² of 0.874 at high statistical significance (p < 0.001)."
      },
      {
        layout: "bullets",
        titleKo: () => "3. 연구 결론 및 학술적·실무적 시사점",
        titleEn: () => "3. Scientific Contributions & Implications",
        subtitleKo: "이론적 발전과 현업 의사결정에 미치는 영향",
        subtitleEn: "Theoretical expansions and real-world policy contributions",
        contentKo: () => [
          "학술적 기여: 기존 정적 이론을 보완하는 새로운 통합 분석 모델의 타당성을 최초로 입증",
          "실무적 시사점: 정책 입안자 및 기업 경영진이 리스크를 예측하고 최적 자원을 배분할 수 있는 수식 도출",
          "향후 과제: 다국적 이종 산업군으로의 표본 확대를 통한 외적 타당성 추가 검증 예정"
        ],
        contentEn: () => [
          "Scholarly Advance: Validates the first unified dynamic behavioral framework in this domain",
          "Practical Utility: Offers practitioners an empirical rubric to optimize capital and resource allocations",
          "Future Horizon: Proposing cross-border multi-sector expansion cohorts to further confirm external validity"
        ],
        speakerNotesKo: () => "이상으로 논문 발표를 마치며, 심사위원님들의 소중한 지도와 질의에 답변드리겠습니다.",
        speakerNotesEn: () => "This concludes the formal presentation. I warmly welcome your questions and critical critiques."
      }
    ]
  },

  // 15. 비영리 & 기부 모금 제안
  {
    id: "nonprofit-fundraising",
    nameKo: "비영리 & 기부 모금 제안",
    nameEn: "Non-Profit & Fundraising",
    icon: "🤝",
    taglineKo: "사회적 문제 정의, 수혜 대상, 임팩트 지표 및 기부금 투명성",
    taglineEn: "Social problem framing, beneficiary impact metrics & transparent allocation",
    keywords: ["비영리", "기부", "모금", "ngo", "후원", "임팩트", "nonprofit", "fundraising", "사회공헌"],
    slides: [
      {
        layout: "title",
        titleKo: (t) => `${t} 희망 나눔 프로젝트 제안서`,
        titleEn: (t) => `${t} - Social Impact & Giving Proposal`,
        subtitleKo: "세상을 바꾸는 따뜻한 연대와 투명한 나눔",
        subtitleEn: "Mobilizing Compassion for Measurable Community Transformation",
        contentKo: () => ["기획: 사단법인 희망나눔재단", "공식 기부 파트너십"],
        contentEn: () => ["Philanthropic Impact Alliance", "Official Giving Partnership"],
        speakerNotesKo: (t) => `후원자 여러분, 오늘 우리는 '${t}'를 통해 복지 사각지대의 이웃들에게 실질적인 변화를 전하고자 합니다.`,
        speakerNotesEn: (t) => `Compassionate partners, thank you. Today we invite you to transform vulnerable communities through '${t}'.`
      },
      {
        layout: "bullets",
        titleKo: () => "1. 우리가 해결하고자 하는 사회적 문제",
        titleEn: () => "1. The Systemic Social Inequity",
        subtitleKo: "관심의 사각지대에서 방치된 현실",
        subtitleEn: "Exposing the overlooked crisis affecting vulnerable lives",
        contentKo: (t) => [
          `현실 실태: '${t}' 문제로 인해 기본적 권리를 보장받지 못하는 취약계층 급증`,
          "제도적 한계: 정부의 공공 예산 지원만으로는 긴급 구호와 장기 자립을 모두 감당하기 역부족",
          "우리의 개입: 민간 기부금과 전문 봉사 네트워크를 결합한 직접 전달 체계 구축"
        ],
        contentEn: (t) => [
          `The Crisis: Urgent deficits in '${t}' leave thousands without fundamental security and basic dignity`,
          "Institutional Limits: Public welfare safety nets alone are stretched beyond capacity to bridge the gap",
          "Our Action: Mobilizing verified grassroots pipelines delivering immediate relief directly to families"
        ],
        speakerNotesKo: () => "통계 뒤에 가려진 이웃들의 절박한 목소리를 외면할 수 없습니다. 여러분의 나눔이 절실한 시점입니다.",
        speakerNotesEn: () => "Behind cold statistics are real families in despair. Your compassionate intervention changes their reality."
      },
      {
        layout: "metrics",
        titleKo: () => "2. 프로젝트 임팩트 측정 지표",
        titleEn: () => "2. Proven Impact Multipliers",
        subtitleKo: "투명하고 확실한 변화의 지표",
        subtitleEn: "Direct measurable outcomes delivered per dollar invested",
        contentKo: () => [],
        contentEn: () => [],
        metrics: [
          { label: "직접 수혜 가정수", value: "1,200가구" },
          { label: "기부금 사업집행률", value: "92.5%" },
          { label: "자립 성공률", value: "78%" }
        ],
        speakerNotesKo: () => "기부금의 92.5%가 현장에 직접 집행되며, 1,200가구 중 78%가 완전한 경제적 자립에 성공했습니다.",
        speakerNotesEn: () => "92.5% of every dollar goes directly to program beneficiaries, generating a verified 78% self-reliance rate."
      },
      {
        layout: "bullets",
        titleKo: () => "3. 투명한 기부금 운용 및 후원자 예우",
        titleEn: () => "3. Transparent Stewardship & Recognition",
        subtitleKo: "1원 한 푼까지 공개하는 블록체인급 투명성",
        subtitleEn: "Complete financial transparency and lifelong partner honor",
        contentKo: () => [
          "재정 투명성: 외부 공인 회계법인의 매분기 정기 감사 보고서 100% 대외 공개",
          "현장 리포트: 후원자 전용 모바일 알림을 통해 내 기부금이 전달된 현장 사진과 편지 공유",
          "후원 신청: sharing@s-probiz.com | 소액 정기 후원부터 기업 매칭 그랜트까지 환영"
        ],
        contentEn: () => [
          "Audited Trust: Every expenditure independently certified by accredited accounting auditors",
          "Direct Connection: Real-time digital impact updates sharing photo verifications from field operations",
          "Get Involved: sharing@s-probiz.com | Welcoming monthly donors and corporate matching programs"
        ],
        speakerNotesKo: () => "신뢰를 생명으로 여기며 후원자 여러분의 정성이 가장 값지게 쓰이도록 약속드립니다.",
        speakerNotesEn: () => "Your sacred trust is our highest priority. Together, we can restore dignity and rewrite their futures."
      }
    ]
  },

  // 16. 의료 / 헬스케어 / 바이오
  {
    id: "healthcare-bio",
    nameKo: "의료 & 헬스케어/바이오",
    nameEn: "Healthcare & Bio Tech",
    icon: "🩺",
    taglineKo: "임상 연구 데이터, 질환 메커니즘, FDA/식약처 규제 및 시장성",
    taglineEn: "Clinical trial data, disease mechanisms, regulatory pathways & market potential",
    keywords: ["의료", "헬스케어", "바이오", "의약", "healthcare", "bio", "임상", "신약", "병원", "치료"],
    slides: [
      {
        layout: "title",
        titleKo: (t) => `${t} 임상 개발 및 바이오 헬스케어 동향`,
        titleEn: (t) => `${t} - Clinical Development & BioTech Pipeline`,
        subtitleKo: "차세대 치료 메커니즘과 글로벌 임상 인허가 전략",
        subtitleEn: "Novel Therapeutic Mechanisms & Global Regulatory Roadmap",
        contentKo: () => ["발표: 바이오 메디컬 연구소", "Medical Affairs Edition"],
        contentEn: () => ["Biomedical Research Council", "Scientific Affairs Review"],
        speakerNotesKo: (t) => `의료 및 바이오 전문가 여러분, 오늘 발표는 '${t}'에 대한 혁신적인 치료 기전과 글로벌 임상 개발 현황에 관한 것입니다.`,
        speakerNotesEn: (t) => `Colleagues and clinicians, today we present scientific validation and clinical pipelines regarding '${t}'.`
      },
      {
        layout: "bullets",
        titleKo: () => "1. 미충족 의료 수요 (Unmet Medical Needs)",
        titleEn: () => "1. Unmet Clinical Need & Pathology",
        subtitleKo: "기존 표준 치료법(SoC)의 한계와 부작용",
        subtitleEn: "Severe toxicity and efficacy plateaus in standard-of-care options",
        contentKo: (t) => [
          `질환 부담: '${t}' 환자군의 65% 이상이 기존 치료제에 대한 내성 발현으로 고통`,
          "기존 치료의 한계: 전신 독성으로 인한 낮은 복약 순응도 및 중도 탈락률 40%",
          "새로운 접근법: 표적 전달 기술을 활용하여 정상 세포 손상을 최소화하는 정밀 치료제 개발"
        ],
        contentEn: (t) => [
          `Clinical Deficit: Over 65% of '${t}' patient cohorts experience severe therapeutic resistance`,
          "Standard of Care Limits: Systemic off-target toxicity causing high dropout rates (>40%)",
          "Targeted Horizon: Novel molecular delivery targeting diseased tissue with near-zero collateral toxicity"
        ],
        speakerNotesKo: () => "환자들에게 가장 시급한 것은 부작용 없이 내성을 극복할 수 있는 새로운 차원의 표적 치료제입니다.",
        speakerNotesEn: () => "Patients desperately require targeted options that overcome therapeutic resistance without toxic burden."
      },
      {
        layout: "metrics",
        titleKo: () => "2. 전임상 및 임상 데이터 유효성",
        titleEn: () => "2. Preclinical Efficacy & Safety Profile",
        subtitleKo: "실험군 대비 통계적으로 유의미한 효능 입증",
        subtitleEn: "Statistically robust biomarker response against control arms",
        contentKo: () => [],
        contentEn: () => [],
        metrics: [
          { label: "객관적 반응률 (ORR)", value: "74.2%" },
          { label: "무진행 생존기간 (PFS)", value: "18.4개월" },
          { label: "중대 이상반응 (SAE)", value: "< 2.1%" }
        ],
        speakerNotesKo: () => "임상 데이터 결과, 객관적 반응률 74.2%와 현저히 낮은 이상반응(2.1% 이하)을 기록하며 뛰어난 안전성을 확인했습니다.",
        speakerNotesEn: () => "Our data exhibits a compelling 74.2% Objective Response Rate with high safety tolerances (<2.1% SAEs)."
      },
      {
        layout: "bullets",
        titleKo: () => "3. 글로벌 인허가 및 상용화 로드맵",
        titleEn: () => "3. Global Regulatory Pathways & Commercialization",
        subtitleKo: "FDA 패스트트랙 지정 및 글로벌 기술수출(L/O) 전략",
        subtitleEn: "Accelerated FDA pathways and strategic big-pharma licensing",
        contentKo: () => [
          "규제 승인: 미국 FDA 및 유럽 EMA 패스트트랙(신속심사) 신청 준비 완료",
          "지식재산권(IP): 핵심 물질 및 제형 특허 글로벌 40개국 독점 등록 완료",
          "파트너십: 글로벌 탑티어 제약사들과의 공동 임상 및 조기 기술수출(L/O) 협상 진행 중"
        ],
        contentEn: () => [
          "Regulatory Filing: Finalizing fast-track designation dossier for US FDA and EU EMA submissions",
          "IP Fortification: Primary composition-of-matter patents locked down in 40 jurisdictions globally",
          "Licensing: Advanced discussions underway with top-tier global pharmaceutical co-development partners"
        ],
        speakerNotesKo: () => "독보적인 특허 방어벽을 바탕으로 신속한 글로벌 인허가와 기술수출을 성사시키겠습니다.",
        speakerNotesEn: () => "With ironclad global IP protection, we are poised to rapidly scale toward commercial licensing."
      }
    ]
  },

  // 17. 이커머스 & D2C 브랜드 전략
  {
    id: "ecommerce-d2c",
    nameKo: "이커머스 & D2C 브랜드",
    nameEn: "E-Commerce & D2C",
    icon: "🛒",
    taglineKo: "상품 소싱, 자사몰 유입 퍼널, 객단가 최적화 및 고객 리텐션",
    taglineEn: "Merchandising, acquisition funnels, AOV optimization & retention",
    keywords: ["이커머스", "d2c", "쇼핑몰", "스마트스토어", "ecommerce", "유통", "판매", "쿠팡", "소싱"],
    slides: [
      {
        layout: "title",
        titleKo: (t) => `${t} D2C 이커머스 스케일업 전략`,
        titleEn: (t) => `${t} - D2C E-Commerce Growth Playbook`,
        subtitleKo: "자사몰 객단가 극대화 및 재구매 플라이휠 구축",
        subtitleEn: "Scaling Direct-to-Consumer Acquisition, AOV & Retention",
        contentKo: () => ["기획: D2C 그로스 전략팀", "E-Commerce Strategy 2026"],
        contentEn: () => ["D2C Growth Division", "Annual E-Commerce Strategy"],
        speakerNotesKo: (t) => `팀원 여러분, 오늘은 수수료 높은 오픈마켓 의존을 줄이고 '${t}' 자사몰을 통해 마진과 재구매율을 극대화할 D2C 전략을 공유합니다.`,
        speakerNotesEn: (t) => `Growth team, today we lay out our direct-to-consumer playbook to scale '${t}' profitability.`
      },
      {
        layout: "bullets",
        titleKo: () => "1. 상품 포지셔닝 및 차별화 전략",
        titleEn: () => "1. Hero Product Positioning & Moat",
        subtitleKo: "가격 경쟁이 아닌 압도적 브랜드 경험으로 승부",
        subtitleEn: "Competing on category narrative rather than commodity price wars",
        contentKo: (t) => [
          `'${t}' 카테고리에서 소비자가 가장 불만족해하는 품질 저하 요소를 원천 개선`,
          "언박싱 경험과 브랜드 스토리텔링을 통해 SNS 자발적 바이럴 공유율 35% 달성",
          "스타터 키트 및 구독형 번들링 구성을 통해 초기 객단가(AOV) 25% 상승 견인"
        ],
        contentEn: (t) => [
          `Eliminating standard quality compromises prevalent across competing products in '${t}'`,
          "Curated unboxing experiences driving a 35% user-generated organic social sharing rate",
          "Hero starter kits and subscribe-and-save bundles lifting initial Average Order Value by 25%"
        ],
        speakerNotesKo: () => "가격 깎기 경쟁에 빠지지 않고, 고객이 기꺼이 정가를 지불하게 만드는 브랜드 내러티브를 완성했습니다.",
        speakerNotesEn: () => "We refuse to race to the bottom on price. Our margins are secured by irresistible product storytelling."
      },
      {
        layout: "metrics",
        titleKo: () => "2. 이커머스 핵심 운영 지표 (Unit Economics)",
        titleEn: () => "2. Core Unit Economics & Scaling Efficiency",
        subtitleKo: "건전한 공헌이익을 창출하는 효율 지표",
        subtitleEn: "Strong unit margins compounding cash flow velocity",
        contentKo: () => [],
        contentEn: () => [],
        metrics: [
          { label: "평균 객단가 (AOV)", value: "$78.50" },
          { label: "90일 재구매율", value: "38.2%" },
          { label: "공헌이익률", value: "42.0%" }
        ],
        speakerNotesKo: () => "객단가 78달러, 90일 내 재구매율 38%를 달성하여 광고비 지출 후에도 42%의 탄탄한 공헌이익을 남깁니다.",
        speakerNotesEn: () => "With an AOV of $78.50 and a 38.2% 90-day repeat rate, we bank a durable 42% contribution margin."
      },
      {
        layout: "bullets",
        titleKo: () => "3. CRM 자동화 및 충성 고객 리텐션 루프",
        titleEn: () => "3. Automated CRM & High-LTV Retention Loops",
        subtitleKo: "광고비 없는 오가닉 재구매 파이프라인 가동",
        subtitleEn: "Eliminating ad spend dependency through predictive re-orders",
        contentKo: () => [
          "주기별 알림: 소비 주기 데이터를 분석하여 상품 소진 5일 전 개인화 재구매 알림톡 발송",
          "VIP 멤버십: 누적 구매 고객 전용 시크릿 할인 및 신제품 사전 체험 기회 부여",
          "커뮤니티 연계: 고객 리뷰를 제품 R&D에 즉각 반영하는 양방향 브랜드 팬덤 구축"
        ],
        contentEn: () => [
          "Predictive Triggers: Automated personalized SMS dispatched 5 days prior to predicted replenishment",
          "VIP Tiering: Unlocking secret previews and tiered community loyalty perks for repeat champions",
          "Brand Ecosystem: Transforming passionate customers into co-creators feeding our product roadmap"
        ],
        speakerNotesKo: () => "첫 구매 고객을 단골로 전환시키는 자동화 CRM 루프를 통해 획득 비용(CAC)을 장기적으로 제로에 가깝게 만들겠습니다.",
        speakerNotesEn: () => "By engineering compounding retention, our blended customer acquisition costs decline month over month."
      }
    ]
  },

  // 18. 부동산 개발 & 투자 유치
  {
    id: "real-estate",
    nameKo: "부동산 개발 & 투자 유치",
    nameEn: "Real Estate Investment",
    icon: "💰",
    taglineKo: "입지 분석, 건축 개발 개요, 예상 투자 수익률(ROI) 및 분양/임대 계획",
    taglineEn: "Location underwriting, architectural specs, ROI modeling & leasing strategy",
    keywords: ["부동산", "건축", "시행", "분양", "임대", "토지", "real estate", "투자유치", "수익률"],
    slides: [
      {
        layout: "title",
        titleKo: (t) => `${t} 개발 사업 투자 제안서`,
        titleEn: (t) => `${t} - Real Estate Development & Investment`,
        subtitleKo: "프라임 입지 분석 및 최고 수익률 달성을 위한 개발 기획",
        subtitleEn: "Prime Asset Underwriting & High-Yield Capital Deployment",
        contentKo: () => ["주관: 글로벌 부동산 투자개발 그룹", "Investor Information Memorandum"],
        contentEn: () => ["Real Estate Capital Partners", "Confidential Investment Memo"],
        speakerNotesKo: (t) => `투자자 여러분, 본 제안서는 우수한 입지적 가치와 높은 기대 수익률을 자랑하는 '${t}' 개발 프로젝트에 관한 것입니다.`,
        speakerNotesEn: (t) => `Distinguished investors, this briefing outlines a high-conviction development opportunity for '${t}'.`
      },
      {
        layout: "bullets",
        titleKo: () => "1. 사업지 입지 분석 및 배후 수요",
        titleEn: () => "1. Macro Location Underwriting & Demand",
        subtitleKo: "교통망 확충 및 핵심 상권 유입 인구 분석",
        subtitleEn: "Transit accessibility and strong demographic absorption buffers",
        contentKo: (t) => [
          `지리적 우수성: '${t}' 핵심 역세권 도보 3분 거리로 일평균 유동인구 8만 명 확보`,
          "교통 호재: 신규 광역 급행 철도 개통 예정에 따른 도심 접근성 획기적 개선",
          "공급 부족: 인근 노후 건물 밀집으로 신축 하이엔드 시설에 대한 대기 수요 풍부"
        ],
        contentEn: (t) => [
          `Prime Accessibility: Situated within 3 minutes of central transit hubs in '${t}'`,
          "Infrastructure Catalysts: Upcoming high-speed transit linkages compressing urban commute times",
          "Supply Void: Acute shortage of modern tier-1 properties driving unyielding pre-leasing inquiries"
        ],
        speakerNotesKo: () => "입지가 곧 가치입니다. 역세권 도보 3분과 교통 개발 호재가 맞물려 지가 상승과 공실률 제로를 보장합니다.",
        speakerNotesEn: () => "Location dictates value. The converging transit infrastructure virtually guarantees near-zero vacancy."
      },
      {
        layout: "metrics",
        titleKo: () => "2. 사업 수지 분석 및 투자 수익률 (IRR)",
        titleEn: () => "2. Pro-Forma Capitalization & Projected IRR",
        subtitleKo: "보수적 추정을 통한 안전마진 확보",
        subtitleEn: "Conservative sensitivity modeling delivering robust safety margins",
        contentKo: () => [],
        contentEn: () => [],
        metrics: [
          { label: "목표 내부수익률 (IRR)", value: "19.8%" },
          { label: "자본 환원율 (Cap Rate)", value: "6.8%" },
          { label: "원금 회수 기간", value: "3.5년" },
        ],
        speakerNotesKo: () => "보수적인 임대료 추정에도 연 19.8%의 목표 IRR과 6.8%의 Cap Rate를 달성할 수 있는 탁월한 프로젝트입니다.",
        speakerNotesEn: () => "Under conservative debt modeling, the project yields a 19.8% target IRR and an attractive 6.8% Cap Rate."
      },
      {
        layout: "bullets",
        titleKo: () => "3. 건축 개요 및 분양·임대 운영 로드맵",
        titleEn: () => "3. Development Milestones & Leasing Strategy",
        subtitleKo: "인허가 완료부터 준공 및 조기 앵커 테넌트 유치",
        subtitleEn: "From zoning approvals to anchor tenant pre-commitment",
        contentKo: () => [
          "인허가 및 착공: 2026년 1분기 건축 심의 통과 및 메이저 시공사 책임 준공 확약",
          "앵커 테넌트 유치: 유명 프랜차이즈 및 대형 의료기관과 준공 전 사전 임대차 MOU 체결",
          "투자 참여 구조: 선순위 담보 대출 및 우선주 지분 참여를 통한 원금 보호 장치 완비"
        ],
        contentEn: () => [
          "Zoning & Groundbreak: Full municipal approvals cleared with guaranteed-maximum construction contracts",
          "Pre-Leasing Momentum: Pre-commitments secured with anchor medical and corporate enterprise tenants",
          "Capital Stack Protection: Senior debt priority and preferred equity structures insulating principal downside"
        ],
        speakerNotesKo: () => "시공사 책임 준공과 사전 임대 MOU를 통해 투자 원금 손실 위험을 완벽히 차단했습니다.",
        speakerNotesEn: () => "Downside risk is fortified by guaranteed completion bonds and tier-1 anchor tenant pre-commitments."
      }
    ]
  },

  // 19. 크리에이티브 디자인 브리프
  {
    id: "creative-design",
    nameKo: "크리에이티브 디자인 브리프",
    nameEn: "Creative & Design Brief",
    icon: "🎨",
    taglineKo: "브랜드 무드보드, 비주얼 아이덴티티, 폰트/컬러 시스템 및 산출물 가이드",
    taglineEn: "Moodboard, visual identity systems, typography, color palettes & deliverables",
    keywords: ["디자인", "크리에이티브", "브랜드", "브리프", "design", "creative", "ui", "ux", "아이덴티티", "로고"],
    slides: [
      {
        layout: "title",
        titleKo: (t) => `${t} 크리에이티브 디자인 디렉션`,
        titleEn: (t) => `${t} - Creative Direction & Brand Identity`,
        subtitleKo: "시각적 감동과 일관된 브랜드 경험을 완성하는 디자인 가이드",
        subtitleEn: "Visual Architecture, Design Tokens & Creative Execution Brief",
        contentKo: () => ["기획: 브랜드 디자인 스튜디오", "Design System Guidelines"],
        contentEn: () => ["Brand Experience Studio", "Design System Guidelines 2026"],
        speakerNotesKo: (t) => `디자인 및 마케팅 팀 여러분, 본 가이드는 '${t}'의 브랜드 에센스를 시각 언어로 완벽히 구현하기 위한 디자인 브리프입니다.`,
        speakerNotesEn: (t) => `Creative leads, this brief establishes the foundational visual tokens and identity guidelines for '${t}'.`
      },
      {
        layout: "bullets",
        titleKo: () => "1. 브랜드 에센스 및 비주얼 콘셉트 (Mood)",
        titleEn: () => "1. Brand Essence & Mood Direction",
        subtitleKo: "우리의 디자인이 전달해야 하는 핵심 감정 키워드",
        subtitleEn: "The core sensory and aesthetic emotional anchors of our brand",
        contentKo: (t) => [
          `키워드: 모던(Modern), 미니멀(Minimal), 신뢰(Trustworthiness)의 조화`,
          `'${t}'의 복잡한 속성을 군더더기 없는 정제된 그리드 시스템으로 시각화`,
          "불필요한 장식을 배제하고 타이포그래피와 여백(Negative Space)의 대비로 임팩트 극대화"
        ],
        contentEn: (t) => [
          "Core Aesthetic: The synthesis of architectural minimalism, confidence and modern utility",
          `Translating the complex attributes of '${t}' into a rational, rhythmic design grid system`,
          "Rejecting decorative clutter; leveraging typography scale and deliberate negative space for maximum punch"
        ],
        speakerNotesKo: () => "디자인은 단순한 장식이 아닌 태도입니다. 여백과 절제된 타이포그래피로 강렬한 브랜드 존재감을 표현하겠습니다.",
        speakerNotesEn: () => "Design is intentional behavior, not decoration. Generous negative space signals confidence and premium quality."
      },
      {
        layout: "metrics",
        titleKo: () => "2. 디자인 토큰 및 인터랙션 기준",
        titleEn: () => "2. Design Tokens & UI Accessibility",
        subtitleKo: "일관된 디지털 경험을 위한 시스템 규격",
        subtitleEn: "Deterministic design rules guaranteeing cross-surface cohesion",
        contentKo: () => [],
        contentEn: () => [],
        metrics: [
          { label: "텍스트 대비비 (WCAG)", value: "7.2:1 AAA" },
          { label: "기본 그리드 모듈", value: "8pt Grid" },
          { label: "마이크로 모션 시간", value: "200ms" }
        ],
        speakerNotesKo: () => "8포인트 그리드와 최고 등급 접근성 기준(7.2:1 대비비)을 적용하여 모든 디바이스에서 최상의 가독성을 보장합니다.",
        speakerNotesEn: () => "Engineered on an 8pt grid with strict WCAG AAA contrast ratios (7.2:1), guaranteeing effortless readability."
      },
      {
        layout: "bullets",
        titleKo: () => "3. 핵심 제작물 산출 가이드 및 릴리즈 일정",
        titleEn: () => "3. Key Deliverables & Release Timeline",
        subtitleKo: "웹, 앱, 마케팅 에셋의 일관된 배포 파이프라인",
        subtitleEn: "End-to-end design token rollout across mobile, web & print",
        contentKo: () => [
          "디자인 시스템: Figma 토큰과 Tailwind CSS 코드를 100% 동기화하여 개발 공수 절감",
          "마케팅 킷: 소셜 미디어 배너, 발표 덱 템플릿, 패키징 가이드라인 일괄 패키징",
          "품질 검수: 디자인 QA 체크리스트를 통과한 에셋만 프로덕션 환경에 최종 배포"
        ],
        contentEn: () => [
          "Design Tokens: 1:1 parity between Figma design components and Tailwind production code",
          "Marketing Suite: Multi-surface social cards, keynote decks, and high-res print templates ready",
          "Quality Assurance: Strict visual design QA gating before components push live to master"
        ],
        speakerNotesKo: () => "피그마와 실제 프론트엔드 코드가 100% 동기화되어 디자인과 개발 사이의 불일치를 제로화했습니다.",
        speakerNotesEn: () => "Direct parity between design tokens and code guarantees pixel-perfect fidelity across every device."
      }
    ]
  },

  // 20. 사이버 보안 & 리스크 감사
  {
    id: "security-audit",
    nameKo: "사이버 보안 & 리스크 감사",
    nameEn: "Cybersecurity & Risk Audit",
    icon: "🛡️",
    taglineKo: "위협 환경 분석, 취약점 진단, 침해 대응 체계 및 컴플라이언스",
    taglineEn: "Threat vector audits, vulnerability assessment, incident response & compliance",
    keywords: ["보안", "사이버", "해킹", "취약점", "security", "audit", "감사", "컴플라이언스", "soc2", "정보보안"],
    slides: [
      {
        layout: "title",
        titleKo: (t) => `${t} 정보보안 및 리스크 감사 보고서`,
        titleEn: (t) => `${t} - Cybersecurity & Risk Audit Assessment`,
        subtitleKo: "사이버 위협 선제 대응 및 글로벌 보안 컴플라이언스 인증",
        subtitleEn: "Zero-Trust Architecture, Threat Vector Remediation & Audit Findings",
        contentKo: () => ["발행: 정보보호 최고책임자(CISO)실", "Strictly Confidential / Security Clearance"],
        contentEn: () => ["Office of the CISO", "Classified Audit Review"],
        speakerNotesKo: (t) => `경영진 및 보안 위원회 여러분, 본 보고서는 '${t}' 시스템 전반에 대한 보안 취약점 진단 결과와 선제적 방어 체계 구축 방안을 담고 있습니다.`,
        speakerNotesEn: (t) => `Leadership and risk committee members, this report details our security audit findings and zero-trust postures for '${t}'.`
      },
      {
        layout: "bullets",
        titleKo: () => "1. 사이버 위협 환경 및 취약점 진단 결과",
        titleEn: () => "1. Threat Landscape & Penetration Findings",
        subtitleKo: "외부 공격 경로 및 내부 데이터 유출 리스크 점검",
        subtitleEn: "Penetration test vectors, perimeter audits and internal exposure risks",
        contentKo: (t) => [
          `위협 동향: '${t}' 영역을 타깃으로 한 랜섬웨어 및 정교한 공급망 공격 45% 급증`,
          "모의 해킹 결과: 레거시 API 엔드포인트에서 인증 우회 위험 2건 조기 식별 및 즉시 패치",
          "자산 보호: 미승인 단말기의 내부망 접속을 원천 차단하는 제로 트러스트(Zero Trust) 정책 적용"
        ],
        contentEn: (t) => [
          `Threat Velocity: Sophisticated credential stuffing and supply chain vectors against '${t}' up 45%`,
          "Red-Team Findings: Identified 2 perimeter edge auth bypass points; patched and remediated in under 4 hours",
          "Zero-Trust Policy: Terminating all implicit trust by requiring mutual TLS across all microservice boundaries"
        ],
        speakerNotesKo: () => "공격자들의 침투 시도가 정교해지고 있습니다. 우리는 모의 해킹을 통해 취약점을 선제적으로 발견하고 즉시 봉쇄했습니다.",
        speakerNotesEn: () => "Attacks are increasingly automated and sophisticated. Our red-team findings allowed us to pre-emptively neutralize vulnerabilities."
      },
      {
        layout: "metrics",
        titleKo: () => "2. 보안 방어 및 침해 대응 지표",
        titleEn: () => "2. Security Response Velocity & Defense Metrics",
        subtitleKo: "글로벌 벤치마크를 상회하는 침해 대응 속도",
        subtitleEn: "Audited response velocities outpacing global industry benchmarks",
        contentKo: () => [],
        contentEn: () => [],
        metrics: [
          { label: "평균 위협 탐지 시간 (MTTD)", value: "< 3분" },
          { label: "침해사고 대응 시간 (MTTR)", value: "< 15분" },
          { label: "컴플라이언스 준수율", value: "100%" }
        ],
        speakerNotesKo: () => "위협 탐지 3분 이내, 대응 15분 이내의 초고속 대응 체계를 구축하여 침해 사고 피해를 제로화했습니다.",
        speakerNotesEn: () => "Our automated SIEM triggers isolate anomalous telemetry in under 3 minutes, resolving alerts in sub-15 minutes."
      },
      {
        layout: "bullets",
        titleKo: () => "3. 글로벌 컴플라이언스 및 중장기 보안 로드맵",
        titleEn: () => "3. Global Compliance Attainment & Roadmap",
        subtitleKo: "SOC2 Type II, ISO 27001 및 GDPR 완벽 준수",
        subtitleEn: "Continuous compliance attestation and zero-trust engineering",
        contentKo: () => [
          "글로벌 인증: SOC2 Type II 및 ISO/IEC 27001 국제 표준 인증 심사 무결함 통과",
          "임직원 보안 훈련: 분기별 모의 피싱 훈련 및 필수 보안 교육을 통해 보안 인식 강화",
          "지속적 모니터링: 24/7 AI 기반 통합 보안관제(SOC) 가동을 통한 실시간 이상 징후 차단"
        ],
        contentEn: () => [
          "Global Compliance: Flawless zero-finding clearance for SOC2 Type II and ISO/IEC 27001 certifications",
          "Human Layer: Quarterly simulated social-engineering drills driving employee phishing susceptibility to <1%",
          "Continuous Guard: 24/7 AI-orchestrated Security Operations Center (SOC) containing live zero-day anomalies"
        ],
        speakerNotesKo: () => "국제 표준 인증을 모두 확보함으로써 엔터프라이즈 고객들이 안심하고 이용할 수 있는 최고 수준의 신뢰성을 증명했습니다.",
        speakerNotesEn: () => "Securing enterprise compliance attestations guarantees that partner assets are fortified with bank-grade defense."
      }
    ]
  }
];

// 주제(Topic) 키워드를 기반으로 20개 중 가장 적합한 프레임워크를 똑똑하게 자동 감지하는 함수
export function detectFrameworkByTopic(topic: string): FrameworkDefinition {
  const lower = topic.toLowerCase();
  
  for (const framework of FRAMEWORKS_LIST) {
    for (const kw of framework.keywords) {
      if (lower.includes(kw.toLowerCase())) {
        return framework;
      }
    }
  }

  // 기본값: 스타트업 IR 피치덱
  return FRAMEWORKS_LIST[0];
}

export function getFrameworkById(id?: string): FrameworkDefinition {
  if (!id || id === "auto") {
    return FRAMEWORKS_LIST[0];
  }
  const found = FRAMEWORKS_LIST.find((f) => f.id === id);
  return found || FRAMEWORKS_LIST[0];
}
