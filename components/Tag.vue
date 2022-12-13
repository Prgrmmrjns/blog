<template>
    <div class="bg-orange-400 text-gray-700 items-center text-xl m-2 font-semibold w-20 h-8 rounded-xl grid place-items-center 
     hover:text-gray-800 hover:bg-indigo-100">
        {{name}}
    </div>
</template>

<script>
export default {
  props: ['name']
}
</script>