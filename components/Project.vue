<template>
    <div class="grid place-items-center space-y-8 bg-lime-400 p-12 pt-6 rounded-2xl text-gray-600 w-96 font-semibold hover:text-stone-50">
        <p class="text-2xl font-semibold">{{projectName}}</p>
        <img :src="imageUrl" class="h-36 rounded-xl"/>
        <p>{{description}}</p>
        <NuxtLink v-bind:to=link> {{link}}</NuxtLink>
        <p>{{soon}}</p>
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