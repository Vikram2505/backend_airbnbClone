import express from "express";
import userRouter from "./routes/user.js";
import homesRouter from "./routes/homes.js";
import connectDB from "./config/db.js";
import morgan from "morgan";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import fs from "fs";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";

const app = express();

// body parser is use to get form value
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const customCss = fs.readFileSync(process.cwd() + "/swagger.css", "utf8");
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
// NODE.JS application PORT
const PORT = 3000;

// Body parser to receive user data
app.use(morgan("dev")); //to show api hit url in node console
app.use(express.static("uploads"));

app.use(express.json({ limit: "30mb", extended: true })); //to show/receive req body in console

// Connect database function
connectDB();

// Swagger Api documentation Option
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Airbnb API",
      version: "1.0.1",
      description: "An Express Library API",
      contact: {
        name: "Vikram Rambhad",
        email: "vikramrambhad25@gmail.com",
        url: "https://aboutvikram.vercel.app/"
      },
      // license: {
      //   name: "Apache 2.0",
      //   url: "http://www.apache.org/licenses/LICENSE-2.0.html",
      // },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
    },
    security: {
      bearerAuth: [],
    },
    servers: [
      {
        url: "http://localhost:3000",
        // url: 'https://backend-airbnb-clone.vercel.app'
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJSDoc(options);

// Routes for API
app.get("/", (req, res) => {
  res.send(
    ` <div style="text-align: center">
        <h1>API Document availabe here at  <a href="/api-docs"> URL</a> </h1>
      </div>
    `
  );
});
app.use("/user", userRouter);
app.use("/home", homesRouter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs, { customCss }));

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT} ✅✅✅`
  )
);
