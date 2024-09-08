import Stripe from "stripe";
const stripe = new Stripe('sk_test_51KI5GSSERFuCCBscxmGoQZJCDW1k0FVKNexcDSSPJtLEtsyRlZabRX4H2zShAvXYavbkUWITlBBKjAO2i0SQzG8l00WsulcLrl')

export async function createSecret(amount: number, currency: string = 'inr', bookingId: string | number, name: string, email: string) {
   const paymentIntent = await stripe.paymentIntents.create({
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
}