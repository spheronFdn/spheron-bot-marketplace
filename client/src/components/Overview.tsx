import { FC, useEffect, useState } from "react";
import Card from "./Card";
import SpheronLogo from "../assets/spheron.png";
import {
  HealthStatusEnum,
  StatusEnum,
  colorMapping,
  statusMapping,
} from "../config";
import { signin } from "../utils/signin";
import { signout } from "../utils/signout";

interface IOverview {
  bots: any;
}

const Overview: FC<IOverview> = ({ bots }) => {
  const [status, setStatus] = useState({
    indicator: StatusEnum.NONE,
    description: statusMapping[StatusEnum.NONE],
  });
  const [colorCode, setColorCode] = useState(colorMapping.none);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [allBots, setAllBots] = useState<boolean>(true);
  const [user, setUser] = useState<string>("");

  const checkBotStatus = async () => {
    try {
      const promises = bots?.map(async (bot: any) => {
        try {
          const response = await fetch(`${bot.healthUrl}/health-check`);

          if (response.status === 429) {
            console.error("Error: Too Many Requests. Please try again later.");
            return;
          }

          const healthStatus = await response.json();
          return healthStatus.message;
        } catch (error) {
          console.error("Error fetching health status:", error);
          throw error; // Re-throw the error to mark the promise as rejected
        }
      });

      const statuses = await Promise.allSettled(promises);

      const operationalCount = statuses.filter(
        (status: any) => status.value === HealthStatusEnum.HEALTH_CHECK_PASSED
      ).length;
      const totalCount = statuses.length;

      if (operationalCount === totalCount) {
        setStatus({
          indicator: StatusEnum.NONE,
          description: statusMapping[StatusEnum.NONE],
        });
        setColorCode(colorMapping[StatusEnum.NONE]);
      } else if (operationalCount === 0) {
        setStatus({
          indicator: StatusEnum.MAJOR,
          description: statusMapping[StatusEnum.MAJOR],
        });
        setColorCode(colorMapping[StatusEnum.MAJOR]);
      } else {
        setStatus({
          indicator: StatusEnum.MINOR,
          description: statusMapping[StatusEnum.MINOR],
        });
        setColorCode(colorMapping[StatusEnum.MINOR]);
      }
    } catch (error) {
      // Handle the error after all promises are settled
      setStatus({
        indicator: StatusEnum.ERROR,
        description: statusMapping[StatusEnum.ERROR],
      });
      setColorCode(colorMapping[StatusEnum.ERROR]);
      console.error("Error in checkBotStatus:", error);
    }
  };

  useEffect(() => {
    const session = localStorage.getItem("session");
    if (session) {
      setIsSignedIn(true);
      const parsedSession = JSON.parse(session);
      setUser(parsedSession.data.address);
    } else {
      setIsSignedIn(false);
    }
    (async () => {
      await checkBotStatus();
    })();
  }, [bots]);

  const handleAuth = async () => {
    if (isSignedIn) {
      await signout();
    } else {
      await signin();
      setIsSignedIn(true);
    }
  };

  return (
    <section>
      <div className="mt-20 mb-14 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <img src={SpheronLogo} alt="spheron-logo" className="w-80" />
          <span className="text-4xl font-semibold">BOT MARKETPLACE</span>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleAuth}
        >
          {isSignedIn ? "Signout" : "Sign In With Ethereum"}
        </button>
      </div>
      <div
        className="text-white py-4 w-full my-8 pl-6 font-bold rounded text-xl"
        style={{ backgroundColor: colorCode }}
      >
        {status.description}
      </div>
      <div className="flex justify-between mb-4">
        <div>
          <button
            className={`border-black px-4 py-2 ${allBots && "border-b"}`}
            onClick={() => setAllBots(true)}
          >
            All bots
          </button>
          {user && (
            <button
              className={`ms-3 border-black px-4 py-2 ${
                !allBots && "border-b"
              }`}
              onClick={() => setAllBots(false)}
            >
              My bots
            </button>
          )}
        </div>
      </div>
      <section className="flex flex-wrap">
        {allBots ? (
          <>
            {bots.map((bot: any, i: number) => (
              <Card
                name={bot.name}
                url={bot.healthUrl || ""}
                owner={bot.user}
                key={i}
              />
            ))}
          </>
        ) : (
          <>
            {bots
              .filter((bot: any) => bot.user === user)
              .map((bot: any, i: number) => (
                <Card
                  name={bot.name}
                  url={bot.healthUrl || ""}
                  owner={bot.user}
                  key={i}
                />
              ))}
          </>
        )}
      </section>
    </section>
  );
};

export default Overview;
