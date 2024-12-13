import express, {ErrorRequestHandler, NextFunction, Request, Response} from "express";
import * as mongoose from "mongoose";

import {configs} from "./configs/configs";
import { ApiError } from "./errors/api.error";
import { authRouter } from "./routers/auth.router";
import { userRouter } from "./routers/user.router";
import {bookingRouter} from "./routers/bookingRouter";


process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/bookings", bookingRouter);


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
    // runAllCronJobs();
    console.log(`Server has started on PORT ${PORT}`);
});