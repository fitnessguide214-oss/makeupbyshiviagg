import { Heart, Instagram, MapPin, Phone, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { SiWhatsapp } from "react-icons/si";

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Celebrity Work", href: "#celebrity" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const handleNavClick = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.28 0.08 42) 0%, oklch(0.22 0.06 40) 100%)",
        borderTop: "1px solid oklch(0.45 0.10 48 / 0.35)",
      }}
    >
      {/* Deep warm brown glow background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-40 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, oklch(0.52 0.12 48 / 0.22) 0%, transparent 70%)",
            filter: "blur(45px)",
          }}
        />
        <div
          className="absolute top-10 right-10 w-48 h-48 rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.58 0.12 52 / 0.14) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
        <div
          className="absolute top-10 left-10 w-48 h-48 rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.55 0.10 50 / 0.12) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: "oklch(0.55 0.12 48 / 0.22)",
                  border: "1px solid oklch(0.65 0.10 50 / 0.45)",
                }}
              >
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <span className="font-display text-xl font-bold">
                <span style={{ color: "oklch(0.90 0.04 55)" }}>BEAUTYGRAM</span>
                <span className="text-primary"> BY UNNATI</span>
              </span>
            </div>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: "oklch(0.68 0.04 52)" }}
            >
              Luxury bridal & celebrity makeup artistry. Transforming faces,
              creating timeless beauty across India from our Gandhinagar studio.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/beautygrambyunnati"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-smooth hover:scale-110"
                style={{
                  background: "oklch(0.55 0.12 48 / 0.18)",
                  border: "1px solid oklch(0.60 0.10 50 / 0.38)",
                  color: "oklch(0.72 0.10 52)",
                }}
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/917041937373"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-smooth hover:scale-110"
                style={{
                  background: "oklch(0.55 0.12 48 / 0.18)",
                  border: "1px solid oklch(0.60 0.10 50 / 0.38)",
                  color: "oklch(0.72 0.10 52)",
                }}
              >
                <SiWhatsapp className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="font-display font-semibold mb-5 text-lg"
              style={{ color: "oklch(0.90 0.04 55)" }}
            >
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(link.href)}
                    className="transition-smooth text-sm"
                    style={{ color: "oklch(0.65 0.05 52)" }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="font-display font-semibold mb-5 text-lg"
              style={{ color: "oklch(0.90 0.04 55)" }}
            >
              Studio Address
            </h3>
            <div className="space-y-4">
              <div
                className="flex gap-3 text-sm"
                style={{ color: "oklch(0.65 0.05 52)" }}
              >
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                <p>
                  Plot no. 634/1, Sector-4/C, Sector 4,
                  <br />
                  Gandhinagar, Gujarat 382006
                </p>
              </div>
              <a
                href="tel:07041937373"
                className="flex gap-3 transition-smooth text-sm items-center hover:text-primary"
                style={{ color: "oklch(0.65 0.05 52)" }}
              >
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span>+91 70419 37373</span>
              </a>
            </div>
          </div>
        </div>

        <div
          className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{
            borderTop: "1px solid oklch(0.45 0.08 48 / 0.25)",
            color: "oklch(0.58 0.04 50)",
          }}
        >
          <p className="flex items-center gap-1">
            &copy; {year} BEAUTYGRAM BY UNNATI GANDHINAGAR. Made with{" "}
            <Heart
              className="w-3 h-3 flex-shrink-0"
              style={{
                color: "oklch(0.65 0.12 50)",
                fill: "oklch(0.65 0.12 50)",
              }}
            />{" "}
            in Gandhinagar.
          </p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-smooth"
          >
            Built with caffeine.ai
          </a>
        </div>
      </div>

      {/* Bottom golden shimmer line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.62 0.12 50 / 0.55), transparent)",
        }}
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
      />
    </footer>
  );
}
