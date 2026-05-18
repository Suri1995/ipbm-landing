"use client";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";

const categories = ["All", "Admissions", "Curriculum", "Fees", "Career"] as const;
type Category = (typeof categories)[number];

const faqs: { q: string; a: string; category: Category }[] = [
  {
    category: "Admissions",
    q: "What makes IPBM different from other business schools?",
    a: "IPBM is India's first practice-first business school built exclusively for the startup economy. We focus on hands-on learning with live projects, real venture building, and mentorship from active founders and investors — not just textbook theory.",
  },
  {
    category: "Admissions",
    q: "Who is eligible for IPBM's founding batch?",
    a: "We're looking for ambitious individuals passionate about startups and entrepreneurship. Applicants must hold a bachelor's degree (any discipline) with 50%+ aggregate. Work experience in startups is preferred but not mandatory — we value drive and curiosity above all.",
  },
  {
    category: "Admissions",
    q: "Is there an entrance exam for admission?",
    a: "Yes. IPBM accepts CAT, MAT, XAT, CMAT scores, or you can take our own IPBM Admission Test (IPBMAT). Shortlisted candidates participate in a founder-fit interview focusing on entrepreneurial mindset and problem-solving abilities.",
  },
  {
    category: "Fees",
    q: "What is the fee structure for the founding batch?",
    a: "As a pioneering student, you'll get special inaugural batch pricing at ₹4.5L for the full program (40% lower than planned fees). Early bird applicants before July 15 get an additional 10% scholarship. Education loans available through partner banks.",
  },
  {
    category: "Fees",
    q: "Do you offer scholarships?",
    a: "Yes! We offer merit-based scholarships (up to 100% tuition), need-based grants, and special scholarships for women founders, first-generation learners, and social impact entrepreneurs. Over 60% of our founding batch received financial aid.",
  },
  {
    category: "Career",
    q: "What startup career outcomes can I expect?",
    a: "Our focus is startup roles and entrepreneurship. You'll have access to 50+ startup hiring partners, incubation support, and founder mentorship. Estimated median starting CTC for startup roles: ₹6-8 LPA with high growth potential.",
  },
  {
    category: "Career",
    q: "Can I build my own startup during the program?",
    a: "Absolutely! We encourage it. You'll have access to our incubation cell, ₹2L seed fund for top student ventures, mentorship from successful founders, and networking with VCs and angel investors.",
  },
  {
    category: "Curriculum",
    q: "Is the program online or campus-based?",
    a: "Our founding batch is fully campus-based in Hyderabad — a thriving startup hub. You'll get 24/7 access to co-working spaces, pitch practice zones, and our founder community. Executive programs will be available hybrid from 2027.",
  },
  {
    category: "Admissions",
    q: "How do I apply for the founding batch?",
    a: "Applications are open now for our inaugural batch starting August 2026. Deadline: July 31, 2026. Apply through the contact form below or call our admissions helpline. Limited seats — first-come, founder-fit basis.",
  },
  {
    category: "Curriculum",
    q: "What's unique about the curriculum?",
    a: "Every module is built around real startup challenges. You'll learn by building MVPs, analyzing live startups, pitching to real investors, and working with our partner startups. No outdated case studies — only current, actionable skills.",
  },
];

// ── Category icon map ─────────────────────────────────────────────────────
const catIcons: Record<Category, React.ReactNode> = {
  All: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
  ),
  Admissions: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Curriculum: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  Fees: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Career: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
};

// ── Reading-time estimator ─────────────────────────────────────────────────
const readTime = (text: string) =>
  Math.max(1, Math.ceil(text.split(" ").length / 200));

// ── Was this helpful? ─────────────────────────────────────────────────────
const Helpful = ({ id }: { id: string }) => {
  const [voted, setVoted] = useState<"yes" | "no" | null>(null);
  return (
    <div className="mt-3 pt-3 border-t border-navy-100/60 flex items-center gap-3">
      <span className="text-navy-400 text-xs">Was this helpful?</span>
      {(["yes", "no"] as const).map((v) => (
        <button
          key={v}
          onClick={() => setVoted(v)}
          disabled={voted !== null}
          aria-pressed={voted === v}
          aria-label={v === "yes" ? "Yes, this was helpful" : "No, this was not helpful"}
          className={`text-xs px-2.5 py-1 rounded-full border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#eb4800] focus-visible:ring-offset-1 disabled:cursor-default ${
            voted === v
              ? v === "yes"
                ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                : "bg-red-50 border-red-200 text-red-600"
              : "border-navy-200 text-navy-400 hover:border-[#eb4800] hover:text-[#eb4800]"
          }`}
        >
          {v === "yes" ? "👍 Yes" : "👎 No"}
        </button>
      ))}
      {voted && (
        <span className="text-xs text-navy-400 ml-1">
          {voted === "yes" ? "Thanks!" : (
            <>
              <a href="#contact" className="text-[#044dd4] underline underline-offset-2 hover:text-[#eb4800]">Ask us directly →</a>
            </>
          )}
        </span>
      )}
    </div>
  );
};

