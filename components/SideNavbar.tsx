"use client";
import { useState, useEffect, useCallback, memo } from "react";

const navItems = [
  {
    id: "about",
    label: "About",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "services",
    label: "Programs",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    id: "team",
    label: "Our Team",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    id: "testimonials",
    label: "Alumni",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    id: "faqs",
    label: "FAQs",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "contact",
    label: "Contact",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const NavButton = memo(function NavButton({ 
  item, 
  isActive, 
  onClick 
}: { 
  item: typeof navItems[0]; 
  isActive: boolean; 
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={`Navigate to ${item.label} section`}
      aria-current={isActive ? "true" : undefined}
      title={item.label}
      className={`group flex items-center gap-0 overflow-hidden rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 ${
        isActive
          ? "bg-navy-600 text-white w-32 lg:w-36 px-3 py-2.5"
          : "text-navy-400 hover:bg-navy-50 hover:text-navy-800 w-10 h-10 justify-center"
      }`}
    >
      <span className={`flex-shrink-0 ${isActive ? "mr-2" : ""}`}>
        {item.icon}
      </span>
      <span
        className={`text-sm font-medium whitespace-nowrap transition-all duration-200 ${
          isActive ? "opacity-100 max-w-xs" : "opacity-0 max-w-0"
        }`}
      >
        {item.label}
      </span>
    </button>
  );
});

const MobileNavButton = memo(function MobileNavButton({ 
  item, 
  isActive, 
  onClick 
}: { 
  item: typeof navItems[0]; 
  isActive: boolean; 
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={`Navigate to ${item.label} section`}
      aria-current={isActive ? "true" : undefined}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 text-left w-full ${
        isActive
          ? "bg-navy-600 text-white"
          : "text-navy-600 hover:bg-navy-50"
      }`}
    >
      {item.icon}
      {item.label}
    </button>
  );
});

export default function SideNavbar() {
  const [activeSection, setActiveSection] = useState("");
  const [showNav, setShowNav] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileOpen(false);
    }
  }, []);

  useEffect(() => {
    const heroEl = document.getElementById("hero");

    // Show nav once hero scrolls out of view
    const heroObserver = new IntersectionObserver(
      ([entry]) => setShowNav(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (heroEl) heroObserver.observe(heroEl);

    // Track active section
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.4, rootMargin: "-80px 0px -40% 0px" }
    );

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });

    return () => {
      heroObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  // Close mobile menu on click outside
  useEffect(() => {
    if (!mobileOpen) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest('[data-mobile-nav]')) {
        setMobileOpen(false);
      }
    };
    
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [mobileOpen]);

  if (!showNav) return null;

  return (
    <>
      {/* Desktop Side Navbar */}
      <nav
        aria-label="Page sections navigation"
        className={`fixed left-3 lg:left-4 xl:left-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-1 transition-all duration-500 ${
          showNav ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
        }`}
      >
        <div className="bg-white border border-navy-100 rounded-2xl shadow-card p-1.5 lg:p-2 flex flex-col gap-1">
          {navItems.map((item) => (
            <NavButton
              key={item.id}
              item={item}
              isActive={activeSection === item.id}
              onClick={() => scrollToSection(item.id)}
            />
          ))}
        </div>
      </nav>

      {/* Mobile FAB */}
      <div className="fixed bottom-5 right-4 z-50 md:hidden" data-mobile-nav>
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
          className="w-11 h-11 sm:w-12 sm:h-12 bg-navy-600 text-white rounded-full shadow-lg flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-offset-2"
        >
          {mobileOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Mobile menu panel */}
        {mobileOpen && (
          <nav
            aria-label="Mobile page sections navigation"
            className="absolute bottom-14 right-0 bg-white border border-navy-100 rounded-2xl shadow-card-hover p-1.5 sm:p-2 flex flex-col gap-1 min-w-[150px] sm:min-w-[160px]"
          >
            {navItems.map((item) => (
              <MobileNavButton
                key={item.id}
                item={item}
                isActive={activeSection === item.id}
                onClick={() => scrollToSection(item.id)}
              />
            ))}
          </nav>
        )}
      </div>
    </>
  );
}
