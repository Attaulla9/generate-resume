<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import ResumeForm from "../../components/resume/ResumeForm.vue";
import { useResumeStore } from "../../stores/resume.store";

const route = useRoute();
const resumeStore = useResumeStore();

onMounted(async () => {
    await resumeStore.getResumeById(route.params.id);
});

const saveResume = async (resume) => {
    await resumeStore.updateResume(route.params.id, resume);
};
</script>

<template>
    <div>
        <h1 class="text-3xl font-bold mb-6">
            Edit Resume
        </h1>
        {{ resumeStore.currentResume }}
        <ResumeForm v-if="resumeStore.currentResume" :resume="resumeStore.currentResume" @save="saveResume" />
    </div>
</template>