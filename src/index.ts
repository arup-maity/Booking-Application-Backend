import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import dotenv from "dotenv";
import city from "./city/controller";
import adminUser from "./admin-user/controller";
import auth from "./controllers/AuthController";
import adminAirport from "./airport/adminController";
import adminAirplane from "./airplanes/adminController";
import adminFlight from "./flight/adminController";
import publicAirport from "./airport/publicController";
import publicFlight from "./flight/publicFlight";
import checkout from "./checkout/CheckoutController";
import userBooking from "./booking/bookingController";
import user from "./user/publicController";
import adminCityRouter from "./city/adminController";
import demo from "./demo/controller";
import adminBooking from "./booking/adminBookingController";
// 

dotenv.config();

const app = new Hono();
app.use(
   "/*",
   cors({
      origin: [`${process.env.ALLOWED_ORIGIN_WEB}`],
      allowMethods: ["POST", "GET", "PUT", "DELETE"],
      credentials: true
   })
);
app.get("/", c => {
   return c.text("Hello Hono!");
});

// app.use("/api/admin/*", checkAdminToken)
// auth
app.route("/api/auth", auth)
//
app.route("/api/admin/user", adminUser)
//
app.route("/api/admin/city", adminCityRouter)
app.route('/api/', city)
// airport
app.route("/api/admin/airport", adminAirport)
app.route("/api/airport", publicAirport)
//
// user
app.route("/api/user", user)
// airplanes
app.route("/api/admin/airplane", adminAirplane)
// flight
app.route("/api/admin/flight", adminFlight)
app.route("/api/flight", publicFlight)
// checkout
app.route("/api/checkout", checkout)
// bookings
app.route("/api/bookings", userBooking)
app.route("/api/admin/bookings", adminBooking)
// demo
app.route("/api/demo", demo)


const port = 8080;
console.log(`${process.env.CHECK_ENV} server is running on port ${port}`);

serve({
   fetch: app.fetch,
   port
});


