import pptxgen from "pptxgenjs";
import { DeckResponse, SlideItem } from "@/types/deck";
import { getThemeById } from "./themes";

export function exportToPPTX(deck: DeckResponse, themeId: string = "dark-tech") {
  const pres = new pptxgen();
  // 표준 16:9 슬라이드 너비 13.333인치, 높이 7.5인치
  pres.layout = "LAYOUT_16x9";
  pres.title = deck.title;

  const theme = getThemeById(themeId);

  deck.slides.forEach((s: SlideItem) => {
    const slide = pres.addSlide();
    slide.background = { color: theme.bg };

    if (s.layout === "title") {
      // 상단 브랜드 로고/태그
      slide.addText("HOOKDECK PRO", {
        x: 2.0,
        y: 1.2,
        w: 9.33,
        h: 0.4,
        fontSize: 13,
        bold: true,
        color: theme.accent,
        align: "center",
      });

      // 메인 타이틀: 너비를 8.5인치로 좁혀서 웹 화면처럼 2~3줄로 웅장하게 자동 줄바꿈되도록 완벽 중앙 배치
      slide.addText(s.title, {
        x: 2.0,
        y: 1.8,
        w: 9.33,
        h: 2.8,
        fontSize: 34,
        bold: true,
        color: theme.title,
        align: "center",
        valign: "middle",
        wrap: true,
      });

      // 서브타이틀
      if (s.subtitle || s.content[0]) {
        slide.addText(s.subtitle || s.content[0], {
          x: 2.0,
          y: 4.8,
          w: 9.33,
          h: 0.8,
          fontSize: 18,
          bold: true,
          color: theme.accent,
          align: "center",
          valign: "top",
          wrap: true,
        });
      }

      // 하단 일자 및 메타정보
      slide.addText("Architected with HookDeck PRO", {
        x: 2.0,
        y: 5.8,
        w: 9.33,
        h: 0.4,
        fontSize: 11,
        color: "94A3B8",
        align: "center",
      });

      slide.addText("Confidential & Proprietary", {
        x: 1.0,
        y: 6.8,
        w: 5.0,
        h: 0.3,
        fontSize: 10,
        color: "64748B",
        align: "left",
      });
    } else if (s.layout === "metrics" && s.metrics) {
      // 슬라이드 헤더 (폰트 30pt로 시원하게 확대)
      slide.addText(s.title, {
        x: 1.2,
        y: 0.8,
        w: 10.9,
        h: 0.7,
        fontSize: 30,
        bold: true,
        color: theme.title,
        wrap: true,
      });

      if (s.subtitle) {
        slide.addText(s.subtitle, {
          x: 1.2,
          y: 1.5,
          w: 10.9,
          h: 0.4,
          fontSize: 15,
          italic: true,
          color: theme.accent,
          wrap: true,
        });
      }

      // KPI 카드 3개 균형 배치 (중앙 정렬 및 시원한 크기)
      const cardWidth = 3.3;
      const cardHeight = 3.6;
      const cardGap = 0.5;
      const totalCardsWidth = 3 * cardWidth + 2 * cardGap;
      const startX = (13.333 - totalCardsWidth) / 2; // 정확한 16:9 정중앙

      s.metrics.slice(0, 3).forEach((m, idx) => {
        const xPos = startX + idx * (cardWidth + cardGap);
        const yPos = 2.2;

        // 배경 카드 사각형
        slide.addShape(pres.ShapeType.rect, {
          x: xPos,
          y: yPos,
          w: cardWidth,
          h: cardHeight,
          fill: { color: theme.cardBg },
          line: { color: theme.accent, width: 1.5 },
        });

        // KPI 숫자값 (대문짝만하게 40pt)
        slide.addText(m.value, {
          x: xPos + 0.1,
          y: yPos + 0.6,
          w: cardWidth - 0.2,
          h: 1.2,
          fontSize: 38,
          bold: true,
          color: theme.accent,
          align: "center",
          valign: "middle",
        });

        // KPI 레이블 (16pt 볼드)
        slide.addText(m.label, {
          x: xPos + 0.1,
          y: yPos + 2.0,
          w: cardWidth - 0.2,
          h: 1.0,
          fontSize: 16,
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
        x: 1.2,
        y: 0.8,
        w: 10.9,
        h: 0.7,
        fontSize: 30,
        bold: true,
        color: theme.title,
        wrap: true,
      });

      if (s.subtitle) {
        slide.addText(s.subtitle, {
          x: 1.2,
          y: 1.5,
          w: 10.9,
          h: 0.4,
          fontSize: 15,
          italic: true,
          color: theme.accent,
          wrap: true,
        });
      }

      // 본문 불릿 포인트
      const bulletY = s.subtitle ? 2.2 : 1.9;
      const bulletItems = s.content.map((c) => ({
        text: c,
        options: { fontSize: 18, color: theme.text, bullet: true, spaceAfter: 16 },
      }));

      slide.addText(bulletItems, {
        x: 1.2,
        y: bulletY,
        w: 10.9,
        h: 4.5,
        valign: "top",
      });
    }

    // 슬라이드 번호 풋터
    slide.addText(`${s.slideNumber} | HookDeck PRO`, {
      x: 10.5,
      y: 6.9,
      w: 2.3,
      h: 0.3,
      fontSize: 10,
      color: "64748B",
      align: "right",
    });
  });

  const fileName = `${deck.title.replace(/[^a-zA-Z0-9가-힣]/g, "_").slice(0, 30) || "presentation"}.pptx`;
  pres.writeFile({ fileName });
}
