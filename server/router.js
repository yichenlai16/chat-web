const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Home");
});

router.ws("/ws", function (ws, req) {
  ws.on("message", function (msg) {
    ws.send(msg);
  });
});

module.exports = router;
