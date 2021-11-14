const Details = require("../models/details");

const path = require("path");

const PDFDocument = require("pdfkit");
const fs = require("fs");

const { validationResult } = require("express-validator");
const { isArray } = require("util");

exports.getFullDetails = (req, res, next) => {
  const link = ["personal", "intern", "training", "education"];

  const links = [
    {
      heading: "PERSONAL DETAILS",
      id: "#userDetailModal",
      linkName: "Add Personal Details",
    },
    {
      heading: "EDUCATION",
      id: "#eduDetailModal",
      linkName: "Add education",
    },
    {
      heading: "INTERNSHIPS",
      id: "#internDetailModal",
      linkName: "Add internship",
    },
    {
      heading: "POSITIONS OF RESPONSIBILITY",
      id: "#responsibilityDetailModal",
      linkName: "Add position of responsibility",
    },
    {
      heading: "TRAININGS/ COURSES",
      id: "#trainingDetailModal",
      linkName: "Add training/ course",
    },
    {
      heading: "ACADEMICS/ PERSONAL PROJECTS",
      id: "#projectDetailModal",
      linkName: "Add academic/ personal project",
    },
  ];

  Details.findOne({ userId: req.user._id.toString() })
    .then((result) => {
      const user = result.personalDetails;
      const education = result.educationDetails;
      const intern = result.internshipDetails;
      const personal = result.personalDetails;
      const training = result.trainingDetails;

      res.render("details/full-details", {
        pageTitle: "Details",
        link: link,
        links: links,
        errorMsg: [],
        oldInput: {
          firstName: "",
          lastName: "",
          phoneNo: "",
          email: "",
          address: "",
        },
        userDetails: user ? user : [],
        education: education ? education : {},
        subEdu: ["beDeg", "diploma", "postGrad", "secondary"],
        intern: intern ? intern : [],
        personal: personal,
        training: training ? training : [],
        pdfId: req.user._id.toString(),
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteItems = (req, res, next) => {
  const contentId = req.params.contentId;
  const delId = req.params.delId;

  Details.findOne({ userId: req.user._id.toString() })
    .then((result) => {

      if (Array.isArray(result[`${contentId}`])) {

        result[`${contentId}`].pull({ _id: delId });
        return result.save();

      } else if (typeof result[`${contentId}`] == "object") {

        console.log(result[`${contentId}`].beDeg);
        result = this.toObject()
        delete result[`${contentId}`].secondary;
        return result.save();

      }

    })
    .then(() => {
      res.status(200).json({ message: "success" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Deleting content failed" });
    });
};

// const resumeName = "resume" + ".pdf";
// const resumePath = path.join("data", "resumes", resumeName);

// const pdfDoc = new PDFDocument({ size: "A4" });
// res.setHeader("Content-type", "application/pdf");
// res.setHeader("Content-Disposition", "inline");

// pdfDoc.pipe(fs.createWriteStream(resumePath));

// pdfDoc.pipe(res);

// pdfDoc.fontSize(14);
// pdfDoc
//   .font("Helvetica-Bold")
//   .text(req.body.first_name + " " + req.body.last_name, 50, 40, {
//     align: "left",
//     lineGap: 1.5,
//   });

// pdfDoc.fontSize(10);
// pdfDoc
//   .font("Helvetica")
//   .text("4th year B.Tech, Computer Science & Engineering", {
//     lineGap: 1.5,
//   });

// pdfDoc.text("IIT Madras");

// pdfDoc.text("Phone : +91 – 96xxxxxxxx", 342, 42.8, {
//   align: "center",
//   lineGap: 1.5,
// });

// pdfDoc.fillColor("blue").text("Email : rahulxxx@gmail.com", {
//   align: "center",
//   lineGap: 1.5,
// });

// pdfDoc
//   .fillColor("black")
//   .text("Address : 7/7, Rail Vihar, Gurgaon – 122 003", {
//     align: "left",
//     lineGap: 1.5,
//     width: 500,
//   });

// pdfDoc.text(
//   "--------------------------------------------------------------------------------------------------------------------------------------------------------",
//   40,
//   90,
//   {
//     width: 510,
//   }
// );

// const rectBorder = (x, y) => {
//   pdfDoc
//     .rect(x, y, 507, 16)
//     .lineWidth(1)
//     .fillOpacity(0.6)
//     .fillAndStroke("#f0f0f0", "#c9c9c9");
// };

// const headingRect = (heading, down) => {
//   pdfDoc.fontSize(10);
//   pdfDoc
//     .font("Helvetica-Bold")
//     .fillColor("black")
//     .fillOpacity(1)
//     .moveDown(down)
//     .text(heading, {
//       align: "center",
//     });
// };
// rectBorder(40, 130);
// headingRect("Educational Qualification", 2.7);

// rectBorder(40, 350);
// headingRect("Internships & Trainings", 17.5);

// pdfDoc.end();

// const details = new Details({
//   personalDetails: {
//     firstName: req.body.first_name,
//     lastName: req.body.last_name,
//     phoneNo: req.body.phoneNum,
//     email: req.body.emailId,
//     address: req.body.address,
//   },
//   internshipDetails: {
//     internProfile: req.body.internProfile,
//     internOrganisation: req.body.internOrganisation,
//     internLocation: req.body.internLocation,
//     workFrom: req.body.wfh,
//     startDate: req.body.internStartDate,
//     endDate: req.body.internEndDate,
//     discription: req.body.internDiscription,
//   },
//   responsibilityDetails: {
//     disc: req.body.resposibilityDisc,
//   },
//   trainingDetails: {
//     trainProgram: req.body.trainProgram,
//     organisation: req.body.trainingOrganisation,
//     location: req.body.trainingLocation,
//     ongoing: req.body.ongoing,
//     startDate: req.body.trainingStartDate,
//     endDate: req.body.trainingEndDate,
//     disc: req.body.trainingDisc,
//   },
//   projectDetails: {
//     title: req.body.projectTitle,
//     startDate: req.body.projectStartDate,
//     endDate: req.body.projectEndDate,
//     disc: req.body.projectDisc,
//     projectLink: req.body.projectLink,
//   },
// });
// details
//   .save()

//   .then((result) => {
//     console.log("Successfully created");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// };

exports.postEducationDetails = (req, res, next) => {};
