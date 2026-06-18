<script setup>
import { reactive } from "vue";
import ResumeForm from "../../components/resume/ResumeForm.vue";
import { useResumeStore } from "../../stores/resume.store";
import { useToast } from "vue-toastification";

const toast = useToast();

const resumeStore = useResumeStore();

const resume = reactive({
    title: "",
    summary: "",
    personalInfo: {},

    experiences: [],
    educations: [],
    skills: [],
    projects: [],
    certifications: [],
});

const saveResume = async (resume) => {
    try {
        await resumeStore.createResume(resume);
        toast.success("Resume created successfully!");
    } catch (error) {
        console.error(error);
    }
};
</script>

<template>
    <div>
        <h1 class="text-3xl font-bold mb-6">
            Create Resume
        </h1>

        <ResumeForm :resume="resume" @save="saveResume" />
    </div>

</template>