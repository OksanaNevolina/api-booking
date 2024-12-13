export interface IBooking extends Document {
    user: string;
    date: Date;
    startTime: string;
    endTime: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface IBookingResponse {
    id: string;
    user: string;
    date: string;
    startTime: string;
    endTime: string;
    createdAt: Date;
    updatedAt: Date;
}