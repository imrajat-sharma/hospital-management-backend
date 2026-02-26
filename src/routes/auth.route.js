const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const auth = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/register", (req, res) => {
  res.render("auth/register", { title: "Register User" });
});

router.post("/register", async (req, res) => {
  const existing = await User.findOne({ email: req.body.email });
  if (existing) {
    return res.status(400).render("auth/register", {
      title: "Register User",
      error: "Email already exists",
    });
  }

  await User.create(req.body);
  res.redirect("/auth/login");
});

router.get("/login", (req, res) => {
  res.render("auth/login", { title: "Login" });
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).render("auth/login", {
      title: "Login",
      error: "Invalid credentials",
    });
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) {
    return res.status(401).render("auth/login", {
      title: "Login",
      error: "Invalid credentials",
    });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.render("auth/token", { title: "JWT Token", token, user });
});

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json({ user });
});

module.exports = router;
