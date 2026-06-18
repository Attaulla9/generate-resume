export const validateResume = (resume) => {
  const errors = {};

  if (!resume.title?.trim()) {
    errors.title = "Resume title is required.";
  }

  if (!resume.personalInfo.fullName?.trim()) {
    errors.fullName = "Full name is required.";
  }

  if (!resume.personalInfo.email?.trim()) {
    errors.email = "Email is required.";
  }

  if (resume.experiences.length === 0) {
    errors.experiences = "At least one experience is required.";
  }

  if (resume.educations.length === 0) {
    errors.educations = "At least one education is required.";
  }

  return errors;
};

const errors = validateResume(resume);

if (Object.keys(errors).length) {
  validationErrors.value = errors;
  return;
}
