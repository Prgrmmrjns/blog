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
      <div class="w-full lg:w-2/3 grid place-items-center m-12 p-4 lg:p-8 
          rounded-xl bg-stone-50 text-gray-700">
        <h1 class="font-bold text-2xl">Comments</h1>
        <div class="bg-lime-400 p-4 rounded-xl mt-8 w-2/3">
          <p>Make a comment</p>
        <form class="rounded-xl flex items-center space-x-8">
          <input type="text" placeholder="Name" class="w-32 h-8">
          <textarea placeholder="Enter message" name="message" class="w-full"></textarea>
          <button type="submit" class="bg-stone-50 text-lime-400 text-xl font-extrabold w-28 h-8 rounded-xl grid place-items-center 
     hover:text-gray-800 hover:bg-indigo-100">Send</button>
        </form>
        </div>
        <div class="bg-purple-500 text-stone-50 p-8 rounded-xl mt-8 w-2/3">
          <p class="bg-gray-700 w-48 rounded-xl p-4 mb-8 font-extrabold text-xl text-center">10 Comments</p>
          <p> <span class="font-extrabold text-lime-400">AppleSauce1</span> : Cool blog. Keep it coming!</p>
        </div>
      </div>  
    </main>
  </template>
  