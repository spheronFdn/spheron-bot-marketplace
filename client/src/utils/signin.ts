import { MARKETPLACE_SERVER } from "../config";
import { createSiweMessage } from "./createSiweMessage";
import { getSigner } from "./signer";

export const signin = async () => {
  const signer = getSigner();
  const address = await signer.getAddress();
  const message = await createSiweMessage(
    address,
    "Sign in with Ethereum to the app."
  );
  const signature = await signer.signMessage(message);
  const walletName = "Metamask";

  const res = await fetch(`${MARKETPLACE_SERVER}/user/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, signature, address, walletName }),
    credentials: "include",
  });

  const response = await res.json();
  const stringifySession = JSON.stringify(response);
  localStorage.setItem("session", stringifySession);
};
