import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Flower2, Pause, Play, RotateCcw, X } from "lucide-react";

const MEDITATIONS = [
  { name: "2 min calm", duration: 120, prompt: "Close your eyes. Focus on the rise and fall of your breath. Let thoughts pass like clouds." },
  { name: "5 min focus", duration: 300, prompt: "Sit comfortably. Notice the weight of your body. With each breath, release tension." },
  { name: "Body scan", duration: 180, prompt: "Starting from your toes, slowly bring awareness upward through each part of your body." },
];

interface GuidedMeditationProps {
  onClose: () => void;
}

const GuidedMeditation = ({ onClose }: GuidedMeditationProps) => {
  const [medIdx, setMedIdx] = useState(0);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [done, setDone] = useState(false);

  const med = MEDITATIONS[medIdx];
  const remaining = med.duration - elapsed;
  const progress = elapsed / med.duration;

  useEffect(() => {
    setRunning(false);
    setElapsed(0);
    setDone(false);
  }, [medIdx]);

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      setElapsed((prev) => {
        if (prev + 1 >= med.duration) {
          setRunning(false);
          setDone(true);
          return med.duration;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [running, med.duration]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const reset = () => {
    setRunning(false);
    setElapsed(0);
    setDone(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="mx-auto w-full max-w-sm rounded-2xl border border-border/60 bg-card p-5 shadow-elevated"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Flower2 className="h-4 w-4 text-lavender" />
          <h3 className="font-display text-sm font-semibold">Guided Meditation</h3>
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Selector */}
      <div className="flex gap-1.5 mb-5">
        {MEDITATIONS.map((m, i) => (
          <button
            key={m.name}
            onClick={() => setMedIdx(i)}
            className={`flex-1 rounded-lg py-1.5 text-[11px] font-medium transition-colors ${
              i === medIdx
                ? "bg-lavender/20 text-lavender"
                : "bg-muted/50 text-muted-foreground hover:bg-muted"
            }`}
          >
            {m.name}
          </button>
        ))}
      </div>

      {/* Timer circle */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex h-40 w-40 items-center justify-center">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 160 160">
            <circle
              cx="80" cy="80" r="72"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="4"
            />
            <motion.circle
              cx="80" cy="80" r="72"
              fill="none"
              stroke="hsl(var(--lavender))"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 72}
              animate={{ strokeDashoffset: 2 * Math.PI * 72 * (1 - progress) }}
              transition={{ duration: 0.5 }}
            />
          </svg>
          <div className="relative text-center z-10">
            {done ? (
              <>
                <p className="text-lg font-display font-semibold">Namaste 🙏</p>
                <p className="text-xs text-muted-foreground mt-1">Session complete</p>
              </>
            ) : (
              <>
                <p className="text-2xl font-display font-bold tabular-nums">{formatTime(remaining)}</p>
                <p className="text-xs text-muted-foreground mt-1">{running ? "In session" : "Ready"}</p>
              </>
            )}
          </div>
        </div>

        {/* Prompt */}
        {(running || done) && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-xs text-muted-foreground leading-relaxed italic max-w-[260px]"
          >
            "{med.prompt}"
          </motion.p>
        )}

        {/* Controls */}
        <div className="flex gap-2">
          {done ? (
            <button
              onClick={reset}
              className="inline-flex items-center gap-1.5 rounded-xl bg-lavender/20 px-5 py-2 text-sm font-medium text-lavender hover:bg-lavender/30 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Again
            </button>
          ) : running ? (
            <button
              onClick={() => setRunning(false)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-muted px-5 py-2 text-sm font-medium text-muted-foreground hover:bg-muted/80 transition-colors"
            >
              <Pause className="h-3.5 w-3.5" /> Pause
            </button>
          ) : (
            <button
              onClick={() => setRunning(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-lavender/20 px-5 py-2 text-sm font-medium text-lavender shadow-soft hover:scale-105 transition-transform"
            >
              <Play className="h-3.5 w-3.5" /> {elapsed > 0 ? "Resume" : "Begin"}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default GuidedMeditation;
