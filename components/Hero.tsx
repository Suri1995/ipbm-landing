"use client";
import { useEffect, useState } from "react";

const stats = [
  { value: "15+", label: "Years of Excellence" },
  { value: "12K+", label: "Alumni Placed" },
  { value: "98%", label: "Placement Rate" },
  { value: "200+", label: "Industry Partners" },
];

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-screen flex items-center overflow-hidden bg-navy-900"
    >
      {/* Background grid pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gold accent blobs */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 right-0 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-gold-500 rounded-full opacity-10 blur-3xl translate-x-1/2"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-navy-500 rounded-full opacity-20 blur-3xl"
      />

      {/* Diagonal accent bar */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-b from-gold-600/10 to-transparent skew-x-6 translate-x-20 hidden sm:block"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          {/* Left content */}
          <div
            className={`transition-all duration-700 ${
              visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/40 text-gold-300 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-5 sm:mb-6 lg:mb-8">
              <span
                className="w-2 h-2 bg-gold-400 rounded-full animate-pulse"
                aria-hidden="true"
              />
              Admissions Open 2025–26
            </div>

            <h1
              id="hero-heading"
              className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4 sm:mb-5 lg:mb-6 text-balance"
            >
              Shape Tomorrow&apos;s{" "}
              <span className="text-gold-400 italic">Business Leaders</span>{" "}
              Today
            </h1>

            <p className="text-navy-200 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 lg:mb-10 max-w-xl text-pretty">
              The Institute of Practical Business Management delivers
              career-transforming education through hands-on learning,
              real-world case studies, and deep industry connections. Your
              journey to leadership starts here.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-white font-semibold px-5 sm:px-6 py-3 sm:py-3.5 rounded-full transition-all duration-200 hover:shadow-gold-glow focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-navy-900 text-sm sm:text-base"
                aria-label="Enroll now – go to contact section"
              >
                Enroll Now
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white/60 text-white hover:bg-white/5 font-medium px-5 sm:px-6 py-3 sm:py-3.5 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-navy-900 text-sm sm:text-base"
                aria-label="Learn more about our institute"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Right – floating card */}
          <div
            className={`hidden lg:block transition-all duration-700 delay-200 ${
              visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            aria-hidden="true"
          >
            <div className="relative">
              {/* Main card */}
              <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-2xl p-6 xl:p-8 animate-float">
                <div className="flex items-center gap-3 mb-5 xl:mb-6">
                  <div className="w-10 h-10 bg-gold-500 rounded-xl flex items-center justify-center font-display font-bold text-white">
                    IP
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">IPBM</p>
                    <p className="text-navy-300 text-xs">
                      Excellence in Business Education
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 xl:gap-3 mb-5 xl:mb-6">
                  {[
                    "Strategic Leadership",
                    "Financial Mastery",
                    "Marketing & Branding",
                    "Operations Mgmt",
                  ].map((item) => (
                    <div
                      key={item}
                      className="bg-white/8 border border-white/10 rounded-xl p-2.5 xl:p-3 text-center"
                    >
                      <p className="text-white text-xs font-medium">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between bg-gold-500/15 border border-gold-500/30 rounded-xl p-3">
                  <span className="text-gold-300 text-xs sm:text-sm font-medium">
                    Next Batch Starts
                  </span>
                  <span className="text-gold-400 text-xs sm:text-sm font-bold">
                    July 2025
                  </span>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-3 -right-3 xl:-top-4 xl:-right-4 bg-gold-500 text-white rounded-full p-2.5 xl:p-3 shadow-lg animate-float [animation-delay:2s]">
                <svg
                  className="w-4 h-4 xl:w-5 xl:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-10 sm:mt-12 lg:mt-16 transition-all duration-700 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5"
            >
              <p className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-gold-400">
                {stat.value}
              </p>
              <p className="text-navy-300 text-xs sm:text-sm mt-0.5 sm:mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-white/40 text-xs hidden sm:flex"
      >
        <span>Scroll</span>
        <div className="w-px h-8 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white/60 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
