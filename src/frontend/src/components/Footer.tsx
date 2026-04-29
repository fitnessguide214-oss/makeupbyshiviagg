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
      className="relative overflow-hidden border-t border-primary/15"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.97 0.018 325) 0%, oklch(0.96 0.024 330) 100%)",
      }}
    >
      {/* Glow background orb */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-36 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, oklch(0.72 0.20 330 / 0.22) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary/15 border border-primary/50 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <span className="font-display text-xl font-bold">
                <span className="text-foreground">BEAUTYGRAM</span>
                <span className="text-primary"> BY UNNATI</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Luxury bridal & celebrity makeup artistry. Transforming faces,
              creating timeless beauty across India from our Gandhinagar studio.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/beautygrambyunnati"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/20 transition-smooth"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/917041937373"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/20 transition-smooth"
              >
                <SiWhatsapp className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-foreground font-semibold mb-5 text-lg">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(link.href)}
                    className="text-muted-foreground hover:text-primary transition-smooth text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-foreground font-semibold mb-5 text-lg">
              Studio Address
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <p>
                  Plot no. 634/1, Sector-4/C, Sector 4,
                  <br />
                  Gandhinagar, Gujarat 382006
                </p>
              </div>
              <a
                href="tel:07041937373"
                className="flex gap-3 text-muted-foreground hover:text-primary transition-smooth text-sm items-center"
              >
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span>+91 70419 37373</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary/12 flex flex-col sm:flex-row items-center justify-between gap-4 text-muted-foreground text-xs">
          <p className="flex items-center gap-1">
            &copy; {year} BEAUTYGRAM BY UNNATI GANDHINAGAR. Made with{" "}
            <Heart className="w-3 h-3 text-primary fill-primary" /> in
            Gandhinagar.
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
    </footer>
  );
}
