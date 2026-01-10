const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema(
  {
    ip: String,
    city: String,
    region: String,
    country: String,
    location: String,
    distance: String,
    userAgent: String,
    deviceType: String,
    pagePath: String,
    platform: String,
    referrer: String,
    metadata: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.models.Visit || mongoose.model("Visit", visitSchema);
