import { useState, useRef, useEffect } from "react";
import { Send, Phone, RotateCcw, History, Smile, LogIn, X, Sparkles, Shield, Clock, Wind, Flower2 } from "lucide-react";
import { Link } from "react-router-dom";
import ChatMessage from "@/components/ChatMessage";
import TypingIndicator from "@/components/TypingIndicator";
import BreathingExercise from "@/components/BreathingExercise";
import GuidedMeditation from "@/components/GuidedMeditation";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

type Msg = { role: "user" | "assistant"; content: string };

const INITIAL_MESSAGE: Msg = {
  role: "assistant",
  content:
    "Hi there 💚 I'm here to listen and support you. How are you feeling today? You can share as much or as little as you'd like — this is a safe space.",
};

const MOCK_RESPONSES: Record<string, string> = {
  sad: "I hear you, and it's completely okay to feel sad. Would you like to try a grounding exercise together, or would you prefer to just talk about what's on your mind?",
  anxious:
    "Anxiety can feel overwhelming. I'd suggest trying a breathing exercise — you can open one right here in the chat using the 🌬️ button below. Or we can just talk it through.",
  angry:
    "It's natural to feel angry sometimes. Your feelings are valid. Would it help to explore what triggered this feeling?",
  lonely:
    "Feeling lonely is hard, and reaching out here shows real courage. I'm glad you're here. Would you like to talk about what's been going on?",
  happy:
    "That's wonderful to hear! 🌟 It's great to check in even when things are going well. What's been bringing you joy lately?",
  breathe:
    "Great idea! I've opened the breathing exercise for you. Try the Box Breathing technique — it's a favorite for calming down quickly.",
  meditate:
    "A guided meditation sounds perfect right now. I've opened the meditation timer for you. Find a quiet spot and let's begin.",
  default:
    "Thank you for sharing that with me. I want to make sure I understand — could you tell me a bit more about how you're feeling right now?",
};

const MOOD_OPTIONS = [
  { emoji: "😢", label: "Sad", keyword: "sad" },
  { emoji: "😰", label: "Anxious", keyword: "anxious" },
  { emoji: "😠", label: "Angry", keyword: "angry" },
  { emoji: "😔", label: "Lonely", keyword: "lonely" },
  { emoji: "😊", label: "Happy", keyword: "happy" },
];

const PAST_CONVERSATIONS = [
  { id: "1", title: "Dealing with stress", date: "Yesterday", preview: "We talked about breathing exercises…" },
  { id: "2", title: "Feeling overwhelmed", date: "3 days ago", preview: "Explored coping strategies for work…" },
  { id: "3", title: "General check-in", date: "1 week ago", preview: "Shared some positive moments…" },
];

function getResponse(input: string): { text: string; action?: "breathe" | "meditate" } {
  const lower = input.toLowerCase();
  if (lower.includes("breathe") || lower.includes("breathing")) return { text: MOCK_RESPONSES.breathe, action: "breathe" };
  if (lower.includes("meditat") || lower.includes("mindful") || lower.includes("calm down")) return { text: MOCK_RESPONSES.meditate, action: "meditate" };
  if (lower.includes("sad") || lower.includes("depress") || lower.includes("cry")) return { text: MOCK_RESPONSES.sad };
  if (lower.includes("anxi") || lower.includes("worry") || lower.includes("nervous") || lower.includes("panic")) return { text: MOCK_RESPONSES.anxious };
  if (lower.includes("angry") || lower.includes("frustrat") || lower.includes("mad")) return { text: MOCK_RESPONSES.angry };
  if (lower.includes("lonely") || lower.includes("alone") || lower.includes("isolat")) return { text: MOCK_RESPONSES.lonely };
  if (lower.includes("happy") || lower.includes("good") || lower.includes("great") || lower.includes("joy")) return { text: MOCK_RESPONSES.happy };
  return { text: MOCK_RESPONSES.default };
}

