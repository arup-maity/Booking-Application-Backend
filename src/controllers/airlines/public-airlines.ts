import { Hono } from "hono";
import { adminAuthentication } from "@/middleware";
import prisma from "@/config/prisma";

const adminAirplane = new Hono()

adminAirplane.get("all-airplanes", adminAuthentication, async c => {
   try {
      const { page = 1, limit = 25, search = '', column = 'createdAt', sortOrder = 'desc' } = c.req.query()
      const conditions: any = {}
      if (search) {
         conditions.OR = [
            { modelNumber: { contains: search, mode: "insensitive" } },
            { manufacturer: { contains: search, mode: "insensitive" } },
         ]
      }
      const query: any = {}
      if (column && sortOrder) {
         // query.orderBy = { [column]: sortOrder }
      }
      const airplanes = await prisma.airplanes.findMany({
         where: conditions,
         take: +limit,
         skip: (+page - 1) * +limit,
         ...query,
      })
      const count = await prisma.airplanes.count({
         where: conditions
      })
      return c.json({ success: true, airplanes, count }, 200)
   } catch (error) {
      return c.json({ success: false, error }, 500)
   }
})

export default adminAirplane