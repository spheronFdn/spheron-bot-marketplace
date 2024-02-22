import { FC, useContext, useState } from "react";
import Card from "../components/Card";
import HealthBar from "../components/HealthBar";
import Tab from "../components/Tab";
import { UserContext } from "../components/Layout";

interface IOverview {
  bots: any;
}

const Overview: FC<IOverview> = ({ bots }) => {
  const user = useContext(UserContext);
  const [allBots, setAllBots] = useState<boolean>(true);

  return (
    <>
      <HealthBar bots={bots} />
      <Tab allBots={allBots} setAllBots={setAllBots} user={user} />
      <section className="flex flex-wrap">
        {allBots ? (
          <>
            {bots.map((bot: any, i: number) => (
              <Card
                name={bot.name}
                url={bot.healthUrl || ""}
                owner={bot.address}
                logoUrl={bot.logoUrl || ""}
                key={i}
              />
            ))}
          </>
        ) : (
          <>
            {bots
              .filter(
                (bot: any) => bot.address.toLowerCase() === user.toLowerCase()
              )
              .map((bot: any, i: number) => (
                <Card
                  name={bot.name}
                  url={bot.healthUrl || ""}
                  owner={bot.address}
                  logoUrl={bot.logoUrl || ""}
                  key={i}
                />
              ))}
          </>
        )}
      </section>
    </>
  );
};

export default Overview;
