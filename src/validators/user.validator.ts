import * as joi from "joi";
import { regexConstant } from "../constants/regex.constant";
export class UserValidator {
  private static password = joi.string().regex(regexConstant.PASSWORD).trim();
  private static email = joi
    .string()
    .regex(regexConstant.EMAIL)
    .lowercase()
    .trim();
  private static userName = joi.string().min(3).max(50).trim().messages({
    "string.empty": "{{#label}} not be empty",
    "string.max":
      "{{#label}} length must be less than or equal to {{#limit}} characters long2",
    "string.min":
      "{{#label}} length must be at least {{#limit}} characters long2",
  });

  public static create = joi.object({
    email: this.email.required(),
    password: this.password.required(),
    name: this.userName.required(),
  });
  public static update = joi.object({
    name: this.userName.required(),
  });
  public static login = joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });
}
