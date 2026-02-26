const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true
  },
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment"
  },
  amount: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending"
  },
  paymentMethod: {
    type: String,
    enum: ["cash", "card", "upi"]
  }
}, { timestamps: true });

module.exports = mongoose.model("Bill", billSchema);