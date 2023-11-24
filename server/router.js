const express = require("express");
const router = express.Router();
const { body, header } = require("express-validator");

router.get("/", (req, res) => {
  res.json({ message: "root endpoint" });
});

// User
// const User = require("./models/user");
const authController = require("./controllers/auth.controllers");
// POST /api/auth/signup
router.post(
  "/api/auth/signup",
  body("username").custom(async (value) => {
    const isExist = await authController.fetchByUsername(value);
    console.log(isExist.length);
    if (isExist.length) {
      console.log("??");

      throw new Error("Username Duplicated");
    }
  }),
  authController.validate,
  authController.signup
);

// POST /api/auth/signin
// router.post("/api/auth/signup", async (req, res) => {
//   try {
//     const user = new User(req.body);
//     await user.save();
//     res.send(user);
//   } catch (e) {
//     res.status(404).send(e);
//   }
// });

router.ws("/ws", function (ws, req) {
  ws.on("message", function (msg) {
    ws.send(msg);
  });
});

module.exports = router;
