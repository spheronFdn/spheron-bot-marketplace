import { FC } from "react";

interface ITab {
  allBots: boolean;
  setAllBots: (allBots: boolean) => void;
  user: string;
}

const Tab: FC<ITab> = ({ allBots, setAllBots, user }) => {
  return (
    <section className="flex justify-between mb-4 text-sm font-semibold">
      <div>
        <button
          className={`border-[#0057FF] px-4 py-2 ${allBots && "border-b-4"}`}
          onClick={() => setAllBots(true)}
        >
          All bots
        </button>
        {user && (
          <button
            className={`ms-3 border-[#0057FF] px-4 py-2 ${
              !allBots && "border-b-4"
            }`}
            onClick={() => setAllBots(false)}
          >
            My bots
          </button>
        )}
      </div>
    </section>
  );
};

export default Tab;
