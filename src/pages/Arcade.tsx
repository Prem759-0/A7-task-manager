import styled from "@emotion/styled";
import { useEffect, useState, useCallback, useRef } from "react";
import { TopBar } from "../components";
import { ColorPalette } from "../theme/themeConfig";
import { fadeIn } from "../styles/keyframes.styled";

const GRID_SIZE = 20;
const INITIAL_SPEED = 150;

type Point = { x: number; y: number };

const Arcade = () => {
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 15, y: 10 });
  const [direction, setDirection] = useState<Point>({ x: 1, y: 0 });
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    return parseInt(localStorage.getItem("taskEaterHighScore") || "0", 10);
  });
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [isFlashing, setIsFlashing] = useState<boolean>(false);

  const directionRef = useRef(direction);

  // Simple Web Audio API sound generator
  const playSound = useCallback((type: "move" | "eat" | "crash") => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      if (type === "move") {
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(400, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.05);
        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.05);
      } else if (type === "eat") {
        oscillator.type = "square";
        oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
        oscillator.frequency.setValueAtTime(1200, audioCtx.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.2);
      } else if (type === "crash") {
        oscillator.type = "sawtooth";
        oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.3);
        gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.3);
      }
    } catch (e) {
      console.warn("AudioContext not supported or blocked", e);
    }
  }, []);

  useEffect(() => {
    document.title = "Todo App - Arcade";
  }, []);

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    setSnake((prevSnake) => {
      const head = prevSnake[0];
      const newHead = {
        x: head.x + directionRef.current.x,
        y: head.y + directionRef.current.y,
      };

      // Check wall collision
      if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
        playSound("crash");
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
        setGameOver(true);
        return prevSnake;
      }

      // Check self collision
      if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
        playSound("crash");
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        playSound("eat");
        setIsFlashing(true);
        setTimeout(() => setIsFlashing(false), 100);
        setScore((s) => {
          const newScore = s + 10;
          if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem("taskEaterHighScore", newScore.toString());
          }
          return newScore;
        });
        setFood({
          x: Math.floor(Math.random() * GRID_SIZE),
          y: Math.floor(Math.random() * GRID_SIZE),
        });
      } else {
        newSnake.pop(); // remove tail if no food eaten
      }

      return newSnake;
    });
  }, [gameOver, isPaused, food, highScore, playSound]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default scrolling for arrow keys
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case "ArrowUp":
          if (directionRef.current.y !== 1) {
            setDirection({ x: 0, y: -1 });
            directionRef.current = { x: 0, y: -1 };
            playSound("move");
          }
          break;
        case "ArrowDown":
          if (directionRef.current.y !== -1) {
            setDirection({ x: 0, y: 1 });
            directionRef.current = { x: 0, y: 1 };
            playSound("move");
          }
          break;
        case "ArrowLeft":
          if (directionRef.current.x !== 1) {
            setDirection({ x: -1, y: 0 });
            directionRef.current = { x: -1, y: 0 };
            playSound("move");
          }
          break;
        case "ArrowRight":
          if (directionRef.current.x !== -1) {
            setDirection({ x: 1, y: 0 });
            directionRef.current = { x: 1, y: 0 };
            playSound("move");
          }
          break;
        case " ":
        case "Escape":
          setIsPaused((p) => !p);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playSound]);

  useEffect(() => {
    const speed = Math.max(50, INITIAL_SPEED - Math.floor(score / 50) * 10);
    const interval = setInterval(moveSnake, speed);
    return () => clearInterval(interval);
  }, [moveSnake, score]);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 1, y: 0 });
    directionRef.current = { x: 1, y: 0 };
    setFood({
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    });
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
  };

  const renderGrid = () => {
    const grid = [];
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        const isSnake = snake.some((segment) => segment.x === col && segment.y === row);
        const isHead = snake[0].x === col && snake[0].y === row;
        const isFood = food.x === col && food.y === row;

        grid.push(
          <Cell key={`${row}-${col}`} $isSnake={isSnake} $isHead={isHead} $isFood={isFood} />,
        );
      }
    }
    return grid;
  };

  return (
    <>
      <TopBar title="Arcade" />
      <PageContainer>
        <GameHeader>
          <Title>TASK EATER</Title>
          <ScoreContainer>
            <Score>HI: {highScore}</Score>
            <Score>SCORE: {score}</Score>
          </ScoreContainer>
        </GameHeader>

        <GameBoyWrapper className={isShaking ? "shake" : ""} $isFlashing={isFlashing}>
          <ScreenContainer>
            <Grid $size={GRID_SIZE}>{renderGrid()}</Grid>
            {gameOver && (
              <Overlay>
                <OverlayTitle>GAME OVER</OverlayTitle>
                <OverlayScore>FINAL SCORE: {score}</OverlayScore>
                <StartButton onClick={resetGame}>PLAY AGAIN</StartButton>
              </Overlay>
            )}
            {isPaused && !gameOver && (
              <Overlay>
                <OverlayTitle>PAUSED</OverlayTitle>
                <StartButton onClick={() => setIsPaused(false)}>RESUME</StartButton>
              </Overlay>
            )}
          </ScreenContainer>

          {/* Mobile D-Pad */}
          <MobileControls>
            <ControlRow>
              <ControlButton
                onClick={() => {
                  if (directionRef.current.y !== 1) {
                    setDirection({ x: 0, y: -1 });
                    directionRef.current = { x: 0, y: -1 };
                    playSound("move");
                  }
                }}
              >
                ▲
              </ControlButton>
            </ControlRow>
            <ControlRow>
              <ControlButton
                onClick={() => {
                  if (directionRef.current.x !== 1) {
                    setDirection({ x: -1, y: 0 });
                    directionRef.current = { x: -1, y: 0 };
                    playSound("move");
                  }
                }}
              >
                ◀
              </ControlButton>
              <ControlButton onClick={() => setIsPaused(!isPaused)}>
                {isPaused ? "▶" : "⏸"}
              </ControlButton>
              <ControlButton
                onClick={() => {
                  if (directionRef.current.x !== -1) {
                    setDirection({ x: 1, y: 0 });
                    directionRef.current = { x: 1, y: 0 };
                    playSound("move");
                  }
                }}
              >
                ▶
              </ControlButton>
            </ControlRow>
            <ControlRow>
              <ControlButton
                onClick={() => {
                  if (directionRef.current.y !== -1) {
                    setDirection({ x: 0, y: 1 });
                    directionRef.current = { x: 0, y: 1 };
                    playSound("move");
                  }
                }}
              >
                ▼
              </ControlButton>
            </ControlRow>
          </MobileControls>
        </GameBoyWrapper>
      </PageContainer>
    </>
  );
};

