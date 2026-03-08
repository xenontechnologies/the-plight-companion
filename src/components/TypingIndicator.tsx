const TypingIndicator = () => (
  <div className="flex items-center gap-1.5 px-4 py-3">
    <div className="h-2 w-2 rounded-full bg-primary/60 animate-pulse-gentle" style={{ animationDelay: "0ms" }} />
    <div className="h-2 w-2 rounded-full bg-primary/60 animate-pulse-gentle" style={{ animationDelay: "300ms" }} />
    <div className="h-2 w-2 rounded-full bg-primary/60 animate-pulse-gentle" style={{ animationDelay: "600ms" }} />
  </div>
);

export default TypingIndicator;
