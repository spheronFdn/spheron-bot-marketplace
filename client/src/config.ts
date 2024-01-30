import AvailBanner from "./assets/avail-banner.png";
import ShardeumBanner from "./assets/shardeum-banner.png";
import CelestiaBanner from "./assets/celestia-banner.png";

const AVAIL_BOT_URL = process.env.REACT_APP_AVAIL_BOT_URL;
const SHARDEUM_BOT_URL = process.env.REACT_APP_SHARDEUM_BOT_URL;
const CELESTIA_BOT_URL = process.env.REACT_APP_CELESTIA_BOT_URL;
const AVAIL_BOT_TG_URL = process.env.REACT_APP_AVAIL_BOT_TG_URL;
const SHARDEUM_BOT_TG_URL = process.env.REACT_APP_SHARDEUM_BOT_TG_URL;
const CELESTIA_BOT_TG_URL = process.env.REACT_APP_CELESTIA_BOT_TG_URL;

export enum HealthStatusEnum {
  HEALTH_CHECK_PASSED = "Health check passed",
}

export enum OverviewEnum {
  OVERVIEW = "overview",
}

export enum BotNameEnum {
  AVAIL_BOT = "Avail Bot",
  SHARDEUM_BOT = "Shardeum Bot",
  CELESTIA_BOT = "Celestia Bot",
}

export enum StatusEnum {
  NONE = "none",
  MINOR = "minor",
  MAJOR = "major",
  ERROR = "error",
}

export const Bots = [
  {
    name: "Test Bot",
    url: "http://localhost:8111",
    banner: AvailBanner,
    tgUrl: "",
  },
  {
    name: BotNameEnum.AVAIL_BOT,
    url: AVAIL_BOT_URL,
    banner: AvailBanner,
    description: `Avail is a cutting-edge platform designed for the next wave of apps and secure rollups. It excels in security, letting light clients easily check data using a peer-to-peer network. Developers love Avail for its simple integration—no worries about validator sets or tokenomics. With Avail's strong data checks and security features, building fraud-proof blockchain apps is easy.

    Avail makes transactions smooth by focusing on order and publishing. Users can check block data without downloading the whole thing, making it efficient. Avail is flexible, supporting different environments like EVM and WASM. This means developers have a solid base for various blockchain apps.
    
    Ready to spin your next Avail node? See how you can spin and manage your Avail node on dCloud in seconds with Spheron powered by Akash Network.`,
    tgUrl: AVAIL_BOT_TG_URL,
  },
  {
    name: BotNameEnum.SHARDEUM_BOT,
    url: SHARDEUM_BOT_URL,
    banner: ShardeumBanner,
    description: `Shardeum is an EVM based L1 that uses dynamic state sharding to achieve linearly scalability while attaining atomic composability across shards. This means Shardeum can increase its TPS capacity with each validator added to the network to retain low fees forever.

    Shardeum provides the highest throughput capacity of any EVM based L1 without sacrificing on decentralization. Developers can deploy and interact with Solidity or Vyper contracts without special considerations for sharding, since contracts are deployed to unique shards automatically while retaining atomic composability across all shards.
    
    Ready to spin your next Shardeum Validator node, and earn SHM? See how you can spin and manage your Shardeum Validator node on dCloud in seconds with Spheron powered by Akash Network.`,
    tgUrl: SHARDEUM_BOT_TG_URL,
  },
  {
    name: BotNameEnum.CELESTIA_BOT,
    url: CELESTIA_BOT_URL,
    banner: CelestiaBanner,
    description: `Celestia is a modular data availability (DA) network that securely scales with the number of users, making it easy for anyone to launch their own blockchain.

    Rollups and L2s use Celestia as a network for publishing and making transaction data available for anyone to download. For them, Celestia provides high-throughput DA that can be verified easily with a light node.
    
    Ready to spin your next Celestia Light Node? See how you can spin and manage your Celestia Light Node on dCloud in seconds with Spheron.`,
    tgUrl: CELESTIA_BOT_TG_URL,
  },
];

export const statusMapping = {
  [StatusEnum.NONE]: "All Bots Operational",
  [StatusEnum.MINOR]: "Partial Outage",
  [StatusEnum.MAJOR]: "Major Outage",
  [StatusEnum.ERROR]: "Error",
};

export const colorMapping = {
  [StatusEnum.NONE]: "#2590EB",
  [StatusEnum.MINOR]: "#EFBF14",
  [StatusEnum.MAJOR]: "#DE0B0B",
  [StatusEnum.ERROR]: "#DE0B0B",
};