// ── FAQ item ──────────────────────────────────────────────────────────────
function FAQItem({
  q, a, category, index, isOpen, onToggle, searchTerm,
}: {
  q: string; a: string; category: Category; index: number;
  isOpen: boolean; onToggle: () => void; searchTerm: string;
}) {
  const btnId = `faq-btn-${index}`;
  const panelId = `faq-panel-${index}`;

  const highlight = (text: string) => {
    if (!searchTerm.trim()) return text;
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part)
        ? <mark key={i} className="bg-[#eb4800]/20 text-navy-900 rounded px-0.5">{part}</mark>
        : part
    );
  };

  return (
    <div className="border-b border-navy-100 last:border-0 group">
      <h3>
        <button
          id={btnId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="w-full flex items-start justify-between gap-4 py-4 sm:py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#eb4800] focus-visible:ring-inset rounded-lg transition-all duration-200 hover:bg-navy-50/40 px-2 -mx-2 group"
        >
          <div className="flex items-start gap-2.5 min-w-0">
            <span
              className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-300 ${
                isOpen ? "bg-[#eb4800]" : "bg-navy-300 group-hover:bg-[#eb4800]"
              }`}
              aria-hidden="true"
            />
            <span className="font-display font-semibold text-navy-900 text-sm sm:text-base lg:text-lg transition-colors duration-200 group-hover:text-[#044dd4]">
              {highlight(q)}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="hidden sm:inline text-navy-400 text-xs">
              {readTime(a)} min read
            </span>
            <span
              className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                isOpen
                  ? "bg-[#eb4800] border-[#eb4800] rotate-45"
                  : "border-navy-300 group-hover:border-[#044dd4] group-hover:bg-[#044dd4]/5"
              }`}
              aria-hidden="true"
            >
              <svg
                className={`w-3 h-3 transition-all duration-300 ${
                  isOpen ? "text-white" : "text-navy-500 group-hover:text-[#044dd4]"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </span>
          </div>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        className="grid transition-all duration-300 ease-in-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div
            className={`pb-4 sm:pb-5 px-2 pl-6 transition-all duration-300 ${
              isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
            }`}
          >
            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full mb-2 
              ${category === "Admissions" ? "bg-[#044dd4]/10 text-[#044dd4]" :
                category === "Fees" ? "bg-[#eb4800]/10 text-[#eb4800]" :
                category === "Career" ? "bg-[#044dd4]/10 text-[#044dd4]" :
                "bg-[#eb4800]/10 text-[#eb4800]"}`}
            >
              {catIcons[category]}
              {category}
            </span>

            <p className="text-navy-600 text-xs sm:text-sm lg:text-base leading-relaxed">
              {highlight(a)}
            </p>

            <Helpful id={`helpful-${index}`} />

            <a
              href="#contact"
              className="inline-flex items-center gap-1 text-[#044dd4] text-xs font-medium hover:text-[#eb4800] transition-colors mt-2 group/link focus:outline-none focus-visible:underline"
            >
              <span>Need more details?</span>
              <svg
                className="w-3 h-3 group-hover/link:translate-x-1 transition-transform"
                fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Search bar ────────────────────────────────────────────────────────────
const FAQSearch = ({
  value, onChange,
}: {
  value: string; onChange: (v: string) => void;
}) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className={`mb-5 transition-all duration-300 ${focused ? "scale-[1.01]" : ""}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none" aria-hidden="true">
          <svg
            className={`w-4 h-4 transition-colors duration-200 ${focused ? "text-[#eb4800]" : "text-navy-400"}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <input
          ref={inputRef}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search questions…"
          aria-label="Search frequently asked questions"
          className="w-full pl-10 pr-14 py-2.5 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#eb4800]/30 focus:border-[#eb4800] transition-all duration-200 border-navy-200 text-navy-900 placeholder-navy-400"
        />

        {value ? (
          <button
            onClick={() => { onChange(""); inputRef.current?.focus(); }}
            aria-label="Clear search"
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-navy-400 hover:text-navy-600 transition-colors focus:outline-none"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        ) : (
          <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none" aria-hidden="true">
            <kbd className="hidden sm:inline text-navy-300 text-xs border border-navy-200 rounded px-1.5 py-0.5 font-mono">/</kbd>
          </span>
        )}
      </div>

      {value && (
        <p className="text-navy-500 text-xs mt-1.5" role="status" aria-live="polite">
          {faqs.filter(
            (f) =>
              f.q.toLowerCase().includes(value.toLowerCase()) ||
              f.a.toLowerCase().includes(value.toLowerCase())
          ).length}{" "}
          result(s) for &ldquo;{value}&rdquo;
        </p>
      )}
    </div>
  );
};

