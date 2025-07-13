import { z } from 'zod'

export const createCityValidation = z.object({
   cityName: z.string().min(1, 'City Name must not be empty'),
   countryName: z.string().min(1, 'Country Name must not be empty'),
   countryCode: z.string().min(2, 'Country Code must be 2 characters long'),
})

export const updateCityValidation = z.object({
   cityName: z.string().min(1, 'City Name must not be empty'),
   countryName: z.string().min(1, 'Country Name must not be empty'),
   countryCode: z.string().min(2, 'Country Code must be 2 characters long'),
})

export const readCityValidation = z.object({
   id: z.string().min(1, 'City Id must not be empty'),
})

export const deleteCityValidation = z.object({
   id: z.string().min(1, 'City Id must not be empty'),
})