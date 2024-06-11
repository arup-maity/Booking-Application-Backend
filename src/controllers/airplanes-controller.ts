import { Hono } from "hono";
import prisma from "../config/prisma";

const airplane = new Hono()

airplane.post("/demo-airplane", async c => {
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
airplane.post("create-airplane", async c => {
   try {
      const body = await c.req.json()
      // check airplanes modelNumber exists
      const airplaneModel = await prisma.airplanes.findFirst({
         where: {
            modelNumber: body.modelNumber
         }
      })
      if (airplaneModel) {
         return c.json({ success: false, message: "Airplane already exists" }, 400)
      }
      // create airplane
      const airplane = await prisma.airplanes.create({
         data: {
            ...body
         }
      })
      return c.json({ success: true, airplane }, 200)
   } catch (error) {
      return c.json({ success: false, error }, 500)
   }
})
airplane.put("update-airplane/:id", async c => {
   try {
      const id = c.req.param("id")
      const body = await c.req.json()
      const airplane = await prisma.airplanes.update({
         where: {
            id: +id
         },
         data: {
            ...body
         }
      })
      return c.json({ success: true, airplane }, 200)
   } catch (error) {
      return c.json({ success: false, error }, 500)
   }
})
airplane.get("read-airplane/:id", async c => {
   try {
      const id = c.req.param("id")
      const airplane = await prisma.airplanes.findUnique({
         where: {
            id: +id
         }
      })
      return c.json({ success: true, airplane }, 200)
   } catch (error) {
      return c.json({ success: false, error }, 500)
   }
})
airplane.delete("delete-airplane/:id", async c => {
   try {
      const id = c.req.param("id")
      const airplane = await prisma.airplanes.delete({
         where: {
            id: +id
         }
      })
      return c.json({ success: true, airplane }, 200)
   } catch (error) {
      return c.json({ success: false, error }, 500)
   }
})
airplane.get("all-airplanes", async c => {
   try {
      const airplanes = await prisma.airplanes.findMany()
      return c.json({ success: true, airplanes }, 200)
   } catch (error) {
      return c.json({ success: false, error }, 500)
   }
})

export default airplane