<template>
    <main class="bg-gray-600 p-12 grid place-items-center "> 
      <div class="w-9/12 grid place-items-center  p-8 rounded-xl bg-purple-500 text-stone-50">
        <ContentDoc v-slot="{ doc }" class="w-2/3">   
        <div class="grid place-items-center  p-12 rounded-xl">
          <h1 class="text-4xl font-bold mb-8">{{ doc.title }}</h1>  
          <div class="flex space-x-12 justify-between">
            <img :src="doc.coverImageUrl" class="rounded-xl h-64"/>
            <div class="font-semibold text-xl space-y-8">
              <h1 >{{ doc.description }}</h1>  
              <h1> Posted on: {{ doc.date }}</h1>  
              <h1> Category: {{ doc.category }}</h1>  
            </div>
          </div>    
        </div>   
        <ContentRenderer :value="doc" class="w-9/12 leading-8 text-lg grid place-items-center bg-purple-500 text-stone-50 rounded-xl"/>    
      </ContentDoc>  
      </div>   
    </main>
  </template>
  