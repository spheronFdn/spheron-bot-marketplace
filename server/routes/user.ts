import express, { Request } from "express";
import { generateNonce, SiweMessage } from "siwe";
import { SpheronClient, ProtocolEnum } from "@spheron/storage";
import { User } from "../models/user";
import isAuthenticated from "../middlewares/authorization.middleware";
import { SPHERON_TOKEN } from "../config";

const router = express.Router();

router.get("/nonce", async function (req: Request, res) {
  req.session.nonce = generateNonce();
  req.session.save();
  res.setHeader("Content-Type", "text/plain");
  res.status(200).send(req.session.nonce);
});

router.post("/signin", async (req, res) => {
  if (!req.body.message) {
    res.status(422).json({ message: "Expected prepareMessage object as body" });
    return;
  }
  const newMessage = new SiweMessage(req.body.message);
  const fields = await newMessage.validate(req.body.signature);
  if (fields.nonce !== req.session.nonce) {
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

  req.session.cookie.expires = new Date(Date.now() + 7200000);
  req.session.siwe = fields;
  req.session.save(() =>
    res.status(200).json({
      data,
      session: req.session,
      message: `You are authenticated and your address is: ${req.session.siwe.address}`,
    })
  );
});

router.post("/signout", isAuthenticated(), async (req, res) => {
  if (!req.session.siwe) {
    res.status(401).json({ message: "Already signed out" });
    return;
  }

  req.session.destroy((error: any) => {
    if (error) {
      throw error;
    }
  });
  res.status(200);
});

router.get("/initiate-upload", async (_req, res) => {
  try {
    const bucketName = "marketplace-banners";
    const protocol = ProtocolEnum.IPFS;

    const client = new SpheronClient({
      token: SPHERON_TOKEN,
    });

    const { uploadToken } = await client.createSingleUploadToken({
      name: bucketName,
      protocol,
    });

    res.status(200).json({
      uploadToken,
    });
  } catch (error) {
    console.error(error);
  }
});

export default router;
