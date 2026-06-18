backend/

├── prisma/
│ ├── schema.prisma
│ └── migrations/
│
├── src/
│ ├── config/
│ ├── controllers/
│ ├── services/
│ ├── repositories/
│ ├── routes/
│ ├── middlewares/
│ ├── validators/
│ ├── utils/
│ ├── constants/
│ ├── uploads/
│ ├── app.js
│ └── server.js
│
├── .env
├── .gitignore
├── package.json
└── README.md

Final

backend/

src/

config/

controllers/
auth.controller.js
resume.controller.js
experience.controller.js
education.controller.js
skill.controller.js
project.controller.js
certification.controller.js
language.controller.js

services/
auth.service.js
resume.service.js
experience.service.js
education.service.js
skill.service.js
project.service.js
certification.service.js
language.service.js

repositories/
auth.repository.js
resume.repository.js
experience.repository.js
education.repository.js
skill.repository.js
project.repository.js
certification.repository.js
language.repository.js

routes/
auth.routes.js
resume.routes.js
experience.routes.js
education.routes.js
skill.routes.js
project.routes.js
certification.routes.js
language.routes.js

middlewares/

validators/

utils/

constants/

uploads/

app.js

server.js

Frontend

frontend/

pages/

login.vue

register.vue

dashboard.vue

resume/

index.vue

create.vue

[id].vue

preview.vue

templates.vue

profile.vue

settings.vue

components/

resume/

PersonalInfo.vue

Summary.vue

Experience.vue

Education.vue

Skills.vue

Projects.vue

Certification.vue

Language.vue

SocialLinks.vue

LivePreview.vue

stores/

auth.js

resume.js

experience.js

education.js

skill.js

project.js

certification.js

language.js

composables/

services/

types/

assets/

Complete Roadmap
✅ Register

⬜ Login

⬜ JWT Middleware

⬜ Profile API

⬜ Logout

⬜ Resume CRUD

⬜ Experience CRUD

⬜ Education CRUD

⬜ Skills CRUD

⬜ Projects CRUD

⬜ Certification CRUD

⬜ Language CRUD

⬜ Resume Templates

⬜ PDF Export

⬜ AI Resume Generator

⬜ ATS Score Checker

order the flow using the same [Route → Controller → Service → Repository → Prisma] architecture.

Resume Detail

POST /api/v1/resume/:resumeId/experience

PUT /api/v1/resume/:resumeId/experience/:experienceId

DELETE /api/v1/resume/:resumeId/experience/:experienceId

POST /resume/:resumeId/education

POST /resume/:resumeId/skill

POST /resume/:resumeId/project

POST /resume/:resumeId/certification

POST /resume/:resumeId/language

---

Auth

POST /api/v1/auth/register

POST /api/v1/auth/login

GET /api/v1/auth/profile

Experience

POST /api/v1/resume/:resumeId/experience

GET /api/v1/resume/:resumeId/experience

PUT /api/v1/resume/:resumeId/experience/:experienceId

DELETE /api/v1/resume/:resumeId/experience/:experienceId

POST /resume/:resumeId/education

POST /resume/:resumeId/skill

POST /resume/:resumeId/project

POST /resume/:resumeId/certification

POST /resume/:resumeId/language

---

src/

config/

controllers/
auth.controller.js
resume.controller.js
experience.controller.js
education.controller.js
skill.controller.js
project.controller.js
certification.controller.js
language.controller.js

services/
auth.service.js
resume.service.js
experience.service.js
education.service.js
skill.service.js
project.service.js
certification.service.js
language.service.js

repositories/
auth.repository.js
resume.repository.js
experience.repository.js
education.repository.js
skill.repository.js
project.repository.js
certification.repository.js
language.repository.js

routes/
auth.routes.js
resume.routes.js
experience.routes.js
education.routes.js
skill.routes.js
project.routes.js
certification.routes.js
language.routes.js

middlewares/

utils/

validators/

constants/

PUT /api/v1/resume/:id

Payload
│
▼
Check title?

YES → Update Resume Table

Check summary?

YES → Update Resume Table

Check experiences?

YES → Update Experience Table

Check educations?

YES → Update Education Table

Check skills?

YES → Update Skill Table

Check projects?

YES → Update Project Table

Check certifications?

YES → Update Certification Table

Check languages?

YES → Update Language Table

Done

generator client {
provider = "prisma-client-js"
}

datasource db {
provider = "postgresql"
url = env("DATABASE_URL")
}

model User {
id String @id @default(cuid())
email String @unique
name String?
password String?
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
resumes Resume[]
refreshTokens RefreshToken[]
}

model RefreshToken {
id String @id @default(cuid())
token String @unique
userId String
expiresAt DateTime
createdAt DateTime @default(now())

user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Resume {
id String @id @default(cuid())
title String?
summary String?

userId String

createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

user User @relation(fields: [userId], references: [id])

experiences Experience[]
educations Education[]
skills Skill[]
projects Project[]
certifications Certification[]
}

model Skill {
id String @id @default(cuid())
name String
level String?
resumeId String
resume Resume @relation(fields: [resumeId], references: [id])
}

model Experience {
id String @id @default(cuid())
company String
title String?
startDate DateTime?
endDate DateTime?
description String?
resumeId String
resume Resume @relation(fields: [resumeId], references: [id])
}

model Education {
id String @id @default(cuid())
institution String
degree String?
startDate DateTime?
endDate DateTime?
description String?
resumeId String
resume Resume @relation(fields: [resumeId], references: [id])
}

model Project {
id String @id @default(cuid())
name String
description String?
link String?
resumeId String
resume Resume @relation(fields: [resumeId], references: [id])
}

model Certification {
id String @id @default(cuid())
name String
issuer String?
issueDate DateTime?
certificateUrl String?

resumeId String
resume Resume @relation(fields: [resumeId], references: [id])
}

+---------------------------------------------------+
| Resume Builder Profile 🔔 |
+-----------+---------------------------------------+
| | |
| Dashboard | Welcome Attaulla |
| My Resume | |
| Create | Recent Resumes |
| Profile | |
| Logout | |
| | |
+-----------+---------------------------------------+
