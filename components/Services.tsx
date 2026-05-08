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
    isDark: true,
  },
  {
    tag: "Popular",
    title: "PGDM – Post Graduate Diploma",
    duration: "1 Year",
    mode: "Full-time / Part-time",
    seats: "80 seats",
    highlights: ["Business Analytics", "Operations", "Entrepreneurship", "Digital Marketing"],
    isDark: false,
  },
  {
    tag: "Executive",
    title: "Executive MBA",
    duration: "18 Months",
    mode: "Weekend / Online",
    seats: "40 seats",
    highlights: ["Leadership Development", "Corporate Finance", "Supply Chain", "Innovation Strategy"],
    isDark: false,
  },
  {
    tag: "Certificate",
    title: "Short-Term Certification",
    duration: "3–6 Months",
    mode: "Online & Offline",
    seats: "Open enrollment",
    highlights: ["Sales Leadership", "Financial Modeling", "Brand Management", "Startup Fundamentals"],
    isDark: false,
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
      className="py-16 sm:py-20 lg:py-28 bg-navy-900 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto pl-0 md:pl-20 xl:pl-24">
        {/* Header */}
        <div
          className={`text-center mb-10 sm:mb-14 lg:mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-gold-500 font-semibold text-sm tracking-widest uppercase mb-3">
            Our Programs
          </p>
          <h2
            id="services-heading"
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 text-balance"
          >
            Education Designed for{" "}
            <span className="text-gold-400">Real Careers</span>
          </h2>
          <p className="text-navy-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto text-pretty">
            Every program is meticulously designed with industry input to ensure
            you graduate ready—not just qualified.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {programs.map((prog, i) => (
            <article
              key={prog.title}
              aria-label={prog.title}
              className={`relative rounded-2xl p-5 sm:p-6 border flex flex-col transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 ${
                prog.isDark
                  ? "bg-gradient-to-b from-navy-800 to-navy-700 border-white/10"
                  : "bg-gradient-to-b from-white to-navy-50 border-navy-100"
              } ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: visible ? `${i * 100}ms` : "0ms" }}
            >
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full self-start mb-4 ${
                  prog.isDark
                    ? "bg-gold-500 text-white"
                    : "bg-navy-100 text-navy-800"
                }`}
              >
                {prog.tag}
              </span>

              <h3
                className={`font-display font-bold text-base sm:text-lg leading-tight mb-3 ${
                  prog.isDark ? "text-white" : "text-navy-900"
                }`}
              >
                {prog.title}
              </h3>

              {/* Meta info */}
              <div
                className={`flex flex-wrap gap-x-3 gap-y-1 text-xs mb-4 ${
                  prog.isDark ? "text-navy-300" : "text-navy-500"
                }`}
              >
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {prog.duration}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {prog.mode}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  {prog.seats}
                </span>
              </div>

              {/* Highlights */}
              <ul className="space-y-1.5 flex-1" aria-label="Program highlights">
                {prog.highlights.map((h) => (
                  <li
                    key={h}
                    className={`text-xs sm:text-sm flex items-center gap-2 ${
                      prog.isDark ? "text-navy-200" : "text-navy-600"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        prog.isDark ? "bg-gold-400" : "bg-navy-400"
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
                className={`mt-5 sm:mt-6 inline-flex items-center gap-1 text-sm font-semibold transition-colors hover:underline focus:outline-none focus:underline ${
                  prog.isDark ? "text-gold-400" : "text-navy-700"
                }`}
              >
                Apply Now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
