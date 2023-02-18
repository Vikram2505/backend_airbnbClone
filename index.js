import express from "express";
import morgan from "morgan";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import fs from "fs";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import userRouter from "./routes/user.js";
import homesRouter from "./routes/homes.js";
import connectDB from "./config/db.js";
import options from "./config/swagger.js";

const app = express();

// NODE.JS application PORT
const PORT = 3000;

// body parser is use to get form value
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json());

const customCss = fs.readFileSync(process.cwd() + "/swagger.css", "utf8");

// it is used for upload file from local storage
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// var corsOptions = {
//   origin: "http://localhost:3001",
//   credentials: true,
// };

// Body parser to receive user data
app.use(morgan("dev")); //to show api hit url in node console
app.use(express.static("uploads"));
// app.use(cors(corsOptions));
app.use(express.json({ limit: "30mb", extended: true })); //to show/receive req body in console

// Connect database function
connectDB();

const specs = swaggerJSDoc(options);
// Prevent API from CORS errors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"),
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

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

// Error handling for all routes
app.use((req, res, next) => {
  const error = new Error("Method not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT} ✅✅✅`
  )
);
