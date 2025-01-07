import { Schema, model } from "mongoose";
import { IUser } from "../types/user.type";
import { ERole } from "../enums/role.enum";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    role: {
      type: String,
      enum: ERole,
      default: ERole.USER,
    },
    password: {
      type: String,
      required: true,
    },
    bookings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = model<IUser>("User", userSchema);
