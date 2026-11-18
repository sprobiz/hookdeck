import { DeckRequest, DeckResponse, SlideItem } from "@/types/deck";
import { getFrameworkById, detectFrameworkByTopic, FRAMEWORKS_LIST } from "./frameworks";

export function generateSmartDeck(req: DeckRequest): DeckResponse {
  const isKo = req.language === "ko";
  const userTopic = req.topic.trim();
  const customInstr = req.customInstructions?.trim() || "";

  // 1. 프레임워크 결정 (사용자 명시적 선택 또는 AI 자동 키워드 감지)
  let selectedFramework = req.frameworkId && req.frameworkId !== "auto"
    ? getFrameworkById(req.frameworkId)
    : detectFrameworkByTopic(userTopic + " " + customInstr);

  // 2. 슬라이드 수 결정 (시간 프리셋 기반 또는 명시적 slideCount)
  let targetCount = req.slideCount || 6;
  if (req.duration) {
    if (req.duration <= 3) targetCount = 5;
    else if (req.duration <= 5) targetCount = 8;
    else if (req.duration <= 10) targetCount = 12;
    else targetCount = 18;
  }

  // 3. 사용자가 커스텀 순서/목차를 명시했는지 검사 (예: 1. ... 2. ... 또는 줄바꿈 목록)
  const combinedText = `${userTopic}\n${customInstr}`;
  const customLines = combinedText
    .split(/\n|,|;/)
    .map((l) => l.trim())
    .filter((l) => /^(슬라이드\s*\d+|\d+[\.\)\-:]|\-\s+)/i.test(l) || (l.length > 5 && (l.includes("순서") || l.includes("강조") || l.includes("소개"))));

  const slides: SlideItem[] = [];

  // 커스텀 지시사항이 2개 이상 구체적으로 파싱되는 경우 -> 커스텀 순서 최우선 반영 모드
  if (customLines.length >= 2) {
    // 슬라이드 1: 타이틀 슬라이드
    slides.push({
      id: 1,
      slideNumber: 1,
      title: userTopic.split(/\n/)[0].replace(/^(슬라이드\s*\d+|\d+[\.\)\-:]|\-\s+)/, "").trim(),
      subtitle: isKo ? `${selectedFramework.nameKo} 맞춤 실행 계획` : `${selectedFramework.nameEn} Custom Blueprint`,
      layout: "title",
      content: [
        isKo ? `분석 및 기획: HookDeck PRO (${selectedFramework.nameKo})` : `Architected with HookDeck PRO`,
        isKo ? "사용자 맞춤형 순서 및 요청사항 100% 반영" : "Tailored to Custom Specifications"
      ],
      speakerNotes: isKo
        ? `안녕하십니까. 오늘 발표는 귀사께서 요청하신 순서와 방향에 맞추어 설계된 '${userTopic}' 프레젠테이션입니다.`
        : `Welcome everyone. Today's presentation on '${userTopic}' is structured precisely according to your bespoke priorities.`
    });

    // 커스텀 라인들을 슬라이드로 변환
    customLines.forEach((line, idx) => {
      const cleanTitle = line.replace(/^(슬라이드\s*\d+|\d+[\.\)\-:]|\-\s+)/, "").trim();
      const slideNum = idx + 2;

      // 지표나 숫자가 포함된 경우 -> metrics 레이아웃
      const hasNumbers = /\d+[%억만달러원kKmM]|\b(roi|kpi|cvr|cac|mrr|arr)\b/i.test(cleanTitle);

      if (hasNumbers) {
        slides.push({
          id: slideNum,
          slideNumber: slideNum,
          title: cleanTitle,
          subtitle: isKo ? "핵심 목표 수치 및 성과 지표 (KPI)" : "Key Performance Indicators & Milestones",
          layout: "metrics",
          content: [],
          metrics: [
            { label: isKo ? "목표 성장률" : "Target Velocity", value: "+300%" },
            { label: isKo ? "핵심 달성 지표" : "Primary Milestone", value: "100% 달성" },
            { label: isKo ? "기대 회수 기간" : "Payback Period", value: "< 3개월" }
          ],
          speakerNotes: isKo
            ? `이 슬라이드는 요청하신 '${cleanTitle}'에 대한 정량적 목표와 핵심 지표를 나타냅니다.`
            : `This slide represents the verified quantitative KPIs and metrics requested for '${cleanTitle}'.`
        });
      } else {
        slides.push({
          id: slideNum,
          slideNumber: slideNum,
          title: cleanTitle,
          subtitle: isKo ? "세부 실행 방안 및 핵심 추진 과제" : "Key Execution Strategy & Core Priorities",
          layout: "bullets",
          content: isKo
            ? [
                `'${cleanTitle}' 달성을 위한 선제적 시장 분석 및 리소스 배분`,
                "고객 및 이해관계자의 페인포인트를 해소하는 구체적 솔루션 가동",
                "지속 가능한 경쟁 우위 및 리스크 관리 체계 확립"
              ]
            : [
                `Dedicated resource mobilization to execute '${cleanTitle}' seamlessly`,
                "Eliminating user and partner friction points via disciplined execution",
                "Establishing compounding defensibility and robust operational safeguards"
              ],
          speakerNotes: isKo
            ? `다음으로 중요하게 강조하신 '${cleanTitle}'에 대한 세부 실행 계획을 설명드리겠습니다.`
            : `Next, turning to your priority focus: '${cleanTitle}' and our step-by-step rollout.`
        });
      }
    });

    // 마지막 슬라이드: 결론 및 Q&A
    const finalSlideNum = slides.length + 1;
    slides.push({
      id: finalSlideNum,
      slideNumber: finalSlideNum,
      title: isKo ? "결론 및 향후 계획 (Next Steps)" : "Conclusion & Next Steps",
      subtitle: isKo ? "성공적인 실행을 위한 즉각적인 액션 아이템" : "Immediate Milestones & Action Items",
      layout: "bullets",
      content: isKo
        ? [
            `요청하신 모든 핵심 과제 및 순서별 마일스톤에 대한 실행 준비 완료`,
            "즉각적인 추진을 위한 리소스 배정 및 전담 태스크포스(TF) 가동",
            "문의 및 협업: contact@s-probiz.com | Powered by HookDeck PRO"
          ]
        : [
            `Full execution readiness across all specified priority tracks`,
            "Resource allocation and operational launch team mobilized immediately",
            "Contact: contact@s-probiz.com | Powered by HookDeck PRO"
          ],
      speakerNotes: isKo
        ? "이상으로 요청하신 순서에 따른 발표를 마치겠습니다. 경청해 주셔서 대단히 감사드립니다."
        : "Thank you for your attention. We are ready to execute on these clear action items."
    });
  } else {
    // 기본 모드: 선택된 20대 전문 프레임워크 템플릿 기반 생성
    const rawTemplates = selectedFramework.slides;

    // 타깃 슬라이드 장수에 맞추어 슬라이드 템플릿 매핑
    rawTemplates.forEach((tmpl, idx) => {
      const slideNum = idx + 1;
      slides.push({
        id: slideNum,
        slideNumber: slideNum,
        title: isKo ? tmpl.titleKo(userTopic) : tmpl.titleEn(userTopic),
        subtitle: isKo ? tmpl.subtitleKo : tmpl.subtitleEn,
        layout: tmpl.layout,
        content: isKo ? tmpl.contentKo(userTopic) : tmpl.contentEn(userTopic),
        metrics: tmpl.metrics,
        speakerNotes: isKo ? tmpl.speakerNotesKo(userTopic) : tmpl.speakerNotesEn(userTopic)
      });
    });

    // 만약 targetCount가 기본 템플릿 수보다 많은 경우 (예: 10분 12장, 20분 18장 등)
    // 심층 세부 슬라이드를 추가로 생성하여 완벽하게 장수 충족
    const extraTopicsKo = [
      {
        title: "심층 경쟁 비교 및 포지셔닝 맵",
        subtitle: "경쟁사 대비 압도적인 차별화 우위",
        layout: "bullets" as const,
        content: [
          "기존 시장 선도 기업들의 기술적 부채 및 높은 유지비용 공략",
          "당사만의 독자적인 기능 및 유연한 가격 정책으로 고객 전환 가속화",
          "높은 전환 비용(Switching Cost)을 구축하여 장기 고객 리텐션 확보"
        ],
        notes: "경쟁사 대비 당사의 가격과 기능 우위를 시각화하여 투자자와 고객의 확신을 이끌어냅니다."
      },
      {
        title: "글로벌 시장 침투 및 유통 채널 전략 (GTM)",
        subtitle: "국경 없는 확장과 스케일업 가속화",
        layout: "bullets" as const,
        content: [
          "영미권 및 유럽 핵심 버티컬 커뮤니티 중심의 오가닉 침투",
          "글로벌 인플루언서 제휴 및 기술 블로그 기반 콘텐츠 바이럴 가동",
          "현지화된 고객 지원 및 결제 수단 확충을 통한 구매 전환율 극대화"
        ],
        notes: "초기 성공 경험을 바탕으로 글로벌 주요 거점으로 공격적인 확장을 전개하겠습니다."
      },
      {
        title: "핵심 팀 역량 및 거버넌스",
        subtitle: "실행력을 입증한 베테랑 전문가 그룹",
        layout: "bullets" as const,
        content: [
          "10년 이상 유관 산업 경력을 보유한 기술 및 사업개발 리더십",
          "린(Lean) 조직 운영을 통한 빠른 의사결정 및 주간 단위 기능 배포",
          "업계 최고 전문가로 구성된 자문단 네트워크 보유"
        ],
        notes: "어떤 위기 상황에서도 실행할 수 있는 역량과 회복탄력성을 갖춘 팀입니다."
      },
      {
        title: "재무 모델 및 세부 현금흐름 추정",
        subtitle: "3개년 재무 안정성 및 자본 효율성",
        layout: "metrics" as const,
        content: [],
        metrics: [
          { label: "예상 연간 반복매출 (ARR)", value: "$2.4M" },
          { label: "자본 효율성 지수 (Rule of 40)", value: "58%" },
          { label: "현금 런웨이", value: "24개월+" }
        ],
        notes: "안정적인 현금흐름과 건전한 유닛 이코노믹스를 통해 지속 가능한 자본 효율성을 달성합니다."
      },
      {
        title: "리스크 요인 및 선제적 대응 체계",
        subtitle: "대내외 변수 헤징 및 비상 계획 (Contingency)",
        layout: "bullets" as const,
        content: [
          "시장 진입 장벽: 특허 및 자체 데이터셋 축적을 통한 기술적 해자 구축",
          "규제 환경 변화: 컴플라이언스 전담 모니터링을 통한 선제적 적법성 확보",
          "운영 연속성: 멀티 리전 엣지 인프라 구축으로 재해 시 1분 내 자동 복구"
        ],
        notes: "사전에 예상되는 리스크를 투명하게 공유하고 완벽한 대비책을 마련해 두었습니다."
      },
      {
        title: "최종 요약 및 추진 일정 (Call to Action)",
        subtitle: "성공적인 협력을 위한 향후 추진 계획",
        layout: "bullets" as const,
        content: [
          `'${userTopic}' 시장 선점을 위한 전략적 모멘텀 확보`,
          "즉각적인 파트너십 및 투자 집행을 위한 계약 프로세스 개시",
          "공식 채널: contact@s-probiz.com | HookDeck PRO"
        ],
        notes: "경청해 주셔서 감사합니다. 지금 바로 첫 걸음을 함께 시작하시기를 제안드립니다."
      }
    ];

    const extraTopicsEn = [
      {
        title: "Competitive Landscape & Market Moat",
        subtitle: "Defensible Positioning Against Legacy Players",
        layout: "bullets" as const,
        content: [
          "Targeting incumbent technical debt and prohibitive legacy licensing structures",
          "Accelerating user migration via frictionless self-serve onboarding and agile pricing",
          "Engineering high workflow switching costs to secure sticky multi-year retention"
        ],
        notes: "Our clear structural cost advantage allows us to capture market share from complacent incumbents."
      },
      {
        title: "Go-to-Market & Global Expansion Flywheel",
        subtitle: "Repeatable Scaled Customer Acquisition",
        layout: "bullets" as const,
        content: [
          "Organic penetration via high-intent vertical developer and operator ecosystems",
          "Strategic affiliate distribution networks multiplying organic word-of-mouth",
          "Localized currency rails and localized 24/7 success desks maximizing global CVR"
        ],
        notes: "Our acquisition engine compounds organically, driving down customer acquisition costs over time."
      },
      {
        title: "Leadership & Execution Capabilities",
        subtitle: "Domain Experts Built for Rapid Iteration",
        layout: "bullets" as const,
        content: [
          "Founding leadership with 10+ years direct experience scaling enterprise products",
          "Lean operational pods shipping production-grade updates on weekly cadences",
          "Backed by an elite advisory board of industry operators and pioneers"
        ],
        notes: "Our proven track record demonstrates our ability to navigate market ambiguity and deliver results."
      },
      {
        title: "Financial Sensitivity & Runway Projections",
        subtitle: "Capital Discipline & Rule of 40 Excellence",
        layout: "metrics" as const,
        content: [],
        metrics: [
          { label: "Target ARR (Year 2)", value: "$2.4M" },
          { label: "Rule of 40 Score", value: "58%" },
          { label: "Runway Runway", value: "24+ Mo" }
        ],
        notes: "Our capital-efficient model compounds free cash flow without reckless burn."
      },
      {
        title: "Defensive Risk Hedging & Safeguards",
        subtitle: "Proactive Contingency & Regulatory Postures",
        layout: "bullets" as const,
        content: [
          "IP Defense: Multi-layer proprietary algorithms and defensible data moats",
          "Regulatory Foresight: Continuous compliance monitoring ensuring seamless audit readiness",
          "Operational Continuity: Distributed multi-region edge redundancies guaranteeing zero downtime"
        ],
        notes: "We proactively mitigate downside vectors to ensure predictable and durable enterprise upside."
      },
      {
        title: "Closing Call to Action & Next Milestones",
        subtitle: "Seizing the Market Opportunity Together",
        layout: "bullets" as const,
        content: [
          `Clear strategic runway to establish category dominance in '${userTopic}'`,
          "Formalizing partnership terms and deploying capital allocations immediately",
          "Contact: contact@s-probiz.com | Powered by HookDeck PRO"
        ],
        notes: "Thank you for your time and partnership. We invite you to join us on this breakthrough journey."
      }
    ];

    const extras = isKo ? extraTopicsKo : extraTopicsEn;
    let extraIdx = 0;
    while (slides.length < targetCount && extraIdx < extras.length) {
      const ext = extras[extraIdx];
      const nextSlideNum = slides.length + 1;
      slides.push({
        id: nextSlideNum,
        slideNumber: nextSlideNum,
        title: ext.title,
        subtitle: ext.subtitle,
        layout: ext.layout,
        content: ext.content,
        metrics: (ext as any).metrics,
        speakerNotes: isKo ? ext.notes : ext.notes
      });
      extraIdx++;
    }
  }

  // 슬라이드 번호 정돈
  slides.forEach((s, idx) => {
    s.id = idx + 1;
    s.slideNumber = idx + 1;
  });

  return {
    title: userTopic,
    description: isKo ? `${selectedFramework.nameKo} 프레임워크 기반 프레젠테이션` : `${selectedFramework.nameEn} Framework Deck`,
    frameworkId: selectedFramework.id,
    frameworkName: isKo ? selectedFramework.nameKo : selectedFramework.nameEn,
    slides: slides.slice(0, targetCount)
  };
}
