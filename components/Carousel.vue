<template>
    <div class="carousel m-8 rounded-xl bg-gray-800">
        <!-- Slide 1 About -->
        <div id="slide1" class="carousel-item relative w-full h-96 place-content-center">
            <div class="grid place-items-center lg:flex lg:justify-around space-y-4 bg-gray-800 p-6 pl-12 pr-12 rounded-xl items-center">
                <nuxt-img src= "About.jpg" class="h-40 lg:h-80 rounded-xl"/>
                <p class="h-40 bg-violet-500 p-4 rounded-xl text-stone-50 font-black lg:text-2xl lg:w-1/3">
                    Learn more about me and my skills and interests on my <NuxtLink to=/about class="text-lime-400 hover:text-gray-800">About</NuxtLink> page.
                </p>
            </div>
            <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide4" class="btn btn-circle">❮</a> 
                <a href="#slide2" class="btn btn-circle">❯</a>
            </div>
        </div> 
        <!-- Slide 2 Blog -->
        <div id="slide2" class="carousel-item relative w-full h-96 place-content-center">
            <div class="grid place-items-center lg:flex lg:justify-around space-y-4 bg-gray-800 p-6 pl-12 pr-12 rounded-xl items-center">
                <nuxt-img src= "https://images.pexels.com/photos/261579/pexels-photo-261579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" class="h-40 lg:h-80 rounded-xl" />
                <p class="h-40 bg-violet-500 p-4 rounded-xl text-stone-50 font-black lg:text-2xl lg:w-1/3">
                    I write blogposts about my latest adventures in science, programming and lifestyle. Visit my <NuxtLink to=/blog class="text-lime-400 hover:text-gray-800">Blog</NuxtLink> page to get inspired.
                </p>
            </div>
            <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide1" class="btn btn-circle">❮</a> 
                <a href="#slide3" class="btn btn-circle">❯</a>
            </div>
        </div> 
        <!-- Slide 3 Projects -->
        <div id="slide3" class="carousel-item relative w-full h-96 place-content-center">
            <div class="grid place-items-center lg:flex lg:justify-around space-y-4 bg-gray-800 p-6 pl-12 pr-12 rounded-xl items-center">
                <nuxt-img src= "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" class="h-40 lg:h-80 rounded-xl" />
                <p class="h-40 bg-violet-500 p-4 rounded-xl text-stone-50 font-black lg:text-2xl lg:w-1/3">
                    Get to know the projects that I worked on and that I am currently working on on my <NuxtLink to=/projects class="text-lime-400 hover:text-gray-800">Projects</NuxtLink> page.
                </p>
            </div>
            <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide2" class="btn btn-circle">❮</a> 
                <a href="#slide4" class="btn btn-circle">❯</a>
            </div>
        </div> 
        <!-- Slide 4 Contact -->
        <div id="slide4" class="carousel-item relative w-full h-96 place-content-center">
            <div class="grid place-items-center lg:flex lg:justify-around space-y-4 bg-gray-800 p-6 pl-12 pr-12 rounded-xl items-center">
                <nuxt-img src= "https://images.pexels.com/photos/5605061/pexels-photo-5605061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" class="h-40 lg:h-80 rounded-xl" />
                <p class="h-40 bg-violet-500 p-4 rounded-xl text-stone-50 font-black lg:text-2xl lg:w-1/3">
                    I like to meet new people. I would love to get in <NuxtLink to=/contact class="text-lime-400 hover:text-gray-800">Contact</NuxtLink> with you.
                </p>
            </div>
            <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide3" class="btn btn-circle">❮</a> 
                <a href="#slide1" class="btn btn-circle">❯</a>
            </div>
        </div> 
    </div>
</template>
