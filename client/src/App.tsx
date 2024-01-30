import { useState } from "react";
import Overview from "./components/Overview";
import { Bots, OverviewEnum } from "./config";
import Bot from "./components/Bot";

const App = () => {
  const [page, setPage] = useState<string>(OverviewEnum.OVERVIEW);
  const selectedBot = Bots.find((bot) => bot.name === page);

  return (
    <main className="flex justify-center">
      <section className="w-2/3">
        {page === OverviewEnum.OVERVIEW ? (
          <Overview setPage={setPage} />
        ) : (
          <>{selectedBot && <Bot botInfo={selectedBot} setPage={setPage} />}</>
        )}
      </section>
    </main>
  );
};

export default App;
