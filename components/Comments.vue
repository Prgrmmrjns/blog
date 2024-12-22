<template>
  <div class="py-8 max-w-3xl mx-auto">
    <h3 class="text-2xl font-bold mb-8">Comments</h3>
    
    <!-- Comment Form -->
    <form @submit.prevent="submitComment" class="mb-12">
      <div class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            id="name"
            v-model="newComment.author_name"
            type="text"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Your name"
          />
        </div>
        <div>
          <label for="comment" class="block text-sm font-medium text-gray-700 mb-1">Comment</label>
          <textarea
            id="comment"
            v-model="newComment.content"
            required
            rows="4"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Share your thoughts..."
          ></textarea>
        </div>
        <button
          type="submit"
          :disabled="isSubmitting"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {{ isSubmitting ? 'Posting...' : 'Post Comment' }}
        </button>
      </div>
    </form>

    <!-- Comments List -->
    <div class="space-y-6">
      <template v-if="comments.length">
        <div
          v-for="comment in comments"
          :key="comment.id"
          class="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
        >
          <div class="flex justify-between items-start mb-2">
            <h4 class="font-semibold text-gray-900">{{ comment.author_name }}</h4>
            <time class="text-sm text-gray-500">
              {{ formatDate(comment.created_at) }}
            </time>
          </div>
          <p class="text-gray-600">{{ comment.content }}</p>
        </div>
      </template>
      <p v-else class="text-center text-gray-500 py-4">
        No comments yet. Be the first to share your thoughts!
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Database } from '~/types/generated/supabase'

// Use createClient directly for public access
const supabase = useSupabaseClient<Database>()
const route = useRoute()

type Comment = Database['public']['Tables']['comments']['Row']
type InsertComment = Database['public']['Tables']['comments']['Insert']

const comments = ref<Comment[]>([])
const isSubmitting = ref(false)
const newComment = ref<{
  author_name: string
  content: string
}>({
  author_name: '',
  content: ''
})

// Fetch comments for current post
const fetchComments = async () => {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_path', route.path)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching comments:', error)
    return
  }

  comments.value = data
}

// Submit new comment
const submitComment = async () => {
  if (isSubmitting.value) return

  isSubmitting.value = true
  
  const newCommentData: InsertComment = {
    post_path: route.path,
    author_name: newComment.value.author_name,
    content: newComment.value.content
  }

  const { error } = await supabase
    .from('comments')
    .insert(newCommentData)

  if (error) {
    console.error('Error posting comment:', error)
    alert('Failed to post comment. Please try again.')
  } else {
    // Reset form
    newComment.value = {
      author_name: '',
      content: ''
    }
    // Refresh comments
    await fetchComments()
  }

  isSubmitting.value = false
}

// Format date
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Initial fetch
await fetchComments()

// Set up real-time updates
const channel = supabase
  .channel('comments')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'comments',
      filter: `post_path=eq.${route.path}`
    },
    (payload) => {
      comments.value = [payload.new as Comment, ...comments.value]
    }
  )
  .subscribe()

// Clean up subscription
onUnmounted(() => {
  channel.unsubscribe()
})
</script> 