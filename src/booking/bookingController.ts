import { Hono } from "hono";
import prisma from "../config/prisma";
import { createSecret } from "@/checkout/stripe";

const userBooking = new Hono()

userBooking.post("/create-booking", async c => {
   try {
      const body = await c.req.json()
      // console.log('body', body)
      const userId = 1
      const booking = await prisma.bookings.create({
         data: {
            userId: userId,
            flightId: body.flightDetails.id,
            passengers: body.passengers,
            status: 'pending',
            // seatNumber: body.seatNumber,
            totalCost: body.flightPrice.total,
            payments: {
               create: {
                  status: 'pending',
               }
            }
         }
      })

      if (!booking) return c.json({ success: false, message: 'Booking not created' })
      const secret = await createSecret(body.flightPrice.total, 'inr', booking.id, '', '')
      if (!secret) return c.json({ success: false, message: 'not create payment intent' })
      const update = await prisma.bookings.update({
         where: {
            id: booking.id
         },
         data: {
            payments: {
               update: {
                  clientSecret: secret
               }
            }
         }
      })
      if (!update) return c.json({ success: false, message: 'Booking not created' })
      return c.json({ success: true, booking }, 200)
   } catch (error) {
      console.log(error)
   }
})
userBooking.get("/read-booking/:id", async c => {
   try {
      const id = c.req.param("id")
      const booking = await prisma.bookings.findUnique({
         where: {
            id: +id
         },
         include: {
            flight: {
               include: {
                  departureAirport: {
                     include: {
                        city: true
                     }
                  },
                  arrivalAirport: {
                     include: {
                        city: true
                     }
                  },
                  airplane: true
               }
            },
            user: true,
            payments: true
         }
      })
      return c.json({ success: true, booking }, 200)
   } catch (error) {
      return c.json({ success: false, error }, 500)
   }
})

userBooking.get("/success-booking/:id", async c => {
   try {
      const id = c.req.param("id")
      const booking = await prisma.bookings.findUnique({
         where: {
            id: +id
         },
         include: {
            flight: {
               include: {
                  departureAirport: {
                     include: {
                        city: true
                     }
                  },
                  arrivalAirport: {
                     include: {
                        city: true
                     }
                  },
                  airplane: true
               }
            },
            user: true,
            payments: true
         }
      })
      return c.json({ success: true, booking }, 200)
   } catch (error) {
      return c.json({ success: false, error }, 500)
   }
})

export default userBooking