/**
 * Import function triggers from their respective submodules:
 *
 * const { onCall } = require("firebase-functions/v2/https");
 * const { onDocumentWritten } = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const stripe = require("stripe")(`sk_test_51Pnbu0P5oy2mnKJKrIP8CpeKOSt49PFh12grS3HF9p4KkQ33jUns9MTdz35vWuNHL6NA8FC7mh1VA3Fhy0DddrQl002zPXlrDE`);
// `sk_test_51Pnbu0P5oy2mnKJKrIP8CpeKOSt49PFh
//  12grS3HF9p4KkQ33jUns9MTdz35vWuNHL6NA8FC7mh1VA3Fhy0DddrQl002zPXlrDE`
// App configuration
const app = express();

// Middlewares
app.use(cors({
  origin: true,
}));
app.use(express.json());

// API routes
app.get("/", (request, response) => (
  response.status(200).send("hello aalok world")));
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Received Boom!!! for this amount >>>", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "USD",
  });

  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Listen command
exports.api = functions.https.onRequest(app);

// (http://127.0.0.1:5001/clone-c5424/us-central1/api)


// /**
//  * Import function triggers from their respective submodules:
//  *
//  * const {onCall} = require("firebase-functions/v2/https");
//  * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
//  *
//  * See a full list of supported triggers at https://firebase.google.com/docs/functions
//  */

// const functions = require("firebase-functions");
// const express = require('express');
// const cors = require('cors');

// const stripe = require('stripe')('sk_test_51Pnbu0P
//  5oy2mnKJKrIP8CpeKOSt49PFh12grS3HF9p4KkQ33jUns9MTdz35v
//  WuNHL6NA8FC7mh1VA3Fhy0DddrQl002zPXlrDE')


// //app_config
// const app = express();


// //Middlewares
// app.use(cors({ origin: true }));
// app.use(express.json());


// //API_routes
// app.get('/', (request, response) => response.status(200)
//  .send('hello aalok wrld'))
// app.post('/payments/create', async (request, response) => {
//     const total = request.query.total;

//     console.log('Payment Request Recieved Boom!!!  for this
// amount >>>', total);

//     const paymentIntent = await stripe.paymentIntents.create({
//         amount: total,
//         currency: "USD",
//     })

//     response.status(201).send({
//         clientSecret: paymentIntent.client_secret,
//     })

// })
// //Listen_command

// exports.api = functions.https.onRequest(app)

// // (http://127.0.0.1:5001/clone-c5424/us-central1/api)

