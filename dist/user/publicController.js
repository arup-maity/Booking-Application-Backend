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
const bcrypt_1 = __importDefault(require("bcrypt"));
const middleware_1 = require("../middleware");
const user = new hono_1.Hono();
user.get("/profile-details", middleware_1.userAuthentication, (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = yield prisma_1.default.users.findUnique({
            where: {
                id: c.user.id
            }, include: {
                userAddress: true
            }
        });
        if (!profile)
            return c.json({ success: false, message: "User not found" }, 409);
        return c.json({ success: true, message: "Profile details retrieved successfully", profile }, 200);
    }
    catch (error) {
        console.error(error);
        return c.json({ error }, 500);
    }
}));
user.put("/profile-update", middleware_1.userAuthentication, (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield c.req.json();
        const updatedProfile = yield prisma_1.default.users.update({
            where: {
                id: +c.user.id
            },
            data: {
                fullName: body.fullName,
                gender: body.gender,
                dob: body.dob,
                address: body.address,
                mobileNumber: body.mobileNumber,
            }
        });
        if (!updatedProfile)
            return c.json({ success: false, message: "Profile update failed" }, 409);
        return c.json({ success: true, message: "Profile updated successfully", updatedProfile }, 200);
    }
    catch (error) {
        console.error(error);
        return c.json({ error }, 500);
    }
}));
user.put("/change-password", middleware_1.userAuthentication, (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield c.req.json();
        // console.log('body', body)
        const user = yield prisma_1.default.users.findUnique({
            where: {
                id: +c.user.id
            },
            include: {
                userAuth: true
            }
        });
        if (!user)
            return c.json({ success: false, message: "User not found" }, 409);
        const isPasswordValid = bcrypt_1.default.compareSync(body.oldPassword, user === null || user === void 0 ? void 0 : user.userAuth.password);
        if (!isPasswordValid)
            return c.json({ success: false, message: 'Please enter the correct old password' }, 409);
        const hashedPassword = bcrypt_1.default.hashSync(body.newPassword, 10);
        const updatedUser = yield prisma_1.default.users.update({
            where: {
                id: +c.user.id
            },
            data: {
                userAuth: {
                    update: {
                        password: hashedPassword,
                    }
                }
            }
        });
        if (!updatedUser)
            return c.json({ success: false, message: "Password update failed" }, 409);
        return c.json({ success: true, message: 'Password change successfully' }, 200);
    }
    catch (error) {
        return c.json({ success: false, message: 'Password update failed' }, 500);
    }
}));
user.get("/bookings-list", middleware_1.userAuthentication, (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status = 'all' } = c.req.query();
        const userId = c.user.id;
        const conditions = {};
        if (status === 'all') {
            conditions.status = 'complete';
        }
        else if (status === 'failed') {
            conditions.status = 'pending';
            // conditions.status = { notIn: ['cancelled', 'completed'] }
        }
        else {
            conditions.status = 'pending';
        }
        const user = yield prisma_1.default.users.findUnique({
            where: {
                id: +userId
            },
            select: {
                bookings: {
                    where: conditions,
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
                        }
                    }
                }
            }
        });
        return c.json({ success: true, bookings: user === null || user === void 0 ? void 0 : user.bookings }, 200);
    }
    catch (error) {
    }
}));
exports.default = user;
