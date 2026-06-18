<template>
    <div class="space-y-6">
        <div v-for="(skill, index) in modelValue" :key="index" class="border rounded-lg p-4 bg-white">
            <div class="flex justify-between items-center mb-4">
                <h3 class="font-semibold">
                    Skill {{ index + 1 }}
                </h3>

                <button type="button" class="text-red-500 hover:text-red-700" @click="removeSkill(index)">
                    Remove
                </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block mb-1 text-sm font-medium">
                        Skill Name
                    </label>

                    <input v-model="skill.name" type="text" placeholder="Vue.js" class="w-full border rounded-lg p-2" />
                </div>

                <div>
                    <label class="block mb-1 text-sm font-medium">
                        Proficiency Level
                    </label>

                    <select v-model="skill.level" class="w-full border rounded-lg p-2">
                        <option value="">Select Level</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                    </select>
                </div>
            </div>
        </div>

        <button type="button" @click="addSkill" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            + Add Skill
        </button>
    </div>
</template>

<script setup>
const modelValue = defineModel({
    type: Array,
    required: true,
});

const addSkill = () => {
    modelValue.value.push({
        name: "",
        level: "",
    });
};

const removeSkill = (index) => {
    modelValue.value.splice(index, 1);
};
</script>