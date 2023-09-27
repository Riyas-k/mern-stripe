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

app.post("/payment", async (req, res) => {
  let status, error;
  const { token, amount } = req.body;
  try {
    await Stripe.charges.create( {
      source: token.id,
      amount,
      currency: "usd",
    });
    status = 'success'
  } catch (err) {
    error = 'failed'
    console.log(err);
  }
  res.json({error,status})
});
