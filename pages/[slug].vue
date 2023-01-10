<template>
    <main class="bg-gray-600 p-8 grid place-items-center text-stone-50"> 
      <div class="lg:w-2/3 grid place-items-center p-4 lg:p-8 rounded-xl bg-purple-500">
        <ContentDoc v-slot="{ doc }">   
        <div class="grid place-items-center p-4 rounded-xl">
          <h1 class="font-bold m-4 text-2xl">{{ doc.title }}</h1>  
          <div class="grid place-items-center">
            <img :src="doc.coverImageUrl" class="rounded-xl h-40 lg:h-64 m-4"/>
            <div class="grid place-items-center font-semibold lg:text-xl space-y-4">
              <p>{{ doc.description }}</p>  
              <p> Posted on: {{ doc.date }}</p>  
              <p> Category: {{ doc.category }}</p>  
            </div>
          </div>    
        </div>   
        <ContentRenderer :value="doc" class="w-full text-xs lg:text-base"/>    
      </ContentDoc>  
      </div> 
    </main>
  </template>
