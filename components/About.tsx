"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

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

// Updated pillars based on brochure content
const pillars = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "20 Essential Topics",
    description:
      "Comprehensive coverage across Business Foundations, Sales & Marketing, Tech & Analytics, People & Communication, and more — all taught by active industry experts.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: "45-Day Intensive",
    description:
      "3 hours per day of immersive, practice-first learning. Zero textbooks — only case studies and current reality. Online & offline modes available.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Industry Expert Faculty",
    description:
      "Every session is led by current practitioners — not academic theorists. Learn directly from those who are building and running businesses today.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Certification of Completion",
    description:
      "Receive a recognized certification after completing the program — proof of your hands-on capability to manage across all key business departments.",
  },
];

// Milestones based on brochure timeline
const milestones = [
  { year: "May 2026", label: "IPBM founded in Hyderabad" },
  { year: "4th June 2026", label: "Program launch — applications open" },
  { year: "July 2026", label: "First cohort commences" },
  { year: "Aug/Sep 2026", label: "45-day intensive program completion" },
];

// Outcomes / progress indicators
const outcomes = [
  { label: "Topics Curriculum Finalized", value: 100 },
  { label: "Industry Expert Faculty Onboarded", value: 85 },
  { label: "Corporate Partnerships Secured", value: 70 },
];

// Topic categories from brochure
const topicCategories = [
  { name: "Business Foundations", topics: ["Startup Management", "Financial Management", "Risk Management", "Project Management", "Operations Management", "Family Business Management"] },
  { name: "Sales & Marketing", topics: ["Sales & Marketing Management", "E-Commerce & Digital Marketing", "Business Networking", "Brand Management", "Market Research"] },
  { name: "Tech & Analytics", topics: ["Data Analytics", "Optimum Utilization of AI", "Productivity in Business Management"] },
  { name: "People & Communication", topics: ["HR Management", "Public Speaking", "Time & Stress Management", "Business Communication"] },
  { name: "Other Topics", topics: ["International Business", "Event Management", "Logistics & Supply Chain"] },
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
            background: "linear-gradient(90deg, #eb4800, #044dd4)",
          }}
          role="presentation"
        />
      </div>
    </div>
  );
};

