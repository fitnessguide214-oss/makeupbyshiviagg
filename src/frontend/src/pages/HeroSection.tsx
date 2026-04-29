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
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1.5}>
      <Sphere ref={mesh} args={[1, 64, 64]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.6}
          transparent
          opacity={0.55}
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
    <Float speed={speed * 0.8} rotationIntensity={1} floatIntensity={2}>
      <Torus
        ref={mesh}
        args={[1, 0.35, 32, 64]}
        position={position}
        scale={scale}
      >
        <meshStandardMaterial
          color={color}
          roughness={0.05}
          metalness={0.8}
          transparent
          opacity={0.5}
          wireframe={false}
        />
      </Torus>
    </Float>
  );
}

function ParticleField() {
  const count = 220;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 28;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 16;
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
        size={0.06}
        color="#E8559A"
        transparent
        opacity={0.55}
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
      <sphereGeometry args={[0.12, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.2}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1.0} color="#FFE8F5" />
      <pointLight position={[6, 6, 4]} intensity={2.0} color="#FF69B4" />
      <pointLight position={[-6, -4, -4]} intensity={1.5} color="#FFB6D9" />
      <pointLight position={[0, 8, -6]} intensity={1.0} color="#FF1493" />

      <ParticleField />

      <AnimatedSphere
        position={[-4.5, 2, -3]}
        scale={1.4}
        color="#FF69B4"
        speed={0.8}
      />
      <AnimatedSphere
        position={[4.8, -1.5, -4]}
        scale={1.0}
        color="#FFB6D9"
        speed={0.6}
      />
      <AnimatedSphere
        position={[0.5, 3.5, -5]}
        scale={0.7}
        color="#FF1493"
        speed={1.1}
      />

      <AnimatedTorus
        position={[3.5, 2.5, -2]}
        scale={0.9}
        color="#FF69B4"
        speed={0.7}
      />
      <AnimatedTorus
        position={[-3.5, -1.5, -3]}
        scale={0.65}
        color="#FFB6D9"
        speed={0.9}
      />
      <AnimatedTorus
        position={[0, -3, -5]}
        scale={1.2}
        color="#FF8DC7"
        speed={0.5}
      />

      <RingOrbiter radius={3.5} speed={0.45} color="#FFB6D9" />
      <RingOrbiter radius={2.8} speed={0.7} color="#FF69B4" />
      <RingOrbiter radius={4.2} speed={0.3} color="#FFD6E8" />
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
        filter: `blur(${size * 0.45}px)`,
        opacity: 0.5,
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        scale: [1, 1.15, 1],
        opacity: [0.35, 0.65, 0.35],
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
          "linear-gradient(135deg, oklch(0.99 0.01 318) 0%, oklch(0.97 0.022 330) 50%, oklch(0.98 0.015 312) 100%)",
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

      {/* Soft overlay so 3D objects read on bright bg */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.98 0.015 325 / 0.18) 0%, oklch(0.98 0.01 320 / 0.45) 65%, oklch(0.99 0.006 318 / 0.78) 100%)",
        }}
      />

      {/* CSS glowing pink orbs */}
      <FloatingOrb
        delay={0}
        size={380}
        top="3%"
        left="2%"
        color="radial-gradient(circle, oklch(0.72 0.22 330 / 0.55), oklch(0.85 0.12 330 / 0.22))"
      />
      <FloatingOrb
        delay={1.8}
        size={240}
        top="58%"
        left="0%"
        color="radial-gradient(circle, oklch(0.68 0.24 338 / 0.5), oklch(0.82 0.14 330 / 0.18))"
      />
      <FloatingOrb
        delay={0.9}
        size={300}
        top="12%"
        left="70%"
        color="radial-gradient(circle, oklch(0.70 0.22 322 / 0.48), oklch(0.84 0.10 325 / 0.2))"
      />
      <FloatingOrb
        delay={2.2}
        size={200}
        top="70%"
        left="76%"
        color="radial-gradient(circle, oklch(0.76 0.18 342 / 0.45), oklch(0.88 0.08 340 / 0.2))"
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/75 border border-primary/35 mb-6 backdrop-blur-sm shadow-glow-sm"
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/85 border border-primary/30 backdrop-blur-sm mb-8"
              style={{ boxShadow: "0 2px 20px oklch(0.52 0.24 335 / 0.18)" }}
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
                    "0 0 28px oklch(0.52 0.24 335 / 0.45), 0 4px 18px oklch(0.52 0.24 335 / 0.28)",
                }}
              >
                <span className="relative z-10">Book Your Bridal Look</span>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-smooth" />
              </a>
              <button
                type="button"
                data-ocid="hero-cta-portfolio"
                onClick={() =>
                  document
                    .querySelector("#portfolio")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-4 rounded-full border border-primary/40 text-primary font-semibold text-base hover:bg-primary/10 transition-smooth backdrop-blur-sm bg-white/60"
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
            {/* Background pink glow blob */}
            <div
              className="absolute inset-0 rounded-full blur-3xl scale-75"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.72 0.22 330 / 0.5) 0%, oklch(0.88 0.10 330 / 0.2) 70%, transparent 100%)",
              }}
            />

            {/* Main photo frame */}
            <div
              className="relative w-80 h-[420px] sm:w-96 sm:h-[500px] rounded-3xl overflow-hidden float-animation"
              style={{
                border: "1.5px solid oklch(0.52 0.24 335 / 0.4)",
                boxShadow:
                  "0 0 45px oklch(0.52 0.24 335 / 0.3), 0 0 90px oklch(0.65 0.18 335 / 0.15), inset 0 0 25px oklch(0.52 0.24 335 / 0.05)",
              }}
            >
              <img
                src="/assets/photos/beautygram-01.png"
                alt="BEAUTYGRAM BY UNNATI GANDHINAGAR — Luxury Bridal Makeup Artist"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-50/50 via-transparent to-transparent" />

              {/* Card overlay at bottom */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.0, type: "spring" }}
                className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-2xl px-4 py-3"
                style={{
                  border: "1px solid oklch(0.52 0.24 335 / 0.3)",
                  boxShadow: "0 4px 20px oklch(0.52 0.24 335 / 0.18)",
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
              className="absolute -right-4 top-16 bg-white/92 backdrop-blur-md rounded-2xl px-4 py-3"
              style={{
                border: "1px solid oklch(0.52 0.24 335 / 0.3)",
                boxShadow: "0 0 20px oklch(0.52 0.24 335 / 0.22)",
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
              className="absolute -left-4 bottom-28 bg-white/92 backdrop-blur-md rounded-2xl px-4 py-3"
              style={{
                border: "1px solid oklch(0.75 0.12 340 / 0.4)",
                boxShadow: "0 0 18px oklch(0.65 0.18 340 / 0.22)",
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
              style={{ border: "2px dashed oklch(0.52 0.24 335 / 0.4)" }}
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
