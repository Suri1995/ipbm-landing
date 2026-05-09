"use client";
import { useEffect, useRef, useState } from "react";

const team = [
  {
    name: "Dr. Ramesh Kumar",
    role: "Founder & CEO",
    expertise: "Startup Strategy · 25 Years Experience",
    bio: "Former VP at McKinsey India. PhD from IIM Ahmedabad. Architect of IPBM's innovative startup-focused curriculum.",
    initials: "RK",
    color: "navy",
    social: "linkedin",
  },
  {
    name: "Prof. Sunita Iyer",
    role: "Co-Founder & CFO",
    expertise: "Startup Finance · CFA Charter",
    bio: "Ex-CFO of a BSE-listed conglomerate. Brings real treasury, fundraising, and M&A experience to every lecture.",
    initials: "SI",
    color: "gold",
    social: "linkedin",
  },
  {
    name: "Mr. Arjun Mehta",
    role: "Head of Placements & Industry Relations",
    expertise: "Startup Hiring · HR Leadership",
    bio: "15 years in corporate HR at Deloitte and HCL. Has built relationships with 200+ startup hiring partners.",
    initials: "AM",
    color: "navy",
    social: "linkedin",
  },
  {
    name: "Dr. Priya Nair",
    role: "Head of Marketing & Growth",
    expertise: "Growth Marketing · Brand Strategy",
    bio: "Worked with Unilever and 3 high-growth startups. PhD in Consumer Behaviour from IIT Madras.",
    initials: "PN",
    color: "gold",
    social: "linkedin",
  },
  {
    name: "Prof. Vikram Singh",
    role: "Head of Operations & Analytics",
    expertise: "Supply Chain · Data Strategy",
    bio: "MIT Sloan alumnus. Former Head of Operations at a Fortune 500 manufacturing group. Startup advisor.",
    initials: "VS",
    color: "navy",
    social: "linkedin",
  },
  {
    name: "Ms. Lakshmi Reddy",
    role: "Entrepreneurship Cell Lead",
    expertise: "Venture Building · Innovation",
    bio: "Serial entrepreneur with 3 successful exits. Leads IPBM's startup incubation programme.",
    initials: "LR",
    color: "gold",
    social: "linkedin",
  },
];

// Animated profile card component
const ProfileCard = ({ member, index, visible }: { member: typeof team[0]; index: number; visible: boolean }) => {
  const [isFlipped, setIsFlipped] = useState(false);
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
      aria-label={`${member.name}, ${member.role}`}
      className={`relative bg-white border border-navy-100 rounded-2xl p-5 sm:p-6 flex flex-col transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden group ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ 
        transitionDelay: visible ? `${index * 80}ms` : "0ms",
        transformStyle: "preserve-3d",
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
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

      {/* Avatar with animated ring */}
      <div className="flex items-center gap-3 sm:gap-4 mb-4 relative">
        <div className="relative">
          <div
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-base sm:text-lg font-display font-bold flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${
              member.color === "navy"
                ? "bg-navy-600 text-white"
                : "bg-gold-500 text-white"
            }`}
            aria-hidden="true"
          >
            {member.initials}
          </div>
          {/* Animated pulse ring */}
          <div className="absolute inset-0 rounded-2xl border-2 border-gold-400 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500 pointer-events-none" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display font-bold text-navy-900 text-sm sm:text-base leading-tight truncate group-hover:text-gold-600 transition-colors duration-300">
            {member.name}
          </h3>
          <p className="text-gold-600 text-xs font-semibold mt-0.5 truncate flex items-center gap-1">
            <span className="w-1 h-1 bg-gold-500 rounded-full animate-pulse" aria-hidden="true" />
            {member.role}
          </p>
        </div>
      </div>

      {/* Expertise with animated underline */}
      <div className="relative mb-2 sm:mb-3">
        <p className="text-navy-400 text-xs font-medium tracking-wide uppercase inline-block">
          {member.expertise}
        </p>
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-400 group-hover:w-full transition-all duration-500" />
      </div>
      
      <p className="text-navy-500 text-xs sm:text-sm leading-relaxed flex-1 relative z-10">
        {member.bio}
      </p>

      {/* Social connect with animation */}
      <div className="mt-4 pt-3 border-t border-navy-100/50">
        <a
          href="#"
          aria-label={`Connect with ${member.name} on LinkedIn`}
          className="inline-flex items-center gap-2 text-navy-400 hover:text-navy-700 text-xs font-medium transition-all duration-300 group-hover:gap-3 focus:outline-none focus:underline"
        >
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
          <span className="relative">
            Connect
            <span className="absolute bottom-0 left-0 w-0 h-px bg-navy-600 group-hover:w-full transition-all duration-300" />
          </span>
          <svg className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      {/* Decorative corner accent */}
      <div className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-gold-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" aria-hidden="true" />
    </article>
  );
};

