import type { GameMode } from "../types";
import StartButton from "./StartButtonComponent";

interface StartScreenProps {
  onStart: (mode: GameMode) => void;
}

const StartScreen = ({ onStart }: StartScreenProps) => {
  return (
    <div className="fixed inset-0 overflow-hidden w-screen h-screen">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/particles-bg3.mp4" type="video/mp4" />
      </video>

      <div className="absolute z-10 top-0 left-0 w-screen h-screen flex flex-col justify-start items-center gap-8 text-white text-center">
        <div className="flex-col gap-0 text-[6.5em] sm:text-[8em] md:text-[10em] lg:text-[12em] flex lg:flex-row bg-linear-to-r from-transparent via-neutral-300 to-transparent text-transparent bg-clip-text transition-all duration-500 ease-in-out">
          <span className="">GEO</span>
          <span className="-mt-[0.6em] lg:mt-0 transition-all duration-500 ease-in-out">
            QUEST
          </span>
        </div>
        <p className="text-3xl lg:text-4xl -mt-10 opacity-90 font-[Trench]">
          A mini game to find the country
        </p>
        <div className="flex flex-col gap-4">
          <StartButton onClick={() => onStart("fast")} border="rounded-full">Quick Game</StartButton>
          <StartButton onClick={() => onStart("learning")} border="rounded-full">
            Learning Mode
          </StartButton>
        </div>
        <div className="absolute top-[65vh] lg:top-[60vh]">
          <div className="w-full min-w-[900px]">
            <img src="earth.png" alt="" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-2 left-[50%] translate-x-[-50%] text-white opacity-70">
        Click on the correct countries to win points
      </div>
    </div>
  );
};

export default StartScreen;
