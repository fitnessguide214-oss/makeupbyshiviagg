import { Phone, Sparkles } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { type MouseEvent, useRef } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import type { ServiceItem } from "../types";

const PHONE = "07041937373";

const services: ServiceItem[] = [
  {
    id: "bridal",
    title: "Bridal Makeup",
    description:
      "Your wedding day deserves nothing but perfection. Each bridal look is hand-crafted to enhance your natural beauty, honour your heritage, and last flawlessly from ceremony to celebrations.",
    image: "/assets/photos/beautygram-02.png",
    price: "Starting ₹8,000",
    highlights: [
      "Pre-bridal trial session",
      "All-day lasting formula",
      "HD & airbrush available",
      "Skin-prep consultation",
    ],
  },
  {
    id: "engagement",
    title: "Engagement Makeup",
    description:
      "Celebrate your love story with a radiant, romantic look. Tailored for mehendi, sangeet, haldi, and engagement ceremonies — every pore glows with intention.",
    image: "/assets/photos/beautygram-03.png",
    price: "Starting ₹4,500",
    highlights: [
      "Multi-event packages",
      "Dewy & matte finishes",
      "Coordination with hairstylist",
      "Family group discounts",
    ],
  },
  {
    id: "celebrity",
    title: "Celebrity Styling",
    description:
      "Trusted by Bollywood stars and TV personalities across India. Camera-ready precision that translates magnificently on screen, in print, and on the red carpet.",
    image: "/assets/photos/beautygram-04.png",
    price: "On Request",
    highlights: [
      "On-location service",
      "HD camera-ready finish",
      "Confidential bookings",
      "NDA available on request",
    ],
  },
  {
    id: "party",
    title: "Party & Events",
    description:
      "Turn heads at every occasion — cocktail parties, receptions, corporate galas, and festive celebrations. Glamorous, polished looks that last the entire night.",
    image: "/assets/photos/beautygram-05.png",
    price: "Starting ₹3,500",
    highlights: [
      "Express 45-min sessions",
      "Long-wearing formulas",
      "Customised to your outfit",
      "Group bookings welcome",
    ],
  },
  {
    id: "hd",
    title: "HD Makeup",
    description:
      "High-definition makeup engineered for photography and video. Ultra-fine pigments create a flawless, camera-perfect finish that appears completely natural up close.",
    image: "/assets/photos/beautygram-06.png",
    price: "Starting ₹5,500",
    highlights: [
      "Zero flashback guarantee",
      "Lightweight & breathable",
      "Perfect for photoshoots",
      "All skin tones welcome",
    ],
  },
  {
    id: "airbrush",
    title: "Airbrush Makeup",
    description:
      "The gold standard of flawless coverage. Silicone-based pigments sprayed with precision give an ethereal, second-skin finish that photographs like a dream.",
    image: "/assets/photos/beautygram-07.png",
    price: "Starting ₹6,000",
    highlights: [
      "Weightless, breathable feel",
      "Sweat & humidity proof",
      "12+ hour longevity",
      "Skin-friendly formula",
    ],
  },
];

/* ─────────────────────────────────────────
   3-D Tilt Card
───────────────────────────────────────── */
function ServiceCard({
  service,
  index,
}: {
  service: ServiceItem;
  index: number;
}) {
  const { ref: scrollRef, isInView } = useScrollAnimation(0.12);
  const cardRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    rawX.set((e.clientX - left) / width - 0.5);
    rawY.set((e.clientY - top) / height - 0.5);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.div
      ref={scrollRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.75,
        delay: (index % 3) * 0.13,
        ease: [0.22, 0.61, 0.36, 1],
      }}
      style={{ perspective: 900 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden border border-primary/20 transition-colors duration-300 card-elevated cursor-pointer hover:border-primary/45"
        data-ocid={`service-card-${service.id}`}
      >
        {/* Pink glow border on hover */}
        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.52 0.24 335 / 0.45), oklch(0.65 0.18 340 / 0.35), oklch(0.52 0.24 335 / 0.45))",
            padding: "1.5px",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* Pink glow halo */}
        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
          style={{
            boxShadow:
              "0 0 40px oklch(0.52 0.24 335 / 0.25), 0 0 70px oklch(0.60 0.20 335 / 0.12)",
          }}
        />

        {/* image */}
        <div
          className="relative h-56 overflow-hidden"
          style={{ transform: "translateZ(20px)" }}
        >
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-700"
            style={{ transition: "transform 0.7s cubic-bezier(0.4,0,0.2,1)" }}
          />
          {/* Light pink gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-pink-50/70 via-pink-50/10 to-transparent" />
          <div
            className="absolute top-4 right-4 backdrop-blur-md rounded-full px-3 py-1 border border-primary/40 bg-white/85"
            style={{ boxShadow: "0 2px 12px oklch(0.52 0.24 335 / 0.2)" }}
          >
            <span className="text-primary text-xs font-semibold tracking-wide">
              {service.price}
            </span>
          </div>
        </div>

        {/* content */}
        <div className="p-6" style={{ transform: "translateZ(12px)" }}>
          <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-smooth">
            {service.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-5 font-body line-clamp-3">
            {service.description}
          </p>

          <ul className="space-y-1.5 mb-6">
            {service.highlights.map((h) => (
              <li
                key={h}
                className="flex items-center gap-2 text-xs text-muted-foreground"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                {h}
              </li>
            ))}
          </ul>

          <a
            href={`tel:${PHONE}`}
            data-ocid={`service-book-${service.id}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/85 px-4 py-2 rounded-full transition-smooth group-hover:shadow-glow-sm"
          >
            <Phone className="w-3.5 h-3.5" />
            Book Now
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Section
───────────────────────────────────────── */
export function ServicesSection() {
  const { ref, isInView } = useScrollAnimation(0.08);

  return (
    <section
      id="services"
      className="relative py-28 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.97 0.018 325) 0%, oklch(0.98 0.012 320) 100%)",
      }}
    >
      {/* top accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* animated pink orbs */}
      <motion.div
        className="absolute -top-24 -left-24 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.76 0.18 325 / 0.35) 0%, transparent 70%)",
          filter: "blur(55px)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-32 -right-24 w-[28rem] h-[28rem] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.70 0.20 335 / 0.3) 0%, transparent 70%)",
          filter: "blur(65px)",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.75, 0.4] }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-64 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, oklch(0.82 0.12 325 / 0.2) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
        animate={{ scaleX: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* heading */}
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium tracking-wide uppercase">
              What We Offer
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl font-bold text-foreground mb-4"
          >
            Our <span className="text-primary glow-text">Services</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-display text-xl text-muted-foreground max-w-xl mx-auto italic"
          >
            Where Art Meets Beauty
          </motion.p>
        </div>

        {/* cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground text-sm mb-4 font-body">
            Don't see your occasion listed?{" "}
            <a
              href={`tel:${PHONE}`}
              data-ocid="services-enquire-cta"
              className="text-primary font-semibold hover:underline transition-smooth"
            >
              Call us for custom packages →
            </a>
          </p>
        </motion.div>
      </div>

      {/* bottom accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40rem] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  );
}
