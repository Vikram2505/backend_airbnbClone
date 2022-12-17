import express from "express";
import userRouter from "./routes/user.js";
import homesRouter from "./routes/homes.js";
import connectDB from "./config/db.js";
import morgan from "morgan";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
const app = express();

// NODE.JS application PORT
const PORT = 3000;

// Body parser to receive user data
app.use(morgan("dev")); //to show api hit url in node console
app.use(express.json({ limit: "30mb", extended: true })); //to show/receive req body in console

// Connect database function
connectDB();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Airbnb API",
      version: "1.0.1",
      description: "An Express Library API",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        }
      }
    },
    security: {
      bearerAuth: [],
    },
    servers: [
      {
        url: "https://backend-airbnb-clone.vercel.app",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const specs = swaggerJSDoc(options);

// Routes for API
app.use("/user", userRouter);
app.use("/home", homesRouter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.listen(PORT, console.log(`Server is running on port ${PORT} ✅✅✅`));
