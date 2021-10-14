const Details = require("../models/details");

const path = require("path");

const PDFDocument = require("pdfkit");
const fs = require("fs");

const { validationResult } = require("express-validator");

exports.getFullDetails = (req, res, next) => {
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

  Details.findOne({ _id: "61423166f70a347a85d1c85d" })
    .then((result) => {
      const intern = result.internshipDetails;
      const personal = result.personalDetails;

      res.render("details/full-details", {
        pageTitle: "Details",
        links: links,
        errorMsg: [],
        oldInput: {
          firstName: "",
          lastName: "",
          phoneNo: "",
          email: "",
          address: "",
        },
        intern: intern ? intern : [],
        personal: personal
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postPersonalDetails = (req, res, next) => {

}

exports.postPersonalDetails = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("details/full-details", {
      pageTitle: "Details",
      errorMsg: errors.array(),
      oldInput: {
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        phoneNo: req.body.phoneNum,
        email: req.body.emailId,
        address: req.body.address,
      },
    });
  }

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
};

exports.postEducationDetails = (req, res, next) => {};