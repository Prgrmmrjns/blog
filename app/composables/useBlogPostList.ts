export function useBlogPostList(cacheKey: string) {
  const { locale } = useLocale();
  const { listPosts } = useBlogPosts();
  const dataKey = computed(() => `${cacheKey}-${locale.value}`);

  const { data: posts, pending, error } = useAsyncData(dataKey, () => listPosts());

  const postsRef = computed(() => posts.value ?? []);
  const { selectedTopic, allTopics, filteredPosts } = usePostTopicFilter(postsRef);

  return { posts, pending, error, selectedTopic, allTopics, filteredPosts };
}
