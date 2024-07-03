"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
const cors_1 = require("hono/cors");
const dotenv_1 = __importDefault(require("dotenv"));
const controller_1 = __importDefault(require("./city/controller"));
const controller_2 = __importDefault(require("./admin-user/controller"));
const AuthController_1 = __importDefault(require("./auth/AuthController"));
const adminController_1 = __importDefault(require("./airport/adminController"));
const adminController_2 = __importDefault(require("./airplanes/adminController"));
const adminController_3 = __importDefault(require("./flight/adminController"));
const publicController_1 = __importDefault(require("./airport/publicController"));
const publicFlight_1 = __importDefault(require("./flight/publicFlight"));
const CheckoutController_1 = __importDefault(require("./checkout/CheckoutController"));
const bookingController_1 = __importDefault(require("./booking/bookingController"));
const publicController_2 = __importDefault(require("./user/publicController"));
const adminController_4 = __importDefault(require("./city/adminController"));
const controller_3 = __importDefault(require("./demo/controller"));
// 
dotenv_1.default.config();
const app = new hono_1.Hono();
app.use("/*", (0, cors_1.cors)({
    origin: [`${process.env.ALLOWED_ORIGIN_WEB}`, 'https://flight-booking-nu.vercel.app'],
    allowMethods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));
app.get("/", c => {
    return c.text("Hello Hono!");
});
// app.use("/api/admin/*", checkAdminToken)
// auth
app.route("/api/auth", AuthController_1.default);
//
app.route("/api/admin", controller_2.default);
//
app.route("/api/admin/city", adminController_4.default);
app.route('/api/', controller_1.default);
// airport
app.route("/api/admin/airport", adminController_1.default);
app.route("/api/airport", publicController_1.default);
//
// user
app.route("/api/user", publicController_2.default);
// airplanes
app.route("/api/admin/airplane", adminController_2.default);
// flight
app.route("/api/admin/flight", adminController_3.default);
app.route("/api/flight", publicFlight_1.default);
// checkout
app.route("/api/checkout", CheckoutController_1.default);
// bookings
app.route("/api/bookings", bookingController_1.default);
// demo
app.route("/api/demo", controller_3.default);
const port = 8000;
console.log(`Server is running on port ${port}`);
(0, node_server_1.serve)({
    fetch: app.fetch,
    port
});
