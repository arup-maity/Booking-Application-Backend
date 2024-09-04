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
const zod_validator_1 = require("@hono/zod-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../config/prisma"));
const SchemaValidation_1 = require("./SchemaValidation");
const adminUser = new hono_1.Hono();
adminUser.post("/create-user", (0, zod_validator_1.zValidator)('json', SchemaValidation_1.userSchema), (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield c.req.json();
        // check email exists
        const email = yield prisma_1.default.adminUser.findUnique({
            where: {
                email: body.email
            }
        });
        if (email) {
            return c.json({ success: false, message: "Email already exists" }, 409);
        }
        //
        const salt = bcrypt_1.default.genSaltSync(16);
        const hashPassword = bcrypt_1.default.hashSync(body.password, salt);
        // create admin user
        const adminUser = yield prisma_1.default.adminUser.create({
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                role: body.role,
                adminUserAuth: {
                    create: { password: hashPassword, method: 'password' }
                }
            }
        });
        return c.json({ success: true, adminUser }, 200);
    }
    catch (error) {
        console.log('Error creating admin user', error);
        return c.json({ success: false, error: error }, 500);
    }
}));
adminUser.delete("/delete-user/:id", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = c.req.param("id");
        const adminUser = yield prisma_1.default.adminUser.delete({
            where: {
                id: +id
            }
        });
        return c.json({ success: true, adminUser }, 200);
    }
    catch (error) {
        return c.json({ success: false, error: error }, 500);
    }
}));
adminUser.post("/delete-users/multiple", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield c.req.json();
        const adminUsers = yield prisma_1.default.adminUser.deleteMany({
            where: {
                id: { in: body.rows }
            }
        });
        return c.json({ success: true, adminUsers }, 200);
    }
    catch (error) {
        return c.json({ success: false, error: error }, 500);
    }
}));
adminUser.get("/all-users", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 25, search = '', role = '', column = 'createdAt', sortOrder = 'desc' } = c.req.query();
        const conditions = {};
        if (search) {
            conditions.OR = [
                { email: { contains: search, mode: "insensitive" } },
                { firstName: { contains: search, mode: "insensitive" } },
                { lastName: { contains: search, mode: "insensitive" } },
                // Add more columns for full-text search as needed
            ];
        }
        if (role && role !== 'all') {
            conditions.role = role;
        }
        const query = {};
        if (column && sortOrder) {
            query.orderBy = { [column]: sortOrder };
        }
        const users = yield prisma_1.default.adminUser.findMany(Object.assign({ where: conditions, take: +limit, skip: (+page - 1) * +limit }, query));
        const count = yield prisma_1.default.adminUser.count({
            where: conditions
        });
        return c.json({ success: true, users, count }, 200);
    }
    catch (error) {
        console.log('error', error);
        return c.json({ success: false, error: error }, 500);
    }
}));
adminUser.put("/update-user-role", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield c.req.json();
        const adminUser = yield prisma_1.default.adminUser.update({
            where: {
                id: body.id
            },
            data: {
                role: body.role
            }
        });
        return c.json({ success: true, adminUser }, 200);
    }
    catch (error) {
        return c.json({ success: false, error: error }, 500);
    }
}));
exports.default = adminUser;
