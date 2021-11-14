const Details = require("../../models/details");

const { validationResult } = require("express-validator");

exports.postPersonalDetails = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // return res.status(422).json({ errors: errors.array() });
    return res.redirect("/details");
  }

  Details.findOneAndUpdate(
    {
      userId: req.user._id.toString(),
    },
    {
      $set: {
        personalDetails: {
          firstName: req.body.first_name,
          lastName: req.body.last_name,
          phoneNo: req.body.phoneNum,
          email: req.body.emailId,
          address: req.body.address,
        },
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

exports.postEditUserDetails = (req, res, next) => {
  const editDetailsId = req.body.editDetailsId;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.redirect("/details");
  }

  Details.findOne({ userId: req.user._id.toString() })
    .then((result) => {
      result.personalDetails.pull({ _id: editDetailsId });

      result.personalDetails.push({
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        phoneNo: req.body.phoneNum,
        email: req.body.emailId,
        address: req.body.address,
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

exports.personalOldContent = (req, res, next) => {
  const editContentId = req.params.editContentId;

  Details.findOne({ userId: req.user._id.toString() })
    .then((result) => {
      const data = result.personalDetails.id(editContentId);
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

//   Details.findOne({ userId: req.user._id.toString() })
//     .then((result) => {
//       if (result.personalDetails == null) {
//         console.log(result);
//         return res.redirect("/details");
//       } else {
//         const details = new Details({
//           personalDetails: {
//             firstName: req.body.first_name,
//             lastName: req.body.last_name,
//             phoneNo: req.body.phoneNum,
//             email: req.body.emailId,
//             address: req.body.address,
//           },
//         });
//         console.log("Created");
//       }

//       return result.save();
//     })
//     .then((result) => {
//       res.redirect("/details");
//     })
//     .catch((err) => {
//       console.log(err);
//     });

//   //   if (!errors.isEmpty()) {
//   //     return res.render("details/full-details", {
//   //       pageTitle: "Details",
//   //       errorMsg: errors.array(),
//   //       oldInput: {
//   //         firstName: req.body.first_name,
//   //         lastName: req.body.last_name,
//   //         phoneNo: req.body.phoneNum,
//   //         email: req.body.emailId,
//   //         address: req.body.address,
//   //       },
//   //     });
//   //   }
// };
