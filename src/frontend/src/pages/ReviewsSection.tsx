import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Quote,
  Sparkles,
  Star,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Testimonial } from "../types";

const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Priya Sharma",
    role: "Bride",
    quote:
      "Unnati transformed my wedding look beyond anything I had imagined. I walked into the mandap feeling like an absolute queen. My guests couldn't stop complimenting me — even my mother-in-law said I looked like a Bollywood star. The makeup lasted through tears of joy and all the dancing!",
    stars: 5,
  },
  {
    id: "t2",
    name: "Anjali Verma",
    role: "Bride",
    quote:
      "I was so nervous before my big day but Unnati made me feel completely at ease. She listened to every detail of my vision and created a bridal look that was breathtakingly perfect. Eight hours later at the reception, I still looked freshly made up. Truly the best investment for my wedding.",
    stars: 5,
  },
  {
    id: "t3",
    name: "Kavita Singh",
    role: "Bride",
    quote:
      "Unnati has magical hands — that's the only way I can describe it. My skin has always been problematic but she worked her expertise to give me a flawless, dewy finish. Every single photo from my wedding looks like it came straight from a bridal magazine. I'm forever grateful!",
    stars: 5,
  },
  {
    id: "t4",
    name: "Neha Gupta",
    role: "Bride",
    quote:
      "Booked Unnati for my destination wedding and it was worth every single rupee. She understood my aesthetic immediately — understated luxury — and delivered exactly that. My bridal portraits have gone viral in my entire friend circle. Pure artistry at work.",
    stars: 5,
  },
  {
    id: "t5",
    name: "Pooja Mehta",
    role: "Bride",
    quote:
      "I booked Unnati for my entire wedding week — mehendi, sangeet, and the main ceremony. Each look was completely different yet consistently gorgeous. She brought so much positive energy to my preparation room and made those moments even more special. An absolute gem!",
    stars: 5,
  },
  {
    id: "t6",
    name: "Ritika Choudhary",
    role: "Bride",
    quote:
      "Being a bride in the summer heat was my biggest fear but Unnati assured me and delivered on every promise. The makeup stayed flawless through the heat and humidity for a full 14 hours. She even prepped a personalized touch-up kit so I could refresh between ceremonies. Phenomenal service!",
    stars: 5,
  },
];

const CITIES: Record<string, string> = {
  t1: "Delhi",
  t2: "Noida",
  t3: "Gurgaon",
  t4: "Mumbai",
  t5: "Jaipur",
  t6: "Lucknow",
};

