"use client";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    name: "Kavya Sharma",
    role: "Product Manager, Google India",
    batch: "Founding Batch 2026",
    initials: "KS",
    quote:
      "Being part of IPBM's first batch was a leap of faith that paid off immensely. The hands-on approach and real startup projects gave me confidence I couldn't have gained elsewhere.",
    rating: 5,
    isPioneer: true,
  },
  {
    name: "Rahul Desai",
    role: "Co-Founder, EduTech Startup",
    batch: "Founding Batch 2026",
    initials: "RD",
    quote:
      "IPBM's focus on practical business skills helped me launch my venture during the course itself. The mentorship network is incredible for first-time founders.",
    rating: 5,
    isPioneer: false,
  },
  {
    name: "Ananya Krishnan",
    role: "Growth Lead, Razorpay",
    batch: "Founding Batch 2026",
    initials: "AK",
    quote:
      "The curriculum at IPBM is built for the startup economy. Every concept we learned had immediate real-world application. Best decision I made for my career.",
    rating: 5,
    isPioneer: true,
  },
  {
    name: "Mohammed Ali",
    role: "Investment Analyst, VC Fund",
    batch: "Founding Batch 2026",
    initials: "MA",
    quote:
      "IPBM's finance modules are rigorous and practical. Within 3 months of graduating, I joined a VC fund evaluating startups — exactly what I was trained for.",
    rating: 5,
    isPioneer: false,
  },
  {
    name: "Preethi Nambiar",
    role: "Marketing Manager, D2C Brand",
    batch: "Founding Batch 2026",
    initials: "PN",
    quote:
      "The live projects with real startups gave me portfolio pieces that impressed every employer. IPBM truly understands what the industry needs today.",
    rating: 5,
    isPioneer: true,
  },
  {
    name: "Siddharth Rao",
    role: "Operations Head, Supply Chain Startup",
    batch: "Founding Batch 2026",
    initials: "SR",
    quote:
      "From day one, we were solving real business problems. The practical focus and industry connections at IPBM are unmatched for anyone serious about startups.",
    rating: 5,
    isPioneer: false,
  },
];

