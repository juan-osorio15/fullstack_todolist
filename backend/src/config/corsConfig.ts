import cors from "cors";

const allowedOrigins = ["http://localhost:3000"];

export const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Origin not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies and HTTP authentication
  optionsSuccessStatus: 200, // For preflight requests
};
