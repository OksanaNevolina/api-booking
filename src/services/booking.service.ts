import {IBooking, IBookingResponse} from "../types/booking.types";

import {bookingRepository} from "../repositore/booking.repository";
import {IQuery} from "../types/pagination.type";

 class BookingService {
     public async getMany(query:IQuery){
         const queryString = JSON.stringify(query);
         const queryObject = JSON.parse(
             queryString.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`),
         );

         return bookingRepository.getMany(queryObject);;
     }

     public async getBookingById (id: string):Promise<any> {
        return bookingRepository.getById(id)
     }

   public async createBooking (body):Promise<IBookingResponse>{

        return bookingRepository.create(body);
    }

     public async updateBooking(
         id: string,
         body: Partial<IBooking>,

     ): Promise<IBookingResponse> {
         return await bookingRepository.updateById(id, body);
     }

     public async deleteBooking (id: string):Promise<void>  {
        const isDeleted = bookingRepository.delete(id);
        if (!isDeleted) {
            throw new Error("Booking not found.");
        }
        return isDeleted;
    }
}
export const bookingService = new BookingService();