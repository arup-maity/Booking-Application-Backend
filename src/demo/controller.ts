import { Hono } from "hono";
import prisma from "../config/prisma";
import bcrypt from "bcrypt";
import { airplaneModels, airportList, cityList, indiaIdCombination, timeStamp } from "./data";

const demo = new Hono()

demo.post('/admin-user', async c => {
   try {
      const body = await c.req.json()
      // check email exists
      const email = await prisma.users.findUnique({
         where: {
            email: body.email
         }
      })
      if (email) return c.json({ success: false, message: "Email already exists" }, 409)
      //
      const salt = bcrypt.genSaltSync(16);
      const hashPassword = bcrypt.hashSync(body.password, salt);
      // create admin user
      const adminUser = await prisma.users.create({
         data: {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            role: body.role,
            userAuth: {
               create: { password: hashPassword, method: 'password' }
            }
         }
      })
      return c.json({ success: true, adminUser }, 200)
   } catch (error) {
      console.log('Error creating admin user', error)
      return c.json({ success: false, error: error }, 500)
   }
})
demo.post('/city', async c => {
   try {
      const totalCity = cityList.length
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
      return c.json({ success: true, for: 'city', totalCity }, 200)
   } catch (error) {
      console.log(error)
      return c.json({ success: false, error }, 500)
   }
})
demo.post("/airport", async c => {
   try {
      const totalAirport = airportList.length
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
                  cityId: check.id,
                  latitude: airport.latitude,
                  longitude: airport.latitude
               }
            })
         }
      }

      return c.json({ success: true, for: 'airport', totalAirport }, 200)
   } catch (error) {
      console.log(error)
      return c.json({ success: false, error }, 500)
   }
})
demo.post("/airplane", async c => {
   try {

      const totalAirplane = airplaneModels.length

      airplaneModels?.map(async (airplane) =>
         await prisma.airplanes.create({
            data: {
               modelNumber: airplane.modelNumber,
               manufacturer: airplane.manufacturer,
               capacity: airplane.capacity,
            }
         })
      )
      return c.json({ success: true, done: 'airplane', totalAirplane }, 200)
   } catch (error) {
      console.log(error)
      return c.json({ success: false, error }, 500)
   }
})
demo.post("/flight", async c => {
   try {

      function generateRandomString(dId: number, aId: number) {
         // Generate 4 random uppercase letters
         const letters = Array.from({ length: 4 }, () =>
            String.fromCharCode(65 + Math.floor(Math.random() * 26)) // A-Z
         ).join('');

         // Generate 3 random digits
         const digits = Math.floor(100 + Math.random() * 900).toString(); // Ensures 3 digits

         return letters + '-' + digits + '-' + `${dId}${aId}`;
      }

      for (const time of timeStamp) {
         for (const airport of indiaIdCombination) {

            const flightNumber = generateRandomString(airport?.departureId, airport?.arrivalId);

            const airplaneArray = [3, 5, 13, 14, 17];
            const randomIndexOne = Math.floor(Math.random() * airplaneArray.length);
            const randomAirplaneId = airplaneArray[randomIndexOne];

            const priceArray = [3, 5, 13, 14, 17];
            const randomIndexTwo = Math.floor(Math.random() * priceArray.length);
            const randomPrice = priceArray[randomIndexTwo];

            const gateArray = ['gate 01', 'gate 02', 'gate 03', 'gate 04', 'gate 05', 'gate 06', 'gate 07', 'gate 08'];
            const randomIndexThree = Math.floor(Math.random() * gateArray.length);
            const randomGate = gateArray[randomIndexThree];

            await prisma.flights.create({
               data: {
                  flightNumber: flightNumber,
                  departureAirportId: airport?.departureId,
                  arrivalAirportId: airport?.arrivalId,
                  departureScheduled: time?.departureTime,
                  arrivalScheduled: time?.arrivalTime,
                  airplaneId: randomAirplaneId,
                  price: randomPrice,
                  boardingGate: randomGate
               }
            })

         }
      }



      return c.json({ success: true }, 200)
   } catch (error) {
      console.log(error)
      return c.json({ success: false, error }, 500)
   }
})
export default demo



