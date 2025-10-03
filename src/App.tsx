import { useState } from "react";
import { useOverlay } from "./contexts/overlayContext";
import { useContainer } from "./contexts/containerContext";
import {
  clickSticker,
  purchaseDockerfile,
  purchaseDockerRunCommand,
  purchaseDockerComposeFile,
  purchaseRaspberryPiZero2W,
} from "./utils/containerManager";
import Overlay from "./components/Overlay";
import Settings from "./components/Settings";

function App() {
  const { openOverlay } = useOverlay();
  const {
    containers,
    clicks,
    containersPerClick,
    containersPerSecond,
    dockerfiles,
    dockerRunCommands,
    dockerComposeFiles,
    raspberryPiZero2Ws,
    refreshValues,
  } = useContainer();
  const [clicked, setClicked] = useState(false);
  const [purchaseAmount, setPurchaseAmount] = useState(1);

  const calculatePrice = (baseCost: number, currentAmount: number) => {
    let cost = 0;
    for (let i = 0; i < purchaseAmount; i++) {
      cost += Math.floor(baseCost * Math.pow(1.65, currentAmount + i));
    }
    return cost;
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
      alert(result.message);
    }
    refreshValues();
  };

  const handlePurchaseDockerRunCommand = () => {
    const result = purchaseDockerRunCommand(purchaseAmount);
    if (result && !result.success) {
      alert(result.message);
    }
    refreshValues();
  };

  const handlePurchaseDockerComposeFile = () => {
    const result = purchaseDockerComposeFile(purchaseAmount);
    if (result && !result.success) {
      alert(result.message);
    }
    refreshValues();
  };

  const handlePurchaseRaspberryPiZero2W = () => {
    const result = purchaseRaspberryPiZero2W(purchaseAmount);
    if (result && !result.success) {
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
              <h2 className="text-3xl text-center font-bold mt-4">
                Containers: {containers}
              </h2>
              <hr className="w-5/6 border-text my-2 border-2" />
              <div className="flex flex-col w-full h-full items-center overflow-y-auto">
                <div className="w-11/12 flex flex-row items-center justify-center mt-2">
                  <button
                    onClick={() => setPurchaseAmount(1)}
                    className="bg-primary-a2 hover:scale-105 transition-transform duration-200 p-2 rounded-lg font-bold"
                  >
                    1
                  </button>
                  <button
                    onClick={() => setPurchaseAmount(10)}
                    className="bg-primary-a2 hover:scale-105 transition-transform duration-200 p-2 rounded-lg font-bold ml-2"
                  >
                    10
                  </button>
                  <button
                    onClick={() => setPurchaseAmount(25)}
                    className="bg-primary-a2 hover:scale-105 transition-transform duration-200 p-2 rounded-lg font-bold ml-2"
                  >
                    25
                  </button>
                  <button
                    onClick={() => setPurchaseAmount(50)}
                    className="bg-primary-a2 hover:scale-105 transition-transform duration-200 p-2 rounded-lg font-bold ml-2"
                  >
                    50
                  </button>
                  <button
                    onClick={() => setPurchaseAmount(100)}
                    className="bg-primary-a2 hover:scale-105 transition-transform duration-200 p-2 rounded-lg font-bold ml-2"
                  >
                    100
                  </button>
                </div>
                <button
                  onClick={handlePurchaseDockerfile}
                  className="w-11/12 bg-primary-a2 hover:scale-105 transition-transform duration-200 p-2 rounded-lg mt-2"
                >
                  <h3 className="text-xl font-bold">
                    Purchase Dockerfile ({dockerfiles})
                  </h3>
                  <p className="text-left">
                    You can't make a container without a Dockerfile! Get 1 more
                    container per click.
                  </p>
                  <p className="text-left font-bold">
                    Cost: {calculatePrice(25, dockerfiles)} Containers
                  </p>
                </button>
                <button
                  onClick={handlePurchaseDockerRunCommand}
                  className="w-11/12 bg-primary-a2 hover:scale-105 transition-transform duration-200 p-2 rounded-lg mt-2"
                >
                  <h3 className="text-lg font-bold">
                    Purchase Docker Run Command ({dockerRunCommands})
                  </h3>
                  <p className="text-left">
                    A Docker Run command lets you run a single container easily.
                    Get 5 more containers per click.
                  </p>
                  <p className="text-left font-bold">
                    Cost: {calculatePrice(100, dockerRunCommands)} Containers
                  </p>
                </button>
                <button
                  onClick={handlePurchaseDockerComposeFile}
                  className="w-11/12 bg-primary-a2 hover:scale-105 transition-transform duration-200 p-2 rounded-lg mt-2"
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
                  className="w-11/12 bg-primary-a2 hover:scale-105 transition-transform duration-200 p-2 rounded-lg mt-2 mb-4"
                >
                  <h3 className="text-lg font-bold">
                    Purchase Raspberry Pi Zero 2W ({raspberryPiZero2Ws})
                  </h3>
                  <p className="text-left">
                    The Raspberry Pi Zero 2W is a tiny, and extremely affordable
                    (only $15!) computer that you can use to run Docker. Get 10
                    containers per second.
                  </p>
                  <p className="text-left font-bold">
                    Cost: {calculatePrice(5000, raspberryPiZero2Ws)} Containers
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Overlay />
    </>
  );
}

export default App;
