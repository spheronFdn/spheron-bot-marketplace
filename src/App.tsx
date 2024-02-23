import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Overview from "./pages/overview";
import Bot from "./pages/bot";
import Bots from "./bots.json";
import Layout from "./components/Layout";

const App = () => {
  return (
    <Layout>
      <Router>
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
      </Router>
    </Layout>
  );
};

export default App;
