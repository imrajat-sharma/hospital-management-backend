const express = require("express");
const Doctor = require("../models/Doctor");
const router = express.Router();

const normalizeBody = (body) => {
  const data = { ...body };
  Object.keys(data).forEach((key) => {
    if (data[key] === "") delete data[key];
  });
  return data;
};

// List Doctors
router.get("/", async (req, res) => {
  const doctors = await Doctor.find();
  res.render("doctors/index", { title: "Doctors", doctors });
});

// Create Doctor Form
router.get("/create", (req, res) => {
  res.render("doctors/create", { title: "Add Doctor" });
});

// Handle Form Submission
router.post("/", async (req, res) => {
  await Doctor.create(normalizeBody(req.body));
  res.redirect("/doctors");
});

// Edit Form
router.get("/edit/:id", async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  res.render("doctors/edit", { title: "Edit Doctor", doctor });
});

// Update
router.post("/edit/:id", async (req, res) => {
  await Doctor.findByIdAndUpdate(req.params.id, normalizeBody(req.body));
  res.redirect("/doctors");
});

// Delete
router.post("/delete/:id", async (req, res) => {
  await Doctor.findByIdAndDelete(req.params.id);
  res.redirect("/doctors");
});

module.exports = router;
