import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import dotenv from "dotenv";
import adminUser from "./controllers/admin/UserController";
import adminFlight from "./controllers/admin/FlightController";
import userBooking from "./controllers/booking/bookingController";
import demo from "./demo/controller";
import adminBooking from "./controllers/booking/adminBookingController";
import adminCityRouter from "./controllers/admin/CityController";
import adminAirport from "./controllers/admin/AirportController";
import adminAirplane from "./controllers/admin/AirplaneController";
import auth from "./controllers/auth/AuthController";
import user from "./controllers/public/publicController";
import publicFlight from "./controllers/public/publicFlight";
import checkout from "./controllers/checkout/CheckoutController";
import publicAirport from "./controllers/airport/public-airport";
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


const port = Number(process.env.PORT || 8080);
console.log(`${process.env.CHECK_ENV} server is running on port ${port}`);

serve({
   fetch: app.fetch,
   port
});


