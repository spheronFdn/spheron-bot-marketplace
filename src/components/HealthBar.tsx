import { FC, useEffect, useState } from "react";
import HealthIcon from "../assets/health.svg";
import {
  HealthStatusEnum,
  StatusEnum,
  allBotStatusMapping,
  backgroundColorMapping,
  colorMapping,
} from "../config";

interface IHealthBar {
  bots: any;
}

const HealthBar: FC<IHealthBar> = ({ bots }) => {
  const [status, setStatus] = useState({
    indicator: StatusEnum.NONE,
    description: allBotStatusMapping[StatusEnum.NONE],
  });
  const [colorCode, setColorCode] = useState(colorMapping.none);
  const [backgroundColor, setBackgroundColor] = useState(
    backgroundColorMapping.none
  );

  const checkBotStatus = async () => {
    try {
      const promises = bots?.map(async (bot: any) => {
        try {
          const response = await fetch(bot.healthUrl);

          if (response.status === 429) {
            console.error("Error: Too Many Requests. Please try again later.");
            return;
          }

          const healthStatus = await response.json();
          return healthStatus.message;
        } catch (error) {
          console.error("Error fetching health status:", error);
          throw error;
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
          description: allBotStatusMapping[StatusEnum.NONE],
        });
        setColorCode(colorMapping[StatusEnum.NONE]);
        setBackgroundColor(backgroundColorMapping[StatusEnum.NONE]);
      } else if (operationalCount === 0) {
        setStatus({
          indicator: StatusEnum.MAJOR,
          description: allBotStatusMapping[StatusEnum.MAJOR],
        });
        setColorCode(colorMapping[StatusEnum.MAJOR]);
        setBackgroundColor(backgroundColorMapping[StatusEnum.MAJOR]);
      } else {
        setStatus({
          indicator: StatusEnum.MINOR,
          description: allBotStatusMapping[StatusEnum.MINOR],
        });
        setColorCode(colorMapping[StatusEnum.MINOR]);
        setBackgroundColor(backgroundColorMapping[StatusEnum.MINOR]);
      }
    } catch (error) {
      // handle the error after all promises are settled
      setStatus({
        indicator: StatusEnum.ERROR,
        description: allBotStatusMapping[StatusEnum.ERROR],
      });
      setColorCode(colorMapping[StatusEnum.ERROR]);
      console.error("Error in checkBotStatus:", error);
    }
  };

  useEffect(() => {
    (async () => await checkBotStatus())();
  }, []); // eslint-disable-line

  return (
    <section
      className="mt-4 mb-6 py-2 px-5 w-full rounded text-xs font-semibold uppercase tracking-wide flex items-center gap-1"
      style={{ backgroundColor: backgroundColor, color: colorCode }}
    >
      <img src={HealthIcon} alt="health-icon" />
      <div>{status.description}</div>
    </section>
  );
};

export default HealthBar;
