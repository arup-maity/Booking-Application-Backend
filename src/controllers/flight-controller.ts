import { Hono } from "hono";
import prisma from "../config/prisma";

const flight = new Hono()

flight.post("create-flight", async c => {
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
flight.put("update-flight/:id", async c => {
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
flight.get("read-flight/:id", async c => {
   try {
      const id = c.req.param("id")
      const flight = await prisma.flight.findUnique({
         where: {
            id: +id
         }
      })
      return c.json({ success: true, flight }, 200)
   } catch (error) {
      return c.json({ success: false, error }, 400)
   }
})
flight.delete("delete-flight/:id", async c => {
   try {
      const id = c.req.param("id")
      const flight = await prisma.flight.delete({
         where: {
            id: +id
         }
      })
      return c.json({ success: true, flight }, 200)
   } catch (error) {
      return c.json({ success: false, error }, 400)
   }
})
flight.get("all-flights", async c => {
   try {
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
         }
      })
      return c.json({ success: true, flights }, 200)
   } catch (error) {
      return c.json({ success: false, error }, 400)
   }
})

flight.get("/search-flights", async c => {
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

export default flight

const flights = [
   { flightNumber: 'EK215', airline: 'Emirates', origin: 'Dubai', destination: 'Los Angeles' },
   { flightNumber: 'BA103', airline: 'British Airways', origin: 'London', destination: 'New York' },
   { flightNumber: 'DL123', airline: 'Delta Air Lines', origin: 'Atlanta', destination: 'Paris' },
   { flightNumber: 'SQ25', airline: 'Singapore Airlines', origin: 'Singapore', destination: 'Newark' },
   { flightNumber: 'LH455', airline: 'Lufthansa', origin: 'Frankfurt', destination: 'Boston' },
   { flightNumber: 'AF83', airline: 'Air France', origin: 'Paris', destination: 'Tokyo' },
   { flightNumber: 'QF12', airline: 'Qantas', origin: 'Sydney', destination: 'Los Angeles' },
   { flightNumber: 'UA1', airline: 'United Airlines', origin: 'San Francisco', destination: 'Singapore' },
   { flightNumber: 'TK1', airline: 'Turkish Airlines', origin: 'Istanbul', destination: 'New York' },
   { flightNumber: 'CX889', airline: 'Cathay Pacific', origin: 'Hong Kong', destination: 'London' },
   { flightNumber: 'VS23', airline: 'Virgin Atlantic', origin: 'London', destination: 'Newark' },
   { flightNumber: 'KL606', airline: 'KLM Royal Dutch Airlines', origin: 'Amsterdam', destination: 'New York' },
   { flightNumber: 'AI101', airline: 'Air India', origin: 'Delhi', destination: 'New York' },
   { flightNumber: 'JL6', airline: 'Japan Airlines', origin: 'Tokyo', destination: 'Los Angeles' },
   { flightNumber: 'EY183', airline: 'Etihad Airways', origin: 'Abu Dhabi', destination: 'London' },
   { flightNumber: 'NZ1', airline: 'Air New Zealand', origin: 'Auckland', destination: 'Los Angeles' },
   { flightNumber: 'CA985', airline: 'Air China', origin: 'Beijing', destination: 'Los Angeles' },
   { flightNumber: 'AS1', airline: 'Alaska Airlines', origin: 'Seattle', destination: 'Los Angeles' },
   { flightNumber: 'HA1', airline: 'Hawaiian Airlines', origin: 'Honolulu', destination: 'Tokyo' },
   { flightNumber: 'EK1', airline: 'Emirates', origin: 'Dubai', destination: 'New York' },
   { flightNumber: 'BA1', airline: 'British Airways', origin: 'London', destination: 'Singapore' },
   { flightNumber: 'DL1', airline: 'Delta Air Lines', origin: 'Atlanta', destination: 'Tokyo' },
   { flightNumber: 'SQ1', airline: 'Singapore Airlines', origin: 'Singapore', destination: 'San Francisco' },
   { flightNumber: 'LH1', airline: 'Lufthansa', origin: 'Frankfurt', destination: 'New York' },
   { flightNumber: 'AF1', airline: 'Air France', origin: 'Paris', destination: 'Los Angeles' },
   { flightNumber: 'QF1', airline: 'Qantas', origin: 'Sydney', destination: 'London' },
];
