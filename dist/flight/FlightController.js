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
const flightController = new hono_1.Hono();
flightController.get("flight-details/:id", (c) => __awaiter(void 0, void 0, void 0, function* () {
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
        return c.json({ success: false, error }, 400);
    }
}));
exports.default = flightController;
