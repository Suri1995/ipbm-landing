"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";

const programs = [
  {
    tag: "Flagship",
    title: "MBA in Business Management",
    duration: "2 Years",
    mode: "Full-time",
    seats: "60 seats",
    intake: "Aug 2026",
    status: "Enrolling Now",
    highlights: [
      "Strategic Management",
      "Finance & Accounting",
      "HR Management",
      "Marketing Strategy",
    ],
    isDark: true,
  },
  {
    tag: "Popular",
    title: "PGDM – Post Graduate Diploma",
    duration: "1 Year",
    mode: "Full-time / Part-time",
    seats: "80 seats",
    intake: "Aug 2026",
    status: "Applications Open",
    highlights: [
      "Business Analytics",
      "Operations",
      "Entrepreneurship",
      "Digital Marketing",
    ],
    isDark: false,
  },
  {
    tag: "Executive",
    title: "Executive MBA",
    duration: "18 Months",
    mode: "Weekend / Online",
    seats: "40 seats",
    intake: "Sep 2026",
    status: "Early Access",
    highlights: [
      "Leadership Development",
      "Corporate Finance",
      "Supply Chain",
      "Innovation Strategy",
    ],
    isDark: false,
  },
  {
    tag: "Certificate",
    title: "Short-Term Certification",
    duration: "3–6 Months",
    mode: "Online & Offline",
    seats: "Open enrollment",
    intake: "Rolling",
    status: "Always Open",
    highlights: [
      "Sales Leadership",
      "Financial Modeling",
      "Brand Management",
      "Startup Fundamentals",
    ],
    isDark: false,
  },
];

const statusStyles: Record<string, string> = {
  "Enrolling Now":     "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "Applications Open": "bg-blue-500/15   text-blue-400   border-blue-500/30",
  "Early Access":      "bg-amber-500/15  text-amber-400  border-amber-500/30",
  "Always Open":       "bg-purple-500/15 text-purple-400 border-purple-500/30",
};

const statusStylesLight: Record<string, string> = {
  "Enrolling Now":     "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Applications Open": "bg-blue-50   text-blue-700   border-blue-200",
  "Early Access":      "bg-amber-50  text-amber-700  border-amber-200",
  "Always Open":       "bg-purple-50 text-purple-700 border-purple-200",
};

const SeatCounter = ({
  seats,
  isDark,
}: {
  seats: string;
  isDark: boolean;
}) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  const targetCount = parseInt(seats) || 0;
  const isOpen = seats === "Open enrollment";

  useEffect(() => {
    if (isOpen) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            !hasAnimated.current &&
            targetCount > 0
          ) {
            hasAnimated.current = true;
            if (prefersReduced) {
              setCount(targetCount);
              return;
            }
            const duration = 1800;
            const startTime = performance.now();
            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const ease = 1 - Math.pow(1 - progress, 3);
              setCount(Math.floor(ease * targetCount));
              if (progress < 1) requestAnimationFrame(animate);
              else setCount(targetCount);
            };
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.3 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [targetCount, isOpen]);

  if (isOpen)
    return (
      <span ref={elementRef} className="flex items-center gap-1">
        ✨ {seats}
      </span>
    );
  return (
    <span ref={elementRef} aria-live="polite">
      {count === 0 ? seats : `${count} seats`}
    </span>
  );
};

const TiltCard = ({
  children,
  isDark,
}: {
  children: React.ReactNode;
  isDark: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setRotate({
          x: ((y - rect.height / 2) / rect.height) * 8,
          y: ((x - rect.width / 2) / rect.width) * 8,
        });
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: "transform 0.1s ease-out",
        willChange: "transform",
      }}
      className="relative"
    >
      {children}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          aria-hidden="true"
          style={{
            background: `radial-gradient(circle at ${50 + rotate.y * 2}% ${
              50 + rotate.x * 2
            }%, ${
              isDark
                ? "rgba(212,175,55,0.12)"
                : "rgba(212,175,55,0.08)"
            }, transparent 70%)`,
          }}
        />
      )}
    </div>
  );
};

