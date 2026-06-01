"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";

const team = [
  {
    name: "Mr. Ajay Kumar Vakita",
    role: "Professional Market Researcher",
    experience: "18+ years of experience",
    bio: "Expert market researcher with extensive experience in market analysis, consumer behavior, and strategic insights. Brings real-world market research expertise to help students understand market dynamics.",
    image: "/ajay-kumar-vakita.webp",
    color: "navy",
  },
  {
    name: "Mr. Rohit Mehta",
    role: "Professional Chartered Accountant",
    experience: "15+ years of experience",
    bio: "Chartered Accountant with deep expertise in financial management, taxation, and corporate finance. Provides practical financial insights based on years of industry experience.",
    image: "/rohit-mehta.webp",
    color: "gold",
  },
  {
    name: "Mrs. Nita Mehta",
    role: "Professional Chartered Accountant",
    experience: "15+ years of experience",
    bio: "Chartered Accountant specializing in financial planning, audit, and business advisory. Brings extensive knowledge of financial systems and regulatory compliance.",
    image: "/nita-mehta.webp",
    color: "navy",
  },
];

// Deterministic particles hook (SSR-safe)
const useParticles = (n: number) =>
  useMemo(
    () =>
      Array.from({ length: n }, (_, i) => ({
        id: i,
        width: ((i * 137.508) % 5) + 1,
        height: ((i * 97.333) % 5) + 1,
        left: (i * 73.137) % 100,
        top: (i * 53.711) % 100,
        duration: ((i * 11.317) % 12) + 8,
        delay: (i * 7.919) % 6,
      })),
    [n],
  );

// Profile card with image on top, details on bottom
const ProfileCard = ({
  member,
  index,
  visible,
}: {
  member: (typeof team)[0];
  index: number;
  visible: boolean;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 50, y: 50 });
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={`${member.name}, ${member.role} with ${member.experience}`}
      className={`relative bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{
        transitionDelay: visible ? `${index * 100}ms` : "0ms",
      }}
    >
      {/* Animated gradient overlay on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(235,72,0,0.06) 0%, transparent 70%)`,
        }}
      />

      {/* Shine effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-10" />

      {/* Top Half - Image Section */}
      <div className="relative h-80 overflow-hidden bg-gradient-to-br from-[#044dd4]/5 to-[#eb4800]/5">
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse" />
        )}

        {/* Faculty Image */}
        <div className="relative w-full h-full">
          <Image
            src={member.image}
            alt={`${member.name} - ${member.role}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover object-top transition-all duration-700 group-hover:scale-110 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            priority={index === 0}
          />
        </div>

        {/* Overlay gradient for better text readability when hovered */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Color accent bar */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${
            member.color === "navy"
              ? "from-[#044dd4] to-[#044dd4]/50"
              : "from-[#eb4800] to-[#eb4800]/50"
          } transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
        />
      </div>

      {/* Bottom Half - Details Section */}
      <div className="p-5 sm:p-6 relative z-20 bg-white">
        {/* Name */}
        <h3 className="font-display font-bold text-navy-900 text-base sm:text-lg lg:text-xl leading-tight mb-1 group-hover:text-[#044dd4] transition-colors duration-300">
          {member.name}
        </h3>

        {/* Role with icon */}
        <div className="flex items-center gap-1.5 mb-3">
          <div
            className={`w-1.5 h-1.5 rounded-full ${
              member.color === "navy" ? "bg-[#044dd4]" : "bg-[#eb4800]"
            } animate-pulse`}
          />
          <p className="text-[#eb4800] text-xs sm:text-sm font-semibold">
            {member.role}
          </p>
        </div>

        {/* Expertise divider */}
        <div className="relative mb-3">
          <div className="flex items-center gap-2">
            <span
              className={`text-[11px] sm:text-xs font-medium px-2 py-0.5 rounded-full ${
                member.color === "navy"
                  ? "bg-[#044dd4]/10 text-[#044dd4]"
                  : "bg-[#eb4800]/10 text-[#eb4800]"
              }`}
            >
              {member.experience}
            </span>
          </div>
          <div
            className={`absolute -bottom-1 left-0 w-12 h-0.5 ${
              member.color === "navy" ? "bg-[#044dd4]" : "bg-[#eb4800]"
            } group-hover:w-full transition-all duration-500`}
          />
        </div>

        {/* Bio */}
        <p className="text-navy-500 text-xs sm:text-sm leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
          {member.bio}
        </p>

        {/* Connect button */}
        <div className="mt-4 pt-3 border-t border-navy-100/50">
          <a
            href="#contact"
            aria-label={`Connect with ${member.name}`}
            className={`inline-flex items-center gap-2 text-navy-400 hover:text-[#044dd4] text-xs sm:text-sm font-medium transition-all duration-300 group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-[#eb4800] focus-visible:rounded-full`}
          >
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover/btn:scale-110"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            <span>Learn more</span>
            <svg
              className="w-3 h-3 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Decorative corner accent */}
      <div
        className="absolute top-3 right-3 w-12 h-12 border-t-2 border-r-2 border-[#eb4800]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
        aria-hidden="true"
      />
    </article>
  );
};

