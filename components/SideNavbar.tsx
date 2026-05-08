"use client";
import { useState, useEffect, useCallback, memo } from "react";

const navItems = [
  { id: "about", label: "About" },
  { id: "services", label: "Programs" },
  { id: "team", label: "Team" },
  { id: "testimonials", label: "Alumni" },
  { id: "faqs", label: "FAQs" },
  { id: "contact", label: "Contact" },
];

const NavDot = memo(function NavDot({ 
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
      className="group relative flex items-center justify-end focus:outline-none"
    >
      {/* Label tooltip - appears on hover */}
      <span 
        className={`absolute right-6 px-2 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-all duration-200 ${
          isActive 
            ? "bg-navy-600 text-white opacity-100"
            : "bg-navy-800 text-white opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
        }`}
      >
        {item.label}
      </span>
      {/* Dot */}
      <span 
        className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
          isActive 
            ? "bg-gold-500 scale-125" 
            : "bg-navy-300 group-hover:bg-navy-500 group-focus-visible:bg-navy-500"
        }`}
      />
    </button>
  );
});

export default function SideNavbar() {
  const [activeSection, setActiveSection] = useState("");
  const [showNav, setShowNav] = useState(false);
  const [hideForFooter, setHideForFooter] = useState(false);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    const heroEl = document.getElementById("hero");
    const footerEl = document.querySelector("footer");

    // Show nav once hero scrolls out of view
    const heroObserver = new IntersectionObserver(
      ([entry]) => setShowNav(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (heroEl) heroObserver.observe(heroEl);

    // Hide nav when footer comes into view
    const footerObserver = new IntersectionObserver(
      ([entry]) => setHideForFooter(entry.isIntersecting),
      { threshold: 0.05 }
    );
    if (footerEl) footerObserver.observe(footerEl);

    // Track active section
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" }
    );

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });

    return () => {
      heroObserver.disconnect();
      footerObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  // Don't render if we're in hero or footer area
  if (!showNav || hideForFooter) return null;

  return (
    <nav
      aria-label="Page sections navigation"
      className={`fixed right-4 lg:right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4 transition-all duration-500 ${
        showNav && !hideForFooter ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
      }`}
    >
      {navItems.map((item) => (
        <NavDot
          key={item.id}
          item={item}
          isActive={activeSection === item.id}
          onClick={() => scrollToSection(item.id)}
        />
      ))}
    </nav>
  );
}
