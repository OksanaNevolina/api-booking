import { Booking } from "../models/boking.model";

export const checkBookingOverlapMiddleware = async (req, res, next) => {
  const { date, startTime, endTime } = req.body;

  const bookings = await Booking.find({ date });

  const isOverlap = bookings.some((booking) => {
    return startTime < booking.endTime && endTime > booking.startTime;
  });

  if (isOverlap) {
    return res
      .status(400)
      .json({ message: "The booking time overlaps with an existing booking." });
  }

  next();
};
