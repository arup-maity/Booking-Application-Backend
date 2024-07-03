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
const adminAirplane = new hono_1.Hono();
adminAirplane.post("create-airplane", middleware_1.adminAuthentication, (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield c.req.json();
        // check airplanes modelNumber exists
        const airplaneModel = yield prisma_1.default.airplanes.findFirst({
            where: {
                modelNumber: body.modelNumber
            }
        });
        if (airplaneModel)
            return c.json({ success: false, message: "Airplane already exists" }, 409);
        // create airplane
        const airplane = yield prisma_1.default.airplanes.create({
            data: Object.assign({}, body)
        });
        return c.json({ success: true, airplane }, 200);
    }
    catch (error) {
        return c.json({ success: false, error }, 500);
    }
}));
adminAirplane.put("update-airplane/:id", middleware_1.adminAuthentication, (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = c.req.param("id");
        const body = yield c.req.json();
        const airplane = yield prisma_1.default.airplanes.update({
            where: {
                id: +id
            },
            data: Object.assign({}, body)
        });
        return c.json({ success: true, airplane }, 200);
    }
    catch (error) {
        return c.json({ success: false, error }, 500);
    }
}));
adminAirplane.get("read-airplane/:id", middleware_1.adminAuthentication, (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = c.req.param("id");
        const airplane = yield prisma_1.default.airplanes.findUnique({
            where: {
                id: +id
            }
        });
        return c.json({ success: true, airplane }, 200);
    }
    catch (error) {
        return c.json({ success: false, error }, 500);
    }
}));
adminAirplane.delete("delete-airplane/:id", middleware_1.adminAuthentication, (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = c.req.param("id");
        const airplane = yield prisma_1.default.airplanes.delete({
            where: {
                id: +id
            }
        });
        return c.json({ success: true, airplane }, 200);
    }
    catch (error) {
        return c.json({ success: false, error }, 500);
    }
}));
adminAirplane.get("all-airplanes", middleware_1.adminAuthentication, (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const airplanes = yield prisma_1.default.airplanes.findMany();
        return c.json({ success: true, airplanes }, 200);
    }
    catch (error) {
        return c.json({ success: false, error }, 500);
    }
}));
exports.default = adminAirplane;
