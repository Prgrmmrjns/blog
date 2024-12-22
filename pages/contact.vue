<template>
  <main class="container mx-auto px-4 py-12">
    <div class="max-w-2xl mx-auto text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">Get in Touch</h1>
      <p class="text-xl text-gray-600 mb-12">
        Feel free to reach out for collaborations, research discussions, or just to say hello!
      </p>

      <div class="grid gap-6">
        <a 
          href="https://www.linkedin.com/in/jonas-wolber-582b0a1b1/"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <UIcon name="i-simple-icons-linkedin" class="text-[#0A66C2] text-2xl"/>
          <span class="text-gray-700">Connect on LinkedIn</span>
        </a>

        <a 
          href="https://github.com/Prgrmmrjns"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <UIcon name="i-simple-icons-github" class="text-gray-900 text-2xl"/>
          <span class="text-gray-700">Follow on GitHub</span>
        </a>

        <a 
          href="jwolber@ukaachen.de"
          class="flex items-center justify-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <UIcon name="i-heroicons-envelope" class="text-gray-900 text-2xl"/>
          <span class="text-gray-700">Send an Email</span>
        </a>
      </div>
    </div>
  </main>
</template> 