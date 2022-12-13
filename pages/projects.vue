<template>
    <div  class="grid place-items-center bg-gray-600 h-full">
        <div class="w-full bg-cover bg-center p-12 rounded-xl" style="height:32rem; background-image: url(https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260);">
            <div class="flex items-center justify-center h-full w-full  bg-opacity-40">
                <div class="text-center">
                    <h1 class="text-stone-50 text-2xl font-semibold uppercase md:text-3xl p-4 rounded-xl bg-gray-600">Learn about my latest projects!</h1>
                </div>
            </div>
        </div>
        <div class="grid place-items-center space-y-8 lg:flex lg:space-x-12 lg:justify-around">
            <Card  class="mt-8" 
                projectName="Weather app" 
                imageUrl="https://images.pexels.com/photos/1431822/pexels-photo-1431822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" description = "A web application that can get the weather information of all cities around the world." 
                link="https://globalweatherfinder.netlify.app"/>
            <Card  
                projectName="Chess game" 
                imageUrl="https://images.pexels.com/photos/1762815/pexels-photo-1762815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" description = "A chess UI where people can design their own chess AI and play against the ones of others." 
                link="To be published soon!"/>
            <Card  
                projectName="Job search web scraper" 
                imageUrl="https://images.pexels.com/photos/5598295/pexels-photo-5598295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" description = "This app will send you an automatic message when your dream job is listed." 
                link="To be published soon!"/>
        </div>
        <div class="flex justify-between space-x-16 max-w-5xl place-items-center bg-violet-500 text-stone-50 p-8 rounded-xl font-semibold leading-10 text-lg m-8">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-1/3 md:h-40 " fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
                <NuxtLink to=/contact class="text-stone-50 hover:text-gray-800 place-items-center font-black text-2xl">
                    Do you have any ideas where I could improve my app? Do you have any suggestions on future projects? Then write me an email or send me a message on LinkedIn
                </NuxtLink>.

        </div>
    </div>
</template>