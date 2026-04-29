import { CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SiWhatsapp } from "react-icons/si";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const SPARKLE_POSITIONS = [
  { top: "8%", left: "6%", size: 14, delay: 0 },
  { top: "15%", right: "10%", size: 10, delay: 0.5 },
  { top: "55%", left: "3%", size: 12, delay: 0.9 },
  { top: "70%", right: "6%", size: 16, delay: 0.3 },
  { top: "40%", left: "48%", size: 8, delay: 0.7 },
  { top: "85%", left: "22%", size: 10, delay: 1.1 },
  { top: "25%", right: "30%", size: 9, delay: 0.2 },
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
      {SPARKLE_POSITIONS.map((pos) => (
        <motion.div
          key={`appt-sparkle-${pos.top}-${pos.delay}`}
          className="absolute"
          style={{
            top: pos.top,
            left: "left" in pos ? pos.left : undefined,
            right: "right" in pos ? pos.right : undefined,
            color: "oklch(0.72 0.1 52 / 0.4)",
          }}
          animate={{
            y: [-6, 6, -6],
            opacity: [0.2, 0.55, 0.2],
            scale: [0.85, 1.15, 0.85],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4 + pos.delay * 2,
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

interface AppointmentFormData {
  fullName: string;
  phone: string;
  email: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}

const serviceOptions = [
  "Bridal Makeup",
  "Engagement Makeup",
  "Celebrity Makeup",
  "Party Makeup",
  "HD Makeup",
  "Airbrush Makeup",
];

const timeOptions = [
  { value: "morning", label: "Morning (9 AM – 12 PM)" },
  { value: "afternoon", label: "Afternoon (12 PM – 3 PM)" },
  { value: "evening", label: "Evening (3 PM – 7 PM)" },
];

const infoStrip = [
  { icon: "📞", text: "Instant response within 2 hours" },
  { icon: "📅", text: "Book up to 30 days in advance" },
  { icon: "✨", text: "Free consultation included" },
];

const inputStyle = {
  background: "oklch(0.22 0.06 42 / 0.80)",
  border: "1px solid oklch(0.55 0.1 52 / 0.40)",
  color: "oklch(0.92 0.018 52)",
};

const focusStyle =
  "focus:outline-none focus:ring-2 focus:ring-[oklch(0.72_0.1_52_/_0.55)] focus:border-[oklch(0.72_0.1_52)]";

const labelClass = "block text-sm font-medium mb-2 font-body";

const today = new Date().toISOString().split("T")[0];

export function AppointmentSection() {
  const { ref, isInView } = useScrollAnimation(0.1);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      serviceType: "",
      preferredDate: "",
      preferredTime: "",
      notes: "",
    },
  });

  const onSubmit = (data: AppointmentFormData) => {
    const timeLabel =
      timeOptions.find((t) => t.value === data.preferredTime)?.label ??
      data.preferredTime;

    const message = [
      "✨ *Appointment Request – BEAUTYGRAM BY UNNATI*",
      "",
      `👤 *Name:* ${data.fullName}`,
      `📞 *Phone:* ${data.phone}`,
      data.email ? `📧 *Email:* ${data.email}` : null,
      `💄 *Service:* ${data.serviceType}`,
      `📅 *Date:* ${data.preferredDate}`,
      `⏰ *Time:* ${timeLabel}`,
      data.notes ? `📝 *Notes:* ${data.notes}` : null,
      "",
      "Looking forward to my transformation! 🌟",
    ]
      .filter(Boolean)
      .join("\n");

    const encoded = encodeURIComponent(message);
    window.open(
      `https://wa.me/917041937373?text=${encoded}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <section
      id="appointment"
      className="relative py-28 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.28 0.08 42) 0%, oklch(0.32 0.09 46) 45%, oklch(0.35 0.1 48) 100%)",
      }}
    >
      {/* Blur orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-[-10%] left-[-8%] w-96 h-96 blur-orb"
          style={{ background: "oklch(0.62 0.12 52 / 0.14)" }}
        />
        <div
          className="absolute bottom-[-12%] right-[-6%] w-80 h-80 blur-orb"
          style={{ background: "oklch(0.7 0.09 55 / 0.11)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-72 blur-orb"
          style={{ background: "oklch(0.55 0.1 50 / 0.07)" }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[oklch(0.72_0.1_52_/_0.4)] to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[oklch(0.62_0.1_50_/_0.28)] to-transparent" />
      </div>

      <FloatingSparkles />

      <div
        ref={ref}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6 text-sm font-medium"
            style={{
              background: "oklch(0.62 0.1 52 / 0.15)",
              border: "1px solid oklch(0.72 0.1 52 / 0.35)",
              color: "oklch(0.82 0.1 52)",
            }}
          >
            ✦ Reserve Your Slot
          </div>
          <h2
            className="font-display text-4xl sm:text-5xl xl:text-6xl font-bold mb-5 leading-tight glow-text"
            style={{ color: "oklch(0.95 0.018 52)" }}
          >
            Book Your{" "}
            <span style={{ color: "oklch(0.78 0.12 52)" }}>Appointment</span>
          </h2>
          {/* Golden underline */}
          <div className="flex justify-center mb-6">
            <div
              className="h-1 w-24 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.62 0.12 50), oklch(0.78 0.12 52), oklch(0.62 0.12 50))",
                boxShadow: "0 0 12px oklch(0.72 0.12 52 / 0.55)",
              }}
            />
          </div>
          <p
            className="font-body text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: "oklch(0.75 0.06 48)" }}
          >
            Secure your date with Unnati for a bespoke bridal or makeup
            consultation. Fill the form below and your details will be sent
            directly via WhatsApp.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl p-8 sm:p-10 overflow-hidden"
          style={{
            background: "oklch(0.3 0.08 45 / 0.72)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid oklch(0.55 0.1 52 / 0.32)",
            boxShadow:
              "0 0 60px oklch(0.45 0.12 48 / 0.22), 0 0 120px oklch(0.62 0.1 52 / 0.10), inset 0 0 40px oklch(0.55 0.1 50 / 0.05)",
          }}
        >
          {/* Inner top glow */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 40% at 50% 0%, oklch(0.72 0.1 52 / 0.10) 0%, transparent 60%)",
            }}
          />

          {/* Success state */}
          {submitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative z-10 flex flex-col items-center justify-center text-center py-14 gap-4"
              data-ocid="appointment.success_state"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  background: "oklch(0.55 0.12 48 / 0.18)",
                  border: "1px solid oklch(0.72 0.1 52 / 0.45)",
                  boxShadow: "0 0 30px oklch(0.72 0.1 52 / 0.35)",
                }}
              >
                <CheckCircle
                  className="w-10 h-10"
                  style={{ color: "oklch(0.78 0.12 52)" }}
                />
              </div>
              <h3
                className="font-display text-2xl font-bold"
                style={{ color: "oklch(0.92 0.018 52)" }}
              >
                Request Sent!
              </h3>
              <p
                className="font-body text-base max-w-sm"
                style={{ color: "oklch(0.72 0.06 48)" }}
              >
                Your appointment request has been sent! Unnati will contact you
                shortly.
              </p>
            </motion.div>
          )}

          {!submitted && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="relative z-10"
              data-ocid="appointment.form"
              noValidate
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="appt-name"
                    className={labelClass}
                    style={{ color: "oklch(0.82 0.08 50)" }}
                  >
                    Full Name{" "}
                    <span style={{ color: "oklch(0.72 0.1 52)" }}>*</span>
                  </label>
                  <input
                    id="appt-name"
                    type="text"
                    placeholder="Your full name"
                    data-ocid="appointment.name_input"
                    className={`w-full px-4 py-3 rounded-xl font-body text-sm transition-smooth ${focusStyle}`}
                    style={{
                      ...inputStyle,
                      ...(errors.fullName
                        ? { borderColor: "oklch(0.65 0.22 25 / 0.7)" }
                        : {}),
                    }}
                    {...register("fullName", {
                      required: "Full name is required",
                    })}
                  />
                  {errors.fullName && (
                    <p
                      className="mt-1.5 text-xs"
                      style={{ color: "oklch(0.7 0.18 25)" }}
                      data-ocid="appointment.name.field_error"
                    >
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="appt-phone"
                    className={labelClass}
                    style={{ color: "oklch(0.82 0.08 50)" }}
                  >
                    Phone Number{" "}
                    <span style={{ color: "oklch(0.72 0.1 52)" }}>*</span>
                  </label>
                  <input
                    id="appt-phone"
                    type="tel"
                    placeholder="Your mobile number"
                    data-ocid="appointment.phone_input"
                    className={`w-full px-4 py-3 rounded-xl font-body text-sm transition-smooth ${focusStyle}`}
                    style={{
                      ...inputStyle,
                      ...(errors.phone
                        ? { borderColor: "oklch(0.65 0.22 25 / 0.7)" }
                        : {}),
                    }}
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9+\-\s()]{7,15}$/,
                        message: "Enter a valid phone number",
                      },
                    })}
                  />
                  {errors.phone && (
                    <p
                      className="mt-1.5 text-xs"
                      style={{ color: "oklch(0.7 0.18 25)" }}
                      data-ocid="appointment.phone.field_error"
                    >
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="appt-email"
                    className={labelClass}
                    style={{ color: "oklch(0.82 0.08 50)" }}
                  >
                    Email Address{" "}
                    <span style={{ color: "oklch(0.55 0.06 48)" }}>
                      (optional)
                    </span>
                  </label>
                  <input
                    id="appt-email"
                    type="email"
                    placeholder="your@email.com"
                    data-ocid="appointment.email_input"
                    className={`w-full px-4 py-3 rounded-xl font-body text-sm transition-smooth ${focusStyle}`}
                    style={inputStyle}
                    {...register("email", {
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email",
                      },
                    })}
                  />
                  {errors.email && (
                    <p
                      className="mt-1.5 text-xs"
                      style={{ color: "oklch(0.7 0.18 25)" }}
                      data-ocid="appointment.email.field_error"
                    >
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Service Type */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="appt-service"
                    className={labelClass}
                    style={{ color: "oklch(0.82 0.08 50)" }}
                  >
                    Service Type{" "}
                    <span style={{ color: "oklch(0.72 0.1 52)" }}>*</span>
                  </label>
                  <select
                    id="appt-service"
                    data-ocid="appointment.service_select"
                    className={`w-full px-4 py-3 rounded-xl font-body text-sm transition-smooth ${focusStyle} appearance-none`}
                    style={{
                      ...inputStyle,
                      ...(errors.serviceType
                        ? { borderColor: "oklch(0.65 0.22 25 / 0.7)" }
                        : {}),
                    }}
                    {...register("serviceType", {
                      required: "Please select a service",
                    })}
                  >
                    <option
                      value=""
                      style={{ background: "oklch(0.22 0.06 42)" }}
                    >
                      Select a service…
                    </option>
                    {serviceOptions.map((s) => (
                      <option
                        key={s}
                        value={s}
                        style={{ background: "oklch(0.22 0.06 42)" }}
                      >
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.serviceType && (
                    <p
                      className="mt-1.5 text-xs"
                      style={{ color: "oklch(0.7 0.18 25)" }}
                      data-ocid="appointment.service.field_error"
                    >
                      {errors.serviceType.message}
                    </p>
                  )}
                </div>

                {/* Preferred Date */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="appt-date"
                    className={labelClass}
                    style={{ color: "oklch(0.82 0.08 50)" }}
                  >
                    Preferred Date{" "}
                    <span style={{ color: "oklch(0.72 0.1 52)" }}>*</span>
                  </label>
                  <input
                    id="appt-date"
                    type="date"
                    min={today}
                    data-ocid="appointment.date_input"
                    className={`w-full px-4 py-3 rounded-xl font-body text-sm transition-smooth ${focusStyle}`}
                    style={{
                      ...inputStyle,
                      colorScheme: "dark",
                      ...(errors.preferredDate
                        ? { borderColor: "oklch(0.65 0.22 25 / 0.7)" }
                        : {}),
                    }}
                    {...register("preferredDate", {
                      required: "Please select a date",
                    })}
                  />
                  {errors.preferredDate && (
                    <p
                      className="mt-1.5 text-xs"
                      style={{ color: "oklch(0.7 0.18 25)" }}
                      data-ocid="appointment.date.field_error"
                    >
                      {errors.preferredDate.message}
                    </p>
                  )}
                </div>

                {/* Preferred Time */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="appt-time"
                    className={labelClass}
                    style={{ color: "oklch(0.82 0.08 50)" }}
                  >
                    Preferred Time{" "}
                    <span style={{ color: "oklch(0.72 0.1 52)" }}>*</span>
                  </label>
                  <select
                    id="appt-time"
                    data-ocid="appointment.time_select"
                    className={`w-full px-4 py-3 rounded-xl font-body text-sm transition-smooth ${focusStyle} appearance-none`}
                    style={{
                      ...inputStyle,
                      ...(errors.preferredTime
                        ? { borderColor: "oklch(0.65 0.22 25 / 0.7)" }
                        : {}),
                    }}
                    {...register("preferredTime", {
                      required: "Please select a time slot",
                    })}
                  >
                    <option
                      value=""
                      style={{ background: "oklch(0.22 0.06 42)" }}
                    >
                      Select a time slot…
                    </option>
                    {timeOptions.map((t) => (
                      <option
                        key={t.value}
                        value={t.value}
                        style={{ background: "oklch(0.22 0.06 42)" }}
                      >
                        {t.label}
                      </option>
                    ))}
                  </select>
                  {errors.preferredTime && (
                    <p
                      className="mt-1.5 text-xs"
                      style={{ color: "oklch(0.7 0.18 25)" }}
                      data-ocid="appointment.time.field_error"
                    >
                      {errors.preferredTime.message}
                    </p>
                  )}
                </div>

                {/* Notes — full width */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="appt-notes"
                    className={labelClass}
                    style={{ color: "oklch(0.82 0.08 50)" }}
                  >
                    Occasion / Special Notes{" "}
                    <span style={{ color: "oklch(0.55 0.06 48)" }}>
                      (optional)
                    </span>
                  </label>
                  <textarea
                    id="appt-notes"
                    rows={4}
                    placeholder="Tell Unnati about your occasion, skin tone, inspirations, or any special requirements…"
                    data-ocid="appointment.notes_textarea"
                    className={`w-full px-4 py-3 rounded-xl font-body text-sm transition-smooth resize-none ${focusStyle}`}
                    style={inputStyle}
                    {...register("notes")}
                  />
                </div>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                data-ocid="appointment.submit_button"
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-base transition-smooth relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.55 0.12 48) 0%, oklch(0.45 0.13 44) 50%, oklch(0.38 0.11 42) 100%)",
                  color: "oklch(0.96 0.012 52)",
                  boxShadow:
                    "0 0 32px oklch(0.55 0.12 48 / 0.48), 0 4px 20px oklch(0.45 0.12 48 / 0.32)",
                  border: "1px solid oklch(0.65 0.1 52 / 0.35)",
                }}
              >
                {/* Shimmer overlay */}
                <span
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 30%, oklch(0.9 0.06 55 / 0.12) 50%, transparent 70%)",
                  }}
                />
                <SiWhatsapp className="w-5 h-5 relative z-10 flex-shrink-0" />
                <span className="relative z-10">
                  Send Booking Request via WhatsApp
                </span>
              </motion.button>
            </form>
          )}
        </motion.div>

        {/* Info strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
        >
          {infoStrip.map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-2.5 px-5 py-3 rounded-full text-sm font-body"
              style={{
                background: "oklch(0.38 0.08 46 / 0.60)",
                border: "1px solid oklch(0.62 0.08 50 / 0.28)",
                color: "oklch(0.78 0.07 50)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
            >
              <span className="text-base" aria-hidden="true">
                {item.icon}
              </span>
              <span>{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
