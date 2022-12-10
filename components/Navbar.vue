<template>
    <div class="bg-gray-800 p-6 lg:h-24 lg:flex items-center lg:justify-between">
        <div class="hover:opacity-80 rounded-lg">
            <NuxtLink to="/"><img src="~/assets/Logo.png" class="h-16 rounded-xl ml-4"/></NuxtLink>
        </div>
        <div class="grid grid-cols-2 lg:flex mr-4">
            <Button buttonContent="Blog" link= "blog"/>
            <Button buttonContent="Projects" link= "projects"/>
            <Button buttonContent="About" link= "about"/>
            <Button buttonContent="Contact" link= "contact"/>
        </div>
    </div>
</template>