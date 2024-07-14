import { Hono } from "hono";
import prisma from "../config/prisma";

const adminFlight = new Hono()

adminFlight.post("create-flight", async c => {
   try {
      const body = await c.req.json()
      // check flight Number exists
      const flightNumber = await prisma.flights.findUnique({
         where: {
            flightNumber: body.flightNumber
         }
      })
      if (flightNumber) {
         return c.json({ success: false, message: "Flight Number already exists" }, 400)
      }
      // create flight
      const flight = await prisma.flights.create({
         data: {
            ...body
         }
      })
      return c.json({ success: true, flight }, 200)
   } catch (error) {
      console.log('error ==>', error)
      return c.json({ success: false, error }, 400)
   }
})
adminFlight.put("update-flight/:id", async c => {
   try {
      const id = c.req.param("id")
      const body = await c.req.json()
      const flight = await prisma.flights.update({
         where: {
            id: +id
         },
         data: {
            ...body
         }
      })
      return c.json({ success: true, flight }, 200)
   } catch (error) {
      return c.json({ success: false, error }, 400)
   }
})
adminFlight.get("read-flight/:id", async c => {
   try {
      const id = c.req.param("id")
      const flight = await prisma.flights.findUnique({
         where: {
            id: +id
         }
      })
      return c.json({ success: true, flight }, 200)
   } catch (error) {
      return c.json({ success: false, error }, 400)
   }
})
adminFlight.delete("delete-flight/:id", async c => {
   try {
      const id = c.req.param("id")
      const flight = await prisma.flights.delete({
         where: {
            id: +id
         }
      })
      return c.json({ success: true, flight }, 200)
   } catch (error) {
      return c.json({ success: false, error }, 400)
   }
})
adminFlight.post("/delete-flight/multiple", async c => {
   try {
      const body = await c.req.json()
      const flights = await prisma.flights.deleteMany({
         where: {
            id: { in: body.rows }
         }
      })
      return c.json({ success: true, flights }, 200)
   } catch (error) {
      return c.json({ success: false, error: error }, 500)
   }
})
adminFlight.get("all-flights", async c => {
   try {
      const { page = 1, limit = 25, search = '', column = 'createdAt', sortOrder = 'desc' } = c.req.query()
      const conditions: any = {}
      if (search) {
         conditions.flightNumber = {
            contains: search,
            mode: "insensitive"
         }
      }
      const query: any = {}
      if (column && sortOrder) {
         query.orderBy = { [column]: sortOrder }
      }
      const flights = await prisma.flights.findMany({
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
         },
         take: +limit,
         skip: (+page - 1) * +limit,
         ...query
      })
      const count = await prisma.flights.count({
         where: conditions
      })
      return c.json({ success: true, flights, count }, 200)
   } catch (error) {
      return c.json({ success: false, error }, 400)
   }
})
adminFlight.get("/search-flights", async c => {
   try {
      const query = c.req.query()
      console.log('query', query)
      const flights = await prisma.flights.findMany({
         where: {
            departureAirport: {
               iataCode: {
                  contains: query.from,
                  mode: "insensitive"
               }
            },
            arrivalAirport: {
               iataCode: {
                  contains: query.to,
                  mode: "insensitive"
               }
            },
            departureTime: {
               gte: new Date(query.departure)
            }
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
      return c.json({ success: true, flights }, 200)
   } catch (error) {
      return c.json({ success: false, error }, 500)
   }
})

export default adminFlight