import { Instagram } from "lucide-react";
import { motion } from "motion/react";
import { SiWhatsapp } from "react-icons/si";

export function FloatingButtons() {
  return (
    <>
      {/* WhatsApp — Bottom Left */}
      <motion.a
        data-ocid="float-whatsapp"
        href="https://wa.me/917041937373?text=Hi%20Unnati!%20I%20would%20like%20to%20book%20a%20makeup%20session."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-glow-lg"
        style={{
          background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
        }}
      >
        <SiWhatsapp className="w-7 h-7 text-white" />
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full animate-ping opacity-30 bg-green-500" />
      </motion.a>

      {/* Instagram — Bottom Right */}
      <motion.a
        data-ocid="float-instagram"
        href="https://instagram.com/beautygrambyunnati"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow on Instagram"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.2, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-glow-lg"
        style={{
          background:
            "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
        }}
      >
        <Instagram className="w-7 h-7 text-white" />
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full animate-ping opacity-30 bg-pink-500" />
      </motion.a>
    </>
  );
}
