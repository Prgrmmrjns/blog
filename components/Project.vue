<template>
    <div class="grid place-items-center space-y-6 bg-lime-400 w-3/4 lg:w-1/4
    rounded-xl text-gray-600 font-semibold hover:text-stone-50">
        <p class="text-2xl font-semibold">{{projectName}}</p>
        <img :src="imageUrl" class="h-32 rounded-xl"/>
        <p class="text-xs md:text-base h-20 p-2">{{description}}</p>
        <NuxtLink class="h-12 text-xs md:text-base p-2" v-bind:to=link> {{link}}</NuxtLink>
        <p class="h-12">{{soon}}</p>
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
    },
    soon: {
      type: String,
    }
  }
}
</script>