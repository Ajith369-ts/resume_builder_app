const Details = require("../../models/details");

const path = require("path");

const PDFDocument = require("pdfkit");
const fs = require("fs");

const { validationResult } = require("express-validator");

exports.postPersonalDetails = (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    
    // return res.status(422).json({ errors: errors.array() });
    return res.redirect("/details")
  }

  Details.findOne({ _id: "61423166f70a347a85d1c85d" })
    .then((result) => {
      if (result.personalDetails.length == 0) {
        result.personalDetails.push({
          firstName: req.body.first_name,
          lastName: req.body.last_name,
          phoneNo: req.body.phoneNum,
          email: req.body.emailId,
          address: req.body.address,
        });
      } else {
        return;
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

//   Details.findOne({ _id: "61423166f70a347a85d1c85d" })
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
