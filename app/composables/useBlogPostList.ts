export async function useBlogPostList(cacheKey: string) {
  const { locale } = useLocale();
  const { listPosts } = useBlogPosts();

  const { data: posts, pending } = await useAsyncData(
    cacheKey,
    () => listPosts(),
    { watch: [locale] },
  );

  const postsRef = computed(() => posts.value ?? []);
  const { selectedTopic, allTopics, filteredPosts } = usePostTopicFilter(postsRef);

  return { posts, pending, selectedTopic, allTopics, filteredPosts };
}
