<template>
    <div class="bg-stone-50 text-lime-400 text-xl m-4 font-extrabold w-28 h-12 rounded-xl grid place-items-center 
     hover:text-gray-800 hover:bg-indigo-100">
        <NuxtLink v-bind:to=link> {{buttonContent}}</NuxtLink>
    </div>
</template>

<script>
export default {
  props: ['buttonContent', 'link']
}
</script>