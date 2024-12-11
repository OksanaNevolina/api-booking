import nodemailer, { Transporter } from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import { EEmailAction } from "../enums/email-action.enum";
import { emailTemplates } from "../constants/mail.constant";
import { configs } from "../configs/configs";

class EmailService {
    private transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            from: "No reply",
            auth: {
                user: "onevolina5@gmail.com",
                pass: "eohdbdkkzqkkvebf",
            },
        });

        const hbsOptions = {
            viewEngine: {
                extname: ".hbs",
                defaultLayout: "main",
                layoutsDir: path.join(process.cwd(), "src", "templates", "layouts"),
                partialsDir: path.join(process.cwd(), "src", "templates", "partials"),
            },
            viewPath: path.join(process.cwd(), "src", "templates", "views"),
            extName: ".hbs",
        };

        this.transporter.use("compile", hbs(hbsOptions));
    }

    public async sendMail(
        email: string | string[],
        emailAction: EEmailAction,
        context: Record<string, string | number> = {},
    ) {
        const { subject, templateName } = emailTemplates[emailAction];
        context.frontUrl = configs.FRONT_URL;

        const mailOptions = {
            to: email,
            subject,
            template: templateName,
            context,
        };

        await this.transporter.sendMail(mailOptions);
    }
}

export const emailService = new EmailService();