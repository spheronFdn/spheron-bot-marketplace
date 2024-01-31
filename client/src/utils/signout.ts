import { MARKETPLACE_SERVER } from "../config";

export const signout = async () => {
  localStorage.removeItem("session");
  await fetch(`${MARKETPLACE_SERVER}/user/signout`, {
    credentials: "include",
  });
  window.location.href = "/";
};
