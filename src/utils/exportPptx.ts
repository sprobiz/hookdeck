import pptxgen from "pptxgenjs";
import { DeckResponse, SlideItem } from "@/types/deck";
import { getThemeById } from "./themes";

export function exportToPPTX(deck: DeckResponse, themeId: string = "dark-tech") {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title = deck.title;

  const theme = getThemeById(themeId);

  deck.slides.forEach((s: SlideItem) => {
    const slide = pres.addSlide();
    slide.background = { color: theme.bg };

    if (s.layout === "title") {
      // 상단 브랜드 로고/태그
      slide.addText("HOOKDECK PRO EXECUTIVE DECK", {
        x: 1.0,
        y: 1.6,
        w: 11.3,
        h: 0.4,
        fontSize: 12,
        bold: true,
        color: theme.accent,
        align: "center",
        charSpacing: 3,
      });

      // 메인 타이틀 (줄바꿈 및 가독성 최적화)
      slide.addText(s.title, {
        x: 1.0,
        y: 2.2,
        w: 11.3,
        h: 2.2,
        fontSize: 34,
        bold: true,
        color: theme.title,
        align: "center",
        valign: "middle",
      });

      // 서브타이틀
      if (s.subtitle || s.content[0]) {
        slide.addText(s.subtitle || s.content[0], {
          x: 1.5,
          y: 4.6,
          w: 10.3,
          h: 0.8,
          fontSize: 18,
          color: theme.accent,
          align: "center",
        });
      }

      // 하단 메타정보
      slide.addText("CONFIDENTIAL & PROPRIETARY", {
        x: 1.0,
        y: 6.2,
        w: 11.3,
        h: 0.4,
        fontSize: 10,
        color: "64748B",
        align: "center",
      });
    } else if (s.layout === "metrics" && s.metrics) {
      // 슬라이드 헤더
      slide.addText(s.title, {
        x: 1.0,
        y: 0.7,
        w: 11.3,
        h: 0.7,
        fontSize: 26,
        bold: true,
        color: theme.title,
      });

      if (s.subtitle) {
        slide.addText(s.subtitle, {
          x: 1.0,
          y: 1.4,
          w: 11.3,
          h: 0.4,
          fontSize: 14,
          italic: true,
          color: theme.accent,
        });
      }

      // KPI 카드 3개 균형 배치 (중앙 정렬)
      const cardWidth = 3.5;
      const cardHeight = 3.6;
      const cardGap = 0.4;
      const startX = (13.333 - (3 * cardWidth + 2 * cardGap)) / 2; // 16:9 와이드 중앙 자동 계산

      s.metrics.slice(0, 3).forEach((m, idx) => {
        const xPos = startX + idx * (cardWidth + cardGap);
        const yPos = 2.2;

        // 배경 카드
        slide.addShape(pres.ShapeType.rect, {
          x: xPos,
          y: yPos,
          w: cardWidth,
          h: cardHeight,
          fill: { color: theme.cardBg },
          line: { color: theme.accent, width: 1.5 },
          rectRadius: 0.1,
        });

        // KPI 숫자값
        slide.addText(m.value, {
          x: xPos + 0.2,
          y: yPos + 0.6,
          w: cardWidth - 0.4,
          h: 1.2,
          fontSize: 34,
          bold: true,
          color: theme.accent,
          align: "center",
          valign: "middle",
        });

        // KPI 레이블
        slide.addText(m.label, {
          x: xPos + 0.2,
          y: yPos + 2.0,
          w: cardWidth - 0.4,
          h: 0.8,
          fontSize: 15,
          bold: true,
          color: theme.text,
          align: "center",
          valign: "middle",
        });
      });
    } else {
      // 일반 본문 슬라이드
      slide.addText(s.title, {
        x: 1.0,
        y: 0.7,
        w: 11.3,
        h: 0.7,
        fontSize: 26,
        bold: true,
        color: theme.title,
      });

      if (s.subtitle) {
        slide.addText(s.subtitle, {
          x: 1.0,
          y: 1.4,
          w: 11.3,
          h: 0.4,
          fontSize: 14,
          italic: true,
          color: theme.accent,
        });
      }

      // 본문 불릿 포인트 카드형 박스 및 여백
      const bulletY = s.subtitle ? 2.1 : 1.8;
      const bulletItems = s.content.map((c) => ({
        text: c,
        options: { fontSize: 16, color: theme.text, bullet: true, spaceAfter: 16, lineSpacingMultiple: 1.2 },
      }));

      slide.addText(bulletItems, {
        x: 1.0,
        y: bulletY,
        w: 11.3,
        h: 4.4,
        valign: "top",
      });
    }

    slide.addText(`${s.slideNumber} | HookDeck PRO`, {
      x: 10.5,
      y: 6.8,
      w: 2.3,
      h: 0.4,
      fontSize: 10,
      color: "64748B",
      align: "right",
    });
  });

  const fileName = `${deck.title.replace(/[^a-zA-Z0-9가-힣]/g, "_").slice(0, 30) || "presentation"}.pptx`;
  pres.writeFile({ fileName });
}
