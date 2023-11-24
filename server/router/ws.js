// router.js
const express = require("express");
const router = express.Router();
const { body, header } = require("express-validator");

module.exports = (expressWs) => {
  const getWss = expressWs.getWss("/");

  router.ws("/", function (ws, req) {
    ws.onmessage = function (msg) {
      getWss.clients.forEach(function (client) {
        client.send(msg.data);
      });
    };
  });

  return router;
};
