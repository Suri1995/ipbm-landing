"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// ── Static data ────────────────────────────────────────────────────────────

const particles = [
  { id: 0,  w: 2, h: 2, l: 5,  t: 10, dur: 8,  del: 0   },
  { id: 1,  w: 3, h: 3, l: 15, t: 20, dur: 10, del: 1   },
  { id: 2,  w: 2, h: 2, l: 25, t: 30, dur: 7,  del: 2   },
  { id: 3,  w: 4, h: 4, l: 35, t: 40, dur: 9,  del: 1.5 },
  { id: 4,  w: 3, h: 3, l: 45, t: 15, dur: 11, del: 0.5 },
  { id: 5,  w: 2, h: 2, l: 55, t: 60, dur: 6,  del: 3   },
  { id: 6,  w: 4, h: 4, l: 65, t: 70, dur: 12, del: 2.5 },
  { id: 7,  w: 3, h: 3, l: 75, t: 25, dur: 8,  del: 1   },
  { id: 8,  w: 2, h: 2, l: 85, t: 35, dur: 10, del: 4   },
  { id: 9,  w: 4, h: 4, l: 95, t: 45, dur: 7,  del: 0.8 },
  { id: 10, w: 2, h: 2, l: 8,  t: 55, dur: 9,  del: 2   },
  { id: 11, w: 3, h: 3, l: 18, t: 65, dur: 11, del: 1.2 },
  { id: 12, w: 4, h: 4, l: 28, t: 75, dur: 8,  del: 2.8 },
  { id: 13, w: 2, h: 2, l: 38, t: 85, dur: 10, del: 3.5 },
  { id: 14, w: 3, h: 3, l: 48, t: 5,  dur: 7,  del: 1.7 },
  { id: 15, w: 4, h: 4, l: 58, t: 18, dur: 12, del: 0.3 },
  { id: 16, w: 2, h: 2, l: 68, t: 28, dur: 8,  del: 4.2 },
  { id: 17, w: 3, h: 3, l: 78, t: 38, dur: 9,  del: 2.3 },
  { id: 18, w: 2, h: 2, l: 88, t: 48, dur: 11, del: 0.9 },
  { id: 19, w: 4, h: 4, l: 98, t: 58, dur: 10, del: 1.4 },
];

const pillars = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "20 Essential Topics",
    description: "Comprehensive coverage across Business Foundations, Sales & Marketing, Tech & Analytics, People & Communication — all taught by active industry experts.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: "45-Day Intensive",
    description: "3 hours per day of immersive, practice-first learning. Zero textbooks — only case studies and current reality. Online & offline modes available.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Industry Expert Faculty",
    description: "Every session is led by current practitioners — not academic theorists. Learn directly from those who are building and running businesses today.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Certification of Completion",
    description: "Receive a recognized certification after completing the program — proof of your hands-on capability to manage across all key business departments.",
  },
];

const milestones = [
  { year: "May 2026",      label: "IPBM founded in Hyderabad" },
  { year: "4th June 2026", label: "Program launch — applications open" },
  { year: "July 2026",     label: "First cohort commences" },
  { year: "Aug/Sep 2026",  label: "45-day intensive program completion" },
];

const outcomes = [
  { label: "Topics Curriculum Finalized",       value: 100 },
  { label: "Industry Expert Faculty Onboarded", value: 85  },
  { label: "Corporate Partnerships Secured",    value: 70  },
];

const topicCategories = [
  { name: "Business Foundations",   topics: ["Startup Management", "Financial Management", "Risk Management", "Project Management", "Operations Management", "Family Business Management"] },
  { name: "Sales & Marketing",      topics: ["Sales & Marketing Management", "E-Commerce & Digital Marketing", "Business Networking", "Brand Management", "Market Research"] },
  { name: "Tech & Analytics",       topics: ["Data Analytics", "Optimum Utilization of AI", "Productivity in Business Management"] },
  { name: "People & Communication", topics: ["HR Management", "Public Speaking", "Time & Stress Management", "Business Communication"] },
  { name: "Other Topics",           topics: ["International Business", "Event Management", "Logistics & Supply Chain"] },
];

