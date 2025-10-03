import { useState } from "react";
import { resetGame } from "../utils/containerManager";
import { useOverlay } from "../contexts/overlayContext";
import { useContainer } from "../contexts/containerContext";

export default function Settings() {
  const { closeOverlay } = useOverlay();
  const { refreshValues } = useContainer();
  const [firstResetClick, setFirstResetClick] = useState(false);

  const handleReset = () => {
    if (!firstResetClick) {
      setFirstResetClick(true);
      alert("Are you sure you want to reset? Click again to confirm.");
      return;
    }
    resetGame();
    setFirstResetClick(false);
    closeOverlay();
    refreshValues();
  };

  return (
    <div className="flex flex-col items-center w-80">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <button
        className="w-5/6 bg-red-500 hover:scale-105 transition-transform duration-200 font-bold p-2 rounded-lg"
        onClick={handleReset}
      >
        {firstResetClick ? "Are you sure?" : "Reset"}
      </button>
      <button
        className="w-5/6 bg-primary-a1 hover:scale-105 transition-transform duration-200 font-bold p-2 rounded-lg mt-4"
        onClick={closeOverlay}
      >
        Close
      </button>
    </div>
  );
}
