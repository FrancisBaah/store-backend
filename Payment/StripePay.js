const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handleStipe = asyncHandler(async (req, res) => {
  const { amount, currency, payment_method_id } = req.body;

  try {
    // Create PaymentIntent with payment_method_types and amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ["card"],
      payment_method: payment_method_id,
      confirm: true,
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: "Failed to create payment intent" });
  }
});

module.exports = handleStipe;