const differentiators = [
  { icon: "🏗️", title: "Built on 14 Years of Research",  desc: "Founded on the BMRB legacy — years of studying markets, working with businesses, and understanding how organisations operate in real-world environments." },
  { icon: "🎯", title: "Practitioners, Not Professors",   desc: "Our sessions are led by industry professionals who bring practical experience and current business insights — the focus is always on real application." },
  { icon: "📋", title: "20 Core Business Domains",        desc: "Financial Management, Sales & Marketing, AI Productivity, Data Analytics, HR, International Business and more — over 45 days, 3 hours each day." },
  { icon: "💻", title: "Flexible Learning Modes",         desc: "Both online and offline formats available so you can learn in the mode that suits your schedule and lifestyle best." },
];

const whoProfiles = [
  { icon: "🎓", label: "Fresh Graduate"  },
  { icon: "💼", label: "Career Builder"  },
  { icon: "🔄", label: "Career Returner" },
  { icon: "🚀", label: "Startup Explorer"},
  { icon: "🏢", label: "Business Leader" },
];

// ── Sub-components ─────────────────────────────────────────────────────────

const AnimatedYear = (): JSX.Element => {
  const [display, setDisplay] = useState<string>("2026");
  const ref  = useRef<HTMLSpanElement>(null);
  const done = useRef<boolean>(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || done.current) return;
      done.current = true;
      if (reduced) return;
      const chars = ["2", "0", "2", "6"];
      let step = 0;
      const iv = setInterval(() => {
        setDisplay(chars.map((c, i) => (i <= step ? c : String(Math.floor(Math.random() * 10)))).join(""));
        if (++step >= chars.length) clearInterval(iv);
      }, 120);
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return <span ref={ref}>{display}</span>;
};

interface AnimatedCounterProps { target: number; suffix?: string; }
const AnimatedCounter = ({ target, suffix = "" }: AnimatedCounterProps): JSX.Element => {
  const [count, setCount] = useState<number>(0);
  const ref  = useRef<HTMLSpanElement>(null);
  const done = useRef<boolean>(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || done.current) return;
      done.current = true;
      if (reduced) { setCount(target); return; }
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / 1200, 1);
        setCount(Math.round((1 - Math.pow(1 - t, 3)) * target));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

interface ProgressBarProps { label: string; value: number; delay: number; visible: boolean; }
const ProgressBar = ({ label, value, delay, visible }: ProgressBarProps): JSX.Element => {
  const [width, setWidth] = useState<number>(0);
  useEffect(() => {
    if (!visible) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setWidth(value), reduced ? 0 : delay);
    return () => clearTimeout(t);
  }, [visible, value, delay]);

  return (
    <div className="mb-3 last:mb-0" role="meter" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={`${label}: ${value}%`}>
      <div className="flex justify-between text-xs mb-1.5" style={{ color: "#3a4a6a" }}>
        <span>{label}</span>
        <span className="font-semibold" style={{ color: "#1a2a4a" }}>{value}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(4,77,212,0.1)" }}>
        <div
          className="h-full rounded-full transition-all ease-out"
          style={{ width: `${width}%`, transitionDuration: "1300ms", background: "linear-gradient(90deg,#eb4800,#044dd4)" }}
          role="presentation"
        />
      </div>
    </div>
  );
};

