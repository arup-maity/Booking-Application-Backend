"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
const cors_1 = require("hono/cors");
const dotenv_1 = __importDefault(require("dotenv"));
const UserController_1 = __importDefault(require("./controllers/admin/UserController"));
const FlightController_1 = __importDefault(require("./controllers/admin/FlightController"));
const airportController_1 = __importDefault(require("./controllers/public/airportController"));
const bookingController_1 = __importDefault(require("./controllers/booking/bookingController"));
const controller_1 = __importDefault(require("./demo/controller"));
const adminBookingController_1 = __importDefault(require("./controllers/booking/adminBookingController"));
const CityController_1 = __importDefault(require("./controllers/admin/CityController"));
const AirportController_1 = __importDefault(require("./controllers/admin/AirportController"));
const AirplaneController_1 = __importDefault(require("./controllers/admin/AirplaneController"));
const AuthController_1 = __importDefault(require("./controllers/auth/AuthController"));
const publicController_1 = __importDefault(require("./controllers/public/publicController"));
const publicFlight_1 = __importDefault(require("./controllers/public/publicFlight"));
const CheckoutController_1 = __importDefault(require("./controllers/checkout/CheckoutController"));
// 
dotenv_1.default.config();
const app = new hono_1.Hono();
app.use("/*", (0, cors_1.cors)({
    origin: [`${process.env.ALLOWED_ORIGIN_WEB}`],
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
app.route("/api/admin/user", UserController_1.default);
//
app.route("/api/admin/city", CityController_1.default);
// airport
app.route("/api/admin/airport", AirportController_1.default);
app.route("/api/airport", airportController_1.default);
//
// user
app.route("/api/user", publicController_1.default);
// airplanes
app.route("/api/admin/airplane", AirplaneController_1.default);
// flight
app.route("/api/admin/flight", FlightController_1.default);
app.route("/api/flight", publicFlight_1.default);
// checkout
app.route("/api/checkout", CheckoutController_1.default);
// bookings
app.route("/api/bookings", bookingController_1.default);
app.route("/api/admin/bookings", adminBookingController_1.default);
// demo
app.route("/api/demo", controller_1.default);
const port = 8080;
console.log(`${process.env.CHECK_ENV} server is running on port ${port}`);
(0, node_server_1.serve)({
    fetch: app.fetch,
    port
});
