import { Types } from "mongoose";

export interface IBooking extends Document {
  user: string;
  date: Date;
  startTime: string;
  endTime: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBookingResponse {
  id: string;
  user: string;
  date: string;
  startTime: string;
  endTime: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
