import { FC, useEffect, useState } from "react";
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

      let statusEnum;
      if (operationalCount === totalCount) {
        statusEnum = StatusEnum.NONE;
      } else if (operationalCount === 0) {
        statusEnum = StatusEnum.MAJOR;
      } else {
        statusEnum = StatusEnum.MINOR;
      }

      setStatus({
        indicator: statusEnum,
        description: allBotStatusMapping[statusEnum],
      });
      setColorCode(colorMapping[statusEnum]);
      setBackgroundColor(backgroundColorMapping[statusEnum]);
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
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.6666 12H15.9999L13.9999 18L9.99992 6L7.99992 12H5.33325"
          stroke="#1C8056"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M18.6666 12H15.9999L13.9999 18L9.99992 6L7.99992 12H5.33325"
          stroke={colorCode}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <div>{status.description}</div>
    </section>
  );
};

export default HealthBar;
