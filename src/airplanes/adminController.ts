import { Hono } from "hono";
import prisma from "../config/prisma";
import { adminAuthentication } from "@/middleware";

const adminAirplane = new Hono()

adminAirplane.post("create-airplane", adminAuthentication, async c => {
   try {
      const body = await c.req.json()
      // check airplanes modelNumber exists
      const airplaneModel = await prisma.airplanes.findFirst({
         where: {
            modelNumber: body.modelNumber
         }
      })
      if (airplaneModel) return c.json({ success: false, message: "Airplane already exists" }, 409)
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
adminAirplane.put("update-airplane/:id", adminAuthentication, async c => {
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
adminAirplane.get("read-airplane/:id", adminAuthentication, async c => {
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
adminAirplane.delete("delete-airplane/:id", adminAuthentication, async c => {
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
adminAirplane.get("all-airplanes", adminAuthentication, async c => {
   try {
      const airplanes = await prisma.airplanes.findMany()
      return c.json({ success: true, airplanes }, 200)
   } catch (error) {
      return c.json({ success: false, error }, 500)
   }
})

export default adminAirplane