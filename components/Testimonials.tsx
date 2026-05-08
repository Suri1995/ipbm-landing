"use client";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    name: "Kavya Sharma",
    role: "Product Manager, Google India",
    batch: "MBA 2019",
    initials: "KS",
    quote:
      "IPBM didn't just teach me business — it taught me how to think. The case-based learning and direct mentorship from industry leaders gave me an edge I could feel from day one at Google.",
    rating: 5,
  },
  {
    name: "Rahul Desai",
    role: "VP – Operations, Flipkart",
    batch: "PGDM 2017",
    initials: "RD",
    quote:
      "The placement cell at IPBM is phenomenal. Within two months of graduation I had three offers. The faculty's real-world experience made every class feel like a boardroom session.",
    rating: 5,
  },
  {
    name: "Ananya Krishnan",
    role: "Founder, GreenVentures",
    batch: "MBA 2021",
    initials: "AK",
    quote:
      "IPBM's entrepreneurship program was the catalyst for my startup. Prof. Lakshmi's guidance and the incubation support helped me raise my seed round within 6 months of graduating.",
    rating: 5,
  },
  {
    name: "Mohammed Ali",
    role: "Senior Analyst, Goldman Sachs",
    batch: "Executive MBA 2022",
    initials: "MA",
    quote:
      "The Executive MBA fit perfectly around my work schedule. The finance curriculum is rigorous and completely aligned with what I encounter in investment banking every day.",
    rating: 5,
  },
  {
    name: "Preethi Nambiar",
    role: "Brand Lead, HUL",
    batch: "MBA 2020",
    initials: "PN",
    quote:
      "Marketing at IPBM was transformative. Dr. Priya brought real campaign briefs and live client projects into class. By graduation, I already had a portfolio that impressed HUL's panel.",
    rating: 5,
  },
  {
    name: "Siddharth Rao",
    role: "CFO, Series B Startup",
    batch: "PGDM 2018",
    initials: "SR",
    quote:
      "The financial modelling workshops and the mentors from industry helped me build skills that directly translate to my CFO role today. Best investment I ever made.",
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Rating: ${count} out of 5 stars`} role="img">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-gold-500 fill-current" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
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
      id="testimonials"
      ref={ref}
      aria-labelledby="testimonials-heading"
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
            Alumni Voices
          </p>
          <h2
            id="testimonials-heading"
            className="font-display text-3xl sm:text-4xl font-bold text-white mb-4 text-balance"
          >
            What Our Graduates{" "}
            <em className="not-italic text-gold-400">Actually Say</em>
          </h2>
          <p className="text-navy-300 text-base sm:text-lg max-w-2xl mx-auto">
            Over 12,000 alumni across India and the world — here's what
            some of them have shared.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 sm:gap-6 space-y-5 sm:space-y-6">
          {testimonials.map((t, i) => (
            <article
              key={t.name}
              aria-label={`Testimonial from ${t.name}`}
              className={`break-inside-avoid bg-white/6 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-gold-500/30 transition-all duration-300 ${
                visible
                  ? `opacity-100 translate-y-0 [transition-delay:${i * 70}ms]`
                  : "opacity-0 translate-y-8"
              }`}
            >
              <StarRating count={t.rating} />

              <blockquote className="mt-4 mb-5">
                <p className="text-navy-100 text-sm leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-navy-950 font-display font-bold text-sm flex-shrink-0"
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{t.name}</p>
                  <p className="text-navy-400 text-xs">
                    {t.role} · {t.batch}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
