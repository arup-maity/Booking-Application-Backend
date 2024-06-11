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
adminUser.post("create-user", (0, zod_validator_1.zValidator)('json', SchemaValidation_1.userSchema), (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield c.req.json();
        // check email exists
        const email = yield prisma_1.default.adminUser.findUnique({
            where: {
                email: body.email
            }
        });
        if (email) {
            return c.json({ success: false, message: "Email already exists" }, 400);
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
                AdminUserAuth: {
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
adminUser.put("/update-user", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield c.req.json();
        const adminUser = yield prisma_1.default.adminUser.update({
            where: {
                id: body.id
            },
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email
            }
        });
        return c.json({ success: true, adminUser }, 200);
    }
    catch (error) {
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
adminUser.get("all-users", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminUsers = yield prisma_1.default.adminUser.findMany();
        return c.json({ success: true, adminUsers }, 200);
    }
    catch (error) {
        return c.json({ success: false, error: error }, 500);
    }
}));
exports.default = adminUser;