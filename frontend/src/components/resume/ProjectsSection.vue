<template>
    <div class="space-y-6">
        <div v-for="(project, index) in modelValue" :key="index" class="border rounded-lg p-4 bg-white">
            <div class="flex justify-between items-center mb-4">
                <h3 class="font-semibold">
                    Project {{ index + 1 }}
                </h3>

                <button type="button" class="text-red-500 hover:text-red-700" @click="removeProject(index)">
                    Remove
                </button>
            </div>

            <div class="space-y-4">
                <div>
                    <label class="block mb-1 text-sm font-medium">
                        Project Name
                    </label>

                    <input v-model="project.name" type="text" placeholder="Resume Builder"
                        class="w-full border rounded-lg p-2" />
                </div>

                <div>
                    <label class="block mb-1 text-sm font-medium">
                        Project Link
                    </label>

                    <input v-model="project.link" type="url" placeholder="https://github.com/username/project"
                        class="w-full border rounded-lg p-2" />
                </div>

                <div>
                    <label class="block mb-1 text-sm font-medium">
                        Description
                    </label>

                    <textarea v-model="project.description" rows="4" placeholder="Describe your project..."
                        class="w-full border rounded-lg p-2"></textarea>
                </div>
            </div>
        </div>

        <button type="button" @click="addProject" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            + Add Project
        </button>
    </div>
</template>

<script setup>
const modelValue = defineModel({
    type: Array,
    required: true,
});

const addProject = () => {
    modelValue.value.push({
        name: "",
        description: "",
        link: "",
    });
};

const removeProject = (index) => {
    modelValue.value.splice(index, 1);
};
</script>