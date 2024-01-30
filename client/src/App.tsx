import { useEffect, useState } from "react";
import Overview from "./components/Overview";
import { OverviewEnum } from "./config";
import Bot from "./components/Bot";

const App = () => {
  const [page, setPage] = useState<string>(OverviewEnum.OVERVIEW);
  const [bots, setBots] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:8080/bots`);
      const botsRes = await response.json();
      setBots(botsRes);
    })();
  }, []);

  const selectedBot = bots?.find((bot: any) => bot.name === page);

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
