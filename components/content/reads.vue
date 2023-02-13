<template>
    <div class="space-y-6 bg-lime-500 text-gray-700 rounded-xl p-4">
        <ContentSlot :use="$slots.default"/>
    </div>
</template>