import { Hono } from "hono";
import bcrypt from "bcrypt";
import { userAuthentication } from "@/middleware";
import prisma from "@/config/prisma";

const user = new Hono()

user.get("/profile-details", userAuthentication, async (c: any) => {
   try {
      const profile = await prisma.users.findUnique({
         where: {
            id: c.user.id
         }, include: {
            userAddress: true
         }
      })
      if (!profile) return c.json({ success: false, message: "User not found" }, 409)
      return c.json({ success: true, message: "Profile details retrieved successfully", profile }, 200)
   } catch (error) {
      console.error(error)
      return c.json({ error }, 500)
   }
})
user.put("/profile-update", userAuthentication, async (c: any) => {
   try {
      const body = await c.req.json()
      const updatedProfile = await prisma.users.update({
         where: {
            id: +c.user.id
         },
         data: {
            fullName: body.fullName,
            gender: body.gender,
            dob: body.dob,
            address: body.address,
            mobileNumber: body.mobileNumber,
         }
      })
      if (!updatedProfile) return c.json({ success: false, message: "Profile update failed" }, 409)
      return c.json({ success: true, message: "Profile updated successfully", updatedProfile }, 200)
   } catch (error) {
      console.error(error)
      return c.json({ error }, 500)
   }
})
user.put("/change-password", userAuthentication, async (c: any) => {
   try {
      const body = await c.req.json()
      // console.log('body', body)
      const user: any = await prisma.users.findUnique({
         where: {
            id: +c.user.id
         },
         include: {
            userAuth: true
         }
      })
      if (!user) return c.json({ success: false, message: "User not found" }, 409)

      const isPasswordValid = bcrypt.compareSync(body.oldPassword, user?.userAuth.password)
      if (!isPasswordValid) return c.json({ success: false, message: 'Please enter the correct old password' }, 409)

      const hashedPassword = bcrypt.hashSync(body.newPassword, 10)

      const updatedUser = await prisma.users.update({
         where: {
            id: +c.user.id
         },
         data: {
            userAuth: {
               update: {
                  password: hashedPassword,
               }
            }
         }
      })
      if (!updatedUser) return c.json({ success: false, message: "Password update failed" }, 409)
      return c.json({ success: true, message: 'Password change successfully' }, 200)
   } catch (error) {
      return c.json({ success: false, message: 'Password update failed' }, 500)
   }
})
user.get("/bookings-list/:status", userAuthentication, async (c: any) => {
   try {
      const { status } = c.req.param()
      const userId = c.user.id
      const conditions: any = {}
      if (status === 'all') {
         conditions.status = 'complete'
      } else if (status === 'failed') {
         conditions.status = 'failed'
         // conditions.status = { notIn: ['cancelled', 'completed', 'pending'] }
      } else if (status === 'cancelled') {
         conditions.status = 'cancelled'
      }
      else {
         conditions.status = 'pending'
      }
      const user = await prisma.users.findUnique({
         where: {
            id: +userId
         },
         select: {
            bookings: {
               where: conditions,
               include: {
                  flight: {
                     include: {
                        departureAirport: {
                           include: {
                              city: true
                           }
                        },
                        arrivalAirport: {
                           include: {
                              city: true
                           }
                        },
                        airplane: true
                     }
                  }
               }
            }
         }
      })
      return c.json({ success: true, bookings: user?.bookings }, 200)
   } catch (error) {

   }
})

export default user