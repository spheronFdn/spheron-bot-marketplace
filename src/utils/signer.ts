import { ethers } from "ethers";

export const getSigner = async () => {
  const isWalletInstalled = await (window as any).ethereum;
  const currentAddress = await isWalletInstalled.selectedAddress;

  if (!isWalletInstalled) {
    throw new Error("Wallet not detected. Please install a Wallet.");
  }

  if (currentAddress) {
    return { address: currentAddress };
  }

  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  return { address };
};
