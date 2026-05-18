"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Header() {

  return (
    <header
      role="banner"
      className="fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          {/* Logo */}
          <a>
            <Image
            src="/ipbm-logo.png"
            alt="Logo"
            width={350}
            height={40}
            className="w-40 sm:w-80"
            priority
            />
          </a>

          {/* Phone CTA */}
          <a
            href="tel:+919876543210"
            aria-label="Call us at +91 98765 43210"
            className="group flex items-center gap-1.5 sm:gap-2 bg-navy-600 hover:bg-navy-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 hover:shadow-navy-glow focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-offset-2"
          >
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:animate-bounce"
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
