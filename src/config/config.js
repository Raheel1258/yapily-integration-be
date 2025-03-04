import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  yapilyApiUrl: process.env.YAPILY_API_URL,
  applicationId: process.env.YAPILY_APPLICATION_KEY,
  applicationSecret: process.env.YAPILY_APPLICATION_SECRET,
};
