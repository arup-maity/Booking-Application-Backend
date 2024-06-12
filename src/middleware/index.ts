import { Ability } from "@/role-base-access-control";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";

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