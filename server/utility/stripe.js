const express = require('express');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_API_SECRET);
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log("GET Response from Researcher");
    res.json({
        message: 'It Works'
    });
});

router.post("/pay", (req, res, next) => {
    console.log(req.body.token);
    const {token, amount} = req.body;
    const idempotencyKey = uuidv4();

    return stripe.customers.create({
        email: token.email,
        source: token
    }).then(customer => {
        stripe.charges.create({
            amount: amount * 100,
            currency: 'eur',
            customer: customer.id,
            receipt_email: token.email
        }, {idempotencyKey})
    }).then(result => {
        res.status(200).json(result)
    }).catch(err => {
        console.log(err);
    });
});

module.exports = router;
