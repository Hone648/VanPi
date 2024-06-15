require('./mongoose');
require('./routes/User');
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const User = require('./routes/User');
app.use("/api", User);

const port = 5000;

app.listen(port, () => { console.log("Server started on port " + port) })

