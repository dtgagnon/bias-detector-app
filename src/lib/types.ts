export interface BiasResult {
  biasScore: number;
  biasType: string;
  explanation: string;
  examples: string[];
}

export interface Article {
  title: string;
  content: string;
  textContent: string;
  length: number;
  excerpt: string;
}

export interface ServiceWorkerConfig {
  register: boolean;
}