const SeatsBar = ({
  seats,
  isDark,
  visible,
  delay,
}: {
  seats: string;
  isDark: boolean;
  visible: boolean;
  delay: number;
}) => {
  const isOpen = seats === "Open enrollment";
  const total = parseInt(seats) || 0;
  const filledPct = isOpen ? 0 : Math.min(Math.floor((total / 120) * 55 + 20), 78);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!visible || isOpen) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = setTimeout(
      () => setWidth(filledPct),
      prefersReduced ? 0 : delay
    );
    return () => clearTimeout(timer);
  }, [visible, filledPct, isOpen, delay]);

  if (isOpen) return null;

  const remaining = Math.round(total * (1 - filledPct / 100));

  return (
    <div className="mt-4 mb-1">
      <div
        className={`flex justify-between text-xs mb-1.5 ${
          isDark ? "text-navy-300" : "text-navy-500"
        }`}
      >
        <span>Seats filling fast</span>
        <span
          className={`font-semibold ${
            isDark ? "text-gold-400" : "text-navy-700"
          }`}
          aria-label={`${remaining} seats remaining`}
        >
          {remaining} left
        </span>
      </div>
      <div
        className={`h-1 rounded-full overflow-hidden ${
          isDark ? "bg-white/10" : "bg-navy-100"
        }`}
        role="meter"
        aria-valuenow={filledPct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${filledPct}% of seats filled`}
      >
        <div
          className="h-full rounded-full transition-all ease-out"
          style={{
            width: `${width}%`,
            transitionDuration: "1400ms",
            background: isDark
              ? "linear-gradient(90deg,#c6a43f,#f5d878)"
              : "linear-gradient(90deg,#2a4a72,#c6a43f)",
          }}
          role="presentation"
        />
      </div>
    </div>
  );
};

const IntakeCountdown = ({
  intake,
  isDark,
}: {
  intake: string;
  isDark: boolean;
}) => {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    if (intake === "Rolling") return;
    const target = new Date(`${intake} 1`);
    const now = new Date();
    const diff = Math.ceil(
      (target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    setDays(diff > 0 ? diff : 0);
  }, [intake]);

  if (days === null) return null;

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border ${
        isDark
          ? "border-gold-500/30 text-gold-400 bg-gold-500/10"
          : "border-navy-200 text-navy-600 bg-navy-50"
      }`}
      aria-label={`Intake starts in ${days} days`}
    >
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      {days}d to intake
    </span>
  );
};

