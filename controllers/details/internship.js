const Details = require("../../models/details");

const { validationResult } = require("express-validator");

exports.postInternDetails = (req, res, next) => {
  Details.findOne({ userId: req.user._id.toString() })
    .then((result) => {
      if (result.internshipDetails) {
        result.internshipDetails.push({
          internProfile: req.body.internProfile,
          internOrganisation: req.body.internOrganisation,
          internLocation: req.body.internLocation,
          workFrom: req.body.wfh,
          startDate: req.body.internStartDate,
          endDate: req.body.internEndDate,
          discription: req.body.internDiscription,
        });
      } else {
        const details = new Details({
          internshipDetails: [
            {
              internProfile: req.body.internProfile,
              internOrganisation: req.body.internOrganisation,
              internLocation: req.body.internLocation,
              workFrom: req.body.wfh,
              startDate: req.body.internStartDate,
              endDate: req.body.internEndDate,
              discription: req.body.internDiscription,
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

exports.postEditInternDetails = (req, res, next) => {
  const editDetailsId = req.body.editDetailsId;

  Details.findOneAndUpdate(
    {
      userId: req.user._id.toString(),
      "internshipDetails._id": editDetailsId,
    },
    {
      $set: {
        "internshipDetails.$.internProfile": req.body.internProfile,
        "internshipDetails.$.internOrganisation": req.body.internOrganisation,
        "internshipDetails.$.internLocation": req.body.internLocation,
        "internshipDetails.$.workFrom": req.body.wfh,
        "internshipDetails.$.startDate": req.body.internStartDate,
        "internshipDetails.$.endDate": req.body.internEndDate,
        "internshipDetails.$.discription": req.body.internDiscription,
      },
    },
    function (err) {
      if (!err) {
        return res.redirect("/details");
      } else {
        console.log(err);
      }
    }
  );

  // Details.findOne({ userId: req.user._id.toString() })
  //   .then((result) => {
  //     result.internshipDetails.pull({ _id: editDetailsId });

  //     result.internshipDetails.push({
  //       internProfile: req.body.internProfile,
  //       internOrganisation: req.body.internOrganisation,
  //       internLocation: req.body.internLocation,
  //       workFrom: req.body.wfh,
  //       startDate: req.body.internStartDate,
  //       endDate: req.body.internEndDate,
  //       discription: req.body.internDiscription,
  //     });

  //     return result.save();
  //   })
  //   .then(() => {
  //     res.redirect("/details");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

exports.internOldContent = (req, res, next) => {
  const editContentId = req.params.editContentId;

  Details.findOne({ userId: req.user._id.toString() })
    .then((result) => {
      const data = result.internshipDetails.id(editContentId);
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
    });
};
