const Details = require("../../models/details");

const path = require("path");

const PDFDocument = require("pdfkit");
const fs = require("fs");

const { validationResult } = require("express-validator");


exports.postTrainingDetails = (req, res, next) => {
  Details.findOne({ _id: "61423166f70a347a85d1c85d" })
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

  Details.findOne({ _id: "61423166f70a347a85d1c85d" })
    .then((result) => {
      result.trainingDetails.pull({ _id: editDetailsId });

      result.trainingDetails.push({
        trainProgram: req.body.trainProgram,
        trainingOrganisation: req.body.trainingOrganisation,
        trainingLocation: req.body.trainingLocation,
        ongoing: req.body.ongoing,
        startDate: req.body.trainingStartDate,
        endDate: req.body.trainingEndDate,
        discription: req.body.trainingDisc,
      });

      return result.save();
    })
    .then(() => {
      res.redirect("/details");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.trainingOldContent = (req, res, next) => {
  const editContentId = req.params.editContentId;

  Details.findOne({ _id: "61423166f70a347a85d1c85d" })
    .then((result) => {
      const data = result.trainingDetails.id(editContentId);
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
