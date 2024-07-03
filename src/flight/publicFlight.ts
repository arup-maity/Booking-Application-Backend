import { Hono } from "hono";
import prisma from "../config/prisma";

const publicFlight = new Hono()

publicFlight.get("/flight-details/:id", async c => {
   try {
      const id = c.req.param("id")
      const flight = await prisma.flights.findUnique({
         where: {
            id: +id
         },
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
      })
      return c.json({ success: true, flight }, 200)
   } catch (error) {
      return c.json({ success: false, data: error }, 500)
   }
})

export default publicFlight