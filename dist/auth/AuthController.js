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
const jwt_1 = require("hono/jwt");
const cookie_1 = require("hono/cookie");
const zod_validator_1 = require("@hono/zod-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../config/prisma"));
const SchemaValidation_1 = require("./SchemaValidation");
const auth = new hono_1.Hono();
auth.post("/admin/login", (0, zod_validator_1.zValidator)('json', SchemaValidation_1.loginSchema), (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield c.req.json();
        const user = yield prisma_1.default.adminUser.findFirst({
            where: {
                email: body.email
            },
            include: {
                AdminUserAuth: true
            }
        });
        if (!user)
            return c.json({ success: false, message: 'User not found' });
        const isPasswordValid = yield bcrypt_1.default.compareSync(body.password, user === null || user === void 0 ? void 0 : user.AdminUserAuth.password);
        if (!isPasswordValid)
            return c.json({ success: false, message: 'Email and Password not match' });
        const payload = {
            id: user === null || user === void 0 ? void 0 : user.id,
            role: user === null || user === void 0 ? void 0 : user.role,
            accessPurpose: 'admin',
            purpose: 'login',
            exp: Math.floor(Date.now() / 1000) + 60 * 60, // Token expires in 5 minutes
        };
        const token = yield (0, jwt_1.sign)(payload, process.env.JWT_SECRET);
        // Regular cookies
        (0, cookie_1.setCookie)(c, 'token', token, {
            path: '/',
            secure: true,
            httpOnly: true,
            sameSite: 'Strict',
        });
        return c.json({ success: true, login: true }, 200);
    }
    catch (error) {
        return c.json({ message: error.message }, 500);
    }
}));
auth.get('check-login', (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization } = c.req.header();
        if (!authorization || !authorization.startsWith('Bearer ')) {
            return c.json({ login: false, message: 'token not found' }, 200);
        }
        const token = authorization.split(' ')[1];
        const tokenVerify = yield (0, jwt_1.verify)(token, process.env.JWT_SECRET);
        if (!tokenVerify)
            return c.json({ login: false, message: "token is not valid" }, 409);
        if (tokenVerify.purpose !== 'login')
            return c.json({ login: false, message: 'this token not for login purpose' }, 409);
        return c.json({ success: true, login: true, payload: tokenVerify }, 200);
    }
    catch (error) {
        return c.json({ login: false, error: error }, 500);
    }
}));
auth.get('check-auth', (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get token
        const token = (0, cookie_1.getCookie)(c, 'token');
        if (!token)
            return c.json({ success: false, message: 'Token not found' }, 409);
        // token vaerificate
        const tokenVerify = yield (0, jwt_1.verify)(token, process.env.JWT_SECRET);
        if (!tokenVerify)
            return c.json({ success: false, message: "token is not valid" }, 409);
        if (tokenVerify.purpose !== 'login')
            return c.json({ success: false, message: '' }, 409);
        return c.json({ success: true, payload: tokenVerify }, 200);
    }
    catch (error) {
        return c.json({ success: false, message: 'token is expire' }, 500);
    }
}));
exports.default = auth;