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

function normalizeStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.filter((item): item is string => typeof item === "string");
      }
    } catch {
      return [];
    }
  }
  return [];
}

export function getPostTopics(post: { topics?: unknown; tags?: unknown }): TopicKey[] {
  const topics = normalizeStringArray(post.topics);
  if (topics.length) {
    return topics.filter((key): key is TopicKey => key in TOPIC_LABELS);
  }

  const keys = new Set<TopicKey>();
  for (const tag of normalizeStringArray(post.tags)) {
    const key = TAG_TO_TOPIC[tag];
    if (key) keys.add(key);
  }
  return [...keys];
}
