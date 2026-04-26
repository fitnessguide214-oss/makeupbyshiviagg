import {
  Award,
  Clock,
  Gem,
  Heart,
  MapPin,
  Palette,
  Sparkles,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const reasons = [
  {
    id: "r1",
    icon: Gem,
    title: "Premium Quality Products",
    description:
      "We exclusively use international luxury brands — MAC, Charlotte Tilbury, NARS, Huda Beauty, and Pat McGrath for flawless, skin-safe results that last all day.",
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/30",
    glow: "oklch(0.75 0.15 65 / 0.35)",
    iconAnim: { rotate: [0, 15, -10, 0] },
  },
  {
    id: "r2",
    icon: Heart,
    title: "Bridal Makeup Specialist",
    description:
      "Specializing in Indian bridal traditions — from Mehendi to Reception, each look is crafted to celebrate and elevate the bride's natural beauty.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/30",
    glow: "oklch(0.6 0.25 320 / 0.35)",
    iconAnim: { scale: [1, 1.2, 1] },
  },
  {
    id: "r3",
    icon: Star,
    title: "Celebrity Experience",
    description:
      "15+ years working with Bollywood actresses, TV personalities, and magazine cover models. That rare industry expertise is now available to you.",
    color: "text-secondary",
    bg: "bg-secondary/10",
    border: "border-secondary/30",
    glow: "oklch(0.65 0.24 330 / 0.35)",
    iconAnim: { rotate: [0, 360] },
  },
  {
    id: "r4",
    icon: Palette,
    title: "Custom Designs",
    description:
      "No cookie-cutter makeup here. Every look is tailored to your unique bone structure, skin tone, and personal style — we create art, not copies.",
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/30",
    glow: "oklch(0.75 0.15 65 / 0.35)",
    iconAnim: { y: [0, -5, 0] },
  },
  {
    id: "r5",
    icon: MapPin,
    title: "On-Site Services Available",
    description:
      "Visit our Gandhinagar studio or let us come to you. We offer home service across Gujarat and travel nationwide for destination weddings.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/30",
    glow: "oklch(0.6 0.25 320 / 0.35)",
    iconAnim: { y: [0, -6, 0] },
  },
  {
    id: "r6",
    icon: Award,
    title: "15+ Years of Experience",
    description:
      "Over a decade and a half of mastering trends, techniques, and transformations. You're in the hands of a true professional with a proven track record.",
    color: "text-secondary",
    bg: "bg-secondary/10",
    border: "border-secondary/30",
    glow: "oklch(0.65 0.24 330 / 0.35)",
    iconAnim: { rotate: [0, 5, -5, 0] },
  },
];

export function WhyUsSection() {
  const { ref, isInView } = useScrollAnimation(0.1);

  return (
    <section
      id="why-us"
      className="relative py-28 bg-background overflow-hidden"
    >
      {/* Top section divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      {/* Background glow orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-56 h-56 bg-accent/7 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-semibold tracking-wide">
              The Unnati Difference
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl font-bold text-foreground mb-4"
          >
            Why Choose{" "}
            <span
              className="text-primary"
              style={{
                textShadow:
                  "0 0 40px oklch(0.6 0.25 320 / 0.6), 0 0 80px oklch(0.6 0.25 320 / 0.3)",
              }}
            >
              Unnati
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto font-body leading-relaxed"
          >
            We don't just do makeup — we create confidence, memories, and art
            that lasts a lifetime.
          </motion.p>
        </div>

        {/* Feature cards grid — staggered 3D perspective entrance */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.id}
                initial={{ opacity: 0, rotateY: 30, y: 30 }}
                whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.65,
                  delay: (i % 3) * 0.1 + Math.floor(i / 3) * 0.15,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -8,
                  boxShadow: `0 0 40px ${reason.glow}, 0 20px 60px oklch(0 0 0 / 0.5)`,
                }}
                data-ocid={`why-us-card-${reason.id}`}
                className={`relative bg-card rounded-3xl p-7 border ${reason.border} card-elevated group cursor-default overflow-hidden transition-smooth`}
                style={{ transformStyle: "preserve-3d", perspective: "800px" }}
              >
                {/* Animated background glow on hover */}
                <div
                  className={`absolute inset-0 rounded-3xl ${reason.bg} opacity-0 group-hover:opacity-100 transition-smooth`}
                />

                {/* Subtle grid texture */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-5"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
                    backgroundSize: "24px 24px",
                  }}
                />

                <div className="relative z-10">
                  {/* Icon with subtle float/rotation animation */}
                  <motion.div
                    className={`w-14 h-14 rounded-2xl ${reason.bg} border ${reason.border} flex items-center justify-center mb-5`}
                    style={{ boxShadow: `0 0 24px ${reason.glow}` }}
                    whileHover={{ scale: 1.12 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      animate={reason.iconAnim}
                      transition={{
                        duration: 3.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      <Icon className={`w-6 h-6 ${reason.color}`} />
                    </motion.div>
                  </motion.div>

                  <h3
                    className={`font-display text-lg font-bold text-foreground mb-3 group-hover:${reason.color} transition-smooth`}
                  >
                    {reason.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed font-body">
                    {reason.description}
                  </p>

                  {/* Bottom accent line */}
                  <motion.div
                    className={`absolute bottom-0 left-0 right-0 h-0.5 ${reason.bg} rounded-b-3xl`}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4 }}
                    style={{ transformOrigin: "left" }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA prompt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center mt-14"
        >
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card border border-primary/30"
            style={{ boxShadow: "0 0 30px oklch(0.6 0.25 320 / 0.2)" }}
          >
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground text-sm font-body">
              Bookings available 7 days a week · Call{" "}
              <a
                href="tel:+917041937373"
                className="text-primary font-semibold hover:text-accent transition-smooth"
              >
                07041937373
              </a>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
