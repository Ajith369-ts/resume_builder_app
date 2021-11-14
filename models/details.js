const mongoose = require("mongoose");

const eduFormatSchema = new mongoose.Schema({
  eduName: {
    type: String,
  },
  status: {
    type: String,
  },
  clgName: {
    type: String,
  },
  startYear: {
    type: Date,
  },
  endYear: {
    type: Date,
  },
  degree: {
    type: String,
  },
  stream: {
    type: String,
  },
  perf_scale: {
    type: String,
  },
  mark: {
    type: Number,
  },
});

const detailsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  // Personal Details
  personalDetails: [
    {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      phoneNo: {
        type: String,
      },
      email: {
        type: String,
      },
      address: {
        type: String,
      },
    },
  ],

  // Education details
  educationDetails: {
    beDeg: [
      {
        type: eduFormatSchema,
      },
    ],
    diploma: [
      {
        type: eduFormatSchema,
      },
    ],
    postGrad: [
      {
        type: eduFormatSchema,
      },
    ],
    secondary: [
      {
        type: eduFormatSchema,
      },
    ],
  },

  // Internship detaiils
  internshipDetails: [
    {
      internProfile: {
        type: String,
      },
      internOrganisation: {
        type: String,
      },
      internLocation: {
        type: String,
      },
      workFrom: {
        type: Array,
      },
      startDate: {
        type: Date,
      },
      endDate: {
        type: Date,
      },
      discription: {
        type: String,
      },
    },
  ],

  // Position of responsibility
  responsibilityDetails: {
    disc: {
      type: String,
    },
  },

  // Training/Courses Details
  trainingDetails: [
    {
      trainProgram: {
        type: String,
      },
      trainingOrganisation: {
        type: String,
      },
      trainingLocation: {
        type: String,
      },
      ongoing: {
        type: String,
      },
      startDate: {
        type: Date,
      },
      endDate: {
        type: Date,
      },
      disc: {
        type: String,
      },
    },
  ],

  // Academic/personal Projects
  projectDetails: {
    title: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    disc: {
      type: String,
    },
    projectLink: {
      type: String,
    },
  },
});

module.exports = mongoose.model("Detail", detailsSchema);
