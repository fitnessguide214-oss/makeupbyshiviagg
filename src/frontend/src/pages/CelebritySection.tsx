import { Clapperboard, Crown, Sparkles, Star, Tv } from "lucide-react";
import { motion } from "motion/react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const accomplishmentBadges = [
  { id: "b1", text: "Bollywood Celebrity Makeup Artist", icon: "🎬" },
  { id: "b2", text: "TV & Film Industry Partner", icon: "📺" },
  { id: "b3", text: "Celebrity Wedding Specialist", icon: "💍" },
  { id: "b4", text: "Red Carpet Glam Expert", icon: "✨" },
];

const celebrities = [
  {
    id: "c1",
    name: "Naina Kapoor",
    role: "Bollywood Film Actress",
    quote:
      "Unnati's artistry transformed our entire film shoot. Every frame was perfection — her attention to lighting and camera angles is truly unmatched. She is the only artist I trust for my on-screen looks.",
    icon: Clapperboard,
    badge: "Bollywood",
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/30",
    glowColor: "oklch(0.75 0.15 65 / 0.4)",
    rating: 5,
  },
  {
    id: "c2",
    name: "Priya Malhotra",
    role: "Television Personality",
    quote:
      "I've worked with many artists across India, but Unnati's skill level is in a different league entirely. My skin looked flawless on 4K cameras — that's rare and speaks to her mastery of the craft.",
    icon: Tv,
    badge: "Television",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
    glowColor: "oklch(0.6 0.25 320 / 0.4)",
    rating: 5,
  },
  {
    id: "c3",
    name: "Aisha Sharma",
    role: "Fashion Model & Influencer",
    quote:
      "The editorial look Unnati created for our magazine cover was iconic. Bold, artistic, and perfectly in sync with the creative vision. She understands beauty at an entirely different level.",
    icon: Crown,
    badge: "Editorial",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    borderColor: "border-secondary/30",
    glowColor: "oklch(0.65 0.24 330 / 0.4)",
    rating: 5,
  },
];

const stats = [
  { id: "s1", value: "200+", label: "Brides" },
  { id: "s2", value: "50+", label: "Celebrities" },
  { id: "s3", value: "15+", label: "Years" },
  { id: "s4", value: "5000+", label: "Clients" },
];

const floatingOrbs = [
  {
    id: "o1",
    top: "8%",
    left: "5%",
    size: "w-72 h-72",
    color: "bg-accent/8",
    blur: "blur-3xl",
  },
  {
    id: "o2",
    top: "60%",
    right: "5%",
    size: "w-56 h-56",
    color: "bg-primary/10",
    blur: "blur-3xl",
  },
  {
    id: "o3",
    bottom: "10%",
    left: "30%",
    size: "w-80 h-80",
    color: "bg-secondary/6",
    blur: "blur-3xl",
  },
];

