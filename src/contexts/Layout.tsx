import { FC, createContext, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

interface ILayout {
  children: any;
}

export const UserContext = createContext("");

const Layout: FC<ILayout> = ({ children }) => {
  const [user, setUser] = useState<string>("");

  return (
    <UserContext.Provider value={user}>
      <Navbar user={user} setUser={setUser} />
      <main className="flex justify-center min-h-screen">
        <section className="w-full mx-6 lg:mx-16">{children}</section>
      </main>
      <Footer />
    </UserContext.Provider>
  );
};

export default Layout;
