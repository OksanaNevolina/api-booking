import { CronJob } from "cron";
import dayjs from "dayjs";


import { EEmailAction } from "../enums/email-action.enum";
import { ApiError } from "../errors/api.error";
import { emailService } from "../services/email.service";
import {userRepository} from "../repositore/user.repository";
import utc from "dayjs/plugin/utc";



dayjs.extend(utc);

const handler = async function () {
    try {
        const date = dayjs().utc().subtract(1, "d").toDate();

        const users = await userRepository.findWithoutActivityAfter(date);
        console.log(users);
        console.log(111111111111111111);

        await Promise.all(
            users.map(async (user) => {
                await emailService.sendMail(user.email, EEmailAction.OLD_VISIT, {
                    name: user.name,
                });
            }),
        );
    } catch (e) {
        throw new ApiError(e.meesage, e.status);
    }
};

export const notificationForOltVisitors = new CronJob("5 4 * * sun", handler);