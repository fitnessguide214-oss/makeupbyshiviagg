import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { FAQItem } from "../types";

const faqs: FAQItem[] = [
  {
    id: "f1",
    question: "How do I book a makeup session with BEAUTYGRAM BY UNNATI?",
    answer:
      "Simply call or WhatsApp us at 07041937373 to check availability for your date. For bridal bookings, we strongly recommend reaching out at least 3–6 months in advance to secure your date. We'll schedule a detailed consultation to understand your vision, review inspo images, and confirm the booking with an advance payment.",
  },
  {
    id: "f2",
    question: "What is included in a bridal makeup package?",
    answer:
      "Our signature bridal packages include a complimentary trial session (scheduled 1 week before the wedding), day-of bridal application, skin prep and hydration consultation, HD or airbrush finish of your choice, premium product application, a personalized touch-up kit for the day, and extended on-site availability. We also offer discounted add-on pricing for family members booking alongside the bride.",
  },
  {
    id: "f3",
    question: "How long does the makeup stay fresh?",
    answer:
      "We use only the finest long-wearing products from brands like MAC, Charlotte Tilbury, NARS, and Huda Beauty. Our expert finishing process — including primers, setting powders, and pro-grade setting sprays — ensures your makeup stays beautifully fresh for 12–16 hours regardless of heat, humidity, or emotions. We also provide a touch-up kit personalized to your look.",
  },
  {
    id: "f4",
    question: "Do you travel for destination weddings?",
    answer:
      "Absolutely! We travel across India and internationally for destination weddings. We've worked in Rajasthan, Goa, Kerala, Bangkok, Dubai, and beyond. Travel, accommodation, and per-diem charges are applied based on the destination. Please share your wedding location and date so we can provide a customized quote for your dream wedding.",
  },
  {
    id: "f5",
    question: "Is a trial session available before the wedding day?",
    answer:
      "Yes — a complimentary trial session is included in all bridal packages and we highly recommend it. The trial is ideally scheduled 1–2 weeks before the wedding. It helps us fine-tune the exact look, test product compatibility with your skin, and ensures zero surprises on the actual day. It also gives you a chance to see and photograph how the look translates on camera.",
  },
  {
    id: "f6",
    question: "Do you work with all skin types and tones?",
    answer:
      "We specialize in all skin types — oily, dry, combination, and sensitive — and celebrate every Indian skin tone from the fairest to the deepest. We firmly believe in enhancing your natural beauty. Our extensive product collection and color-matching expertise ensures the most seamless, flawless result tailored specifically to your complexion.",
  },
  {
    id: "f7",
    question: "What if I have skin sensitivities or allergies?",
    answer:
      "Please inform us during the consultation about any allergies, sensitivities, or skin conditions. We will customize the product selection accordingly, avoiding known allergens and using hypoallergenic alternatives where needed. We always patch-test on sensitive skin clients before the full application to ensure complete comfort and safety.",
  },
  {
    id: "f8",
    question:
      "Can I book for pre-wedding ceremonies like mehendi, sangeet, and haldi?",
    answer:
      "Yes! We offer specialized, tailored looks for every pre-wedding ceremony. Each event has its own distinct vibe — light and dewy for mehendi/haldi, dramatic and glamorous for sangeet. We create completely different looks for each ceremony that photograph brilliantly. Multi-ceremony packages with attractive discounts are available — ask us for a quote.",
  },
  {
    id: "f9",
    question: "How far in advance should I book for peak wedding season?",
    answer:
      "Wedding season (October through February) books up very quickly. We strongly recommend booking at least 4–6 months in advance for prime winter wedding dates. For summer weddings, 2–3 months is usually sufficient. Popular dates like November and February weekends tend to fill up within days of announcement. A date is only confirmed upon receipt of the advance payment.",
  },
  {
    id: "f10",
    question: "What is your cancellation and rescheduling policy?",
    answer:
      "We understand that plans can change. Cancellations made more than 60 days before the event receive a full refund of the advance. Cancellations between 30–60 days receive a 50% refund. Cancellations within 30 days of the event are non-refundable. Rescheduling is accommodated subject to availability at no extra charge if requested more than 30 days in advance. Please contact us as early as possible so we can accommodate your needs.",
  },
];

