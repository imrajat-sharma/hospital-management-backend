const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  gender: {
    type: String,
    enum: ["male", "female", "other"]
  },
  phone: String,
  address: String,
  bloodGroup: String
}, { timestamps: true });

module.exports = mongoose.model("Patient", patientSchema);