const express = require("express");
const router = express.Router();
const { body, header } = require("express-validator");

router.get("/", (req, res) => {
  res.json({ message: "root endpoint" });
});

// User
const authController = require("../controllers/auth.controllers");
// POST /api/auth/signup
router.post(
  "/api/auth/signup",
  body("username").custom(async (value) => {
    const isExist = await authController.fetchByUsername(value);
    if (isExist.length) {
      throw new Error("Username Duplicated");
    }
  }),
  authController.validate,
  authController.signup
);

module.exports = router;
