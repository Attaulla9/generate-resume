const prisma = require("../config/prisma");

const createResume = async (resumeData) => {
  return await prisma.resume.create({
    data: {
      title: resumeData.title,
      summary: resumeData.summary,
      userId: resumeData.userId,

      personalInfo: resumeData.personalInfo
        ? {
            create: resumeData.personalInfo,
          }
        : undefined,

      experiences: {
        create:
          resumeData.experiences?.map((exp) => ({
            company: exp.company,
            title: exp.title,
            startDate: exp.startDate ? new Date(exp.startDate) : null,
            endDate: exp.endDate ? new Date(exp.endDate) : null,
            description: exp.description,
          })) || [],
      },

      educations: {
        create:
          resumeData.educations?.map((edu) => ({
            institution: edu.institution,
            degree: edu.degree,
            startDate: edu.startDate ? new Date(edu.startDate) : null,
            endDate: edu.endDate ? new Date(edu.endDate) : null,
            description: edu.description,
          })) || [],
      },

      skills: {
        create: resumeData.skills || [],
      },

      projects: {
        create: resumeData.projects || [],
      },

      certifications: {
        create:
          resumeData.certifications?.map((cert) => ({
            name: cert.name,
            issuer: cert.issuer,
            issueDate: cert.issueDate ? new Date(cert.issueDate) : null,
            certificateUrl: cert.certificateUrl,
          })) || [],
      },
    },

    include: {
      personalInfo: true,
      experiences: true,
      educations: true,
      skills: true,
      projects: true,
      certifications: true,
    },
  });
};

