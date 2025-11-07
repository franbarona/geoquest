import { useState, useEffect, useRef, useCallback } from "react";
// import Globe from "react-globe.gl";
import MenuButton from "./components/MenuButtonComponent";
import Modal from "./components/ModalComponent";
import type { GameMode } from "./types";
import { COLORS, FAST_GAME_TIME } from "./constants";
import { useCountriesData } from "./hooks/useCountriesData";
import StartScreen from "./components/StartScreenComponent";
import GlobeComponent from "./components/GlobeComponent";
import ScoreDisplay from "./components/ScoreDisplayComponent";
import Timer from "./components/TimerComponent";
import TargetCountryDisplay from "./components/TargetCountryDisplayComponent";
import GameOverModal from "./components/GameOverModalComponent";

interface Country {
  name: string;
  lat: number;
  lng: number;
  id: string;
}

export default function GeographyGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode>("learning");
  const [showModal, setShowModal] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(FAST_GAME_TIME);
  const [targetCountry, setTargetCountry] = useState<Country | null>(null);
  const [usedCountries, setUsedCountries] = useState<Set<string>>(new Set());
  const [countryColors, setCountryColors] = useState<Map<string, string>>(
    new Map()
  );
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const globeRef = useRef<any>();

  const { countries, polygonsData, loading } = useCountriesData();

  // Timer effect for fast mode
  useEffect(() => {
    if (gameMode === "fast" && gameStarted && !showGameOver && timeLeft > 0) {
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

        setTimeout(() => selectRandomCountry(), 1500);
      } else {
        setCountryColors((prev) =>
          new Map(prev).set(clickedId, COLORS.INCORRECT)
        );
      }
    },
    [targetCountry, selectRandomCountry]
  );

  const resetGame = useCallback(() => {
    setScore(0);
    setAttempts(0);
    setUsedCountries(new Set());
    setCountryColors(new Map());
    setTimeLeft(FAST_GAME_TIME);
    setShowGameOver(false);
    selectRandomCountry();
  }, [selectRandomCountry]);

  const startNewGame = useCallback(
    (mode: GameMode) => {
      setGameMode(mode);
      setGameStarted(true);
      setTimeLeft(FAST_GAME_TIME);
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
    setTimeLeft(FAST_GAME_TIME);
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
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f172a",
          color: "white",
          fontSize: "24px",
        }}
      >
        Cargando mapa...
      </div>
    );
  }

  return (
    <>
      <style>{`
        body, html, #root {
          margin: 0;
          padding: 0;
          overflow: hidden;
          width: 100vw;
          height: 100vh;
        }
      `}</style>

      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          zIndex: 1000,
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

      {gameMode === "fast" && <Timer timeLeft={timeLeft} />}
      {targetCountry && (
        <TargetCountryDisplay countryName={targetCountry.name} />
      )}
      <ScoreDisplay score={score} attempts={attempts} />
      <MenuButton onClick={() => setShowModal(true)} />

      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          onExit={handleExitGame}
          onReset={resetGame}
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
