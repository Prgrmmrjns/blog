<template>
    <div class="bg-gray-800 h-24 flex items-center justify-between">
        <div class="hover:opacity-80 hover:rounded-lg">
            <NuxtLink to="/"><img src="~/assets/Logo.png" class="h-16 rounded-xl ml-4"/></NuxtLink>
        </div>
        <div class="flex mr-4">
            <Button buttonContent="Blog" link= "blog"/>
            <Button buttonContent="Projects" link= "projects"/>
            <Button buttonContent="About" link= "about"/>
            <Button buttonContent="Contact" link= "contact"/>
        </div>
    </div>
</template>