"use client";
import { useEffect, useState, useRef, useCallback } from "react";

const stats = [
  { value: "20", label: "Topics Covered" },
  { value: "100", label: "Industry Expert Trainers" },
  { value: "1-ON-1", label: "Mentorship" },
];

// Carousel images
const carouselImages = [
  "/classroom-1.webp",
  "/classroom-2.webp",
  "/classroom-3.webp",
];

// Preload images for better performance
const preloadImages = (images: string[]) => {
  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

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
    <p ref={elementRef} className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-[#f15a24]">
      {prefix}{count}{suffix}
    </p>
  );
};

// 3D Tilt Card component
const TiltCard = ({ children }: { children: React.ReactNode }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 5;
    const rotateY = ((x - centerX) / centerX) * 5;
    setRotate({ x: rotateX, y: rotateY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setRotate({ x: 0, y: 0 });
  }, []);

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
        background: "radial-gradient(circle, rgba(241,90,36,0.1) 0%, rgba(241,90,36,0) 70%)",
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
      className="fixed left-0 top-0 z-50 h-1 transition-all duration-150"
      style={{ width: `${progress}%`, backgroundColor: "#f15a24" }}
    />
  );
};

// Enhanced Background Carousel Component with beautiful transitions and performance optimizations
const BackgroundCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const intervalRef = useRef<NodeJS.Timeout>();

  // Preload images on mount
  useEffect(() => {
    preloadImages(carouselImages);
  }, []);

  // Auto-advance carousel with smooth timing
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIsTransitioning(true);
      
      // After a brief delay, update the current index
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
        setIsTransitioning(false);
      }, 800);
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Current Image with ken burns effect */}
      <div
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url(${carouselImages[currentIndex]})`,
          transform: `scale(${isTransitioning ? 1.15 : 1.08})`,
          transition: "transform 8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
        aria-hidden="true"
      />
      
      {/* Next Image for crossfade - only show during transition */}
      {isTransitioning && (
        <div
          className="absolute inset-0 bg-cover bg-center animate-fadeIn will-change-transform"
          style={{
            backgroundImage: `url(${carouselImages[(currentIndex + 1) % carouselImages.length]})`,
            transform: "scale(1.08)",
            animation: "fadeIn 0.8s ease-in-out forwards",
          }}
          aria-hidden="true"
        />
      )}
      
      {/* Gradient overlays for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d47a1]/70 via-[#1a6dd4]/40 to-[#0d47a1]/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
    </div>
  );
};

// Carousel dots indicator
const CarouselDots = ({ currentIndex, total }: { currentIndex: number; total: number }) => {
  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
      {Array.from({ length: total }).map((_, idx) => (
        <button
          key={idx}
          className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#f15a24] focus:ring-offset-2 focus:ring-offset-transparent ${
            idx === currentIndex
              ? "bg-[#f15a24] w-6"
              : "bg-white/50 hover:bg-white/80"
          }`}
          aria-label={`Go to slide ${idx + 1}`}
          aria-current={idx === currentIndex ? "true" : "false"}
          onClick={() => {
            // Manual navigation would go here if needed
          }}
        />
      ))}
    </div>
  );
};

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const carouselIntervalRef = useRef<NodeJS.Timeout>();

  // Update carousel index for dots
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarouselIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* Enhanced Background Carousel */}
        <BackgroundCarousel />

        {/* Animated gradient overlay based on mouse position */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(241,90,36,0.12) 0%, rgba(26,109,212,0.2) 70%)`,
            transition: "background 0.1s ease-out",
          }}
        />

        {/* Animated accent blobs */}
        <div
          aria-hidden="true"
          className="absolute top-1/4 right-0 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 rounded-full opacity-15 blur-3xl"
          style={{
            backgroundColor: "#f15a24",
            transform: "translateX(50%)",
            animation: "floatSlow 8s ease-in-out infinite",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-1/4 w-48 h-48 sm:w-64 sm:h-64 rounded-full opacity-15 blur-3xl"
          style={{
            backgroundColor: "#1a6dd4",
            animation: "floatSlow 10s ease-in-out infinite reverse",
          }}
        />

        {/* Diagonal accent bar */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-b from-[#f15a24]/15 to-transparent skew-x-6 translate-x-20 hidden sm:block"
          style={{
            animation: "slideInRight 1s ease-out",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 pt-32 pb-7 sm:pb-20 w-full z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
            {/* Left content */}
            <div
              className={`transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {/* Founding badge */}
              <div className="group inline-flex items-center gap-2 bg-black/30 border border-white text-[#ebe8e8] px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-5 sm:mb-6 lg:mb-8 cursor-default transition-all duration-300 backdrop-blur-sm">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: "#f15a24" }}
                  aria-hidden="true"
                />
                <span>Founded May 2026 · First Batch Starting Soon</span>
                <span className="sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 text-[#448efe] sm:text-white">
                  → Be a Pioneer
                </span>
              </div>

              <h1
                id="hero-heading"
                className="font-display text-4xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-5 lg:mb-6 text-balance"
              >
                BUILD YOUR{" "}
                <span
  className="text-[#FFFFFF] italic relative inline-block group"
  style={{
    textShadow: `
      0 0 2px rgba(241,90,36,0.3),
      0 0 5px rgba(241,90,36,0.3),
      0 0 8px rgba(241,90,36,0.3),
      3px 3px 8px rgba(241,90,36,0.25)
    `,
    WebkitTextStroke: "1px rgba(255,255,255,0.1)",
  }}
