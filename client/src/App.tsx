import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Overview from "./components/Overview";
import Bot from "./components/Bot";
import Modal from "./components/Modal";
import { ModalEnum } from "./config";

const App = () => {
  const [bots, setBots] = useState<any[]>([]);
  const [type, setType] = useState<ModalEnum>(ModalEnum.ADD);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [botId, setBotId] = useState("");

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
            <Route
              path="/"
              element={
                <Overview
                  bots={bots}
                  setType={setType}
                  setIsModalVisible={setIsModalVisible}
                />
              }
            />
            {bots.map((bot: any) => (
              <Route
                key={bot.name}
                path={`/${bot.name}`}
                element={
                  <Bot
                    botInfo={bot}
                    setType={setType}
                    setIsModalVisible={setIsModalVisible}
                    setBotId={setBotId}
                  />
                }
              />
            ))}
          </Routes>
        </section>
        {isModalVisible && (
          <Modal
            type={type}
            setIsModalVisible={setIsModalVisible}
            botId={botId}
          />
        )}
      </main>
    </Router>
  );
};

export default App;
