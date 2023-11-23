const express = require("express");
const app = express();
const port = 3000;

const expressWs = require("express-ws")(app);

const Router = require("./router");

app.use(Router);

app.listen(port, () => {
  console.log(`Server app listening on port ${port}`);
});
