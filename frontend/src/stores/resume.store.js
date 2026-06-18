import { defineStore } from "pinia";
import resumeService from "../services/resume.service";

export const useResumeStore = defineStore("resume", {
  state: () => ({
    resumes: [],
    currentResume: null,
    loading: false,
  }),

  actions: {
    async fetchResumes() {
      try {
        // Ensure your axios instance includes the Authorization header
        const response = await resumeService.getResumes();
        this.resumes = response.data;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error("Session expired. Redirecting to login...");
          // Optional: Add logic to redirect user to login or refresh token
        } else {
          console.error("An error occurred:", error.message);
        }
      }
    },
    async createResume(resumeData) {
      const response = await resumeService.createResume(resumeData);

      // Optional: add to state
      this.resumes.push(response.data);

      return response;
    },

    async deleteResume(id) {
      await resumeService.deleteResume(id);
      this.resumes = this.resumes.filter((resume) => resume.id !== id);
    },

    async getResumeById(id) {
      const response = await resumeService.getResumeById(id);

      this.currentResume = response.data;

      return response;
    },

    async updateResume(id, resumeData) {
      return await resumeService.updateResume(id, resumeData);
    },
  },
});
