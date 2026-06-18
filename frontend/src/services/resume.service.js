import api from "../api/axios";

const createResume = async (resumeData) => {
  const response = await api.post("/resume", resumeData);
  return response.data;
};

const getResumes = async () => {
  const response = await api.get("/resume");
  return response.data;
};

const deleteResume = async (id) => {
  const response = await api.delete(`/resume/${id}`);
  return response.data;
};

const getResumeById = async (id) => {
  const response = await api.get(`/resume/${id}`);

  return response.data;
};

const updateResume = async (id, resumeData) => {
  const response = await api.put(`/resume/${id}`, resumeData);
  return response.data;
};

export default {
  getResumes,
  deleteResume,
  createResume,
  getResumeById,
  updateResume,
};
