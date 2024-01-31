import express, { Request } from "express";
import { generateNonce, SiweMessage } from "siwe";
import { User } from "../models/user";

const router = express.Router();

router.get("/nonce", async function (req: Request, res) {
  (req as any).session.nonce = generateNonce();
  (req as any).session.save();
  res.setHeader("Content-Type", "text/plain");
  res.status(200).send((req as any).session.nonce);
});

router.post("/signin", async (req, res) => {
  if (!req.body.message) {
    res.status(422).json({ message: "Expected prepareMessage object as body" });
    return;
  }
  const newMessage = new SiweMessage(req.body.message);
  const fields = await newMessage.validate(req.body.signature);
  if (fields.nonce !== (req as any).session.nonce) {
    res.status(422).json({ message: `Invalid nonce.` });
    return;
  }
  // signup or signin
  const { address, walletName } = req.body;
  let data: any;
  data = await User.findOne({ address });
  if (!data) {
    data = await User.create({ address, walletName });
  }

  (req as any).session.siwe = fields;
  (req as any).session.cookie.expires = new Date(Date.now() + 7200000);
  (req as any).session.save(() =>
    res.status(200).json({
      data,
      session: (req as any).session,
      message: `You are authenticated and your address is: ${
        (req as any).session.siwe.address
      }`,
    })
  );
});

export default router;
