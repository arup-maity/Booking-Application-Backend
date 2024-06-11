"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
const cors_1 = require("hono/cors");
const dotenv_1 = __importDefault(require("dotenv"));
const city_controller_1 = __importDefault(require("./controllers/city-controller"));
const airport_controller_1 = __importDefault(require("./controllers/airport-controller"));
const airplanes_controller_1 = __importDefault(require("./controllers/airplanes-controller"));
const flight_controller_1 = __importDefault(require("./controllers/flight-controller"));
const controller_1 = __importDefault(require("./admin-user/controller"));
const AuthController_1 = __importDefault(require("./auth/AuthController"));
const FlightController_1 = __importDefault(require("./flight/FlightController"));
const CheckoutController_1 = __importDefault(require("./checkout/CheckoutController"));
dotenv_1.default.config();
const app = new hono_1.Hono();
app.use("/*", (0, cors_1.cors)({
    origin: [process.env.ALLOWED_ORIGIN_WEB || "http://localhost:3001"],
    allowMethods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));
app.get("/", c => {
    return c.text("Hello Hono!");
});
app.route("/auth", AuthController_1.default);
app.route("/admin/user", controller_1.default);
app.route("/admin/city", city_controller_1.default);
app.route("/admin/airport", airport_controller_1.default);
app.route("/airport", airport_controller_1.default);
app.route("/admin/airplane", airplanes_controller_1.default);
app.route("/admin/flight", flight_controller_1.default);
app.route("/flight", FlightController_1.default);
app.route("/checkout", CheckoutController_1.default);
const port = 5000;
console.log(`Server is running on port ${port}`);
(0, node_server_1.serve)({
    fetch: app.fetch,
    port
});
