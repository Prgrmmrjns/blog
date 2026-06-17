export function usePostTopicFilter<T extends { tags?: string[] }>(posts: Ref<T[] | null | undefined>) {
  const selectedTopic = ref<string | null>(null);

  const allTopics = computed(() => {
    const tags = new Set<string>();
    for (const post of posts.value ?? []) {
      for (const tag of post.tags ?? []) {
        tags.add(tag);
      }
    }
    return [...tags].sort((a, b) => a.localeCompare(b));
  });

  const filteredPosts = computed(() => {
    const list = posts.value ?? [];
    if (!selectedTopic.value) return list;
    return list.filter((post) => post.tags?.includes(selectedTopic.value!));
  });

  function selectTopic(topic: string | null) {
    selectedTopic.value = topic;
  }

  return { selectedTopic, allTopics, filteredPosts, selectTopic };
}
