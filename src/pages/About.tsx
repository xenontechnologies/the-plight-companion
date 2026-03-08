import { motion } from "framer-motion";
import { Heart, Shield, Users, Mail, Lock, Globe } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const values = [
  { icon: Heart, title: "Compassion First", description: "Every interaction is designed with empathy and genuine care for your wellbeing." },
  { icon: Shield, title: "Privacy & Safety", description: "Your data is encrypted and never shared. Anonymity is your right." },
  { icon: Users, title: "Accessibility", description: "Mental health support should be available to everyone, regardless of circumstances." },
  { icon: Globe, title: "Inclusivity", description: "We welcome every identity, background, and experience without judgment." },
];

const team = [
  { name: "Dr. Amara Chen", role: "Clinical Advisor", bio: "Licensed psychologist with 15 years of experience in digital mental health." },
  { name: "Kai Nakamura", role: "AI & Ethics Lead", bio: "Focused on building responsible AI that respects user dignity and autonomy." },
  { name: "Priya Sharma", role: "Community Director", bio: "Passionate about making mental health resources accessible globally." },
];

const About = () => (
  <div className="min-h-screen">
    {/* Hero */}
    <section className="bg-gradient-calm py-20">
      <div className="container">
        <motion.div initial="hidden" animate="visible" className="mx-auto max-w-2xl text-center">
          <motion.h1 variants={fadeUp} custom={0} className="font-display text-4xl font-bold md:text-5xl">
            About <span className="text-gradient-hero">The Plight</span>
          </motion.h1>
          <motion.p variants={fadeUp} custom={1} className="mt-5 text-lg text-muted-foreground leading-relaxed">
            We believe everyone deserves a safe space to be heard. The Plight combines compassionate AI with evidence-based approaches to make mental health support accessible to all.
          </motion.p>
        </motion.div>
      </div>
    </section>

    {/* Mission */}
    <section className="container py-20">
      <div className="mx-auto max-w-3xl">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.h2 variants={fadeUp} custom={0} className="font-display text-3xl font-bold text-center mb-4">Our Mission</motion.h2>
          <motion.p variants={fadeUp} custom={1} className="text-center text-muted-foreground leading-relaxed text-lg">
            To bridge the gap in mental health support by providing immediate, judgment-free, and evidence-based emotional assistance through thoughtful AI technology — while always encouraging professional help when needed.
          </motion.p>
        </motion.div>
      </div>
    </section>

    {/* Values */}
    <section className="bg-card/50 py-20">
      <div className="container">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="text-center font-display text-3xl font-bold mb-12"
        >
          Our Values
        </motion.h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              className="rounded-2xl border border-border/60 bg-background p-6 shadow-card text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <v.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="container py-20">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={0}
        className="text-center font-display text-3xl font-bold mb-12"
      >
        The Team
      </motion.h2>
      <div className="grid gap-6 md:grid-cols-3">
        {team.map((t, i) => (
          <motion.div
            key={t.name}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={i}
            className="rounded-2xl border border-border/60 bg-card p-6 shadow-card text-center"
          >
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground font-display text-xl font-bold">
              {t.name.split(" ").map(n => n[0]).join("")}
            </div>
            <h3 className="font-display font-semibold">{t.name}</h3>
            <p className="text-xs text-primary font-medium mt-1">{t.role}</p>
            <p className="mt-2 text-sm text-muted-foreground">{t.bio}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Privacy & Contact */}
    <section className="bg-card/50 py-20">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-2">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="rounded-2xl border border-border/60 bg-background p-8 shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="h-5 w-5 text-primary" />
              <h3 className="font-display text-xl font-semibold">Privacy & Security</h3>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <li>• All conversations are encrypted end-to-end</li>
              <li>• We never sell or share your personal data</li>
              <li>• You can delete your data at any time</li>
              <li>• Anonymous usage — no account required</li>
              <li>• Compliant with data protection regulations</li>
            </ul>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="rounded-2xl border border-border/60 bg-background p-8 shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="h-5 w-5 text-primary" />
              <h3 className="font-display text-xl font-semibold">Contact Us</h3>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>Have questions, feedback, or partnership inquiries? We'd love to hear from you.</p>
              <p><strong className="text-foreground">Email:</strong> hello@theplight.org</p>
              <p><strong className="text-foreground">WhatsApp:</strong> +1 (234) 567-890</p>
              <p><strong className="text-foreground">Hours:</strong> Our AI is available 24/7. Human team responds within 24 hours.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  </div>
);

export default About;
