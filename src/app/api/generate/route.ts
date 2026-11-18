import { NextRequest, NextResponse } from "next/server";
import { DeckRequest } from "@/types/deck";
import { generateSmartDeck } from "@/utils/smartDeck";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as DeckRequest;
    const {
      topic,
      slideCount = 6,
      language = "en",
      style = "dark-tech",
      frameworkId = "auto",
      customInstructions = "",
      duration = 5,
    } = body;

    if (!topic || topic.trim() === "") {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    // 1단계: 로컬 대표님 PC에서 Ollama qwen2.5가 실행 중인지 체크 (있으면 최우선 활용)
    const ollamaUrl = process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434";
    const ollamaModel = process.env.OLLAMA_MODEL || "qwen2.5:7b";

    try {
      const ollamaPrompt = `You are a world-class executive pitch deck creator. Create a structured presentation for the topic "${topic}".
Instructions: ${customInstructions || "Professional structure with clear KPIs and speaker notes"}
Target slide count: ${slideCount}. Language: ${language}.
Output ONLY valid JSON with no markdown ticks:
{
  "title": "${topic}",
  "description": "Executive Presentation",
  "frameworkId": "${frameworkId}",
  "slides": [
    {
      "id": 1,
      "slideNumber": 1,
      "title": "${topic}",
      "subtitle": "Strategic Masterplan",
      "layout": "title",
      "content": ["Executive Presentation"],
      "speakerNotes": "Welcome everyone. Today we present our strategic masterplan."
    }
  ]
}`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000); // 2초 타임아웃

      const ollamaRes = await fetch(`${ollamaUrl}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: ollamaModel,
          prompt: ollamaPrompt,
          stream: false,
          format: "json",
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (ollamaRes.ok) {
        const ollamaData = await ollamaRes.json();
        const parsed = JSON.parse(ollamaData.response);
        if (parsed.slides && parsed.slides.length > 0) {
          return NextResponse.json({ ...parsed, source: `local-ollama-${ollamaModel}` });
        }
      }
    } catch (_e) {
      // 로컬 Ollama 미실행 또는 Vercel 클라우드에서는 초고속 20대 프레임워크 스마트 엔진으로 안전 전환
    }

    // 2단계: 20대 특화 프레임워크 & 커스텀 지시사항을 반영하는 스마트 엔진 가동
    const cloudResult = generateSmartDeck({
      topic,
      slideCount,
      language,
      style,
      frameworkId,
      customInstructions,
      duration,
    });

    return NextResponse.json({ ...cloudResult, source: "hookdeck-smart-framework-engine" });
  } catch (error: any) {
    console.error("Deck Generation Error:", error);
    return NextResponse.json(
      { error: "Failed to generate deck", details: error.message },
      { status: 500 }
    );
  }
}
