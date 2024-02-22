export enum HealthStatusEnum {
  HEALTH_CHECK_PASSED = "Health check passed",
}

export enum StatusEnum {
  NONE = "none",
  MINOR = "minor",
  MAJOR = "major",
  ERROR = "error",
}
export const allBotStatusMapping = {
  [StatusEnum.NONE]: "All Bots Operational",
  [StatusEnum.MINOR]: "Partial Outage",
  [StatusEnum.MAJOR]: "Major Outage",
  [StatusEnum.ERROR]: "Error",
};

export const statusMapping = {
  [StatusEnum.NONE]: "Operational",
  [StatusEnum.MINOR]: "Partial Outage",
  [StatusEnum.MAJOR]: "Major Outage",
  [StatusEnum.ERROR]: "Error",
};

export const colorMapping = {
  [StatusEnum.NONE]: "rgba(28, 128, 86, 1)",
  [StatusEnum.MINOR]: "rgba(239, 191, 20, 1)",
  [StatusEnum.MAJOR]: "rgba(222, 11, 11, 1)",
  [StatusEnum.ERROR]: "rgba(222, 11, 11, 1)",
};

export const backgroundColorMapping = {
  [StatusEnum.NONE]: "rgba(28, 128, 86, 0.3)",
  [StatusEnum.MINOR]: "rgba(239, 191, 20, 0.3)",
  [StatusEnum.MAJOR]: "rgba(222, 11, 11, 0.3)",
  [StatusEnum.ERROR]: "rgba(222, 11, 11, 0.3)",
};

export const BOT_MARKETPLACE_DOCUMENTATION_LINK =
  "https://github.com/spheronFdn/spheron-bot-marketplace/blob/main/README.md";
export const BOT_MARKETPLACE_GITHUB_LINK =
  "https://github.com/spheronFdn/spheron-bot-marketplace";
export const SPHERON_COMMUNITY_LINK = "https://community.spheron.network/";
export const SPHERON_TWITTER_LINK =
  "https://twitter.com/SpheronFDN?utm_source=LP&utm_medium=landing_page&utm_campaign=landing_page";
export const SPHERON_DISCORD_LINK =
  "https://discord.com/invite/spheron-network-745315423783878757";
