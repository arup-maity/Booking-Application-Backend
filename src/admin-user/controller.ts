import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import bcrypt from "bcrypt";
import prisma from "../config/prisma";
import { userSchema } from "./SchemaValidation";

const adminUser = new Hono()

adminUser.post("create-user", zValidator('json', userSchema), async c => {
   try {
      const body = await c.req.json()
      // check email exists
      const email = await prisma.adminUser.findUnique({
         where: {
            email: body.email
         }
      })
      if (email) {
         return c.json({ success: false, message: "Email already exists" }, 400)
      }
      //
      const salt = bcrypt.genSaltSync(16);
      const hashPassword = bcrypt.hashSync(body.password, salt);
      // create admin user
      const adminUser = await prisma.adminUser.create({
         data: {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            role: body.role,
            AdminUserAuth: {
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
adminUser.put("/update-user", async c => {
   try {
      const body = await c.req.json()
      const adminUser = await prisma.adminUser.update({
         where: {
            id: body.id
         },
         data: {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email
         }
      })
      return c.json({ success: true, adminUser }, 200)
   } catch (error) {
      return c.json({ success: false, error: error }, 500)
   }
})
adminUser.delete("/delete-user/:id", async c => {
   try {
      const id = c.req.param("id")
      const adminUser = await prisma.adminUser.delete({
         where: {
            id: +id
         }
      })
      return c.json({ success: true, adminUser }, 200)
   } catch (error) {
      return c.json({ success: false, error: error }, 500)
   }
})
adminUser.get("all-users", async c => {
   try {
      const adminUsers = await prisma.adminUser.findMany()
      return c.json({ success: true, adminUsers }, 200)
   } catch (error) {
      return c.json({ success: false, error: error }, 500)
   }
})

export default adminUser