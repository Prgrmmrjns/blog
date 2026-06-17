export const TOPIC_LABELS = {
  "machine-learning": "Machine Learning",
  diabetes: "Diabetes",
  health: "Health",
  research: "Research",
  llms: "LLMs",
  ai: "AI",
  "gradient-boosting": "Gradient Boosting",
  books: "Books",
  personal: "Personal",
  science: "Science",
} as const;

export type TopicKey = keyof typeof TOPIC_LABELS;

const TAG_TO_TOPIC: Record<string, TopicKey> = {
  "Machine Learning": "machine-learning",
  Diabetes: "diabetes",
  Health: "health",
  Research: "research",
  LLMs: "llms",
  AI: "ai",
  "Gradient Boosting": "gradient-boosting",
  Books: "books",
  Personal: "personal",
  Science: "science",
};

export function topicLabel(key: string): string {
  return TOPIC_LABELS[key as TopicKey] ?? key;
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
