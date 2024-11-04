import { Hono } from "hono";
import prisma from "../../config/prisma";

const publicAirport = new Hono()

publicAirport.get("/search-airport", async c => {
   try {
      const search = c.req.query('search')
      const airport = await prisma.airports.findMany({
         where: {
            OR: [
               {
                  iataCode: { contains: search, mode: "insensitive" }
               },
               {
                  city: {
                     cityName: { contains: search, mode: "insensitive" }
                  }
               },
            ]
         },
         include: {
            city: true
         }
      })
      return c.json({ success: true, airport }, 200)
   } catch (error) {
      return c.json({ success: false, error }, 500)
   }
})
publicAirport.get("/read-airport/:code", async c => {
   try {
      const code = c.req.param("code")
      const airport = await prisma.airports.findUnique({
         where: {
            iataCode: code
         },
         include: {
            city: true
         }
      })
      if (!airport) return c.json({ success: false, message: 'Not found airport' }, 409)
      return c.json({ success: true, airport }, 200)
   } catch (error) {
      return c.json({ success: false, error }, 500)
   }
})
publicAirport.get("/suggested-departure-airports", async c => {
   try {
      const airports = await prisma.flights.findMany({
         // where: {
         //    departureTime: { gte: new Date() }
         // },
         take: 5,
         include: {
            departureAirport: {
               include: {
                  city: true
               }
            }
         }
      })
      return c.json({ success: true, airports }, 200)
   } catch (error) {
      console.log(error)
      return c.json({ success: false, error }, 500)
   }
})
publicAirport.get("/suggested-arrival-airports", async c => {
   try {
      const airports = await prisma.flights.findMany({
         // where: {
         //    departureTime: { gte: new Date() }
         // },
         take: 5,
         include: {
            arrivalAirport: {
               include: {
                  city: true
               }
            }
         }
      })
      return c.json({ success: true, airports }, 200)
   } catch (error) {
      console.log(error)
      return c.json({ success: false, error }, 500)
   }
})



export default publicAirport