// Mumbai to Delhi

// Mumbai to Bengaluru

// Mumbai to Chennai

// Mumbai to Kolkata

// Mumbai to Hyderabad

// Mumbai to Ahmedabad

// Mumbai to Pune

// Mumbai to Kochi

// Mumbai to Goa

// Delhi to Mumbai

// Delhi to Bengaluru

// Delhi to Chennai

// Delhi to Kolkata

// Delhi to Hyderabad

// Delhi to Ahmedabad

// Delhi to Pune

// Delhi to Kochi

// Delhi to Goa

// Bengaluru to Mumbai

// Bengaluru to Delhi

// Bengaluru to Chennai

// Bengaluru to Kolkata

// Bengaluru to Hyderabad

// Bengaluru to Ahmedabad

// Bengaluru to Pune

// Bengaluru to Kochi

// Bengaluru to Goa

// Chennai to Mumbai

// Chennai to Delhi

// Chennai to Bengaluru

// Chennai to Kolkata

// Chennai to Hyderabad

// Chennai to Ahmedabad

// Chennai to Pune

// Chennai to Kochi

// Chennai to Goa

// Kolkata to Mumbai

// Kolkata to Delhi

// Kolkata to Bengaluru

// Kolkata to Chennai

// Kolkata to Hyderabad

// Kolkata to Ahmedabad

// Kolkata to Pune

// Kolkata to Kochi

// Kolkata to Goa

// Hyderabad to Mumbai

// Hyderabad to Delhi

// Hyderabad to Bengaluru

// Hyderabad to Chennai

// Hyderabad to Kolkata

// Hyderabad to Ahmedabad

// Hyderabad to Pune

// Hyderabad to Kochi

// Hyderabad to Goa

// Ahmedabad to Mumbai

// Ahmedabad to Delhi

// Ahmedabad to Bengaluru

// Ahmedabad to Chennai

// Ahmedabad to Kolkata

// Ahmedabad to Hyderabad

// Ahmedabad to Pune

// Ahmedabad to Kochi

// Ahmedabad to Goa

// Pune to Mumbai

// Pune to Delhi

// Pune to Bengaluru

// Pune to Chennai

// Pune to Kolkata

// Pune to Hyderabad

// Pune to Ahmedabad

// Pune to Kochi

// Pune to Goa

// Kochi to Mumbai

// Kochi to Delhi

// Kochi to Bengaluru

// Kochi to Chennai

// Kochi to Kolkata

// Kochi to Hyderabad

// Kochi to Ahmedabad

// Kochi to Pune

// Kochi to Goa

// Goa to Mumbai

// Goa to Delhi

// Goa to Bengaluru

// Goa to Chennai

// Goa to Kolkata

// Goa to Hyderabad

// Goa to Ahmedabad

// Goa to Pune

// Goa to Kochi



// AI101

// AI102

// AI103

// AI104

// AI105

// AI106

// AI107

// AI108

// AI109

// AI110

// 6E201

// 6E202

// 6E203

// 6E204

// 6E205

// 6E206

// 6E207

// 6E208

// 6E209

// 6E210

// SG301

// SG302

// SG303

// SG304

// SG305

// SG306

// SG307

// SG308

// SG309

// SG310

// UK401

// UK402

// UK403

// UK404

// UK405

// UK406

// UK407

// UK408

// UK409

// UK410

// G8401

// G8402

// G8403

// G8404

// G8405

// G8406

// G8407

// G8408

// G8409

// G8410

// AI501

// AI502

// AI503

// AI504

// AI505

// AI506

// AI507

// AI508

// AI509

// AI510

// 6E601

// 6E602

// 6E603

// 6E604

// 6E605

// 6E606

// 6E607

// 6E608

// 6E609

// 6E610

// SG701

// SG702

// SG703

// SG704

// SG705

// SG706

// SG707

// SG708

// SG709

// SG710

// UK801

// UK802

// UK803

// UK804

// UK805

// UK806

// UK807

// UK808

// UK809

// UK810

// G8501

// G8502

// G8503

// G8504

// G8505

// G8506

// G8507

// G8508

// G8509

// G8510