import {NextFunction, Request, Response} from "express";
import { bookingService } from "../services/booking.service";
import {IQuery} from "../types/pagination.type";
import {BookingPresenter} from "../presenters/booking.presenter";
import {IBooking} from "../types/booking.types";



class BookingController {

    public async getAllBookingsPaginated(
        req: Request,
        res: Response,
        next: NextFunction,
    ):Promise<any> {
        try {
            const bookingsPaginated = await bookingService.getMany(req.query as IQuery);
            const presentedBooking = bookingsPaginated.data.map((booking) =>
                BookingPresenter.bookingToResponse(booking),
            );

            return res.json({ ...bookingsPaginated, data: presentedBooking });
        } catch (e) {
            next(e);
        }
    }


    public async getBookingById (req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const booking = await bookingService.getBookingById(id);
        if (!booking) {
            res.status(404).json({ message: "Booking not found." });
        } else {
            res.json(booking);
        }
    }

    public async  createBooking (req: Request, res: Response): Promise<any>    {
        try {
            const body = req.body as Partial<IBooking>;
            const booking = await bookingService.createBooking(body);
            res.status(201).json(booking);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
    public async updateBooking(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;

            const body = req.body as Partial<IBooking>;

            const user = await bookingService.updateBooking(id,body);

            res.status(201).json(user);
        } catch (e) {
            next(e);
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