const useParticles = (count: number) =>
  useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        w: Math.random() * 3 + 1,
        h: Math.random() * 3 + 1,
        left: Math.random() * 100,
        top: Math.random() * 100,
        dur: Math.random() * 8 + 6,
        delay: Math.random() * 5,
      })),
    [count]
  );

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [filter, setFilter] = useState<"All" | "Full-time" | "Online" | "Certificate">("All");
  
  // FIX: Track hydration status
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Component is now safe to render random client values
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const particles = useParticles(30);

  const filtered = useMemo(() => {
    if (filter === "All") return programs;
    if (filter === "Full-time")
      return programs.filter((p) => p.mode.includes("Full-time"));
    if (filter === "Online")
      return programs.filter(
        (p) => p.mode.includes("Online") || p.mode.includes("Weekend")
      );
    if (filter === "Certificate") return programs.filter((p) => p.tag === "Certificate");
    return programs;
  }, [filter]);

  const filterTabs = ["All", "Full-time", "Online", "Certificate"] as const;

  return (
    <section
      id="services"
      ref={sectionRef}
      aria-labelledby="services-heading"
      className="py-7 sm:py-20 bg-navy-900 px-4 sm:px-6 relative overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(212,175,55,0.4) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            animation: "gridPulse 4s ease-in-out infinite",
          }}
        />
        
        {/* FIX: Conditional rendering to prevent Hydration Mismatch */}
        <div>
          {isMounted && particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full bg-gold-500/10"
              style={{
                width: `${p.w}px`,
                height: `${p.h}px`,
                left: `${p.left}%`,
                top: `${p.top}%`,
                animation: `floatParticle ${p.dur}s ease-in-out infinite`,
                animationDelay: `${p.delay}s`,
                willChange: "transform",
              }}
            />
          ))}
        </div>

        <div className="absolute top-1/4 -right-48 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 -left-48 w-96 h-96 bg-navy-500/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`text-center mb-8 sm:mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-2 bg-gold-500/10 backdrop-blur-sm border border-gold-500/20 rounded-full px-4 py-1.5 mb-4">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-400" />
            </span>
            <span className="text-gold-400 text-xs font-medium tracking-wide">
              2026 Inaugural Intake — Now Open
            </span>
          </div>

          <p className="text-gold-500 font-semibold text-sm tracking-widest uppercase mb-3 flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-gold-500/50" aria-hidden="true" />
            Our Programs
            <span className="w-8 h-px bg-gold-500/50" aria-hidden="true" />
          </p>

          <h2 id="services-heading" className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 text-balance">
            Education Designed for{" "}
            <span className="text-gold-400 relative inline-block">
              Real Careers
              <svg className="absolute -bottom-2 left-0 w-full" height="3" aria-hidden="true">
                <line x1="0" y1="1.5" x2="100%" y2="1.5" stroke="#C6A43F" strokeWidth="2" strokeDasharray="6 6" className="animate-dash" />
              </svg>
            </span>
          </h2>

          <p className="text-navy-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto text-pretty mb-6">
            Every programme in our inaugural 2026 lineup is purpose-built with industry input — so you graduate ready, not just qualified.
          </p>

          <div className="inline-flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1" role="tablist" aria-label="Filter programs by type">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={filter === tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-250 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900 ${
                  filter === tab ? "bg-gold-500 text-white shadow-md" : "text-navy-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6" role="tabpanel" aria-label={`Programs: ${filter}`}>
          {filtered.map((prog, i) => (
            <TiltCard key={prog.title} isDark={prog.isDark}>
              <article
                className={`relative rounded-2xl p-5 sm:p-6 border flex flex-col transition-all duration-300 hover:shadow-2xl ${
                  prog.isDark ? "bg-gradient-to-br from-navy-800 via-navy-800 to-navy-700 border-white/10" : "bg-gradient-to-br from-white via-white to-navy-50 border-navy-100"
                } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} overflow-hidden group`}
                style={{ transitionDelay: visible ? `${i * 100}ms` : "0ms" }}
                onMouseEnter={() => setActiveCard(i)}
                onMouseLeave={() => setActiveCard(null)}
                onFocus={() => setActiveCard(i)}
                onBlur={() => setActiveCard(null)}
              >
                <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(135deg,rgba(198,164,63,0.15),transparent 60%)" }} aria-hidden="true" />
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" aria-hidden="true" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-3 gap-2 flex-wrap">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full transition-all duration-300 ${prog.isDark ? "bg-gold-500 text-white group-hover:bg-gold-400" : "bg-navy-100 text-navy-800 group-hover:bg-gold-500 group-hover:text-white"}`}>
                      {prog.tag}
                    </span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${prog.isDark ? statusStyles[prog.status] : statusStylesLight[prog.status]}`} aria-label={`Status: ${prog.status}`}>
                      {prog.status}
                    </span>
                  </div>

                  <h3 className={`font-display font-bold text-base sm:text-lg leading-tight mb-3 transition-colors duration-300 ${prog.isDark ? "text-white" : "text-navy-900"} group-hover:text-gold-400`}>
                    {prog.title}
                  </h3>

                  <div className="mb-3">
                    <IntakeCountdown intake={prog.intake} isDark={prog.isDark} />
                  </div>

                  <div className={`flex flex-wrap gap-x-3 gap-y-1 text-xs mb-4 ${prog.isDark ? "text-navy-300" : "text-navy-500"}`}>
                    <span className="flex items-center gap-1 group-hover:text-gold-400 transition-colors duration-300">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {prog.duration}
                    </span>
                    <span className="flex items-center gap-1 group-hover:text-gold-400 transition-colors duration-300">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                      {prog.mode}
                    </span>
                    <span className="flex items-center gap-1 group-hover:text-gold-400 transition-colors duration-300">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" /></svg>
                      <SeatCounter seats={prog.seats} isDark={prog.isDark} />
                    </span>
                  </div>

                  <ul className="space-y-1.5 flex-1" aria-label={`${prog.title} highlights`}>
                    {prog.highlights.map((h, idx) => (
                      <li key={h} className={`text-xs sm:text-sm flex items-center gap-2 transition-all duration-300 ${prog.isDark ? "text-navy-200" : "text-navy-600"}`} style={{ transitionDelay: activeCard === i ? `${idx * 30}ms` : "0ms", transform: activeCard === i ? `translateX(${(idx + 1) * 3}px)` : "translateX(0)" }}>
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300 ${prog.isDark ? "bg-gold-400" : "bg-navy-400"} group-hover:scale-125 group-hover:bg-gold-500`} aria-hidden="true" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <SeatsBar seats={prog.seats} isDark={prog.isDark} visible={visible} delay={300 + i * 120} />

                  <a href="#contact" aria-label={`Apply for ${prog.title}`} className={`mt-4 sm:mt-5 inline-flex items-center gap-1 text-sm font-semibold transition-all duration-300 group-hover:gap-2 focus:outline-none focus-visible:underline ${prog.isDark ? "text-gold-400" : "text-navy-700"}`}>
                    <span>Apply Now</span>
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </a>
                </div>
              </article>
            </TiltCard>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16 text-navy-400">
              <p className="text-sm">No programmes match this filter.</p>
            </div>
          )}
        </div>

        <div className={`mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 border border-white/8 rounded-2xl p-5 sm:p-6 bg-white/3 backdrop-blur-sm transition-all duration-700 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} aria-label="Why join IPBM">
          {[
            { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>, label: "Founding Cohort Advantage", desc: "Be among the first. Shape IPBM's culture, get lifetime alumni recognition, and access founding-batch benefits." },
            { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>, label: "30+ Industry Mentors", desc: "Every student is paired with a practising professional from their chosen domain from week one." },
            { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>, label: "Live Client Projects", desc: "From semester one, you work on briefs from real companies — not case studies from a textbook." },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-gold-500/10 text-gold-400 flex items-center justify-center shrink-0 mt-0.5">{item.icon}</div>
              <div><p className="text-white text-sm font-semibold mb-1">{item.label}</p><p className="text-navy-300 text-xs leading-relaxed">{item.desc}</p></div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 sm:mt-12">
          <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gold-500/30 text-gold-400 hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-all duration-300 text-sm font-semibold group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900">
            <span>View All Programs</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden lg:block" aria-hidden="true">
        <div className="flex flex-col items-center gap-1 opacity-30">
          <span className="text-white text-xs">Explore</span>
          <svg className="w-4 h-4 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" /></svg>
        </div>
      </div>

      <style jsx global>{`
        @keyframes gridPulse { 0%, 100% { opacity: 0.07; } 50% { opacity: 0.12; } }
        @keyframes floatParticle { 
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0; } 
          50% { transform: translateY(-40px) translateX(20px); opacity: 0.5; } 
        }
        @keyframes dash { to { stroke-dashoffset: -12; } }
        .animate-dash { animation: dash 2s linear infinite; }
        @keyframes pulse-slow { 0%, 100% { opacity: 0.05; transform: scale(1); } 50% { opacity: 0.1; transform: scale(1.05); } }
        .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        @media (prefers-reduced-motion: reduce) {
          .animate-dash, .animate-pulse-slow, .animate-ping, [style*="animation"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}