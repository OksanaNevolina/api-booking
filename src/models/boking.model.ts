import { IBooking } from "../types/booking.types";
import { model, Schema } from "mongoose";

const bookingSchema = new Schema<IBooking>(
  {
    user: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
      match: /^\d{2}:\d{2}$/, // Формат hh:mm
    },
    endTime: {
      type: String,
      required: true,
      match: /^\d{2}:\d{2}$/, // Формат hh:mm
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.index({ date: 1, startTime: 1, endTime: 1 }, { unique: true });

export const Booking = model<IBooking>("Booking", bookingSchema);
