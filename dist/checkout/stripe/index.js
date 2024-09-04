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
exports.createSecret = void 0;
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default('sk_test_51KI5GSSERFuCCBscxmGoQZJCDW1k0FVKNexcDSSPJtLEtsyRlZabRX4H2zShAvXYavbkUWITlBBKjAO2i0SQzG8l00WsulcLrl');
function createSecret(amount_1) {
    return __awaiter(this, arguments, void 0, function* (amount, currency = 'inr', bookingId, name, email) {
        const paymentIntent = yield stripe.paymentIntents.create({
            amount: 100,
            currency: currency,
            payment_method_types: ['card'],
            metadata: {
                name: name,
                email: email,
                bookingId: bookingId,
            }
        });
        // const session = await stripe.checkout.sessions.create({
        //    line_items: [
        //       {
        //          price_data: {
        //             currency: 'inr',
        //             product_data: {
        //                name: 'T-shirt',
        //             },
        //             unit_amount: 2000,
        //          },
        //          quantity: 1,
        //       },
        //    ],
        //    mode: 'payment',
        //    ui_mode: 'embedded',
        //    // The URL of your payment completion page
        //    return_url: 'http://localhost:3001/'
        // });
        // console.log('===>', session)
        return paymentIntent.client_secret;
    });
}
exports.createSecret = createSecret;
