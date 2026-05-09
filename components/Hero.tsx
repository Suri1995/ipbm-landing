"use client";
import { useEffect, useState, useRef } from "react";

const stats = [
  { value: "0→1", label: "Startup Journey" },
  { value: "50+", label: "Students Enrolled" },
  { value: "100%", label: "Practical Focus" },
  { value: "25+", label: "Startup Partners" },
];

// Smooth Animated counter component with eased animation
const AnimatedCounter = ({ target, suffix = "+", prefix = "" }: { target: number; suffix?: string; prefix?: string }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLParagraphElement>(null);
  const hasAnimated = useRef(false);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            startTimeRef.current = undefined;
            
            const animate = (timestamp: number) => {
              if (!startTimeRef.current) startTimeRef.current = timestamp;
              const progress = Math.min((timestamp - startTimeRef.current) / 2000, 1);
              const easeOutCubic = 1 - Math.pow(1 - progress, 3);
              const current = Math.floor(easeOutCubic * target);
              setCount(current);
              
              if (progress < 1) {
                animationRef.current = requestAnimationFrame(animate);
              } else {
                setCount(target);
              }
            };
            
            animationRef.current = requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px" }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    
    return () => {
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [target]);

  return (
    <p ref={elementRef} className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-gold-400">
      {prefix}{count}{suffix}
    </p>
  );
};

// 3D Tilt Card component
const TiltCard = ({ children }: { children: React.ReactNode }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 5;
    const rotateY = ((x - centerX) / centerX) * 5;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: "transform 0.1s ease-out",
      }}
      className="relative"
    >
      {children}
    </div>
  );
};

// Interactive cursor follower
const CursorGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isVisible]);

  if (!isVisible) return null;
  return (
    <div
      aria-hidden="true"
      className="fixed pointer-events-none z-50"
      style={{
        left: position.x - 150,
        top: position.y - 150,
        width: 300,
        height: 300,
        background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0) 70%)",
        borderRadius: "50%",
        transition: "transform 0.05s ease-out",
      }}
    />
  );
};

// Scroll progress indicator
const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progressValue = (scrolled / scrollable) * 100;
      setProgress(progressValue);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed left-0 top-0 z-50 h-1 bg-gold-400 transition-all duration-150"
      style={{ width: `${progress}%` }}
    />
  );
};