const Chat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Msg[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showMoods, setShowMoods] = useState(true);
  const [showBreathing, setShowBreathing] = useState(false);
  const [showMeditation, setShowMeditation] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  // Show login prompt after 3 messages if not logged in
  useEffect(() => {
    if (!user && messages.filter((m) => m.role === "user").length === 3) {
      setShowLoginPrompt(true);
    }
  }, [messages, user]);

  const send = (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || typing) return;
    setInput("");
    setShowMoods(false);
    const userMsg: Msg = { role: "user", content: msg };
    setMessages((prev) => [...prev, userMsg]);
    setTyping(true);

    setTimeout(() => {
      const response = getResponse(msg);
      setMessages((prev) => [...prev, { role: "assistant", content: response.text }]);
      if (response.action === "breathe") setShowBreathing(true);
      if (response.action === "meditate") setShowMeditation(true);
      setTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const reset = () => {
    setMessages([INITIAL_MESSAGE]);
    setInput("");
    setShowMoods(true);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar - History (desktop, logged in) */}
      <AnimatePresence>
        {showHistory && user && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="hidden md:flex flex-col border-r border-border/60 bg-card/50 overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-border/60">
              <h3 className="font-display text-sm font-semibold">Conversations</h3>
              <button onClick={() => setShowHistory(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {PAST_CONVERSATIONS.map((c) => (
                <button
                  key={c.id}
                  className="w-full rounded-xl px-3 py-3 text-left transition-colors hover:bg-muted"
                >
                  <p className="text-sm font-medium truncate">{c.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{c.preview}</p>
                  <p className="text-[10px] text-muted-foreground/70 mt-1">{c.date}</p>
                </button>
              ))}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-border/60 bg-background/80 backdrop-blur-sm px-4 py-3 gap-2">
          <div className="flex items-center gap-3 min-w-0">
            {user && (
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="rounded-lg p-2 text-muted-foreground hover:bg-muted transition-colors"
                title="Conversation history"
              >
                <History className="h-4 w-4" />
              </button>
            )}
            <div className="flex items-center gap-2 min-w-0">
              <div className="relative">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-hero text-primary-foreground">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">The Plight AI</p>
                <p className="text-[11px] text-muted-foreground">Always here for you</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={reset}
              className="rounded-lg p-2 text-muted-foreground hover:bg-muted transition-colors"
              title="New conversation"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            {!user && (
              <Link
                to="/login"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
              >
                <LogIn className="h-3 w-3" /> Sign in
              </Link>
            )}
            <a
              href="tel:988"
              className="inline-flex items-center gap-1.5 rounded-lg bg-destructive/10 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/20 transition-colors"
            >
              <Phone className="h-3 w-3" /> <span className="hidden sm:inline">Crisis</span> 988
            </a>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-2xl p-4 space-y-4">
            {messages.map((msg, i) => (
              <ChatMessage key={i} role={msg.role} content={msg.content} />
            ))}

            {/* Mood quick-select after first AI message */}
            {showMoods && messages.length === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-2 pl-11"
              >
                {MOOD_OPTIONS.map((mood) => (
                  <button
                    key={mood.keyword}
                    onClick={() => send(`I'm feeling ${mood.label.toLowerCase()}`)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-all hover:bg-muted hover:shadow-soft hover:scale-105"
                  >
                    <span>{mood.emoji}</span> {mood.label}
                  </button>
                ))}
              </motion.div>
            )}

            {typing && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-hero text-primary-foreground">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <div className="rounded-2xl rounded-tl-md bg-card shadow-card">
                  <TypingIndicator />
                </div>
              </div>
            )}

            {/* Wellness widgets */}
            <AnimatePresence>
              {showBreathing && (
                <BreathingExercise onClose={() => setShowBreathing(false)} />
              )}
            </AnimatePresence>
            <AnimatePresence>
              {showMeditation && (
                <GuidedMeditation onClose={() => setShowMeditation(false)} />
              )}
            </AnimatePresence>

            {/* Login prompt */}
            <AnimatePresence>
              {showLoginPrompt && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mx-auto max-w-sm rounded-2xl border border-primary/20 bg-primary/5 p-5"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Save your progress</p>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                        Create a free account to save your conversations and pick up where you left off.
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <Link
                          to="/signup"
                          className="rounded-lg bg-gradient-hero px-4 py-1.5 text-xs font-semibold text-primary-foreground"
                        >
                          Sign up free
                        </Link>
                        <button
                          onClick={() => setShowLoginPrompt(false)}
                          className="rounded-lg px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
                        >
                          Maybe later
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-border/60 bg-background">
          <div className="mx-auto max-w-2xl p-4">
            {/* Wellness toolbar */}
            <div className="flex gap-2 mb-3">
              <button
                type="button"
                onClick={() => { setShowBreathing(!showBreathing); setShowMeditation(false); }}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  showBreathing ? "bg-primary/15 text-primary" : "bg-muted/60 text-muted-foreground hover:bg-muted"
                }`}
              >
                <Wind className="h-3.5 w-3.5" /> Breathe
              </button>
              <button
                type="button"
                onClick={() => { setShowMeditation(!showMeditation); setShowBreathing(false); }}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  showMeditation ? "bg-lavender/20 text-lavender" : "bg-muted/60 text-muted-foreground hover:bg-muted"
                }`}
              >
                <Flower2 className="h-3.5 w-3.5" /> Meditate
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-end gap-2"
            >
              <div className="relative flex-1">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Share what's on your mind…"
                  className="w-full rounded-2xl border border-border bg-card px-5 py-3.5 pr-12 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/40 focus:ring-2 focus:ring-primary/20 transition-all"
                  aria-label="Message input"
                />
                <button
                  type="button"
                  onClick={() => setShowMoods(!showMoods)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  title="Quick moods"
                >
                  <Smile className="h-5 w-5" />
                </button>
              </div>
              <button
                type="submit"
                disabled={!input.trim() || typing}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-hero text-primary-foreground shadow-soft transition-all hover:scale-105 hover:shadow-elevated disabled:opacity-40 disabled:hover:scale-100 disabled:shadow-none"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1"><Shield className="h-3 w-3" /> Private & encrypted</span>
              <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> Available 24/7</span>
              <span className="hidden sm:inline-flex items-center gap-1">Not a replacement for professional help</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