interface TopicsAccordionProps { visible: boolean; }
const TopicsAccordion = ({ visible }: TopicsAccordionProps): JSX.Element => {
  // null means all collapsed; string means that category is open
  const [open, setOpen] = useState<string | null>("Business Foundations");

  const toggle = (name: string) => setOpen((prev) => (prev === name ? null : name));

  return (
    <div
      className={`rounded-xl p-4 sm:p-5 transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      style={{ backgroundColor: "rgba(255,255,255,0.75)", backdropFilter: "blur(8px)", border: "1px solid rgba(4,77,212,0.15)" }}
    >
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: "#044dd4" }}>📚 20 Topics Covered</span>
        <span className="text-xs" style={{ color: "#6a7a9a" }}>— All taught by industry experts</span>
      </div>
      <div className="space-y-2">
        {topicCategories.map((cat) => {
          const isOpen = open === cat.name;
          const panelId = `acc-${cat.name.replace(/\s/g, "-")}`;
          return (
            <div key={cat.name} className="rounded-lg overflow-hidden" style={{ border: "1px solid rgba(4,77,212,0.12)" }}>
              <button
                onClick={() => toggle(cat.name)}
                className="w-full flex justify-between items-center p-3 text-left transition-colors duration-200"
                style={{ backgroundColor: isOpen ? "rgba(4,77,212,0.05)" : "rgba(255,255,255,0.6)" }}
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span className="font-semibold text-sm" style={{ color: "#1a2a4a" }}>{cat.name}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  aria-hidden="true" style={{ color: "#eb4800" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                id={panelId}
                className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"}`}
              >
                <div className="p-3 pt-2" style={{ backgroundColor: "rgba(255,255,255,0.3)" }}>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.topics.map((topic) => (
                      <span key={topic} className="inline-block px-2.5 py-1 text-xs rounded-full font-medium" style={{ backgroundColor: "rgba(4,77,212,0.08)", color: "#044dd4" }}>
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-2" style={{ borderTop: "1px solid rgba(4,77,212,0.1)" }}>
        <span className="text-xs" style={{ color: "#6a7a9a" }}>🎯 Zero Textbooks — 100% Case Study Based</span>
        <span className="text-xs font-semibold" style={{ color: "#eb4800" }}>3 Hours/Day · 45 Days</span>
      </div>
    </div>
  );
};

// ── Main export ────────────────────────────────────────────────────────────

export default function About(): JSX.Element {
  const sectionRef    = useRef<HTMLElement>(null);
  const progressRef   = useRef<HTMLDivElement>(null);
  const decorativeRef = useRef<HTMLDivElement>(null);

  const [sectionVisible,  setSectionVisible]  = useState<boolean>(false);
  const [pillarsVisible,  setPillarsVisible]  = useState<boolean>(false);
  const [progressVisible, setProgressVisible] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  // Section entrance
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setSectionVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Pillars entrance (slight delay after section)
  useEffect(() => {
    if (!sectionVisible) return;
    const t = setTimeout(() => setPillarsVisible(true), 200);
    return () => clearTimeout(t);
  }, [sectionVisible]);

  // Progress bars entrance
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setProgressVisible(true); },
      { threshold: 0.2 }
    );
    if (progressRef.current) obs.observe(progressRef.current);
    return () => obs.disconnect();
  }, []);

  // Mouse parallax — fully typed, null-safe
  useEffect(() => {
    let rafId: number | null = null;
    const onMove = (e: MouseEvent) => {
      const el = decorativeRef.current;
      if (!el) return;
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!decorativeRef.current) return;
        const r = decorativeRef.current.getBoundingClientRect();
        setMousePos({
          x: ((e.clientX - r.left) / r.width) * 100,
          y: ((e.clientY - r.top)  / r.height) * 100,
        });
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-labelledby="about-heading"
      className="py-12 sm:py-20 relative overflow-hidden"
      style={{ backgroundColor: "#faf9f6" }}
    >

      {/* ── Background decoration ── */}
      <div
        ref={decorativeRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.03] transition-all duration-500"
          style={{
            background: mousePos
              ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, #1a2a3a 0%, transparent 70%)`
              : "transparent",
          }}
        />
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: `${p.w}px`,
              height: `${p.h}px`,
              left: `${p.l}%`,
              top: `${p.t}%`,
              backgroundColor: "rgba(4,77,212,0.05)",
              animation: `floatDot ${p.dur}s ease-in-out infinite`,
              animationDelay: `${p.del}s`,
            }}
          />
        ))}
        <svg className="absolute inset-0 w-full h-full opacity-[0.018]" aria-hidden="true">
          <defs>
            <pattern id="ipbmLines" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <line x1="0" y1="40" x2="40" y2="0" stroke="#1a2a3a" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ipbmLines)" />
        </svg>
      </div>

      {/* ── Main container ── */}
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-start">

          {/* ════════════════════════════════════════
              LEFT COLUMN
          ════════════════════════════════════════ */}
          <div
            className={`transition-all duration-700 ${sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {/* Founding badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-5 hover:-translate-y-0.5 transition-transform duration-300 cursor-default"
              style={{ backgroundColor: "rgba(235,72,0,0.06)", border: "1px solid rgba(235,72,0,0.25)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse-ring shrink-0" style={{ backgroundColor: "#eb4800" }} aria-hidden="true" />
              <span className="text-xs font-medium tracking-wide" style={{ color: "#eb4800" }}>
                Founded May <AnimatedYear /> · Launching 4th June 2026
              </span>
            </div>

            {/* Section label */}
            <p className="font-semibold text-sm tracking-widest uppercase mb-3 flex items-center gap-2" style={{ color: "#044dd4" }}>
              <span className="w-8 h-px shrink-0" style={{ backgroundColor: "#044dd4" }} aria-hidden="true" />
              Where Business Theory Meets Reality
            </p>

            {/* Heading */}
            <h2
              id="about-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-5 sm:mb-6 leading-tight"
              style={{ color: "#1a2a4a" }}
            >
              Institute of{" "}
              <span className="relative inline-block" style={{ color: "#2a4a8a" }}>
                Practical Business Management
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 rounded-full transition-all duration-700 delay-300 ${sectionVisible ? "w-full" : "w-0"}`}
                  style={{ background: "linear-gradient(to right,#eb4800,rgba(235,72,0,0.15))" }}
                  aria-hidden="true"
                />
              </span>
            </h2>

            {/* About Us content */}
            <div
              className="rounded-xl p-4 sm:p-5 mb-5"
              style={{ backgroundColor: "rgba(4,77,212,0.04)", border: "1px solid rgba(4,77,212,0.1)", borderLeftWidth: "3px", borderLeftColor: "#044dd4" }}
            >
              <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#044dd4" }}>About Us</p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: "#3a4a6a" }}>
                Our roots are in <strong style={{ color: "#1a2a4a" }}>14 years of hands-on research.</strong> IPBM is not another classroom program built on outdated textbooks and theoretical frameworks. IPBM is an initiative founded by the team behind <strong style={{ color: "#1a2a4a" }}>Brand Market Research Bureau (BMRB)</strong> — a Hyderabad-based research and consulting organisation with deep experience across business, markets, and management.
              </p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: "#3a4a6a" }}>
                After years of working alongside companies, entrepreneurs, and professionals across industries, the team developed a deep understanding of how businesses operate, grow, and respond to change. IPBM was founded on years of real-world business experience, with a clear vision to make business education more practical, relevant, and aligned with industry realities.
              </p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: "#3a4a6a" }}>
                Along the way, we repeatedly saw the same gap — many individuals stepping into business or advancing in their careers had academic qualifications but little hands-on experience in real-world business decision-making and management.
              </p>
              <p className="text-sm font-semibold" style={{ color: "#1a2a4a" }}>
                Degrees exist. Certifications exist. But real-world readiness is often harder to find. That gap inspired our purpose.{" "}
                <span style={{ color: "#eb4800" }}>IPBM was built to bridge it.</span>
              </p>
            </div>

            {/* Status badges */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-7" role="list" aria-label="Institute status">
              {["Newly Launched", "Online & Offline Modes", "Certification Program", "Limited Seats"].map((badge, i) => (
                <span
                  key={badge}
                  role="listitem"
                  className="relative overflow-hidden text-white px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 cursor-default group"
                  style={{ backgroundColor: "#044dd4", transitionDelay: `${i * 50}ms` }}
                >
                  <span className="relative z-10">{badge}</span>
                  <span className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-500" aria-hidden="true" />
                </span>
              ))}
            </div>

            {/* Stats row */}
            <div className="pt-5 mb-6 grid grid-cols-2 sm:grid-cols-4 gap-4" style={{ borderTop: "1px solid rgba(4,77,212,0.1)" }}>
              {[
                { target: 45,  suffix: " Days",    label: "Intensive Program"       },
                { target: 20,  suffix: " Topics",  label: "Comprehensive Coverage"  },
                { target: 3,   suffix: " Hrs/Day", label: "Daily Learning"          },
                { target: 100, suffix: "%",        label: "Industry Expert Faculty" },
              ].map((s) => (
                <div key={s.label} className="group cursor-default">
                  <p className="text-xl sm:text-2xl font-bold relative inline-block" style={{ color: "#eb4800" }}>
                    <AnimatedCounter target={s.target} suffix={s.suffix} />
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" style={{ backgroundColor: "#eb4800" }} aria-hidden="true" />
                  </p>
                  <p className="text-xs mt-1" style={{ color: "#6a7a9a" }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* Progress bars */}
            <div
              ref={progressRef}
              className={`rounded-xl p-4 sm:p-5 mb-6 transition-all duration-700 delay-100 ${sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ backgroundColor: "rgba(255,255,255,0.75)", backdropFilter: "blur(8px)", border: "1px solid rgba(4,77,212,0.15)" }}
              aria-label="Program readiness"
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#044dd4" }}>Program Readiness</p>
              {outcomes.map((o, i) => (
                <ProgressBar key={o.label} label={o.label} value={o.value} delay={200 + i * 180} visible={progressVisible} />
              ))}
            </div>

            {/* Timeline */}
            <div
              className={`pl-4 mb-8 transition-all duration-700 delay-200 ${sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ borderLeft: "2px solid #044dd4" }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#044dd4" }}>Program Timeline</p>
              <ol className="space-y-2.5">
                {milestones.map((m, i) => (
                  <li
                    key={m.year}
                    className={`flex items-center gap-2 sm:gap-3 transition-all duration-500 ${sectionVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}
                    style={{ transitionDelay: `${300 + i * 100}ms` }}
                  >
                    <span className="text-xs font-bold shrink-0 w-24 sm:w-28" style={{ color: "#1a2a4a" }}>{m.year}</span>
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: "#eb4800" }} aria-hidden="true" />
                    <span className="flex-1 h-px hidden sm:block" style={{ background: "linear-gradient(to right,rgba(4,77,212,0.2),transparent)" }} aria-hidden="true" />
                    <span className="text-xs" style={{ color: "#6a7a9a" }}>{m.label}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* ── WHAT MAKES US DIFFERENT (left side) ── */}
            <div
              className={`rounded-xl p-4 sm:p-5 mb-5 transition-all duration-700 delay-300 ${sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ backgroundColor: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)", border: "1px solid rgba(4,77,212,0.12)" }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#044dd4" }}>What Makes Us Different</p>
              <p className="text-xs mb-4" style={{ color: "#6a7a9a" }}>
                IPBM is built on the foundation of Brand Market Research Bureau, and that experience shapes the way we teach — practical, relevant, and connected to challenges professionals face every day.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {differentiators.map((d) => (
                  <div
                    key={d.title}
                    className="flex gap-2.5 p-3 rounded-lg transition-colors duration-200 hover:bg-white/80"
                    style={{ border: "1px solid rgba(4,77,212,0.08)" }}
                  >
                    <span className="text-lg shrink-0 mt-0.5" aria-hidden="true">{d.icon}</span>
                    <div>
                      <p className="text-xs font-semibold mb-0.5" style={{ color: "#1a2a4a" }}>{d.title}</p>
                      <p className="text-xs leading-relaxed" style={{ color: "#6a7a9a" }}>{d.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── WHY JOIN NOW (left side) ── */}
            <div
              className={`rounded-xl p-4 sm:p-5 transition-all duration-700 delay-400 ${sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ background: "linear-gradient(135deg,rgba(235,72,0,0.04),rgba(4,77,212,0.04))", border: "1px solid rgba(235,72,0,0.18)" }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#eb4800" }}>⚡ Why Join Now</p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: "#3a4a6a" }}>
                Business is changing rapidly. Markets are evolving, AI is reshaping roles, and competition is growing across industries. Today, the advantage belongs to those who understand how business works across functions — not just in one area.
              </p>
              <div className="rounded-lg px-4 py-3 mb-4" style={{ backgroundColor: "rgba(255,255,255,0.8)", border: "1px solid rgba(4,77,212,0.1)" }}>
                <p className="text-sm font-semibold" style={{ color: "#1a2a4a" }}>
                  For less than <span style={{ color: "#eb4800" }}>₹1,200 per day</span>, gain access to 45 days of intensive learning led by experienced industry practitioners across 20 key business domains.
                </p>
              </div>
              <p className="text-sm font-bold mb-1" style={{ color: "#1a2a4a" }}>
                Admissions are now open.{" "}
                <span style={{ color: "#eb4800" }}>Limited seats available.</span>
              </p>
              <p className="text-xs" style={{ color: "#6a7a9a" }}>Start your 45-day journey with IPBM today.</p>
            </div>

          </div>{/* end left column */}

          {/* ════════════════════════════════════════
              RIGHT COLUMN
          ════════════════════════════════════════ */}
          <div>

            {/* Pillars grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-5">
              {pillars.map((p, i) => (
                <article
                  key={p.title}
                  tabIndex={0}
                  className={`group bg-white rounded-2xl p-5 sm:p-6 relative overflow-hidden cursor-default outline-none transition-all duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${pillarsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                  style={{
                    border: "1px solid rgba(4,77,212,0.12)",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                    transitionDelay: pillarsVisible ? `${i * 80}ms` : "0ms",
                  }}
                  aria-label={p.title}
                  onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
                    e.currentTarget.style.borderColor = "rgba(4,77,212,0.28)";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(4,77,212,0.1)";
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
                    e.currentTarget.style.borderColor = "rgba(4,77,212,0.12)";
                    e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
                  }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(135deg,rgba(4,77,212,0.03),transparent)" }} aria-hidden="true" />
                  <div className="absolute top-0 right-0 w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(135deg,transparent 50%,rgba(4,77,212,0.07) 50%)", borderRadius: "0 16px 0 0" }} aria-hidden="true" />

                  <div className="relative mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center relative transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                      style={{ backgroundColor: "rgba(4,77,212,0.08)", color: "#044dd4" }}
                      aria-hidden="true"
                    >
                      {p.icon}
                      <span className="absolute -inset-1.5 border border-dashed rounded-[14px] opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300" style={{ borderColor: "rgba(4,77,212,0.3)" }} aria-hidden="true" />
                    </div>
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full border-2 border-white opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 delay-100" style={{ backgroundColor: "#eb4800" }} aria-hidden="true" />
                  </div>

                  <h3 className="font-semibold text-sm sm:text-base mb-2 relative inline-block" style={{ color: "#1a2a4a" }}>
                    {p.title}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 origin-left" style={{ backgroundColor: "#044dd4" }} aria-hidden="true" />
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "#6a7a9a" }}>{p.description}</p>

                  <div className="mt-3 opacity-0 group-hover:opacity-100 -translate-x-1.5 group-hover:translate-x-0 transition-all duration-200" aria-hidden="true">
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

            {/* Topics accordion */}
            <TopicsAccordion visible={pillarsVisible} />

            {/* Our Philosophy */}
            <div
              className={`mt-5 rounded-xl p-4 sm:p-5 transition-all duration-700 delay-400 ${pillarsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ backgroundColor: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)", border: "1px solid rgba(4,77,212,0.12)" }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#044dd4" }}>Our Philosophy</p>
              <blockquote className="relative" aria-label="IPBM founding philosophy">
                <span className="absolute -top-2 -left-1 text-5xl leading-none font-serif select-none" style={{ color: "rgba(235,72,0,0.15)" }} aria-hidden="true">&ldquo;</span>
                <p className="text-sm sm:text-base font-semibold leading-relaxed italic pl-5 mb-4" style={{ color: "#1a2a4a" }}>
                  We don&apos;t promise placements. We promise you&apos;ll never need anyone to place you.
                </p>
                <p className="text-sm leading-relaxed pl-5 mb-4" style={{ color: "#3a4a6a" }}>
                  Our goal is to build leaders who understand business from the inside out — people who can walk into any department, any boardroom, or any startup challenge with{" "}
                  <strong style={{ color: "#1a2a4a" }}>confidence, competence, and clarity.</strong>
                </p>
                <footer className="pl-5">
                  <p className="text-xs mb-2" style={{ color: "#6a7a9a" }}>Whether you are a:</p>
                  <div className="flex flex-wrap gap-2">
                    {whoProfiles.map((w) => (
                      <span
                        key={w.label}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
                        style={{ backgroundColor: "rgba(4,77,212,0.07)", color: "#044dd4", border: "1px solid rgba(4,77,212,0.15)" }}
                      >
                        <span aria-hidden="true">{w.icon}</span> {w.label}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs mt-3 font-semibold" style={{ color: "#eb4800" }}>IPBM is built to support your journey.</p>
                  <div className="flex items-center gap-3 mt-4 pt-3" style={{ borderTop: "1px solid rgba(4,77,212,0.08)" }}>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: "linear-gradient(135deg,#044dd4,#eb4800)" }} aria-hidden="true">AK</div>
                    <div>
                      <p className="text-xs font-semibold" style={{ color: "#1a2a4a" }}>Ajay Kumar</p>
                      <p className="text-xs" style={{ color: "#6a7a9a" }}>Founder &amp; Director, IPBM</p>
                    </div>
                  </div>
                </footer>
              </blockquote>
            </div>

            {/* Program Fee & Contact */}
            <div
              className={`mt-5 rounded-xl p-4 sm:p-5 transition-all duration-700 delay-600 ${pillarsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ backgroundColor: "#ffffff", border: "1px solid rgba(235,72,0,0.22)", boxShadow: "0 2px 12px rgba(235,72,0,0.06)" }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <p className="text-xs mb-1" style={{ color: "#6a7a9a" }}>Program Fee</p>
                  <p className="text-2xl font-bold" style={{ color: "#eb4800" }}>
                    ₹50,000{" "}
                    <span className="text-sm font-normal" style={{ color: "#6a7a9a" }}>+ GST</span>
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#6a7a9a" }}>EMI options available</p>
                  <div
                    className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold"
                    style={{ backgroundColor: "rgba(4,77,212,0.07)", color: "#044dd4" }}
                  >
                    💡 Less than ₹1,200/- per day for expert-led learning
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-bold" style={{ color: "#1a2a4a" }}>Contact Us</p>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href="tel:9704859888"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      style={{ backgroundColor: "rgba(4,77,212,0.08)", color: "#044dd4" }}
                      aria-label="Call 9704859888"
                    >
                      📞 9704859888
                    </a>
                    <a
                      href="tel:9866739499"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      style={{ backgroundColor: "rgba(4,77,212,0.08)", color: "#044dd4" }}
                      aria-label="Call 9866739499"
                    >
                      📞 9866739499
                    </a>
                  </div>
                  <a
                    href="mailto:director@ipbm.in"
                    className="text-xs transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                    style={{ color: "#eb4800" }}
                    aria-label="Email director@ipbm.in"
                  >
                    📧 director@ipbm.in
                  </a>
                </div>
              </div>
              <p className="text-xs mt-4 pt-3" style={{ borderTop: "1px solid rgba(4,77,212,0.08)", color: "#6a7a9a" }}>
                📍 IPBM, Brand Market Research Bureau, Raghavendra Nagar Colony, Uppal, Hyderabad – 500039
              </p>
            </div>

            {/* BMRB association */}
            <div className="flex items-center gap-3 flex-wrap mt-10 md:mt-20 justify-center">
              <span className="text-lg font-bold underline underline-offset-2" style={{ color: "#eb4800" }}>Programs Developed in Association with</span>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ backgroundColor: "rgba(235,72,0,0.06)", border: "1px solid rgba(235,72,0,0.2)" }}>
                <Image
                  src="/bmrb-logo.avif"
                  alt="BMRB — Brand Market Research Bureau logo"
                  width={100}
                  height={40}
                  className="h-8 w-auto"
                />
              </div>
            </div>

          </div>{/* end right column */}
        </div>{/* end grid */}
      </div>{/* end container */}

      {/* Scroll indicator */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1 opacity-25 pointer-events-none"
        aria-hidden="true"
      >
        <span className="text-xs" style={{ color: "#1a2a4a" }}>Explore</span>
        <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#1a2a4a" }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
        </svg>
      </div>

      <style jsx global>{`
        @keyframes floatDot {
          0%,100% { transform: translateY(0) translateX(0); opacity: 0; }
          50%      { transform: translateY(-28px) translateX(12px); opacity: 1; }
        }
        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(235,72,0,0.5); }
          50%  { box-shadow: 0 0 0 6px rgba(235,72,0,0); }
          100% { box-shadow: 0 0 0 0 rgba(235,72,0,0); }
        }
        .animate-pulse-ring { animation: pulse-ring 2.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse-ring,
          .animate-bounce { animation: none; }
          [style*="animation"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}