import { Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const portfolioPhotos = [
  {
    id: "p1",
    src: "/assets/photos/beautygram-01.png",
    label: "Bridal Elegance",
  },
  {
    id: "p2",
    src: "/assets/photos/beautygram-02.png",
    label: "Bridal Radiance",
  },
  {
    id: "p3",
    src: "/assets/photos/beautygram-03.png",
    label: "Editorial Glam",
  },
  {
    id: "p4",
    src: "/assets/photos/beautygram-04.png",
    label: "Party Perfection",
  },
  {
    id: "p5",
    src: "/assets/photos/beautygram-05.png",
    label: "Celebrity Ready",
  },
  {
    id: "p6",
    src: "/assets/photos/beautygram-06.png",
    label: "Engagement Glow",
  },
  {
    id: "p7",
    src: "/assets/photos/beautygram-07.png",
    label: "Masterclass Work",
  },
  {
    id: "p8",
    src: "/assets/photos/beautygram-08.png",
    label: "Bridal Tradition",
  },
  {
    id: "p9",
    src: "/assets/photos/beautygram-09.png",
    label: "Luxe Editorial",
  },
  {
    id: "p10",
    src: "/assets/photos/beautygram-10.png",
    label: "Signature Look",
  },
];

export function PortfolioSection() {
  const { ref, isInView } = useScrollAnimation(0.1);

  return (
    <section
      id="portfolio"
      className="relative py-24 bg-background overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">
              Real Work, Real Beauty
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-5"
          >
            Our <span className="text-primary glow-text">Portfolio</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto font-body"
          >
            A curated selection of transformations — each look crafted with
            passion, precision, and artistry.
          </motion.p>
        </div>

        {/* Masonry-style grid */}
        <div className="columns-2 sm:columns-3 lg:columns-3 gap-4 space-y-4">
          {portfolioPhotos.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className="relative group break-inside-avoid rounded-2xl overflow-hidden border border-border hover:border-primary/40 transition-smooth shadow-card-elevated"
            >
              <img
                src={photo.src}
                alt={photo.label}
                className="w-full object-cover group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-smooth">
                <p className="text-foreground text-sm font-semibold font-body">
                  {photo.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