// Founding date animation
const FoundingDate = () => {
  const [date, setDate] = useState({ month: "May", year: 2026 });
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.5 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={elementRef} className="relative">
      {isVisible && (
        <div className="absolute -top-8 left-0 flex gap-1 text-gold-400/30 text-xs font-mono">
          <span className="animate-bounce" style={{ animationDelay: "0s" }}>●</span>
          <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>●</span>
          <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>●</span>
        </div>
      )}
    </div>
  );
};

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <section
        ref={heroRef}
        id="hero"
        aria-labelledby="hero-heading"
        className="relative min-h-screen flex items-center overflow-hidden bg-navy-900"
      >
        {/* Animated gradient background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(212,175,55,0.15) 0%, rgba(26,35,50,0) 50%)`,
            transition: "background 0.1s ease-out",
          }}
        />

        {/* Animated grid pattern */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            animation: "gridFlow 20s linear infinite",
          }}
        />

        {/* Animated gold accent blobs */}
        <div
          aria-hidden="true"
          className="absolute top-1/4 right-0 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-gold-500 rounded-full opacity-10 blur-3xl"
          style={{
            transform: "translateX(50%)",
            animation: "floatSlow 8s ease-in-out infinite",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-navy-500 rounded-full opacity-20 blur-3xl"
          style={{
            animation: "floatSlow 10s ease-in-out infinite reverse",
          }}
        />

        {/* Diagonal accent bar with animation */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-b from-gold-600/10 to-transparent skew-x-6 translate-x-20 hidden sm:block"
          style={{
            animation: "slideInRight 1s ease-out",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 pt-7 pb-7 sm:pt-28 sm:pb-20 w-full">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
            {/* Left content */}
            <div
              className={`transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {/* Founding badge - Updated for May 2026 startup */}
              <div className="group inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/40 text-gold-300 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-5 sm:mb-6 lg:mb-8 cursor-default transition-all duration-300 hover:bg-gold-500/30 hover:border-gold-500/60">
                <span
                  className="w-2 h-2 bg-gold-400 rounded-full animate-pulse"
                  aria-hidden="true"
                />
                <span>🚀 Founded May 2026 · First Batch Starting Soon</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gold-200">
                  → Be a Pioneer
                </span>
              </div>

              <h1
                id="hero-heading"
                className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4 sm:mb-5 lg:mb-6 text-balance"
              >
                Build Your{" "}
                <span className="text-gold-400 italic relative inline-block group">
                  Startup Career
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </span>{" "}
                From Day One
              </h1>

              <p className="text-navy-200 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 lg:mb-10 max-w-xl text-pretty">
                India's first practice-first business school built for the startup economy. Learn by doing, work on real ventures, and graduate ready to build or lead — from day one.
              </p>

              {/* CTAs with interactive effects */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href="#contact"
                  className="group inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-white font-semibold px-5 sm:px-6 py-3 sm:py-3.5 rounded-full transition-all duration-200 hover:shadow-gold-glow focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-navy-900 text-sm sm:text-base relative overflow-hidden"
                  aria-label="Apply now – join the first batch"
                >
                  <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                  <span className="relative">Apply for First Batch</span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
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
                  className="group inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white/60 text-white hover:bg-white/5 font-medium px-5 sm:px-6 py-3 sm:py-3.5 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-navy-900 text-sm sm:text-base"
                  aria-label="Learn more about our approach"
                >
                  Our Philosophy
                  <svg
                    className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
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

            {/* Right – floating card with 3D tilt - Updated for startup focus */}
            <div
              className={`hidden lg:block transition-all duration-700 delay-200 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              aria-hidden="true"
            >
              <TiltCard>
                <div className="relative">
                  {/* Main card with hover glow */}
                  <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-2xl p-6 xl:p-8 transition-all duration-300 hover:border-gold-500/40 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]">
                    <div className="flex items-center gap-3 mb-5 xl:mb-6">
                      <div className="w-10 h-10 bg-gold-500 rounded-xl flex items-center justify-center font-display font-bold text-white relative overflow-hidden group">
                        <span className="relative z-10">IP</span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">IPBM</p>
                        <p className="text-navy-300 text-xs">
                          India's First Practice-First B-School
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 xl:gap-3 mb-5 xl:mb-6">
                      {[
                        "Startup Strategy",
                        "Venture Finance",
                        "Growth Marketing",
                        "Product Management",
                      ].map((item, idx) => (
                        <div
                          key={item}
                          className="bg-white/8 border border-white/10 rounded-xl p-2.5 xl:p-3 text-center transition-all duration-300 hover:border-gold-500/30 hover:bg-white/12 cursor-default"
                          style={{ animationDelay: `${idx * 100}ms` }}
                        >
                          <p className="text-white text-xs font-medium">{item}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between bg-gold-500/15 border border-gold-500/30 rounded-xl p-3 transition-all duration-300 hover:bg-gold-500/25">
                      <span className="text-gold-300 text-xs sm:text-sm font-medium">
                        🚀 First Batch
                      </span>
                      <span className="text-gold-400 text-xs sm:text-sm font-bold flex items-center gap-1">
                        Starting Aug 2026
                        <svg
                          className="w-3 h-3 animate-pulse"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>

                  {/* Floating badge with rocket */}
                  <div className="absolute -top-3 -right-3 xl:-top-4 xl:-right-4 bg-gold-500 text-white rounded-full p-2.5 xl:p-3 shadow-lg animate-float">
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
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>

          {/* Stats row - Updated for startup stats */}
          <div
            className={`grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-10 sm:mt-12 lg:mt-16 transition-all duration-700 delay-300 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {stats.map((stat, idx) => {
              if (stat.value === "0→1") {
                return (
                  <div
                    key={stat.label}
                    className="group text-center bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 transition-all duration-300 hover:bg-white/10 hover:border-gold-500/30 hover:-translate-y-1 cursor-default"
                  >
                    <p className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-gold-400">
                      0→1
                    </p>
                    <p className="text-navy-300 text-xs sm:text-sm mt-0.5 sm:mt-1 group-hover:text-gold-300 transition-colors duration-300">
                      {stat.label}
                    </p>
                  </div>
                );
              }
              const numericValue = parseInt(stat.value);
              const hasSuffix = stat.value.includes("+");
              const suffix = hasSuffix ? "+" : "%";
              return (
                <div
                  key={stat.label}
                  className="group text-center bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 transition-all duration-300 hover:bg-white/10 hover:border-gold-500/30 hover:-translate-y-1 cursor-default"
                >
                  {!isNaN(numericValue) ? (
                    <AnimatedCounter target={numericValue} suffix={suffix} />
                  ) : (
                    <p className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-gold-400">
                      {stat.value}
                    </p>
                  )}
                  <p className="text-navy-300 text-xs sm:text-sm mt-0.5 sm:mt-1 group-hover:text-gold-300 transition-colors duration-300">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Early bird notice */}
          <div className="text-center mt-8">
            <p className="text-navy-400 text-xs flex items-center justify-center gap-1">
              <span className="w-1 h-1 bg-gold-500 rounded-full animate-pulse" />
              Limited seats for inaugural batch
              <span className="w-1 h-1 bg-gold-500 rounded-full animate-pulse" />
            </p>
          </div>
        </div>
      </section>

      {/* Scroll indicator */}
      <div className="relative">
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden lg:block" aria-hidden="true">
        <div className="flex flex-col items-center gap-1 opacity-30">
          <span className="text-white text-xs">Explore</span>
          <svg className="w-4 h-4 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
          </svg>
        </div>
      </div>
      </div>

      {/* Animation keyframes */}
      <style jsx global>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes gridFlow {
          0% { background-position: 0 0; }
          100% { background-position: 60px 60px; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%) skewX(6deg); opacity: 0; }
          to { transform: translateX(20px) skewX(6deg); opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .hover\\:shadow-gold-glow:hover {
          box-shadow: 0 0 25px rgba(212, 175, 55, 0.4);
        }
      `}</style>
    </>
  );
}