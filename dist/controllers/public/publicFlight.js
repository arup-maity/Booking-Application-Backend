"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../config/prisma"));
const hono_1 = require("hono");
const publicFlight = new hono_1.Hono();
publicFlight.get("/flight-details/:id", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = c.req.param("id");
        const flight = yield prisma_1.default.flights.findUnique({
            where: {
                id: +id
            },
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
        });
        return c.json({ success: true, flight }, 200);
    }
    catch (error) {
        return c.json({ success: false, data: error }, 500);
    }
}));
publicFlight.get("/search-flights", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = c.req.query();
        const conditions = {};
        if (query.from) {
            conditions.departureAirport = {
                iataCode: {
                    contains: query.from,
                    mode: "insensitive"
                }
            };
        }
        if (query.to) {
            conditions.arrivalAirport = {
                iataCode: {
                    contains: query.to,
                    mode: "insensitive"
                }
            };
        }
        if (query.departure) {
            conditions.departureTime = {
                gte: new Date(query.departure)
            };
        }
        // conditions.AND = {
        //    departureTime: {
        //       gte: new Date(`${query.departure}T00:00:00Z`), // Start of the range (e.g., 12 AM)
        //       lt: new Date(`${query.departure}T06:00:00Z`),  // End of the range (e.g., 6 AM)
        //    },
        // }
        // conditions.AND = [
        //    {
        //       departureTime: {
        //          gte: new Date(`${query.departure}T23:00:00Z`), // 11 PM
        //          lt: new Date(new Date(query.departure).setDate(new Date(query.departure).getDate() + 1) + "T00:00:00Z"), // 12 AM (next day)
        //       },
        //    },
        // ]
        const flights = yield prisma_1.default.flights.findMany({
            where: conditions,
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
        });
        //    const list = await prisma.$queryRaw`
        //    SELECT
        //    *
        //    FROM "Flights" "flight"
        //    JOIN "Airports" AS "dep" ON "flight"."departureAirportId" = "dep"."id"
        //    JOIN "Airports" AS "arr" ON "flight"."arrivalAirportId" = "arr"."id"
        //  `
        //       const list = await prisma.$queryRaw`
        //       SELECT 
        //     f.*,
        //     dep_airport.id AS "departureAirport.id",
        //     dep_city.id AS "departureAirport.city.id",
        //     arr_airport.id AS "arrivalAirport.id",
        //     arr_city.id AS "arrivalAirport.city.id",
        //     airplane.id AS "airplane.id"
        //   FROM "Flights" "f"
        //   LEFT JOIN "Airports" AS "dep_airport" ON "f"."departureAirportId" = "dep_airport"."id"
        //   LEFT JOIN "Cities" AS "dep_city" ON "dep_airport"."cityId" = "dep_city"."id"
        //   LEFT JOIN "Airports" AS "arr_airport" ON "f"."arrivalAirportId" = "arr_airport"."id"
        //   LEFT JOIN "Cities" AS "arr_city" ON "arr_airport"."cityId" = "arr_city"."id"
        //   LEFT JOIN "Airplanes" AS "airplane" ON "f"."airplaneId" = "airplane"."id"
        //     `
        return c.json({ success: true, flights }, 200);
    }
    catch (error) {
        console.log(error);
        return c.json({ success: false, error }, 400);
    }
}));
exports.default = publicFlight;
