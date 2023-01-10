<template>
    <div class="grid place-items-center space-y-6 bg-lime-400 w-3/4 xl:w-3/4 p-8
    rounded-xl text-gray-600 font-semibold hover:text-stone-50 text-center">
        <p class="text-2xl font-semibold">{{projectName}}</p>
        <img v-bind:src="imageUrl" class="h-60 rounded-xl"/>
        <p class="text-xs md:text-base h-12">{{description}}</p>
        <NuxtLink class="h-8 text-xs md:text-base" v-bind:to=link> {{link}}</NuxtLink>
    </div>
</template>

<script>
export default{
    props: {
    projectName: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    description: {
      type: String,
    },
    link:{
       type: String,
    }
  }
}
</script>