// ── Topics Accordion Component ────────────────────────────────────────────
const TopicsAccordion = ({ visible }: { visible: boolean }) => {
  const [openCategory, setOpenCategory] = useState<string | null>("Business Foundations");

  return (
    <div
      className={`mt-6 bg-white/70 backdrop-blur-sm rounded-xl p-4 sm:p-5 transition-all duration-700 delay-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ border: "1px solid rgba(4, 77, 212, 0.15)" }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: "#044dd4" }}>
          📚 20 Topics Covered
        </span>
        <span className="text-xs text-navy-400">— All taught by industry experts</span>
      </div>

      <div className="space-y-2">
        {topicCategories.map((category) => (
          <div key={category.name} className="border border-navy-100 rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenCategory(openCategory === category.name ? null : category.name)}
              className="w-full flex justify-between items-center p-3 text-left bg-white/50 hover:bg-white/80 transition-colors duration-200"
              aria-expanded={openCategory === category.name}
            >
              <span className="font-semibold text-navy-800 text-sm">{category.name}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${openCategory === category.name ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: "#eb4800" }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openCategory === category.name ? "max-h-96" : "max-h-0"
              }`}
            >
              <div className="p-3 pt-0 bg-white/30">
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {category.topics.map((topic) => (
                    <span
                      key={topic}
                      className="inline-block px-2 py-1 text-xs rounded-full"
                      style={{ backgroundColor: "rgba(4, 77, 212, 0.08)", color: "#044dd4" }}
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-navy-100 flex items-center justify-between">
        <span className="text-xs text-navy-500">🎯 Zero Textbooks — 100% Case Study Based</span>
        <span className="text-xs font-semibold" style={{ color: "#eb4800" }}>3 Hours/Day · 45 Days</span>
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
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const decorativeRef = useRef<HTMLDivElement>(null);

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
            background: mousePosition
              ? `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, #1a2a3a 0%, transparent 70%)`
              : "transparent",
          }}
        />
        <div className="absolute inset-0">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full"
              style={{
                width: `${p.width}px`,
                height: `${p.height}px`,
                left: `${p.left}%`,
                top: `${p.top}%`,
                backgroundColor: "rgba(4, 77, 212, 0.05)",
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
            <div
              className="inline-flex items-center gap-2 backdrop-blur-sm border rounded-full px-3 py-1.5 mb-4 group hover:-translate-y-0.5 transition-all duration-300 cursor-default"
              style={{
                backgroundColor: "rgba(235, 72, 0, 0.06)",
                borderColor: "rgba(235, 72, 0, 0.25)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse-ring"
                style={{ backgroundColor: "#eb4800" }}
                aria-hidden="true"
              />
              <span className="text-xs font-medium tracking-wide" style={{ color: "#eb4800" }}>
                Founded May <AnimatedYear /> · Launching 4th June 2026
              </span>
            </div>

            {/* Section label */}
            <p
              className="font-semibold text-sm tracking-widest uppercase mb-3 flex items-center gap-2"
              style={{ color: "#044dd4" }}
            >
              <span className="w-8 h-px" style={{ backgroundColor: "#044dd4" }} aria-hidden="true" />
              Where Business Theory Meets Reality
            </p>

            {/* Heading */}
            <h2
              id="about-heading"
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-900 mb-5 sm:mb-6 leading-tight text-balance"
            >
              Institute of{" "}
              <span className="text-navy-600 relative inline-block group">
                Practical Business Management
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 rounded-full transition-all duration-700 delay-300 ${
                    sectionVisible ? "w-full" : "w-0"
                  }`}
                  style={{ background: "linear-gradient(to right, #eb4800, rgba(235,72,0,0.2))" }}
                  aria-hidden="true"
                />
              </span>
            </h2>

            {/* Body text based on brochure */}
            <p className="text-navy-600 leading-relaxed mb-4 sm:mb-5 text-sm sm:text-base">
              Launched in <span className="font-semibold text-navy-800">May 2026</span>, the
              Institute of Practical Business Management (IPBM) is a bold new vision for management
              education in India. We were founded on one belief — that real business acumen is
              built through <span className="italic">doing</span>, not just listening.
            </p>

            <p className="text-navy-600 leading-relaxed mb-4 sm:mb-5 text-sm sm:text-base">
              Our <span className="font-semibold">45-day intensive program</span> runs <span className="font-semibold">3 hours daily</span>,
              covering <span className="font-semibold">20 essential business topics</span> — all taught exclusively by{" "}
              <span className="font-semibold">active industry experts</span>, not academic theorists.
              <span className="block mt-2 text-xs text-navy-500">✨ Zero textbooks. Only case studies and current reality.</span>
            </p>

            <p className="text-navy-600 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
              We&apos;re just getting started, and that&apos;s exactly the point. Our{" "}
              <span className="font-semibold text-navy-800">founding cohort</span> will shape the
              culture, curriculum, and community of IPBM — becoming the alumni our future students
              look up to across finance, marketing, operations, and entrepreneurship.
            </p>

            {/* Accreditation / status badges */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-8" role="list" aria-label="Institute status">
              {["Newly Launched", "Online & Offline Modes", "Certification Program"].map((badge, idx) => (
                <span
                  key={badge}
                  role="listitem"
                  className="text-white px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md cursor-default group relative overflow-hidden"
                  style={{
                    backgroundColor: "#044dd4",
                    transitionDelay: `${idx * 50}ms`,
                  }}
                >
                  <span className="relative z-10">{badge}</span>
                  <span
                    className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"
                    aria-hidden="true"
                  />
                </span>
              ))}
            </div>

            {/* Stats row - updated from brochure */}
            <div className="pt-6 border-t border-navy-100/50 flex flex-wrap gap-4 sm:gap-6 mb-8">
              <div className="group cursor-default">
                <p className="text-2xl font-bold relative inline-block" style={{ color: "#eb4800" }}>
                  <AnimatedCounter target={45} suffix=" Days" />
                  <span
                    className="absolute -bottom-1 left-0 w-full h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ backgroundColor: "#eb4800" }}
                    aria-hidden="true"
                  />
                </p>
                <p className="text-navy-500 text-xs mt-1">Intensive Program</p>
              </div>

              <div className="w-px bg-navy-100" aria-hidden="true" />

              <div className="group cursor-default">
                <p className="text-2xl font-bold relative inline-block" style={{ color: "#eb4800" }}>
                  <AnimatedCounter target={20} suffix=" Topics" />
                  <span
                    className="absolute -bottom-1 left-0 w-full h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ backgroundColor: "#eb4800" }}
                    aria-hidden="true"
                  />
                </p>
                <p className="text-navy-500 text-xs mt-1">Comprehensive Coverage</p>
              </div>

              <div className="w-px bg-navy-100" aria-hidden="true" />

              <div className="group cursor-default">
                <p className="text-2xl font-bold relative inline-block" style={{ color: "#eb4800" }}>
                  <AnimatedCounter target={100} suffix="%" />
                  <span
                    className="absolute -bottom-1 left-0 w-full h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ backgroundColor: "#eb4800" }}
                    aria-hidden="true"
                  />
                </p>
                <p className="text-navy-500 text-xs mt-1">Industry Expert Faculty</p>
              </div>
            </div>

            {/* ── Launch Readiness progress bars ── */}
            <div
              ref={progressRef}
              className={`bg-white/70 backdrop-blur-sm rounded-xl p-4 sm:p-5 mb-6 transition-all duration-700 delay-100 ${
                sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ border: "1px solid rgba(4, 77, 212, 0.15)" }}
              aria-label="Program readiness"
            >
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "#044dd4" }}
              >
                Program Readiness
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
              className={`pl-4 transition-all duration-700 delay-200 ${
                sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ borderLeft: "2px solid #044dd4" }}
              aria-label="Our journey so far"
            >
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "#044dd4" }}
              >
                Program Timeline
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
                    <span className="text-xs font-bold text-navy-800 w-20 shrink-0">{m.year}</span>
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: "#eb4800" }}
                      aria-hidden="true"
                    />
                    <span
                      className="flex-1 h-px"
                      style={{ background: "linear-gradient(to right, rgba(4,77,212,0.25), transparent)" }}
                      aria-hidden="true"
                    />
                    <span className="text-xs text-navy-500 text-right">{m.label}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Added association line here */}
  <div className="text-2xl text-[#eb4800] mt-10 flex items-center gap-3 font-bold">
  Associated with

  {/* BMRB Association Logo */}
  <div className="">
    
    {/* Logo Image */}
    <Image
      src="/bmrb-logo.avif"
      alt="BMRB Logo"
      width={100}
      height={40}
      className="w-25 h-10"
    />
  </div>
</div>
          </div>

          {/* ── RIGHT COLUMN — Pillars + Topics Accordion ── */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-5">
              {pillars.map((p, i) => (
                <article
                  key={p.title}
                  tabIndex={0}
                  className={`group bg-white border border-navy-100 rounded-2xl p-5 sm:p-6 relative overflow-hidden cursor-default outline-none
                    transition-all duration-300
                    hover:shadow-card-hover hover:-translate-y-1
                    focus-visible:ring-2 focus-visible:ring-offset-2
                    ${pillarsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                  style={{
                    transitionDelay: pillarsVisible ? `${i * 80}ms` : "0ms",
                  }}
                  aria-label={p.title}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(4, 77, 212, 0.25)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "";
                  }}
                >
                  {/* Hover gradient overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                    style={{ background: "linear-gradient(135deg, rgba(4,77,212,0.03), transparent)" }}
                    aria-hidden="true"
                  />

                  {/* Corner fold accent */}
                  <div
                    className="absolute top-0 right-0 w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: "linear-gradient(135deg, transparent 50%, rgba(4,77,212,0.08) 50%)",
                      borderRadius: "0 16px 0 0",
                    }}
                    aria-hidden="true"
                  />

                  {/* Icon */}
                  <div className="relative mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 relative"
                      style={{
                        backgroundColor: "rgba(4, 77, 212, 0.08)",
                        color: "#044dd4",
                      }}
                      aria-hidden="true"
                    >
                      {p.icon}
                      <span
                        className="absolute -inset-1.5 border border-dashed rounded-[14px] opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"
                        style={{ borderColor: "rgba(4,77,212,0.35)" }}
                        aria-hidden="true"
                      />
                    </div>
                    <span
                      className="absolute -top-1 -right-1 w-2 h-2 rounded-full border-2 border-white opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 delay-100"
                      style={{ backgroundColor: "#eb4800" }}
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="font-display font-semibold text-navy-900 text-sm sm:text-base mb-2 relative inline-block">
                    {p.title}
                    <span
                      className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 origin-left"
                      style={{ backgroundColor: "#044dd4" }}
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
                    <span className="text-xs flex items-center gap-1" style={{ color: "#eb4800" }}>
                      Learn more
                      <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </article>
              ))}
            </div>

            {/* Topics Accordion - showing all 20 topics from brochure */}
            <TopicsAccordion visible={pillarsVisible} />

            {/* Program Fee & Contact */}
