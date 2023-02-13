<template>
  <div class="card card-side shadow-xl m-8 w-full md:w-2/3 xl:w-1/2 bg-lime-400 rounded-xl text-gray-700 font-semibold">
    <div class="card-body w-1/2">
      <div class="grid place-items-center">
        <img class="h-44 rounded-xl" v-bind:src="imgSource" />
      </div>
      <h2 class="card-title">{{title}}</h2>
      <p>{{description}}</p>
      <p>Published on {{publishingDate}}</p>
      <p>Category: {{category}}</p>
      <p>Author: {{author}}</p>
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
const tagName = "Science"
export default{
    props: {
      imgSource: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    publishingDate:{
       type: String,
    },
    author: {
      type: String,
    },
    category: {
      type: String,
    },
    link: {
      type: String,
    }
  }
}
</script>
