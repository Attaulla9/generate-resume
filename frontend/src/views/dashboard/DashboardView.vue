<script setup>
import { onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useResumeStore } from "../../stores/resume.store";

const resumeStore = useResumeStore();
const router = useRouter();

const createResume = async () => {
    try {
        router.push(`/resumes/create`);
    } catch (error) {
        console.error("Error creating resume:", error);
    }
};

onMounted(async () => {
    try {
        await resumeStore.fetchResumes();

    } catch (error) {
        console.error("Error fetching resumes:", error);
    }
});

const formatDate = (date) => {
    if (!date) return;
    return new Date(date).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

const lastUpdatedResume = computed(() => {

    if (!resumeStore.resumes.length) return null;

    return [...resumeStore.resumes].sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    )[0];
});
</script>

<template>

    <div>

        <h1 class="text-3xl font-bold mb-8">

            Dashboard

        </h1>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            <div class="bg-white p-6 rounded-xl shadow">

                <h2 class="text-lg font-semibold">

                    Total Resumes

                </h2>

                <p class="text-4xl mt-4">

                    {{ resumeStore.resumes.length }}

                </p>

            </div>

            <div class="bg-white p-6 rounded-xl shadow">

                <h2 class="text-lg font-semibold">

                    Last Updated

                </h2>

                <p class="mt-4">
                    {{ formatDate(lastUpdatedResume?.updatedAt) || "No Resumes Yet" }}

                </p>
                <p class="text-sm text-gray-500">
                    {{ lastUpdatedResume?.title }}
                </p>

            </div>

            <div class="bg-white p-6 rounded-xl shadow">

                <h2 class="text-lg font-semibold">

                    Quick Action

                </h2>

                <button @click="createResume"
                    class="mt-4 bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 transition">

                    Create Resume

                </button>

            </div>

        </div>

    </div>

</template>