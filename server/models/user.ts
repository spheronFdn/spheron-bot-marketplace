import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  address: String,
  walletName: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

export { User };
