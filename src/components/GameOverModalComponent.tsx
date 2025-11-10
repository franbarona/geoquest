import ContainerComponent from "./ContainerComponent";
import StartButton from "./StartButtonComponent";

const GameOverModal = ({
  score,
  attempts,
  onRestart,
  onExit,
}: {
  score: number;
  attempts: number;
  onRestart: () => void;
  onExit: () => void;
}) => (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-2000 pointer-events-auto">
    <ContainerComponent>
      <div className="px-5 pb-5 pt-2.5 lg:px-10 lg:pb-10 lg:pt-5 w-110 max-w-[90vw] max-h-[90vh] text-center">
        <h2 className="text-4xl font-bold text-cyan-50 mb-6">¡Game Over!</h2>

        <div className="mb-4 lg:mb-8 flex sm:flex-row lg:flex-col justify-center gap-3">
          <div className="rounded-lg p-2 lg:p-4 border-cyan-50 border-2 flex-1">
            <p className="text-xl text-emerald-100 mb-1">Found</p>
            <p className="text-3xl lg:text-6xl font-bold text-emerald-500">{score}</p>
          </div>
          <div className="rounded-lg p-2 lg:p-4 border-cyan-50 border-2 flex-1">
            <p className="text-xl text-red-100 mb-1">Failures</p>
            <p className="text-3xl lg:text-6xl font-bold text-red-500">{attempts}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <StartButton
            onClick={() => {
              onRestart();
            }}
            fullWidth
          >
            Restart
          </StartButton>

          <StartButton onClick={onExit} fullWidth>
            Exit
          </StartButton>
        </div>
      </div>
    </ContainerComponent>
  </div>
);

export default GameOverModal;
