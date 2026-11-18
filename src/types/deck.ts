export interface SlideItem {
  id: number;
  slideNumber: number;
  title: string;
  subtitle?: string;
  layout: 'title' | 'bullets' | 'split' | 'quote' | 'metrics';
  content: string[];
  metrics?: { label: string; value: string }[];
  quote?: { text: string; author: string };
  imagePrompt?: string;
  imageUrl?: string;
  speakerNotes?: string; // 🎙️ 발표자 스피치 대본 / Speaker Notes
}

export interface DeckRequest {
  topic: string;
  slideCount?: number;
  language?: 'ko' | 'en';
  style?: string; // themeId
  frameworkId?: string; // 20대 특화 프레임워크 ID 또는 'auto'
  customInstructions?: string; // 순서 및 세부 요청사항
  duration?: number; // 발표 시간(분): 3, 5, 10, 20
}

export interface DeckResponse {
  title: string;
  description: string;
  frameworkId?: string;
  frameworkName?: string;
  slides: SlideItem[];
  source?: string;
}
