import { getPostTopics, translateTopic, type TopicKey } from "~/utils/blogTopics";

export type TopicOption = { key: TopicKey; label: string };

export function usePostTopicFilter<T extends { topics?: string[]; tags?: string[] }>(
  posts: Ref<T[] | null | undefined>,
) {
  const { locale } = useLocale();
  const selectedTopic = ref<TopicKey | null>(null);

  const allTopics = computed<TopicOption[]>(() => {
    const keys = new Set<TopicKey>();
    for (const post of posts.value ?? []) {
      for (const key of getPostTopics(post)) {
        keys.add(key);
      }
    }
    return [...keys]
      .sort((a, b) => translateTopic(a, locale.value).localeCompare(translateTopic(b, locale.value)))
      .map((key) => ({ key, label: translateTopic(key, locale.value) }));
  });

  const filteredPosts = computed(() => {
    const list = posts.value ?? [];
    if (!selectedTopic.value) return list;
    return list.filter((post) => getPostTopics(post).includes(selectedTopic.value!));
  });

  watch(locale, () => {
    selectedTopic.value = null;
  });

  return { selectedTopic, allTopics, filteredPosts };
}
