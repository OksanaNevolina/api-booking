import { Router } from "express";
import { authMiddleware } from "../middlewares/auht.middleware";
import { ERole } from "../enums/role.enum";
import { commonMiddleware } from "../middlewares/common.middleware";
import { bookingController } from "../controllers/bookingController";
import { BookingValidator } from "../validators/booking.validator";
import { checkBookingOverlapMiddleware } from "../middlewares/checkBookingOverlapMiddleware";

const router = Router();

router.post(
  "/",
  commonMiddleware.isBodyValid(BookingValidator.create),
  authMiddleware.checkAccessToken(ERole.USER),
  checkBookingOverlapMiddleware,
  bookingController.createBooking,
);

router.get(
  "/",
  authMiddleware.checkAccessToken(ERole.USER),
  bookingController.getAllBookingsPaginated,
);
router.get(
  "/:id",
  authMiddleware.checkAccessToken(ERole.USER),
  bookingController.getBookingById,
);

router.put(
  "/:id",
  commonMiddleware.isBodyValid(BookingValidator.update),
  authMiddleware.checkAccessToken(ERole.USER),
  bookingController.updateBooking,
);
router.delete(
  "/:id",
  authMiddleware.checkAccessToken(ERole.USER),
  bookingController.deleteBooking,
);

export const bookingRouter = router;
