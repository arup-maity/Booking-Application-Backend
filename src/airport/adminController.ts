import { Hono } from "hono";
import prisma from "../config/prisma";
import { adminAuthentication } from "@/middleware";

const adminAirport = new Hono()

adminAirport.post("/create-airport", adminAuthentication, async c => {
   try {
      const body = await c.req.json()
      // check airport code
      const airportCode = await prisma.airports.findUnique({
         where: {
            iataCode: body.iataCode
         }
      })
      if (airportCode) {
         return c.json({ success: false, message: "Airport iata code already exist" }, 409)
      }
      // create airport
      const airport = await prisma.airports.create({
         data: {
            ...body
         }
      })
      return c.json({ success: true, airport }, 200)
   } catch (error) {
      return c.json({ success: false, error }, 500)
   }
})
adminAirport.put("/update-airport/:id", adminAuthentication, async c => {
   try {
      const id = c.req.param("id")
      const body = await c.req.json()
      const airport = await prisma.airports.update({
         where: {
            id: +id
         },
         data: {
            ...body
         }
      })
      return c.json({ success: true, airport }, 200)
   } catch (error) {
      return c.json({ success: false, error }, 500)
   }
})
adminAirport.get("/read-airport/:code", adminAuthentication, async c => {
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
adminAirport.delete("/delete-airport/:id", adminAuthentication, async c => {
   try {
      const id = c.req.param("id")
      const airport = await prisma.airports.delete({
         where: {
            id: +id
         }
      })
      return c.json({ success: true, airport }, 200)
   } catch (error) {
      return c.json({ success: false, error }, 500)
   }
})
adminAirport.get("/all-airports", adminAuthentication, async c => {
   try {
      const { page = 1, limit = 25, search = '', orderColumn = '', order = '' } = c.req.query()
      const conditions: any = {}
      if (search) {
         conditions.airportName = {
            contains: search,
            mode: "insensitive"
         }
      }
      const query: any = {}
      if (orderColumn && order) {
         query.orderBy = { [orderColumn]: order }
      }
      const airports = await prisma.airports.findMany({
         where: conditions,
         take: +limit,
         skip: (+page - 1) * +limit,
         ...query,
         include: {
            city: true
         }
      })
      const count = await prisma.airports.count({
         where: conditions
      })
      return c.json({ success: true, airports, count }, 200)
   } catch (error) {
      return c.json({ success: false, error }, 500)
   }
})
adminAirport.get("/search-airport", async c => {
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
export default adminAirport