export default Arcade;

// --- STYLES ---

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  animation: ${fadeIn} 0.5s ease;
  padding-bottom: 100px;
`;

const GameHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-family: "Bangers", cursive;
  font-size: 2.5rem;
  margin: 0;
  color: ${ColorPalette.purple};
  text-shadow: 3px 3px 0px #000;
  letter-spacing: 2px;
  transform: rotate(-2deg);
`;

const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`;

const Score = styled.h2`
  font-family: "Bangers", cursive;
  font-size: 1.5rem;
  margin: 0;
  background: #000;
  color: ${ColorPalette.yellow};
  padding: 4px 16px;
  border-radius: 8px;
  transform: rotate(2deg);
  box-shadow: 4px 4px 0px ${ColorPalette.purple};
`;

const GameBoyWrapper = styled.div<{ $isFlashing?: boolean }>`
  background: ${({ theme }) => (theme.darkmode ? "#333" : "#f0f0f0")};
  border: 6px solid #000;
  border-radius: 24px;
  padding: 20px;
  box-shadow: 12px 12px 0px #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: filter 0.1s ease;
  filter: ${({ $isFlashing }) => ($isFlashing ? "invert(100%)" : "none")};

  &.shake {
    animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  @keyframes shake {
    10%,
    90% {
      transform: translate3d(-2px, 0, 0);
    }
    20%,
    80% {
      transform: translate3d(4px, 0, 0);
    }
    30%,
    50%,
    70% {
      transform: translate3d(-8px, 0, 0);
    }
    40%,
    60% {
      transform: translate3d(8px, 0, 0);
    }
  }
`;

const ScreenContainer = styled.div`
  position: relative;
  background: #b1d354; /* Gameboy green screen color */
  border: 6px solid #000;
  border-radius: 12px;
  padding: 8px;
  box-shadow: inset 4px 4px 8px rgba(0, 0, 0, 0.4);
`;

const Grid = styled.div<{ $size: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $size }) => $size}, 15px);
  grid-template-rows: repeat(${({ $size }) => $size}, 15px);
  gap: 1px;

  @media (max-width: 500px) {
    grid-template-columns: repeat(${({ $size }) => $size}, 3vw);
    grid-template-rows: repeat(${({ $size }) => $size}, 3vw);
  }
`;

const Cell = styled.div<{ $isSnake: boolean; $isHead: boolean; $isFood: boolean }>`
  background-color: ${({ $isSnake, $isHead, $isFood }) =>
    $isHead
      ? "#000"
      : $isSnake
        ? "#333"
        : $isFood
          ? "#ff2f2f" // Food is bright red like an urgent task
          : "rgba(0, 0, 0, 0.05)"};
  border-radius: ${({ $isHead, $isFood }) => ($isHead ? "4px" : $isFood ? "50%" : "2px")};
  box-shadow: ${({ $isFood }) => ($isFood ? "2px 2px 0px #000" : "none")};
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  z-index: 10;
`;

const OverlayTitle = styled.h2`
  font-family: "Bangers", cursive;
  color: ${ColorPalette.red};
  font-size: 3rem;
  margin: 0;
  text-shadow: 3px 3px 0px #000;
  letter-spacing: 2px;
  transform: rotate(-5deg);
`;

const OverlayScore = styled.p`
  font-family: "Bangers", cursive;
  color: #fff;
  font-size: 1.5rem;
  margin: 10px 0 20px 0;
`;

const StartButton = styled.button`
  font-family: "Bangers", cursive;
  font-size: 1.5rem;
  background: ${ColorPalette.cyan};
  color: #000;
  border: 4px solid #000;
  padding: 8px 24px;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 4px 4px 0px #000;
  transition: all 0.1s ease;

  &:hover {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px #000;
  }
  &:active {
    transform: translate(4px, 4px);
    box-shadow: 0px 0px 0px #000;
  }
`;

const MobileControls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 24px;
  gap: 8px;

  @media (min-width: 768px) {
    display: none; // Hide on desktop
  }
`;

const ControlRow = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

const ControlButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: ${ColorPalette.purple};
  color: #fff;
  border: 4px solid #000;
  box-shadow: 4px 4px 0px #000;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:active {
    transform: translate(4px, 4px);
    box-shadow: 0px 0px 0px #000;
  }
`;
