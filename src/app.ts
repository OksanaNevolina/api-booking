import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import * as swaggerUi from "swagger-ui-express";


import fileUpload from "express-fileupload";



import { configs } from "./configs/configs";
import { ApiError } from "./errors/api.error";
import { authRouter } from "./routers/auth.router";
import { userRouter } from "./routers/user.router";
import { adminRouter } from "./routers/admin.router";
import { runAllCronJobs } from "./crons";
import * as swaggerDocument from "./unils/swagger.json";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/users", userRouter);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
    "*",
    (err: ApiError, req: Request, res: Response, next: NextFunction) => {
        return res.status(err?.status || 500).json({
            message: err?.message,
            status: err?.status,
        });
    },
);

const PORT = configs.PORT;
app.listen(PORT, async () => {
    await mongoose.connect(configs.DB_URL);
    runAllCronJobs();
    console.log(`Server has started on PORT ${PORT}`);
});