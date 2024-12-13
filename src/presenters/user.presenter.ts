import { IUser } from "../types/user.type";

export class UserPresenter {
  public static userToResponse(user: IUser) {
    return {
      nameUser: user.name,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
    };
  }
}
