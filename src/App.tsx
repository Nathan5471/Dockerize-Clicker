import { useState } from "react";
import { useOverlay } from "./contexts/overlayContext";
import { useContainer } from "./contexts/containerContext";
import {
  clickSticker,
  purchaseItem,
  redeemQuest,
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
    shopItems,
    redeemedQuestIds,
    refreshValues,
  } = useContainer();
  const [clicked, setClicked] = useState(false);
  const [menu, setMenu] = useState<"shop" | "quests">("shop");
  const [purchaseAmount, setPurchaseAmount] = useState(1);

  const calculatePrice = (
    baseCost: number,
    scaleFactor: number,
    currentAmount: number
  ) => {
    let cost = 0;
    for (let i = 0; i < purchaseAmount; i++) {
      cost += Math.floor(baseCost * Math.pow(scaleFactor, currentAmount + i));
    }
    return cost;
  };

  const canPurchase = (
    baseCost: number,
    scaleFactor: number,
    currentAmount: number
  ) => {
    const cost = calculatePrice(baseCost, scaleFactor, currentAmount);
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

  const handlePurchaseItem = (id: number) => {
    const shopItem = shopItems.filter((shopItem) => shopItem.id === id);
    const result = purchaseItem(purchaseAmount, shopItem[0]);
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
                  {shopItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handlePurchaseItem(item.id)}
                      className={`w-11/12 ${
                        canPurchase(
                          item.baseCost,
                          item.scaleFactor,
                          item.amountPurchased
                        )
                          ? "bg-primary-a2"
                          : "bg-gray-400 text-gray-200 cursor-not-allowed"
                      } hover:scale-105 transition-transform duration-200 p-2 rounded-lg mt-2`}
                    >
                      <h3 className="text-xl font-bold">
                        Purchase {item.displayName} ({item.amountPurchased})
                      </h3>
                      <p className="text-left">{item.description}</p>
                      <p className="text-left font-bold">
                        Cost:{" "}
                        {calculatePrice(
                          item.baseCost,
                          item.scaleFactor,
                          item.amountPurchased
                        )}{" "}
                        Containers
                      </p>
                    </button>
                  ))}
                </div>
              )}
              {menu === "quests" && (
                <div className="flex flex-col w-full h-full items-center overflow-y-auto">
                  {quests.map((quest) => {
                    if (redeemedQuestIds.includes(quest.id)) return;
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
                    const canRedeem = !(target < quest.targetValue);
                    return (
                      <div
                        key={quest.id}
                        className="flex flex-col w-11/12 items-center bg-primary-a2 p-2 rounded-lg mt-1 mb-1"
                      >
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
                        {canRedeem && (
                          <button
                            className="text-lg hover:text-xl"
                            onClick={() => {
                              redeemQuest(quest);
                              refreshValues();
                            }}
                          >
                            Claim
                          </button>
                        )}
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
