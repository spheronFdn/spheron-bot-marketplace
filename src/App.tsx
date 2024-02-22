import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Overview from "./pages/overview";
import Bot from "./pages/bot";
import Bots from "./bots.json";
import Layout from "./components/Layout";

const App = () => {
  return (
    <Router>
      <Layout>
        <main className="flex justify-center">
          <section className="w-full mx-16">
            <Routes>
              <Route path="/" element={<Overview bots={Bots} />} />
              {Bots.map((bot: any) => (
                <Route
                  key={bot.name}
                  path={`/${bot.name}`}
                  element={<Bot botInfo={bot} />}
                />
              ))}
            </Routes>
          </section>
        </main>
      </Layout>
    </Router>
  );
};

export default App;
