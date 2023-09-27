const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
// const path = require("path");
const Stripe = require("stripe")(process.env.SECRET_KEY);
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server started ${PORT}`);
});