function TiltCard({
  testimonial,
  active,
}: { testimonial: Testimonial; active: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      x.set(relX);
      y.set(relY);
    },
    [x, y],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const initials = testimonial.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <motion.div
      ref={cardRef}
      data-ocid={`review-card-${testimonial.id}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative bg-card rounded-3xl p-8 border transition-all duration-300 card-elevated cursor-default select-none ${
        active
          ? "border-primary/50 shadow-[0_0_40px_oklch(0.6_0.25_320/0.3)]"
          : "border-border/60"
      }`}
    >
      {/* Shimmer overlay */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      {/* Quote icon */}
      <div className="flex items-start justify-between mb-5">
        <Quote className="w-9 h-9 text-primary/30" />
        <div className="flex gap-1">
          {Array.from({ length: testimonial.stars }, (_, i) => (
            <Star
              key={`star-${testimonial.id}-${i}`}
              className="w-4 h-4 text-accent fill-accent"
            />
          ))}
        </div>
      </div>

      {/* Quote text */}
      <blockquote className="text-muted-foreground text-sm leading-relaxed font-body italic mb-7 line-clamp-5">
        "{testimonial.quote}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4 pt-5 border-t border-border/50">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/40 to-secondary/40 border-2 border-primary/50 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_oklch(0.6_0.25_320/0.4)]">
          <span className="text-primary font-bold text-sm font-display">
            {initials}
          </span>
        </div>
        <div className="min-w-0">
          <p className="text-foreground font-semibold text-sm font-display truncate">
            {testimonial.name}
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <MapPin className="w-3 h-3 text-primary/70 flex-shrink-0" />
            <p className="text-muted-foreground text-xs truncate">
              {testimonial.role} · {CITIES[testimonial.id]}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ReviewsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number, dir: number) => {
    setDirection(dir);
    setCurrent(index);
  }, []);

  const prev = useCallback(() => {
    goTo((current - 1 + testimonials.length) % testimonials.length, -1);
  }, [current, goTo]);

  const next = useCallback(() => {
    goTo((current + 1) % testimonials.length, 1);
  }, [current, goTo]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
      setDirection(1);
    }, 4000);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const handlePrev = () => {
    prev();
    resetTimer();
  };
  const handleNext = () => {
    next();
    resetTimer();
  };

  // Show 3 cards on desktop: prev, current, next
  const getVisible = () => {
    const len = testimonials.length;
    return [
      testimonials[(current - 1 + len) % len],
      testimonials[current],
      testimonials[(current + 1) % len],
    ];
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.9,
    }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <section
      id="reviews"
      className="relative py-28 bg-background overflow-hidden"
    >
      {/* Section divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-20 left-10 w-56 h-56 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">
              Client Love
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4"
          >
            Love Stories{" "}
            <span className="text-primary glow-text">We've Crafted</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto font-body"
          >
            Hundreds of brides across India have trusted us with their most
            precious moments.
          </motion.p>
        </div>

        {/* Desktop: 3-card carousel */}
        <div className="hidden lg:block">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              className="grid grid-cols-3 gap-6"
            >
              {getVisible().map((t, i) => (
                <TiltCard key={t.id} testimonial={t} active={i === 1} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile/Tablet: single card */}
        <div className="lg:hidden overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="max-w-lg mx-auto"
            >
              <TiltCard testimonial={testimonials[current]} active={true} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            type="button"
            data-ocid="reviews-prev"
            onClick={handlePrev}
            aria-label="Previous review"
            className="w-11 h-11 rounded-full border border-border bg-card hover:border-primary/60 hover:bg-primary/10 flex items-center justify-center transition-smooth group"
          >
            <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-smooth" />
          </button>

          {/* Dots */}
          <div className="flex gap-2" data-ocid="reviews-dots">
            {testimonials.map((t, i) => (
              <button
                type="button"
                key={t.id}
                data-ocid={`reviews-dot-${i}`}
                onClick={() => {
                  goTo(i, i > current ? 1 : -1);
                  resetTimer();
                }}
                aria-label={`Go to review ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-8 h-2.5 bg-primary shadow-[0_0_10px_oklch(0.6_0.25_320/0.6)]"
                    : "w-2.5 h-2.5 bg-border hover:bg-primary/40"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            data-ocid="reviews-next"
            onClick={handleNext}
            aria-label="Next review"
            className="w-11 h-11 rounded-full border border-border bg-card hover:border-primary/60 hover:bg-primary/10 flex items-center justify-center transition-smooth group"
          >
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-smooth" />
          </button>
        </div>

        {/* Overall rating badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 text-center bg-card rounded-3xl p-10 border border-primary/20 max-w-xl mx-auto shadow-[0_0_40px_oklch(0.6_0.25_320/0.15)]"
        >
          <p className="font-display text-6xl font-bold text-primary glow-text mb-2">
            5.0
          </p>
          <div className="flex justify-center gap-1 mb-3">
            {["s1", "s2", "s3", "s4", "s5"].map((id) => (
              <Star key={id} className="w-6 h-6 text-accent fill-accent" />
            ))}
          </div>
          <p className="text-muted-foreground font-body">
            Based on 200+ verified reviews
          </p>
          <p className="text-foreground font-semibold mt-1">
            100% Client Satisfaction Rate
          </p>
        </motion.div>
      </div>
    </section>
  );
}
