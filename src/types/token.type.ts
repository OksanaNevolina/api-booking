import { ERole } from "../enums/role.enum";

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
