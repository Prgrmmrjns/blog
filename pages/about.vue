<template>
  <main class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto">
      <!-- Profile Section -->
      <div class="flex flex-col md:flex-row gap-12 items-start mb-16">
        <div class="w-full md:w-1/4 flex flex-col items-center">
          <img 
            src="/images/jonas.jpeg"
            alt="Jonas Wolber"
            class="w-48 aspect-square object-cover rounded-full shadow-lg border-4 border-white mb-4"
          />
          <h1 class="text-2xl font-bold text-gray-900 text-center">About me</h1>
        </div>
        
        <div class="w-full md:w-3/4">
          <div class="space-y-4 text-gray-600">
            <p>
              Hey there! 👋 I'm Jonas, a passionate PhD student at the intersection of AI and healthcare, currently based in the beautiful city of Aachen, Germany.
            </p>
            <p>
              My academic journey has taken me across Europe: from completing my Bachelor's in Biomedical Sciences at Maastricht University in the Netherlands to earning my Master's in Molecular Medicine at the University of Göttingen, Germany. Each step has added a unique perspective to my understanding of healthcare challenges.
            </p>
            <p>
              When I'm not diving into research, you'll find me on the football field, at the gym, or running through Aachen's scenic routes. I believe in maintaining a healthy body-mind balance! 🏃‍♂️⚽
            </p>
          </div>
        </div>
      </div>

      <!-- Vision Section -->
      <div class="mb-16 bg-white p-8 rounded-lg shadow-sm border border-gray-100">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">My Vision for Healthcare</h2>
        <p class="text-gray-600 mb-6">
          I envision a future where healthcare is:
        </p>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="flex gap-3">
            <UIcon name="i-heroicons-heart" class="text-red-500 text-xl flex-shrink-0 mt-1"/>
            <p class="text-gray-600">Accessible and affordable for everyone, regardless of their background or location</p>
          </div>
          <div class="flex gap-3">
            <UIcon name="i-heroicons-cpu-chip" class="text-blue-500 text-xl flex-shrink-0 mt-1"/>
            <p class="text-gray-600">Powered by AI solutions that address demographic challenges and healthcare inequalities</p>
          </div>
          <div class="flex gap-3">
            <UIcon name="i-heroicons-variable" class="text-purple-500 text-xl flex-shrink-0 mt-1"/>
            <p class="text-gray-600">Free from racial and sexual bias through careful algorithm design</p>
          </div>
          <div class="flex gap-3">
            <UIcon name="i-heroicons-circle-stack" class="text-green-500 text-xl flex-shrink-0 mt-1"/>
            <p class="text-gray-600">Enhanced by multimodal data integration for holistic disease understanding</p>
          </div>
        </div>
      </div>

      <!-- Research Interests -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-8">Research Interests</h2>
        <div class="grid md:grid-cols-2 gap-8">
          <div class="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <h3 class="font-semibold text-lg mb-4 flex items-center gap-3">
              <UIcon name="i-heroicons-signal" class="text-blue-500"/>
              Remote Monitoring
            </h3>
            <p class="text-gray-600">Developing innovative solutions for patient monitoring and healthcare delivery outside traditional clinical settings.</p>
          </div>
          <div class="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <h3 class="font-semibold text-lg mb-4 flex items-center gap-3">
              <UIcon name="i-heroicons-cpu-chip" class="text-purple-500"/>
              Machine Learning
            </h3>
            <p class="text-gray-600">Applying advanced ML techniques to solve complex healthcare challenges and improve patient outcomes.</p>
          </div>
          <div class="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <h3 class="font-semibold text-lg mb-4 flex items-center gap-3">
              <UIcon name="i-heroicons-chat-bubble-left-right" class="text-green-500"/>
              Large Language Models
            </h3>
            <p class="text-gray-600">Exploring the potential of LLMs in medical knowledge processing and clinical decision support.</p>
          </div>
          <div class="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <h3 class="font-semibold text-lg mb-4 flex items-center gap-3">
              <UIcon name="i-heroicons-beaker" class="text-red-500"/>
              Bioinformatics
            </h3>
            <p class="text-gray-600">Analyzing biological data to better understand diseases and develop targeted treatments.</p>
          </div>
          <div class="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <h3 class="font-semibold text-lg mb-4 flex items-center gap-3">
              <UIcon name="i-heroicons-light-bulb" class="text-yellow-500"/>
              Explainable AI
            </h3>
            <p class="text-gray-600">Making AI decisions in healthcare transparent and interpretable for medical professionals.</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template> 