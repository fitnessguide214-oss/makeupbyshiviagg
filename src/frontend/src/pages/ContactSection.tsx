import { Instagram, MapPin, Phone, Sparkles, Star } from "lucide-react";
import { motion } from "motion/react";
import { SiWhatsapp } from "react-icons/si";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const contactCards = [
  {
    id: "phone",
    href: "tel:07041937373",
    icon: Phone,
    iconColor: "text-primary",
    iconBg: "bg-primary/10 border-primary/30",
    hoverBg: "group-hover:bg-primary/20",
    hoverText: "group-hover:text-primary",
    label: "+91 70419 37373",
    sublabel: "Available 7 AM – 9 PM, every day",
    external: false,
  },
  {
    id: "whatsapp",
    href: "https://wa.me/917041937373?text=Hi%20Unnati!%20I%20want%20to%20book%20a%20bridal%20session.",
    icon: SiWhatsapp,
    iconColor: "text-green-600",
    iconBg: "bg-green-100 border-green-300",
    hoverBg: "group-hover:bg-green-100",
    hoverText: "group-hover:text-green-600",
    label: "WhatsApp Us",
    sublabel: "Quick reply, instant booking",
    external: true,
  },
  {
    id: "instagram",
    href: "https://instagram.com/beautygrambyunnati",
    icon: Instagram,
    iconColor: "text-primary",
    iconBg: "bg-primary/10 border-primary/30",
    hoverBg: "group-hover:bg-primary/20",
    hoverText: "group-hover:text-primary",
    label: "@beautygrambyunnati",
    sublabel: "DM for portfolio & bookings",
    external: true,
  },
  {
    id: "address",
    href: "https://maps.google.com/?q=Plot+634/1+Sector-4/C+Sector+4+Gandhinagar+Gujarat",
    icon: MapPin,
    iconColor: "text-accent-foreground",
    iconBg: "bg-accent/30 border-accent/50",
    hoverBg: "group-hover:bg-accent/40",
    hoverText: "group-hover:text-accent-foreground",
    label: "Plot no. 634/1, Sector-4/C",
    sublabel: "Gandhinagar, Gujarat 382006",
    external: true,
  },
];

export function ContactSection() {
  const { ref, isInView } = useScrollAnimation(0.1);

  return (
    <section
      id="contact"
      className="relative py-28 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.96 0.020 325) 0%, oklch(0.97 0.014 320) 100%)",
      }}
    >
      {/* Top rule */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      {/* Background pink glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.74 0.20 330 / 0.3) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute top-10 right-0 w-64 h-64 rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.78 0.16 340 / 0.25) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, oklch(0.82 0.12 330 / 0.18) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-primary/30 mb-6 shadow-glow-sm"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium tracking-wide">
              Get In Touch
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-5 leading-tight"
          >
            Let's Create Your{" "}
            <span className="text-primary glow-text">Dream Look</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto font-body leading-relaxed"
          >
            Whether it's your wedding day, a special event, or a celebrity
            photoshoot — Unnati is ready to bring your vision to life. Reach out
            and let's talk beauty.
          </motion.p>
        </div>

        {/* Contact cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {contactCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.a
                key={card.id}
                href={card.href}
                target={card.external ? "_blank" : undefined}
                rel={card.external ? "noopener noreferrer" : undefined}
                data-ocid={`contact-card-${card.id}`}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/85 backdrop-blur-sm border border-primary/15 card-elevated text-center cursor-pointer transition-smooth hover:border-primary/40"
              >
                <div
                  className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-smooth ${card.iconBg} ${card.hoverBg}`}
                >
                  <Icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>
                <div>
                  <p
                    className={`text-foreground font-semibold text-sm transition-smooth ${card.hoverText}`}
                  >
                    {card.label}
                  </p>
                  <p className="text-muted-foreground text-xs mt-0.5 leading-relaxed">
                    {card.sublabel}
                  </p>
                </div>
                <div className="flex gap-0.5 mt-auto">
                  {["s1", "s2", "s3", "s4", "s5"].map((k) => (
                    <Star
                      key={k}
                      className="w-3 h-3 text-primary fill-primary opacity-80"
                    />
                  ))}
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Map + Info grid */}
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Left: Studio info + CTA */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-white/85 backdrop-blur-sm rounded-3xl p-8 border border-primary/20 card-elevated">
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                Studio Details
              </h3>
              <p className="text-muted-foreground text-sm mb-6 font-body">
                Walk-ins welcome — appointments preferred for bridal sessions.
              </p>

              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary pulse-glow flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Mon – Sun:{" "}
                    <span className="text-foreground font-medium">
                      7:00 AM – 9:00 PM
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary/60 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Response time:{" "}
                    <span className="text-foreground font-medium">
                      Within 30 minutes
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Home visits:{" "}
                    <span className="text-foreground font-medium">
                      Available across Gujarat
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href="tel:07041937373"
                data-ocid="contact-cta-call"
                className="flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-smooth shadow-glow-md text-sm"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
              <a
                href="https://wa.me/917041937373?text=Hi%20Unnati!%20I%20want%20to%20book%20a%20bridal%20session."
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="contact-cta-whatsapp"
                className="flex items-center justify-center gap-2 px-5 py-4 rounded-2xl border border-primary/40 text-primary font-semibold hover:bg-primary/10 transition-smooth text-sm bg-white/70"
              >
                <SiWhatsapp className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Right: Map */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div
              className="rounded-3xl overflow-hidden border-2 border-primary/30 relative"
              style={{
                boxShadow:
                  "0 0 40px oklch(0.65 0.20 330 / 0.22), 0 0 80px oklch(0.70 0.16 330 / 0.10), 0 20px 60px oklch(0.52 0.24 335 / 0.1)",
              }}
            >
              {/* Glow corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16 bg-primary/20 blur-xl rounded-full pointer-events-none z-10" />
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-primary/20 blur-xl rounded-full pointer-events-none z-10" />

              <iframe
                title="BEAUTYGRAM BY UNNATI GANDHINAGAR Studio — Plot no. 634/1, Sector-4/C, Gandhinagar"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3668.123456789!2d72.6369!3d23.2156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c2a81e2bf67b7%3A0x0!2sSector%204%2C%20Gandhinagar%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1234567890"
                style={{
                  border: 0,
                  width: "100%",
                  height: "450px",
                  borderRadius: "1.5rem",
                  display: "block",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <p className="text-center text-muted-foreground text-xs mt-3 flex items-center justify-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              Plot no. 634/1, Sector-4/C, Sector 4, Gandhinagar, Gujarat 382006
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
