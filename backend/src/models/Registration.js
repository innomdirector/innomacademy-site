const mongoose = require('mongoose')

const registrationSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 10, max: 28 },
    email: { type: String, required: true, trim: true, lowercase: true },
    course: { type: String, required: true, trim: true },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^(?:\+995)?5\d{8}$/, 'Invalid phone'],
    },
    parentPhone: {
      type: String,
      required: true,
      trim: true,
      match: [/^(?:\+995)?5\d{8}$/, 'Invalid phone'],
    },
    note: { type: String, trim: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Registration', registrationSchema)
