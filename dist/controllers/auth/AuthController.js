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
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../../config/prisma"));
const auth = new hono_1.Hono();
auth.post("/admin/login", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield c.req.json();
        const user = yield prisma_1.default.adminUser.findFirst({
            where: {
                email: body.email
            },
            include: {
                adminUserAuth: true
            }
        });
        if (!user)
            return c.json({ success: false, message: 'User not found' }, 409);
        const isPasswordValid = yield bcrypt_1.default.compareSync(body.password, user === null || user === void 0 ? void 0 : user.adminUserAuth.password);
        if (!isPasswordValid)
            return c.json({ success: false, message: 'Email and Password not match' });
        const payload = {
            id: user === null || user === void 0 ? void 0 : user.id,
            name: `${(user === null || user === void 0 ? void 0 : user.firstName) + ' ' + (user === null || user === void 0 ? void 0 : user.lastName)}`,
            role: user === null || user === void 0 ? void 0 : user.role,
            accessPurpose: 'admin',
            purpose: 'login',
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 6, // Token expires in 5 minutes
        };
        const token = yield (0, jwt_1.sign)(payload, process.env.JWT_SECRET);
        // Regular cookies
        (0, cookie_1.setCookie)(c, 'token', token, {
            domain: process.env.ENVIRONMENT === 'production' ? '.arupmaity.in' : 'localhost',
            path: '/',
            secure: true,
            httpOnly: false,
            sameSite: 'Strict',
            maxAge: 30 * 24 * 60 * 60,
        });
        return c.json({ success: true, login: true, payload }, 200);
    }
    catch (error) {
        console.log('error', error);
        return c.json({ message: error.message }, 500);
    }
}));
auth.post("/user/register", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield c.req.json();
        const user = yield prisma_1.default.users.findUnique({
            where: { email: body.email }
        });
        if (user)
            return c.json({ success: false, message: 'User already exists' }, 409);
        const hashedPassword = bcrypt_1.default.hashSync(body.password, 10);
        const newUser = yield prisma_1.default.users.create({
            data: {
                fullName: body.fullName,
                email: body.email,
                userAuth: {
                    create: {
                        password: hashedPassword,
                        method: 'password'
                    }
                }
            }
        });
        if (!newUser)
            return c.json({ success: false, message: 'Not create the account' }, 409);
        const payload = {
            id: newUser === null || newUser === void 0 ? void 0 : newUser.id,
            name: newUser === null || newUser === void 0 ? void 0 : newUser.fullName,
            role: 'user',
            purpose: 'login',
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 6, // Token expires in 5 minutes
        };
        const token = yield (0, jwt_1.sign)(payload, process.env.JWT_SECRET);
        // Regular cookies
        (0, cookie_1.setCookie)(c, 'token', token, {
            domain: process.env.ENVIRONMENT === 'production' ? '.arupmaity.in' : 'localhost',
            path: '/',
            secure: true,
            httpOnly: process.env.ENVIRONMENT === 'production' ? true : false,
            sameSite: 'Strict',
            maxAge: 30 * 24 * 60 * 60, // Set maxAge in seconds (30 days)
        });
        return c.json({ success: true, newUser }, 200);
    }
    catch (error) {
        console.log('Error creating', error);
        return c.json({ success: false, error: error }, 500);
    }
}));
auth.post("/user/login", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield c.req.json();
        const user = yield prisma_1.default.users.findFirst({
            where: {
                email: body.email
            },
            include: {
                userAuth: true
            }
        });
        if (!user)
            return c.json({ success: false, login: false, message: 'User not found' }, 200);
        const isPasswordValid = bcrypt_1.default.compareSync(body.password, user === null || user === void 0 ? void 0 : user.userAuth.password);
        if (!isPasswordValid)
            return c.json({ success: false, login: false, message: 'Email and Password not match' }, 200);
        const payload = {
            id: user === null || user === void 0 ? void 0 : user.id,
            name: user === null || user === void 0 ? void 0 : user.fullName,
            role: 'user',
            purpose: 'login',
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 6, // Token expires in 5 minutes
        };
        const token = yield (0, jwt_1.sign)(payload, process.env.JWT_SECRET);
        // Regular cookies
        (0, cookie_1.setCookie)(c, 'token', token, {
            domain: process.env.ENVIRONMENT === 'production' ? '.arupmaity.in' : 'localhost',
            path: '/',
            secure: true,
            httpOnly: false,
            sameSite: 'Strict',
            maxAge: 30 * 24 * 60 * 60, // Set maxAge in seconds (30 days)
        });
        return c.json({
            success: true,
            login: true,
            user: {
                id: user === null || user === void 0 ? void 0 : user.id,
                name: user === null || user === void 0 ? void 0 : user.fullName,
                role: 'user',
                accessPurpose: 'user',
                purpose: 'login',
            }
        }, 200);
    }
    catch (error) {
        return c.json({ success: false, error: error }, 500);
    }
}));
auth.get('check-auth', (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cookie_token = (0, cookie_1.getCookie)(c, 'token');
        function getToken() {
            const { authorization } = c.req.header();
            if (!authorization || !authorization.startsWith('Bearer ')) {
                return c.json({ login: false, message: 'token not found' }, 200);
            }
            return authorization.split(' ')[1];
        }
        const token = cookie_token || getToken();
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
exports.default = auth;
