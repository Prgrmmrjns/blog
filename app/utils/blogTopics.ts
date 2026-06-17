import type { Locale } from "~/locales/en";

export const TOPIC_LABELS = {
  "machine-learning": { en: "Machine Learning", de: "Maschinelles Lernen" },
  diabetes: { en: "Diabetes", de: "Diabetes" },
  health: { en: "Health", de: "Gesundheit" },
  research: { en: "Research", de: "Forschung" },
  llms: { en: "LLMs", de: "LLMs" },
  ai: { en: "AI", de: "KI" },
  "gradient-boosting": { en: "Gradient Boosting", de: "Gradient Boosting" },
  books: { en: "Books", de: "Bücher" },
  personal: { en: "Personal", de: "Persönlich" },
  science: { en: "Science", de: "Wissenschaft" },
} as const;

export type TopicKey = keyof typeof TOPIC_LABELS;

const TAG_TO_TOPIC: Record<string, TopicKey> = {
  "Machine Learning": "machine-learning",
  "Maschinelles Lernen": "machine-learning",
  Diabetes: "diabetes",
  Health: "health",
  Gesundheit: "health",
  Research: "research",
  Forschung: "research",
  LLMs: "llms",
  AI: "ai",
  KI: "ai",
  "Gradient Boosting": "gradient-boosting",
  Books: "books",
  Bücher: "books",
  Personal: "personal",
  Persönlich: "personal",
  Science: "science",
  Wissenschaft: "science",
};

export function translateTopic(key: string, locale: Locale): string {
  const labels = TOPIC_LABELS[key as TopicKey];
  if (labels) return labels[locale];
  return key;
}

export function getPostTopics(post: { topics?: string[]; tags?: string[] }): TopicKey[] {
  if (post.topics?.length) {
    return post.topics.filter((key): key is TopicKey => key in TOPIC_LABELS);
  }

  const keys = new Set<TopicKey>();
  for (const tag of post.tags ?? []) {
    const key = TAG_TO_TOPIC[tag];
    if (key) keys.add(key);
  }
  return [...keys];
}
