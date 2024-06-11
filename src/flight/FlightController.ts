import { Hono } from "hono";
import prisma from "../config/prisma";

const flightController = new Hono()


flightController.get("flight-details/:id", async c => {
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
      return c.json({ success: false, error }, 400)
   }
})





export default flightController