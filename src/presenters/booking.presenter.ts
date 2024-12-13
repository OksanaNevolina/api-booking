import { IBookingResponse } from "../types/booking.types";

export class BookingPresenter {
  public static bookingToResponse(booking: IBookingResponse): IBookingResponse {
    return {
      id: booking.id,
      user: booking.user,
      date: booking.date,
      startTime: booking.startTime,
      endTime: booking.endTime,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
    };
  }
}
