const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    mobileNumber: {
      type: String,
      required: true
    },

    currentClass: {
      type: String
    },
    interested_Course: {
      type: String
    },
    instagramId: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ['Pending', 'Called', 'Interested', 'Joined', 'Not Interested'],
      default: 'Pending'
    },
    distance: {
      type: Number, // Distance in KM
      default: null
    },
    location: {
      type: String, // City/Region from IP or GPS
      default: 'Unknown'
    }
  },
  {
    timestamps: true // createdAt & updatedAt auto
  }
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
