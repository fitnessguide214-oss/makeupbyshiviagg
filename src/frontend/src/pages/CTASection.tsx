import { Phone } from "lucide-react";
import { motion } from "motion/react";
import { SiWhatsapp } from "react-icons/si";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const SPARKLE_POSITIONS = [
  { top: "10%", left: "8%", size: 16, delay: 0 },
  { top: "20%", right: "12%", size: 12, delay: 0.4 },
  { top: "65%", left: "5%", size: 10, delay: 0.8 },
  { top: "75%", right: "8%", size: 14, delay: 0.2 },
  { top: "35%", left: "50%", size: 8, delay: 0.6 },
  { top: "50%", left: "18%", size: 10, delay: 1.0 },
  { top: "30%", right: "25%", size: 12, delay: 0.3 },
  { top: "80%", left: "40%", size: 8, delay: 0.7 },
] as const;

function SparkleIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5z" />
    </svg>
  );
}

function FloatingSparkles() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {SPARKLE_POSITIONS.map((pos, i) => (
        <motion.div
          key={`sparkle-${i}-${pos.top}`}
          className="absolute text-primary/40"
          style={{
            top: pos.top,
            left: "left" in pos ? pos.left : undefined,
            right: "right" in pos ? pos.right : undefined,
          }}
          animate={{
            y: [-8, 8, -8],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.8, 1.2, 0.8],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4 + i * 0.5,
            delay: pos.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <SparkleIcon size={pos.size} />
        </motion.div>
      ))}
    </div>
  );
}

