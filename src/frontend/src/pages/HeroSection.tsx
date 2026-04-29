import { Float, MeshDistortMaterial, Sphere, Torus } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Award, ChevronDown, Heart, Sparkles, Star } from "lucide-react";
import { motion } from "motion/react";
import { Suspense, useMemo, useRef } from "react";
import type { Mesh as ThreeMesh, Points as ThreePoints } from "three";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

// ─── 3D Scene Objects ────────────────────────────────────────────────────────

function AnimatedSphere({
  position,
  scale,
  color,
  speed,
}: {
  position: [number, number, number];
  scale: number;
  color: string;
  speed: number;
}) {
  const mesh = useRef<ThreeMesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
    mesh.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
  });
  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1.8}>
      <Sphere ref={mesh} args={[1, 64, 64]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.45}
          speed={2.2}
          roughness={0.08}
          metalness={0.75}
          transparent
          opacity={0.6}
        />
      </Sphere>
    </Float>
  );
}

function AnimatedTorus({
  position,
  scale,
  color,
  speed,
}: {
  position: [number, number, number];
  scale: number;
  color: string;
  speed: number;
}) {
  const mesh = useRef<ThreeMesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = state.clock.elapsedTime * speed * 0.4;
    mesh.current.rotation.y = state.clock.elapsedTime * speed * 0.6;
    mesh.current.rotation.z = state.clock.elapsedTime * speed * 0.2;
  });
  return (
    <Float speed={speed * 0.8} rotationIntensity={1.2} floatIntensity={2.2}>
      <Torus
        ref={mesh}
        args={[1, 0.35, 32, 64]}
        position={position}
        scale={scale}
      >
        <meshStandardMaterial
          color={color}
          roughness={0.04}
          metalness={0.9}
          transparent
          opacity={0.55}
          wireframe={false}
        />
      </Torus>
    </Float>
  );
}

function ParticleField() {
  const count = 320;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 18;
    }
    return arr;
  }, []);

  const particlesRef = useRef<ThreePoints>(null);
  useFrame((state) => {
    if (!particlesRef.current) return;
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    particlesRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        color="#C49A6C"
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  );
}

function RingOrbiter({
  radius,
  speed,
  color,
}: { radius: number; speed: number; color: string }) {
  const mesh = useRef<ThreeMesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime * speed;
    mesh.current.position.x = Math.cos(t) * radius;
    mesh.current.position.y = Math.sin(t * 0.7) * (radius * 0.4);
    mesh.current.position.z = Math.sin(t) * radius * 0.5;
  });
  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[0.14, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.5}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      {/* Warm ambient + golden-brown point lights */}
      <ambientLight intensity={1.1} color="#FFF8F0" />
      <pointLight position={[6, 6, 4]} intensity={2.2} color="#D4AA7D" />
      <pointLight position={[-6, -4, -4]} intensity={1.6} color="#8B5E3C" />
      <pointLight position={[0, 8, -6]} intensity={1.2} color="#C49A6C" />

      <ParticleField />

      {/* Caramel / brown / gold spheres */}
      <AnimatedSphere
        position={[-4.5, 2, -3]}
        scale={1.5}
        color="#C49A6C"
        speed={0.8}
      />
      <AnimatedSphere
        position={[4.8, -1.5, -4]}
        scale={1.1}
        color="#8B5E3C"
        speed={0.6}
      />
      <AnimatedSphere
        position={[0.5, 3.5, -5]}
        scale={0.75}
        color="#6B4226"
        speed={1.1}
      />
      <AnimatedSphere
        position={[-2.2, -2.8, -6]}
        scale={0.6}
        color="#D4AA7D"
        speed={0.9}
      />

      {/* Warm brown toruses */}
      <AnimatedTorus
        position={[3.5, 2.5, -2]}
        scale={1.0}
        color="#B8875A"
        speed={0.7}
      />
      <AnimatedTorus
        position={[-3.5, -1.5, -3]}
        scale={0.7}
        color="#A0714A"
        speed={0.9}
      />
      <AnimatedTorus
        position={[0, -3, -5]}
        scale={1.3}
        color="#C49A6C"
        speed={0.5}
      />

      {/* Golden orbiters */}
      <RingOrbiter radius={3.5} speed={0.45} color="#D4AA7D" />
      <RingOrbiter radius={2.8} speed={0.7} color="#C49A6C" />
      <RingOrbiter radius={4.2} speed={0.3} color="#E8D5B0" />
    </>
  );
}

// ─── Floating Orbs (CSS) ─────────────────────────────────────────────────────

