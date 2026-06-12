const resumeRepository = require("../repositories/resume.repository");

const createResume = async (userId, resumeData) => {
  return await resumeRepository.createResume({
    title: resumeData.title,
    summary: resumeData.summary,
    userId,
  });
};

const getAllResumes = async (userId) => {
  return await resumeRepository.getAllResumes(userId);
};
const getResumeById = async (resumeId, userId) => {
  const resume = await resumeRepository.getResumeById(resumeId);
  if (!resume) {
    throw new Error("Resume not found");
  }

  if (resume.userId !== userId) {
    throw new Error("Unauthorized access");
  }
  return resume;
};

const updateResume = async (resumeId, resumeData, userId) => {
  const resume = await resumeRepository.getResumeById(resumeId);

  console.log("Fetched resume:", resumeData, resume);
  if (!resume) {
    throw new Error("Resume not found");
  }
  if (resume.userId !== userId) {
    throw new Error("Unauthorized access");
  }

  return await resumeRepository.resumeUpdate(resumeId, resumeData);
};

const deleteResume = async (resumeId, userId) => {
  const resume = await resumeRepository.getResumeById(resumeId);
  if (!resume) {
    throw new Error("Resume not found");
  }
  if (resume.userId !== userId) {
    throw new Error("Unauthorized access");
  }
  return await resumeRepository.resumeDelete(resumeId);
};

module.exports = {
  createResume,
  getAllResumes,
  getResumeById,
  updateResume,
  deleteResume,
};
