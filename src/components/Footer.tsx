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
    <footer className="fixed bottom-0 flex items-center justify-between w-full border-t-[1px] text-[#44444B] py-4 px-14 bg-white">
      <div className="text-sm cursor-default">
        Spheron Bot Marketplace © 2024
      </div>
      <div className="text-sm flex items-center justify-between gap-12">
        <a
          href={BOT_MARKETPLACE_DOCUMENTATION_LINK}
          target="_blank"
          rel="noreferrer"
          className="hover:underline"
        >
          Documentation
        </a>
        <a
          href={SPHERON_COMMUNITY_LINK}
          target="_blank"
          rel="noreferrer"
          className="hover:underline"
        >
          Join Community
        </a>
        <a
          href={BOT_MARKETPLACE_GITHUB_LINK}
          target="_blank"
          rel="noreferrer"
          className="hover:underline"
        >
          Github
        </a>
      </div>
      <div className="flex items-center gap-3">
        <a
          href={BOT_MARKETPLACE_GITHUB_LINK}
          target="_blank"
          rel="noreferrer"
          className="rounded hover:bg-[#ECECEE]"
        >
          <img src={GithubLogo} alt="github" />
        </a>
        <a
          href={SPHERON_TWITTER_LINK}
          target="_blank"
          rel="noreferrer"
          className="rounded hover:bg-[#ECECEE]"
        >
          <img src={TwitterLogo} alt="twitter" />
        </a>
        <a
          href={SPHERON_DISCORD_LINK}
          target="_blank"
          rel="noreferrer"
          className="rounded hover:bg-[#ECECEE]"
        >
          <img src={DiscordLogo} alt="discord" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
