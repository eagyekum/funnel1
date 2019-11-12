const express = require("express");
const router = express.Router();
const User = require("../models/User");
const validator = require("../validation");

router.get("/list", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).render("list", { users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Render landing page
router.get("/", (req, res) => {
  res.status(200).render("index");
});

router.post("/", async (req, res) => {
  let errors = [];
  const { error } = validator(req.body);
  if (error) {
    errors.push(error.details[0].message);
  }
  const { email } = req.body;
  const user = new User({ email });
  if (errors.length > 0) {
    res.status(400).render("index", { errors, email });
  }
  try {
    await user.save();
    res.status(201).redirect("/api/v1/users");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
