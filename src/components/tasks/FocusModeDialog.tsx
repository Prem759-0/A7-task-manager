import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  IconButton,
  Tooltip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { PlayArrowRounded, PauseRounded, CloseRounded, ReplayRounded } from "@mui/icons-material";
import styled from "@emotion/styled";
import { Task } from "../../types/user";

const FocusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background: ${({ theme }) => (theme.darkmode ? "#121212" : "#f5f5f5")};
  color: ${({ theme }) => (theme.darkmode ? "#fff" : "#000")};
`;

const TimerText = styled.h1`
  font-size: 8rem;
  font-weight: 800;
  margin: 0;
  font-variant-numeric: tabular-nums;
  text-shadow: 4px 4px 0px ${({ theme }) => theme.primary};
`;

const Controls = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 32px;
`;

const TaskNameText = styled.h2`
  font-size: 2rem;
  margin-bottom: 48px;
  opacity: 0.8;
  max-width: 80%;
  text-align: center;
`;

const SOUNDS = [
  { label: "No Sound", url: "" },
  { label: "Rain", url: "https://actions.google.com/sounds/v1/weather/rain_heavy_loud.ogg" },
  {
    label: "White Noise",
    url: "https://actions.google.com/sounds/v1/water/waves_crashing_on_rock_beach.ogg",
  }, // Ocean waves proxy for white noise
  { label: "Forest", url: "https://actions.google.com/sounds/v1/nature/forest_birds_chirping.ogg" },
];

interface FocusModeDialogProps {
  open: boolean;
  onClose: () => void;
  task: Task | null;
}

export const FocusModeDialog: React.FC<FocusModeDialogProps> = ({ open, onClose, task }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [selectedSound, setSelectedSound] = useState(SOUNDS[0].url);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      // Optional: Play a ding sound here
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (audioRef.current) {
      if (isRunning && selectedSound) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isRunning, selectedSound]);

  useEffect(() => {
    if (!open) {
      setIsRunning(false);
      setTimeLeft(25 * 60);
    }
  }, [open]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <IconButton
        onClick={onClose}
        style={{ position: "absolute", top: 16, right: 16, zIndex: 10 }}
      >
        <CloseRounded fontSize="large" />
      </IconButton>

      <FocusContainer>
        <TaskNameText>🎯 {task?.name}</TaskNameText>

        <TimerText>{formatTime(timeLeft)}</TimerText>

        <Controls>
          <Tooltip title={isRunning ? "Pause" : "Start"}>
            <IconButton
              color="primary"
              onClick={() => setIsRunning(!isRunning)}
              sx={{ transform: "scale(1.5)" }}
            >
              {isRunning ? (
                <PauseRounded fontSize="large" />
              ) : (
                <PlayArrowRounded fontSize="large" />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Reset">
            <IconButton onClick={handleReset} sx={{ transform: "scale(1.5)" }}>
              <ReplayRounded fontSize="large" />
            </IconButton>
          </Tooltip>
        </Controls>

        <FormControl variant="outlined" sx={{ mt: 8, minWidth: 200 }}>
          <InputLabel>Ambient Sound</InputLabel>
          <Select
            value={selectedSound}
            onChange={(e) => setSelectedSound(e.target.value)}
            label="Ambient Sound"
          >
            {SOUNDS.map((sound) => (
              <MenuItem key={sound.label} value={sound.url}>
                {sound.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <audio ref={audioRef} src={selectedSound} loop />
      </FocusContainer>
    </Dialog>
  );
};
