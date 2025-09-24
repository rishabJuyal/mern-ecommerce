const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRouter = require("./src/modules/auth/auth.routes");
const userRouter = require("./src/modules/user/user.route");
const productRouter = require("./src/modules/product/product.routes");
const orderRouter = require("./src/modules/order/order.routes");
const cartRouter = require("./src/modules/cart/cart.routes");
const ratingRouter = require("./src/modules/rating/rating.routes");

const connectDB = require("./src/config/db");
const { stripeWebhook } = require("./src/modules/order/order.controller");

const app = express();
connectDB();
app.use(cookieParser());
const allowedOrigins = [
    "http://localhost:5173",
    "http://192.168.137.1:5173",
    "http://192.168.147.127:5173", // ← Add your second IP here
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // if you're using cookies
  }));
// Stripe Webhook must come BEFORE `express.json()` for raw body to work
app.post("/webhook", express.raw({ type: 'application/json' }), stripeWebhook);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/users',userRouter);
app.use('/api/auth',authRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/cart", cartRouter);
app.use("api/rating",ratingRouter)

module.exports = app;