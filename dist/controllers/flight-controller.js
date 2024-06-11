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
const flight = new hono_1.Hono();
flight.post("create-flight", (c) => __awaiter(void 0, void 0, void 0, function* () {
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
flight.put("update-flight/:id", (c) => __awaiter(void 0, void 0, void 0, function* () {
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
flight.get("read-flight/:id", (c) => __awaiter(void 0, void 0, void 0, function* () {
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
flight.delete("delete-flight/:id", (c) => __awaiter(void 0, void 0, void 0, function* () {
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
flight.get("all-flights", (c) => __awaiter(void 0, void 0, void 0, function* () {
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
flight.get("/search-flights", (c) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.default = flight;
const flights = [
    { flightNumber: 'EK215', airline: 'Emirates', origin: 'Dubai', destination: 'Los Angeles' },
    { flightNumber: 'BA103', airline: 'British Airways', origin: 'London', destination: 'New York' },
    { flightNumber: 'DL123', airline: 'Delta Air Lines', origin: 'Atlanta', destination: 'Paris' },
    { flightNumber: 'SQ25', airline: 'Singapore Airlines', origin: 'Singapore', destination: 'Newark' },
    { flightNumber: 'LH455', airline: 'Lufthansa', origin: 'Frankfurt', destination: 'Boston' },
    { flightNumber: 'AF83', airline: 'Air France', origin: 'Paris', destination: 'Tokyo' },
    { flightNumber: 'QF12', airline: 'Qantas', origin: 'Sydney', destination: 'Los Angeles' },
    { flightNumber: 'UA1', airline: 'United Airlines', origin: 'San Francisco', destination: 'Singapore' },
    { flightNumber: 'TK1', airline: 'Turkish Airlines', origin: 'Istanbul', destination: 'New York' },
    { flightNumber: 'CX889', airline: 'Cathay Pacific', origin: 'Hong Kong', destination: 'London' },
    { flightNumber: 'VS23', airline: 'Virgin Atlantic', origin: 'London', destination: 'Newark' },
    { flightNumber: 'KL606', airline: 'KLM Royal Dutch Airlines', origin: 'Amsterdam', destination: 'New York' },
    { flightNumber: 'AI101', airline: 'Air India', origin: 'Delhi', destination: 'New York' },
    { flightNumber: 'JL6', airline: 'Japan Airlines', origin: 'Tokyo', destination: 'Los Angeles' },
    { flightNumber: 'EY183', airline: 'Etihad Airways', origin: 'Abu Dhabi', destination: 'London' },
    { flightNumber: 'NZ1', airline: 'Air New Zealand', origin: 'Auckland', destination: 'Los Angeles' },
    { flightNumber: 'CA985', airline: 'Air China', origin: 'Beijing', destination: 'Los Angeles' },
    { flightNumber: 'AS1', airline: 'Alaska Airlines', origin: 'Seattle', destination: 'Los Angeles' },
    { flightNumber: 'HA1', airline: 'Hawaiian Airlines', origin: 'Honolulu', destination: 'Tokyo' },
    { flightNumber: 'EK1', airline: 'Emirates', origin: 'Dubai', destination: 'New York' },
    { flightNumber: 'BA1', airline: 'British Airways', origin: 'London', destination: 'Singapore' },
    { flightNumber: 'DL1', airline: 'Delta Air Lines', origin: 'Atlanta', destination: 'Tokyo' },
    { flightNumber: 'SQ1', airline: 'Singapore Airlines', origin: 'Singapore', destination: 'San Francisco' },
    { flightNumber: 'LH1', airline: 'Lufthansa', origin: 'Frankfurt', destination: 'New York' },
    { flightNumber: 'AF1', airline: 'Air France', origin: 'Paris', destination: 'Los Angeles' },
    { flightNumber: 'QF1', airline: 'Qantas', origin: 'Sydney', destination: 'London' },
];
