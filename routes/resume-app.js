const express = require("express");

const router = express.Router();

const resumeAppController = require("../controllers/resume-app");

router.get("/", resumeAppController.getHome);

module.exports = router;