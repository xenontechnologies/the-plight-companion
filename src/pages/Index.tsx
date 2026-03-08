import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageCircle, Shield, Brain, Clock, Heart, ArrowRight, Star } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/1234567890?text=Hi%2C%20I%20need%20someone%20to%20talk%20to";

const features = [
  {
    icon: Shield,
    title: "100% Confidential",
    description: "Your conversations are private and encrypted. We never share your data.",
    color: "bg-sage-light text-sage",
  },
  {
    icon: Brain,
    title: "AI-Guided Coping",
    description: "Evidence-based strategies tailored to your emotional needs in the moment.",
    color: "bg-calm-blue-light text-calm-blue",
  },
  {
    icon: Clock,
    title: "24/7 Available",
    description: "Support whenever you need it. No appointments, no waiting rooms.",
    color: "bg-warm-light text-warm",
  },
];

const testimonials = [
  {
    text: "The Plight helped me through my darkest moments. Having someone to talk to at 3 AM made all the difference.",
    author: "Anonymous",
    rating: 5,
  },
  {
    text: "I was skeptical about AI support, but the coping strategies I received were genuinely helpful and personalized.",
    author: "Anonymous",
    rating: 5,
  },
  {
    text: "Simple, private, and effective. I recommend this to anyone who needs a safe space to express themselves.",
    author: "Anonymous",
    rating: 5,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const Index = () => (
  <div className="min-h-screen">
    {/* Hero */}
    <section className="relative overflow-hidden bg-gradient-calm">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-sage-light blur-3xl" />
        <div className="absolute bottom-10 right-20 h-48 w-48 rounded-full bg-calm-blue-light blur-3xl" />
        <div className="absolute top-40 right-1/3 h-32 w-32 rounded-full bg-warm-light blur-3xl" />
      </div>
      <div className="container relative py-20 md:py-32">
        <motion.div
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div variants={fadeUp} custom={0} className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Heart className="h-4 w-4" /> Safe & Confidential Support
          </motion.div>
          <motion.h1 variants={fadeUp} custom={1} className="font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Your mental health{" "}
            <span className="text-gradient-hero">matters</span>
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} className="mt-5 text-lg text-muted-foreground leading-relaxed md:text-xl">
            Talk to our compassionate AI companion anytime. No judgment, no waiting — just a safe space to be heard.
          </motion.p>
          <motion.div variants={fadeUp} custom={3} className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-hero px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-elevated transition-transform hover:scale-105"
            >
              <MessageCircle className="h-5 w-5" /> Chat Now
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-7 py-3.5 text-sm font-semibold text-foreground shadow-soft transition-colors hover:bg-muted"
            >
              <MessageCircle className="h-5 w-5 text-primary" /> WhatsApp Us
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>

    {/* Features */}
    <section className="container py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="text-center mb-12"
      >
        <motion.h2 variants={fadeUp} custom={0} className="font-display text-3xl font-bold md:text-4xl">
          Why choose The Plight?
        </motion.h2>
        <motion.p variants={fadeUp} custom={1} className="mt-3 text-muted-foreground max-w-lg mx-auto">
          Built with empathy at the core. Every feature is designed to make you feel safe and supported.
        </motion.p>
      </motion.div>
      <div className="grid gap-6 md:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={i}
            className="group rounded-2xl border border-border/60 bg-card p-8 shadow-card transition-shadow hover:shadow-elevated"
          >
            <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${f.color}`}>
              <f.icon className="h-6 w-6" />
            </div>
            <h3 className="font-display text-lg font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.description}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Testimonials */}
    <section className="bg-card/50 py-20">
      <div className="container">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="text-center font-display text-3xl font-bold mb-12 md:text-4xl"
        >
          Real people, real comfort
        </motion.h2>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              className="rounded-2xl border border-border/60 bg-background p-6 shadow-card"
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-warm text-warm" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed italic">"{t.text}"</p>
              <p className="mt-4 text-xs font-medium text-foreground/70">— {t.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="container py-20 text-center">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto max-w-lg"
      >
        <motion.h2 variants={fadeUp} custom={0} className="font-display text-3xl font-bold md:text-4xl">
          Ready to talk?
        </motion.h2>
        <motion.p variants={fadeUp} custom={1} className="mt-3 text-muted-foreground">
          Taking the first step is the hardest part. We're here when you're ready.
        </motion.p>
        <motion.div variants={fadeUp} custom={2}>
          <Link
            to="/chat"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-hero px-8 py-4 text-sm font-semibold text-primary-foreground shadow-elevated transition-transform hover:scale-105"
          >
            <MessageCircle className="h-5 w-5" /> Start a Conversation
          </Link>
        </motion.div>
      </motion.div>
    </section>
  </div>
);

export default Index;
