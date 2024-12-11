import * as joi from "joi";
import { regexConstant } from "../constants/regex.constant";
export class UserValidator {
    private static password = joi.string().regex(regexConstant.PASSWORD).trim();
    private static email = joi.string().regex(regexConstant.EMAIL).lowercase().trim();
    private static userName = joi.string().min(3).max(50).trim().messages({
        "string.empty": "{{#label}} not be empty",
        "string.max":
            "{{#label}} length must be less than or equal to {{#limit}} characters long2",
        "string.min":
            "{{#label}} length must be at least {{#limit}} characters long2"
    });
    private static age = joi.number().min(18).max(100).integer();

    public static create = joi.object({
        email: this.email.required(),
        password: this.password.required(),
        name: this.userName.required(),
        age: this.age.required()
    });
    public static update = joi.object({
        name: this.userName.required(),
        age: this.age.required()
    });
    public static login = joi.object({
        email: this.email.required(),
        password: this.password.required(),
    });
    public static forgotPassword = joi.object({
        email: this.email.required(),
    });

    public static setForgotPassword = joi.object({
        newPassword: this.password.required(),
    });

    public static changePassword = joi.object({
        oldPassword: this.password.required(),
        newPassword: this.password.required(),
    });
}