import { NextFunction, Request, Response } from "express";
import { bookingService } from "../services/booking.service";
import { IQuery } from "../types/pagination.type";
import { BookingPresenter } from "../presenters/booking.presenter";
import { IBooking } from "../types/booking.types";

class BookingController {
  public async getAllBookingsPaginated(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const bookingsPaginated = await bookingService.getMany(
        req.query as IQuery,
      );
      const presentedBooking = bookingsPaginated.data.map((booking) =>
        BookingPresenter.bookingToResponse(booking),
      );

      return res.json({ ...bookingsPaginated, data: presentedBooking });
    } catch (e) {
      next(e);
    }
  }

  public async getBookingById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const booking = await bookingService.getBookingById(id);
      if (!booking) {
        res.status(404).json({ message: "Booking not found." });
      } else {
        res.status(200).json(BookingPresenter.bookingToResponse(booking));
      }
    } catch (error) {
      next(error);
    }
  }

  public async createBooking(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = req.body as Partial<IBooking>;

      const booking = await bookingService.createBooking(body);

      res.status(201).json(BookingPresenter.bookingToResponse(booking));
    } catch (error: any) {
      if (error.name === "ValidationError") {
        res.status(400).json({ message: error.message });
      } else {
        next(error);
      }
    }
  }
  public async updateBooking(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const body = req.body as Partial<IBooking>;
      const updatedBooking = await bookingService.updateBooking(id, body);

      if (!updatedBooking) {
        res.status(404).json({ message: "Booking not found." });
      } else {
        res.status(200).json(BookingPresenter.bookingToResponse(updatedBooking));
      }
    } catch (error) {
      next(error);
    }
  }
  public async deleteBooking(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await bookingService.deleteBooking(id);
      res.json({ message: "Booking deleted successfully." });
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
}
export const bookingController = new BookingController();
