import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatusEnum, colorMapping, statusMapping } from "../config";
import { truncate } from "../utils/truncate";

interface ICard {
  name: string;
  url: string;
  owner: string;
  logoUrl: string;
}

const Card: FC<ICard> = ({ name, url, owner, logoUrl }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<string>(statusMapping[StatusEnum.NONE]);
  const [colorCode, setColorCode] = useState(colorMapping.none);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(url);

        if (response.status === 429) {
          setColorCode(colorMapping[StatusEnum.ERROR]);
          setStatus(statusMapping[StatusEnum.ERROR]);
          console.error("Too Many Requests. Please try again later.");
          return;
        }

        const healthStatus = await response.json();
        const healthType =
          (healthStatus.type as keyof typeof colorMapping) || StatusEnum.NONE;
        setColorCode(colorMapping[healthType]);
        setStatus(statusMapping[healthType]);
      } catch (error: any) {
        setColorCode(colorMapping[StatusEnum.ERROR]);
        setStatus(statusMapping[StatusEnum.ERROR]);
        console.error("Error fetching health status:", error.message);
      }
    })();
  }, [url]);

  return (
    <section className="p-2 w-full md:w-1/5 min-w-64 md:max-w-80">
      <section
        className="border border-gray-300 rounded flex-col justify-between cursor-pointer shadow hover:shadow-md h-64 md:h-52 min-h-52"
        onClick={() => navigate(`/${name}`)}
      >
        <div className="bg-black rounded-t flex justify-center items-center h-1/2">
          <img src={logoUrl} alt="avail-logo" />
        </div>
        <section className="px-4 text-[#2C2C30]">
          <div className="py-2 text-xl font-medium">{name}</div>
          <div className="flex items-center gap-7 w-full">
            <div className="text-xs font-semibold uppercase tracking-wide">
              Status:{" "}
            </div>
            <div className="text-sm flex items-center gap-1">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: colorCode }}
              />
              {status}
            </div>
          </div>
          <div className="flex items-center gap-7 w-full">
            <div className="text-xs font-semibold uppercase tracking-wide">
              Owner:{" "}
            </div>
            <div className="text-sm">{truncate(owner)}</div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default Card;
