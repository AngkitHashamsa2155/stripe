const express = require("express");
const app = express();
const cors = require("cors");
// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51KYoYcCBIFjPKXgZecIHrlAvjDVyQgCKRnmNogJg6L6tp3qZBXaDj9I84r85Cv72Xkd7QlcJicXPJrWLF2PbSGqC00sUip0PfE"
);
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.send("Stripe");
});

app.post("/create-payment-intent", async (req, res) => {
  const { total_amount, shipping_fee } = req.body;
  console.log(req.body);
  const calculateOrderAmount = () => {
    return shipping_fee + total_amount;
  };

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: "usd",
  });

  res.json({ clientSecret: paymentIntent.client_secret });
});

app.listen(8000, () => console.log("Node server listening on port 8000!"));
