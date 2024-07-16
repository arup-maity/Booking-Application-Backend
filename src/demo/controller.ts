import { Hono } from "hono";
import prisma from "../config/prisma";
import city from "@/city/controller";

const demo = new Hono()

const india = [
   {
      cityName: 'Mumbai',
      countryName: 'India',
      countryCode: 'IN',
      airportName: 'Chhatrapati Shivaji Maharaj International Airport',
      iataCode: 'BOM'
   },
   {
      cityName: 'Delhi',
      countryName: 'India',
      countryCode: 'IN',
      airportName: 'Indira Gandhi International Airport',
      iataCode: 'DEL'
   },
   {
      cityName: 'Bengaluru',
      countryName: 'India',
      countryCode: 'IN',
      airportName: 'Kempegowda International Airport',
      iataCode: 'BLR'
   },
   {
      cityName: 'Chennai',
      countryName: 'India',
      countryCode: 'IN',
      airportName: 'Chennai International Airport',
      iataCode: 'MAA'
   },
   {
      cityName: 'Kolkata',
      countryName: 'India',
      countryCode: 'IN',
      airportName: 'Netaji Subhas Chandra Bose International Airport',
      iataCode: 'CCU'
   },
   {
      cityName: 'Hyderabad',
      countryName: 'India',
      countryCode: 'IN',
      airportName: 'Rajiv Gandhi International Airport',
      iataCode: 'HYD'
   },
   {
      cityName: 'Ahmedabad',
      countryName: 'India',
      countryCode: 'IN',
      airportName: 'Sardar Vallabhbhai Patel International Airport',
      iataCode: 'AMD'
   },
   {
      cityName: 'Pune',
      countryName: 'India',
      countryCode: 'IN',
      airportName: 'Pune Airport',
      iataCode: 'PNQ'
   },
   {
      cityName: 'Kochi',
      countryName: 'India',
      countryCode: 'IN',
      airportName: 'Cochin International Airport',
      iataCode: 'COK'
   },
   {
      cityName: 'Goa',
      countryName: 'India',
      countryCode: 'IN',
      airportName: 'Goa International Airport',
      iataCode: 'GOI'
   }
]
const japan = [
   {
      cityName: 'Tokyo',
      countryName: 'Japan',
      countryCode: 'JP',
      airportName: 'Narita International Airport',
      iataCode: 'NRT'
   },
   {
      cityName: 'Tokyo',
      countryName: 'Japan',
      countryCode: 'JP',
      airportName: 'Haneda Airport',
      iataCode: 'HND'
   },
   {
      cityName: 'Osaka',
      countryName: 'Japan',
      countryCode: 'JP',
      airportName: 'Kansai International Airport',
      iataCode: 'KIX'
   },
   {
      cityName: 'Nagoya',
      countryName: 'Japan',
      countryCode: 'JP',
      airportName: 'Chubu Centrair International Airport',
      iataCode: 'NGO'
   },
   {
      cityName: 'Fukuoka',
      countryName: 'Japan',
      countryCode: 'JP',
      airportName: 'Fukuoka Airport',
      iataCode: 'FUK'
   },
   {
      cityName: 'Sapporo',
      countryName: 'Japan',
      countryCode: 'JP',
      airportName: 'New Chitose Airport',
      iataCode: 'CTS'
   },
   {
      cityName: 'Okinawa',
      countryName: 'Japan',
      countryCode: 'JP',
      airportName: 'Naha Airport',
      iataCode: 'OKA'
   },
   {
      cityName: 'Hiroshima',
      countryName: 'Japan',
      countryCode: 'JP',
      airportName: 'Hiroshima Airport',
      iataCode: 'HIJ'
   },
   {
      cityName: 'Sendai',
      countryName: 'Japan',
      countryCode: 'JP',
      airportName: 'Sendai Airport',
      iataCode: 'SDJ'
   },
   {
      cityName: 'Kagoshima',
      countryName: 'Japan',
      countryCode: 'JP',
      airportName: 'Kagoshima Airport',
      iataCode: 'KOJ'
   }
]
const china = [
   {
      cityName: 'Tokyo',
      countryName: 'Japan',
      countryCode: 'JP',
      airportName: 'Narita International Airport',
      iataCode: 'NRT'
   },
   {
      cityName: 'Tokyo',
      countryName: 'Japan',
      countryCode: 'JP',
      airportName: 'Haneda Airport',
      iataCode: 'HND'
   },
   {
      cityName: 'Osaka',
      countryName: 'Japan',
      countryCode: 'JP',
      airportName: 'Kansai International Airport',
      iataCode: 'KIX'
   },
   {
      cityName: 'Nagoya',
      countryName: 'Japan',
      countryCode: 'JP',
      airportName: 'Chubu Centrair International Airport',
      iataCode: 'NGO'
   },
   {
      cityName: 'Fukuoka',
      countryName: 'Japan',
      countryCode: 'JP',
      airportName: 'Fukuoka Airport',
      iataCode: 'FUK'
   },
   {
      cityName: 'Sapporo',
      countryName: 'Japan',
      countryCode: 'JP',
      airportName: 'New Chitose Airport',
      iataCode: 'CTS'
   },
   {
      cityName: 'Okinawa',
      countryName: 'Japan',
      countryCode: 'JP',
      airportName: 'Naha Airport',
      iataCode: 'OKA'
   },
   {
      cityName: 'Hiroshima',
      countryName: 'Japan',
      countryCode: 'JP',
      airportName: 'Hiroshima Airport',
      iataCode: 'HIJ'
   },
   {
      cityName: 'Sendai',
      countryName: 'Japan',
      countryCode: 'JP',
      airportName: 'Sendai Airport',
      iataCode: 'SDJ'
   },
   {
      cityName: 'Kagoshima',
      countryName: 'Japan',
      countryCode: 'JP',
      airportName: 'Kagoshima Airport',
      iataCode: 'KOJ'
   }
]




