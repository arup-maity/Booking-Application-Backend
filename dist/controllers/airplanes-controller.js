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
const airplane = new hono_1.Hono();
airplane.post("/demo-airplane", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const airplaneModels = [
            { modelNumber: 'A320', manufacturer: 'Airbus', capacity: 150 },
            { modelNumber: 'B737', manufacturer: 'Boeing', capacity: 180 },
            { modelNumber: 'A380', manufacturer: 'Airbus', capacity: 550 },
            { modelNumber: 'B777', manufacturer: 'Boeing', capacity: 350 },
            { modelNumber: 'A350', manufacturer: 'Airbus', capacity: 300 },
            { modelNumber: 'B787', manufacturer: 'Boeing', capacity: 250 },
            { modelNumber: 'A330', manufacturer: 'Airbus', capacity: 250 },
            { modelNumber: 'B747', manufacturer: 'Boeing', capacity: 400 },
            { modelNumber: 'A220', manufacturer: 'Airbus', capacity: 100 },
            { modelNumber: 'B757', manufacturer: 'Boeing', capacity: 200 },
            { modelNumber: 'A340', manufacturer: 'Airbus', capacity: 380 },
            { modelNumber: 'B717', manufacturer: 'Boeing', capacity: 100 },
            { modelNumber: 'A310', manufacturer: 'Airbus', capacity: 200 },
            { modelNumber: 'B767', manufacturer: 'Boeing', capacity: 290 },
            { modelNumber: 'A321', manufacturer: 'Airbus', capacity: 200 },
            { modelNumber: 'B777X', manufacturer: 'Boeing', capacity: 425 },
            { modelNumber: 'A330neo', manufacturer: 'Airbus', capacity: 300 },
            { modelNumber: 'B737 MAX', manufacturer: 'Boeing', capacity: 230 },
            { modelNumber: 'A380plus', manufacturer: 'Airbus', capacity: 600 },
            { modelNumber: 'B777F', manufacturer: 'Boeing', capacity: 102 },
            { modelNumber: 'A350-900', manufacturer: 'Airbus', capacity: 325 },
            { modelNumber: 'B787-10', manufacturer: 'Boeing', capacity: 330 },
            { modelNumber: 'A321neo', manufacturer: 'Airbus', capacity: 240 },
            { modelNumber: 'B767-400ER', manufacturer: 'Boeing', capacity: 375 },
            { modelNumber: 'A330-200F', manufacturer: 'Airbus', capacity: 70 }
        ];
        airplaneModels === null || airplaneModels === void 0 ? void 0 : airplaneModels.map((airplane) => __awaiter(void 0, void 0, void 0, function* () {
            return yield prisma_1.default.airplanes.create({
                data: {
                    modelNumber: airplane.modelNumber,
                    manufacturer: airplane.manufacturer,
                    capacity: airplane.capacity,
                }
            });
        }));
        return c.json({ success: true, done: 'city' }, 200);
    }
    catch (error) {
        console.log(error);
        return c.json({ success: false, error }, 500);
    }
}));
airplane.post("create-airplane", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield c.req.json();
        // check airplanes modelNumber exists
        const airplaneModel = yield prisma_1.default.airplanes.findFirst({
            where: {
                modelNumber: body.modelNumber
            }
        });
        if (airplaneModel) {
            return c.json({ success: false, message: "Airplane already exists" }, 400);
        }
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
airplane.put("update-airplane/:id", (c) => __awaiter(void 0, void 0, void 0, function* () {
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
airplane.get("read-airplane/:id", (c) => __awaiter(void 0, void 0, void 0, function* () {
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
airplane.delete("delete-airplane/:id", (c) => __awaiter(void 0, void 0, void 0, function* () {
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
airplane.get("all-airplanes", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const airplanes = yield prisma_1.default.airplanes.findMany();
        return c.json({ success: true, airplanes }, 200);
    }
    catch (error) {
        return c.json({ success: false, error }, 500);
    }
}));
exports.default = airplane;
