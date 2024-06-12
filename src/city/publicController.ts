import { Hono } from "hono";
import prisma from "../config/prisma";

const city = new Hono()

city.get("read-city/:id", async c => {
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
export default city