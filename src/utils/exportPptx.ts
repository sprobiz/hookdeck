import pptxgen from "pptxgenjs";
import { DeckResponse, SlideItem, UserPlan } from "@/types/deck";
import { getThemeById } from "./themes";

export function exportToPPTX(deck: DeckResponse, themeId: string = "dark-tech", userPlan: UserPlan = "free") {
  const pres = new pptxgen();
  // pptxgenjs의 기본 LAYOUT_16x9는 너비 10.0인치, 높이 5.625인치입니다.
  pres.layout = "LAYOUT_16x9";
  pres.title = deck.title;

  const theme = getThemeById(themeId);
  const isFreePlan = userPlan === "free";
  const slideW = 10.0;

  deck.slides.forEach((s: SlideItem) => {
    const slide = pres.addSlide();
    slide.background = { color: theme.bg };

    // 🎙️ 파워포인트 원본 비고란(Speaker Notes)에 1분 발표 대본 자동 삽입!
    if (s.speakerNotes) {
      slide.addNotes(s.speakerNotes);
    }

    // 🔒 무료 체험 플랜인 경우 워터마크 추가 (유료 회원은 100% 클린 슬라이드 제공)
    if (isFreePlan) {
      slide.addText("HookDeck PRO Free Preview • Unlock Clean PPTX at hookdeck.digital", {
        x: 0.8,
        y: 0.15,
        w: 8.4,
        h: 0.3,
        fontSize: 8.5,
        bold: true,
        color: "EC4899",
        align: "right",
      });
    }

    if (s.layout === "title") {
      // 상단 브랜드 로고/태그
      slide.addText("HOOKDECK PRO", {
        x: 1.0,
        y: 0.8,
        w: 8.0,
        h: 0.4,
        fontSize: 12,
        bold: true,
        color: theme.accent,
        align: "center",
      });

      // 메인 타이틀: 슬라이드 너비 10인치 기준 x:1.0, w:8.0으로 완벽 정중앙 및 줄바꿈
      slide.addText(s.title, {
        x: 1.0,
        y: 1.4,
        w: 8.0,
        h: 2.2,
        fontSize: 28,
        bold: true,
        color: theme.title,
        align: "center",
        valign: "middle",
        wrap: true,
      });

      // 서브타이틀
      if (s.subtitle || s.content[0]) {
        slide.addText(s.subtitle || s.content[0], {
          x: 1.0,
          y: 3.8,
          w: 8.0,
          h: 0.6,
          fontSize: 15,
          bold: true,
          color: theme.accent,
          align: "center",
          valign: "top",
          wrap: true,
        });
      }

      // 하단 일자 및 메타정보
      slide.addText("Architected with HookDeck PRO", {
        x: 1.0,
        y: 4.6,
        w: 8.0,
        h: 0.3,
        fontSize: 10,
        color: "94A3B8",
        align: "center",
      });

      slide.addText("Confidential & Proprietary", {
        x: 0.6,
        y: 5.1,
        w: 4.0,
        h: 0.3,
        fontSize: 9,
        color: "64748B",
        align: "left",
      });
    } else if (s.layout === "metrics" && s.metrics && s.metrics.length > 0) {
      // 슬라이드 헤더
      slide.addText(s.title, {
        x: 0.8,
        y: 0.5,
        w: 8.4,
        h: 0.6,
        fontSize: 24,
        bold: true,
        color: theme.title,
        wrap: true,
      });

      if (s.subtitle) {
        slide.addText(s.subtitle, {
          x: 0.8,
          y: 1.1,
          w: 8.4,
          h: 0.3,
          fontSize: 13,
          italic: true,
          color: theme.accent,
          wrap: true,
        });
      }

      // KPI 카드 3개 너비 10인치 기준 완벽 정중앙 배치
      const cardWidth = 2.6;
      const cardHeight = 2.8;
      const cardGap = 0.3;
      const totalCardsWidth = 3 * cardWidth + 2 * cardGap; // 8.4인치
      const startX = (slideW - totalCardsWidth) / 2; // 정확히 x = 0.8

      s.metrics.slice(0, 3).forEach((m, idx) => {
        const xPos = startX + idx * (cardWidth + cardGap);
        const yPos = 1.7;

        // 배경 카드 사각형
        slide.addShape(pres.ShapeType.rect, {
          x: xPos,
          y: yPos,
          w: cardWidth,
          h: cardHeight,
          fill: { color: theme.cardBg },
          line: { color: theme.accent, width: 1.5 },
        });

        // KPI 숫자값
        slide.addText(m.value, {
          x: xPos + 0.1,
          y: yPos + 0.4,
          w: cardWidth - 0.2,
          h: 1.0,
          fontSize: 32,
          bold: true,
          color: theme.accent,
          align: "center",
          valign: "middle",
        });

        // KPI 레이블
        slide.addText(m.label, {
          x: xPos + 0.1,
          y: yPos + 1.5,
          w: cardWidth - 0.2,
          h: 0.8,
          fontSize: 13,
          bold: true,
          color: theme.text,
          align: "center",
          valign: "middle",
          wrap: true,
        });
      });
    } else {
      // 일반 본문 슬라이드
      slide.addText(s.title, {
        x: 0.8,
        y: 0.5,
        w: 8.4,
        h: 0.6,
        fontSize: 24,
        bold: true,
        color: theme.title,
        wrap: true,
      });

      if (s.subtitle) {
        slide.addText(s.subtitle, {
          x: 0.8,
          y: 1.1,
          w: 8.4,
          h: 0.3,
          fontSize: 13,
          italic: true,
          color: theme.accent,
          wrap: true,
        });
      }

      // 본문 불릿 포인트
      const bulletY = s.subtitle ? 1.6 : 1.4;
      const bulletItems = s.content.map((c) => ({
        text: c,
        options: { fontSize: 15, color: theme.text, bullet: true, spaceAfter: 12 },
      }));

      slide.addText(bulletItems, {
        x: 0.8,
        y: bulletY,
        w: 8.4,
        h: 3.4,
        valign: "top",
      });
    }

    // 슬라이드 번호 풋터 (너비 10인치 기준)
    slide.addText(`${s.slideNumber} | HookDeck PRO`, {
      x: 7.5,
      y: 5.1,
      w: 2.0,
      h: 0.3,
      fontSize: 9,
      color: "64748B",
      align: "right",
    });
  });

  const fileName = `${deck.title.replace(/[^a-zA-Z0-9가-힣]/g, "_").slice(0, 30) || "presentation"}.pptx`;
  pres.writeFile({ fileName });
}
