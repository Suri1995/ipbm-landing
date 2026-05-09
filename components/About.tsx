"use client";

import { useEffect, useRef, useState } from "react";

const pillars = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: "Industry-First Curriculum",
    description:
      "Built from scratch with CXOs and startup founders — every module tackles real business challenges from day one.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Founder Mentorship",
    description:
      "Direct access to active entrepreneurs, investors, and domain experts who mentor your growth personally.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "Career Launchpad",
    description:
      "Hands-on projects, live client briefs, and industry connections that turn learning into immediate opportunity.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Global Mindset",
    description:
      "International case studies, cross-border guest sessions, and a cohort of ambitious peers from across India.",
  },
];

const milestones = [
  { year: "May 2026", label: "IPBM founded in Hyderabad" },
  { year: "Jun 2026", label: "First cohort applications open" },
  { year: "Aug 2026", label: "Inaugural batch commences" },
  { year: "2027", label: "First placements & alumni network" },
];

const outcomes = [
  { label: "Curriculum Industry Alignment", value: 100 },
  { label: "Mentor Network Built", value: 80 },
  { label: "Corporate Partnerships Secured", value: 65 },
];

// ── Animated year counter ──────────────────────────────────────────────────
const AnimatedYear = () => {
  const [display, setDisplay] = useState("2026");
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            if (prefersReduced) { setDisplay("2026"); return; }
            const chars = ["2", "0", "2", "6"];
            let step = 0;
            const interval = setInterval(() => {
              const scrambled = chars
                .map((c, i) => (i <= step ? c : String(Math.floor(Math.random() * 10))))
                .join("");
              setDisplay(scrambled);
              step++;
              if (step >= chars.length) clearInterval(interval);
            }, 120);
          }
        });
      },
      { threshold: 0.3 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  return <span ref={elementRef}>{display}</span>;
};

