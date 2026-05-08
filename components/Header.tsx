"use client";
import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-navy-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a
            href="/"
            aria-label="Institute of Practical Business Management – Home"
            className="flex items-center gap-3 group"
          >
            {/* Emblem */}
            <div
              className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-navy-600 rounded-lg rotate-3 group-hover:rotate-6 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center font-display font-bold text-white text-lg sm:text-xl">
                IP
              </div>
            </div>
            {/* Text */}
            <div className="flex flex-col leading-tight">
              <span className="font-display font-bold text-navy-950 text-sm sm:text-base tracking-tight">
                Institute of Practical
              </span>
              <span className="font-body text-xs sm:text-sm font-medium text-gold-600 tracking-widest uppercase">
                Business Management
              </span>
            </div>
          </a>

          {/* Phone CTA */}
          <a
            href="tel:+919876543210"
            aria-label="Call us at +91 98765 43210"
            className="group flex items-center gap-2 bg-navy-600 hover:bg-navy-700 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-navy-glow focus:outline-none focus:ring-2 focus:ring-navy-500 focus:ring-offset-2"
          >
            <svg
              className="w-4 h-4 group-hover:animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span className="hidden sm:inline">+91 98765 43210</span>
            <span className="sm:hidden">Call Us</span>
          </a>
        </div>
      </div>
    </header>
  );
}
