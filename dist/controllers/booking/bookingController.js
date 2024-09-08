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
const stripe_1 = require("../../controllers/checkout/stripe");
const middleware_1 = require("../../middleware");
const userBooking = new hono_1.Hono();
userBooking.post("/create-booking", middleware_1.userAuthentication, (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield c.req.json();
        // console.log('body ===========>', body)
        const user = c.user;
        const booking = yield prisma_1.default.bookingProcess.create({
            data: {
                userId: +user.id,
                flightId: body.flightDetails.id,
                passengers: body.passengers,
                status: 'pending',
                // seatNumber: body.seatNumber,
                totalCost: body.flightPrice.total,
                PaymentsProcess: {
                    create: {
                        status: 'pending',
                    }
                }
            }
        });
        if (!booking)
            return c.json({ success: false, message: 'Booking not created' }, 409);
        const secret = yield (0, stripe_1.createSecret)(body.flightPrice.total, 'inr', booking.id, '', '');
        if (!secret)
            return c.json({ success: false, message: 'not create payment intent' }, 409);
        const update = yield prisma_1.default.bookingProcess.update({
            where: {
                id: booking.id
            },
            data: {
                PaymentsProcess: {
                    update: {
                        clientSecret: secret
                    }
                }
            }
        });
        if (!update)
            return c.json({ success: false, message: 'Booking not created' }, 409);
        return c.json({ success: true, booking: update }, 200);
    }
    catch (error) {
        console.log(error);
        return c.json({ success: false, error }, 500);
    }
}));
userBooking.get("/booking-checkout/:id", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = c.req.param("id");
        const booking = yield prisma_1.default.BookingProcess.findUnique({
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
                PaymentsProcess: true
            }
        });
        return c.json({ success: true, booking }, 200);
    }
    catch (error) {
        return c.json({ success: false, error }, 500);
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
userBooking.get("/details/:id", (c) => __awaiter(void 0, void 0, void 0, function* () {
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
userBooking.get("/cancel-booking/:id", middleware_1.userAuthentication, (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = c.req.param("id");
        const user = c.user;
        const cancelBooking = yield prisma_1.default.bookings.update({
            where: {
                id: +id,
                userId: +user.id
            },
            data: {
                status: 'cancelled'
            }
        });
        return c.json({ success: true, cancelBooking }, 200);
    }
    catch (error) {
        return c.json({ success: true, error }, 500);
    }
}));
exports.default = userBooking;
