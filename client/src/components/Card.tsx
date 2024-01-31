import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatusEnum, colorMapping, statusMapping } from "../config";

interface ICard {
  name: string;
  url: string;
}

const Card: FC<ICard> = ({ name, url }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<string>(statusMapping[StatusEnum.NONE]);
  const [colorCode, setColorCode] = useState(colorMapping.none);

  useEffect(() => {
    (async () => {
      const response = await fetch(`${url}/health-check`);
      const healthStatus = await response.json();
      const healthType =
        (healthStatus.type as keyof typeof colorMapping) || StatusEnum.NONE;
      setColorCode(colorMapping[healthType]);
      setStatus(statusMapping[healthType]);
    })();
  }, [url]);

  return (
    <section className="w-1/2 p-2">
      <section
        className="border border-gray-300 rounded py-6 px-8 flex justify-between cursor-pointer hover:shadow-md"
        onClick={() => navigate(`/${name}`)}
      >
        <section>
          <div className="text-3xl font-bold mb-8 text-gray-800">{name}</div>
          <div>
            <span className="font-semibold">Status: </span>
            {status}
          </div>
        </section>
        <div
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: colorCode }}
        />
      </section>
    </section>
  );
};

export default Card;
