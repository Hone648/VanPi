require('./mongoose');
require('./routes/User');
require('./routes/CurrentUser');
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const User = require('./routes/User');
app.use("/api", User);

const CurrentUser = require('./routes/CurrentUser');
app.use("/api", CurrentUser);

const port = 5000;

app.listen(port, () => { console.log("Server started on port " + port) })

