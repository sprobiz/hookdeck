import pptxgen from "pptxgenjs";
import { DeckResponse, SlideItem } from "@/types/deck";

export function exportToPPTX(deck: DeckResponse, style: string = 'minimal') {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title = deck.title;

  // 스타일 테마 색상 정의
  const themeColors: Record<string, { bg: string; title: string; text: string; accent: string }> = {
    minimal: { bg: "FFFFFF", title: "0F172A", text: "334155", accent: "0284C7" },
    corporate: { bg: "F8FAFC", title: "1E293B", text: "475569", accent: "2563EB" },
    creative: { bg: "FFFBEB", title: "78350F", text: "92400E", accent: "D97706" },
    dark: { bg: "0F172A", title: "F8FAFC", text: "CBD5E1", accent: "38BDF8" },
  };

  const theme = themeColors[style] || themeColors.minimal;

  deck.slides.forEach((s: SlideItem) => {
    const slide = pres.addSlide();
    slide.background = { color: theme.bg };

    if (s.layout === 'title') {
      // 타이틀 슬라이드
      slide.addText(s.title, {
        x: 1.0,
        y: 2.5,
        w: 11.3,
        h: 1.8,
        fontSize: 36,
        bold: true,
        color: theme.title,
        align: "center",
      });
      if (s.subtitle || s.content[0]) {
        slide.addText(s.subtitle || s.content[0], {
          x: 1.5,
          y: 4.4,
          w: 10.3,
          h: 1.0,
          fontSize: 20,
          color: theme.accent,
          align: "center",
        });
      }
    } else if (s.layout === 'metrics' && s.metrics) {
      // 지표/통계 슬라이드
      slide.addText(s.title, {
        x: 1.0,
        y: 0.8,
        w: 11.3,
        h: 0.8,
        fontSize: 28,
        bold: true,
        color: theme.title,
      });

      const cardWidth = 3.4;
      s.metrics.slice(0, 3).forEach((m, idx) => {
        const xPos = 1.0 + idx * 3.8;
        slide.addShape(pres.ShapeType.rect, {
          x: xPos,
          y: 2.2,
          w: cardWidth,
          h: 3.5,
          fill: { color: style === 'dark' ? "1E293B" : "F1F5F9" },
          line: { color: theme.accent, width: 1.5 },
        });

        slide.addText(m.value, {
          x: xPos + 0.2,
          y: 2.8,
          w: cardWidth - 0.4,
          h: 1.2,
          fontSize: 36,
          bold: true,
          color: theme.accent,
          align: "center",
        });

        slide.addText(m.label, {
          x: xPos + 0.2,
          y: 4.2,
          w: cardWidth - 0.4,
          h: 1.0,
          fontSize: 16,
          color: theme.text,
          align: "center",
        });
      });
    } else {
      // 일반 불렛 & 본문 슬라이드
      slide.addText(s.title, {
        x: 1.0,
        y: 0.8,
        w: 11.3,
        h: 0.8,
        fontSize: 28,
        bold: true,
        color: theme.title,
      });

      if (s.subtitle) {
        slide.addText(s.subtitle, {
          x: 1.0,
          y: 1.6,
          w: 11.3,
          h: 0.5,
          fontSize: 16,
          italic: true,
          color: theme.accent,
        });
      }

      const bulletY = s.subtitle ? 2.3 : 1.9;
      const bulletItems = s.content.map((c) => ({
        text: c,
        options: { fontSize: 18, color: theme.text, bullet: true, spaceAfter: 14 },
      }));

      slide.addText(bulletItems, {
        x: 1.0,
        y: bulletY,
        w: 11.3,
        h: 4.5,
      });
    }

    // 우측 하단 슬라이드 번호 및 워터마크
    slide.addText(`${s.slideNumber} | MagicDeck AI`, {
      x: 10.5,
      y: 6.8,
      w: 2.3,
      h: 0.4,
      fontSize: 10,
      color: "94A3B8",
      align: "right",
    });
  });

  const fileName = `${deck.title.replace(/[^a-zA-Z0-9가-힣]/g, "_").slice(0, 30) || "presentation"}.pptx`;
  pres.writeFile({ fileName });
}