<div
  className={`mt-5 bg-gradient-to-r from-white to-navy-50/30 rounded-xl p-4 sm:p-5 transition-all duration-700 delay-500 ${
    pillarsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
  }`}
  style={{ border: "1px solid rgba(235, 72, 0, 0.2)" }}
>
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
    <div>
      <p className="text-xs text-navy-500">Program Fee</p>
      <p className="text-xl font-bold" style={{ color: "#eb4800" }}>₹50,000 + GST</p>
      <p className="text-xs text-navy-400 mt-1">EMI options available</p>
      <p className="text-xs font-semibold mt-2" style={{ color: "#044dd4" }}>
        💡 Less than ₹1,200/- per day for Expert-led Learning
      </p>
    </div>
    <div className="flex gap-3">
      <a
        href="tel:9704859888"
        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all hover:-translate-y-0.5"
        style={{ backgroundColor: "rgba(4, 77, 212, 0.1)", color: "#044dd4" }}
      >
        📞 9704859888
      </a>
      <a
        href="tel:9866739499"
        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all hover:-translate-y-0.5"
        style={{ backgroundColor: "rgba(4, 77, 212, 0.1)", color: "#044dd4" }}
      >
        📞 9866739499
      </a>
    </div>
  </div>
  <p className="text-xs text-navy-400 mt-3 pt-2 border-t border-navy-100">
    📍 IPBM, Brand Market Research Bureau, Raghavendra Nagar Colony, Uppal, Hyderabad - 500039
  </p>
  
