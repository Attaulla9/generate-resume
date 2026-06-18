<template>
    <div class="space-y-6">
        <div v-for="(experience, index) in modelValue" :key="index" class="border rounded-lg p-4 bg-white">
            <div class="flex justify-between items-center mb-4">
                <h3 class="font-semibold">
                    Experience {{ index + 1 }}
                </h3>

                <button type="button" class="text-red-500" @click="removeExperience(index)">
                    Remove
                </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block mb-1">Company</label>
                    <input v-model="experience.company" type="text" class="w-full border rounded p-2" />
                </div>

                <div>
                    <label class="block mb-1">Job Title</label>
                    <input v-model="experience.title" type="text" class="w-full border rounded p-2" />
                </div>

                <div>
                    <label class="block mb-1">Start Date</label>
                    <input v-model="experience.startDate" type="date" class="w-full border rounded p-2" />
                </div>

                <div>
                    <label class="block mb-1">End Date</label>
                    <input v-model="experience.endDate" type="date" class="w-full border rounded p-2" />
                </div>
            </div>

            <div class="mt-4">
                <label class="block mb-1">Description</label>

                <textarea v-model="experience.description" rows="4" class="w-full border rounded p-2"></textarea>
            </div>
        </div>

        <button type="button" class="bg-blue-600 text-white px-4 py-2 rounded" @click="addExperience">
            + Add Experience
        </button>
    </div>
</template>

<script setup>
const modelValue = defineModel({
    type: Array,
    required: true,
});

const addExperience = () => {
    modelValue.value.push({
        company: "",
        title: "",
        startDate: "",
        endDate: "",
        description: "",
    });
};

const removeExperience = (index) => {
    modelValue.value.splice(index, 1);
};
</script>