function FAQAccordionItem({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        border: isOpen
          ? "1px solid oklch(0.55 0.12 50 / 0.48)"
          : "1px solid oklch(0.78 0.06 52 / 0.45)",
        boxShadow: isOpen
          ? "0 0 22px oklch(0.52 0.12 48 / 0.16), inset 0 0 18px oklch(0.55 0.10 50 / 0.04)"
          : undefined,
      }}
    >
      <button
        type="button"
        data-ocid={`faq-toggle-${item.id}`}
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left transition-smooth"
        style={{
          background: isOpen
            ? "oklch(0.94 0.022 50 / 0.80)"
            : "oklch(0.96 0.014 55 / 0.80)",
        }}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 pr-4">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-smooth"
            style={{
              background: isOpen
                ? "oklch(0.55 0.12 48 / 0.16)"
                : "oklch(0.90 0.025 52 / 0.80)",
              color: isOpen ? "oklch(0.45 0.12 48)" : "oklch(0.55 0.06 50)",
            }}
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </div>
          <span className="text-foreground font-semibold font-body text-sm sm:text-base">
            {item.question}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="flex-shrink-0 ml-2"
        >
          <ChevronDown
            className="w-5 h-5 transition-smooth"
            style={{
              color: isOpen ? "oklch(0.45 0.12 48)" : "oklch(0.55 0.06 50)",
            }}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div
              className="px-6 pb-6 pt-1"
              style={{
                borderTop: "1px solid oklch(0.80 0.05 52 / 0.35)",
                background: "oklch(0.94 0.020 52 / 0.55)",
              }}
            >
              <p className="text-muted-foreground text-sm leading-relaxed font-body pl-10">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>("f1");

  return (
    <section
      id="faq"
      className="relative py-28 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.96 0.014 55) 0%, oklch(0.95 0.018 50) 100%)",
      }}
    >
      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      {/* Ambient warm glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-20 right-0 w-64 h-64 rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.65 0.12 52 / 0.28) 0%, transparent 70%)",
            filter: "blur(64px)",
          }}
        />
        <div
          className="absolute bottom-20 left-0 w-48 h-48 rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.60 0.13 48 / 0.24) 0%, transparent 70%)",
            filter: "blur(52px)",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 shadow-glow-sm"
            style={{
              background: "oklch(0.96 0.014 55 / 0.82)",
              border: "1px solid oklch(0.65 0.10 50 / 0.36)",
            }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">
              Got Questions?
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-5"
          >
            Frequently Asked{" "}
            <span className="text-primary glow-text">Questions</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-muted-foreground text-lg font-body max-w-xl mx-auto"
          >
            Everything you need to know before booking your transformation.
            Can't find the answer? Just call us.
          </motion.p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3" data-ocid="faq-list">
          {faqs.map((faq, i) => (
            <FAQAccordionItem
              key={faq.id}
              item={faq}
              index={i}
              isOpen={openId === faq.id}
              onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 text-center backdrop-blur-sm rounded-3xl p-8"
          style={{
            background: "oklch(0.96 0.014 55 / 0.88)",
            border: "1px solid oklch(0.68 0.08 52 / 0.24)",
            boxShadow: "0 0 28px oklch(0.52 0.12 48 / 0.14)",
          }}
        >
          <p className="text-foreground font-semibold font-display text-lg mb-2">
            Still have questions?
          </p>
          <p className="text-muted-foreground font-body text-sm mb-5">
            We'd love to chat. Reach out directly and we'll get back to you
            within hours.
          </p>
          <a
            href="https://wa.me/917041937373"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="faq-whatsapp-cta"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-smooth shadow-glow-sm"
          >
            Chat on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
