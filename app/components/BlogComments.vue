<script setup lang="ts">
const props = defineProps<{
  postSlug: string;
}>();

const supabase = useSupabaseClient();

const comments = ref<{ id: string; author_name: string | null; content: string; created_at: string }[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const authorName = ref("");
const commentContent = ref("");
const submitting = ref(false);
const submitError = ref<string | null>(null);

async function fetchComments() {
  loading.value = true;
  error.value = null;
  try {
    const { data, error: err } = await supabase
      .from("blog_comments")
      .select("id, author_name, content, created_at")
      .eq("post_slug", props.postSlug)
      .order("created_at", { ascending: true });

    if (err) throw err;
    comments.value = data ?? [];
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Failed to load comments";
  } finally {
    loading.value = false;
  }
}

async function submitComment() {
  const content = commentContent.value.trim();
  if (!content) return;

  submitting.value = true;
  submitError.value = null;
  try {
    const { error: err } = await supabase.from("blog_comments").insert({
      post_slug: props.postSlug,
      author_name: authorName.value.trim() || null,
      content,
    });

    if (err) throw err;

    authorName.value = "";
    commentContent.value = "";
    await fetchComments();
  } catch (e) {
    submitError.value = e instanceof Error ? e.message : "Failed to post comment";
  } finally {
    submitting.value = false;
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

onMounted(fetchComments);
</script>

<template>
  <section class="mt-16 border-t border-gray-200 pt-16 dark:border-white/10">
    <h2 class="mb-6 text-2xl font-bold text-gold">
      Comments
    </h2>

    <!-- Comment form -->
    <form class="mb-14 rounded-2xl border border-gray-200 bg-gray-50 p-8 dark:border-white/10 dark:bg-[#161616]/50" @submit.prevent="submitComment">
      <div class="space-y-6">
        <div>
          <label for="author-name" class="mb-2 block text-sm font-medium text-gray-700 dark:text-cream/70">
            Name (optional)
          </label>
          <input
            id="author-name"
            v-model="authorName"
            type="text"
            placeholder="Your name"
            class="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-500 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30 dark:border-white/20 dark:bg-[#1a1a1a] dark:text-cream dark:placeholder-cream/40 dark:focus:border-mint/50 dark:focus:ring-mint/30"
          />
        </div>
        <div>
          <label for="comment-content" class="mb-2 block text-sm font-medium text-gray-700 dark:text-cream/70">
            Comment *
          </label>
          <textarea
            id="comment-content"
            v-model="commentContent"
            rows="5"
            required
            placeholder="Write a comment..."
            class="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-500 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30 dark:border-white/20 dark:bg-[#1a1a1a] dark:text-cream dark:placeholder-cream/40 dark:focus:border-mint/50 dark:focus:ring-mint/30"
          />
        </div>
        <p v-if="submitError" class="text-sm text-red-400">
          {{ submitError }}
        </p>
        <button
          type="submit"
          :disabled="submitting || !commentContent.trim()"
          class="rounded-xl bg-teal/20 px-6 py-3 text-base font-semibold text-teal transition-colors hover:bg-teal/30 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-mint/20 dark:text-mint dark:hover:bg-mint/30"
        >
          {{ submitting ? "Posting..." : "Post comment" }}
        </button>
      </div>
    </form>

    <!-- Comments list -->
    <div v-if="loading" class="text-gray-500 dark:text-cream/50">
      Loading comments...
    </div>
    <p v-else-if="error" class="text-red-400">
      {{ error }}
    </p>
    <div v-else-if="comments.length === 0" class="rounded-2xl border border-gray-200 bg-gray-50 px-12 py-16 text-center text-base text-gray-600 dark:border-white/10 dark:bg-[#161616]/50 dark:text-cream/50">
      No comments yet. Be the first to comment!
    </div>
    <ul v-else class="space-y-8">
      <li
        v-for="c in comments"
        :key="c.id"
        class="rounded-2xl border border-gray-200 bg-white p-8 shadow-md transition-shadow hover:shadow-lg dark:border-white/10 dark:bg-[#161616] dark:shadow-none dark:hover:border-white/20"
      >
        <div class="mb-4 flex items-center gap-4">
          <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal/20 text-lg font-bold text-teal dark:bg-mint/20 dark:text-mint">
            {{ (c.author_name || "A").charAt(0).toUpperCase() }}
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-base font-semibold text-gray-900 dark:text-cream">
              {{ c.author_name || "Anonymous" }}
            </span>
            <span class="text-sm text-gray-500 dark:text-cream/40">
              {{ formatDate(c.created_at) }}
            </span>
          </div>
        </div>
        <p class="whitespace-pre-wrap text-base leading-relaxed text-gray-800 dark:text-cream/90">
          {{ c.content }}
        </p>
      </li>
    </ul>
  </section>
</template>
