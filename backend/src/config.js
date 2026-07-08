import 'dotenv/config';

export const config = {
  port: process.env.PORT || 3000,
  frontendOrigin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  sessionSecret: process.env.SESSION_SECRET || 'change-me',
};
