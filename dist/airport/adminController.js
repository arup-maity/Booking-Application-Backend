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
const middleware_1 = require("../middleware");
const adminAirport = new hono_1.Hono();
adminAirport.post("/create-airport", middleware_1.adminAuthentication, (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield c.req.json();
        // check airport code
        const airportCode = yield prisma_1.default.airports.findUnique({
            where: {
                iataCode: body.iataCode
            }
        });
        if (airportCode) {
            return c.json({ success: false, message: "Airport iata code already exist" }, 409);
        }
        // create airport
        const airport = yield prisma_1.default.airports.create({
            data: Object.assign({}, body)
        });
        return c.json({ success: true, airport }, 200);
    }
    catch (error) {
        return c.json({ success: false, error }, 500);
    }
}));
adminAirport.put("/update-airport/:id", middleware_1.adminAuthentication, (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = c.req.param("id");
        const body = yield c.req.json();
        const airport = yield prisma_1.default.airports.update({
            where: {
                id: +id
            },
            data: Object.assign({}, body)
        });
        return c.json({ success: true, airport }, 200);
    }
    catch (error) {
        return c.json({ success: false, error }, 500);
    }
}));
adminAirport.get("/read-airport/:code", middleware_1.adminAuthentication, (c) => __awaiter(void 0, void 0, void 0, function* () {
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
adminAirport.delete("/delete-airport/:id", middleware_1.adminAuthentication, (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = c.req.param("id");
        const airport = yield prisma_1.default.airports.delete({
            where: {
                id: +id
            }
        });
        return c.json({ success: true, airport }, 200);
    }
    catch (error) {
        return c.json({ success: false, error }, 500);
    }
}));
adminAirport.get("/all-airports", middleware_1.adminAuthentication, (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 25, search = '', orderColumn = '', order = '' } = c.req.query();
        const conditions = {};
        if (search) {
            conditions.airportName = {
                contains: search,
                mode: "insensitive"
            };
        }
        const query = {};
        if (orderColumn && order) {
            query.orderBy = { [orderColumn]: order };
        }
        const airports = yield prisma_1.default.airports.findMany(Object.assign(Object.assign({ where: conditions, take: +limit, skip: (+page - 1) * +limit }, query), { include: {
                city: true
            } }));
        const count = yield prisma_1.default.airports.count({
            where: conditions
        });
        return c.json({ success: true, airports, count }, 200);
    }
    catch (error) {
        return c.json({ success: false, error }, 500);
    }
}));
adminAirport.get("/search-airport", (c) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.default = adminAirport;
