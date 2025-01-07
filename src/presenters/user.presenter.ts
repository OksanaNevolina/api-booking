import {  IUserRes } from "../types/user.type";

export class UserPresenter {
  public static userToResponse(user: IUserRes) {
    return {
      id: user.id,
      nameUser: user.name,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
    };
  }
}
