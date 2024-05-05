import { config } from "dotenv";
config();

export const appConfig = {
  env: process.env.NODE_ENV || "development",
  server: {
    port: process.env.PORT || 3000,
  },
  mongoURI: process.env.MONGODB_URI || "",
  mailClient: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT || 500,
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
    from: process.env.MAIL_FROM,
  },
};
