import { Router } from "express";
import { authMiddleware } from "../middlewares/auht.middleware";
import { authController } from "../controllers/auth.controller";
import {commonMiddleware, userMiddleware} from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";
import { ERole } from "../enums/role.enum";


const router = Router();

router.post(
    "/admin/sign-up",
    commonMiddleware.isBodyValid(UserValidator.create),
    authController.signUpAdmin,
);
router.post(
    "/admin/sign-in",
    commonMiddleware.isBodyValid(UserValidator.login),
    authController.signInAdmin,
);

router.post(
    "/sign-up",
    commonMiddleware.isBodyValid(UserValidator.create),
    authController.signUp,
);
router.post(
    "/sign-in",
    commonMiddleware.isBodyValid(UserValidator.login),
    authController.signIn,
);

router.post(
    "/refresh",
    authMiddleware.checkRefreshToken(ERole.USER),
    authController.refresh,
);

router.post(
    "/forgot-password",
    commonMiddleware.isBodyValid(UserValidator.forgotPassword),
    userMiddleware.isUserExist("email"),
    authController.forgotPassword,
);

router.put(
    "/forgot-password/:token",
    commonMiddleware.isBodyValid(UserValidator.setForgotPassword),
    authController.setForgotPassword,
);

router.put("/verify/:token", authController.verify);

router.post(
    "/change-password",
    commonMiddleware.isBodyValid(UserValidator.changePassword),
    authMiddleware.checkAccessToken(ERole.USER),
    authController.changePassword,
);

export const authRouter = router;