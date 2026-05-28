"use client";

import { useEffect, useRef, useState, FormEvent, useCallback, useMemo } from "react";

// Updated contact details from brochure
const contactDetails = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Address",
    value: "IPBM, Brand Market Research Bureau, Raghavendra Nagar Colony, Uppal, Hyderabad - 500039",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Phone",
    value: "9866739499 / 9704859888",
    href: "tel:9866739499",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email",
    value: "director@bmrb.in",
    href: "mailto:director@bmrb.in",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Office Hours",
    value: "Mon–Sat, 9 AM – 6 PM",
  },
];

// Official brand colors
// LinkedIn: #0A66C2
// Instagram: gradient #405DE6 → #833AB4 → #C13584 → #E1306C → #F77737 → #FCAF45
// YouTube:   #FF0000
// Facebook:  #1877F2
const instagramGradient =
  "linear-gradient(45deg, #405DE6, #833AB4, #C13584, #E1306C, #F77737, #FCAF45)";

const socialLinks = [
  {
    name: "LinkedIn",
    solidBg: "#0A66C2",
    solidBorder: "#0A66C2",
    isGradient: false,
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    solidBg: "transparent",
    solidBorder: "transparent",
    isGradient: true,
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    solidBg: "#FF0000",
    solidBorder: "#FF0000",
    isGradient: false,
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    solidBg: "#1877F2",
    solidBorder: "#1877F2",
    isGradient: false,
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

// ── Social icon button — handles mobile (always colored) vs desktop (hover only) ──
const SocialButton = ({ s }: { s: typeof socialLinks[number] }) => {
  const ref = useRef<HTMLAnchorElement>(null);

  // Apply brand color styles based on screen size
  const applyColor = useCallback((el: HTMLAnchorElement) => {
    if (s.isGradient) {
      el.style.background = instagramGradient;
      el.style.borderColor = "transparent";
    } else {
      el.style.background = s.solidBg;
      el.style.borderColor = s.solidBorder;
    }
    el.style.color = "#ffffff";
    el.style.transform = "translateY(-2px)";
  }, [s]);

  const clearColor = useCallback((el: HTMLAnchorElement) => {
    el.style.background = "";
    el.style.borderColor = "";
    el.style.color = "";
    el.style.transform = "";
  }, []);

  // On mount: apply color directly on mobile, neutral on desktop
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      applyColor(el);
    }
  }, [applyColor]);

  return (
    <a
      ref={ref}
      href="#"
      role="listitem"
      aria-label={`Follow IPBM on ${s.name}`}
      // base neutral styles — brand color applied via JS (mobile: always, desktop: hover)
      className="w-9 h-9 bg-white/8 border border-white/15 rounded-xl flex items-center justify-center text-navy-300 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#eb4800] focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
      onMouseEnter={(e) => {
        if (window.innerWidth >= 768) applyColor(e.currentTarget);
      }}
      onMouseLeave={(e) => {
        if (window.innerWidth >= 768) clearColor(e.currentTarget);
      }}
    >
      {s.icon}
    </a>
  );
};

// ── Live enquiry counter ───────────────────────────────────────────────────
const LiveEnquiries = () => {
  const [count, setCount] = useState(47);
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.5) setCount((c) => c + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  return (
    <span className="font-semibold text-[#eb4800]">{count}</span>
  );
};

