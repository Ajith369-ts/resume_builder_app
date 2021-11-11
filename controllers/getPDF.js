const Details = require("../models/details");

const path = require("path");

const PDFDocument = require("pdfkit");
const fs = require("fs");
const { fontSize } = require("pdfkit");

exports.getPDF = (req, res, next) => {
  const downloadId = req.params.downloadId;
  const resumeName = "resume" + ".pdf";
  const resumePath = path.join("data", "resumes", resumeName);

  Details.findOne({ _id: downloadId })
    .then((data) => {
      const pdfDoc = new PDFDocument({
        size: "LETTER",
        margins: { top: 38.4, left: 57.6, right: 57.6, bottom: 57.6 },
      });
      res.setHeader("Content-type", "application/pdf");
      res.setHeader("Content-Disposition", "inline");

      pdfDoc.pipe(fs.createWriteStream(resumePath));

      pdfDoc.pipe(res);

      pdfDoc.fontSize(20);
      pdfDoc
        .font("Helvetica-Bold")
        .text(
          data.personalDetails[0].firstName.toUpperCase() +
            " " +
            data.personalDetails[0].lastName.toUpperCase(),
          {
            align: "left",
            lineGap: 1.5,
          }
        );

      pdfDoc.fontSize(10);
      pdfDoc
        .font("Helvetica")
        .text("4th year B.Tech, Computer Science & Engineering", {
          lineGap: 1.5,
        });

      pdfDoc.text("IIT Madras");

      pdfDoc.moveDown(1.25);
      pdfDoc.text(
        "----------------------------------------------------------------------------------------------------------------------",
        {
          width: 510,
          align: "center",
        }
      );

      // Functions
      const detailsHeading = (heading) => {
        pdfDoc.moveDown(1.7);
        pdfDoc
          .fillColor("#2c8bde")
          .font("Helvetica-Bold")
          .fontSize(10.5)
          .text(heading, {
            width: 280,
            align: "left",
          });
      };

      if (data.educationDetails) {
        detailsHeading("EDUCATION QUALIFICATION");
      }

      if (data.internshipDetails) {

        detailsHeading("INTERNSHIP");

        data.internshipDetails.forEach((element) => {
          pdfDoc.moveDown(1);
          pdfDoc
            .font("Helvetica-Bold")
            .fontSize(12.2)
            .fillColor("black")
            .text(element.internProfile, {
              lineGap: 1.6,
              continued: true,
            })
            .font("Helvetica")
            .text(
              " — " + element.internOrganisation + ", " + element.internLocation
            );

          pdfDoc.moveDown(0.1);
          pdfDoc
            .fontSize(9.6)
            .fillColor("#666666")
            .text(
              element.startDate.toString().slice(4, 15).toUpperCase() +
                " - " +
                element.endDate.toString().slice(4, 15).toUpperCase()
            );

          pdfDoc.moveDown(0.3);
          pdfDoc.fontSize(12.2).fillColor("#6e6e6e").text(element.discription);
        });
      }


      // Right side column
      pdfDoc
        .fontSize(10.5)
        .font("Helvetica")
        .fillColor("black")
        .text("Phone : +91 – 96xxxxxxxx", 390, 38.4, {
          align: "left",
        });

      pdfDoc.moveDown(0.2);
      pdfDoc
        .text("Email : ", {
          align: "left",
          continued: true,
        })
        .fillColor("blue")
        .text("rahulxxx@gmail.com");

      pdfDoc.moveDown(0.2);
      pdfDoc
        .fillColor("black")
        .text("Address : 7/7, Rail Vihar, Gurgaon – 122 003", {
          align: "left",
          width: 190,
        });

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

      // if(!data.educationDetails) {
      //   distance = 130;
      //   headingDistance = 2.7;
      // } else {
      //     rectBorder(40, 130);
      //     headingRect("Educational Qualification", 2.7);
      // }

      // rectBorder(40, distance); // 350
      // headingRect("Internships & Trainings", headingDistance); // 17.5

      pdfDoc.end();
    })
    .catch((err) => {
      console.log(err);
    });
};
