import { Hono } from "hono";
import prisma from "../config/prisma";

const city = new Hono()

city.post('/admin/city/create-city', async c => {
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
city.put("/admin/city/update-city/:id", async c => {
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
city.get("/admin/city/read-city/:id", async c => {
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
city.get("/city/read-city/:id", async c => {
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
city.delete("/admin/city/delete-city/:id", async c => {
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
city.get("/admin/city/all-cities", async c => {
   try {
      const { page = 1, limit = 25, search = '', orderColumn = '', order = '' } = c.req.query()
      const conditions: any = {}
      if (search) {
         conditions.cityName = {
            contains: search,
            mode: "insensitive"
         }
      }
      const query: any = {}
      if (orderColumn && order) {
         query.orderBy = { [orderColumn]: order }
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
export default city