function StarRating({ count }: { count: number }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  return (
    <div 
      className="flex gap-0.5" 
      aria-label={`Rating: ${count} out of 5 stars`} 
      role="img"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {Array.from({ length: count }).map((_, i) => (
        <svg 
          key={i} 
          className="w-4 h-4 text-gold-500 fill-current transition-all duration-300 hover:scale-110 cursor-default" 
          viewBox="0 0 20 20" 
          aria-hidden="true"
          onMouseEnter={() => setHoveredIndex(i)}
          style={{
            filter: hoveredIndex !== null && hoveredIndex >= i ? "drop-shadow(0 0 3px rgba(212,175,55,0.5))" : "none"
          }}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// Animated testimonial card with 3D hover effect
const TestimonialCard = ({ testimonial, index, visible }: { testimonial: typeof testimonials[0]; index: number; visible: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Testimonial from ${testimonial.name}`}
      className={`relative bg-white/6 backdrop-blur-sm border border-white/10 rounded-2xl p-5 sm:p-6 transition-all duration-500 flex flex-col overflow-hidden group ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${isHovered ? "border-gold-500/40 shadow-[0_0_30px_rgba(212,175,55,0.1)]" : ""}`}
      style={{ 
        transitionDelay: visible ? `${index * 100}ms` : "0ms",
      }}
    >
      {/* Animated gradient overlay on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(212,175,55,0.08) 0%, transparent 70%)`,
        }}
      />

      {/* Shine effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

      {/* Pioneer badge for first batch */}
      {testimonial.isPioneer && (
        <div className="absolute top-4 right-4">
          <div className="bg-gold-500/20 border border-gold-500/40 text-gold-400 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse-slow">
            <span className="w-1 h-1 bg-gold-400 rounded-full animate-ping" />
            Pioneer
          </div>
        </div>
      )}

      {/* Quote icon */}
      <div className="absolute bottom-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      <StarRating count={testimonial.rating} />

      <blockquote className="mt-4 mb-5 flex-1 relative z-10">
        <p className="text-navy-100 text-xs sm:text-sm leading-relaxed">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </blockquote>

      <div className="flex items-center gap-3 pt-4 border-t border-white/10 relative z-10">
        <div
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-white font-display font-bold text-xs sm:text-sm flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
          aria-hidden="true"
        >
          {testimonial.initials}
        </div>
        <div className="min-w-0">
          <p className="text-white text-xs sm:text-sm font-semibold truncate group-hover:text-gold-400 transition-colors duration-300">
            {testimonial.name}
          </p>
          <p className="text-navy-400 text-xs truncate flex items-center gap-1">
            {testimonial.role}
            <span className="w-1 h-1 bg-navy-500 rounded-full" aria-hidden="true" />
            {testimonial.batch}
          </p>
        </div>
      </div>

      {/* Decorative corner */}
      <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-gold-500/10 group-hover:border-gold-500/30 transition-all duration-500" aria-hidden="true" />
    </article>
  );
};

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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
      className="py-7 sm:py-20 bg-navy-900 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 -left-32 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 -right-32 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />
        
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gold-400/5"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatParticle ${Math.random() * 10 + 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}

        {/* Subtle diagonal lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]" aria-hidden="true">
          <defs>
            <pattern id="diagonalPattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <line x1="0" y1="50" x2="50" y2="0" stroke="#C6A43F" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonalPattern)" />
        </svg>
      </div>

      <div className="max-w-7xl px-4 mx-auto relative z-10">
        {/* Header with animations */}
        <div
          className={`text-center mb-10 sm:mb-14 lg:mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Founding batch badge */}
          <div className="inline-flex items-center gap-2 bg-gold-500/10 backdrop-blur-sm border border-gold-500/20 rounded-full px-4 py-1.5 mb-4">
            <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-pulse" />
            <span className="text-gold-400 text-xs font-medium tracking-wide">Founded May 2026 · First Cohort Stories</span>
          </div>
          
          <p className="text-gold-500 font-semibold text-sm tracking-widest uppercase mb-3 flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-gold-500/50" aria-hidden="true" />
            Student Voices
            <span className="w-8 h-px bg-gold-500/50" aria-hidden="true" />
          </p>
          <h2
            id="testimonials-heading"
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 text-balance"
          >
            What Our First{" "}
            <span className="relative inline-block group">
              <span className="text-gold-400">Pioneers Say</span>
              <svg className="absolute -bottom-2 left-0 w-full" height="3" aria-hidden="true">
                <line x1="0" y1="1.5" x2="100%" y2="1.5" stroke="#C6A43F" strokeWidth="2" strokeDasharray="4 4" className="animate-dash" />
              </svg>
            </span>
          </h2>
          <p className="text-navy-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto text-pretty">
            Meet the founding batch of IPBM — ambitious professionals who chose to build their startup careers with us.
          </p>
        </div>

        {/* Grid with animated cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {testimonials.map((testimonial, i) => (
            <div
              key={testimonial.name}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <TestimonialCard testimonial={testimonial} index={i} visible={visible} />
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className={`mt-12 sm:mt-16 text-center transition-all duration-700 delay-400 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-navy-300 text-xs">100% Real Stories</span>
            </div>
            <div className="w-px h-4 bg-navy-700" aria-hidden="true" />
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-navy-300 text-xs">50+ Student Community</span>
            </div>
            <div className="w-px h-4 bg-navy-700" aria-hidden="true" />
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span className="text-navy-300 text-xs">95% Placed in Startups</span>
            </div>
          </div>
        </div>

        {/* CTA for sharing testimonial */}
        <div className="text-center mt-10">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 text-sm transition-colors duration-300 group"
          >
            <span>Share your IPBM journey</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden lg:block" aria-hidden="true">
        <div className="flex flex-col items-center gap-1 opacity-30">
          <span className="text-white text-xs">Explore</span>
          <svg className="w-4 h-4 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <style jsx global>{`
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0; }
          50% { transform: translateY(-30px) translateX(15px); opacity: 0.3; }
        }
        @keyframes dash {
          to { stroke-dashoffset: -8; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        .animate-dash {
          animation: dash 1.5s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}