import { useContainer } from "./contexts/containerContext";
import { clickSticker } from "./utils/containerManager";

function App() {
  const { containers, refreshValues } = useContainer();

  const handleStickerClick = () => {
    clickSticker();
    refreshValues();
  };

  return (
    <>
      <div className="w-screen h-screen bg-primary-a0 text-text">
        <div className="w-screen h-[calc(10%)] bg-primary-a1 flex items-center justify-center">
          <h2 className="text-4xl text-center font-bold">Dockerize Clicker</h2>
        </div>
        <div className="flex flex-row w-screen h-[calc(90%)]">
          <div className="flex flex-col w-3/4 items-center justify-center">
            <div className="flex w-1/2 aspect-1 bg-primary-a1 rounded-lg items-center justify-center">
              <img
                src={"/dockerize-sticker.png"}
                alt="Dockerize Sticker"
                onClick={handleStickerClick}
                className="w-5/6 h-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
              />
            </div>
          </div>
          <div className="flex flex-col w-1/4 items-center justify-center">
            <div className="flex flex-col w-5/6 h-11/12 bg-primary-a1 rounded-lg items-center overflow-y-auto">
              <h2 className="text-3xl text-center font-bold mt-4">
                Containers: {containers}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
