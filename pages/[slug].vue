<template>
    <main class="bg-gray-600 p-8 grid place-items-center text-stone-50"> 
      <div class="lg:w-2/3 grid place-items-center">
        <ContentDoc v-slot="{ doc }">   
          <h1 class="font-bold m-4 text-2xl">{{ doc.title }}</h1>  
            <img :src="doc.coverImageUrl" class="rounded-xl h-40 lg:h-64 m-4"/>
            <div class="space-y-2 border-4 border-purple-500 rounded-xl p-4 text-lg">
              <p>{{ doc.description }}</p>  
              <p> Posted on: <span class="font-bold">{{ doc.date }}</span></p>  
              <p> Category: <span class="font-bold">{{ doc.category }}</span></p>
              <p> Author: <span class="font-bold">{{ doc.author }}</span></p>    
            </div>  
        <ContentRenderer :value="doc" class="text-lg"/>    
      </ContentDoc>  
      </div> 
    </main>
  </template>
