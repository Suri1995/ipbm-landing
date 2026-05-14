"use client";

import { useEffect, useRef, useState, FormEvent, useCallback, useMemo } from "react";

const contactDetails = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Address",
    value: "12, Institutional Area, Madhapur, Hyderabad – 500081, Telangana",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Phone",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email",
    value: "admissions@ipbm.edu.in",
    href: "mailto:admissions@ipbm.edu.in",
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

const socialLinks = [
  {
    name: "LinkedIn",
    abbr: "Li",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    abbr: "Ig",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    abbr: "Yt",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    abbr: "Fb",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

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
    <span className="font-semibold text-gold-400">{count}</span>
  );
};

// ── Countdown to Aug 2026 intake ──────────────────────────────────────────
const IntakeCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date("2026-08-01T00:00:00");
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

// ── Step indicator for multi-step form ────────────────────────────────────
const steps = ["You", "Interest", "Message"];

const StepDots = ({ current }: { current: number }) => (
  <div className="flex items-center gap-2 mb-6" role="progressbar" aria-valuenow={current + 1} aria-valuemin={1} aria-valuemax={steps.length} aria-label={`Step ${current + 1} of ${steps.length}: ${steps[current]}`}>
    {steps.map((s, i) => (
      <div key={s} className="flex items-center gap-2">
        <div className="flex flex-col items-center gap-1">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
              i < current
                ? "bg-gold-500 text-white scale-90"
                : i === current
                ? "bg-gold-500 text-white ring-4 ring-gold-500/25"
                : "bg-white/10 text-navy-400"
            }`}
            aria-hidden="true"
          >
            {i < current ? (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              i + 1
            )}
          </div>
          <span className={`text-xs transition-colors duration-300 ${i === current ? "text-gold-400" : "text-navy-500"}`}>
            {s}
          </span>
        </div>
        {i < steps.length - 1 && (
          <div className={`h-px w-8 mb-4 transition-all duration-500 ${i < current ? "bg-gold-500" : "bg-white/10"}`} aria-hidden="true" />
        )}
      </div>
    ))}
  </div>
);

// ── Field wrapper ────────────────────────────────────────────────────────
const Field = ({
  id, label, required, children, hint,
}: {
  id: string; label: string; required?: boolean; children: React.ReactNode; hint?: string;
}) => (
  <div className="relative">
    <label htmlFor={id} className="block text-navy-200 text-sm font-medium mb-1.5">
      {label}
      {required && <span aria-hidden="true" className="text-gold-400 ml-0.5">*</span>}
      {required && <span className="sr-only">(required)</span>}
    </label>
    {children}
    {hint && <p className="mt-1 text-xs text-navy-500">{hint}</p>}
  </div>
);

// ── Input / Select base classes ───────────────────────────────────────────
const inputCls =
  "w-full bg-white/8 border border-white/15 text-white placeholder-navy-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all hover:border-white/25";
const selectCls =
  "w-full bg-navy-800 border border-white/15 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all appearance-none cursor-pointer hover:border-white/25";

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
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", program: "", message: "",
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof typeof form, boolean>>>({});

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

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
      if (errors[name as keyof typeof form]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  }, []);

  const validateStep = useCallback(
    (s: number): boolean => {
      const errs: Partial<typeof form> = {};
      if (s === 0) {
        if (!form.name.trim()) errs.name = "Full name is required.";
        if (!form.email.trim()) errs.email = "Email address is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
          errs.email = "Please enter a valid email.";
      }
      setErrors(errs);
      return Object.keys(errs).length === 0;
    },
    [form]
  );

  const nextStep = useCallback(() => {
    if (validateStep(step)) setStep((s) => s + 1);
  }, [step, validateStep]);

  const prevStep = useCallback(() => setStep((s) => Math.max(0, s - 1)), []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep(step)) return;
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("sent");
  };

  const resetForm = useCallback(() => {
    setStatus("idle");
    setStep(0);
    setErrors({});
    setTouched({});
    setForm({ name: "", email: "", phone: "", program: "", message: "" });
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
            backgroundImage: "radial-gradient(circle at 2px 2px, rgba(212,175,55,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-navy-600/20 rounded-full blur-3xl" />
        {/* Deterministic particles — SSR-safe */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-gold-400/8"
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
          <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-4 py-1.5 mb-4">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-400" />
            </span>
            <span className="text-gold-400 text-xs font-medium tracking-wide">
              <LiveEnquiries /> people enquired this week
            </span>
          </div>

          <p className="text-gold-500 font-semibold text-sm tracking-widest uppercase mb-3">
            Admissions &amp; Enquiries
          </p>

          <h2
            id="contact-heading"
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 text-balance"
          >
            Start Your Journey{" "}
            <span className="text-gold-400">With IPBM</span>
          </h2>

          <p className="text-navy-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto text-pretty">
            Be part of our <strong className="text-white">inaugural 2026 cohort</strong>. Fill in the
            form and our admissions counsellor will connect within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-10 xl:gap-12">

          {/* ── Left info panel ── */}
          <div
            className={`lg:col-span-2 flex flex-col gap-5 sm:gap-6 transition-all duration-700 delay-100 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Intake countdown card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5">
              <p className="text-navy-400 text-xs uppercase tracking-wide font-medium mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-pulse" aria-hidden="true" />
                Inaugural Intake — Aug 2026
              </p>
              <IntakeCountdown />
              <div className="mt-3 h-px bg-gradient-to-r from-gold-500/40 to-transparent" aria-hidden="true" />
              <p className="mt-3 text-xs text-navy-400">Applications close 30 July 2026.</p>
            </div>

            {/* Contact details */}
            {contactDetails.map((item, i) => (
              <div
                key={item.label}
                className={`flex items-start gap-3 sm:gap-4 transition-all duration-500 ${
                  visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                }`}
                style={{ transitionDelay: `${200 + i * 80}ms` }}
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gold-500/15 border border-gold-500/30 rounded-xl flex items-center justify-center text-gold-400 flex-shrink-0 transition-all duration-300 hover:bg-gold-500/25 hover:scale-105">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-navy-400 text-xs uppercase tracking-wide font-medium mb-0.5">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-white text-sm hover:text-gold-400 transition-colors focus:outline-none focus:underline break-words"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-white text-sm break-words">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Quick-reply options */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5">
              <p className="text-navy-400 text-xs uppercase tracking-wide font-medium mb-3">
                Quick Connect
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href="https://wa.me/919876543210"
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
                  href="tel:+919876543210"
                  aria-label="Call IPBM admissions"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-navy-200 text-sm font-semibold hover:bg-white/10 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900 group"
                >
                  <svg className="w-4 h-4 shrink-0 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Admissions Desk
                  <svg className="w-3 h-3 ml-auto group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Social links */}
            <div>
              <p className="text-navy-400 text-xs uppercase tracking-wide font-medium mb-3">
                Follow Us
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3" role="list" aria-label="Social media links">
                {socialLinks.map((s) => (
                  <a
                    key={s.name}
                    href="#"
                    role="listitem"
                    aria-label={`Follow IPBM on ${s.name}`}
                    className="w-9 h-9 bg-white/8 border border-white/15 rounded-xl flex items-center justify-center text-navy-300 hover:bg-gold-500 hover:text-white hover:border-gold-500 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Form panel ── */}
          <div
            className={`lg:col-span-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 sm:p-6 lg:p-8 transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {status === "sent" ? (
              /* ── Success state ── */
              <div className="flex flex-col items-center justify-center h-full py-8 sm:py-12 text-center">
                <div
                  className="w-14 h-14 sm:w-16 sm:h-16 bg-gold-500 rounded-full flex items-center justify-center mb-4 animate-bounce-once"
                  aria-hidden="true"
                >
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <div className="flex gap-1.5 mb-4" aria-hidden="true">
                  {["bg-gold-400","bg-navy-300","bg-gold-600","bg-white/40","bg-gold-300"].map((c,i) => (
                    <span key={i} className={`w-2 h-2 rounded-full ${c}`} style={{ animation: `confettiPop .5s ease ${i * 80}ms both` }} />
                  ))}
                </div>

                <h3 className="font-display font-bold text-white text-xl sm:text-2xl mb-2">
                  Enquiry Received!
                </h3>
                <p className="text-navy-300 text-sm max-w-sm mb-1">
                  Thank you,{" "}
                  <strong className="text-white">{form.name}</strong>. Our
                  admissions team will contact you within{" "}
                  <strong className="text-gold-400">24 hours</strong>.
                </p>
                <p className="text-navy-500 text-xs max-w-xs mb-6">
                  A confirmation has been sent to{" "}
                  <span className="text-navy-300">{form.email}</span>.
                </p>

                <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-xl p-4 text-left mb-6">
                  <p className="text-gold-400 text-xs font-semibold uppercase tracking-wide mb-3">
                    What happens next?
                  </p>
                  {[
                    "Our counsellor calls you within 24 hours",
                    "Receive your personalised programme brochure",
                    "Schedule a campus or virtual tour",
                    "Complete your application for Aug 2026 intake",
                  ].map((s, i) => (
                    <div key={s} className="flex items-start gap-2.5 mb-2 last:mb-0">
                      <span className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                      <p className="text-navy-300 text-xs leading-relaxed">{s}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={resetForm}
                  className="text-gold-400 text-sm hover:text-gold-300 underline focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded"
                >
                  Submit another enquiry
                </button>
              </div>
            ) : (
              /* ── Multi-step form ── */
              <form onSubmit={handleSubmit} noValidate aria-label="Admissions enquiry form">

                <StepDots current={step} />

                {/* Step 0 — Personal details */}
                {step === 0 && (
                  <div className="space-y-4">
                    <p className="text-white text-sm font-semibold mb-4">Tell us about yourself</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field id="name" label="Full Name" required>
                        <input
                          id="name" name="name" type="text" required autoComplete="name"
                          value={form.name} onChange={handleChange} onBlur={handleBlur}
                          placeholder="Your full name"
                          className={inputCls}
                          aria-describedby={errors.name ? "name-err" : undefined}
                          aria-invalid={!!errors.name}
                        />
                        {errors.name && (
                          <p id="name-err" role="alert" className="mt-1 text-xs text-red-400 flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                            {errors.name}
                          </p>
                        )}
                      </Field>
                      <Field id="email" label="Email Address" required>
                        <input
                          id="email" name="email" type="email" required autoComplete="email"
                          value={form.email} onChange={handleChange} onBlur={handleBlur}
                          placeholder="you@email.com"
                          className={inputCls}
                          aria-describedby={errors.email ? "email-err" : undefined}
                          aria-invalid={!!errors.email}
                        />
                        {errors.email && (
                          <p id="email-err" role="alert" className="mt-1 text-xs text-red-400 flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                            {errors.email}
                          </p>
                        )}
                      </Field>
                    </div>
                    <Field id="phone" label="Phone Number">
                      <input
                        id="phone" name="phone" type="tel" autoComplete="tel"
                        value={form.phone} onChange={handleChange} onBlur={handleBlur}
                        placeholder="+91 XXXXX XXXXX"
                        className={inputCls}
                      />
                    </Field>
                  </div>
                )}

                {/* Step 1 — Programme interest */}
                {step === 1 && (
                  <div className="space-y-4">
                    <p className="text-white text-sm font-semibold mb-4">Which programme interests you?</p>
                    <div className="grid grid-cols-1 gap-3" role="group" aria-label="Select programme of interest">
                      {[
                        { val: "mba",  label: "MBA in Business Management",  sub: "2 Years · Full-time · Aug 2026" },
                        { val: "pgdm", label: "PGDM – Post Graduate Diploma", sub: "1 Year · Full-time / Part-time · Aug 2026" },
                        { val: "emba", label: "Executive MBA",                sub: "18 Months · Weekend / Online · Sep 2026" },
                        { val: "cert", label: "Short-Term Certification",     sub: "3–6 Months · Online & Offline · Rolling" },
                      ].map((opt) => (
                        <label
                          key={opt.val}
                          className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all duration-200 group ${
                            form.program === opt.val
                              ? "border-gold-500/60 bg-gold-500/10"
                              : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8"
                          }`}
                        >
                          <input
                            type="radio" name="program" value={opt.val}
                            checked={form.program === opt.val}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <span
                            className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                              form.program === opt.val ? "border-gold-500 bg-gold-500" : "border-white/30"
                            }`}
                            aria-hidden="true"
                          >
                            {form.program === opt.val && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                          </span>
                          <div>
                            <p className={`text-sm font-semibold transition-colors ${form.program === opt.val ? "text-gold-400" : "text-white"}`}>
                              {opt.label}
                            </p>
                            <p className="text-navy-400 text-xs mt-0.5">{opt.sub}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2 — Message */}
                {step === 2 && (
                  <div className="space-y-4">
                    <p className="text-white text-sm font-semibold mb-4">Any questions or context for us?</p>
                    <Field id="message" label="Message / Questions" hint="Tell us about your background, goals, or anything else we should know.">
                      <textarea
                        id="message" name="message" rows={5}
                        value={form.message} onChange={handleChange} onBlur={handleBlur}
                        placeholder="e.g. I have 3 years of sales experience and want to move into marketing leadership..."
                        className={`${inputCls} resize-none`}
                      />
                    </Field>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-4" aria-label="Review your details">
                      <p className="text-navy-400 text-xs uppercase tracking-wide font-medium mb-3">Review your details</p>
                      <dl className="space-y-1.5">
                        {[
                          { dt: "Name",    dd: form.name  || "—" },
                          { dt: "Email",   dd: form.email || "—" },
                          { dt: "Phone",   dd: form.phone || "—" },
                          { dt: "Program", dd: { mba:"MBA in Business Management", pgdm:"PGDM", emba:"Executive MBA", cert:"Short-Term Certification" }[form.program] || "—" },
                        ].map(({ dt, dd }) => (
                          <div key={dt} className="flex items-start gap-2 text-xs">
                            <dt className="text-navy-400 w-16 shrink-0">{dt}</dt>
                            <dd className="text-white">{dd}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                )}

                {/* Navigation buttons */}
                <div className={`flex gap-3 mt-6 ${step > 0 ? "justify-between" : "justify-end"}`}>
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-5 py-2.5 rounded-full border border-white/15 text-navy-200 text-sm font-semibold hover:bg-white/8 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
                    >
                      ← Back
                    </button>
                  )}

                  {step < steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="ml-auto px-6 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-white text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900 flex items-center gap-2 group"
                    >
                      Continue
                      <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      aria-disabled={status === "sending"}
                      className="ml-auto w-full sm:w-auto px-8 py-3 rounded-full bg-gold-500 hover:bg-gold-400 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900 flex items-center justify-center gap-2"
                    >
                      {status === "sending" ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          <span>Sending...</span>
                        </>
                      ) : (
                        "Submit Enquiry →"
                      )}
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes floatPt {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
          50% { transform: translateY(-30px) translateX(12px); opacity: 0.6; }
        }
        @keyframes confettiPop {
          0% { transform: scale(0) translateY(10px); opacity: 0; }
          60% { transform: scale(1.3) translateY(-4px); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes bounce-once {
          0%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        .animate-bounce-once { animation: bounce-once .7s ease both; }
        @media (prefers-reduced-motion: reduce) {
          .animate-ping, .animate-spin, .animate-bounce-once, .animate-pulse, [style*="animation"] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}