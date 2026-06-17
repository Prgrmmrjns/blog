export function useBlogPosts() {
  const { locale } = useLocale();

  function listPosts() {
    return queryCollection("posts").where("locale", "=", locale.value).order("date", "DESC").all();
  }

  function getPost(slug: string) {
    return queryCollection("posts").where("locale", "=", locale.value).where("slug", "=", slug).first();
  }

  return { locale, listPosts, getPost };
}
