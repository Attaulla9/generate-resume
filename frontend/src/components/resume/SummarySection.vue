<template>
    <div class="bg-white rounded-lg shadow-sm p-6">

        <div>

            <textarea id="summary" v-model="resume.summary" rows="6" maxlength="500"
                placeholder="Example: Senior Frontend Developer with 7.5+ years of experience in Vue.js, React.js and Node.js. Passionate about building scalable web applications and delivering exceptional user experiences."
                class="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>

            <div class="flex justify-between mt-2">
                <span v-if="error" class="text-red-500 text-sm">
                    {{ error }}
                </span>

                <span class="text-gray-500 text-sm ml-auto">
                    {{ resume.summary?.length || 0 }}/500
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";

const resume = defineModel({
    type: String,
    required: true,
});

const error = computed(() => {
    if (!resume.value.summary?.trim()) {
        return "Professional Summary is required.";
    }

    return "";
});
</script>