export function CelebritySection() {
  const { ref, isInView } = useScrollAnimation(0.1);

  return (
    <section
      id="celebrity"
      className="relative py-28 bg-muted/30 overflow-hidden"
    >
      {/* Top divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingOrbs.map((orb, i) => (
          <motion.div
            key={orb.id}
            className={`absolute rounded-full ${orb.size} ${orb.color} ${orb.blur}`}
            style={{
              top: orb.top,
              left: orb.left,
              right: orb.right,
              bottom: orb.bottom,
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
            transition={{
              duration: 6 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-6"
          >
            <Crown className="w-4 h-4 text-accent" />
            <span className="text-accent text-sm font-semibold tracking-wide">
              Celebrity & Media Work
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl font-bold text-foreground mb-4"
          >
            Celebrity{" "}
            <span
              className="text-accent"
              style={{
                textShadow:
                  "0 0 40px oklch(0.75 0.15 65 / 0.6), 0 0 80px oklch(0.75 0.15 65 / 0.3)",
              }}
            >
              Artistry
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto font-body leading-relaxed"
          >
            From Bollywood film sets to red carpet premieres — Unnati's artistry
            is the entertainment industry's most coveted secret.
          </motion.p>
        </div>

        {/* Accomplishment Badges with scale + rotation entrance */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {accomplishmentBadges.map((badge, i) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
              animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{
                delay: 0.35 + i * 0.12,
                type: "spring",
                stiffness: 320,
                damping: 20,
              }}
              whileHover={{ scale: 1.07, y: -3 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-card border border-accent/40 cursor-default"
              style={{
                boxShadow:
                  "0 0 20px oklch(0.75 0.15 65 / 0.2), inset 0 0 15px oklch(0.75 0.15 65 / 0.05)",
              }}
            >
              <span className="text-base">{badge.icon}</span>
              <span className="text-accent text-sm font-semibold tracking-wide">
                {badge.text}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats counter bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16 max-w-4xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.1 + i * 0.1,
                type: "spring",
                stiffness: 280,
              }}
              className="relative flex flex-col items-center justify-center py-6 px-4 rounded-2xl bg-card border border-accent/20 text-center overflow-hidden"
              style={{ boxShadow: "0 0 25px oklch(0.75 0.15 65 / 0.15)" }}
            >
              <motion.div
                className="absolute inset-0 bg-accent/5 rounded-2xl"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{
                  duration: 3 + i,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
              <span
                className="relative font-display text-3xl font-bold text-accent"
                style={{ textShadow: "0 0 20px oklch(0.75 0.15 65 / 0.5)" }}
              >
                {stat.value}
              </span>
              <span className="relative text-muted-foreground text-sm font-body mt-1">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Celebrity testimonials */}
        <div className="grid md:grid-cols-3 gap-7 mb-16">
          {celebrities.map((celeb, i) => {
            const Icon = celeb.icon;
            return (
              <motion.div
                key={celeb.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                whileHover={{ y: -6 }}
                className={`relative bg-card rounded-3xl p-8 border ${celeb.borderColor} card-elevated group cursor-default overflow-hidden`}
              >
                {/* Hover glow overlay */}
                <motion.div
                  className={`absolute inset-0 rounded-3xl ${celeb.bgColor} opacity-0 group-hover:opacity-100 transition-smooth`}
                />

                <div className="relative z-10">
                  {/* Icon badge */}
                  <div
                    className={`w-12 h-12 rounded-2xl ${celeb.bgColor} border ${celeb.borderColor} flex items-center justify-center mb-5`}
                    style={{ boxShadow: `0 0 20px ${celeb.glowColor}` }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      <Icon className={`w-6 h-6 ${celeb.color}`} />
                    </motion.div>
                  </div>

                  {/* Gold stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: celeb.rating }, (_, idx) => (
                      <motion.div
                        key={`${celeb.id}-star-${idx}`}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.5 + i * 0.15 + idx * 0.06,
                          type: "spring",
                          stiffness: 400,
                        }}
                      >
                        <Star className="w-4 h-4 text-accent fill-accent" />
                      </motion.div>
                    ))}
                  </div>

                  <blockquote className="text-muted-foreground text-sm leading-relaxed mb-6 font-body italic">
                    "{celeb.quote}"
                  </blockquote>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-foreground font-semibold text-sm font-body">
                        {celeb.name}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {celeb.role}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${celeb.bgColor} ${celeb.color} border ${celeb.borderColor}`}
                      style={{ boxShadow: `0 0 12px ${celeb.glowColor}` }}
                    >
                      {celeb.badge}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Photo showcase with crown/star decorations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative grid grid-cols-2 gap-5 max-w-3xl mx-auto"
        >
          {/* Floating crown icon top-center */}
          <motion.div
            className="absolute -top-8 left-1/2 -translate-x-1/2 z-10"
            animate={{ y: [0, -8, 0], rotate: [0, 3, -3, 0] }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Crown
              className="w-8 h-8 text-accent"
              style={{
                filter: "drop-shadow(0 0 12px oklch(0.75 0.15 65 / 0.8))",
              }}
            />
          </motion.div>

          {/* Floating sparkle icons */}
          <motion.div
            className="absolute -top-4 -left-4 z-10"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            <Sparkles className="w-5 h-5 text-accent" />
          </motion.div>
          <motion.div
            className="absolute -bottom-4 -right-4 z-10"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{
              duration: 3.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: 0.7,
            }}
          >
            <Star className="w-5 h-5 text-primary fill-primary" />
          </motion.div>

          <div
            className="relative rounded-3xl overflow-hidden aspect-[4/5] border border-primary/30"
            style={{ boxShadow: "0 0 40px oklch(0.6 0.25 320 / 0.25)" }}
          >
            <img
              src="/assets/photos/beautygram-08.png"
              alt="Celebrity editorial makeup work by Unnati"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 bg-card/70 backdrop-blur-sm rounded-xl px-3 py-2 border border-primary/20">
              <p className="text-foreground text-xs font-semibold flex items-center gap-1">
                <Crown className="w-3 h-3 text-accent" />
                Celebrity Glam
              </p>
            </div>
          </div>

          <div
            className="relative rounded-3xl overflow-hidden aspect-[4/5] border border-accent/30"
            style={{ boxShadow: "0 0 40px oklch(0.75 0.15 65 / 0.25)" }}
          >
            <img
              src="/assets/photos/beautygram-09.png"
              alt="Luxury editorial makeup by Unnati"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 bg-card/70 backdrop-blur-sm rounded-xl px-3 py-2 border border-accent/20">
              <p className="text-foreground text-xs font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-accent" />
                Luxury Editorial
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
