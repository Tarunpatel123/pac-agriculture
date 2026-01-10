const mongoose = require("mongoose");

const shareSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      default: 'Unknown'
    },
    shareCount: {
      type: Number,
      default: 1
    },
    visitorInfo: {
      ip: String,
      userAgent: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.models.Share || mongoose.model("Share", shareSchema);
