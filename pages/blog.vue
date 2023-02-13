<template>
    <div class="bg-gray-600 p-12 grid place-items-center">
        <div class="w-full lg:w-2/3 bg-cover bg-center rounded-xl" style="height:32rem; background-image: url(https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1);">
            <div class="flex items-center justify-center h-full w-full  bg-opacity-40">
                <div class="text-center">
                    <h1 class="text-stone-50 text-2xl font-semibold uppercase md:text-3xl p-4 rounded-xl bg-gray-600">My Blogposts!</h1>
                </div>
            </div>
        </div>
        <div class="grid place-items-center">
            <BlogpostPreview 
                imgSource='smartwatch.webp' 
                title='How you can improve your health, boost your productivity and get fitter with personal health monitoring' 
                publishingDate="13.02.2023" 
                category="Science" 
                author="Jonas Wolber"
                link="healthmonitoring" 
            />
        </div>
    </div>
</template>