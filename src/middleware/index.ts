import { Ability } from "@/role-base-access-control";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";
import { Context } from 'hono';

interface User {
   id: string;
   name: string;
   email: string;
   // Add other user properties as needed
}
declare module 'hono' {
   interface Context {
      user: User;
   }
}

export async function checkAdminToken(c: any, next: any) {
   const cookie_token = getCookie(c, 'token')

   function getToken() {
      const { authorization } = c.req.header();
      if (!authorization || authorization === undefined || !authorization.startsWith('Bearer ')) {
         return null
      }
      return authorization.split(' ')[1]
   }
   const token = cookie_token || getToken() as string
   // check is exists
   if (!token) return c.json({ auth: false, message: 'token not found' }, 409)
   // token is varifying
   const tokenVerify = await verify(token, process.env.JWT_SECRET!)
   if (!tokenVerify) return c.json({ auth: false, message: "token is not valid" }, 409)
   // check token purpose
   if (tokenVerify.purpose !== 'login') return c.json({ auth: false, message: 'this token not for login purpose' }, 409)
   if (tokenVerify.accessPurpose !== 'admin') return c.json({ auth: false, message: 'this api not for user' }, 409)
   // set token detais on request
   c.req.user = tokenVerify
   await next();
}

export async function authorization(c: any, next: any) {
   const cookie_token = getCookie(c, 'token')

   function getToken() {
      const { authorization } = c.req.header();
      if (!authorization || authorization === undefined || !authorization.startsWith('Bearer ')) {
         return null
      }
      return authorization.split(' ')[1]
   }
   const token = cookie_token || getToken() as string
   // check is exists
   if (!token) return c.json({ auth: false, message: 'token not found' }, 409)
   // token is varifying
   const tokenVerify = await verify(token, process.env.JWT_SECRET!)
   if (!tokenVerify) return c.json({ auth: false, message: "token is not valid" }, 409)
   // check token purpose
   if (tokenVerify.purpose !== 'login') return c.json({ auth: false, message: 'this token not for login purpose' }, 409)
   // set token detais on request
   c.user = tokenVerify
   await next();
}
export async function authentication(c: any, next: any) {
   const cookie_token = getCookie(c, 'token')
   function getToken() {
      const { authorization } = c.req.header();
      if (!authorization || authorization === undefined || !authorization.startsWith('Bearer ')) {
         return null
      }
      return authorization.split(' ')[1]
   }
   const token = cookie_token || getToken() as string
   // check is exists
   if (!token) return c.json({ auth: false, message: 'token not found' }, 409)
   // token is varifying
   const tokenVerify = await verify(token, process.env.JWT_SECRET!)
   if (!tokenVerify) return c.json({ auth: false, message: "token is not valid" }, 409)
   // check token purpose
   if (tokenVerify.purpose !== 'login') return c.json({ auth: false, message: 'this token not for login purpose' }, 409)
   // set token detais on request
   c.user = tokenVerify
   await next();
}
export async function adminAuthentication(c: any, next: any) {
   try {
      const cookie_token = getCookie(c, 'token')
      function getToken() {
         const { authorization } = c.req.header();
         if (!authorization || authorization === undefined || !authorization.startsWith('Bearer ')) {
            return null
         }
         return authorization.split(' ')[1]
      }
      const token = cookie_token || getToken() as string
      // check is exists
      if (!token) return c.json({ auth: false, message: 'token not found' }, 409)
      // token is varifying
      const tokenVerify = await verify(token, process.env.JWT_SECRET!)
      if (!tokenVerify) return c.json({ auth: false, message: "token is not valid" }, 409)
      // check token purpose
      if (tokenVerify.purpose !== 'login') return c.json({ auth: false, message: 'this token not for login purpose' }, 409)
      // set token detais on request
      c.user = tokenVerify
      await next();
   } catch (error) {
      return c.json({ success: false, message: 'token error' })
   }
}
export async function userAuthentication(c: any, next: any) {
   const cookie_token = getCookie(c, 'token')
   function getToken() {
      const { authorization } = c.req.header();
      if (!authorization || authorization === undefined || !authorization.startsWith('Bearer ')) {
         return null
      }
      return authorization.split(' ')[1]
   }
   const token = cookie_token || getToken() as string
   // check is exists
   if (!token) return c.json({ auth: false, message: 'token not found' }, 409)
   // token is varifying
   const tokenVerify = await verify(token, process.env.JWT_SECRET!)
   if (!tokenVerify) return c.json({ auth: false, message: "token is not valid" }, 409)
   // check token purpose
   if (tokenVerify.purpose !== 'login') return c.json({ auth: false, message: 'this token not for login purpose' }, 409)
   // set token detais on request
   c.user = tokenVerify
   await next();
}
