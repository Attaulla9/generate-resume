<script setup>
defineProps({
    resume: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(["edit", "delete"]);
</script>

<template>

    <div class="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
        <h2 class="text-xl font-semibold">
            {{ resume.title }}
        </h2>

        <p class="text-gray-500 mt-2">
            {{ resume.summary }}
        </p>

        <p class="text-sm text-gray-400 mt-3">
            Updated:
            {{ new Date(resume.updatedAt).toLocaleDateString() }}
        </p>

        <div class="flex gap-3 mt-5">
            <button @click="$emit('edit', resume.id)"
                class="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600">
                Edit
            </button>

            <button @click="$emit('delete', resume.id)"
                class="bg-red-500 text-white px-4 py-2 rounded cursor-pointer  hover:bg-red-600">
                Delete
            </button>
        </div>
    </div>
</template>