import { NextFunction, Request, Response } from "express";

import { ERole } from "../enums/role.enum";

import { ApiError } from "../errors/api.error";

import { tokenService } from "../services/token.service";
import { ETokenType } from "../enums/token-type";
import { tokenRepository } from "../repositore/token.repository";

class AuthMiddleware {
  public checkAccessToken(role: ERole) {
    return async function (req: Request, res: Response, next: NextFunction) {
      try {
        const tokenString = req.get("Authorization");
        if (!tokenString) {
          throw new ApiError("No token", 401);
        }

        const accessToken = tokenString.split("Bearer ")[1];
        const jwtPayload = tokenService.checkToken(
          accessToken,
          ETokenType.ACCESS,
          role,
        );

        const entity = await tokenRepository.getOneBy({ accessToken });
        if (!entity) {
          throw new ApiError("Token not valid", 401);
        }

        req.res.locals.jwtPayload = jwtPayload;
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public checkRefreshToken(role: ERole) {
    return async function (req: Request, res: Response, next: NextFunction) {
      try {
        const tokenString = req.get("Authorization");
        if (!tokenString) {
          throw new ApiError("No token", 401);
        }

        const refreshToken = tokenString.split("Bearer ")[1];
        const jwtPayload = tokenService.checkToken(
          refreshToken,
          ETokenType.REFRESH,
          role,
        );

        const entity = await tokenRepository.getOneBy({ refreshToken });
        if (!entity) {
          throw new ApiError("Token not valid", 401);
        }

        req.res.locals.jwtPayload = jwtPayload;
        req.res.locals.refreshToken = refreshToken;
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const authMiddleware = new AuthMiddleware();
