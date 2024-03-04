import GithubLogo from "../assets/github.svg";
import TwitterLogo from "../assets/twitter.svg";
import DiscordLogo from "../assets/discord.svg";
import {
  BOT_MARKETPLACE_DOCUMENTATION_LINK,
  BOT_MARKETPLACE_GITHUB_LINK,
  SPHERON_COMMUNITY_LINK,
  SPHERON_DISCORD_LINK,
  SPHERON_TWITTER_LINK,
} from "../config";

const Footer = () => {
  return (
    <footer className="flex flex-wrap-reverse lg:flex-nowrap justify-around lg:items-center lg:justify-between w-full border-t-[1px] text-[#44444B] py-4 px-6 bg-white mt-6">
      <div className="text-sm text-center cursor-default flex justify-center mt-4 lg:my-0 w-full lg:w-auto">
        Spheron Bot Marketplace © 2024
      </div>
      <div className="text-sm flex flex-col justify-around lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <a
          href={BOT_MARKETPLACE_DOCUMENTATION_LINK}
          target="_blank"
          rel="noreferrer"
          className="hover:underline"
        >
          <div>Documentation</div>
        </a>
        <a
          href={SPHERON_COMMUNITY_LINK}
          target="_blank"
          rel="noreferrer"
          className="hover:underline"
        >
          <div>Join Community</div>
        </a>
        <a
          href={BOT_MARKETPLACE_GITHUB_LINK}
          target="_blank"
          rel="noreferrer"
          className="hover:underline"
        >
          <div>Github</div>
        </a>
      </div>
      <div className="text-sm flex flex-col justify-around lg:flex-row lg:items-center lg:justify-normal lg:gap-3">
        <a
          href={BOT_MARKETPLACE_GITHUB_LINK}
          target="_blank"
          rel="noreferrer"
          className="rounded hover:bg-[#ECECEE] flex items-center"
        >
          <img src={GithubLogo} alt="github" />
          <span className="text-sm lg:hidden">Github</span>
        </a>
        <a
          href={SPHERON_TWITTER_LINK}
          target="_blank"
          rel="noreferrer"
          className="rounded hover:bg-[#ECECEE] flex items-center"
        >
          <img src={TwitterLogo} alt="twitter" />
          <span className="text-sm lg:hidden">Twitter</span>
        </a>
        <a
          href={SPHERON_DISCORD_LINK}
          target="_blank"
          rel="noreferrer"
          className="rounded hover:bg-[#ECECEE] flex items-center"
        >
          <img src={DiscordLogo} alt="discord" />
          <span className="text-sm lg:hidden">Discord</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
