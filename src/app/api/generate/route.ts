import { NextRequest, NextResponse } from "next/server";
import { DeckRequest, DeckResponse } from "@/types/deck";
import { generateMockDeck } from "@/utils/mockDeck";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as DeckRequest;
    const { topic, slideCount = 6, language = "ko", style = "minimal" } = body;

    if (!topic || topic.trim() === "") {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Gemini API Key가 설정되어 있지 않거나 MOCK_MODE인 경우 고품질 목업 반환
    if (!apiKey || process.env.MOCK_MODE === "true") {
      const mockResult = generateMockDeck({ topic, slideCount, language, style });
      return NextResponse.json({ ...mockResult, source: "mock" });
    }

    // Gemini API 호출 (실제 연동 모드)
    const prompt = `
You are a world-class presentation designer and executive slide deck creator.
Generate a structured presentation deck for the following request:
Topic: "${topic}"
Target slide count: ${slideCount}
Language: ${language === "ko" ? "Korean (한국어)" : "English"}
Visual Style: ${style}

Output STRICTLY a JSON object matching this schema without any markdown formatting or ticks:
{
  "title": "Main presentation title",
  "description": "Brief description",
  "slides": [
    {
      "id": 1,
      "slideNumber": 1,
      "title": "Slide Title",
      "subtitle": "Subtitle or takeaway",
      "layout": "title" | "bullets" | "metrics",
      "content": ["Point 1", "Point 2", "Point 3"],
      "metrics": [{"label": "Metric name", "value": "+100%"}] // only when layout is metrics
    }
  ]
}
`;

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const aiResponse = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" },
      }),
    });

    if (!aiResponse.ok) {
      console.warn("Gemini API error, falling back to mock generator");
      const mockResult = generateMockDeck({ topic, slideCount, language, style });
      return NextResponse.json({ ...mockResult, source: "mock-fallback" });
    }

    const data = await aiResponse.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    const parsedData = JSON.parse(rawText) as DeckResponse;

    return NextResponse.json({ ...parsedData, source: "gemini-api" });
  } catch (error: any) {
    console.error("Deck Generation API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate deck", details: error.message },
      { status: 500 }
    );
  }
}
