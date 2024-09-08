import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import bcrypt from "bcrypt";
import prisma from "../../config/prisma";
import { userSchema } from "../../validation/SchemaValidation";

const adminUser = new Hono()

adminUser.post("/create-user", zValidator('json', userSchema), async c => {
   try {
      const body = await c.req.json()
      // check email exists
      const email = await prisma.adminUser.findUnique({
         where: {
            email: body.email
         }
      })
      if (email) {
         return c.json({ success: false, message: "Email already exists" }, 409)
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
            adminUserAuth: {
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
adminUser.post("/delete-users/multiple", async c => {
   try {
      const body = await c.req.json()
      const adminUsers = await prisma.adminUser.deleteMany({
         where: {
            id: { in: body.rows }
         }
      })
      return c.json({ success: true, adminUsers }, 200)
   } catch (error) {
      return c.json({ success: false, error: error }, 500)
   }
})
adminUser.get("/all-users", async c => {
   try {
      const { page = 1, limit = 25, search = '', role = '', column = 'createdAt', sortOrder = 'desc' } = c.req.query()
      const conditions: any = {}
      if (search) {
         conditions.OR = [
            { email: { contains: search, mode: "insensitive" } },
            { firstName: { contains: search, mode: "insensitive" } },
            { lastName: { contains: search, mode: "insensitive" } },
            // Add more columns for full-text search as needed
         ]
      }
      if (role && role !== 'all') {
         conditions.role = role;
      }
      const query: any = {}
      if (column && sortOrder) {
         query.orderBy = { [column]: sortOrder }
      }
      const users = await prisma.adminUser.findMany({
         where: conditions,
         take: +limit,
         skip: (+page - 1) * +limit,
         ...query
      })
      const count = await prisma.adminUser.count({
         where: conditions
      })
      return c.json({ success: true, users, count }, 200)
   } catch (error) {
      console.log('error', error)
      return c.json({ success: false, error: error }, 500)
   }
})
adminUser.put("/update-user-role", async c => {
   try {
      const body = await c.req.json()
      const adminUser = await prisma.adminUser.update({
         where: {
            id: body.id
         },
         data: {
            role: body.role
         }
      })
      return c.json({ success: true, adminUser }, 200)
   } catch (error) {
      return c.json({ success: false, error: error }, 500)
   }
})

export default adminUser