import { ethers } from "ethers";

export const getSigner = () => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();
  return signer;
};
