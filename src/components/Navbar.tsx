import { FC } from "react";
import makeBlockie from "ethereum-blockies-base64";
import { getSigner } from "../utils/signer";
import MarketplaceLogo from "../assets/marketplace.svg";
import MetamaskLogo from "../assets/metamask.svg";

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
    <nav className="py-3 flex items-center justify-between border-b-[1px] px-6 lg:px-16">
      <div>
        <img
          src={MarketplaceLogo}
          alt="spheron-logo"
          className="w-80 lg:w-auto"
        />
      </div>
      {user ? (
        <div>
          <img
            src={makeBlockie(user)}
            alt="user"
            className="ms-4 w-8 rounded-lg"
          />
        </div>
      ) : (
        <>
          <button
            className="ms-4 bg-[#0057FF] text-white p-2 rounded-md text-sm font-semibold hidden md:block"
            onClick={handleConnectWallet}
          >
            Connect Wallet
          </button>
          <button
            className="ms-4 bg-[#ECECEE] p-1 rounded-md block md:hidden"
            onClick={handleConnectWallet}
          >
            <img src={MetamaskLogo} alt="metamask" className="w-8" />
          </button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
