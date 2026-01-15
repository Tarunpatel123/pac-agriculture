const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    fileUrl: {
      type: String,
      required: true // URL of the PDF or Note
    },
    category: {
      type: String,
      enum: ['Board Exam', 'Notes', 'PDF', 'Other'],
      default: 'Board Exam'
    },
    isPublished: {
      type: Boolean,
      default: false
    },
    downloadCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.models.Material || mongoose.model("Material", materialSchema);
