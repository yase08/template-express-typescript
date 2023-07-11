import { createTransport, Transporter, SentMessageInfo } from "nodemailer";

export const sendMailer = async (
  to: string,
  subject: string,
  template: string
): Promise<boolean> => {
  try {
    const mailer = createTransport({
      host: process.env.SMTP_HOST as string,
      port: parseInt(process.env.SMTP_PORT as string),
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
      secure: false,
    }) as Transporter<SentMessageInfo>;

    mailer.verify((error: any) => {
      if (error) {
        return Promise.reject();
      }
    });

    mailer.on("error", (error) => {
      if (error) {
        return Promise.reject();
      }
    });

    await mailer.sendMail({
      from: `${process.env.SMTP_NAME}<${process.env.SMTP_USERNAME}>`,
      to: to,
      subject: subject,
      html: template,
      priority: "high",
    });

    return true;
  } catch (error) {
    return Promise.reject();
  }
};
