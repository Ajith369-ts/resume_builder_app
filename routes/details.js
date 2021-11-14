const express = require("express");

const { body } = require("express-validator");

const router = express.Router();

const detailsController = require("../controllers/details");
const personalDetailsController = require("../controllers/details/personal");
const educationDetailsController = require("../controllers/details/education");
const internDetailsController = require("../controllers/details/internship");
const trainingDetailsController = require("../controllers/details/training");
const downloadResume = require("../controllers/getPDF");
const isAuth = require("../middleware/isAuth");

router.get("/details", isAuth, detailsController.getFullDetails);

router.delete("/deletedetails/:contentId/:delId", isAuth, detailsController.deleteItems);

// Personal Details
router.post(
  "/personal/details",
  [
    body("first_name", "This field should not be empty.").notEmpty(),
    body("phoneNum", "Enter a valid phone number.").isMobilePhone(),
    body("emailId", "Enter a valid email.").isEmail().normalizeEmail(),
    body("address", "This field should not be empty.").notEmpty()
  ],
  isAuth,
  personalDetailsController.postPersonalDetails
);

router.post("/personal/editDetails",
  [
    body("first_name", "This field should not be empty.").notEmpty(),
    body("phoneNum", "Enter a valid phone number.").isMobilePhone(),
    body("emailId", "Enter a valid email.").isEmail().normalizeEmail(),
    body("address", "This field should not be empty.").notEmpty()
  ],
  isAuth, 
  personalDetailsController.postEditUserDetails
);

router.post("/personalOldContent/:editContentId", isAuth, personalDetailsController.personalOldContent);

// Educations
router.post("/education/beDeg", isAuth, educationDetailsController.postBeDeg);

router.post("/education/diploma", isAuth, educationDetailsController.postDiploma);

router.post("/education/postGrad", isAuth, educationDetailsController.postGrad);

router.post("/education/secondary", isAuth, educationDetailsController.postSecondary);

// Internships
router.post("/internship/details", isAuth, internDetailsController.postInternDetails);

router.post("/internship/editDetails", isAuth, internDetailsController.postEditInternDetails);

router.post("/internOldContent/:editContentId", isAuth, internDetailsController.internOldContent);

// Training and courses
router.post("/training/details", isAuth, trainingDetailsController.postTrainingDetails);

router.post("/training/editDetails", isAuth, trainingDetailsController.postEditTrainingDetails);

router.post("/trainingOldContent/:editContentId", isAuth, trainingDetailsController.trainingOldContent);

// PDF Download
router.get("/download/:downloadId", isAuth, downloadResume.getPDF);

module.exports = router;
