import Button from "./ButtonComponent";
import ContainerComponent from "./ContainerComponent";
import StartButton from "./StartButtonComponent";

interface ModalProps {
  onClose: () => void;
  onExit: () => void;
  onReset: () => void;
}

const Modal = ({ onClose, onExit, onReset }: ModalProps) => (
  <div
    className="fixed inset-0 bg-black/70 flex items-center justify-center z-[2000] pointer-events-auto"
    onClick={onClose}
  >
    <ContainerComponent>
      <div
        className="px-10 pb-10 pt-5 w-110 max-w-[90vw] text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-4xl font-semibold text-cyan-50 mb-8 pb-3 border-b-neutral-700 border-b-3">
          Menu
        </h2>

        <div className="flex flex-col gap-6">
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
{/* 
          <StartButton onClick={onClose} fullWidth>
            Cancel
          </StartButton> */}

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
