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
const prisma_1 = __importDefault(require("../config/prisma"));
const adminFlight = new hono_1.Hono();
adminFlight.post("create-flight", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield c.req.json();
        // check flight Number exists
        const flightNumber = yield prisma_1.default.flights.findUnique({
            where: {
                flightNumber: body.flightNumber
            }
        });
        if (flightNumber) {
            return c.json({ success: false, message: "Flight Number already exists" }, 400);
        }
        // create flight
        const flight = yield prisma_1.default.flights.create({
            data: Object.assign({}, body)
        });
        return c.json({ success: true, flight }, 200);
    }
    catch (error) {
        console.log('error ==>', error);
        return c.json({ success: false, error }, 400);
    }
}));
adminFlight.put("update-flight/:id", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = c.req.param("id");
        const body = yield c.req.json();
        const flight = yield prisma_1.default.flights.update({
            where: {
                id: +id
            },
            data: Object.assign({}, body)
        });
        return c.json({ success: true, flight }, 200);
    }
    catch (error) {
        return c.json({ success: false, error }, 400);
    }
}));
adminFlight.get("read-flight/:id", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = c.req.param("id");
        const flight = yield prisma_1.default.flights.findUnique({
            where: {
                id: +id
            }
        });
        return c.json({ success: true, flight }, 200);
    }
    catch (error) {
        return c.json({ success: false, error }, 400);
    }
}));
adminFlight.delete("delete-flight/:id", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = c.req.param("id");
        const flight = yield prisma_1.default.flights.delete({
            where: {
                id: +id
            }
        });
        return c.json({ success: true, flight }, 200);
    }
    catch (error) {
        return c.json({ success: false, error }, 400);
    }
}));
adminFlight.get("all-flights", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const flights = yield prisma_1.default.flights.findMany({
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
        return c.json({ success: true, flights }, 200);
    }
    catch (error) {
        return c.json({ success: false, error }, 400);
    }
}));
adminFlight.get("/search-flights", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = c.req.query();
        console.log('query', query);
        const flights = yield prisma_1.default.flights.findMany({
            where: {
                departureAirport: {
                    iataCode: {
                        contains: query.from,
                        mode: "insensitive"
                    }
                },
                arrivalAirport: {
                    iataCode: {
                        contains: query.to,
                        mode: "insensitive"
                    }
                },
                departureTime: {
                    gte: new Date(query.departure)
                }
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
        return c.json({ success: true, flights }, 200);
    }
    catch (error) {
        return c.json({ success: false, error }, 500);
    }
}));
exports.default = adminFlight;
