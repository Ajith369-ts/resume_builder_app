const express = require("express");

const { body } = require("express-validator");

const router = express.Router();

const detailsController = require("../controllers/details");
const personalDetailsController = require("../controllers/details/personal");
const internDetailsController = require("../controllers/details/internship");
const trainingDetailsController = require("../controllers/details/training");
const downloadResume = require("../controllers/getPDF");

router.get("/details", detailsController.getFullDetails);

router.delete("/deletedetails/:contentId/:delId", detailsController.deleteItems);

router.post(
  "/personal/details",
  [
    body("first_name", "This field should not be empty.").notEmpty(),
    body("phoneNum", "Enter a valid phone number.").isMobilePhone(),
    body("emailId", "Enter a valid email.").isEmail().normalizeEmail(),
    body("address", "This field should not be empty.").notEmpty().isAlphanumeric()
  ],
  personalDetailsController.postPersonalDetails
);

router.post("/education/details", detailsController.postEducationDetails);

// Internships
router.post("/internship/details", internDetailsController.postInternDetails);

router.post("/internship/editDetails", internDetailsController.postEditInternDetails);

router.post("/internOldContent/:editContentId", internDetailsController.internOldContent);

// Training and courses
router.post("/training/details", trainingDetailsController.postTrainingDetails);

router.post("/training/editDetails", trainingDetailsController.postEditTrainingDetails);

router.post("/trainingOldContent/:editContentId", trainingDetailsController.trainingOldContent);

// PDF Download
router.get("/download/:downloadId", downloadResume.getPDF);

module.exports = router;
