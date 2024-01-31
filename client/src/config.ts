export enum HealthStatusEnum {
  HEALTH_CHECK_PASSED = "Health check passed",
}

export enum StatusEnum {
  NONE = "none",
  MINOR = "minor",
  MAJOR = "major",
  ERROR = "error",
}

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
