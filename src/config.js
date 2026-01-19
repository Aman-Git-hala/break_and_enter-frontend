// src/config.js
export const API_URL = import.meta.env.PROD
    ? "https://break-and-enter-backend.onrender.com"
    : "http://127.0.0.1:5000";