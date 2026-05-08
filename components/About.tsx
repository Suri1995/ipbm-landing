"use client";
import { useEffect, useRef, useState } from "react";

const pillars = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: "Industry-Aligned Curriculum",
    description:
      "Programs built with CXOs and HR leaders to ensure every lesson maps to real business challenges.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Mentorship Network",
    description:
      "One-on-one guidance from 80+ active industry professionals across sectors.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "Career Acceleration",
    description:
      "Dedicated placement cell, mock interviews, and corporate tie-ups to launch your career fast.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Global Perspective",
    description:
      "International case studies, exchange programs, and a diverse cohort from across India.",
  },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      aria-labelledby="about-heading"
      className="py-16 sm:py-20 lg:py-28 bg-cream px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-start">
          {/* Left text */}
          <div
            className={`transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-gold-600 font-semibold text-sm tracking-widest uppercase mb-3">
              Who We Are
            </p>
            <h2
              id="about-heading"
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-900 mb-5 sm:mb-6 leading-tight text-balance"
            >
              More Than an Institute —{" "}
              <span className="text-navy-600">A Launchpad</span>
            </h2>
            <p className="text-navy-600 leading-relaxed mb-4 sm:mb-5 text-sm sm:text-base">
              Founded in 2009, the Institute of Practical Business Management
              has been redefining management education in India. We believe that
              true business acumen is forged through practice, not just theory.
              Our classrooms are laboratories of real business scenarios.
            </p>
            <p className="text-navy-600 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
              Recognised by leading industry bodies and consistently ranked
              among the top management institutes in South India, IPBM has
              placed over 12,000 graduates into roles across finance, marketing,
              operations, and entrepreneurship.
            </p>

            {/* Accreditations */}
            <div className="flex flex-wrap gap-2 sm:gap-3" role="list" aria-label="Accreditations">
              {["AICTE Approved", "ISO 9001:2015", "NAAC A+"].map((badge) => (
                <span
                  key={badge}
                  role="listitem"
                  className="bg-navy-600 text-white px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right pillars grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {pillars.map((p, i) => (
              <article
                key={p.title}
                className={`bg-white border border-navy-100 rounded-2xl p-5 sm:p-6 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: visible ? `${100 + i * 80}ms` : "0ms" }}
              >
                <div className="w-10 h-10 bg-gold-100 text-gold-600 rounded-xl flex items-center justify-center mb-3" aria-hidden="true">
                  {p.icon}
                </div>
                <h3 className="font-display font-semibold text-navy-900 text-sm sm:text-base mb-2">
                  {p.title}
                </h3>
                <p className="text-navy-500 text-xs sm:text-sm leading-relaxed">
                  {p.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
