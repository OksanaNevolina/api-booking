import * as joi from "joi";

export class BookingValidator {
    private static user = joi.string().min(3).max(50).trim().messages({
        "string.empty": "User's name must not be empty",
        "string.max": "User's name must be less than or equal to {{#limit}} characters long",
        "string.min": "User's name must be at least {{#limit}} characters long",
    });

    private static date = joi.date().iso().messages({
        "string.empty": "Date must not be empty",
        "date.base": "Date must be in a valid format (ISO 8601)",
    });

    private static time = joi.string().regex(/^\d{2}:\d{2}$/).messages({
        "string.empty": "Time must not be empty",
        "string.pattern.base": "Time must be in the format HH:mm",
    });

    public static create = joi.object({
        user: this.user.required(),
        date: this.date.required(),
        startTime: this.time.required(),
        endTime: this.time.required(),
    });

    public static update = joi.object({
        user: this.user.optional(),
        date: this.date.optional(),
        startTime: this.time.optional(),
        endTime: this.time.optional(),
    });


}
