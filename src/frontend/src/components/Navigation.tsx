import { Menu, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { NavLink } from "../types";

const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Celebrity", href: "#celebrity" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Appointment", href: "#appointment" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        data-ocid="nav"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={
          isScrolled
            ? {
                background: "oklch(0.96 0.014 55 / 0.90)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                borderBottom: "1px solid oklch(0.72 0.08 52 / 0.28)",
                boxShadow: "0 0 14px oklch(0.52 0.12 48 / 0.12)",
              }
            : {}
        }
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <button
              type="button"
              onClick={() => handleNavClick("#home")}
              className="flex items-center gap-2 group"
              aria-label="Go to home"
            >
              <div
                className="relative w-8 h-8 rounded-full flex items-center justify-center group-hover:scale-110 transition-smooth"
                style={{
                  background: "oklch(0.55 0.12 48 / 0.16)",
                  border: "1px solid oklch(0.60 0.10 50 / 0.52)",
                }}
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <div
                  className="absolute inset-0 rounded-full pulse-glow"
                  style={{ background: "oklch(0.55 0.12 48 / 0.10)" }}
                />
              </div>
              <span className="font-display text-lg sm:text-xl font-bold tracking-wide">
                <span className="text-foreground">BEAUTYGRAM</span>
                <span className="text-primary"> BY UNNATI</span>
              </span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="px-4 py-2 text-sm font-body text-muted-foreground hover:text-foreground hover:bg-primary/10 rounded-full transition-smooth relative group"
                >
                  {link.label}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-primary group-hover:w-6 transition-all duration-300" />
                </button>
              ))}
            </nav>

            {/* CTA + Mobile Menu */}
            <div className="flex items-center gap-3">
              <a
                href="tel:07041937373"
                data-ocid="nav-cta"
                className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-full text-primary text-sm font-semibold hover:bg-primary/20 transition-smooth shadow-glow-sm"
                style={{
                  background: "oklch(0.55 0.12 48 / 0.14)",
                  border: "1px solid oklch(0.60 0.10 50 / 0.40)",
                }}
              >
                Book Now
              </a>
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-full text-primary"
                aria-label="Toggle menu"
                style={{
                  background: "oklch(0.55 0.12 48 / 0.12)",
                  border: "1px solid oklch(0.60 0.10 50 / 0.32)",
                }}
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 sm:top-20 left-0 right-0 z-40 lg:hidden"
            style={{
              background: "oklch(0.96 0.014 55 / 0.97)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderBottom: "1px solid oklch(0.72 0.08 52 / 0.28)",
              boxShadow: "0 0 28px oklch(0.52 0.12 48 / 0.14)",
            }}
          >
            <nav className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.button
                  type="button"
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-left px-4 py-3 rounded-xl text-foreground hover:bg-primary/10 hover:text-primary transition-smooth font-body font-medium"
                >
                  {link.label}
                </motion.button>
              ))}
              <a
                href="tel:07041937373"
                className="mt-2 px-4 py-3 rounded-xl text-primary text-center font-semibold"
                style={{
                  background: "oklch(0.55 0.12 48 / 0.14)",
                  border: "1px solid oklch(0.60 0.10 50 / 0.40)",
                }}
              >
                Book Your Transformation
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
