const express = require("express");

const { body } = require("express-validator");

const router = express.Router();

const detailsController = require("../controllers/details");
const personalDetailsController = require("../controllers/details/personal");
const internDetailsController = require("../controllers/details/internship");
const trainingDetailsController = require("../controllers/details/training");
const downloadResume = require("../controllers/getPDF");
const isAuth = require("../middleware/isAuth");

router.get("/details", isAuth, detailsController.getFullDetails);

router.delete("/deletedetails/:contentId/:delId", detailsController.deleteItems);

// Personal Details
router.post(
  "/personal/details",
  [
    body("first_name", "This field should not be empty.").notEmpty(),
    body("phoneNum", "Enter a valid phone number.").isMobilePhone(),
    body("emailId", "Enter a valid email.").isEmail().normalizeEmail(),
    body("address", "This field should not be empty.").notEmpty()
  ],
  personalDetailsController.postPersonalDetails
);

router.post("/personal/editDetails",
  [
    body("first_name", "This field should not be empty.").notEmpty(),
    body("phoneNum", "Enter a valid phone number.").isMobilePhone(),
    body("emailId", "Enter a valid email.").isEmail().normalizeEmail(),
    body("address", "This field should not be empty.").notEmpty()
  ], 
  personalDetailsController.postEditUserDetails
);

router.post("/personalOldContent/:editContentId", personalDetailsController.personalOldContent);

// Educations
router.post("/education/details", detailsController.postEducationDetails);

// Internships
router.post("/internship/details", isAuth, internDetailsController.postInternDetails);

router.post("/internship/editDetails", isAuth, internDetailsController.postEditInternDetails);

router.post("/internOldContent/:editContentId", isAuth, internDetailsController.internOldContent);

// Training and courses
router.post("/training/details", trainingDetailsController.postTrainingDetails);

router.post("/training/editDetails", trainingDetailsController.postEditTrainingDetails);

router.post("/trainingOldContent/:editContentId", trainingDetailsController.trainingOldContent);

// PDF Download
router.get("/download/:downloadId", downloadResume.getPDF);

module.exports = router;
