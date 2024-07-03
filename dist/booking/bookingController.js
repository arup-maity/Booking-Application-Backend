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
const stripe_1 = require("../checkout/stripe");
const userBooking = new hono_1.Hono();
userBooking.post("/create-booking", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield c.req.json();
        // console.log('body', body)
        const userId = 1;
        const booking = yield prisma_1.default.bookings.create({
            data: {
                userId: userId,
                flightId: body.flightDetails.id,
                passengers: body.passengers,
                status: 'pending',
                // seatNumber: body.seatNumber,
                totalCost: body.flightPrice.total,
                payments: {
                    create: {
                        status: 'pending',
                    }
                }
            }
        });
        if (!booking)
            return c.json({ success: false, message: 'Booking not created' });
        const secret = yield (0, stripe_1.createSecret)(body.flightPrice.total, 'inr', booking.id, '', '');
        if (!secret)
            return c.json({ success: false, message: 'not create payment intent' });
        const update = yield prisma_1.default.bookings.update({
            where: {
                id: booking.id
            },
            data: {
                payments: {
                    update: {
                        clientSecret: secret
                    }
                }
            }
        });
        if (!update)
            return c.json({ success: false, message: 'Booking not created' });
        return c.json({ success: true, booking }, 200);
    }
    catch (error) {
        console.log(error);
    }
}));
userBooking.get("/read-booking/:id", (c) => __awaiter(void 0, void 0, void 0, function* () {
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
userBooking.get("/success-booking/:id", (c) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.default = userBooking;
