"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const allowedOrigins = ["http://localhost:3000"];
exports.corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Origin not allowed by CORS"));
        }
    },
    credentials: true, // Allow cookies and HTTP authentication
    optionsSuccessStatus: 200, // For preflight requests
};
