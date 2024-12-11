import * as jwt from "jsonwebtoken";


import { ERole } from "../enums/role.enum";
import { ApiError } from "../errors/api.error";
import { configs } from "../configs/configs";
import { EActionTokenType, ETokenType } from "../enums/token-type";
import { ITokenPayload, ITokensPair } from "../types/token.type";



class TokenService {
    public generateTokenPair(payload: ITokenPayload, role: ERole): ITokensPair {
        let accessTokenSecret: string;
        let accessExpiresIn: string;
        let refreshTokenSecret: string;
        let refreshExpiresIn: string;

        switch (role) {
            case ERole.USER:
                accessTokenSecret = configs.JWT_ACCESS_SECRET;
                accessExpiresIn = configs.JWT_ACCESS_EXPIRES_IN;
                refreshTokenSecret = configs.JWT_REFRESH_SECRET;
                refreshExpiresIn = configs.JWT_REFRESH_EXPIRES_IN;
                break;
            case ERole.ADMIN:
                accessTokenSecret = configs.JWT_ADMIN_ACCESS_SECRET;
                accessExpiresIn = configs.JWT_ADMIN_ACCESS_EXPIRES_IN;
                refreshTokenSecret = configs.JWT_ADMIN_REFRESH_SECRET;
                refreshExpiresIn = configs.JWT_ADMIN_REFRESH_EXPIRES_IN;
                break;
        }

        const accessToken = jwt.sign(payload, accessTokenSecret, {
            expiresIn: accessExpiresIn,
        });
        const refreshToken = jwt.sign(payload, refreshTokenSecret, {
            expiresIn: refreshExpiresIn,
        });

        return {
            accessToken,
            accessExpiresIn,
            refreshToken,
            refreshExpiresIn,
        };
    }

    public checkToken(
        token: string,
        type: ETokenType,
        role: ERole,
    ): ITokenPayload {
        switch (role) {
            case ERole.ADMIN:
                return this.checkTokenAdmin(token, type);
            case ERole.USER:
                return this.checkTokenUser(token, type);
        }
    }

    private checkTokenUser(token: string, type: ETokenType): ITokenPayload {
        try {
            let secret: string;

            switch (type) {
                case ETokenType.ACCESS:
                    secret = configs.JWT_ACCESS_SECRET;
                    break;
                case ETokenType.REFRESH:
                    secret = configs.JWT_REFRESH_SECRET;
                    break;
            }
            return jwt.verify(token, secret) as ITokenPayload;
        } catch (e) {
            throw new ApiError("Token not valid", 401);
        }
    }

    private checkTokenAdmin(token: string, type: ETokenType): ITokenPayload {
        try {
            let secret: string;

            switch (type) {
                case ETokenType.ACCESS:
                    secret = configs.JWT_ADMIN_ACCESS_SECRET;
                    break;
                case ETokenType.REFRESH:
                    secret = configs.JWT_ADMIN_REFRESH_SECRET;
                    break;
            }
            return jwt.verify(token, secret) as ITokenPayload;
        } catch (e) {
            throw new ApiError("Token not valid", 401);
        }
    }

    public checkActionToken(actionToken: string, type: EActionTokenType) {
        try {
            let secret: string;

            switch (type) {
                case EActionTokenType.FORGOT:
                    secret = configs.JWT_FORGOT_ACTION_SECRET;
                    break;
                case EActionTokenType.ACTIVATE:
                    secret = configs.JWT_ACTION_ACTIVATE_SECRET;
                    break;
                default:
                    throw new ApiError("checkActionToken error", 500);
            }

            return jwt.verify(actionToken, secret) as ITokenPayload;
        } catch (e) {
            throw new ApiError("Token not valid", 401);
        }
    }

    public createActionToken(
        payload: ITokenPayload,
        tokenType: EActionTokenType,
    ) {
        let secret: string;

        switch (tokenType) {
            case EActionTokenType.FORGOT:
                secret = configs.JWT_FORGOT_ACTION_SECRET;
                break;
            case EActionTokenType.ACTIVATE:
                secret = configs.JWT_ACTION_ACTIVATE_SECRET;
                break;
            default:
                throw new ApiError("checkActionToken error", 500);
        }

        return jwt.sign(payload, secret, {
            expiresIn: configs.JWT_ACTION_EXPIRES_IN,
        });
    }
}

export const tokenService = new TokenService();