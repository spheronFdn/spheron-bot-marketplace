import { FC, useEffect, useState } from "react";
import { ethers } from "ethers";
import { SiweMessage } from "siwe";
import Card from "./Card";
import SpheronLogo from "../assets/spheron.png";
import {
  HealthStatusEnum,
  MARKETPLACE_SERVER,
  ModalEnum,
  StatusEnum,
  colorMapping,
  statusMapping,
} from "../config";
import Modal from "./Modal";

interface IOverview {
  bots: any;
  setType: (type: ModalEnum.ADD) => void;
  setIsModalVisible: (isModalVisible: boolean) => void;
}

const Overview: FC<IOverview> = ({ bots, setType, setIsModalVisible }) => {
  const [status, setStatus] = useState({
    indicator: StatusEnum.NONE,
    description: statusMapping[StatusEnum.NONE],
  });
  const [colorCode, setColorCode] = useState(colorMapping.none);

  const checkBotStatus = async () => {
    const promises = bots?.map(async (bot: any) => {
      try {
        const response = await fetch(`${bot.healthUrl}/health-check`);

        if (response.status === 429) {
          console.error("Error: Too Many Requests. Please try again later.");
          return;
        }

        const healthStatus = await response.json();
        return healthStatus.message;
      } catch (error) {
        setStatus({
          indicator: StatusEnum.ERROR,
          description: statusMapping[StatusEnum.ERROR],
        });
        setColorCode(colorMapping[StatusEnum.ERROR]);
      }
    });

    const statuses = await Promise.all(promises);

    const operationalCount = statuses.filter(
      (status) => status === HealthStatusEnum.HEALTH_CHECK_PASSED
    ).length;
    const totalCount = statuses.length;

    if (operationalCount === totalCount) {
      setStatus({
        indicator: StatusEnum.NONE,
        description: statusMapping[StatusEnum.NONE],
      });
      setColorCode(colorMapping[StatusEnum.NONE]);
    } else if (operationalCount === Number(0)) {
      setStatus({
        indicator: StatusEnum.MAJOR,
        description: statusMapping[StatusEnum.MAJOR],
      });
      setColorCode(colorMapping[StatusEnum.MAJOR]);
    } else {
      setStatus({
        indicator: StatusEnum.MINOR,
        description: statusMapping[StatusEnum.MINOR],
      });
      setColorCode(colorMapping[StatusEnum.MINOR]);
    }
  };

  useEffect(() => {
    checkBotStatus();
  }, []);

  const createSiweMessage = async (address: string, statement: string) => {
    const res = await fetch(`${MARKETPLACE_SERVER}/user/nonce`, {
      credentials: "include",
    });

    const domain = window.location.host;
    const message = new SiweMessage({
      domain,
      address,
      statement,
      uri: origin,
      version: "1",
      chainId: 1,
      nonce: await res.text(),
    });
    return message.prepareMessage();
  };

  const handleSignin = async () => {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const message = await createSiweMessage(
      address,
      "Sign in with Ethereum to the app."
    );
    const signature = await signer.signMessage(message);
    const walletName = "Metamask";

    const res = await fetch(`${MARKETPLACE_SERVER}/user/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, signature, address, walletName }),
      credentials: "include",
    });

    const response = await res.json();
    const stringifySession = JSON.stringify(response);
    localStorage.setItem("session", stringifySession);
  };

  const handleModal = () => {
    setType(ModalEnum.ADD);
    setIsModalVisible(true);
  };

  return (
    <section>
      <div className="mt-20 mb-14 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <img src={SpheronLogo} alt="spheron-logo" className="w-80" />
          <span className="text-4xl font-semibold">BOT MARKETPLACE</span>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSignin}
        >
          Sign In With Ethereum
        </button>
      </div>
      <div
        className="text-white py-4 w-full my-8 pl-6 font-bold rounded text-xl"
        style={{ backgroundColor: colorCode }}
      >
        {status.description}
      </div>
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleModal}
        >
          Add bot
        </button>
      </div>
      <section className="flex flex-wrap">
        {bots.map((bot: any, i: number) => (
          <Card
            name={bot.name}
            url={bot.healthUrl || ""}
            owner={bot.user}
            key={i}
          />
        ))}
      </section>
    </section>
  );
};

export default Overview;
