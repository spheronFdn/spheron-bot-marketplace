import { FC, useEffect, useState } from "react";
import Card from "./Card";
import SpheronLogo from "../assets/spheron.png";
import {
  HealthStatusEnum,
  StatusEnum,
  colorMapping,
  statusMapping,
} from "../config";

interface IOverview {
  setPage: (page: string) => void;
}

const Overview: FC<IOverview> = ({ setPage }) => {
  const [status, setStatus] = useState({
    indicator: StatusEnum.NONE,
    description: statusMapping[StatusEnum.NONE],
  });
  const [colorCode, setColorCode] = useState(colorMapping.none);
  const [bots, setBots] = useState<any[]>([]);

  const checkBotStatus = async () => {
    const promises = bots?.map(async (bot: any) => {
      try {
        const response = await fetch(`${bot.healthUrl}/health-check`);
        const healthStatus = await response.json();
        return healthStatus.message;
      } catch (error) {
        setStatus({
          indicator: StatusEnum.ERROR,
          description: statusMapping[StatusEnum.ERROR],
        });
        setColorCode(colorMapping[StatusEnum.ERROR]);
      }
    });

    const statuses = await Promise.all(promises);

    const operationalCount = statuses.filter(
      (status) => status === HealthStatusEnum.HEALTH_CHECK_PASSED
    ).length;
    const totalCount = statuses.length;

    if (operationalCount === totalCount) {
      setStatus({
        indicator: StatusEnum.NONE,
        description: statusMapping[StatusEnum.NONE],
      });
      setColorCode(colorMapping[StatusEnum.NONE]);
    } else if (operationalCount === Number(0)) {
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
  };

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:8080/bots`);
      const botsRes = await response.json();
      setBots(botsRes);
      checkBotStatus();
    })();
  }, []);

  return (
    <section>
      <div className="mt-20 mb-14 flex items-center gap-5">
        <img src={SpheronLogo} alt="spheron-logo" className="w-80" />
        <span className="text-4xl font-semibold">BOT MARKETPLACE</span>
      </div>
      <div
        className="text-white py-4 w-full my-8 pl-6 font-bold rounded text-xl"
        style={{ backgroundColor: colorCode }}
      >
        {status.description}
      </div>
      <section className="flex flex-wrap">
        {bots.map((bot: any, i: number) => (
          <Card
            name={bot.name}
            url={bot.healthUrl || ""}
            setPage={setPage}
            key={i}
          />
        ))}
      </section>
    </section>
  );
};

export default Overview;