function FloatingOrb({
  delay,
  size,
  top,
  left,
  color,
}: {
  delay: number;
  size: number;
  top: string;
  left: string;
  color: string;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        top,
        left,
        background: color,
        filter: `blur(${size * 0.5}px)`,
        opacity: 0.55,
      }}
      animate={{
        y: [0, -35, 0],
        x: [0, 18, 0],
        scale: [1, 1.18, 1],
        opacity: [0.38, 0.68, 0.38],
      }}
      transition={{
        duration: 7 + delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

// ─── Constants ───────────────────────────────────────────────────────────────

const achievements = [
  { number: "500+", label: "Bridal Looks" },
  { number: "15+", label: "Celebrity Clients" },
  { number: "8+", label: "Years Experience" },
  { number: "100%", label: "Satisfaction" },
];

const STARS = ["s1", "s2", "s3", "s4", "s5"];

// ─── Hero Section ─────────────────────────────────────────────────────────────

export function HeroSection() {
  const { ref, isInView } = useScrollAnimation(0.05);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.97 0.018 58) 0%, oklch(0.95 0.025 50) 50%, oklch(0.96 0.020 45) 100%)",
      }}
    >
      {/* React Three Fiber 3D Canvas — full background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 65 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Soft warm beige overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.96 0.018 55 / 0.16) 0%, oklch(0.95 0.022 50 / 0.42) 65%, oklch(0.96 0.014 48 / 0.75) 100%)",
        }}
      />

      {/* CSS glowing warm caramel/brown orbs */}
      <FloatingOrb
        delay={0}
        size={420}
        top="3%"
        left="2%"
        color="radial-gradient(circle, oklch(0.65 0.14 52 / 0.52), oklch(0.78 0.09 55 / 0.22))"
      />
      <FloatingOrb
        delay={1.8}
        size={260}
        top="58%"
        left="0%"
        color="radial-gradient(circle, oklch(0.55 0.12 48 / 0.45), oklch(0.70 0.08 52 / 0.18))"
      />
      <FloatingOrb
        delay={0.9}
        size={320}
        top="12%"
        left="70%"
        color="radial-gradient(circle, oklch(0.62 0.13 50 / 0.44), oklch(0.76 0.08 55 / 0.20))"
      />
      <FloatingOrb
        delay={2.2}
        size={220}
        top="70%"
        left="76%"
        color="radial-gradient(circle, oklch(0.70 0.11 54 / 0.40), oklch(0.82 0.07 56 / 0.18))"
      />

      {/* Extra large deep glow blob — center */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 50% 50%, oklch(0.62 0.12 50 / 0.12) 0%, transparent 70%)",
        }}
      />

      {/* Floating decorative CSS shapes */}
      <motion.div
        className="absolute top-24 right-24 w-7 h-7 border border-primary/50 rotate-45 z-[2]"
        animate={{ rotate: [45, 90, 45], y: [0, -20, 0] }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-44 left-36 w-5 h-5 bg-primary/30 rounded-full z-[2]"
        animate={{ y: [0, -15, 0], scale: [1, 1.4, 1] }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.6,
        }}
      />
      <motion.div
        className="absolute bottom-44 right-44 w-9 h-9 border-2 border-primary/35 rounded-full z-[2]"
        animate={{ rotate: [0, 360] }}
        transition={{
          duration: 14,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute top-1/3 left-16 w-3 h-3 bg-primary/50 rounded-full z-[2]"
        animate={{ y: [0, 20, 0], opacity: [0.4, 1, 0.4] }}
        transition={{
          duration: 3.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Main Content */}
      <div
        ref={ref}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm mb-6 shadow-glow-sm"
              style={{
                background: "oklch(0.96 0.014 55 / 0.80)",
                border: "1px solid oklch(0.70 0.10 50 / 0.38)",
              }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-medium font-body">
                Luxury Bridal & Celebrity Makeup
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 36 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.1 }}
              className="font-display text-5xl sm:text-6xl xl:text-7xl font-bold leading-[1.05] mb-6"
            >
              <span className="text-foreground">Creating</span>
              <br />
              <span className="text-primary glow-text">Ethereal</span>
              <br />
              <span className="text-foreground">Beauty</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.22 }}
              className="text-muted-foreground text-base leading-relaxed mb-3 max-w-md font-body"
            >
              Bridal Makeup Artist · Celebrity Makeup Artist · HD Makeup
              Specialist
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.32 }}
              className="text-muted-foreground text-lg leading-relaxed mb-9 max-w-md font-body"
            >
              Premium bridal, editorial, and celebrity makeup artistry. Every
              brushstroke tells your story — timeless, luminous, unforgettably
              you.
            </motion.p>

            {/* Stars badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.38 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm mb-8"
              style={{
                background: "oklch(0.96 0.014 55 / 0.88)",
                border: "1px solid oklch(0.70 0.10 50 / 0.32)",
                boxShadow: "0 2px 20px oklch(0.52 0.12 48 / 0.20)",
              }}
            >
              <div className="flex">
                {STARS.map((id) => (
                  <Star
                    key={id}
                    className="w-3.5 h-3.5 text-primary fill-primary"
                  />
                ))}
              </div>
              <span className="text-foreground text-xs font-semibold font-body">
                200+ Brides Transformed &nbsp;|&nbsp; 15+ Celebrity Projects
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.46 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <a
                data-ocid="hero-cta-book"
                href="tel:07041937373"
                className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-base transition-smooth relative overflow-hidden group"
                style={{
                  boxShadow:
                    "0 0 32px oklch(0.45 0.12 48 / 0.5), 0 4px 20px oklch(0.45 0.12 48 / 0.30)",
                }}
              >
                <span className="relative z-10">Book Your Bridal Look</span>
                <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-smooth" />
              </a>
              <button
                type="button"
                data-ocid="hero-cta-portfolio"
                onClick={() =>
                  document
                    .querySelector("#portfolio")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-4 rounded-full font-semibold text-base transition-smooth backdrop-blur-sm"
                style={{
                  border: "1px solid oklch(0.55 0.10 50 / 0.45)",
                  color: "oklch(0.45 0.12 48)",
                  background: "oklch(0.96 0.014 55 / 0.65)",
                }}
              >
                View Portfolio
              </button>
            </motion.div>

            {/* Stats grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.56 }}
              className="grid grid-cols-4 gap-6"
            >
              {achievements.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-2xl sm:text-3xl font-bold text-primary glow-text">
                    {stat.number}
                  </p>
                  <p className="text-muted-foreground text-xs font-body mt-1 leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Hero photo with glowing frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, x: 50 }}
            animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
            transition={{
              duration: 1.1,
              delay: 0.18,
              type: "spring",
              stiffness: 60,
            }}
            className="relative flex justify-center"
          >
            {/* Background warm brown glow blob */}
            <div
              className="absolute inset-0 rounded-full blur-3xl scale-75"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.62 0.13 50 / 0.5) 0%, oklch(0.78 0.08 55 / 0.22) 70%, transparent 100%)",
              }}
            />

            {/* Outer glow ring */}
            <div
              className="absolute inset-[-12px] rounded-3xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse, oklch(0.58 0.12 50 / 0.20) 0%, transparent 70%)",
                filter: "blur(20px)",
              }}
            />

            {/* Main photo frame */}
            <div
              className="relative w-80 h-[420px] sm:w-96 sm:h-[500px] rounded-3xl overflow-hidden float-animation"
              style={{
                border: "1.5px solid oklch(0.55 0.12 50 / 0.45)",
                boxShadow:
                  "0 0 50px oklch(0.52 0.12 48 / 0.32), 0 0 100px oklch(0.62 0.10 52 / 0.16), inset 0 0 28px oklch(0.55 0.10 50 / 0.07)",
              }}
            >
              <img
                src="/assets/photos/beautygram-01.png"
                alt="BEAUTYGRAM BY UNNATI GANDHINAGAR — Luxury Bridal Makeup Artist"
                className="w-full h-full object-cover object-top"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, oklch(0.88 0.04 52 / 0.55), transparent 60%)",
                }}
              />

              {/* Card overlay at bottom */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.0, type: "spring" }}
                className="absolute bottom-4 left-4 right-4 backdrop-blur-md rounded-2xl px-4 py-3"
                style={{
                  background: "oklch(0.96 0.014 55 / 0.92)",
                  border: "1px solid oklch(0.65 0.10 50 / 0.32)",
                  boxShadow: "0 4px 20px oklch(0.45 0.12 48 / 0.20)",
                }}
              >
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-foreground text-sm font-semibold font-body">
                      Celebrity Makeup Artist
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Gandhinagar, Gujarat · Est. 2015
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Floating badge — top right */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute -right-4 top-16 backdrop-blur-md rounded-2xl px-4 py-3"
              style={{
                background: "oklch(0.96 0.014 55 / 0.92)",
                border: "1px solid oklch(0.65 0.10 50 / 0.32)",
                boxShadow: "0 0 22px oklch(0.52 0.12 48 / 0.25)",
              }}
            >
              <div className="flex items-center gap-2">
                <div className="flex">
                  {STARS.map((id) => (
                    <Star
                      key={id}
                      className="w-3 h-3 text-primary fill-primary"
                    />
                  ))}
                </div>
                <span className="text-foreground text-xs font-semibold">
                  500+ Brides
                </span>
              </div>
            </motion.div>

            {/* Floating badge — bottom left */}
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1.2,
              }}
              className="absolute -left-4 bottom-28 backdrop-blur-md rounded-2xl px-4 py-3"
              style={{
                background: "oklch(0.96 0.014 55 / 0.92)",
                border: "1px solid oklch(0.72 0.10 52 / 0.42)",
                boxShadow: "0 0 20px oklch(0.60 0.11 50 / 0.25)",
              }}
            >
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-primary fill-primary" />
                <span className="text-foreground text-xs font-semibold">
                  Celebrity Trusted
                </span>
              </div>
            </motion.div>

            {/* Rotating ring decoration */}
            <motion.div
              className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full pointer-events-none"
              style={{ border: "2px dashed oklch(0.52 0.12 48 / 0.42)" }}
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: 16,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 cursor-pointer bg-transparent border-0 p-0"
        animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        onClick={() =>
          document
            .querySelector("#services")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        data-ocid="hero-scroll-indicator"
        aria-label="Scroll to next section"
      >
        <span className="text-muted-foreground text-xs font-body tracking-widest uppercase">
          Scroll
        </span>
        <ChevronDown className="w-5 h-5 text-primary" />
      </motion.button>
    </section>
  );
}
