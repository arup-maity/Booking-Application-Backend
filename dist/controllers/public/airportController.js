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
const hono_1 = require("hono");
const prisma_1 = __importDefault(require("../../config/prisma"));
const publicAirport = new hono_1.Hono();
publicAirport.get("/search-airport", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const search = c.req.query('search');
        const airport = yield prisma_1.default.airports.findMany({
            where: {
                OR: [
                    {
                        iataCode: { contains: search, mode: "insensitive" }
                    },
                    {
                        city: {
                            cityName: { contains: search, mode: "insensitive" }
                        }
                    },
                ]
            },
            include: {
                city: true
            }
        });
        return c.json({ success: true, airport }, 200);
    }
    catch (error) {
        return c.json({ success: false, error }, 500);
    }
}));
publicAirport.get("/read-airport/:code", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const code = c.req.param("code");
        const airport = yield prisma_1.default.airports.findUnique({
            where: {
                iataCode: code
            },
            include: {
                city: true
            }
        });
        if (!airport)
            return c.json({ success: false, message: 'Not found airport' }, 409);
        return c.json({ success: true, airport }, 200);
    }
    catch (error) {
        return c.json({ success: false, error }, 500);
    }
}));
publicAirport.get("/suggested-departure-airports", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const today = new Date();
        const threeMonthsFromNow = new Date(today);
        threeMonthsFromNow.setMonth(today.getMonth() + 3);
        const airports = yield prisma_1.default.flights.findMany({
            where: {
                departureTime: {
                    gte: today,
                    lte: threeMonthsFromNow,
                },
            },
            take: 10,
            select: {
                departureAirport: {
                    select: {
                        airportName: true,
                        iataCode: true,
                        city: {
                            select: {
                                cityName: true
                            }
                        }
                    }
                }
            },
            distinct: ['departureAirportId'],
        });
        return c.json({ success: true, airports }, 200);
    }
    catch (error) {
        console.log(error);
        return c.json({ success: false, error }, 500);
    }
}));
publicAirport.get("/suggested-arrival-airports", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const today = new Date();
        const threeMonthsFromNow = new Date(today);
        threeMonthsFromNow.setMonth(today.getMonth() + 3);
        const airports = yield prisma_1.default.flights.findMany({
            where: {
                arrivalTime: {
                    gte: today,
                    lte: threeMonthsFromNow,
                },
            },
            take: 10,
            select: {
                arrivalAirport: {
                    select: {
                        airportName: true,
                        iataCode: true,
                        city: {
                            select: {
                                cityName: true
                            }
                        }
                    }
                }
            },
            distinct: ['arrivalAirportId'],
        });
        return c.json({ success: true, airports }, 200);
    }
    catch (error) {
        console.log(error);
        return c.json({ success: false, error }, 500);
    }
}));
exports.default = publicAirport;
