"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const prisma_1 = __importDefault(require("../config/prisma"));
const stripe_1 = __importDefault(require("stripe"));
const razorpay_1 = __importDefault(require("razorpay"));
const crypto_1 = __importDefault(require("crypto"));
// 'sk_test_51KI5GSSERFuCCBscxmGoQZJCDW1k0FVKNexcDSSPJtLEtsyRlZabRX4H2zShAvXYavbkUWITlBBKjAO2i0SQzG8l00WsulcLrl'
const checkout = new hono_1.Hono();
const stripe = new stripe_1.default('sk_test_51KI5GSSERFuCCBscxmGoQZJCDW1k0FVKNexcDSSPJtLEtsyRlZabRX4H2zShAvXYavbkUWITlBBKjAO2i0SQzG8l00WsulcLrl');
var instance = new razorpay_1.default({
    key_id: 'rzp_test_HKFBF9zpDJZZnF',
    key_secret: 'Hbrw1M6flAMizIX8fSzjM31p',
});
checkout.post("client-secret", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const paymentIntent = await stripe.paymentIntents.create({
        //    amount: 500,
        //    currency: "usd",
        //    description: "This is for GFG Stripe API Demo",
        //    automatic_payment_methods: {
        //       enabled: true,
        //    },
        // });
        const paymentIntent = yield stripe.paymentIntents.create({
            description: 'description',
            // shipping: {
            //    name: 'Jenny Rosen',
            //    address: {
            //       line1: '510 Townsend St',
            //       postal_code: '98140',
            //       city: 'San Francisco',
            //       state: 'CA',
            //       country: 'US',
            //    },
            // },
            amount: 1099,
            currency: 'inr',
            payment_method_types: ['card'],
            metadata: {
                bookingId: '6735',
                email: 'jenny@stripe.com',
                name: 'stripe'
            }
        });
        return c.json({ success: true, clientSecret: paymentIntent.client_secret, paymentIntent }, 200);
    }
    catch (error) {
        console.log(error);
        return c.json({ success: false, error }, 500);
    }
}));
checkout.get("/success/:token", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = c.req.param('token');
        const intent = yield stripe.paymentIntents.retrieve(token);
        return c.json({ success: true, intent }, 200);
    }
    catch (error) {
        return c.json({ success: false, error }, 500);
    }
}));
checkout.post("razorpay-client-secret", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var options = {
            amount: 50000, // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
        };
        instance.orders.create(options, function (err, order) {
            return c.json({ success: false, order }, 200);
        });
    }
    catch (error) {
        return c.json({ success: false, error }, 500);
    }
}));
checkout.post("/callback", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = yield c.req.json();
        if (razorpay_signature) {
            const body = razorpay_order_id + '|' + razorpay_payment_id;
            const generated_signature = crypto_1.default.createHmac('sha256', "Hbrw1M6flAMizIX8fSzjM31p").update(body.toString()).digest("hex");
            if (generated_signature === razorpay_signature) {
                return c.redirect(`http://localhost:3001/?${razorpay_order_id}`);
            }
        }
    }
    catch (error) {
        return c.json({ success: false, error }, 500);
    }
}));
checkout.put('/update-payment-status/:id', (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = c.req.param("id");
        const booking = yield prisma_1.default.bookings.update({
            where: {
                id: +id
            },
            data: {
                status: 'complete',
                payments: {
                    update: {
                        clientSecret: '',
                        status: 'succeeded'
                    }
                }
            },
            include: {
                payments: true
            }
        });
        return c.json({ success: true, booking }, 200);
    }
    catch (error) {
        return c.json({ success: false, error }, 500);
    }
}));
exports.default = checkout;
