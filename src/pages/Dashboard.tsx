import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  BarChart3, TrendingUp, Calendar, Flame, SmilePlus, ArrowRight,
  Frown, Meh, Smile, Angry, Heart
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar
} from "recharts";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" as const },
  }),
};

// Mock data
const WEEKLY_MOODS = [
  { day: "Mon", score: 3, mood: "Neutral" },
  { day: "Tue", score: 2, mood: "Sad" },
  { day: "Wed", score: 2, mood: "Anxious" },
  { day: "Thu", score: 3, mood: "Neutral" },
  { day: "Fri", score: 4, mood: "Happy" },
  { day: "Sat", score: 5, mood: "Great" },
  { day: "Sun", score: 4, mood: "Happy" },
];

const MONTHLY_TREND = [
  { week: "Week 1", avg: 2.5 },
  { week: "Week 2", avg: 3.0 },
  { week: "Week 3", avg: 3.2 },
  { week: "Week 4", avg: 3.8 },
];

const MOOD_DISTRIBUTION = [
  { name: "Happy", value: 35, color: "hsl(158, 45%, 32%)" },
  { name: "Neutral", value: 25, color: "hsl(200, 35%, 50%)" },
  { name: "Anxious", value: 20, color: "hsl(35, 55%, 55%)" },
  { name: "Sad", value: 12, color: "hsl(270, 30%, 70%)" },
  { name: "Angry", value: 8, color: "hsl(0, 65%, 55%)" },
];

const MOOD_ICONS = [
  { icon: Frown, label: "Very Low", score: 1, color: "text-destructive" },
  { icon: Meh, label: "Low", score: 2, color: "text-warm" },
  { icon: Smile, label: "Neutral", score: 3, color: "text-calm-blue" },
  { icon: Heart, label: "Good", score: 4, color: "text-sage" },
  { icon: SmilePlus, label: "Great", score: 5, color: "text-primary" },
];

const INSIGHTS = [
  { icon: TrendingUp, title: "Improving trend", desc: "Your mood has improved 28% over the past month.", color: "bg-sage-light text-sage" },
  { icon: Flame, title: "5-day streak", desc: "You've checked in for 5 days in a row. Keep it up!", color: "bg-warm-light text-warm" },
  { icon: Calendar, title: "Best day: Saturday", desc: "You tend to feel your best on weekends.", color: "bg-calm-blue-light text-calm-blue" },
];

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-calm px-4">
        <motion.div initial="hidden" animate="visible" className="max-w-md text-center">
          <motion.div variants={fadeUp} custom={0}>
            <BarChart3 className="mx-auto mb-4 h-12 w-12 text-primary" />
          </motion.div>
          <motion.h1 variants={fadeUp} custom={1} className="font-display text-2xl font-bold">
            Track your emotional journey
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} className="mt-2 text-muted-foreground">
            Sign in to see your mood trends, streaks, and personalized insights over time.
          </motion.p>
          <motion.div variants={fadeUp} custom={3} className="mt-6 flex justify-center gap-3">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-hero px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:scale-105 transition-transform"
            >
              Sign in <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-6 py-3 text-sm font-medium hover:bg-muted transition-colors"
            >
              Chat first
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-calm">
      <div className="container py-8 max-w-5xl">
        {/* Header */}
        <motion.div initial="hidden" animate="visible" className="mb-8">
          <motion.h1 variants={fadeUp} custom={0} className="font-display text-3xl font-bold">
            Your Mood Dashboard
          </motion.h1>
          <motion.p variants={fadeUp} custom={1} className="mt-1 text-muted-foreground">
            Track your emotional wellbeing over time
          </motion.p>
        </motion.div>

        {/* Quick mood check-in */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={2}
          className="mb-6 rounded-2xl border border-border/60 bg-background p-5 shadow-card"
        >
          <p className="text-sm font-semibold mb-3">How are you feeling right now?</p>
          <div className="flex gap-3 flex-wrap">
            {MOOD_ICONS.map((m) => (
              <button
                key={m.score}
                className="flex flex-col items-center gap-1 rounded-xl border border-border bg-card px-4 py-3 transition-all hover:bg-muted hover:shadow-soft hover:scale-105"
              >
                <m.icon className={`h-6 w-6 ${m.color}`} />
                <span className="text-[10px] text-muted-foreground font-medium">{m.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Insights row */}
        <motion.div initial="hidden" animate="visible" className="grid gap-4 sm:grid-cols-3 mb-6">
          {INSIGHTS.map((insight, i) => (
            <motion.div
              key={insight.title}
              variants={fadeUp}
              custom={i + 3}
              className="rounded-2xl border border-border/60 bg-background p-5 shadow-card"
            >
              <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${insight.color}`}>
                <insight.icon className="h-5 w-5" />
              </div>
              <p className="text-sm font-semibold">{insight.title}</p>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{insight.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2 mb-6">
          {/* Weekly mood chart */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={6}
            className="rounded-2xl border border-border/60 bg-background p-5 shadow-card"
          >
            <h3 className="font-display text-sm font-semibold mb-4">This Week's Mood</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={WEEKLY_MOODS} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(150, 15%, 85%)" />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="hsl(160, 10%, 45%)" />
                <YAxis domain={[0, 5]} tick={{ fontSize: 11 }} stroke="hsl(160, 10%, 45%)" />
                <Tooltip
                  contentStyle={{
                    background: "hsl(150, 20%, 97%)",
                    border: "1px solid hsl(150, 15%, 85%)",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => {
                    const labels = ["", "Very Low", "Low", "Neutral", "Good", "Great"];
                    return [labels[value], "Mood"];
                  }}
                />
                <Bar dataKey="score" radius={[6, 6, 0, 0]} fill="hsl(158, 45%, 32%)" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Monthly trend */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={7}
            className="rounded-2xl border border-border/60 bg-background p-5 shadow-card"
          >
            <h3 className="font-display text-sm font-semibold mb-4">Monthly Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={MONTHLY_TREND}>
                <defs>
                  <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(158, 45%, 32%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(158, 45%, 32%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(150, 15%, 85%)" />
                <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="hsl(160, 10%, 45%)" />
                <YAxis domain={[0, 5]} tick={{ fontSize: 11 }} stroke="hsl(160, 10%, 45%)" />
                <Tooltip
                  contentStyle={{
                    background: "hsl(150, 20%, 97%)",
                    border: "1px solid hsl(150, 15%, 85%)",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="avg"
                  stroke="hsl(158, 45%, 32%)"
                  strokeWidth={2}
                  fill="url(#moodGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Mood distribution */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={8}
          className="rounded-2xl border border-border/60 bg-background p-5 shadow-card"
        >
          <h3 className="font-display text-sm font-semibold mb-4">Mood Distribution (Last 30 Days)</h3>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie
                  data={MOOD_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {MOOD_DISTRIBUTION.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "hsl(150, 20%, 97%)",
                    border: "1px solid hsl(150, 15%, 85%)",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => [`${value}%`, "Frequency"]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-3">
              {MOOD_DISTRIBUTION.map((m) => (
                <div key={m.name} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: m.color }} />
                  <span className="text-xs text-muted-foreground">{m.name} ({m.value}%)</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={9} className="mt-6 text-center">
          <Link
            to="/chat"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-hero px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:scale-105 transition-transform"
          >
            Continue chatting <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
