const mongoose = require('mongoose')

const courseCatalogSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: 'default',
      trim: true,
    },
    meta: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    courses: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('CourseCatalog', courseCatalogSchema)
