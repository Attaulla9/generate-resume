<script setup>
defineProps({
    title: String,
    buttonText: String,
});

const emit = defineEmits(["submit"]);
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
            <h1 class="text-3xl font-bold mb-6">
                {{ title }}
            </h1>

            <slot />

            <button type="submit" @click="emit('submit')"
                class="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition duration-300 ease-in-out cursor-pointer">
                {{ buttonText }}
            </button>
            <slot name="footer" />

        </div>
    </div>
</template>