// ── Countdown to Jun 2026 intake ──────────────────────────────────────────
const IntakeCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date("2026-06-04T00:00:00");
    const tick = () => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { val: timeLeft.days,    label: "Days" },
    { val: timeLeft.hours,   label: "Hrs"  },
    { val: timeLeft.minutes, label: "Min"  },
    { val: timeLeft.seconds, label: "Sec"  },
  ];

  return (
    <div
      className="flex items-center gap-3"
      aria-label={`Intake opens in ${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds`}
      aria-live="off"
    >
      {units.map(({ val, label }, i) => (
        <div key={label} className="flex items-center gap-3">
          <div className="flex flex-col items-center min-w-[2rem]">
            <span
              className="text-lg font-bold text-white leading-none tabular-nums"
              aria-hidden="true"
            >
              {String(val).padStart(2, "0")}
            </span>
            <span className="text-navy-400 text-xs mt-0.5">{label}</span>
          </div>
          {i < units.length - 1 && (
            <span
              className="text-navy-500 text-sm font-bold leading-none mb-3 select-none"
              aria-hidden="true"
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

// ── SSR-safe deterministic particles (no Math.random) ─────────────────────
const useParticles = (n: number) =>
  useMemo(
    () =>
      Array.from({ length: n }, (_, i) => ({
        id: i,
        w: ((i * 137.508) % 3) + 1,
        h: ((i * 137.508) % 3) + 1,
        left: (i * 73.137) % 100,
        top: (i * 53.711) % 100,
        dur: ((i * 11.317) % 10) + 8,
        delay: (i * 7.919) % 6,
      })),
    [n]
  );

// ── Main component ─────────────────────────────────────────────────────────
export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  // ── SSR-safe deterministic particles ──
  const particles = useParticles(12);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={ref}
      aria-labelledby="contact-heading"
      className="py-7 sm:py-20 bg-navy-900 relative overflow-hidden"
    >
      {/* ── Subtle background ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, rgba(235,72,0,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#eb4800]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-navy-600/20 rounded-full blur-3xl" />
        {/* Deterministic particles — SSR-safe */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-[#044dd4]/8"
            style={{
              width: `${p.w}px`,
              height: `${p.h}px`,
              left: `${p.left}%`,
              top: `${p.top}%`,
              animation: `floatPt ${p.dur}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl px-4 mx-auto relative z-10">

        {/* ── Header ── */}
        <div
          className={`text-center mb-10 sm:mb-14 lg:mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-[#eb4800]/10 border border-[#eb4800]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#eb4800] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#eb4800]" />
            </span>
            <span className="text-[#eb4800] text-xs font-medium tracking-wide">
              <LiveEnquiries /> people enquired this week
            </span>
          </div>

          <p className="text-[#eb4800] font-semibold text-sm tracking-widest uppercase mb-3">
            Admissions &amp; Enquiries
          </p>

          <h2
            id="contact-heading"
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 text-balance"
          >
            Start Your Journey{" "}
            <span className="text-[#044dd4]">With IPBM</span>
          </h2>

          <p className="text-navy-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto text-pretty">
            Be part of our <strong className="text-white">inaugural 2026 cohort</strong>. Reach out to us
            and our admissions counsellor will connect within 24 hours.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 xl:gap-12 items-start">

          {/* ── Left info panel (scrolls normally, takes ~40% width) ── */}
          <div
            className={`w-full lg:w-5/12 flex flex-col gap-5 sm:gap-6 transition-all duration-700 delay-100 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Intake countdown card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5">
              <p className="text-navy-400 text-xs uppercase tracking-wide font-medium mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#eb4800] rounded-full animate-pulse" aria-hidden="true" />
                Inaugural Intake — 4th June 2026
              </p>
              <IntakeCountdown />
              <div className="mt-3 h-px bg-gradient-to-r from-[#eb4800]/40 to-transparent" aria-hidden="true" />
              <p className="mt-3 text-xs text-navy-400">45-day intensive program · Online & offline modes available.</p>
            </div>

            {/* Contact details - updated from brochure */}
            {contactDetails.map((item, i) => (
              <div
                key={item.label}
                className={`flex items-start gap-3 sm:gap-4 transition-all duration-500 ${
                  visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                }`}
                style={{ transitionDelay: `${200 + i * 80}ms` }}
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#044dd4]/15 border border-[#044dd4]/30 rounded-xl flex items-center justify-center text-[#044dd4] flex-shrink-0 transition-all duration-300 hover:bg-[#044dd4]/25 hover:scale-105">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-navy-400 text-xs uppercase tracking-wide font-medium mb-0.5">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-white text-sm hover:text-[#044dd4] transition-colors focus:outline-none focus:underline break-words"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-white text-sm break-words">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            

            {/* Social links */}
            <div>
              <p className="text-navy-400 text-xs uppercase tracking-wide font-medium mb-3">
                Follow Us
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3" role="list" aria-label="Social media links">
                {socialLinks.map((s) => (
                  <SocialButton key={s.name} s={s} />
                ))}
              </div>
            </div>

          </div>

          {/* ── Contact Information Panel (Form is commented out) ── */}
          <div className="w-full lg:w-7/12 lg:sticky lg:top-6 transition-all duration-700 delay-200">
            <div
              className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 sm:p-6 lg:p-8 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {/* 
                ============================================================
                CONTACT FORM IS COMMENTED OUT AS REQUESTED
                ============================================================
              */}
              
              {/* Direct Contact Information Panel - Replacing the form */}
              <div className="flex flex-col items-center text-center">
                <div
                  className="w-16 h-16 bg-[#eb4800]/20 rounded-2xl flex items-center justify-center mb-5"
                  aria-hidden="true"
                >
                  <svg className="w-8 h-8 text-[#eb4800]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>

                <h3 className="font-display font-bold text-white text-xl sm:text-2xl mb-3">
                  Get in Touch
                </h3>
                
                <p className="text-navy-300 text-sm max-w-sm mb-6">
                  Admissions are now open for our inaugural 45-day intensive program starting <strong className="text-white">4th June 2026</strong>.
                </p>

                {/* <div className="w-full space-y-4 text-left">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-8 h-8 bg-[#044dd4]/20 rounded-lg flex items-center justify-center text-[#044dd4] shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-navy-400 text-xs">Call</p>
                      <a href="tel:9704859888" className="text-white text-sm font-medium hover:text-[#044dd4] transition-colors">9866739499</a>
                      <span className="text-navy-500 text-xs mx-1">/</span>
                      <a href="tel:9866739499" className="text-white text-sm font-medium hover:text-[#044dd4] transition-colors">9704859888</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-8 h-8 bg-[#044dd4]/20 rounded-lg flex items-center justify-center text-[#044dd4] shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-navy-400 text-xs">Email</p>
                      <a href="mailto:director@bmrb.in" className="text-white text-sm font-medium hover:text-[#044dd4] transition-colors">director@bmrb.in</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-8 h-8 bg-[#044dd4]/20 rounded-lg flex items-center justify-center text-[#044dd4] shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-navy-400 text-xs">Address</p>
                      <p className="text-white text-sm">IPBM, Brand Market Research Bureau, Raghavendra Nagar Colony, Uppal, Hyderabad - 500039</p>
                    </div>
                  </div>
                </div> */}
                {/* Quick-reply options - updated with brochure numbers */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 w-full">
              <p className="text-navy-400 text-xs uppercase tracking-wide font-medium mb-3">
                Quick Connect
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href="https://wa.me/919866739499"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with IPBM admissions on WhatsApp"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/25 text-[#25D366] text-sm font-semibold hover:bg-[#25D366]/20 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900 group"
                >
                  <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                  <svg className="w-3 h-3 ml-auto group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="tel:9704859888"
                  aria-label="Call IPBM admissions"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-navy-200 text-sm font-semibold hover:bg-white/10 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#eb4800] focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900 group"
                >
                  <svg className="w-4 h-4 shrink-0 text-[#eb4800]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Admissions Desk
                  <svg className="w-3 h-3 ml-auto group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
              <p className="text-xs text-navy-500 mt-3 pt-2 border-t border-white/10 text-center">
                Program Fee: ₹50,000 + GST · EMI options available
              </p>
            </div>

                <div className="w-full mt-6 pt-4 border-t border-white/10">
                  <div className="bg-white/5 border-[0.5px] border-white/10 rounded-xl p-4 text-center">
                    <p className="text-[#eb4800] text-sm font-semibold">📅 Program starts 4th June 2026</p>
                    <p className="text-navy-400 text-xs mt-1">45 Days · 3 Hours/Day · Online & Offline Modes</p>
                    <p className="text-navy-400 text-xs mt-2">Zero Textbooks · 100% Industry Expert Faculty</p>
                  </div>
                </div>
              </div>

              {/* 
                ============================================================
                ORIGINAL FORM CODE IS COMMENTED OUT BELOW
                ============================================================
              */}
              {/* 
              {status === "sent" ? (
                <div className="flex flex-col items-center justify-center h-full py-8 sm:py-12 text-center">
                  ...
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate aria-label="Admissions enquiry form">
                  <StepDots current={step} />
                  {step === 0 && (...)}
                  {step === 1 && (...)}
                  {step === 2 && (...)}
                  <div className={`flex gap-3 mt-6 ${step > 0 ? "justify-between" : "justify-end"}`}>
                    ...
                  </div>
                </form>
              )}
              */}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes floatPt {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
          50% { transform: translateY(-30px) translateX(12px); opacity: 0.6; }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-ping, .animate-spin, .animate-pulse, [style*="animation"] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}