import { useContainer } from "./contexts/containerContext";
import { clickSticker, purchaseDockerfile } from "./utils/containerManager";

function App() {
  const { containers, dockerfiles, refreshValues } = useContainer();

  const handleStickerClick = () => {
    clickSticker();
    refreshValues();
  };

  const handlePurchaseDockerfile = () => {
    const result = purchaseDockerfile(1);
    if (result && !result.success) {
      alert(result.message);
    }
    refreshValues();
  };

  return (
    <>
      <div className="w-screen h-screen bg-primary-a0 text-text">
        <div className="w-screen h-[calc(10%)] bg-primary-a1 flex items-center justify-center">
          <h2 className="text-4xl text-center font-bold">Dockerize Clicker</h2>
        </div>
        <div className="flex flex-row w-screen h-[calc(90%)]">
          <div className="flex flex-col w-2/3 items-center justify-center">
            <div className="flex w-1/2 aspect-1 bg-primary-a1 rounded-lg items-center justify-center">
              <img
                src={"/dockerize-sticker.png"}
                alt="Dockerize Sticker"
                onClick={handleStickerClick}
                className="w-5/6 h-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
              />
            </div>
          </div>
          <div className="flex flex-col w-1/3 items-center justify-center">
            <div className="flex flex-col w-5/6 h-11/12 bg-primary-a1 rounded-lg items-center">
              <h2 className="text-3xl text-center font-bold mt-4">
                Containers: {containers}
              </h2>
              <hr className="w-5/6 border-text my-2 border-2" />
              <div className="flex flex-col w-full h-full items-center overflow-y-auto">
                <button
                  onClick={handlePurchaseDockerfile}
                  className="w-5/6 bg-primary-a2 hover:scale-105 transition-transform duration-200 p-2 rounded-lg mt-2"
                >
                  <h3 className="text-xl font-bold">
                    Purchase Dockerfile ({dockerfiles})
                  </h3>
                  <p className="text-left">
                    You can't make a container without a Dockerfile! Get 1 more
                    container per click.
                  </p>
                  <p className="text-left font-bold">
                    Cost: {Math.floor(25 * Math.pow(1.65, dockerfiles))}{" "}
                    Containers
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
