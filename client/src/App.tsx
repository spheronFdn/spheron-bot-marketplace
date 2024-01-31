import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Overview from "./components/Overview";
import Bot from "./components/Bot";

const App = () => {
  const [bots, setBots] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:8080/bot/getAllBots`);
      const botsRes = await response.json();
      setBots(botsRes);
    })();
  }, []);

  return (
    <Router>
      <main className="flex justify-center">
        <section className="w-2/3">
          <Routes>
            <Route path="/" element={<Overview bots={bots} />} />
            {bots.map((bot: any) => (
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
