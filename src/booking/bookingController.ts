import { Hono } from "hono";
import prisma from "../config/prisma";
import { createSecret } from "@/checkout/stripe";
import { userAuthentication } from "@/middleware";

const userBooking = new Hono()

userBooking.post("/create-booking", userAuthentication, async c => {
   try {
      const body = await c.req.json()
      // console.log('body ===========>', body)
      const user = c.user
      const booking = await prisma.bookingProcess.create({
         data: {
            userId: +user.id,
            flightId: body.flightDetails.id,
            passengers: body.passengers,
            status: 'pending',
            // seatNumber: body.seatNumber,
            totalCost: body.flightPrice.total,
            PaymentsProcess: {
               create: {
                  status: 'pending',
               }
            }
         }
      })
      if (!booking) return c.json({ success: false, message: 'Booking not created' }, 409)
      const secret = await createSecret(body.flightPrice.total, 'inr', booking.id, '', '')
      if (!secret) return c.json({ success: false, message: 'not create payment intent' }, 409)
      const update = await prisma.bookingProcess.update({
         where: {
            id: booking.id
         },
         data: {
            PaymentsProcess: {
               update: {
                  clientSecret: secret
               }
            }
         }
      })
      if (!update) return c.json({ success: false, message: 'Booking not created' }, 409)
      return c.json({ success: true, booking: update }, 200)
   } catch (error) {
      console.log(error)
      return c.json({ success: false, error }, 500)
   }
})
userBooking.get("/booking-checkout/:id", async c => {
   try {
      const id = c.req.param("id")
      const booking = await prisma.BookingProcess.findUnique({
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
            PaymentsProcess: true
         }
      })
      return c.json({ success: true, booking }, 200)
   } catch (error) {
      return c.json({ success: false, error }, 500)
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