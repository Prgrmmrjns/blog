export type BlogSurveyResponse = {
  answer: string;
  numeric_value: number | null;
};

export function useBlogSurvey(postSlug: string, surveyId: string) {
  const supabase = useSupabaseClient();
  const storageKey = `blog-survey-${postSlug}-${surveyId}`;

  const responses = ref<BlogSurveyResponse[]>([]);
  const loading = ref(true);
  const submitting = ref(false);
  const hasVoted = ref(false);
  const error = ref<string | null>(null);
  const submitError = ref<string | null>(null);

  async function fetchResponses() {
    loading.value = true;
    error.value = null;
    try {
      const { data, error: err } = await supabase
        .from("blog_survey_responses")
        .select("answer, numeric_value")
        .eq("post_slug", postSlug)
        .eq("survey_id", surveyId);

      if (err) throw err;
      responses.value = data ?? [];
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Failed to load survey results";
    } finally {
      loading.value = false;
    }
  }

  async function submitResponse(answer: string, numericValue: number | null = null) {
    if (hasVoted.value) return;

    submitting.value = true;
    submitError.value = null;
    try {
      const { error: err } = await supabase.from("blog_survey_responses").insert({
        post_slug: postSlug,
        survey_id: surveyId,
        answer,
        numeric_value: numericValue,
      });

      if (err) throw err;

      if (import.meta.client) {
        localStorage.setItem(storageKey, "1");
      }
      hasVoted.value = true;
      await fetchResponses();
    } catch (e) {
      submitError.value = e instanceof Error ? e.message : "Failed to submit response";
    } finally {
      submitting.value = false;
    }
  }

  onMounted(() => {
    if (import.meta.client && localStorage.getItem(storageKey)) {
      hasVoted.value = true;
    }
    fetchResponses();
  });

  return {
    responses,
    loading,
    submitting,
    hasVoted,
    error,
    submitError,
    fetchResponses,
    submitResponse,
  };
}
