import { Router } from "express";

import { authMiddleware } from "../middlewares/auht.middleware";
import { UserValidator } from "../validators/user.validator";
import { ERole } from "../enums/role.enum";
import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";

const router = Router();

// router.get("/", userController.getAllPaginated);

router.get(
  "/me",
  authMiddleware.checkAccessToken(ERole.USER),
  userController.getMe,
);

router.put(
  "/me",
  commonMiddleware.isBodyValid(UserValidator.update),
  authMiddleware.checkAccessToken(ERole.USER),
  userController.updateMe,
);
router.delete(
  "/me",
  authMiddleware.checkAccessToken(ERole.USER),
  userController.deleteMe,
);

export const userRouter = router;
