import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import * as mongoose from "mongoose";
import * as swaggerUi from "swagger-ui-express";

import { configs } from "./configs/configs";
import { ApiError } from "./errors/api.error";
import { authRouter } from "./routers/auth.router";
import { userRouter } from "./routers/user.router";
import { bookingRouter } from "./routers/bookingRouter";
import yaml from "yamljs";
import  path from "path";
import cors from 'cors';



process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const swaggerDocument = yaml.load(path.join(__dirname, 'swagger.yaml'));

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/bookings", bookingRouter);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const errorHandler: ErrorRequestHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(err?.status || 500).json({
    message: err?.message || "Internal Server Error",
    status: err?.status || 500,
  });
};

app.use("*", errorHandler);

const PORT = configs.PORT;
app.listen(PORT, async () => {
  await mongoose.connect(configs.DB_URL);
  console.log(`Server has started on PORT ${PORT}`);
});
