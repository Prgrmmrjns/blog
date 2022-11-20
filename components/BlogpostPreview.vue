<template>
    <div class="card card-side shadow-xl m-12 bg-lime-400 rounded-xl text-gray-700 font-semibold w-1/2">
  <div class="card-body w-1/2">
    <h2 class="card-title">{{title}}</h2>
    <p>{{description}}</p>
    <p>Published on {{publishingDate}}</p>
    <p>Category: {{category}}</p>
    <div class="card-actions justify-end">
        <div class="bg-violet-500 text-stone-50 text-xl m-4 font-extrabold w-28 h-12 rounded-xl grid place-items-center 
     hover:text-gray-800 hover:bg-indigo-100">
        <NuxtLink v-bind:to=link> Read now</NuxtLink>
    </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['title', 'description', 'publishingDate', 'category','link']
}

</script>