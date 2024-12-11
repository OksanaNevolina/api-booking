import { IUser } from "../types/user.type";

export class UserPresenter {
    public static userToResponse(user: IUser) {
        return {
            nameUser: user.name,
            email: user.email,
            age: user.age,
            isVerified: user.isVerified,
            role: user.role,
            createdAt: user.createdAt,
        };
    }
}