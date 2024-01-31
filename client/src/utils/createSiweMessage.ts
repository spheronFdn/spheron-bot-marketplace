import { SiweMessage } from "siwe";
import { MARKETPLACE_SERVER } from "../config";

export const createSiweMessage = async (address: string, statement: string) => {
  const res = await fetch(`${MARKETPLACE_SERVER}/user/nonce`, {
    credentials: "include",
  });

  const domain = window.location.host;
  const message = new SiweMessage({
    domain,
    address,
    statement,
    uri: origin,
    version: "1",
    chainId: 1,
    nonce: await res.text(),
  });
  return message.prepareMessage();
};
