import nodemailer from "nodemailer";
import { appConfig } from "../../config";

// NOTE: create an ethereal email for testing purposes
// generate one on https://ethereal.email/create
const transporter = nodemailer.createTransport({
  host: appConfig.mailClient.host,
  port: appConfig.mailClient.port as number,
  auth: {
    user: appConfig.mailClient.user,
    pass: appConfig.mailClient.pass,
  },
});

export const sendEmail = async (to: string, subject: string, text: string) => {
  const mailOptions = {
    from: appConfig.mailClient.from,
    to: to,
    subject: subject,
    text: text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent to " + to);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};
