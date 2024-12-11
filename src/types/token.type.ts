import { Types } from "mongoose";

import { ERole } from "../enums/role.enum";
import { EActionTokenType } from "../enums/token-type";

export interface ITokenPayload {
    userId: string;
    role: ERole;
}

export interface ITokensPair {
    accessToken: string;
    accessExpiresIn: string;
    refreshToken: string;
    refreshExpiresIn: string;
}

export interface IToken extends ITokensPair {
    _userId: string;
}

export interface IActionToken {
    actionToken: string;
    tokenType: EActionTokenType;
    _userId: Types.ObjectId;
}