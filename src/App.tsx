import { useState } from "react";
import { useOverlay } from "./contexts/overlayContext";
import { useContainer } from "./contexts/containerContext";
import {
  clickSticker,
  purchaseDockerfile,
  purchaseDockerRunCommand,
  purchaseDockerComposeFile,
  purchaseRaspberryPiZero2W,
  purchaseRaspberryPi4,
  purchaseZimaBoard,
  purchaseDockerSwarm,
} from "./utils/containerManager";
import questsData from "./data/quests.json";
import Overlay from "./components/Overlay";
import Settings from "./components/Settings";

function App() {
  const { openOverlay } = useOverlay();
  const quests = questsData.quests;
  const {
    containers,
    totalContainers,
    clicks,
    containersPerClick,
    containersPerSecond,
    totalPurchases,
    dockerfiles,
    dockerRunCommands,
    dockerComposeFiles,
    raspberryPiZero2Ws,
    raspberryPi4s,
    zimaBoards,
    dockerSwarms,
    refreshValues,
  } = useContainer();
  const [clicked, setClicked] = useState(false);
  const [menu, setMenu] = useState<"shop" | "quests">("shop");
  const [purchaseAmount, setPurchaseAmount] = useState(1);

  const calculatePrice = (baseCost: number, currentAmount: number) => {
    let cost = 0;
    for (let i = 0; i < purchaseAmount; i++) {
      cost += Math.floor(baseCost * Math.pow(1.65, currentAmount + i));
    }
    return cost;
  };

  const canPurchase = (baseCost: number, currentAmount: number) => {
    const cost = calculatePrice(baseCost, currentAmount);
    if (cost < containers) {
      return true;
    }
    return false;
  };

  const handleStickerClick = () => {
    if (clicked) setClicked(false);
    setClicked(true);
    setTimeout(() => setClicked(false), 125);
    clickSticker();
    refreshValues();
  };

  const handlePurchaseDockerfile = () => {
    const result = purchaseDockerfile(purchaseAmount);
    if (result && !result.success) {
      if (result.message === "Not enough containers") {
        return;
      }
      alert(result.message);
    }
    refreshValues();
  };

  const handlePurchaseDockerRunCommand = () => {
    const result = purchaseDockerRunCommand(purchaseAmount);
    if (result && !result.success) {
      if (result.message === "Not enough containers") {
        return;
      }
      alert(result.message);
    }
    refreshValues();
  };

  const handlePurchaseDockerComposeFile = () => {
    const result = purchaseDockerComposeFile(purchaseAmount);
    if (result && !result.success) {
      if (result.message === "Not enough containers") {
        return;
      }
      alert(result.message);
    }
    refreshValues();
  };

  const handlePurchaseRaspberryPiZero2W = () => {
    const result = purchaseRaspberryPiZero2W(purchaseAmount);
    if (result && !result.success) {
      if (result.message === "Not enough containers") {
        return;
      }
      alert(result.message);
    }
    refreshValues();
  };

  const handlePurchaseRaspberryPi4 = () => {
    const result = purchaseRaspberryPi4(purchaseAmount);
    if (result && !result.success) {
      if (result.message === "Not enough containers") {
        return;
      }
      alert(result.message);
    }
    refreshValues();
  };

  const handlePurchaseZimaBoard = () => {
    const result = purchaseZimaBoard(purchaseAmount);
    if (result && !result.success) {
      if (result.message === "Not enough containers") {
        return;
      }
      alert(result.message);
    }
    refreshValues();
  };

  const handlePurchaseDockerSwarm = () => {
    const result = purchaseDockerSwarm(purchaseAmount);
    if (result && !result.success) {
      if (result.message === "Not enough containers") {
        return;
      }
      alert(result.message);
    }
    refreshValues();
  };

  const handleOpenSettings = () => {
    openOverlay(<Settings />);
  };

  return (
    <>
      <div className="w-screen h-screen bg-primary-a0 text-text">
        <div className="grid grid-cols-3 w-screen h-[calc(10%)] bg-primary-a1 items-center justify-center">
          <div />
          <h2 className="text-4xl text-center font-bold">Dockerize Clicker</h2>
          <div className="flex justify-end pr-2">
            <button
              className="bg-primary-a2 p-2 rounded-lg hover:scale-105 transition-transform duration-200 font-bold text-xl"
              onClick={handleOpenSettings}
            >
              Settings
            </button>
          </div>
        </div>
        <div className="flex flex-row w-screen h-[calc(90%)]">
          <div className="flex flex-row w-2/3 items-center justify-center">
            <div className="flex w-1/2 aspect-1 bg-primary-a1 rounded-lg items-center justify-center">
              <img
                src={"/dockerize-sticker.png"}
                alt="Dockerize Sticker"
                onClick={handleStickerClick}
                className={`w-5/6 h-auto  transition-transform duration-300 cursor-pointer ${
                  clicked ? "scale-95" : "hover:scale-105"
                }`}
              />
            </div>
            <div className="grid grid-cols-1 h-auto ml-4 bg-primary-a1 rounded-lg items-center justify-center p-4">
              <h2 className="text-3xl text-center font-bold mb-2">Stats</h2>
              <div className="bg-primary-a2 rounded-lg p-4 flex flex-col items-center">
                <p className="text-2xl font-bold">{containersPerClick}</p>
                <p>Containers per click</p>
              </div>
              <div className="bg-primary-a2 rounded-lg p-4 flex flex-col items-center mt-2">
                <p className="text-2xl font-bold">{containersPerSecond}</p>
                <p>Containers per second</p>
              </div>
              <div className="bg-primary-a2 rounded-lg p-4 flex flex-col items-center mt-2">
                <p className="text-2xl font-bold">{clicks}</p>
                <p>Total Clicks</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-1/3 items-center justify-center">
            <div className="flex flex-col w-5/6 h-11/12 bg-primary-a1 rounded-lg items-center">
              <div className="flex flex-row w-full p-2">
                <button
                  className={`w-full ${
                    menu === "shop"
                      ? "bg-primary-a2"
                      : "bg-gray-400 text-gray-200"
                  } hover:scale-105 transition-transform duration-200 p-2 rounded-lg font-bold`}
                  onClick={() => setMenu("shop")}
                >
                  Shop
                </button>
                <button
                  className={`w-full ${
                    menu === "quests"
                      ? "bg-primary-a2"
                      : "bg-gray-400 text-gray-200"
                  } hover:scale-105 transition-transform duration-200 p-2 rounded-lg font-bold ml-2`}
                  onClick={() => setMenu("quests")}
                >
                  Quests
                </button>
              </div>
              <h2 className="text-3xl text-center font-bold">
                Containers: {containers}
              </h2>
              <hr className="w-5/6 border-text my-2 border-2" />
              {menu === "shop" && (
                <div className="flex flex-col w-full h-full items-center overflow-y-auto">
                  <div className="w-11/12 flex flex-row items-center justify-center mt-2">
                    <button
                      onClick={() => setPurchaseAmount(1)}
                      className={`${
                        purchaseAmount === 1
                          ? "bg-primary-a2"
                          : "bg-gray-400 text-gray-200"
                      } hover:scale-105 transition-transform duration-200 p-2 rounded-lg font-bold`}
                    >
                      1
                    </button>
                    <button
                      onClick={() => setPurchaseAmount(10)}
                      className={`${
                        purchaseAmount === 10
                          ? "bg-primary-a2"
                          : "bg-gray-400 text-gray-200"
                      } hover:scale-105 transition-transform duration-200 p-2 rounded-lg font-bold ml-2`}
                    >
                      10
                    </button>
                    <button
                      onClick={() => setPurchaseAmount(25)}
                      className={`${
                        purchaseAmount === 25
                          ? "bg-primary-a2"
                          : "bg-gray-400 text-gray-200"
                      } hover:scale-105 transition-transform duration-200 p-2 rounded-lg font-bold ml-2`}
                    >
                      25
                    </button>
                    <button
                      onClick={() => setPurchaseAmount(50)}
                      className={`${
                        purchaseAmount === 50
                          ? "bg-primary-a2"
                          : "bg-gray-400 text-gray-200"
                      } hover:scale-105 transition-transform duration-200 p-2 rounded-lg font-bold ml-2`}
                    >
                      50
                    </button>
                    <button
                      onClick={() => setPurchaseAmount(100)}
                      className={`${
                        purchaseAmount === 100
                          ? "bg-primary-a2"
                          : "bg-gray-400 text-gray-200"
                      } hover:scale-105 transition-transform duration-200 p-2 rounded-lg font-bold ml-2`}
                    >
                      100
                    </button>
                  </div>
                  <button
                    onClick={handlePurchaseDockerfile}
                    className={`w-11/12 ${
                      canPurchase(25, dockerfiles)
                        ? "bg-primary-a2"
                        : "bg-gray-400 text-gray-200 cursor-not-allowed"
                    } hover:scale-105 transition-transform duration-200 p-2 rounded-lg mt-2`}
                  >
                    <h3 className="text-xl font-bold">
                      Purchase Dockerfile ({dockerfiles})
                    </h3>
                    <p className="text-left">
                      You can't make a container without a Dockerfile! Get 1
                      more container per click.
                    </p>
                    <p className="text-left font-bold">
                      Cost: {calculatePrice(25, dockerfiles)} Containers
                    </p>
                  </button>
                  <button
                    onClick={handlePurchaseDockerRunCommand}
                    className={`w-11/12 ${
                      canPurchase(100, dockerRunCommands)
                        ? "bg-primary-a2"
                        : "bg-gray-400 text-gray-200 cursor-not-allowed"
                    } hover:scale-105 transition-transform duration-200 p-2 rounded-lg mt-2`}
                  >
                    <h3 className="text-lg font-bold">
                      Purchase Docker Run Command ({dockerRunCommands})
                    </h3>
                    <p className="text-left">
                      A Docker Run command lets you run a single container
                      easily. Get 5 more containers per click.
                    </p>
                    <p className="text-left font-bold">
                      Cost: {calculatePrice(100, dockerRunCommands)} Containers
                    </p>
                  </button>
                  <button
                    onClick={handlePurchaseDockerComposeFile}
                    className={`w-11/12 ${
                      canPurchase(750, dockerComposeFiles)
                        ? "bg-primary-a2"
                        : "bg-gray-400 text-gray-200 cursor-not-allowed"
                    } hover:scale-105 transition-transform duration-200 p-2 rounded-lg mt-2`}
                  >
                    <h3 className="text-lg font-bold">
                      Purchase Docker Compose File ({dockerComposeFiles})
                    </h3>
                    <p className="text-left">
                      A Docker Compose file helps you manage multi-container
                      deployments. Get 30 more containers per click.
                    </p>
                    <p className="text-left font-bold">
                      Cost: {calculatePrice(750, dockerComposeFiles)} Containers
                    </p>
                  </button>
                  <button
                    onClick={handlePurchaseRaspberryPiZero2W}
                    className={`w-11/12 ${
                      canPurchase(5000, raspberryPiZero2Ws)
                        ? "bg-primary-a2"
                        : "bg-gray-400 text-gray-200 cursor-not-allowed"
                    } hover:scale-105 transition-transform duration-200 p-2 rounded-lg mt-2`}
                  >
                    <h3 className="text-lg font-bold">
                      Purchase Raspberry Pi Zero 2W ({raspberryPiZero2Ws})
                    </h3>
                    <p className="text-left">
                      The Raspberry Pi Zero 2W is a tiny, and extremely
                      affordable (only $15!) computer that you can use to run
                      Docker. Get 10 containers per second.
                    </p>
                    <p className="text-left font-bold">
                      Cost: {calculatePrice(5000, raspberryPiZero2Ws)}{" "}
                      Containers
                    </p>
                  </button>
                  <button
                    onClick={handlePurchaseRaspberryPi4}
                    className={`w-11/12 ${
                      canPurchase(30000, raspberryPi4s)
                        ? "bg-primary-a2"
                        : "bg-gray-400 text-gray-200 cursor-not-allowed"
                    } hover:scale-105 transition-transform duration-200 p-2 rounded-lg mt-2`}
                  >
                    <h3 className="text-lg font-bold">
                      Purchase Raspberry Pi 4 ({raspberryPi4s})
                    </h3>
                    <p className="text-left">
                      The Raspberry Pi 4 is a powerful single board computer
                      (sbc) that can be great as a home server. Get 100
                      containers per second.
                    </p>
                    <p className="text-left font-bold">
                      Cost: {calculatePrice(30000, raspberryPi4s)} Containers
                    </p>
                  </button>
                  <button
                    onClick={handlePurchaseZimaBoard}
                    className={`w-11/12 ${
                      canPurchase(75000, zimaBoards)
                        ? "bg-primary-a2"
                        : "bg-gray-400 text-gray-200 cursor-not-allowed"
                    } hover:scale-105 transition-trasnsform duration-200 p-2 rounded-lg mt-2`}
                  >
                    <h3 className="text-lg font-bold">
                      Purchase ZimaBoard ({zimaBoards})
                    </h3>
                    <p className="text-left">
                      The ZimaBoard is another SBC that is designed to be a home
                      server. It was meant to be the prize for Dockerize, but it
                      was sold out during fulfilment. Get 250 containers per
                      second.
                    </p>
                    <p className="text-left font-bold">
                      Cost: {calculatePrice(75000, zimaBoards)} Containers
                    </p>
                  </button>
                  <button
                    onClick={handlePurchaseDockerSwarm}
                    className={`w-11/12 ${
                      canPurchase(100000, dockerSwarms)
                        ? "bg-primary-a2"
                        : "bg-gray-400 text-gray-200 cursor-not-allowed"
                    } hover:scale-105 transition-transform duration-200 p-2 rounded-lg mt-2 mb-4`}
                  >
                    <h3 className="text-lg font-bold">
                      Purchase Docker Swarm ({dockerSwarms})
                    </h3>
                    <p className="text-left">
                      Docker Swarm is a system for manaing clusters of machines
                      to deploy containers. Get 500 more containers per click.
                    </p>
                    <p className="text-left font-bold">
                      Cost: {calculatePrice(100000, dockerSwarms)} Containers
                    </p>
                  </button>
                </div>
              )}
              {menu === "quests" && (
                <div className="flex flex-col w-full h-full items-center overflow-y-auto">
                  {quests.map((quest) => {
                    const targetMap = {
                      clicks: clicks,
                      purchases: totalPurchases,
                      containers: containers,
                      totalContainers: totalContainers,
                    };
                    const target =
                      targetMap[
                        quest.target as
                          | "clicks"
                          | "purchases"
                          | "containers"
                          | "totalContainers"
                      ];
                    return (
                      <div className="flex flex-col w-11/12 items-center bg-primary-a2 p-2 rounded-lg mt-1 mb-1">
                        <h3 className="text-lg font-bold text-center">
                          {quest.name}
                        </h3>
                        <p className="text-left w-full">{quest.description}</p>
                        <p className="text-left font-bold w-full">
                          Reward: {quest.reward} Containers
                        </p>
                        <div className="w-5/6 bg-primary-a0 h-6 rounded-lg">
                          <div
                            className={`bg-text h-full text-primary-a2 font-bold justify-center text-sm text-center transition-all duration-300 rounded-lg`}
                            style={{
                              width: `${Math.min(
                                Math.floor((target / quest.targetValue) * 100),
                                100
                              )}%`,
                            }}
                          >
                            {`${target}/${quest.targetValue}`}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Overlay />
    </>
  );
}

export default App;
