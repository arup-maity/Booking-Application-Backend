import { Hono } from "hono";
import prisma from "../config/prisma";

const publicAirport = new Hono()

publicAirport.get("search-airport", async c => {
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

export default publicAirport