export default function Team() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
      id="team"
      ref={ref}
      aria-labelledby="team-heading"
      className="py-7 sm:py-20 bg-cream relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating dots pattern */}
        <div className="absolute inset-0">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gold-400/5"
              style={{
                width: `${Math.random() * 6 + 1}px`,
                height: `${Math.random() * 6 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `floatDot ${Math.random() * 12 + 8}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 6}s`,
              }}
            />
          ))}
        </div>
        
        {/* Animated gradient blobs */}
        <div className="absolute top-20 -left-32 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 -right-32 w-64 h-64 bg-navy-500/5 rounded-full blur-3xl animate-pulse-slow animation-delay-3000" />
        
        {/* Subtle grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]" aria-hidden="true">
          <defs>
            <pattern id="teamGrid" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="1" height="1" fill="#1a2a3a" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#teamGrid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header with enhanced animations */}
        <div
          className={`text-center mb-10 sm:mb-14 lg:mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Founding badge - Updated for May 2026 */}
          <div className="inline-flex items-center gap-2 bg-gold-500/10 backdrop-blur-sm border border-gold-500/20 rounded-full px-4 py-1.5 mb-4 animate-pulse-slow">
            <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-ping" />
            <span className="text-gold-600 text-xs font-medium tracking-wide">Founded May 2026 · First Batch Starting Soon</span>
          </div>
          
          <p className="text-gold-600 font-semibold text-sm tracking-widest uppercase mb-3 flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-gold-400" aria-hidden="true" />
            Meet Your Mentors
            <span className="w-8 h-px bg-gold-400" aria-hidden="true" />
          </p>
          <h2
            id="team-heading"
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-900 mb-4 text-balance"
          >
            Learn From Those Who{" "}
            <span className="relative inline-block group">
              <span className="text-navy-600">Built It</span>
              <svg className="absolute -bottom-2 left-0 w-full" height="3" aria-hidden="true">
                <line x1="0" y1="1.5" x2="100%" y2="1.5" stroke="#C6A43F" strokeWidth="2" strokeDasharray="4 4" className="animate-dash" />
              </svg>
            </span>
          </h2>
          <p className="text-navy-500 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto text-pretty">
            Our faculty are active practitioners and startup founders — they bring real-world experience, 
            not just textbook theory.
          </p>
        </div>

        {/* Grid with enhanced cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {team.map((member, i) => (
            <div
              key={member.name}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <ProfileCard member={member} index={i} visible={visible} />
            </div>
          ))}
        </div>

        {/* Join the team CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="inline-flex flex-col items-center gap-3">
            <p className="text-navy-500 text-sm">Want to join our expert faculty?</p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-navy-800 text-white hover:bg-gold-500 hover:text-white transition-all duration-300 text-sm font-semibold group shadow-lg hover:shadow-xl"
            >
              <span>Become a Mentor</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 group-hover:translate-y-[-1px] transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden lg:block" aria-hidden="true">
        <div className="flex flex-col items-center gap-1 opacity-30">
          <span className="text-navy-900 text-xs">Explore</span>
          <svg className="w-4 h-4 text-navy-900 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <style jsx global>{`
        @keyframes floatDot {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0; }
          50% { transform: translateY(-30px) translateX(15px); opacity: 0.5; }
        }
        @keyframes dash {
          to { stroke-dashoffset: -8; }
        }
        .animate-dash {
          animation: dash 1.5s linear infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </section>
  );
}