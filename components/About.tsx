"use client";
import { useEffect, useRef, useState } from "react";

const pillars = [
  {
    icon: "🏛️",
    title: "Industry-Aligned Curriculum",
    description:
      "Programs built with CXOs and HR leaders to ensure every lesson maps to real business challenges.",
  },
  {
    icon: "🤝",
    title: "Mentorship Network",
    description:
      "One-on-one guidance from 80+ active industry professionals across sectors.",
  },
  {
    icon: "🚀",
    title: "Career Acceleration",
    description:
      "Dedicated placement cell, mock interviews, and corporate tie-ups to launch your career fast.",
  },
  {
    icon: "🌐",
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
      className="py-20 sm:py-28 bg-cream px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto pl-0 md:pl-20 xl:pl-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
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
              className="font-display text-3xl sm:text-4xl font-bold text-navy-950 mb-6 leading-tight text-balance"
            >
              More Than an Institute —{" "}
              <em className="not-italic text-navy-700">A Launchpad</em>
            </h2>
            <p className="text-navy-600 leading-relaxed mb-6">
              Founded in 2009, the Institute of Practical Business Management
              has been redefining management education in India. We believe that
              true business acumen is forged through practice, not just theory.
              Our classrooms are laboratories of real business scenarios.
            </p>
            <p className="text-navy-600 leading-relaxed mb-8">
              Recognised by leading industry bodies and consistently ranked
              among the top management institutes in South India, IPBM has
              placed over 12,000 graduates into roles across finance, marketing,
              operations, and entrepreneurship.
            </p>

            {/* Accreditations */}
            <div className="flex flex-wrap gap-3">
              {["AICTE Approved", "ISO 9001:2015", "NAAC A+"].map((badge) => (
                <span
                  key={badge}
                  className="bg-navy-600 text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-navy-500"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right pillars grid */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            {pillars.map((p, i) => (
              <div
                key={p.title}
                className={`bg-white border border-navy-100 rounded-2xl p-5 sm:p-6 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 ${
                  visible
                    ? `opacity-100 translate-y-0 [transition-delay:${100 + i * 80}ms]`
                    : "opacity-0 translate-y-6"
                }`}
              >
                <span className="text-2xl mb-3 block" role="img" aria-label={p.title}>
                  {p.icon}
                </span>
                <h3 className="font-display font-semibold text-navy-950 text-base mb-2">
                  {p.title}
                </h3>
                <p className="text-navy-500 text-sm leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
