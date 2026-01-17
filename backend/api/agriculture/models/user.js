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
      required: false // Optional for leads
    },
    currentClass: {
      type: String,
      required: false
    },
    location: {
      type: mongoose.Schema.Types.Mixed, // Use Mixed for flexible object structure
      required: false
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
    },
    userType: {
      type: String,
      enum: ['enrollment', 'registered'],
      default: 'enrollment'
    },
    resetPasswordOTP: {
      type: String
    },
    resetPasswordExpires: {
      type: Date
    }
  },
  {
    timestamps: true // createdAt & updatedAt auto
  }
);

// Clear the model if it already exists to avoid schema caching issues in development
if (mongoose.models.User) {
  delete mongoose.models.User;
}

module.exports = mongoose.model("User", userSchema);
