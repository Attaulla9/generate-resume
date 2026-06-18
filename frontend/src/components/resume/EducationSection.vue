<template>
    <div class="space-y-6">
        <div v-for="(education, index) in modelValue" :key="index" class="border rounded-lg p-4 bg-white">
            <div class="flex justify-between items-center mb-4">
                <h3 class="font-semibold">
                    Education {{ index + 1 }}
                </h3>

                <button type="button" class="text-red-500 hover:text-red-700" @click="removeEducation(index)">
                    Remove
                </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block mb-1 text-sm font-medium">
                        Institution
                    </label>

                    <input v-model="education.institution" type="text" class="w-full border rounded-lg p-2"
                        placeholder="ABC University" />
                </div>

                <div>
                    <label class="block mb-1 text-sm font-medium">
                        Degree
                    </label>

                    <input v-model="education.degree" type="text" class="w-full border rounded-lg p-2"
                        placeholder="Bachelor of Computer Applications" />
                </div>

                <div>
                    <label class="block mb-1 text-sm font-medium">
                        Start Date
                    </label>

                    <input v-model="education.startDate" type="date" class="w-full border rounded-lg p-2" />
                </div>

                <div>
                    <label class="block mb-1 text-sm font-medium">
                        End Date
                    </label>

                    <input v-model="education.endDate" type="date" class="w-full border rounded-lg p-2" />
                </div>
            </div>

            <div class="mt-4">
                <label class="block mb-1 text-sm font-medium">
                    Description
                </label>

                <textarea v-model="education.description" rows="3" class="w-full border rounded-lg p-2"
                    placeholder="Describe your education..."></textarea>
            </div>
        </div>

        <button type="button" @click="addEducation"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            + Add Education
        </button>
    </div>
</template>

<script setup>
const modelValue = defineModel({
    type: Array,
    required: true,
});

const addEducation = () => {
    modelValue.value.push({
        institution: "",
        degree: "",
        startDate: "",
        endDate: "",
        description: "",
    });
};

const removeEducation = (index) => {
    modelValue.value.splice(index, 1);
};
</script>