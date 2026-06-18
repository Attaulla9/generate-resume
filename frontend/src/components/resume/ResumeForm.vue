<script setup>
import { reactive } from "vue";

import PersonalInfoSection from "./PersonalInfoSection.vue";
import SummarySection from "./SummarySection.vue";
import ExperienceSection from "./ExperienceSection.vue";
import EducationSection from "./EducationSection.vue";
import SkillsSection from "./SkillsSection.vue";
import ProjectsSection from "./ProjectsSection.vue";
import CertificationsSection from "./CertificationsSection.vue";

const emit = defineEmits(["save"]);
const props = defineProps({
    resume: {
        type: Object,
        required: true,
    },
});
// const resume = reactive({
//     title: "",

//     personalInfo: {
//         fullName: "",
//         email: "",
//         phone: "",
//         address: "",
//         linkedin: "",
//         github: "",
//         portfolio: "",
//         photo: "",
//     },

//     summary: "",

//     experiences: [],
//     educations: [],
//     skills: [],
//     projects: [],
//     certifications: []
// });
const resume = props.resume;

const saveResume = () => {
    emit("save", resume);
};
</script>

<template>
    <div class="space-y-6">
        <!-- Resume Title -->
        <div class="bg-white rounded-xl shadow p-6">

            <h2 class="text-2xl font-semibold mb-4">
                Resume Information
            </h2>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    Resume Title
                </label>

                <input v-model="resume.title" type="text" placeholder="Senior Vue.js Developer Resume"
                    class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

        </div>

        <PersonalInfoSection v-if="resume.personalInfo" v-model="resume.personalInfo" />

        <SummarySection v-if="resume.summary" v-model="resume.summary" />

        <ExperienceSection v-if="resume.experiences" v-model="resume.experiences" />

        <EducationSection v-if="resume.education" v-model="resume.education" />

        <SkillsSection v-if="resume.skills" v-model="resume.skills" />

        <ProjectsSection v-if="resume.projects" v-model="resume.projects" />

        <CertificationsSection v-if="resume.certifications" v-model="resume.certifications" />

        <div class="flex justify-end">

            <button @click="saveResume" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
                Save Resume
            </button>

        </div>

    </div>
</template>