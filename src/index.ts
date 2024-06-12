import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import dotenv from "dotenv";
import airport from "./controllers/airport-controller";
import airplane from "./controllers/airplanes-controller";
import flight from "./controllers/flight-controller";
import adminUser from "./admin-user/controller";
import auth from "./auth/AuthController";
import flightController from "./flight/FlightController";
import checkout from "./checkout/CheckoutController";
import { checkAdminToken } from "./middleware";
import city from "./city/controller";
import publicAirport from "./airport/publicController";
dotenv.config();

const app = new Hono();
// app.use(
//    "/*",
//    cors({
//       origin: ['*'],
//       allowMethods: ["POST", "GET", "PUT", "DELETE"],
//       credentials: true
//    })
// );
app.get("/", c => {
   return c.text("Hello Hono!");
});

app.use("/admin/*", checkAdminToken)

app.route("/auth", auth)
app.route("/admin/user", adminUser)
app.route("/admin/city", city)
app.route("/airport", publicAirport)
// 
app.route("/admin/airport", airport)
app.route("/airport", airport)
app.route("/admin/airplane", airplane)
app.route("/admin/flight", flight)
app.route("/flight", flightController)
app.route("/checkout", checkout)

const port = 8000;
console.log(`Server is running on port ${port}`);

serve({
   fetch: app.fetch,
   port
});


