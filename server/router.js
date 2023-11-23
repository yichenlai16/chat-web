const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "root endpoint" });
});

// User
const User = require("./model/user");

// router.get("/api/users", async (ws, req) => {
//   const allUsers = await User.findALL();
//   return res.status(200).json(allUsers);
// });

router.post("/api/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.ws("/ws", function (ws, req) {
  ws.on("message", function (msg) {
    ws.send(msg);
  });
});

module.exports = router;
