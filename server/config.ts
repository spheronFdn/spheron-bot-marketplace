import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 8080;
export const MONGODB_URI = process.env.MONGODB_URI;
export const SPHERON_TOKEN = process.env.SPHERON_TOKEN;
