import { Hono } from "hono";
import prisma from "../config/prisma";
import Stripe from "stripe";
import Razorpay from "razorpay";
import crypto from "crypto";
// 'sk_test_51KI5GSSERFuCCBscxmGoQZJCDW1k0FVKNexcDSSPJtLEtsyRlZabRX4H2zShAvXYavbkUWITlBBKjAO2i0SQzG8l00WsulcLrl'
const checkout = new Hono()
const stripe = new Stripe('sk_test_51KI5GSSERFuCCBscxmGoQZJCDW1k0FVKNexcDSSPJtLEtsyRlZabRX4H2zShAvXYavbkUWITlBBKjAO2i0SQzG8l00WsulcLrl')

var instance = new Razorpay({
   key_id: 'rzp_test_HKFBF9zpDJZZnF',
   key_secret: 'Hbrw1M6flAMizIX8fSzjM31p',
});


checkout.post("client-secret", async c => {
   try {
      // const paymentIntent = await stripe.paymentIntents.create({
      //    amount: 500,
      //    currency: "usd",
      //    description: "This is for GFG Stripe API Demo",
      //    automatic_payment_methods: {
      //       enabled: true,
      //    },
      // });
      const paymentIntent = await stripe.paymentIntents.create({
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


      return c.json({ success: true, clientSecret: paymentIntent.client_secret, paymentIntent }, 200)
   } catch (error) {
      console.log(error)
      return c.json({ success: false, error }, 500)
   }
})
checkout.get("/success/:token", async c => {
   try {
      const token = c.req.param('token')
      const intent = await stripe.paymentIntents.retrieve(token);
      return c.json({ success: true, intent }, 200)
   } catch (error) {
      return c.json({ success: false, error }, 500)
   }
})

checkout.post("razorpay-client-secret", async c => {
   try {
      var options = {
         amount: 50000,  // amount in the smallest currency unit
         currency: "INR",
         receipt: "order_rcptid_11"
      };
      instance.orders.create(options, function (err, order) {
         return c.json({ success: false, order }, 200)
      });
   } catch (error) {
      return c.json({ success: false, error }, 500)
   }
})

checkout.post("/callback", async c => {
   try {
      const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = await c.req.json();
      if (razorpay_signature) {

         const body = razorpay_order_id + '|' + razorpay_payment_id;

         const generated_signature = crypto.createHmac('sha256', "Hbrw1M6flAMizIX8fSzjM31p").update(body.toString()).digest("hex");

         if (generated_signature === razorpay_signature) {
            return c.redirect(`http://localhost:3001/?${razorpay_order_id}`)
         }
      }
   } catch (error) {
      return c.json({ success: false, error }, 500)
   }
})

checkout.put('/update-payment-status/:id', async c => {
   try {
      const id = c.req.param("id")
      //
      const bookingDetails = await prisma.bookingProcess.findUnique({
         where: {
            id: +id
         },
         include: {
            PaymentsProcess: true
         }
      })
      const booking = await prisma.bookings.create({
         data: {
            userId: +bookingDetails?.userId,
            flightId: bookingDetails.flightId,
            passengers: bookingDetails.passengers,
            status: 'complete',
            // seatNumber: body.seatNumber,
            totalCost: bookingDetails.totalCost,
            payments: {
               create: {
                  clientSecret: bookingDetails?.PaymentsProcess?.clientSecret,
                  status: 'succeeded',
               }
            }
         }
      })
      if (!booking) return c.json({ success: false, message: 'Error creating booking' }, 409)
      await prisma.bookingProcess.delete({
         where: { id: +id }
      })
      return c.json({ success: true, booking }, 200)
   } catch (error) {
      console.log(error)
      return c.json({ success: false, error }, 500)
   }
})

export default checkout