/** Primary CTA — "Ready to Look Like a Celebrity?" — place near top/middle of page */
export function CTAPrimary() {
  const { ref, isInView } = useScrollAnimation(0.2);

  return (
    <section className="relative py-28 overflow-hidden bg-background">
      {/* Big gradient glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.6 0.25 320 / 0.12) 0%, oklch(0.65 0.24 330 / 0.06) 40%, transparent 70%)",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <FloatingSparkles />

      <div
        ref={ref}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl p-12 sm:p-16 border border-primary/30 overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.12 0.02 320 / 0.95) 0%, oklch(0.14 0.03 330 / 0.9) 50%, oklch(0.12 0.02 320 / 0.95) 100%)",
            boxShadow:
              "0 0 80px oklch(0.6 0.25 320 / 0.2), 0 0 150px oklch(0.65 0.24 330 / 0.1), inset 0 0 60px oklch(0.6 0.25 320 / 0.05)",
          }}
        >
          {/* Inner gradient overlay */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 50% 0%, oklch(0.6 0.25 320 / 0.12) 0%, transparent 60%)",
            }}
          />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6"
              style={{
                background: "oklch(0.6 0.25 320 / 0.12)",
                border: "1px solid oklch(0.6 0.25 320 / 0.4)",
              }}
            >
              <span className="text-primary text-sm font-medium tracking-wide">
                ✦ Celebrity Makeup Artist
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-display text-4xl sm:text-5xl xl:text-6xl font-bold text-foreground mb-4 leading-tight"
            >
              Ready to Look Like a{" "}
              <span className="text-primary glow-text">Celebrity?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-xl mx-auto font-body"
            >
              Join hundreds of brides and stars who trusted Unnati to look their
              most radiant. Your transformation starts with one call.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <a
                href="tel:07041937373"
                data-ocid="cta-primary-book"
                className="inline-flex items-center gap-3 px-9 py-4 rounded-full font-bold text-base transition-smooth group relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.6 0.25 320) 0%, oklch(0.75 0.15 65) 100%)",
                  color: "oklch(0.08 0 0)",
                  boxShadow:
                    "0 0 30px oklch(0.6 0.25 320 / 0.5), 0 4px 20px oklch(0 0 0 / 0.3)",
                }}
              >
                <Phone className="w-5 h-5" />
                Book Your Bridal Consultation
              </a>
              <a
                href="https://wa.me/917041937373?text=Hi%20Unnati!%20I%20want%20to%20book%20a%20bridal%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="cta-primary-whatsapp"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-base transition-smooth border border-primary/40 text-primary hover:bg-primary/10"
              >
                <SiWhatsapp className="w-5 h-5" />
                WhatsApp Us
              </a>
            </motion.div>

            {/* Social proof badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-6 mt-10 text-muted-foreground text-xs font-medium"
            >
              {[
                "500+ Brides",
                "Celebrity Clients",
                "10+ Years Experience",
                "Gandhinagar, Gujarat",
              ].map((badge) => (
                <span key={badge} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-primary inline-block" />
                  {badge}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/** Secondary CTA — "Your Dream Bridal Look Awaits" — place near bottom of page */
export function CTASecondary() {
  const { ref, isInView } = useScrollAnimation(0.2);

  return (
    <section className="relative py-24 overflow-hidden bg-muted/20">
      {/* Gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 30% 50%, oklch(0.6 0.25 320 / 0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 80% 30%, oklch(0.75 0.15 65 / 0.06) 0%, transparent 50%)",
          }}
        />
      </div>

      <FloatingSparkles />

      <div
        ref={ref}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-sm text-primary font-medium"
              style={{
                background: "oklch(0.6 0.25 320 / 0.1)",
                border: "1px solid oklch(0.6 0.25 320 / 0.3)",
              }}
            >
              ✦ Limited Slots Available
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-5 leading-tight">
              Your Dream{" "}
              <span className="text-primary glow-text">Bridal Look</span> Awaits
            </h2>

            <p className="text-muted-foreground text-base leading-relaxed mb-8 font-body">
              Every bride deserves to feel like a queen. Let Unnati craft a
              bespoke bridal look that's timeless, flawless, and entirely you.
              Slots fill fast — secure yours today.
            </p>

            {/* Phone displayed prominently */}
            <div
              className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl mb-8"
              style={{
                background: "oklch(0.12 0.02 320 / 0.8)",
                border: "1px solid oklch(0.6 0.25 320 / 0.3)",
                boxShadow: "0 0 20px oklch(0.6 0.25 320 / 0.15)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "oklch(0.6 0.25 320 / 0.15)" }}
              >
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-0.5">
                  Call or message now
                </p>
                <p className="text-foreground font-bold text-xl tracking-wide">
                  07041937373
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="tel:07041937373"
                data-ocid="cta-secondary-call"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm transition-smooth"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.6 0.25 320) 0%, oklch(0.75 0.15 65) 100%)",
                  color: "oklch(0.08 0 0)",
                  boxShadow: "0 0 25px oklch(0.6 0.25 320 / 0.45)",
                }}
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
              <a
                href="https://wa.me/917041937373?text=Hi%20Unnati!%20I%20want%20to%20book%20my%20bridal%20makeup."
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="cta-secondary-whatsapp"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm transition-smooth border border-primary/40 text-primary hover:bg-primary/10"
              >
                <SiWhatsapp className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Right: stat cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { value: "500+", label: "Happy Brides", color: "text-primary" },
              {
                value: "10+",
                label: "Years of Excellence",
                color: "text-accent",
              },
              {
                value: "50+",
                label: "Celebrity Clients",
                color: "text-primary",
              },
              { value: "5★", label: "Average Rating", color: "text-accent" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                className="rounded-2xl p-6 text-center border border-primary/15"
                style={{
                  background: "oklch(0.12 0.02 320 / 0.6)",
                  boxShadow: "0 0 20px oklch(0.6 0.25 320 / 0.08)",
                }}
              >
                <p
                  className={`font-display text-3xl font-bold mb-1 ${stat.color} glow-text`}
                >
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-xs font-body">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** Legacy default export — renders primary CTA for backward compatibility */
export function CTASection() {
  return <CTAPrimary />;
}
