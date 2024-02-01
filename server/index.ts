import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";
import userRoutes from "./routes/user";
import botRoutes from "./routes/bot";
import { MONGODB_URI, PORT } from "./config";

dotenv.config();

declare module "express-session" {
  export interface SessionData {
    nonce: string;
    siwe: any;
  }
}

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
  session({
    name: "siwe",
    secret: "siwe-secret",
    resave: true,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

mongoose.connect(MONGODB_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

app.use("/user", userRoutes);
app.use("/bot", botRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
