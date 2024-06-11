import { Hono } from "hono";
import { decode, sign, verify } from 'hono/jwt'
import { getCookie, setCookie, } from 'hono/cookie'
import { zValidator } from '@hono/zod-validator'
import bcrypt from "bcrypt";
import prisma from "../config/prisma";
import { loginSchema } from "./SchemaValidation";

const auth = new Hono()

auth.post("/admin/login", zValidator('json', loginSchema), async c => {
   try {
      const body = await c.req.json()
      const user: any = await prisma.adminUser.findFirst({
         where: {
            email: body.email
         },
         include: {
            AdminUserAuth: true
         }
      })
      if (!user) return c.json({ success: false, message: 'User not found' })
      const isPasswordValid = await bcrypt.compareSync(body.password, user?.AdminUserAuth.password)
      if (!isPasswordValid) return c.json({ success: false, message: 'Email and Password not match' })
      const payload = {
         id: user?.id,
         role: user?.role,
         accessPurpose: 'admin',
         purpose: 'login',
         exp: Math.floor(Date.now() / 1000) + 60 * 60, // Token expires in 5 minutes
      }
      const token = await sign(payload, process.env.JWT_SECRET as string)
      // Regular cookies
      setCookie(c, 'token', token, {
         path: '/',
         secure: true,
         httpOnly: true,
         sameSite: 'Strict',
      })
      return c.json({ success: true, login: true }, 200)
   } catch (error: any) {
      return c.json({ message: error.message }, 500)
   }
})
auth.get('check-login', async c => {
   try {
      const { authorization } = c.req.header();
      if (!authorization || !authorization.startsWith('Bearer ')) {
         return c.json({ login: false, message: 'token not found' }, 200)
      }
      const token = authorization.split(' ')[1];
      const tokenVerify = await verify(token, process.env.JWT_SECRET!)
      if (!tokenVerify) return c.json({ login: false, message: "token is not valid" }, 409)
      if (tokenVerify.purpose !== 'login') return c.json({ login: false, message: 'this token not for login purpose' }, 409)
      return c.json({ success: true, login: true, payload: tokenVerify }, 200)
   } catch (error: any) {
      return c.json({ login: false, error: error }, 500)
   }
})
auth.get('check-auth', async c => {
   try {
      // get token
      const token = getCookie(c, 'token')
      if (!token) return c.json({ success: false, message: 'Token not found' }, 409)
      // token vaerificate
      const tokenVerify = await verify(token, process.env.JWT_SECRET!)
      if (!tokenVerify) return c.json({ success: false, message: "token is not valid" }, 409)

      if (tokenVerify.purpose !== 'login') return c.json({ success: false, message: '' }, 409)
      return c.json({ success: true, payload: tokenVerify }, 200)
   } catch (error) {
      return c.json({ success: false, message: 'token is expire' }, 500)
   }
})
export default auth