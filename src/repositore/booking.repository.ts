import {IBooking, IBookingResponse} from "../types/booking.types";
import {IPaginationResponse, IQuery} from "../types/pagination.type";
import {Booking} from "../models/boking.model";


class BookingRepository {
    public async getMany(query: IQuery): Promise<IPaginationResponse<any>> {
        const {
            page = 1,
            limit = 10,
            sortedBy = "createdAt",
            ...searchObject
        } = query;

        const skip = +limit * (+page - 1);

        const bookings = await Booking.find(searchObject)
            .sort(sortedBy)
            .limit(limit)
            .skip(skip);

        const itemsFound = await Booking.countDocuments(searchObject);

        return {
            page: +page,
            limit: +limit,
            itemsFound,
            data: bookings,
        };
    }

    public async getById (id: string): Promise<IBooking >{
        return Booking.findOne({ _id: id })
    }

    public async create(booking: IBooking): Promise<any> {

        try {
            return   await Booking.create(booking);
        } catch (error) {
            throw new Error(`Error creating booking: ${error.message}`);
        }
    }
    public async updateById(id:string, body: Partial<IBooking>): Promise<IBookingResponse> {
        return  Booking.findByIdAndUpdate(id, body, { returnDocument: "after" });
    }


    public async delete (id: string)  {
        await Booking.deleteOne({ _id: id });
    }

}
export const bookingRepository = new BookingRepository();