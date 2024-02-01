import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatusEnum, colorMapping } from "../config";

interface IBot {
  botInfo: any;
}

const Bot: FC<IBot> = ({ botInfo }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<any>({
    server: "NA",
    bot: "NA",
    database: "NA",
  });
  const [colorCode, setColorCode] = useState(colorMapping[StatusEnum.NONE]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${botInfo.healthUrl}/health-check`);

        if (response.status === 429) {
          setColorCode(colorMapping[StatusEnum.ERROR]);
          console.error("Too Many Requests. Please try again later.");
          return;
        }

        const healthStatus = await response.json();
        const healthType =
          (healthStatus.type as keyof typeof colorMapping) || StatusEnum.NONE;
        setColorCode(colorMapping[healthType]);
        setStatus(healthStatus.status);
      } catch (error: any) {
        setColorCode(colorMapping[StatusEnum.ERROR]);
        console.error("Error fetching health status:", error.message);
      }
    })();
  }, []);

  return (
    <section>
      <section className="flex items-center justify-between mt-10 mb-8">
        <section className="flex gap-4 items-center">
          <div className="cursor-pointer w-5" onClick={() => navigate("/")}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
          </div>
          <div className="font-bold text-2xl">{botInfo.name}</div>
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: colorCode }}
          />
          <div className="bg-green-500 text-white px-4 py-2 rounded text-xs font-bold">
            Verified
          </div>
        </section>
        <section className="flex">
          <a
            href={botInfo.url}
            className="ms-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Try Now!
          </a>
        </section>
      </section>
      <div>
        <img
          src={botInfo.bannerUrl}
          alt={botInfo.name}
          className="rounded shadow"
        />
      </div>
      <div className="mt-6">
        <span className="font-semibold">Owner: </span>
        {botInfo.user}
      </div>
      <div className="font-bold text-2xl mt-14 mb-10">Overview</div>
      <section className="flex gap-2 mb-20">
        <section className="w-4/6">
          <div
            dangerouslySetInnerHTML={{
              __html: botInfo.description.replace(/\n/g, "<br>"),
            }}
            className="text-sm"
          />
        </section>
        <section className="text-white w-2/6 ml-10 flex justify-end h-fit">
          <section className="bg-gray-600 py-6 px-4 rounded w-3/4">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Server</span>
              <span className="text-right">{status.server}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Bot</span>
              <span className="text-right">{status.bot}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Database</span>
              <span className="text-right">{status.database}</span>
            </div>
          </section>
        </section>
      </section>
    </section>
  );
};

export default Bot;
