const Details = require("../../models/details");

exports.postBeDeg = (req, res, next) => {
  Details.findOneAndUpdate(
    {
      userId: req.user._id.toString(),
    },
    {
      $push: {
        "educationDetails.beDeg": {
          eduName: req.body.eduName,
          status: req.body.radio_input,
          clgName: req.body.clgName,
          startYear: req.body.startYear,
          endYear: req.body.endYear,
          degree: req.body.degree,
          stream: req.body.stream,
          perf_scale: req.body.perf_scale,
          mark: req.body.mark,
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

  // Details.findOne({ userId: req.user._id.toString() })
  //   .then((result) => {
  //     result.educationDetails.beDeg = {
  //       eduName: req.body.eduName,
  //       status: req.body.radio_input,
  //       clgName: req.body.clgName,
  //       startYear: req.body.startYear,
  //       endYear: req.body.endYear,
  //       degree: req.body.degree,
  //       stream: req.body.stream,
  //       perf_scale: req.body.perf_scale,
  //       mark: req.body.mark,
  //     };

  //     return result.save();
  //   })
  //   .then(() => {
  //     res.redirect("/details");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

exports.postDiploma = (req, res, next) => {
  Details.findOneAndUpdate(
    {
      userId: req.user._id.toString(),
    },
    {
      $push: {
        "educationDetails.diploma": {
          eduName: req.body.eduName,
          status: req.body.radio_input,
          clgName: req.body.clgName,
          startYear: req.body.startYear,
          endYear: req.body.endYear,
          stream: req.body.stream,
          perf_scale: req.body.perf_scale,
          mark: req.body.mark,
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

exports.postGrad = (req, res, next) => {
  Details.findOneAndUpdate(
    {
      userId: req.user._id.toString(),
    },
    {
      $push: {
        "educationDetails.postGrad": {
          eduName: req.body.eduName,
          status: req.body.radio_input,
          clgName: req.body.clgName,
          startYear: req.body.startYear,
          endYear: req.body.endYear,
          endYear: req.body.endYear,
          stream: req.body.stream,
          perf_scale: req.body.perf_scale,
          mark: req.body.mark,
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

exports.postSecondary = (req, res, next) => {
  Details.findOneAndUpdate(
    {
      userId: req.user._id.toString(),
    },
    {
      $set: {
        "educationDetails.secondary": {
          degree: "Senior Secondary (XII), Science",
          eduName: req.body.eduName,
          status: req.body.radio_input,
          clgName: req.body.clgName,
          startYear: req.body.startYear,
          endYear: req.body.endYear,
          endYear: req.body.endYear,
          stream: req.body.stream,
          perf_scale: req.body.perf_scale,
          mark: req.body.mark,
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
