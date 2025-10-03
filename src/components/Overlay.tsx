import { useOverlay } from "../contexts/overlayContext";

export default function Overlay() {
  const { isOverlayOpen, overlayContent, closeOverlay } = useOverlay();

  if (!isOverlayOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 w-screen h-screen"
      onClick={closeOverlay}
    >
      <div
        className="bg-primary-a0 p-6 rounded-lg text-text max-h-11/12 overflow-y-auto border-4 border-text"
        onClick={(e) => e.stopPropagation()}
      >
        {overlayContent}
      </div>
    </div>
  );
}