// ── Progress bar: "X of N answered" ───────────────────────────────────────
const AnsweredBar = ({ opened, total }: { opened: number; total: number }) => (
  <div className="mb-4 pb-3 border-b border-navy-100" aria-label={`${opened} of ${total} questions answered`}>
    <div className="flex justify-between text-xs text-navy-400 mb-1.5">
      <span>{total} questions answered</span>
      {opened > 0 && <span className="text-[#eb4800] font-medium">{opened} explored</span>}
    </div>
    <div className="h-1 bg-navy-100 rounded-full overflow-hidden" role="presentation">
      <div
        className="h-full bg-gradient-to-r from-[#eb4800] to-[#044dd4] rounded-full transition-all duration-500"
        style={{ width: total ? `${(opened / total) * 100}%` : "0%" }}
      />
    </div>
  </div>
);

// ── SSR-safe deterministic particles (no Math.random) ─────────────────────
const useParticles = (n: number) =>
  useMemo(
    () =>
      Array.from({ length: n }, (_, i) => ({
        id: i,
        left: (i * 73.137) % 100,
        top: (i * 53.711) % 100,
        dur: ((i * 11.317) % 8) + 6,
        delay: (i * 7.919) % 5,
        size: ((i * 3.713) % 3) + 1,
      })),
    [n]
  );

