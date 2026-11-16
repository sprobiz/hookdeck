import { NextRequest, NextResponse } from "next/server";
import { DeckRequest, DeckResponse } from "@/types/deck";
import { generateSmartDeck } from "@/utils/smartDeck";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as DeckRequest;
    const { topic, slideCount = 6, language = "en", style = "dark" } = body;

    if (!topic || topic.trim() === "") {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    // 1단계: 로컬 대표님 PC에서 Ollama가 켜져있는지 체크 (qwen2.5:7b 모델 호출 시도)
    const ollamaUrl = process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434";
    const ollamaModel = process.env.OLLAMA_MODEL || "qwen2.5:7b";

    try {
      const ollamaPrompt = `You are a professional pitch deck creator. Create a structured presentation for the topic "${topic}".
Output ONLY valid JSON with no markdown ticks:
{
  "title": "${topic}",
  "description": "Executive Presentation",
  "slides": [
    {
      "id": 1,
      "slideNumber": 1,
      "title": "${topic}",
      "subtitle": "Strategic Masterplan",
      "layout": "title",
      "content": ["Executive Deck"]
    }
  ]
}`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000); // 2초 내 응답 없으면 즉시 클라우드 모드로 안전 전환

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
      // 로컬 Ollama 미실행 또는 Vercel 클라우드 환경에서는 자동으로 안전한 서버리스 스마트 엔진으로 즉각 폴백
    }

    // 2단계: Vercel 배포 시 (노트북 전원을 꺼도 365일 24시간 돌아가는 서버리스 스마트 엔진)
    const cloudResult = generateSmartDeck({ topic, slideCount, language, style });
    return NextResponse.json({ ...cloudResult, source: "vercel-serverless-engine" });
  } catch (error: any) {
    console.error("Deck Generation Error:", error);
    return NextResponse.json(
      { error: "Failed to generate deck", details: error.message },
      { status: 500 }
    );
  }
}
