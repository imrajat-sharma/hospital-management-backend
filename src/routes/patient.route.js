const express = require("express");
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
  const patients = await Patient.find().sort({ createdAt: -1 });
  res.render("patients/index", { title: "Patients", patients });
});

router.get("/create", (req, res) => {
  res.render("patients/create", { title: "Add Patient" });
});

router.post("/", async (req, res) => {
  await Patient.create(normalizeBody(req.body));
  res.redirect("/patients");
});

router.get("/edit/:id", async (req, res) => {
  const patient = await Patient.findById(req.params.id);
  res.render("patients/edit", { title: "Edit Patient", patient });
});

router.post("/edit/:id", async (req, res) => {
  await Patient.findByIdAndUpdate(req.params.id, normalizeBody(req.body));
  res.redirect("/patients");
});

router.post("/delete/:id", async (req, res) => {
  await Patient.findByIdAndDelete(req.params.id);
  res.redirect("/patients");
});

module.exports = router;
