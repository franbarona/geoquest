import ContainerComponent from "./ContainerComponent";

const Timer = ({ timeLeft }: { timeLeft: number }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes} : ${seconds.toString().padStart(2, "0")}`;

  return (
    <div className="fixed top-3 lg:top-6 right-18 lg:left-6 z-1000 w-20 lg:w-35 pointer-events-none">
      <ContainerComponent>
        <div className="text-xl lg:text-2xl font-bold text-cyan-50 tabular-nums">
          {formattedTime}
        </div>
      </ContainerComponent>
    </div>
  );
};

export default Timer;
