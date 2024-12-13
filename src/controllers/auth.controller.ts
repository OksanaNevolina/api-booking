import { NextFunction, Request, Response } from "express";

import { ILogin } from "../types/auth.type";
import { IUser } from "../types/user.type";
import { authService } from "../services/auht.service";
import { ITokenPayload } from "../types/token.type";

class AuthController {
  public async signUpAdmin(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const body = req.body as Partial<IUser>;
      const createdUser = await authService.signUpAdmin(body);

      return res.json({ data: createdUser });
    } catch (e) {
      next(e);
    }
  }

  public async signInAdmin(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const body = req.body as ILogin;
      const jwtTokens = await authService.signInAdmin(body);

      return res.json({ data: jwtTokens });
    } catch (e) {
      next(e);
    }
  }

  public async signUp(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const body = req.body as Partial<IUser>;
      const createdUser = await authService.signUp(body);

      return res.json({ data: createdUser });
    } catch (e) {
      next(e);
    }
  }

  public async signIn(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const body = req.body as ILogin;
      const jwtTokens = await authService.signIn(body);

      return res.json({ data: jwtTokens });
    } catch (e) {
      next(e);
    }
  }

  public async refresh(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      const refreshToken = req.res.locals.refreshToken as string;

      const jwtTokens = await authService.refresh(jwtPayload, refreshToken);

      return res.json({ data: jwtTokens });
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
