const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/v1", routes);

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Resume Builder Backend Running 🚀",
  });
});

module.exports = app;
