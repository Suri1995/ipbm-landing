"use client";
import { useEffect, useRef, useState } from "react";

const team = [
  {
    name: "Dr. Ramesh Kumar",
    role: "Director & Dean",
    expertise: "Strategic Management · 25 Years Experience",
    bio: "Former VP at McKinsey India. PhD from IIM Ahmedabad. Architect of IPBM's flagship MBA curriculum.",
    initials: "RK",
    color: "navy",
  },
  {
    name: "Prof. Sunita Iyer",
    role: "Head of Finance",
    expertise: "Corporate Finance · CFA Charter",
    bio: "Ex-CFO of a BSE-listed conglomerate. Brings real treasury and M&A experience to every lecture.",
    initials: "SI",
    color: "gold",
  },
  {
    name: "Mr. Arjun Mehta",
    role: "Director – Placements",
    expertise: "Career Strategy · HR Leadership",
    bio: "15 years in corporate HR at Deloitte and HCL. Has built relationships with 200+ hiring partners.",
    initials: "AM",
    color: "navy",
  },
  {
    name: "Dr. Priya Nair",
    role: "Head of Marketing",
    expertise: "Brand Strategy · Digital Marketing",
    bio: "Worked with Unilever and Ogilvy. PhD in Consumer Behaviour from IIT Madras.",
    initials: "PN",
    color: "gold",
  },
  {
    name: "Prof. Vikram Singh",
    role: "Operations & Analytics",
    expertise: "Supply Chain · Data Strategy",
    bio: "MIT Sloan alumnus. Former Head of Operations at a Fortune 500 manufacturing group.",
    initials: "VS",
    color: "navy",
  },
  {
    name: "Ms. Lakshmi Reddy",
    role: "Entrepreneurship Cell Lead",
    expertise: "Venture Building · Innovation",
    bio: "Serial entrepreneur with 3 successful exits. Leads IPBM's startup incubation programme.",
    initials: "LR",
    color: "gold",
  },
];

export default function Team() {
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
      id="team"
      ref={ref}
      aria-labelledby="team-heading"
      className="py-16 sm:py-20 lg:py-28 bg-cream px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto pl-0 md:pl-20 xl:pl-24">
        {/* Header */}
        <div
          className={`text-center mb-10 sm:mb-14 lg:mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-gold-600 font-semibold text-sm tracking-widest uppercase mb-3">
            Our Faculty
          </p>
          <h2
            id="team-heading"
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-900 mb-4 text-balance"
          >
            Learn From Those Who{" "}
            <span className="text-navy-600">Have Done It</span>
          </h2>
          <p className="text-navy-500 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto text-pretty">
            Our faculty are active practitioners — they bring current market
            knowledge, not just textbook theory.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {team.map((member, i) => (
            <article
              key={member.name}
              aria-label={`${member.name}, ${member.role}`}
              className={`bg-white border border-navy-100 rounded-2xl p-5 sm:p-6 flex flex-col hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: visible ? `${i * 80}ms` : "0ms" }}
            >
              {/* Avatar */}
              <div className="flex items-center gap-3 sm:gap-4 mb-4">
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-base sm:text-lg font-display font-bold flex-shrink-0 ${
                    member.color === "navy"
                      ? "bg-navy-600 text-white"
                      : "bg-gold-500 text-white"
                  }`}
                  aria-hidden="true"
                >
                  {member.initials}
                </div>
                <div className="min-w-0">
                  <h3 className="font-display font-bold text-navy-900 text-sm sm:text-base leading-tight truncate">
                    {member.name}
                  </h3>
                  <p className="text-gold-600 text-xs font-semibold mt-0.5 truncate">
                    {member.role}
                  </p>
                </div>
              </div>

              <p className="text-navy-400 text-xs font-medium mb-2 sm:mb-3 tracking-wide uppercase">
                {member.expertise}
              </p>
              <p className="text-navy-500 text-xs sm:text-sm leading-relaxed flex-1">
                {member.bio}
              </p>

              {/* LinkedIn placeholder */}
              <a
                href="#"
                aria-label={`Connect with ${member.name} on LinkedIn`}
                className="mt-4 inline-flex items-center gap-2 text-navy-400 hover:text-navy-700 text-xs font-medium transition-colors focus:outline-none focus:underline"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                LinkedIn Profile
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
