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
      slide.addText(s.title, {
        x: 1.0,
        y: 2.2,
        w: 11.3,
        h: 2.0,
        fontSize: 38,
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
    } else if (s.layout === "metrics" && s.metrics) {
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
          fill: { color: theme.cardBg },
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
