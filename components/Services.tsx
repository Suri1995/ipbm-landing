"use client";
import { useEffect, useRef, useState } from "react";

const programs = [
  {
    tag: "Flagship",
    title: "MBA in Business Management",
    duration: "2 Years",
    mode: "Full-time",
    seats: "60 seats",
    highlights: ["Strategic Management", "Finance & Accounting", "HR Management", "Marketing Strategy"],
    color: "from-navy-950 to-navy-800",
    accent: "text-gold-400",
    badge: "bg-gold-500 text-navy-950",
  },
  {
    tag: "Popular",
    title: "PGDM – Post Graduate Diploma",
    duration: "1 Year",
    mode: "Full-time / Part-time",
    seats: "80 seats",
    highlights: ["Business Analytics", "Operations", "Entrepreneurship", "Digital Marketing"],
    color: "from-white to-navy-50",
    accent: "text-navy-800",
    badge: "bg-navy-100 text-navy-800",
  },
  {
    tag: "Executive",
    title: "Executive MBA",
    duration: "18 Months",
    mode: "Weekend / Online",
    seats: "40 seats",
    highlights: ["Leadership Development", "Corporate Finance", "Supply Chain", "Innovation Strategy"],
    color: "from-white to-navy-50",
    accent: "text-navy-800",
    badge: "bg-navy-100 text-navy-800",
  },
  {
    tag: "Certificate",
    title: "Short-Term Certification",
    duration: "3–6 Months",
    mode: "Online & Offline",
    seats: "Open enrollment",
    highlights: ["Sales Leadership", "Financial Modeling", "Brand Management", "Startup Fundamentals"],
    color: "from-white to-navy-50",
    accent: "text-navy-800",
    badge: "bg-navy-100 text-navy-800",
  },
];

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

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
      id="services"
      ref={ref}
      aria-labelledby="services-heading"
      className="py-20 sm:py-28 bg-navy-950 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto pl-0 md:pl-20 xl:pl-24">
        {/* Header */}
        <div
          className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-gold-500 font-semibold text-sm tracking-widest uppercase mb-3">
            Our Programs
          </p>
          <h2
            id="services-heading"
            className="font-display text-3xl sm:text-4xl font-bold text-white mb-4 text-balance"
          >
            Education Designed for{" "}
            <em className="not-italic text-gold-400">Real Careers</em>
          </h2>
          <p className="text-navy-300 text-base sm:text-lg max-w-2xl mx-auto">
            Every program is meticulously designed with industry input to ensure
            you graduate ready—not just qualified.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6">
          {programs.map((prog, i) => {
            const isDark = prog.color.includes("navy-950");
            return (
              <article
                key={prog.title}
                aria-label={prog.title}
                className={`relative bg-gradient-to-b ${prog.color} rounded-2xl p-6 border ${
                  isDark ? "border-white/10" : "border-navy-100"
                } hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col ${
                  visible
                    ? `opacity-100 translate-y-0 [transition-delay:${i * 100}ms]`
                    : "opacity-0 translate-y-8"
                }`}
              >
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full self-start mb-4 ${prog.badge}`}
                >
                  {prog.tag}
                </span>

                <h3
                  className={`font-display font-bold text-lg leading-tight mb-3 ${
                    isDark ? "text-white" : "text-navy-950"
                  }`}
                >
                  {prog.title}
                </h3>

                {/* Meta info */}
                <div
                  className={`flex flex-wrap gap-x-4 gap-y-1 text-xs mb-4 ${
                    isDark ? "text-navy-300" : "text-navy-500"
                  }`}
                >
                  <span>⏱ {prog.duration}</span>
                  <span>📍 {prog.mode}</span>
                  <span>🎓 {prog.seats}</span>
                </div>

                {/* Highlights */}
                <ul className="space-y-1.5 flex-1" aria-label="Program highlights">
                  {prog.highlights.map((h) => (
                    <li
                      key={h}
                      className={`text-sm flex items-center gap-2 ${
                        isDark ? "text-navy-200" : "text-navy-600"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          isDark ? "bg-gold-400" : "bg-navy-400"
                        }`}
                        aria-hidden="true"
                      />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contact"
                  aria-label={`Apply for ${prog.title}`}
                  className={`mt-6 inline-flex items-center gap-1 text-sm font-semibold transition-colors ${prog.accent} hover:underline focus:outline-none focus:underline`}
                >
                  Apply Now →
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
