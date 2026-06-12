const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const resumeController = require("../controllers/resume.controller");

router.post("/", authMiddleware, authMiddleware, resumeController.create);
router.get("/", authMiddleware, resumeController.getAll);
router.get("/:id", authMiddleware, resumeController.getById);
router.put("/:id", authMiddleware, resumeController.update);
router.delete("/:id", authMiddleware, resumeController.deleteResume);

module.exports = router;
