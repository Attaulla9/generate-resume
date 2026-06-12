const resumeService = require("../services/resume.service");
const { successResponse, errorResponse } = require("../utils/response");

const create = async (req, res) => {
  try {
    const resume = await resumeService.createResume(req.user.id, req.body);
    return successResponse(res, "Resume created successfully", resume, 201);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

const getAll = async (req, res) => {
  try {
    const resumes = await resumeService.getAllResumes(req.user.id);
    return successResponse(res, "Resume fetched successfully", resumes);
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const getById = async (req, res) => {
  try {
    const resume = await resumeService.getResumeById(
      req.params.id,
      req.user.id,
    );
    return successResponse(res, "Resume fetched successfully", resume);
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};
const update = async (req, res) => {
  try {
    const resume = await resumeService.updateResume(
      req.params.id,
      req.body,
      req.user.id,
    );
    return successResponse(res, "Resume updated successfully", resume);
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

const deleteResume = async (req, res) => {
  try {
    await resumeService.deleteResume(req.params.id, req.user.id);
    return successResponse(res, "Resume deleted successfully", null);
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteResume,
};