</div>

            {/* Founder's note */}
            <blockquote
              className={`bg-white rounded-2xl p-5 sm:p-6 mt-5 relative transition-all duration-700 delay-500 ${
                pillarsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ border: "1px solid rgba(4, 77, 212, 0.15)" }}
              aria-label="Founder's note"
            >
              <span
                className="absolute top-3 left-4 text-5xl leading-none font-serif select-none pointer-events-none"
                style={{ color: "rgba(235, 72, 0, 0.2)" }}
                aria-hidden="true"
              >
                &ldquo;
              </span>

              <p className="text-navy-600 text-sm sm:text-base leading-relaxed italic pl-5 relative z-10">
                We don&apos;t ensure placements — we ensure you never need anyone to place you. Our
                45-day intensive program builds the hands-on capability to confidently manage,
                coordinate, and lead across all key business departments.
              </p>

              <footer className="flex items-center gap-3 mt-4 pl-5">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ background: "linear-gradient(135deg, #044dd4, #eb4800)" }}
                  aria-hidden="true"
                >
                  AK
                </div>
                <div>
                  <p className="text-xs font-semibold text-navy-800">Ajay Kumar</p>
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
          0% { box-shadow: 0 0 0 0 rgba(235, 72, 0, 0.5); }
          50% { box-shadow: 0 0 0 6px rgba(235, 72, 0, 0); }
          100% { box-shadow: 0 0 0 0 rgba(235, 72, 0, 0); }
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