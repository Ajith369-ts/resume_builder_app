const express = require("express");

const { body } = require("express-validator");

const router = express.Router();

const detailsController = require("../controllers/details");
const internDetailsController = require("../controllers/details/internship");
const trainingDetailsController = require("../controllers/details/training");

router.get("/details", detailsController.getFullDetails);

router.post(
  "/personal/details",
  // [
  //   body("first_name", "This field should not be empty.").notEmpty(),
  //   body("phoneNum", "Enter a valid phone number.").isMobilePhone(),
  //   body("emailId", "Enter a valid email.").isEmail(),
  //   body("address", "This field should not be empty.").notEmpty().isAlphanumeric()
  // ],
  detailsController.postPersonalDetails
);

router.post("/education/details", detailsController.postEducationDetails);

// Internships
router.post("/internship/details", internDetailsController.postInternDetails);

router.post("/internship/editDetails", internDetailsController.postEditInternDetails);

router.delete("/deleteInternItem/:contentId", internDetailsController.deleteInternItem);

router.post("/internOldContent/:editContentId", internDetailsController.internOldContent);

// Training and courses
router.post("/training/details", trainingDetailsController.postTrainingDetails);

router.post("/training/editDetails", trainingDetailsController.postEditTrainingDetails);


module.exports = router;
