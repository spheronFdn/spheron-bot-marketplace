import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Overview from "./components/Overview";
import Bot from "./components/Bot";
import Bots from "./bots.json";

const App = () => {
  return (
    <Router>
      <main className="flex justify-center">
        <section className="w-2/3">
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
    </Router>
  );
};

export default App;
