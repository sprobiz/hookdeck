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
}

export interface DeckRequest {
  topic: string;
  slideCount: number;
  language: 'ko' | 'en';
  style: 'minimal' | 'corporate' | 'creative' | 'dark';
}

export interface DeckResponse {
  title: string;
  description: string;
  slides: SlideItem[];
}
