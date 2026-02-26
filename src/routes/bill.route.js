const express = require("express");
const Bill = require("../models/Bill");
const Patient = require("../models/Patient");
const Appointment = require("../models/Appointment");

const router = express.Router();

const normalizeBody = (body) => {
  const data = { ...body };
  Object.keys(data).forEach((key) => {
    if (data[key] === "") delete data[key];
  });
  return data;
};

router.get("/", async (req, res) => {
  const bills = await Bill.find()
    .populate("patient")
    .populate({
      path: "appointment",
      populate: [{ path: "doctor" }, { path: "patient" }],
    })
    .sort({ createdAt: -1 });
  res.render("bills/index", { title: "Bills", bills });
});

router.get("/create", async (req, res) => {
  const [patients, appointments] = await Promise.all([
    Patient.find().sort({ name: 1 }),
    Appointment.find()
      .populate("doctor")
      .populate("patient")
      .sort({ appointmentDate: -1 }),
  ]);

  res.render("bills/create", {
    title: "Create Bill",
    patients,
    appointments,
  });
});

router.post("/", async (req, res) => {
  await Bill.create(normalizeBody(req.body));
  res.redirect("/bills");
});

router.get("/edit/:id", async (req, res) => {
  const [bill, patients, appointments] = await Promise.all([
    Bill.findById(req.params.id),
    Patient.find().sort({ name: 1 }),
    Appointment.find()
      .populate("doctor")
      .populate("patient")
      .sort({ appointmentDate: -1 }),
  ]);

  res.render("bills/edit", {
    title: "Edit Bill",
    bill,
    patients,
    appointments,
  });
});

router.post("/edit/:id", async (req, res) => {
  await Bill.findByIdAndUpdate(req.params.id, normalizeBody(req.body));
  res.redirect("/bills");
});

router.post("/delete/:id", async (req, res) => {
  await Bill.findByIdAndDelete(req.params.id);
  res.redirect("/bills");
});

module.exports = router;
