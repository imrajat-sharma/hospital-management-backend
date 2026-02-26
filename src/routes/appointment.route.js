const express = require("express");
const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");

const router = express.Router();

const normalizeBody = (body) => {
  const data = { ...body };
  Object.keys(data).forEach((key) => {
    if (data[key] === "") delete data[key];
  });
  return data;
};

router.get("/", async (req, res) => {
  const appointments = await Appointment.find()
    .populate("doctor")
    .populate("patient")
    .sort({ appointmentDate: -1 });
  res.render("appointments/index", { title: "Appointments", appointments });
});

router.get("/create", async (req, res) => {
  const [doctors, patients] = await Promise.all([
    Doctor.find().sort({ name: 1 }),
    Patient.find().sort({ name: 1 }),
  ]);
  res.render("appointments/create", {
    title: "Create Appointment",
    doctors,
    patients,
  });
});

router.post("/", async (req, res) => {
  await Appointment.create(normalizeBody(req.body));
  res.redirect("/appointments");
});

router.get("/edit/:id", async (req, res) => {
  const [appointment, doctors, patients] = await Promise.all([
    Appointment.findById(req.params.id),
    Doctor.find().sort({ name: 1 }),
    Patient.find().sort({ name: 1 }),
  ]);

  res.render("appointments/edit", {
    title: "Edit Appointment",
    appointment,
    doctors,
    patients,
  });
});

router.post("/edit/:id", async (req, res) => {
  await Appointment.findByIdAndUpdate(req.params.id, normalizeBody(req.body));
  res.redirect("/appointments");
});

router.post("/delete/:id", async (req, res) => {
  await Appointment.findByIdAndDelete(req.params.id);
  res.redirect("/appointments");
});

module.exports = router;
