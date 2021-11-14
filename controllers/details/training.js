const Details = require("../../models/details");

const path = require("path");

const PDFDocument = require("pdfkit");
const fs = require("fs");

const { validationResult } = require("express-validator");

exports.postTrainingDetails = (req, res, next) => {
  Details.findOne({ userId: req.user._id.toString() })
    .then((result) => {
      if (result.trainingDetails) {
        result.trainingDetails.push({
          trainProgram: req.body.trainProgram,
          trainingOrganisation: req.body.trainingOrganisation,
          trainingLocation: req.body.trainingLocation,
          ongoing: req.body.ongoing,
          startDate: req.body.trainingStartDate,
          endDate: req.body.trainingEndDate,
          disc: req.body.trainingDisc,
        });
      } else {
        const details = new Details({
          trainingDetails: [
            {
              trainProgram: req.body.trainProgram,
              trainingOrganisation: req.body.trainingOrganisation,
              trainingLocation: req.body.trainingLocation,
              ongoing: req.body.ongoing,
              startDate: req.body.trainingStartDate,
              endDate: req.body.trainingEndDate,
              disc: req.body.trainingDisc,
            },
          ],
        });
      }

      return result.save();
    })
    .then((result) => {
      res.redirect("/details");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditTrainingDetails = (req, res, next) => {
  const editDetailsId = req.body.editDetailsId;

  Details.findOneAndUpdate(
    { 
      userId: req.user._id.toString(),
      "trainingDetails._id": editDetailsId,
    },
    {
      $set: {
        "trainingDetails.$.trainProgram": req.body.trainProgram,
        "trainingDetails.$.trainingOrganisation": req.body.trainingOrganisation,
        "trainingDetails.$.trainingLocation": req.body.trainingLocation,
        "trainingDetails.$.ongoing": req.body.ongoing,
        "trainingDetails.$.startDate": req.body.trainingStartDate,
        "trainingDetails.$.endDate": req.body.trainingEndDate,
        "trainingDetails.$.discription": req.body.trainingDisc,
      },
    },
    (err) => {
      if (!err) {
        return res.redirect("/details");
      } else {
        console.log(err);
      }
    }
  );
};

exports.trainingOldContent = (req, res, next) => {
  const editContentId = req.params.editContentId;

  Details.findOne({ userId: req.user._id.toString() })
    .then((result) => {
      const data = result.trainingDetails.id(editContentId);
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
    });
};
