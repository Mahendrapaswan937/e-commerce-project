const express = require("express");
const Razorpay = require("razorpay");

const router = express.Router();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

router.post("/create-order", async (req, res) => {

    try {

        const options = {
            amount: req.body.amount * 100,
            currency: "INR",
            receipt: "receipt_" + Date.now()
        };

        const order = await razorpay.orders.create(options);

        res.json(order);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Payment Failed"
        });

    }

});

router.post("/verify-payment", async (req, res) => {

    try {

        const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature
        } = req.body;

        res.json({

            success: true,

            message: "Payment Verified",

            paymentId: razorpay_payment_id,

            orderId: razorpay_order_id

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: "Verification Failed"

        });

    }

});

module.exports = router;