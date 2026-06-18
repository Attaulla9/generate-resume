<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useResumeStore } from "../../stores/resume.store";
import ResumeCard from "../../components/resume/ResumeCard.vue";

const resumeStore = useResumeStore();
const router = useRouter();

onMounted(() => {
    resumeStore.fetchResumes();
});

const handleEdit = (id) => {
    router.push(`/resumes/${id}/edit`);
};

const handleDelete = (id) => {
    resumeStore.deleteResume(id);
};
</script>

<template>
    <div>
        <h1 class="text-3xl font-bold mb-6">
            My Resumes
        </h1>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <ResumeCard v-for="resume in resumeStore.resumes" :key="resume.id" :resume="resume" @edit="handleEdit"
                @delete="handleDelete" />
        </div>
    </div>
</template>