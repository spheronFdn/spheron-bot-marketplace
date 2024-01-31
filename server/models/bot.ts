import mongoose, { Schema } from "mongoose";

const botSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: String,
  description: String,
  url: String,
  healthUrl: String,
  bannerUrl: String,
});

const Bot = mongoose.model("Bot", botSchema);

export { Bot };