const getAllResumes = async (userId) => {
  return await prisma.resume.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getResumeById = async (resumeId) => {
  return await prisma.resume.findUnique({
    where: {
      id: resumeId,
    },
    include: {
      personalInfo: true,
      experiences: true,
      educations: true,
      skills: true,
      projects: true,
      certifications: true,
    },
  });
};

const resumeDelete = async (resumeId) => {
  return await prisma.resume.delete({
    where: { id: resumeId },
  });
};

const resumeUpdate = async (resumeId, resumeData) => {
  return await prisma.$transaction(async (tx) => {
    // Update Resume Basic Info
    await updateResumeInfo(tx, resumeId, resumeData);

    // Update Skills
    if (resumeData.skills !== undefined) {
      await syncSkills(tx, resumeId, resumeData.skills);
    }

    // Update PersonleINfo
    if (resumeData.personalInfo !== undefined) {
      await syncPersonalInfo(tx, resumeId, resumeData.personalInfo);
    }

    // Update Experiences
    if (resumeData.experiences !== undefined) {
      await syncExperiences(tx, resumeId, resumeData.experiences);
    }

    // Update Educations
    if (resumeData.educations !== undefined) {
      await syncEducations(tx, resumeId, resumeData.educations);
    }

    // Update Projects
    if (resumeData.projects !== undefined) {
      await syncProjects(tx, resumeId, resumeData.projects);
    }

    // Update Certifications
    if (resumeData.certifications !== undefined) {
      await syncCertifications(tx, resumeId, resumeData.certifications);
    }

    // Return updated resume
    return await tx.resume.findUnique({
      where: {
        id: resumeId,
      },
      include: {
        personalInfo: true,
        experiences: true,
        educations: true,
        skills: true,
        projects: true,
        certifications: true,
      },
    });
  });
};

const updateResumeInfo = async (tx, resumeId, resumeData) => {
  const data = {};

  if (resumeData.title !== undefined) {
    data.title = resumeData.title;
  }

  if (resumeData.summary !== undefined) {
    data.summary = resumeData.summary;
  }

  // Nothing to update
  if (Object.keys(data).length === 0) {
    return;
  }

  await tx.resume.update({
    where: {
      id: resumeId,
    },
    data,
  });
};

const syncPersonalInfo = async (tx, resumeId, personalInfo) => {
  const existing = await tx.personalInfo.findUnique({
    where: {
      resumeId,
    },
  });

  if (existing) {
    await tx.personalInfo.update({
      where: {
        resumeId,
      },
      data: personalInfo,
    });
  } else {
    await tx.personalInfo.create({
      data: {
        ...personalInfo,
        resumeId,
      },
    });
  }
};

const syncSkills = async (tx, resumeId, skills) => {
  // Existing skills
  const existingSkills = await tx.skill.findMany({
    where: {
      resumeId,
    },
  });

  const incomingIds = skills
    .filter((skill) => skill.id)
    .map((skill) => skill.id);

  // Delete removed skills
  await tx.skill.deleteMany({
    where: {
      resumeId,
      id: {
        notIn: incomingIds,
      },
    },
  });

  // Update existing or create new
  for (const skill of skills) {
    if (skill.id) {
      const existingSkill = existingSkills.find((item) => item.id === skill.id);

      if (existingSkill) {
        await tx.skill.update({
          where: {
            id: skill.id,
          },
          data: {
            name: skill.name,
            level: skill.level,
          },
        });
      }
    } else {
      await tx.skill.create({
        data: {
          name: skill.name,
          level: skill.level,
          resumeId,
        },
      });
    }
  }
};

const syncExperiences = async (tx, resumeId, experiences) => {
  // Get existing experiences
  const existingExperiences = await tx.experience.findMany({
    where: {
      resumeId,
    },
  });

  const existingIds = existingExperiences.map((experience) => experience.id);

  const incomingIds = experiences
    .filter((item) => item.id)
    .map((item) => item.id);

  // Delete removed experiences
  await tx.experience.deleteMany({
    where: {
      resumeId,
      id: {
        notIn: incomingIds,
      },
    },
  });

  // Create or Update
  for (const experience of experiences) {
    if (experience.id) {
      await tx.experience.update({
        where: {
          id: experience.id,
        },
        data: {
          company: experience.company,
          title: experience.title,
          startDate: experience.startDate
            ? new Date(experience.startDate)
            : null,
          endDate: experience.endDate ? new Date(experience.endDate) : null,
          description: experience.description,
        },
      });
    } else {
      await tx.experience.create({
        data: {
          company: experience.company,
          title: experience.title,
          startDate: experience.startDate
            ? new Date(experience.startDate)
            : null,
          endDate: experience.endDate ? new Date(experience.endDate) : null,
          description: experience.description,
          resumeId,
        },
      });
    }
  }
};

const syncEducations = async (tx, resumeId, educations) => {
  // Fetch existing educations
  const existingEducations = await tx.education.findMany({
    where: {
      resumeId,
    },
  });

  // Existing IDs in database
  const existingIds = existingEducations.map((education) => education.id);

  // IDs received from frontend
  const incomingIds = educations
    .filter((education) => education.id)
    .map((education) => education.id);

  // Delete removed educations
  await tx.education.deleteMany({
    where: {
      resumeId,
      id: {
        notIn: incomingIds,
      },
    },
  });

  // Update existing or create new
  for (const education of educations) {
    if (education.id) {
      await tx.education.update({
        where: {
          id: education.id,
        },
        data: {
          institution: education.institution,
          degree: education.degree,
          startDate: education.startDate ? new Date(education.startDate) : null,
          endDate: education.endDate ? new Date(education.endDate) : null,
          description: education.description,
        },
      });
    } else {
      await tx.education.create({
        data: {
          institution: education.institution,
          degree: education.degree,
          startDate: education.startDate ? new Date(education.startDate) : null,
          endDate: education.endDate ? new Date(education.endDate) : null,
          description: education.description,
          resumeId,
        },
      });
    }
  }
};

const syncProjects = async (tx, resumeId, projects) => {
  // Existing projects
  const existingProjects = await tx.project.findMany({
    where: {
      resumeId,
    },
  });

  // IDs from frontend
  const incomingIds = projects
    .filter((project) => project.id)
    .map((project) => project.id);

  // Delete removed projects
  await tx.project.deleteMany({
    where: {
      resumeId,
      id: {
        notIn: incomingIds,
      },
    },
  });

  // Update existing or create new
  for (const project of projects) {
    if (project.id) {
      await tx.project.update({
        where: {
          id: project.id,
        },
        data: {
          name: project.name,
          description: project.description,
          link: project.link,
        },
      });
    } else {
      await tx.project.create({
        data: {
          name: project.name,
          description: project.description,
          link: project.link,
          resumeId,
        },
      });
    }
  }
};

const syncCertifications = async (tx, resumeId, certifications) => {
  // Existing certifications
  const existingCertifications = await tx.certification.findMany({
    where: {
      resumeId,
    },
  });

  // IDs from frontend
  const incomingIds = certifications
    .filter((cert) => cert.id)
    .map((cert) => cert.id);

  // Delete removed certifications
  await tx.certification.deleteMany({
    where: {
      resumeId,
      id: {
        notIn: incomingIds,
      },
    },
  });

  // Update existing or create new
  for (const cert of certifications) {
    if (cert.id) {
      await tx.certification.update({
        where: {
          id: cert.id,
        },
        data: {
          name: cert.name,
          issuer: cert.issuer,
          issueDate: cert.issueDate ? new Date(cert.issueDate) : null,
          certificateUrl: cert.certificateUrl,
        },
      });
    } else {
      await tx.certification.create({
        data: {
          name: cert.name,
          issuer: cert.issuer,
          issueDate: cert.issueDate ? new Date(cert.issueDate) : null,
          certificateUrl: cert.certificateUrl,
          resumeId,
        },
      });
    }
  }
};

module.exports = {
  createResume,
  getAllResumes,
  getResumeById,
  resumeDelete,
  resumeUpdate,
  updateResumeInfo,
  syncExperiences,
  syncSkills,
  syncEducations,
  syncProjects,
  syncCertifications,
  syncPersonalInfo,
};
