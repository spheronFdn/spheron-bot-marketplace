import { FC } from "react";
import makeBlockie from "ethereum-blockies-base64";
import MarketplaceLogo from "../assets/marketplace.svg";
import { getSigner } from "../utils/signer";

interface INavbar {
  user: string;
  setUser: (user: string) => void;
}

const Navbar: FC<INavbar> = ({ user, setUser }) => {
  const handleConnectWallet = async () => {
    const { address } = await getSigner();
    setUser(address);
  };

  return (
    <nav className="py-3 flex items-center justify-between border-b-[1px] px-16">
      <div>
        <img src={MarketplaceLogo} alt="spheron-logo" />
      </div>
      {user ? (
        <div>
          <img src={makeBlockie(user)} alt="user" className="w-8 rounded-lg" />
        </div>
      ) : (
        <button
          className="ms-4 bg-[#0057FF] text-white p-2 rounded-md text-sm font-semibold"
          onClick={handleConnectWallet}
        >
          Connect Wallet
        </button>
      )}
    </nav>
  );
};

export default Navbar;
