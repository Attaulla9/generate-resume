<template>
    <div class="border rounded-lg bg-white mb-4">
        <button class="w-full flex justify-between items-center p-4 font-semibold text-left" @click="isOpen = !isOpen">
            <span>{{ title }}</span>

            <svg class="w-5 h-5 transition-transform" :class="{ 'rotate-180': isOpen }" fill="none"
                stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
        </button>

        <div v-show="isOpen" class="p-4 border-t">
            <slot />
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
    title: String,
    defaultOpen: {
        type: Boolean,
        default: true,
    },
});

const isOpen = ref(true);
</script>