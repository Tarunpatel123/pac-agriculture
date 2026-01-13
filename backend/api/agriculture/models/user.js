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

    password: {
      type: String,
      required: true
    },
    currentClass: {
      type: String,
      required: false
    },
    location: {
      type: {
        lat: Number,
        lng: Number,
        address: String
      },
      required: true
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
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
    }
  },
  {
    timestamps: true // createdAt & updatedAt auto
  }
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
