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
publicAirport.get("/airport-details", async c => {
   try {
      const query = c.req.query()
      console.log(query)
      const formAirport = await prisma.airports.findUnique({
         where: {
            iataCode: query?.fromAirport
         },
         include: {
            city: true
         }
      })
      const toAirport = await prisma.airports.findUnique({
         where: {
            iataCode: query?.toAirport
         },
         include: {
            city: true
         }
      })
      if (!formAirport || !toAirport) return c.json({ success: false, message: 'Not found airport' }, 409)
      return c.json({ success: true, formAirport, toAirport }, 200)
   } catch (error) {
      console.log(error)
      return c.json({ success: false, error }, 500)
   }
})
publicAirport.get("/suggested-departure-airports", async c => {
   try {
      const today = new Date();
      const threeMonthsFromNow = new Date(today);
      threeMonthsFromNow.setMonth(today.getMonth() + 3);

      const airports = await prisma.flights.findMany({
         where: {
            // departureScheduled: {
            //    gte: today,
            //    lte: threeMonthsFromNow,
            // },
            departureAirport: {
               city: {
                  countryCode: "IN"
               }
            }
         },
         take: 10,
         select: {
            departureAirport: {
               select: {
                  airportName: true,
                  iataCode: true,
                  city: {
                     select: {
                        cityName: true
                     }
                  }
               }
            }
         },
         distinct: ['departureAirportId'],
      })

      return c.json({ success: true, airports }, 200)
   } catch (error) {
      console.log(error)
      return c.json({ success: false, error }, 500)
   }
})
publicAirport.get("/suggested-arrival-airports", async c => {
   try {
      const today = new Date();
      const threeMonthsFromNow = new Date(today);
      threeMonthsFromNow.setMonth(today.getMonth() + 3);

      const airports = await prisma.flights.findMany({
         where: {
            // arrivalScheduled: {
            //    gte: today,
            //    lte: threeMonthsFromNow,
            // },
            arrivalAirport: {
               city: {
                  countryCode: "IN"
               }
            }
         },
         take: 10,
         select: {
            arrivalAirport: {
               select: {
                  airportName: true,
                  iataCode: true,
                  city: {
                     select: {
                        cityName: true
                     }
                  }
               }
            }
         },
         distinct: ['arrivalAirportId'],
      })
      return c.json({ success: true, airports }, 200)
   } catch (error) {
      console.log(error)
      return c.json({ success: false, error }, 500)
   }
})


export default publicAirport