>
  MANAGEMENT CAREER
</span>{" "}
                FROM DAY ONE
              </h1>

              <p className="text-white/85 text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 lg:mb-10 max-w-xl text-pretty drop-shadow-md">
                Master modern business concepts through experiential learning, expert mentorship, and real Indian market case studies — moving beyond textbooks with practical business strategies and execution-focused training.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href="#contact"
                  className="group inline-flex items-center justify-center gap-2 text-white font-semibold px-5 sm:px-6 py-3 sm:py-3.5 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#f15a24] focus:ring-offset-2 focus:ring-offset-[#1a6dd4] text-sm sm:text-base relative overflow-hidden"
                  style={{ backgroundColor: "#f15a24" }}
                  aria-label="Apply now – join the first batch"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#e04e1c";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#f15a24";
                  }}
                >
                  <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                  <span className="relative">Apply for First Batch →</span>
                </a>
                <a
                  href="#about"
                  className="group inline-flex items-center justify-center gap-2 border border-white/40 hover:border-white/70 text-white hover:bg-white/10 font-medium px-5 sm:px-6 py-3 sm:py-3.5 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#1a6dd4] text-sm sm:text-base backdrop-blur-sm"
                  aria-label="Learn more about our approach"
                >
                  Our Philosophy
                </a>
              </div>
            </div>

            {/* Right – floating card with 3D tilt */}
            <div
              className={`hidden lg:block transition-all duration-700 delay-200 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              aria-hidden="true"
            >
              <TiltCard>
                <div className="relative">
                  <div className="bg-[#1a6dd4]/40 backdrop-blur-md border border-white/25 rounded-2xl p-6 xl:p-8 transition-all duration-300 hover:border-[#f15a24]/50 hover:shadow-[0_0_30px_rgba(241,90,36,0.15)]">
                    <div className="flex items-center gap-3 mb-5 xl:mb-6">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-bold text-white relative overflow-hidden group" style={{ backgroundColor: "#f15a24" }}>
                        <span className="relative z-10">IP</span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">IPBM</p>
                        <p className="text-white/70 text-xs">
                          Where Business Theory Meets Reality
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 xl:gap-3 mb-5 xl:mb-6">
                      {[
                        "Business Foundations",
                        "Sales & Marketing",
                        "Tech & Analytics",
                        "People & Communication",
                      ].map((item, idx) => (
                        <div
                          key={item}
                          className="bg-white/15 border border-white/20 rounded-xl p-2.5 xl:p-3 text-center transition-all duration-300 hover:border-[#f15a24]/40 hover:bg-white/20 cursor-default"
                          style={{ animationDelay: `${idx * 100}ms` }}
                        >
                          <p className="text-white text-xs font-medium">{item}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between bg-black/30 border border-white rounded-xl p-3 transition-all duration-300 backdrop-blur-sm">
                      <span className="text-white text-xs sm:text-sm font-medium">
                        ⏱️ 3 Hours/Day for 45 days
                      </span>
                      <span className="text-[#fe7644] text-xs sm:text-sm font-bold flex items-center gap-1">
                        Fee: ₹50,000 + GST
                      </span>
                    </div>
                  </div>

                  {/* Floating badge */}
                  <div className="absolute -top-3 -right-3 xl:-top-4 xl:-right-4 text-white rounded-full p-2.5 xl:p-3 shadow-lg animate-float" style={{ backgroundColor: "#f15a24" }}>
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
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>

          {/* Stats row */}
          <div
            className={`grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-10 sm:mt-12 lg:mt-16 transition-all duration-700 delay-300 ${
              visible ? "opacity-80 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {stats.map((stat, idx) => {
              if (stat.value === "0→1") {
                return (
                  <div
                    key={stat.label}
                    className="group text-center bg-[#111111]/80 backdrop-blur-sm border border-white/25 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 transition-all duration-300 hover:bg-[#1a6dd4]/70 hover:border-[#f15a24]/50 hover:-translate-y-1 cursor-default"
                  >
                    <p className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-[#f15a24]">
                      0→1
                    </p>
                    <p className="text-white/80 text-xs sm:text-sm mt-0.5 sm:mt-1 group-hover:text-[#f15a24] transition-colors duration-300">
                      {stat.label}
                    </p>
                  </div>
                );
              }
              if (stat.value === "100") {
                return (
                  <div
                    key={stat.label}
                    className="group text-center bg-[#111111]/80 backdrop-blur-sm border border-white/25 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 transition-all duration-300 hover:bg-[#1a6dd4]/70 hover:border-[#f15a24]/50 hover:-translate-y-1 cursor-default"
                  >
                    <AnimatedCounter target={100} suffix="%" />
                    <p className="text-white/80 text-xs sm:text-sm mt-0.5 sm:mt-1 group-hover:text-[#f15a24] transition-colors duration-300">
                      {stat.label}
                    </p>
                  </div>
                );
              }
              if (stat.value === "20") {
                return (
                  <div
                    key={stat.label}
                    className="group text-center bg-[#111111]/80 backdrop-blur-sm border border-white/25 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 transition-all duration-300 hover:bg-[#1a6dd4]/70 hover:border-[#f15a24]/50 hover:-translate-y-1 cursor-default"
                  >
                    <AnimatedCounter target={20} suffix="" />
                    <p className="text-white/80 text-xs sm:text-sm mt-0.5 sm:mt-1 group-hover:text-[#f15a24] transition-colors duration-300">
                      {stat.label}
                    </p>
                  </div>
                );
              }
              if (stat.value === "1-ON-1") {
                return (
                  <div
                    key={stat.label}
                    className="group text-center bg-[#111111]/80 backdrop-blur-sm border border-white/25 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 transition-all duration-300 hover:bg-[#1a6dd4]/70 hover:border-[#f15a24]/50 hover:-translate-y-1 cursor-default"
                  >
                    <p className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-[#f15a24]">
                      1-ON-1
                    </p>
                    <p className="text-white/80 text-xs sm:text-sm mt-0.5 sm:mt-1 group-hover:text-[#f15a24] transition-colors duration-300">
                      {stat.label}
                    </p>
                  </div>
                );
              }
              const numericValue = parseInt(stat.value);
              if (!isNaN(numericValue)) {
                return (
                  <div
                    key={stat.label}
                    className="group text-center bg-[#111111]/30 backdrop-blur-sm border border-white/25 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 transition-all duration-300 hover:bg-[#1a6dd4]/70 hover:border-[#f15a24]/50 hover:-translate-y-1 cursor-default"
                  >
                    <AnimatedCounter target={numericValue} suffix="" />
                    <p className="text-white/80 text-xs sm:text-sm mt-0.5 sm:mt-1 group-hover:text-[#f15a24] transition-colors duration-300">
                      {stat.label}
                    </p>
                  </div>
                );
              }
              return null;
            })}
          </div>

          {/* Early bird notice */}
          <div className="text-center mt-8">
            <p className="text-white/60 text-xs flex items-center justify-center gap-1 drop-shadow-sm">
              <span className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: "#f15a24" }} />
              Limited seats for inaugural batch
              <span className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: "#f15a24" }} />
            </p>
          </div>
        </div>
      </section>

      {/* Scroll indicator */}
      <div className="relative">
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden lg:block" aria-hidden="true">
          <div className="flex flex-col items-center gap-1 opacity-50">
            <span className="text-white text-xs">Explore</span>
            <svg className="w-4 h-4 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%) skewX(6deg); opacity: 0; }
          to { transform: translateX(20px) skewX(6deg); opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-in-out forwards;
        }
        .will-change-transform {
          will-change: transform;
        }
      `}</style>
    </>
  );
}