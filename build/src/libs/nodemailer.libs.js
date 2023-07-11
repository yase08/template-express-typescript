"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMailer = void 0;
const nodemailer_1 = require("nodemailer");
const sendMailer = (to, subject, template) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mailer = (0, nodemailer_1.createTransport)({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT),
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD,
            },
            secure: false,
        });
        mailer.verify((error) => {
            if (error) {
                return Promise.reject();
            }
        });
        mailer.on("error", (error) => {
            if (error) {
                return Promise.reject();
            }
        });
        yield mailer.sendMail({
            from: `${process.env.SMTP_NAME}<${process.env.SMTP_USERNAME}>`,
            to: to,
            subject: subject,
            html: template,
            priority: "high",
        });
        return true;
    }
    catch (error) {
        return Promise.reject();
    }
});
exports.sendMailer = sendMailer;
