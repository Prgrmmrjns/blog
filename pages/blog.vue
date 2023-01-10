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
            <BlogpostPreview imgSource='genetics.png' title='Gene expression prediction based on histone modification data using particle swarm optimization and XGBoost.' description='As part of my master thesis I created the Bioinformatics tool PatternChrome for the prediction of gene expression.
            Predicting gene expression is useful as it may allow the diagnosis of diseases or medical conditions. In addition, PatternChrome
            allows the characterization of the epigenetic profile of a sample, e.g. a primary tissue. The introduced tool is a Machine Learning
            model that uses the particle swarm optimization method to extract relevant epigenetic features and uses XGBoost for subsequent 
            gene expression level classification.' publishingDate="To be published soon." 
            category="Science" link="geneexpression" />
        </div>
    </div>
</template>