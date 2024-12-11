import { Router } from "express";




import { authMiddleware } from "../middlewares/auht.middleware";
import { UserValidator } from "../validators/user.validator";
import { ERole } from "../enums/role.enum";


const router = Router();

router.get("/", userController.getAllPaginated);

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
router.post(
    "/me/avatar",
    authMiddleware.checkAccessToken(ERole.USER),
    fileMiddleware.isAvatarValid,
    userController.uploadAvatar,
);
router.delete(
    "/me/avatar",
    authMiddleware.checkAccessToken(ERole.USER),
    userController.deleteAvatar,
);
router.get("/:id", commonMiddleware.isIdValid, userController.getById);

export const userRouter = router;