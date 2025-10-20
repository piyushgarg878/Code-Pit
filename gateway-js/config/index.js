export const config = {
  USER_SERVICE_URL: process.env.USER_SERVICE_URL || "http://localhost:8080",
  JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret",
  RATE_LIMIT_WINDOW: 60,   // in seconds
  RATE_LIMIT_MAX: 10       // max requests per window
};