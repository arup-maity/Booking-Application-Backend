import { z } from 'zod'

export const loginSchema = z.object({
   email: z.string().email().min(5),
   password: z.string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .max(20, { message: 'Password must be at most 20 characters long' })
      .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
      .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
      .regex(/[0-9]/, { message: 'Password must contain at least one number' })
      .regex(/[@#$&]/, { message: 'Password must contain at least one special character: @, #, $, &' })
      .regex(/^\S*$/, { message: 'Password must not contain any whitespace characters' })
      .regex(/^[a-zA-Z0-9@#$&]*$/, { message: 'Password can only contain letters, numbers, and special characters: @, #, $, &' }),
})