// ── Animated counter ───────────────────────────────────────────────────────
const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true;
            if (prefersReduced) { setCount(target); return; }
            const duration = 1200;
            const startTime = performance.now();
            const tick = (now: number) => {
              const t = Math.min((now - startTime) / duration, 1);
              const ease = 1 - Math.pow(1 - t, 3);
              setCount(Math.round(ease * target));
              if (t < 1) requestAnimationFrame(tick);
              else setCount(target);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// ── Progress bar ───────────────────────────────────────────────────────────
const ProgressBar = ({
  label,
  value,
  delay,
  visible,
}: {
  label: string;
  value: number;
  delay: number;
  visible: boolean;
}) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = setTimeout(() => setWidth(value), prefersReduced ? 0 : delay);
    return () => clearTimeout(timer);
  }, [visible, value, delay]);

  return (
    <div
      className="mb-3 last:mb-0"
      role="meter"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${label} ${value}%`}
    >
      <div className="flex justify-between text-xs text-navy-500 mb-1.5">
        <span>{label}</span>
        <span className="font-semibold text-navy-700">{value}%</span>
      </div>
      <div className="h-1.5 bg-navy-100/60 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all ease-out"
          style={{
            width: `${width}%`,
            transitionDuration: "1300ms",
            background: "linear-gradient(90deg, #c6a43f, #2a4a72)",
          }}
          role="presentation"
        />
      </div>
    </div>
  );
};

// ── Main component ─────────────────────────────────────────────────────────
export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [sectionVisible, setSectionVisible] = useState(false);
  const [pillarsVisible, setPillarsVisible] = useState(false);
  const [progressVisible, setProgressVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const decorativeRef = useRef<HTMLDivElement>(null);

  const particles = [
  { id: 0, width: 2, height: 2, left: 5, top: 10, duration: 8, delay: 0 },
  { id: 1, width: 3, height: 3, left: 15, top: 20, duration: 10, delay: 1 },
  { id: 2, width: 2, height: 2, left: 25, top: 30, duration: 7, delay: 2 },
  { id: 3, width: 4, height: 4, left: 35, top: 40, duration: 9, delay: 1.5 },
  { id: 4, width: 3, height: 3, left: 45, top: 15, duration: 11, delay: 0.5 },
  { id: 5, width: 2, height: 2, left: 55, top: 60, duration: 6, delay: 3 },
  { id: 6, width: 4, height: 4, left: 65, top: 70, duration: 12, delay: 2.5 },
  { id: 7, width: 3, height: 3, left: 75, top: 25, duration: 8, delay: 1 },
  { id: 8, width: 2, height: 2, left: 85, top: 35, duration: 10, delay: 4 },
  { id: 9, width: 4, height: 4, left: 95, top: 45, duration: 7, delay: 0.8 },

  { id: 10, width: 2, height: 2, left: 8, top: 55, duration: 9, delay: 2 },
  { id: 11, width: 3, height: 3, left: 18, top: 65, duration: 11, delay: 1.2 },
  { id: 12, width: 4, height: 4, left: 28, top: 75, duration: 8, delay: 2.8 },
  { id: 13, width: 2, height: 2, left: 38, top: 85, duration: 10, delay: 3.5 },
  { id: 14, width: 3, height: 3, left: 48, top: 5, duration: 7, delay: 1.7 },
  { id: 15, width: 4, height: 4, left: 58, top: 18, duration: 12, delay: 0.3 },
  { id: 16, width: 2, height: 2, left: 68, top: 28, duration: 8, delay: 4.2 },
  { id: 17, width: 3, height: 3, left: 78, top: 38, duration: 9, delay: 2.3 },
  { id: 18, width: 2, height: 2, left: 88, top: 48, duration: 11, delay: 0.9 },
  { id: 19, width: 4, height: 4, left: 98, top: 58, duration: 10, delay: 1.4 },
];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setSectionVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!sectionVisible) return;
    const timer = setTimeout(() => setPillarsVisible(true), 200);
    return () => clearTimeout(timer);
  }, [sectionVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setProgressVisible(true); },
      { threshold: 0.2 }
    );
    if (progressRef.current) observer.observe(progressRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let raf: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (!decorativeRef.current) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = decorativeRef.current!.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", handleMouseMove); };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-labelledby="about-heading"
      className="py-7 sm:py-20 bg-cream relative overflow-hidden"
    >
      {/* ── Decorative background ── */}
      <div
        ref={decorativeRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.03] transition-all duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, #1a2a3a 0%, transparent 70%)`,
          }}
        />
        <div className="absolute inset-0">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full bg-gold-400/5"
              style={{
                width: `${p.width}px`,
                height: `${p.height}px`,
                left: `${p.left}%`,
                top: `${p.top}%`,
                animation: `floatDot ${p.duration}s ease-in-out infinite`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]" aria-hidden="true">
          <defs>
            <pattern id="diagonalLines" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <line x1="0" y1="40" x2="40" y2="0" stroke="#1a2a3a" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonalLines)" />
        </svg>
      </div>

      <div className="max-w-7xl px-4 mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-start">

          {/* ── LEFT COLUMN ── */}
          <div
            className={`transition-all duration-700 ${
              sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Founding badge */}
            <div className="inline-flex items-center gap-2 bg-gold-100/50 backdrop-blur-sm border border-gold-200 rounded-full px-3 py-1.5 mb-4 group hover:bg-gold-100 hover:border-gold-300 hover:-translate-y-0.5 transition-all duration-300 cursor-default">
              <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-pulse-ring" aria-hidden="true" />
              <span className="text-gold-700 text-xs font-medium tracking-wide">
                Founded May <AnimatedYear />
              </span>
            </div>

            {/* Section label */}
            <p className="text-gold-600 font-semibold text-sm tracking-widest uppercase mb-3 flex items-center gap-2">
              <span className="w-8 h-px bg-gold-400" aria-hidden="true" />
              Who We Are
            </p>

            {/* Heading */}
            <h2
              id="about-heading"
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-900 mb-5 sm:mb-6 leading-tight text-balance"
            >
              More Than an Institute —{" "}
              <span className="text-navy-600 relative inline-block group">
                A Launchpad
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-gold-500 to-gold-200 rounded-full transition-all duration-700 delay-300 ${
                    sectionVisible ? "w-full" : "w-0"
                  }`}
                  aria-hidden="true"
                />
              </span>
            </h2>

            {/* Body text */}
            <p className="text-navy-600 leading-relaxed mb-4 sm:mb-5 text-sm sm:text-base">
              Launched in <span className="font-semibold text-navy-800">May 2026</span>, the
              Institute of Practical Business Management is a bold new vision for management
              education in India. We were founded on one belief — that real business acumen is
              built through doing, not just listening. Every programme is a live laboratory of
              real-world challenges.
            </p>

            <p className="text-navy-600 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
              We&rsquo;re just getting started, and that&rsquo;s exactly the point. Our{" "}
              <span className="font-semibold text-navy-800">founding cohort</span> will shape the
              culture, curriculum, and community of IPBM — becoming the alumni our future students
              look up to across finance, marketing, operations, and entrepreneurship.
            </p>

            {/* Accreditation / status badges */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-8" role="list" aria-label="Institute status">
              {["Newly Launched", "AICTE Pending", "ISO Certified"].map((badge, idx) => (
                <span
                  key={badge}
                  role="listitem"
                  className="bg-navy-600 text-white px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 hover:bg-gold-600 hover:-translate-y-0.5 hover:shadow-md cursor-default group relative overflow-hidden"
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  <span className="relative z-10">{badge}</span>
                  <span
                    className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"
                    aria-hidden="true"
                  />
                </span>
              ))}
            </div>

            {/* Stats row */}
            <div className="pt-6 border-t border-navy-100/50 flex gap-6 mb-8">
              <div className="group cursor-default">
                <p className="text-2xl font-bold text-gold-600 relative inline-block">
                  <AnimatedCounter target={20} suffix="+" />
                  <span
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    aria-hidden="true"
                  />
                </p>
                <p className="text-navy-500 text-xs mt-1">Expert Faculty</p>
              </div>

              <div className="w-px bg-navy-100" aria-hidden="true" />

              <div className="group cursor-default">
                <p className="text-2xl font-bold text-gold-600 relative inline-block">
                  <AnimatedCounter target={30} suffix="+" />
                  <span
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    aria-hidden="true"
                  />
                </p>
                <p className="text-navy-500 text-xs mt-1">Industry Mentors</p>
              </div>

              <div className="w-px bg-navy-100" aria-hidden="true" />

              <div className="group cursor-default">
                <p className="text-2xl font-bold text-gold-600 relative inline-block">
                  <AnimatedCounter target={1} suffix="st" />
                  <span
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    aria-hidden="true"
                  />
                </p>
                <p className="text-navy-500 text-xs mt-1">Founding Cohort</p>
              </div>
            </div>

            {/* ── Launch Readiness progress bars ── */}
            <div
              ref={progressRef}
              className={`bg-white/70 backdrop-blur-sm border border-gold-200/50 rounded-xl p-4 sm:p-5 mb-6 transition-all duration-700 delay-100 ${
                sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              aria-label="Launch readiness"
            >
              <p className="text-xs font-semibold text-navy-600 uppercase tracking-widest mb-4">
                Launch Readiness
              </p>
              {outcomes.map((o, i) => (
                <ProgressBar
                  key={o.label}
                  label={o.label}
                  value={o.value}
                  delay={200 + i * 180}
                  visible={progressVisible}
                />
              ))}
            </div>

            {/* ── Journey timeline ── */}
            <div
              className={`border-l-2 border-gold-500 pl-4 transition-all duration-700 delay-200 ${
                sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              aria-label="Our journey so far"
            >
              <p className="text-xs font-semibold text-gold-700 uppercase tracking-widest mb-3">
                Our Journey
              </p>
              <ol className="space-y-2.5" role="list">
                {milestones.map((m, i) => (
                  <li
                    key={m.year}
                    className={`flex items-center gap-3 transition-all duration-500 ${
                      sectionVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                    }`}
                    style={{ transitionDelay: `${300 + i * 100}ms` }}
                  >
                    <span className="text-xs font-bold text-navy-800 w-16 shrink-0">{m.year}</span>
                    <span className="w-2 h-2 bg-gold-400 rounded-full shrink-0" aria-hidden="true" />
                    <span className="flex-1 h-px bg-gradient-to-r from-gold-300/50 to-transparent" aria-hidden="true" />
                    <span className="text-xs text-navy-500 text-right">{m.label}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* ── RIGHT COLUMN — Pillars + Testimonial ── */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-5">
              {pillars.map((p, i) => (
                <article
                  key={p.title}
                  tabIndex={0}
                  className={`group bg-white border border-navy-100 rounded-2xl p-5 sm:p-6 relative overflow-hidden cursor-default outline-none
                    transition-all duration-300
                    hover:shadow-card-hover hover:-translate-y-1 hover:border-gold-200/60
                    focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2
                    ${pillarsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                  style={{ transitionDelay: pillarsVisible ? `${i * 80}ms` : "0ms" }}
                  aria-label={p.title}
                >
                  {/* Hover gradient overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-gold-50/0 to-gold-50/0 group-hover:from-gold-50/40 group-hover:to-transparent transition-all duration-500"
                    aria-hidden="true"
                  />

                  {/* Corner fold accent */}
                  <div
                    className="absolute top-0 right-0 w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: "linear-gradient(135deg, transparent 50%, rgba(198,164,63,0.1) 50%)",
                      borderRadius: "0 16px 0 0",
                    }}
                    aria-hidden="true"
                  />

                  {/* Icon */}
                  <div className="relative mb-3">
                    <div
                      className="w-10 h-10 bg-gold-100 text-gold-600 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:bg-gold-500 group-hover:text-white group-hover:scale-110 group-hover:rotate-3 relative"
                      aria-hidden="true"
                    >
                      {p.icon}
                      <span
                        className="absolute -inset-1.5 border border-dashed border-gold-300 rounded-[14px] opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"
                        aria-hidden="true"
                      />
                    </div>
                    <span
                      className="absolute -top-1 -right-1 w-2 h-2 bg-gold-400 rounded-full border-2 border-white opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 delay-100"
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="font-display font-semibold text-navy-900 text-sm sm:text-base mb-2 relative inline-block">
                    {p.title}
                    <span
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-400 group-hover:w-full transition-all duration-300 origin-left"
                      aria-hidden="true"
                    />
                  </h3>

                  <p className="text-navy-500 text-xs sm:text-sm leading-relaxed relative z-10">
                    {p.description}
                  </p>

                  <div
                    className="mt-3 opacity-0 group-hover:opacity-100 translate-x-[-6px] group-hover:translate-x-0 transition-all duration-250"
                    aria-hidden="true"
                  >
                    <span className="text-gold-500 text-xs flex items-center gap-1">
                      Learn more
                      <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </article>
              ))}
            </div>

            {/* ── Founder's note ── */}
            <blockquote
              className={`bg-white border border-gold-200/40 rounded-2xl p-5 sm:p-6 relative transition-all duration-700 delay-500 ${
                pillarsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              aria-label="Founder's note"
            >
              {/* Decorative quote mark */}
              <span
                className="absolute top-3 left-4 text-5xl leading-none text-gold-300/40 font-serif select-none pointer-events-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              <p className="text-navy-600 text-sm sm:text-base leading-relaxed italic pl-5 relative z-10">
                We didn&rsquo;t build IPBM because another management institute was needed. We built it
                because a fundamentally different one was — one that treats students as professionals
                from day one and refuses to separate learning from doing.
              </p>

              <footer className="flex items-center gap-3 mt-4 pl-5">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ background: "linear-gradient(135deg, #1e3a5f, #c6a43f)" }}
                  aria-hidden="true"
                >
                  AK
                </div>
                <div>
                  <p className="text-xs font-semibold text-navy-800">Anil Kumar</p>
                  <p className="text-xs text-navy-500">Founder &amp; Director, IPBM</p>
                </div>
              </footer>
            </blockquote>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden lg:block" aria-hidden="true">
        <div className="flex flex-col items-center gap-1 opacity-30">
          <span className="text-navy-900 text-xs">Explore</span>
          <svg className="w-4 h-4 text-navy-900 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <style jsx global>{`
        @keyframes floatDot {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0; }
          50% { transform: translateY(-30px) translateX(15px); opacity: 1; }
        }
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(198, 164, 63, 0.5); }
          50% { box-shadow: 0 0 0 6px rgba(198, 164, 63, 0); }
          100% { box-shadow: 0 0 0 0 rgba(198, 164, 63, 0); }
        }
        .animate-pulse-ring {
          animation: pulse-ring 2.4s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse-ring,
          .animate-bounce {
            animation: none;
          }
          [style*="animation"] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}