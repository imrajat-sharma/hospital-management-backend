const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));
app.use(expressLayouts);
app.set("layout", "layouts/main");

app.get("/", (req, res) => {
  res.render("index", { title: "Hospital Management System" });
});

app.use("/auth", require("./src/routes/auth.route"));
app.use("/doctors", require("./src/routes/doctor.route"));
app.use("/patients", require("./src/routes/patient.route"));
app.use("/appointments", require("./src/routes/appointment.route"));
app.use("/bills", require("./src/routes/bill.route"));
app.use("/dashboard", require("./src/routes/dashboard.route"));

module.exports = app;
