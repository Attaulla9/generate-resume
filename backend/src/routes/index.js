const express = require("express");
const authRoutes = require("./auth.routes");
const resumeRoutes = require("./resume.routes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/resume", resumeRoutes);

module.exports = router;
