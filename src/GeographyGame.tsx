import { useState, useEffect, useRef, useCallback } from "react";
import MenuButton from "./components/MenuButtonComponent";
import Modal from "./components/ModalComponent";
import type { Country, GameMode } from "./types";
import { COLORS, QUICK_GAME_TIME } from "./constants";
import { useCountriesData } from "./hooks/useCountriesData";
import StartScreen from "./components/StartScreenComponent";
import GlobeComponent from "./components/GlobeComponent";
import ScoreDisplay from "./components/ScoreDisplayComponent";
import Timer from "./components/TimerComponent";
import TargetCountryDisplay from "./components/TargetCountryDisplayComponent";
import GameOverModal from "./components/GameOverModalComponent";
import NextCountryButton from "./components/NextCountryButton";

export default function GeographyGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode>("learning");
  const [showModal, setShowModal] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUICK_GAME_TIME);
  const [targetCountry, setTargetCountry] = useState<Country | null>(null);
  const [usedCountries, setUsedCountries] = useState<Set<string>>(new Set());
  const [countryColors, setCountryColors] = useState<Map<string, string>>(
    new Map()
  );
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const globeRef = useRef<any>(null);

  const { countries, polygonsData, loading } = useCountriesData();

  // Timer effect for normal mode
  useEffect(() => {
    if (gameMode === "normal" && gameStarted && !showGameOver && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setShowGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameMode, gameStarted, showGameOver, timeLeft]);

  const selectRandomCountry = useCallback(() => {
    if (countries.length === 0) return;

    const availableCountries = countries.filter(
      (c) => !usedCountries.has(c.id)
    );

    if (availableCountries.length === 0) {
      setUsedCountries(new Set());
      setCountryColors(new Map());
      const randomCountry =
        countries[Math.floor(Math.random() * countries.length)];
      setTargetCountry(randomCountry);
      return;
    }

    const randomCountry =
      availableCountries[Math.floor(Math.random() * availableCountries.length)];
    setTargetCountry(randomCountry);

    if (globeRef.current) {
      globeRef.current.pointOfView(
        { lat: randomCountry.lat, lng: randomCountry.lng, altitude: 2 },
        1000
      );
    }
  }, [countries, usedCountries]);

  const handleCountryClick = useCallback(
    (polygon: any) => {
      if (!targetCountry) return;

      const clickedId = polygon.id || polygon.properties.name;
      setAttempts((prev) => prev + 1);

      if (clickedId === targetCountry.id) {
        setCountryColors((prev) => {
          const newColors = new Map(prev);
          for (const [key, value] of newColors.entries()) {
            if (value === COLORS.INCORRECT) {
              newColors.delete(key);
            }
          }
          newColors.set(clickedId, COLORS.CORRECT);
          return newColors;
        });

        setUsedCountries((prev) => new Set(prev).add(clickedId));
        setScore((prev) => prev + 1);

        setTimeout(() => selectRandomCountry(), 500);
      } else {
        setCountryColors((prev) =>
          new Map(prev).set(clickedId, COLORS.INCORRECT)
        );
      }
    },
    [targetCountry, selectRandomCountry]
  );

  const handleNextCountryClick = useCallback(() => {
    setCountryColors((prev) => {
      const newColors = new Map(prev);
      for (const [key, value] of newColors.entries()) {
        if (value === COLORS.INCORRECT) {
          newColors.delete(key);
        }
      }
      return newColors;
    });
    setTimeout(() => selectRandomCountry(), 0);
  }, [selectRandomCountry]);

  const resetGame = useCallback(() => {
    setScore(0);
    setAttempts(0);
    setUsedCountries(new Set());
    setCountryColors(new Map());
    setTimeLeft(QUICK_GAME_TIME);
    setShowGameOver(false);
    setShowModal(false);
    selectRandomCountry();
  }, [selectRandomCountry]);

  const startNewGame = useCallback(
    (mode: GameMode) => {
      setGameMode(mode);
      setGameStarted(true);
      setTimeLeft(QUICK_GAME_TIME);
      setShowGameOver(false);
      resetGame();
    },
    [resetGame]
  );

  const handleExitGame = useCallback(() => {
    setGameStarted(false);
    setGameMode("learning");
    setShowModal(false);
    setShowGameOver(false);
    setScore(0);
    setAttempts(0);
    setUsedCountries(new Set());
    setCountryColors(new Map());
    setTargetCountry(null);
    setTimeLeft(QUICK_GAME_TIME);
  }, []);

  useEffect(() => {
    if (countries.length > 0 && gameStarted && !targetCountry) {
      selectRandomCountry();
    }
  }, [countries, gameStarted, targetCountry, selectRandomCountry]);

  if (!gameStarted) {
    return <StartScreen onStart={startNewGame} />;
  }

  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-[#0f172a] text-white text-2xl">
        loading ...
      </div>
    );
  }

  return (
    <>
      <div
        className="fixed top-0 left-0 w-screen h-screen overflow-hidden z-1000 "
        style={{
          backgroundImage: "url(particles-bg-img.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <GlobeComponent
          globeRef={globeRef}
          polygonsData={polygonsData}
          countryColors={countryColors}
          onCountryClick={handleCountryClick}
          showTooltip={gameMode === "learning"}
        />
      </div>

      {gameMode === "normal" && <Timer timeLeft={timeLeft} />}
      {targetCountry && (
        <TargetCountryDisplay countryName={targetCountry.name} />
      )}
      <ScoreDisplay score={score} attempts={attempts} />
      <MenuButton onClick={() => setShowModal(true)} />
      <NextCountryButton
        onNext={() => handleNextCountryClick()}
        disabled={false}
      />

      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          onExit={handleExitGame}
          onReset={resetGame}
          gameMode={gameMode}
        />
      )}

      {showGameOver && (
        <GameOverModal
          score={score}
          attempts={attempts}
          onRestart={resetGame}
          onExit={handleExitGame}
        />
      )}
    </>
  );
}
