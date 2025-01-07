import { NextFunction, Request, Response } from "express";

import { IUser } from "../types/user.type";
import { userService } from "../services/user.services";
import { ITokenPayload } from "../types/token.type";
import { UserPresenter } from "../presenters/user.presenter";


class UserController {

  public async getMe(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;

      const user = await userService.getMe(jwtPayload);

      res.json({ data: UserPresenter.userToResponse(user) });
    } catch (e) {
      next(e);
    }
  }

  public async updateMe(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      const body = req.body as Partial<IUser>;

      const user = await userService.updateMe(jwtPayload, body);

      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }

  public async deleteMe(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;

      await userService.deleteMe(jwtPayload);

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
