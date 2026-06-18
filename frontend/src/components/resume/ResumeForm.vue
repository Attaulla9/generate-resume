<script setup>
import { reactive } from "vue";


import Accordion from "../common/Accordion.vue";

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

                <input v-model="resume.title" type="text" placeholder="Resume Title"
                    class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

        </div>
        <Accordion title="Personal Information">
            <PersonalInfoSection v-model="resume.personalInfo" />
        </Accordion>
        <Accordion title="Summary">
            <SummarySection v-model="resume.summary" />
        </Accordion>
        <Accordion title="Experience">
            <ExperienceSection v-model="resume.experiences" />
        </Accordion>
        <Accordion title="Education">
            <EducationSection v-model="resume.educations" />
        </Accordion>
        <Accordion title="Skills">
            <SkillsSection v-model="resume.skills" />
        </Accordion>
        <Accordion title="Projects">
            <ProjectsSection v-model="resume.projects" />
        </Accordion>
        <Accordion title="Certifications">
            <CertificationsSection v-model="resume.certifications" />
        </Accordion>
        <div class="flex justify-end">

            <button @click="saveResume" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
                Save Resume
            </button>



        </div>

    </div>
</template>