import { FC, createContext, useState } from "react";
import makeBlockie from "ethereum-blockies-base64";
import MarketplaceLogo from "../assets/marketplace.svg";
import { getSigner } from "../utils/signer";
import Footer from "./Footer";

interface ILayout {
  children: any;
}

export const UserContext = createContext("");

const Layout: FC<ILayout> = ({ children }) => {
  const [user, setUser] = useState<string>("");

  const handleConnectWallet = async () => {
    const { address } = await getSigner();
    setUser(address);
  };

  return (
    <UserContext.Provider value={user}>
      <nav className="py-3 flex items-center justify-between border-b-[1px] px-16">
        <div>
          <img src={MarketplaceLogo} alt="spheron-logo" />
        </div>
        {user ? (
          <div>
            <img
              src={makeBlockie(user)}
              alt="user"
              className="w-8 rounded-lg"
            />
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
      {children}
      <Footer />
    </UserContext.Provider>
  );
};

export default Layout;
