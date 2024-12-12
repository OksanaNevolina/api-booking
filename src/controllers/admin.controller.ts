import { NextFunction, Request, Response } from "express";

class AdminController {
    public async getAdmins(req: Request, res: Response, next: NextFunction):Promise<any> {
        try {
            const admins = [];

            return res.json({ data: admins });
        } catch (e) {
            next(e);
        }
    }
}

export const adminController = new AdminController();