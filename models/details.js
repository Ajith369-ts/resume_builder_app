const mongoose = require("mongoose");

const detailsSchema = new mongoose.Schema({

    // Personal Details
    personalDetails: {
        firstName: {
          type: String
        },
        lastName: {
          type: String
        },
        phoneNo: {
          type: String
        },
        email: {
          type: String
        },
        address: {
          type: String
        }
    },
    // Education details
    // educationDetails: {
    //   edu: [{
    //     status: {
    //       type: String
    //     },
    //     clgName: {
    //       type: String
    //     },
    //     startYear: {
    //       type: Number
    //     },
    //     endYear: {
    //       type: Number
    //     },
    //     degree: {
    //       type: String
    //     },
    //     stream: {
    //       type: String
    //     },
    //     perf_scale: {
    //       type: String
    //     },
    //     mark: {
    //       type: Number
    //     }
    //   }]
    // },
    
    // Internship detaiils
    internshipDetails: [{
      internProfile: {
        type: String
      },
      internOrganisation: {
        type: String
      },
      internLocation: {
        type: String
      },
      workFrom: {
        type: Array
      },
      startDate: {
        type: Date
      },
      endDate: {
        type: Date
      },
      discription: {
        type: String
      }
    }],

    // Position of responsibility
    responsibilityDetails: {
      disc: {
        type: String
      }
    },

    // Training/Courses Details
    trainingDetails: [{
      trainProgram: {
        type: String
      },
      trainingOrganisation: {
        type: String
      },
      trainingLocation: {
        type: String
      },
      ongoing: {
        type: String
      },
      startDate: {
        type: Date
      },
      endDate: {
        type: Date
      },
      disc: {
        type: String
      }
    }],

    // Academic/personal Projects
    projectDetails: {
      title: {
        type: String
      },
      startDate: {
        type: Date
      },
      endDate: {
        type: Date
      },
      disc: {
        type: String
      },
      projectLink: {
        type: String
      }
    }

});

module.exports = mongoose.model("detail", detailsSchema);
