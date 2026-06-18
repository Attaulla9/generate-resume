<template>
    <div class="space-y-6">
        <div v-for="(certification, index) in modelValue" :key="index" class="border rounded-lg p-4 bg-white">
            <div class="flex justify-between items-center mb-4">
                <h3 class="font-semibold">
                    Certification {{ index + 1 }}
                </h3>

                <button type="button" class="text-red-500 hover:text-red-700" @click="removeCertification(index)">
                    Remove
                </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block mb-1 text-sm font-medium">
                        Certification Name
                    </label>

                    <input v-model="certification.name" type="text" placeholder="AWS Certified Developer"
                        class="w-full border rounded-lg p-2" />
                </div>

                <div>
                    <label class="block mb-1 text-sm font-medium">
                        Issuing Organization
                    </label>

                    <input v-model="certification.issuer" type="text" placeholder="Amazon Web Services"
                        class="w-full border rounded-lg p-2" />
                </div>

                <div>
                    <label class="block mb-1 text-sm font-medium">
                        Issue Date
                    </label>

                    <input v-model="certification.issueDate" type="date" class="w-full border rounded-lg p-2" />
                </div>

                <div>
                    <label class="block mb-1 text-sm font-medium">
                        Certificate URL
                    </label>

                    <input v-model="certification.certificateUrl" type="url"
                        placeholder="https://example.com/certificate" class="w-full border rounded-lg p-2" />
                </div>
            </div>
        </div>

        <button type="button" @click="addCertification"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            + Add Certification
        </button>
    </div>
</template>

<script setup>
const modelValue = defineModel({
    type: Array,
    required: true,
});

const addCertification = () => {
    modelValue.value.push({
        name: "",
        issuer: "",
        issueDate: "",
        certificateUrl: "",
    });
};

const removeCertification = (index) => {
    modelValue.value.splice(index, 1);
};
</script>