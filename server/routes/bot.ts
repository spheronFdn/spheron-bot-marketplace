// routes/bot.ts
import express from "express";
import { Bot } from "../models/bot";
import isAuthenticated from "../middlewares/authorization.middleware";

const router = express.Router();

router.post("/", isAuthenticated(), async (req, res) => {
  try {
    const bot = new Bot(req.body);
    await bot.save();
    res.json(bot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/getAllBots", async (req, res) => {
  try {
    const bots = await Bot.find();
    res.json(bots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/getUserBots/:userid", isAuthenticated(), async (req, res) => {
  try {
    const userBots = await Bot.find({ user: req.params.userid });
    res.json(userBots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", isAuthenticated(), async (req, res) => {
  try {
    const bot = await Bot.findByIdAndUpdate((req as any).params.id, req.body, {
      new: true,
    });
    res.json(bot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", isAuthenticated(), async (req, res) => {
  try {
    const bot = await Bot.findByIdAndDelete((req as any).params.id);
    res.json({ message: "Bot deleted successfully", bot });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
