const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");

// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51OlkjJJa8PGlyzmaRdnDgAbcXmJ4KqQRWoxKaELjxsaSYjJBdlhfiUk3M0dK7ayndq4VIKlRfxZQnMltlxAm3uVg000F470GKu"
);

const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());

const YOUR_DOMAIN = "http://localhost:3000";

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1PM20zJa8PGlyzmachvqlJAI",
        quantity: 1,
      },
    ],
    mode: "subscription",
    return_url: `${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
  });

  res.send({ clientSecret: session.client_secret });
});

app.get("/session-status", async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email,
  });
});

const transporter = nodemailer.createTransport({
  service: "Gmail", // Use your email service
  auth: {
    user: "your-email@gmail.com", // Your email address
    pass: "your-email-password", // Your email password or app password
  },
});

app.post("/api/send-email", (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: "your-email@gmail.com", // Your email address
    subject: `Contact Form Submission from ${name}`,
    text: `You have received a new message from your website contact form.\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Email sent successfully!");
  });
});

app.listen(4242, () => console.log("Running on port 4242"));
