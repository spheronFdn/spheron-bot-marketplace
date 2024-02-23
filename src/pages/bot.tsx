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
        const response = await fetch(botInfo.healthUrl);

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
  }, []); // eslint-disable-line

  return (
    <main className="mx-32">
      <section className="flex items-end justify-between mt-6">
        <section>
          <section className="flex gap-4 items-center mb-3">
            <div className="cursor-pointer w-5" onClick={() => navigate("/")}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
              </svg>
            </div>
            <div className="font-bold text-4xl">{botInfo.name}</div>
            <div className="bg-[#1C8056] text-white p-1 rounded text-sm font-semibold">
              Verified
            </div>
          </section>
          <section className="flex items-center gap-6 mb-3">
            <div className="flex items-center gap-3">
              <div className="text-xs font-semibold uppercase tracking-wide">
                Status:{" "}
              </div>
              <div className="text-sm flex items-center gap-1 uppercase">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: colorCode }}
                />
                {status.bot}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-xs font-semibold uppercase tracking-wide">
                Owner:{" "}
              </div>
              <div className="text-sm">{botInfo.address}</div>
            </div>
          </section>
        </section>
        <section className="flex mb-4">
          <a
            href={botInfo.url}
            className="ms-4 bg-[#0057FF] text-white p-2 rounded-md text-sm font-semibold"
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
      <div className="font-medium text-xl mt-6 mb-3">Overview</div>
      <section className="flex gap-2 mb-20">
        <section className="w-4/6">
          <div
            dangerouslySetInnerHTML={{
              __html: botInfo.description.replace(/\n/g, "<br>"),
            }}
            className="text-sm"
          />
        </section>
        <section className="text-white w-64 ml-10 flex justify-end h-32">
          <section className="flex flex-col gap-3 p-5 bg-[#ECECEE] w-full h-full rounded uppercase">
            <div className="flex justify-between">
              <span className="text-xs font-semibold tracking-wide text-[#2C2C30]">
                Server
              </span>
              <span
                className="text-right text-[10px] p-1 rounded"
                style={{ backgroundColor: colorCode }}
              >
                {status.server}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs font-semibold tracking-wide text-[#2C2C30]">
                Bot
              </span>
              <span
                className="text-right text-[10px] p-1 rounded"
                style={{ backgroundColor: colorCode }}
              >
                {status.bot}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs font-semibold tracking-wide text-[#2C2C30]">
                Database
              </span>
              <span
                className="text-right text-[10px] p-1 rounded"
                style={{ backgroundColor: colorCode }}
              >
                {status.database}
              </span>
            </div>
          </section>
        </section>
      </section>
    </main>
  );
};

export default Bot;
