import type { GameMode } from "../types";
import ContainerComponent from "./ContainerComponent";
import StartButton from "./StartButtonComponent";

interface ModalProps {
  onClose: () => void;
  onExit: () => void;
  onReset: () => void;
  gameMode: GameMode;
}

const Modal = ({ onClose, onExit, onReset, gameMode }: ModalProps) => (
  <div
    className="fixed inset-0 bg-black/70 flex items-center justify-center z-[2000] pointer-events-auto"
    onClick={onClose}
  >
    <ContainerComponent>
      <div
        className="px-5 pb-5 pt-2.5 lg:px-10 lg:pb-10 lg:pt-5 w-110 max-w-[90vw] max-h-[90vh] text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 lg:mb-8">
          <h2 className="text-3xl lg:text-4xl font-semibold text-cyan-50 pb-3 border-b-neutral-700 border-b-3">
            Menu
          </h2>
          {gameMode === 'normal' && (
            <h3 className="text-2xl lg:text-3xl text-neutral-400 font-[Trench]">
              <strong className="text-white">Attention!</strong> The timer keeps
              running
            </h3>
          )}
        </div>

        <div className="flex flex-col gap-4 lg:gap-6">
          <StartButton
            onClick={() => {
              onReset();
              onClose();
            }}
            fullWidth
          >
            Restart
          </StartButton>

          <StartButton onClick={onExit} fullWidth>
            Exit
          </StartButton>

          <button
            onClick={onClose}
            className="bg-transparent text-slate-200 text-xl border-none cursor-pointer w-full hover:text-slate-100 hover:scale-110 ease-in-out transition-all"
          >
            CANCEL
          </button>
        </div>
      </div>
    </ContainerComponent>
  </div>
);

export default Modal;
