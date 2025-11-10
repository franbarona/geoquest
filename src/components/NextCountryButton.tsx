import { useEffect, useState } from "react";
import ContainerComponent from "./ContainerComponent";
import { LuCompass } from "react-icons/lu";

interface NextCountryButtonProps {
  onNext: () => void;
  disabled: boolean;
}

const NextCountryButton = ({
  onNext,
  disabled = false,
}: NextCountryButtonProps) => {
  const [timeLeft, setTimeLeft] = useState(5);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    if (disabled) {
      setTimeLeft(5);
      setIsEnabled(false);
      return;
    }

    if (isEnabled) return;

    if (timeLeft === 0) {
      setIsEnabled(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsEnabled(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isEnabled, disabled]);

  const handleClick = () => {
    if (isEnabled && !disabled) {
      setIsEnabled(false);
      setTimeLeft(5);
      onNext();
    }
  };

  return (
    <div className="fixed bottom-3 lg:bottom-6 right-3 lg:right-6 z-1000 pointer-events-auto">
      <ContainerComponent>
        <button
          onClick={handleClick}
          disabled={!isEnabled || disabled}
          className={`cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out p-0.5 lg:p-2 flex gap-2 items-center px-2 lg:px-4
          ${isEnabled && !disabled ? "opacity-100" : "opacity-10"}`}
        >
          <span className={`text-lg lg:text-xl ${isEnabled && !disabled && 'animate-heartbeat'}`}>Next</span>
          <LuCompass
            className={`text-2xl lg:text-2xl ${
              isEnabled && !disabled && "animate-rotational-wave"
            }`}
          />
        </button>
        {!isEnabled && !disabled && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-white drop-shadow-lg">
              {timeLeft}
            </span>
          </div>
        )}
      </ContainerComponent>
    </div>
  );
};

export default NextCountryButton;
