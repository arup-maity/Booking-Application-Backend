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
const adminBooking = new hono_1.Hono();
adminBooking.get("/all-bookings", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 25, search = '', column = 'createdAt', sortOrder = 'desc' } = c.req.query();
        const conditions = {};
        const query = {};
        if (column && sortOrder) {
            query.orderBy = { [column]: sortOrder };
        }
        const bookings = yield prisma_1.default.bookings.findMany(Object.assign({ where: conditions, include: {
                flight: true
            }, take: +limit, skip: (+page - 1) * +limit }, query));
        return c.json({ success: true, bookings }, 200);
    }
    catch (error) {
        console.error(error);
        return c.json({ success: false, error }, 500);
    }
}));
adminBooking.get("/status-count", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield prisma_1.default.bookings.groupBy({
            by: ['status'],
            _count: {
                _all: true, // Or specify the field you want to count
            },
        });
        return c.json({ success: true, count }, 200);
    }
    catch (error) {
        return c.json({ success: false, error }, 500);
    }
}));
adminBooking.get("/details/:id", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = c.req.param("id");
        const booking = yield prisma_1.default.bookings.findUnique({
            where: {
                id: +id
            },
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
                },
                user: true,
                payments: true
            }
        });
        return c.json({ success: true, booking }, 200);
    }
    catch (error) {
        return c.json({ success: false, error }, 500);
    }
}));
exports.default = adminBooking;
