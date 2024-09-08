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
const middleware_1 = require("../../middleware");
const prisma_1 = __importDefault(require("../../config/prisma"));
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
adminAirplane.post("/delete-airplanes/multiple", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield c.req.json();
        const airplanes = yield prisma_1.default.airplanes.deleteMany({
            where: {
                id: { in: body.rows }
            }
        });
        return c.json({ success: true, airplanes }, 200);
    }
    catch (error) {
        console.log('error', error);
        return c.json({ success: false, error: error }, 500);
    }
}));
adminAirplane.get("all-airplanes", middleware_1.adminAuthentication, (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 25, search = '', column = 'createdAt', sortOrder = 'desc' } = c.req.query();
        const conditions = {};
        if (search) {
            conditions.OR = [
                { modelNumber: { contains: search, mode: "insensitive" } },
                { manufacturer: { contains: search, mode: "insensitive" } },
            ];
        }
        const query = {};
        if (column && sortOrder) {
            // query.orderBy = { [column]: sortOrder }
        }
        const airplanes = yield prisma_1.default.airplanes.findMany(Object.assign({ where: conditions, take: +limit, skip: (+page - 1) * +limit }, query));
        const count = yield prisma_1.default.airplanes.count({
            where: conditions
        });
        return c.json({ success: true, airplanes, count }, 200);
    }
    catch (error) {
        return c.json({ success: false, error }, 500);
    }
}));
adminAirplane.get("/total-airplane-services", middleware_1.adminAuthentication, (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalAirplane = yield prisma_1.default.airplanes.count();
        return c.json({ success: true, totalAirplane }, 200);
    }
    catch (error) {
        return c.json({ success: false, error }, 500);
    }
}));
exports.default = adminAirplane;
