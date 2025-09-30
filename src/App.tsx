import DockerizeSticker from "./assets/orph-docker-sticker.svg?react";

function App() {
  return (
    <>
      <div className="w-screen h-screen bg-primary-a0 text-text">
        <div className="w-screen h-[calc(10%)] bg-primary-a1 flex items-center justify-center">
          <h2 className="text-4xl text-center font-bold">Dockerize Clicker</h2>
        </div>
        <div className="flex flex-row w-screen h-[calc(90%)]">
          <div className="flex flex-col w-3/4 items-center justify-center">
            <div className="flex w-1/2 h-2/3 bg-primary-a1 rounded-lg items-center justify-center">
              <DockerizeSticker
                onClick={() => console.log("Docker Sticker Clicked!")}
                style={{ pointerEvents: "auto" }}
                className="w-5/6 h-5/6 hover:scale-105 transition-transform duration-300 cursor-pointer"
              />
            </div>
          </div>
          <div className="flex flex-col w-1/4 items-center justify-center bg-blue-400"></div>
        </div>
      </div>
    </>
  );
}

export default App;
