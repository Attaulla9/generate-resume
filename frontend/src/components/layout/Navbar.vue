<script setup>
const emit = defineEmits(["toggleSidebar"]);
</script>

<template>

    <header class="h-16 bg-white shadow flex items-center justify-between px-4 md:px-6">

        <div class="flex items-center gap-3">

            <button class="lg:hidden cursor-pointer" @click="emit('toggleSidebar')">

                ☰

            </button>

            <h1 class="text-xl font-bold text-blue-600">

                Resume Builder

            </h1>

        </div>

        <div class="flex items-center gap-3">

            <div class="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">

                A

            </div>

        </div>

    </header>

</template>