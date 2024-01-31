import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface IBot {
  botInfo: any;
}

const Bot: FC<IBot> = ({ botInfo }) => {
  const navigate = useNavigate();

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
            style={{ backgroundColor: "#2590EB" }}
          />
        </section>
        <a
          href={botInfo.url}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Try Now!
        </a>
      </section>
      <div>
        <img
          src={botInfo.banner}
          alt={botInfo.name}
          className="rounded shadow"
        />
      </div>
      <div className="font-bold text-2xl mt-20 mb-10">Overview</div>
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
              <span className="text-right">Operational</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Bot</span>
              <span className="text-right">Operational</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Database</span>
              <span className="text-right">Operational</span>
            </div>
          </section>
        </section>
      </section>
    </section>
  );
};

export default Bot;
