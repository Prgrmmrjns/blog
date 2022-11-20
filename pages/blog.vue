<template>
    <div class="bg-gray-600 p-12 grid place-items-center">
        <div class="w-2/3 bg-cover bg-center rounded-xl" style="height:32rem; background-image: url(https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1);">
            <div class="flex items-center justify-center h-full w-full  bg-opacity-40">
                <div class="text-center">
                    <h1 class="text-stone-50 text-2xl font-semibold uppercase md:text-3xl p-4 rounded-xl bg-gray-600">My Blogposts!</h1>
                </div>
            </div>
        </div>
        <div class="grid place-items-center">
            <BlogpostPreview title="The wonderful world of gene regulation" description="Gene regulation is a complex biological mechanism that is responsible for 
            deciding which genes are transcribed. Cells have to react quickly to changes in homeostasis and this is achieved by an intricate dance of signaling proteins, 
            transcription factors and various other proteins." publishingDate="20.11.2022" category="Science" link="generegulation"/>
            <BlogpostPreview title="Stem cells - Cells with a lot of potential" description="I am passionate about stem cells. In this post I want to give you a little 
            impression about the work with stem cells as well as into the newest breakthrough in stem cell research." publishingDate="20.11.2022" 
            category="Science" link="stemcells" />
        </div>
    </div>
</template>