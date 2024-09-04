import { Hono } from "hono";
import prisma from "../config/prisma";
import { userAuthentication } from "@/middleware";

const adminBooking = new Hono()

adminBooking.get("/all-bookings", async c => {
   try {
      const { page = 1, limit = 25, search = '', column = 'createdAt', sortOrder = 'desc' } = c.req.query()
      const conditions: any = {}
      const query: any = {}
      if (column && sortOrder) {
         query.orderBy = { [column]: sortOrder }
      }
      const bookings = await prisma.bookings.findMany({
         where: conditions,
         include: {
            flight: true
         },
         take: +limit,
         skip: (+page - 1) * +limit,
         ...query
      })
      return c.json({ success: true, bookings }, 200)
   } catch (error) {
      console.error(error)
      return c.json({ success: false, error }, 500)
   }
})
adminBooking.get("/status-count", async c => {
   try {
      const count = await prisma.bookings.groupBy({
         by: ['status'],
         _count: {
            _all: true,  // Or specify the field you want to count
         },
      })
      return c.json({ success: true, count }, 200)
   } catch (error) {
      return c.json({ success: false, error }, 500)
   }
})

export default adminBooking