export default function Team() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const particles = useParticles(30);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="team"
      ref={ref}
      aria-labelledby="team-heading"
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-[#fefaf8] relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        {/* Floating dots pattern */}
        <div className="absolute inset-0">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full bg-[#eb4800]/5"
              style={{
                width: `${p.width}px`,
                height: `${p.height}px`,
                left: `${p.left}%`,
                top: `${p.top}%`,
                animation: `floatDot ${p.duration}s ease-in-out infinite`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Animated gradient blobs */}
        <div className="absolute top-20 -left-32 w-96 h-96 bg-[#eb4800]/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 -right-32 w-96 h-96 bg-[#044dd4]/5 rounded-full blur-3xl animate-pulse-slow animation-delay-3000" />

        {/* Subtle grid pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.02]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="teamGrid"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="1" height="1" fill="#1a2a3a" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#teamGrid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header section */}
        <div
          className={`text-center mb-10 sm:mb-14 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#eb4800]/10 backdrop-blur-sm border border-[#eb4800]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="w-1.5 h-1.5 bg-[#eb4800] rounded-full animate-ping" />
            <span className="text-[#eb4800] text-xs font-medium tracking-wide">
              Expert Faculty
            </span>
          </div>

          <p className="text-[#eb4800] font-semibold text-sm tracking-widest uppercase mb-3 flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-[#eb4800]" aria-hidden="true" />
            Meet Your Mentors
            <span className="w-8 h-px bg-[#eb4800]" aria-hidden="true" />
          </p>

          <h2
            id="team-heading"
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-900 mb-4"
          >
            Learn From Industry{" "}
            <span className="relative inline-block">
              <span className="text-[#044dd4]">Experts</span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="3"
                aria-hidden="true"
              >
                <line
                  x1="0"
                  y1="1.5"
                  x2="100%"
                  y2="1.5"
                  stroke="#eb4800"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  className="animate-dash"
                />
              </svg>
            </span>
          </h2>

          <p className="text-navy-500 text-sm sm:text-base max-w-2xl mx-auto">
            Our faculty brings decades of real-world experience to help you
            master business management
          </p>
        </div>

        {/* Faculty Grid - 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {team.map((member, index) => (
            <ProfileCard
              key={member.name}
              member={member}
              index={index}
              visible={visible}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="inline-flex flex-col items-center gap-4">
            <p className="text-navy-500 text-sm">
              Want to learn from these industry experts?
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#044dd4] text-white hover:bg-[#eb4800] transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#eb4800] focus:ring-offset-2"
            >
              <span>Enroll Now</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes floatDot {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.4;
          }
        }
        @keyframes dash {
          to {
            stroke-dashoffset: -8;
          }
        }
        .animate-dash {
          animation: dash 1.5s linear infinite;
        }
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="animation"] {
            animation: none !important;
          }
          .animate-pulse,
          .animate-ping,
          .animate-dash,
          .animate-pulse-slow {
            animation: none !important;
          }
        }

        /* Accessibility improvements */
        @media (max-width: 640px) {
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .group:hover .line-clamp-3 {
            display: block;
          }
        }
      `}</style>
    </section>
  );
}
