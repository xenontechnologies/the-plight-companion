import { useState, useRef, useEffect } from "react";
import { Send, Phone, RotateCcw } from "lucide-react";
import ChatMessage from "@/components/ChatMessage";
import TypingIndicator from "@/components/TypingIndicator";
import { motion } from "framer-motion";

type Msg = { role: "user" | "assistant"; content: string };

const INITIAL_MESSAGE: Msg = {
  role: "assistant",
  content:
    "Hi there 💚 I'm here to listen and support you. How are you feeling today? You can share as much or as little as you'd like — this is a safe space.",
};

const MOCK_RESPONSES: Record<string, string> = {
  sad: "I hear you, and it's completely okay to feel sad. Would you like to try a grounding exercise together, or would you prefer to just talk about what's on your mind?",
  anxious:
    "Anxiety can feel overwhelming. Let's take a slow breath together — breathe in for 4 counts, hold for 4, and out for 6. How does that feel?",
  angry:
    "It's natural to feel angry sometimes. Your feelings are valid. Would it help to explore what triggered this feeling?",
  lonely:
    "Feeling lonely is hard, and reaching out here shows real courage. I'm glad you're here. Would you like to talk about what's been going on?",
  default:
    "Thank you for sharing that with me. I want to make sure I understand — could you tell me a bit more about how you're feeling right now?",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("sad") || lower.includes("depress") || lower.includes("cry")) return MOCK_RESPONSES.sad;
  if (lower.includes("anxi") || lower.includes("worry") || lower.includes("nervous") || lower.includes("panic")) return MOCK_RESPONSES.anxious;
  if (lower.includes("angry") || lower.includes("frustrat") || lower.includes("mad")) return MOCK_RESPONSES.angry;
  if (lower.includes("lonely") || lower.includes("alone") || lower.includes("isolat")) return MOCK_RESPONSES.lonely;
  return MOCK_RESPONSES.default;
}

const Chat = () => {
  const [messages, setMessages] = useState<Msg[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = () => {
    const text = input.trim();
    if (!text || typing) return;
    setInput("");
    const userMsg: Msg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setTyping(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: getResponse(text) }]);
      setTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const reset = () => {
    setMessages([INITIAL_MESSAGE]);
    setInput("");
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-border/60 bg-card/50 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-primary animate-pulse-gentle" />
          <span className="text-sm font-medium">The Plight AI Companion</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={reset}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted transition-colors"
            title="New conversation"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <a
            href="tel:+1234567890"
            className="inline-flex items-center gap-1.5 rounded-lg bg-destructive/10 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/20 transition-colors"
          >
            <Phone className="h-3 w-3" /> Crisis Line
          </a>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <ChatMessage key={i} role={msg.role} content={msg.content} />
        ))}
        {typing && (
          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-hero text-primary-foreground">
              <span className="text-xs">AI</span>
            </div>
            <div className="rounded-2xl rounded-tl-md bg-card shadow-card">
              <TypingIndicator />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="border-t border-border/60 bg-background p-4"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="flex items-center gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type how you're feeling..."
            className="flex-1 rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 transition-shadow"
            aria-label="Message input"
          />
          <button
            type="submit"
            disabled={!input.trim() || typing}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-hero text-primary-foreground shadow-soft transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          This is an AI companion — not a replacement for professional help. If you're in crisis, call emergency services.
        </p>
      </motion.div>
    </div>
  );
};

export default Chat;
