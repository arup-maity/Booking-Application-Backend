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
const adminCityRouter = new hono_1.Hono();
adminCityRouter.post('/create-city', middleware_1.adminAuthentication, (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield c.req.json();
        // check cityCode exists
        const cityName = yield prisma_1.default.cities.findUnique({
            where: {
                cityName_countryName: {
                    cityName: body.cityName,
                    countryName: body.countryName
                }
            }
        });
        if (cityName)
            return c.json({ success: false, message: 'City Name already exists on this country' }, 409);
        // create city
        const city = yield prisma_1.default.cities.create({
            data: Object.assign({}, body)
        });
        return c.json({ success: true, city }, 200);
    }
    catch (error) {
        console.log(error);
        return c.json({ success: false, error }, 500);
    }
}));
adminCityRouter.put("/update-city/:id", middleware_1.adminAuthentication, (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = c.req.param("id");
        const body = yield c.req.json();
        const city = yield prisma_1.default.cities.update({
            where: { id: +id },
            data: Object.assign({}, body)
        });
        return c.json({ success: true, city }, 200);
    }
    catch (error) {
        return c.json({ success: false, error }, 500);
    }
}));
adminCityRouter.get("/read-city/:id", middleware_1.adminAuthentication, (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = c.req.param("id");
        const city = yield prisma_1.default.cities.findUnique({
            where: { id: +id },
            include: {
                airports: true
            }
        });
        return c.json({ success: true, city }, 200);
    }
    catch (error) {
        return c.json({ success: false, error }, 500);
    }
}));
adminCityRouter.delete("/delete-city/:id", middleware_1.adminAuthentication, (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = c.req.param("id");
        const city = yield prisma_1.default.cities.delete({
            where: {
                id: +id
            }
        });
        return c.json({ success: true, city }, 200);
    }
    catch (error) {
        return c.json({ success: false, error }, 500);
    }
}));
adminCityRouter.post("/delete-cities/multiple", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield c.req.json();
        const cities = yield prisma_1.default.cities.deleteMany({
            where: {
                id: { in: body.rows }
            }
        });
        return c.json({ success: true, cities }, 200);
    }
    catch (error) {
        return c.json({ success: false, error: error }, 500);
    }
}));
adminCityRouter.get("/all-cities", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 25, search = '', column = 'createdAt', sortOrder = 'desc' } = c.req.query();
        const conditions = {};
        if (search) {
            conditions.cityName = {
                contains: search,
                mode: "insensitive"
            };
        }
        const query = {};
        if (column && sortOrder) {
            query.orderBy = { [column]: sortOrder };
        }
        const cities = yield prisma_1.default.cities.findMany(Object.assign({ where: conditions, include: {
                airports: true
            }, take: +limit, skip: (+page - 1) * +limit }, query));
        const count = yield prisma_1.default.cities.count({
            where: conditions
        });
        return c.json({ success: true, cities, count }, 200);
    }
    catch (error) {
        return c.json({ success: false, error }, 500);
    }
}));
exports.default = adminCityRouter;