// ── Main export ───────────────────────────────────────────────────────────
export default function FAQs() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const particles = useParticles(10);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleToggle = useCallback((i: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }, []);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    setOpenIndices(new Set());
    if (term) setActiveCategory("All");
  }, []);

  const handleCategoryChange = useCallback((cat: Category) => {
    setActiveCategory(cat);
    setSearchTerm("");
    setOpenIndices(new Set());
  }, []);

  const filtered = useMemo(() => {
    let list = faqs;
    if (activeCategory !== "All") list = list.filter((f) => f.category === activeCategory);
    if (searchTerm.trim())
      list = list.filter(
        (f) =>
          f.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
          f.a.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return list;
  }, [activeCategory, searchTerm]);

  const allExpanded = openIndices.size === filtered.length;
  const toggleAll = useCallback(() => {
    setOpenIndices((prev) =>
      prev.size === filtered.length
        ? new Set()
        : new Set(filtered.map((_, i) => i))
    );
  }, [filtered]);

  const exploredCount = openIndices.size;

  return (
    <section
      id="faqs"
      ref={ref}
      aria-labelledby="faqs-heading"
      className="py-7 sm:py-20 bg-cream relative overflow-hidden"
    >
      {/* ── Background ── */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#eb4800]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#044dd4]/5 rounded-full blur-3xl" />
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute text-navy-200/10 font-bold text-6xl select-none"
            style={{
              left: `${10 + i * 30}%`,
              top: `${20 + i * 25}%`,
              animation: `faqFloat 8s ease-in-out ${i * 2}s infinite`,
            }}
            aria-hidden="true"
          >
            ?
          </div>
        ))}
        {/* Deterministic particles — SSR-safe */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-[#eb4800]/8"
            style={{
              width: `${p.size}px`, height: `${p.size}px`,
              left: `${p.left}%`, top: `${p.top}%`,
              animation: `faqFloat ${p.dur}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl px-4 mx-auto relative z-10">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 xl:gap-16">

          {/* ── Left panel ── */}
          <div
            className={`lg:col-span-2 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center gap-2 bg-[#eb4800]/10 backdrop-blur-sm border border-[#eb4800]/20 rounded-full px-3 py-1 mb-4">
              <span className="w-1.5 h-1.5 bg-[#eb4800] rounded-full animate-pulse" aria-hidden="true" />
              <span className="text-[#eb4800] text-xs font-medium tracking-wide">Founded May 2026</span>
            </div>

            <p className="text-[#eb4800] font-semibold text-sm tracking-widest uppercase mb-3 flex items-center gap-2">
              <span className="w-8 h-px bg-[#eb4800]" aria-hidden="true" />
              Got Questions?
            </p>

            <h2
              id="faqs-heading"
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-900 mb-4 text-balance"
            >
              Startup{" "}
              <span className="relative inline-block">
                <span className="text-[#044dd4]">FAQs</span>
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#eb4800] to-[#044dd4] rounded-full transition-all duration-700 delay-500 ${
                    visible ? "w-full" : "w-0"
                  }`}
                  aria-hidden="true"
                />
              </span>
            </h2>

            <p className="text-navy-500 leading-relaxed mb-5 sm:mb-6 text-sm sm:text-base">
              Everything you need to know about joining India&rsquo;s first
              practice-first business school for the startup economy.
            </p>

            <div className="flex flex-col gap-2.5 mb-6">
              {[
                { icon: "⏱", text: "Response within 24 hours" },
                { icon: "🎓", text: "Founding batch — Aug 2026" },
                { icon: "💡", text: "10 questions answered below" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2.5">
                  <span className="text-base" aria-hidden="true">{icon}</span>
                  <span className="text-navy-600 text-xs sm:text-sm">{text}</span>
                </div>
              ))}
            </div>

            <div
              className="flex flex-wrap lg:flex-col gap-2 mb-6"
              role="group"
              aria-label="Filter questions by category"
            >
              {categories.map((cat) => {
                const count =
                  cat === "All"
                    ? faqs.length
                    : faqs.filter((f) => f.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    aria-pressed={activeCategory === cat}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#eb4800] focus-visible:ring-offset-2 ${
                      activeCategory === cat
                        ? "bg-[#044dd4] text-white shadow-sm"
                        : "bg-white border border-navy-200 text-navy-600 hover:border-[#eb4800] hover:text-[#eb4800]"
                    }`}
                  >
                    {catIcons[cat]}
                    {cat}
                    <span
                      className={`ml-auto text-xs rounded-full px-1.5 py-0.5 font-bold ${
                        activeCategory === cat
                          ? "bg-white/20 text-white"
                          : "bg-navy-100 text-navy-500"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <a
              href="#contact"
              className="group inline-flex items-center gap-2 bg-[#044dd4] hover:bg-[#eb4800] text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#eb4800] focus-visible:ring-offset-2 shadow-md"
              aria-label="Go to contact section to ask a question"
            >
              <span>Ask a Question</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* ── Right accordion panel ── */}
          <div
            className={`lg:col-span-3 bg-white border border-navy-100 rounded-2xl px-4 sm:px-6 lg:px-8 py-6 shadow-lg transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <FAQSearch value={searchTerm} onChange={handleSearch} />

            <div className="flex items-center justify-between mb-1">
              <div className="flex-1 mr-4">
                <AnsweredBar opened={exploredCount} total={filtered.length} />
              </div>
              {filtered.length > 0 && (
                <button
                  onClick={toggleAll}
                  className="text-xs text-navy-400 hover:text-[#eb4800] transition-colors whitespace-nowrap focus:outline-none focus-visible:underline mb-3"
                  aria-label={allExpanded ? "Collapse all questions" : "Expand all questions"}
                >
                  {openIndices.size === filtered.length ? "Collapse all" : "Expand all"}
                </button>
              )}
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-12" role="status">
                <svg className="w-14 h-14 mx-auto text-navy-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-navy-500 text-sm">No matching questions found.</p>
                <p className="text-navy-400 text-xs mt-1">Try a different keyword or browse all categories.</p>
                <button
                  onClick={() => { setSearchTerm(""); setActiveCategory("All"); }}
                  className="mt-3 text-[#044dd4] text-sm font-medium hover:text-[#eb4800] transition-colors focus:outline-none focus-visible:underline"
                >
                  Clear filters →
                </button>
              </div>
            ) : (
              <div role="list" aria-label="Frequently asked questions">
                {filtered.map((faq, i) => (
                  <div role="listitem" key={faq.q}>
                    <FAQItem
                      q={faq.q}
                      a={faq.a}
                      category={faq.category}
                      index={i}
                      isOpen={openIndices.has(i)}
                      onToggle={() => handleToggle(i)}
                      searchTerm={searchTerm}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-navy-100 text-center">
              <p className="text-navy-500 text-sm">Still have questions about the founding batch?</p>
              <div className="flex items-center justify-center gap-3 mt-3">
                <a
                  href="#contact"
                  className="text-[#044dd4] text-sm font-medium hover:text-[#eb4800] transition-colors focus:outline-none focus-visible:underline"
                >
                  Contact Admissions →
                </a>
                <span className="w-1 h-1 bg-navy-300 rounded-full" aria-hidden="true" />
                <a
                  href="#"
                  className="text-navy-500 text-sm hover:text-[#044dd4] transition-colors focus:outline-none focus-visible:underline"
                  aria-label="Download IPBM programme brochure"
                >
                  Download Brochure
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes faqFloat {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.6; }
          50% { transform: translateY(-18px) translateX(6px); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="animation"] { animation: none !important; }
          .animate-pulse { animation: none !important; }
        }
      `}</style>
    </section>
  );
}