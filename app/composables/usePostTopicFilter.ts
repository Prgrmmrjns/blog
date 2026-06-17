import { getPostTopics, topicLabel, type TopicKey } from "~/utils/blogTopics";

export type TopicOption = { key: TopicKey; label: string };

export function usePostTopicFilter<T extends { topics?: string[]; tags?: string[] }>(
  posts: Ref<T[]>,
) {
  const { locale } = useLocale();
  const selectedTopic = ref<TopicKey | null>(null);

  const allTopics = computed<TopicOption[]>(() => {
    const keys = new Set<TopicKey>();
    for (const post of posts.value) {
      for (const key of getPostTopics(post)) {
        keys.add(key);
      }
    }
    return [...keys]
      .sort((a, b) => topicLabel(a).localeCompare(topicLabel(b)))
      .map((key) => ({ key, label: topicLabel(key) }));
  });

  const filteredPosts = computed(() => {
    if (!selectedTopic.value) return posts.value;
    return posts.value.filter((post) => getPostTopics(post).includes(selectedTopic.value!));
  });

  watch(locale, () => {
    selectedTopic.value = null;
  });

  return { selectedTopic, allTopics, filteredPosts };
}
