import { LuCircleCheckBig, LuCircleX } from "react-icons/lu";
import ContainerComponent from "./ContainerComponent";

const ScoreDisplay = ({
  score,
  attempts,
}: {
  score: number;
  attempts: number;
}) => (
  <div className="fixed bottom-3 lg:bottom-6 left-3 lg:left-6 z-1000 flex flex-col gap-2 lg:gap-4 pointer-events-none">
    <ContainerComponent>
      <div className="flex justify-center items-center gap-2 px-2 lg:px-4">
        <LuCircleCheckBig className="text-emerald-500 text-xl lg:text-2xl"/>
        <span className="text-lg lg:text-xl"> Found: </span>
        <strong className="text-xl lg:text-2xl">{score}</strong>
      </div>
    </ContainerComponent>
    <ContainerComponent>
      <div className="flex justify-center items-center gap-2 px-2 lg:px-4">
        <LuCircleX className="text-red-500 text-xl lg:text-2xl"/>
        <span className="text-lg lg:text-xl"> Failed: </span>
        <strong className="text-xl lg:text-2xl">{attempts}</strong>
      </div>
    </ContainerComponent>
  </div>
);

export default ScoreDisplay;