demo.post('/city', async c => {
   try {
      const cityList = [...india, ...japan, ...china]
      console.log(cityList.length)

      // cityList?.map(async (city) =>
      //    await prisma.cities.create({
      //       data: {
      //          cityName: city.cityName,
      //          countryName: city.countryName,
      //          countryCode: city.countryCode,
      //       }
      //    })
      // )
      for (const city of cityList) {
         const check = await prisma.cities.findUnique({
            where: {
               cityName_countryName: {
                  cityName: city.cityName,
                  countryName: city.countryName,
               }
            }
         })
         if (!check) {
            await prisma.cities.create({
               data: {
                  cityName: city.cityName,
                  countryName: city.countryName,
                  countryCode: city.countryCode,
               },
            });
         }
      }
      return c.json({ success: true, for: 'city' }, 200)
   } catch (error) {
      console.log(error)
      return c.json({ success: false, error }, 500)
   }
})
demo.post("/airport", async c => {
   try {
      const airportList = [...india, ...japan, ...china]

      // airportList?.map(async (airport) => {
      //    const cityId = await prisma.cities.findUnique({
      //       where: {
      //          cityName_countryName: {
      //             cityName: airport.cityName,
      //             countryName: airport.countryName,
      //          }
      //       }
      //    })
      //    if (cityId?.id) {
      //       await prisma.airports.create({
      //          data: {
      //             airportName: airport.airportName,
      //             iataCode: airport.iataCode,
      //             cityId: cityId.id
      //          }
      //       })
      //    } else {

      //    }
      // })
      for (const airport of airportList) {
         const check = await prisma.cities.findUnique({
            where: {
               cityName_countryName: {
                  cityName: airport.cityName,
                  countryName: airport.countryName,
               }
            }
         })
         if (check) {
            await prisma.airports.create({
               data: {
                  airportName: airport.airportName,
                  iataCode: airport.iataCode,
                  cityId: check.id
               }
            })
         }
      }

      return c.json({ success: true, for: 'airport' }, 200)
   } catch (error) {
      console.log(error)
      return c.json({ success: false, error }, 500)
   }
})
demo.post("/airplane", async c => {
   try {
      const airplaneModels = [
         { modelNumber: 'A320', manufacturer: 'Airbus', capacity: 150 },
         { modelNumber: 'B737', manufacturer: 'Boeing', capacity: 180 },
         { modelNumber: 'A380', manufacturer: 'Airbus', capacity: 550 },
         { modelNumber: 'B777', manufacturer: 'Boeing', capacity: 350 },
         { modelNumber: 'A350', manufacturer: 'Airbus', capacity: 300 },
         { modelNumber: 'B787', manufacturer: 'Boeing', capacity: 250 },
         { modelNumber: 'A330', manufacturer: 'Airbus', capacity: 250 },
         { modelNumber: 'B747', manufacturer: 'Boeing', capacity: 400 },
         { modelNumber: 'A220', manufacturer: 'Airbus', capacity: 100 },
         { modelNumber: 'B757', manufacturer: 'Boeing', capacity: 200 },
         { modelNumber: 'A340', manufacturer: 'Airbus', capacity: 380 },
         { modelNumber: 'B717', manufacturer: 'Boeing', capacity: 100 },
         { modelNumber: 'A310', manufacturer: 'Airbus', capacity: 200 },
         { modelNumber: 'B767', manufacturer: 'Boeing', capacity: 290 },
         { modelNumber: 'A321', manufacturer: 'Airbus', capacity: 200 },
         { modelNumber: 'B777X', manufacturer: 'Boeing', capacity: 425 },
         { modelNumber: 'A330neo', manufacturer: 'Airbus', capacity: 300 },
         { modelNumber: 'B737 MAX', manufacturer: 'Boeing', capacity: 230 },
         { modelNumber: 'A380plus', manufacturer: 'Airbus', capacity: 600 },
         { modelNumber: 'B777F', manufacturer: 'Boeing', capacity: 102 },
         { modelNumber: 'A350-900', manufacturer: 'Airbus', capacity: 325 },
         { modelNumber: 'B787-10', manufacturer: 'Boeing', capacity: 330 },
         { modelNumber: 'A321neo', manufacturer: 'Airbus', capacity: 240 },
         { modelNumber: 'B767-400ER', manufacturer: 'Boeing', capacity: 375 },
         { modelNumber: 'A330-200F', manufacturer: 'Airbus', capacity: 70 }
      ];

      airplaneModels?.map(async (airplane) =>
         await prisma.airplanes.create({
            data: {
               modelNumber: airplane.modelNumber,
               manufacturer: airplane.manufacturer,
               capacity: airplane.capacity,
            }
         })
      )
      return c.json({ success: true, done: 'city' }, 200)
   } catch (error) {
      console.log(error)
      return c.json({ success: false, error }, 500)
   }
})
export default demo