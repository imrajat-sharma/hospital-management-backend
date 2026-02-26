const express = require("express");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const Appointment = require("../models/Appointment");
const Bill = require("../models/Bill");

const router = express.Router();

router.get("/", async (req, res) => {
  const [doctorCount, patientCount, appointmentCount, billCount] =
    await Promise.all([
      Doctor.countDocuments(),
      Patient.countDocuments(),
      Appointment.countDocuments(),
      Bill.countDocuments(),
    ]);

  const [statusStats, specializationStats, paymentStats, revenueStats] =
    await Promise.all([
      Appointment.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      Doctor.aggregate([
        { $group: { _id: "$specialization", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      Bill.aggregate([
        { $group: { _id: "$paymentStatus", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      Bill.aggregate([
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$amount" },
            paidRevenue: {
              $sum: {
                $cond: [{ $eq: ["$paymentStatus", "paid"] }, "$amount", 0],
              },
            },
            pendingRevenue: {
              $sum: {
                $cond: [{ $eq: ["$paymentStatus", "pending"] }, "$amount", 0],
              },
            },
          },
        },
      ]),
    ]);

  const recentAppointments = await Appointment.find()
    .populate("doctor")
    .populate("patient")
    .sort({ createdAt: -1 })
    .limit(5);

  const revenue = revenueStats[0] || {
    totalRevenue: 0,
    paidRevenue: 0,
    pendingRevenue: 0,
  };

  res.render("dashboard/index", {
    title: "Dashboard",
    metrics: {
      doctorCount,
      patientCount,
      appointmentCount,
      billCount,
    },
    statusStats,
    specializationStats,
    paymentStats,
    revenue,
    recentAppointments,
  });
});

module.exports = router;
