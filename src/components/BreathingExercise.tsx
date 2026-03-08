import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Wind, Pause, Play, RotateCcw, X } from "lucide-react";

type Phase = "inhale" | "hold" | "exhale" | "rest";

const EXERCISES = [
  { name: "Box Breathing", inhale: 4, hold: 4, exhale: 4, rest: 4, rounds: 4 },
  { name: "4-7-8 Calm", inhale: 4, hold: 7, exhale: 8, rest: 0, rounds: 4 },
  { name: "Quick Relief", inhale: 3, hold: 0, exhale: 6, rest: 0, rounds: 5 },
];

const PHASE_LABELS: Record<Phase, string> = {
  inhale: "Breathe in…",
  hold: "Hold…",
  exhale: "Breathe out…",
  rest: "Rest…",
};

const PHASE_COLORS: Record<Phase, string> = {
  inhale: "hsl(158, 45%, 32%)",
  hold: "hsl(200, 35%, 50%)",
  exhale: "hsl(155, 20%, 55%)",
  rest: "hsl(35, 55%, 55%)",
};

interface BreathingExerciseProps {
  onClose: () => void;
}

const BreathingExercise = ({ onClose }: BreathingExerciseProps) => {
  const [exerciseIdx, setExerciseIdx] = useState(0);
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState<Phase>("inhale");
  const [countdown, setCountdown] = useState(0);
  const [round, setRound] = useState(1);
  const [done, setDone] = useState(false);

  const ex = EXERCISES[exerciseIdx];

  const getPhaseSequence = useCallback(() => {
    const seq: { phase: Phase; duration: number }[] = [];
    if (ex.inhale > 0) seq.push({ phase: "inhale", duration: ex.inhale });
    if (ex.hold > 0) seq.push({ phase: "hold", duration: ex.hold });
    if (ex.exhale > 0) seq.push({ phase: "exhale", duration: ex.exhale });
    if (ex.rest > 0) seq.push({ phase: "rest", duration: ex.rest });
    return seq;
  }, [ex]);

  const [phaseIdx, setPhaseIdx] = useState(0);

  const reset = () => {
    setRunning(false);
    setPhase("inhale");
    setPhaseIdx(0);
    setCountdown(ex.inhale);
    setRound(1);
    setDone(false);
  };

  useEffect(() => {
    reset();
  }, [exerciseIdx]);

  const start = () => {
    const seq = getPhaseSequence();
    setPhaseIdx(0);
    setPhase(seq[0].phase);
    setCountdown(seq[0].duration);
    setRound(1);
    setDone(false);
    setRunning(true);
  };

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          const seq = getPhaseSequence();
          const nextPhaseIdx = phaseIdx + 1;
          if (nextPhaseIdx >= seq.length) {
            // Next round
            if (round >= ex.rounds) {
              setRunning(false);
              setDone(true);
              return 0;
            }
            setRound((r) => r + 1);
            setPhaseIdx(0);
            setPhase(seq[0].phase);
            return seq[0].duration;
          } else {
            setPhaseIdx(nextPhaseIdx);
            setPhase(seq[nextPhaseIdx].phase);
            return seq[nextPhaseIdx].duration;
          }
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [running, phaseIdx, round, ex, getPhaseSequence]);

  // Circle scale based on phase
  const getScale = () => {
    if (!running && !done) return 0.6;
    switch (phase) {
      case "inhale": return 1;
      case "hold": return 1;
      case "exhale": return 0.5;
      case "rest": return 0.5;
      default: return 0.6;
    }
  };

  const getPhaseDuration = () => {
    const seq = getPhaseSequence();
    const current = seq.find((s) => s.phase === phase);
    return current?.duration || 4;
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
          <Wind className="h-4 w-4 text-primary" />
          <h3 className="font-display text-sm font-semibold">Breathing Exercise</h3>
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Exercise selector */}
      <div className="flex gap-1.5 mb-5">
        {EXERCISES.map((e, i) => (
          <button
            key={e.name}
            onClick={() => { setExerciseIdx(i); }}
            className={`flex-1 rounded-lg py-1.5 text-[11px] font-medium transition-colors ${
              i === exerciseIdx
                ? "bg-primary/10 text-primary"
                : "bg-muted/50 text-muted-foreground hover:bg-muted"
            }`}
          >
            {e.name}
          </button>
        ))}
      </div>

      {/* Breathing circle */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex h-40 w-40 items-center justify-center">
          <motion.div
            animate={{
              scale: getScale(),
              backgroundColor: running ? PHASE_COLORS[phase] : "hsl(150, 15%, 85%)",
            }}
            transition={{ duration: running ? getPhaseDuration() : 0.5, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full opacity-20"
          />
          <motion.div
            animate={{
              scale: getScale(),
              borderColor: running ? PHASE_COLORS[phase] : "hsl(150, 15%, 85%)",
            }}
            transition={{ duration: running ? getPhaseDuration() : 0.5, ease: "easeInOut" }}
            className="absolute inset-2 rounded-full border-2"
          />
          <div className="relative text-center z-10">
            {done ? (
              <>
                <p className="text-lg font-display font-semibold">Well done 🌟</p>
                <p className="text-xs text-muted-foreground mt-1">Great job completing the exercise</p>
              </>
            ) : running ? (
              <>
                <p className="text-2xl font-display font-bold">{countdown}</p>
                <p className="text-xs text-muted-foreground mt-1">{PHASE_LABELS[phase]}</p>
              </>
            ) : (
              <>
                <p className="text-sm font-medium text-muted-foreground">Ready?</p>
                <p className="text-xs text-muted-foreground/70 mt-0.5">{ex.rounds} rounds</p>
              </>
            )}
          </div>
        </div>

        {/* Round indicator */}
        {running && (
          <div className="flex gap-1.5">
            {Array.from({ length: ex.rounds }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-6 rounded-full transition-colors ${
                  i < round ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        )}

        {/* Controls */}
        <div className="flex gap-2">
          {done ? (
            <button
              onClick={reset}
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary/10 px-5 py-2 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
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
              onClick={countdown > 0 && !done ? () => setRunning(true) : start}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-hero px-5 py-2 text-sm font-semibold text-primary-foreground shadow-soft hover:scale-105 transition-transform"
            >
              <Play className="h-3.5 w-3.5" /> {countdown > 0 && round > 0 && !done ? "Resume" : "Start"}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BreathingExercise;
