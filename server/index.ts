import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;

app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://provider.us-west.spheron.wiki:30656/bots");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

// Define the Bot model
const botSchema = new mongoose.Schema({
  name: String,
  description: String,
  url: String,
  healthUrl: String,
});

const Bot = mongoose.model("Bot", botSchema);

// Create a new bot
app.post("/bots", async (req, res) => {
  try {
    const bot = new Bot(req.body);
    await bot.save();
    res.json(bot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all bots
app.get("/bots", async (req, res) => {
  try {
    const bots = await Bot.find();
    res.json(bots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a bot by ID
app.put("/bots/:id", async (req, res) => {
  try {
    const bot = await Bot.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(bot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a bot by ID
app.delete("/bots/:id", async (req, res) => {
  try {
    const bot = await Bot.findByIdAndDelete(req.params.id);
    res.json({ message: "Bot deleted successfully", bot });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
