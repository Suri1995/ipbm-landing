"use client";
import { useState, useEffect, useCallback, memo, useRef } from "react";

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
      <span 
        className={`absolute right-6 px-2 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-all duration-200 ${
          isActive 
            ? "bg-navy-600 text-white opacity-100"
            : "bg-navy-800 text-white opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
        }`}
      >
        {item.label}
      </span>
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
  const observerRef = useRef<IntersectionObserver | null>(null);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    // Function to setup observers
    const setupObservers = () => {
      const heroEl = document.getElementById("hero");
      const footerEl = document.querySelector("footer");

      // Show nav once hero scrolls out of view
      if (heroEl) {
        const heroObserver = new IntersectionObserver(
          ([entry]) => {
            setShowNav(!entry.isIntersecting);
          },
          { threshold: 0, rootMargin: "-80px 0px 0px 0px" }
        );
        heroObserver.observe(heroEl);
        
        return () => heroObserver.disconnect();
      } else {
        // If no hero, show nav after a short delay
        const timer = setTimeout(() => setShowNav(true), 500);
        return () => clearTimeout(timer);
      }
    };

    // Setup footer observer
    const setupFooterObserver = () => {
      const footerEl = document.querySelector("footer");
      if (footerEl) {
        const footerObserver = new IntersectionObserver(
          ([entry]) => {
            setHideForFooter(entry.isIntersecting);
          },
          { threshold: 0.05 }
        );
        footerObserver.observe(footerEl);
        return () => footerObserver.disconnect();
      }
      return () => {};
    };

    // Setup section observer with retry for dynamic content
    const setupSectionObserver = () => {
      // Disconnect existing observer
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        { threshold: 0.25, rootMargin: "-80px 0px -35% 0px" }
      );

      // Try to find all sections
      let foundSections = 0;
      navItems.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) {
          observer.observe(el);
          foundSections++;
        }
      });

      // If no sections found, retry after DOM updates
      if (foundSections === 0) {
        const retryTimer = setTimeout(() => {
          navItems.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
          });
        }, 500);
        return () => clearTimeout(retryTimer);
      }

      observerRef.current = observer;
      return () => observer.disconnect();
    };

    const cleanupHero = setupObservers();
    const cleanupFooter = setupFooterObserver();
    const cleanupSections = setupSectionObserver();

    return () => {
      cleanupHero?.();
      cleanupFooter?.();
      cleanupSections?.();
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  if (!showNav || hideForFooter) return null;

  return (
    <nav
      aria-label="Page sections navigation"
      className="fixed right-4 lg:right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4"
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