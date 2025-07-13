import { Hono } from "hono";
import { adminAuthentication } from "@/middleware";
import prisma from "@/config/prisma";
import { zValidator } from '@hono/zod-validator'
import { createCityValidation, deleteCityValidation, readCityValidation, updateCityValidation } from "@/validation/city-validation";

const adminCityRouter = new Hono()

adminCityRouter.post('/create-city', zValidator('json', createCityValidation), adminAuthentication, async c => {
   try {
      const body = await c.req.json()
      // check cityCode exists
      const cityName = await prisma.cities.findUnique({
         where: {
            cityName_countryName: {
               cityName: body.cityName,
               countryName: body.countryName
            }
         }
      })
      if (cityName) return c.json({ success: false, message: 'City Name already exists on this country' }, 409)
      // create city
      const city = await prisma.cities.create({
         data: { ...body }
      })
      return c.json({ success: true, city }, 200)
   } catch (error) {
      console.log(error)
      return c.json({ success: false, error }, 500)
   }
})
adminCityRouter.put("/update-city/:id", zValidator('json', updateCityValidation), adminAuthentication, async c => {
   try {
      const id = c.req.param("id")
      const body = await c.req.json()
      const city = await prisma.cities.update({
         where: { id: +id },
         data: {
            ...body
         }
      })
      return c.json({ success: true, city }, 200)
   } catch (error) {
      return c.json({ success: false, error }, 500)
   }
})
adminCityRouter.get("/read-city/:id", zValidator('param', readCityValidation), adminAuthentication, async c => {
   try {
      const id = c.req.param("id")
      const city = await prisma.cities.findUnique({
         where: { id: +id },
         include: {
            airports: true
         }
      })
      return c.json({ success: true, city }, 200)
   } catch (error) {
      return c.json({ success: false, error }, 500)
   }
})
adminCityRouter.delete("/delete-city/:id", zValidator('param', deleteCityValidation), adminAuthentication, async c => {
   try {
      const id = c.req.param("id")
      const city = await prisma.cities.delete({
         where: {
            id: +id
         }
      })
      return c.json({ success: true, city }, 200)
   } catch (error) {
      return c.json({ success: false, error }, 500)
   }
})
adminCityRouter.post("/delete-cities/multiple", adminAuthentication, async c => {
   try {
      const body = await c.req.json()
      const cities = await prisma.cities.deleteMany({
         where: {
            id: { in: body.rows }
         }
      })
      return c.json({ success: true, cities }, 200)
   } catch (error) {
      return c.json({ success: false, error: error }, 500)
   }
})
adminCityRouter.get("/all-cities", adminAuthentication, async c => {
   try {
      const { page = 1, limit = 25, search = '', column = 'createdAt', sortOrder = 'desc' } = c.req.query()
      const conditions: any = {}
      if (search) {
         conditions.cityName = {
            contains: search,
            mode: "insensitive"
         }
      }
      const query: any = {}
      if (column && sortOrder) {
         query.orderBy = { [column]: sortOrder }
      }
      const cities = await prisma.cities.findMany({
         where: conditions,
         include: {
            airports: true
         },
         take: +limit,
         skip: (+page - 1) * +limit,
         ...query
      })
      const count = await prisma.cities.count({
         where: conditions
      })
      return c.json({ success: true, cities, count }, 200)
   } catch (error) {
      return c.json({ success: false, error }, 500)
   }
})
adminCityRouter.get("/total-city-services", adminAuthentication, async c => {
   try {
      const totalCity = await prisma.cities.count()
      return c.json({ success: true, totalCity }, 200)
   } catch (error) {
      return c.json({ success: false, error }, 500)
   }
})
export default adminCityRouter