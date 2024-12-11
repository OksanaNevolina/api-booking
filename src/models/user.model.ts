import { model, Schema } from "mongoose";

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
        age: {
            type: Number,
            min: 1,
            max: 55,
            required: true,
        },
        role: {
            type: String,
            enum: ERole,
            default: ERole.USER,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const User = model<IUser>("user", userSchema);