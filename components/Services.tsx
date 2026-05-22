"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const modules = [
  {
    id: "foundations", label: "Business Foundations", color: "#2e70ea",
    topics: [
      { num: "01", title: "Startup Management", essentials: ["Business models & org structures", "Operational vs strategic thinking", "Basic business planning"], performance: ["Validate ideas before scaling", "MVP thinking — start lean, iterate fast", "Real startup case studies"] },
      { num: "02", title: "Financial Management", essentials: ["Reading P&L, balance sheet, cash flow", "Budgeting — departmental & project level", "Revenue vs profit vs cost"], performance: ["ROI analysis for decisions", "Forecast planning & variance reporting", "Cost control mindset"] },
      { num: "03", title: "Risk Management", essentials: ["Types of risk — financial, operational, reputational", "Basic risk identification & assessment", "Escalation protocols"], performance: ["Build risk matrices for projects", "Scenario planning & contingency development", "Communicate risks upward without panic"] },
      { num: "04", title: "Project Management", essentials: ["Project lifecycle: Initiation → Planning → Execution → Closure", "Setting SMART goals & milestones", "Gantt charts, task trackers"], performance: ["Agile vs Waterfall methodology", "Stakeholder management during projects", "Managing scope creep & deadline pressure"] },
      { num: "05", title: "Operations Management", essentials: ["Workflows & standard operating procedures", "Resource allocation fundamentals", "Quality vs efficiency tradeoffs"], performance: ["Process mapping & Kaizen basics", "KPI setting & performance monitoring", "Bottleneck identification & resolution"] },
      { num: "06", title: "Family Business Management", essentials: ["Family-run vs professionally run businesses", "Role clarity & avoiding nepotism", "Governance structures"], performance: ["Succession planning fundamentals", "Conflict resolution in personal-professional overlap", "Professionalizing for scale"] },
    ],
  },
  {
    id: "sales", label: "Sales & Marketing", color: "#eb4800",
    topics: [
      { num: "07", title: "Sales & Marketing Management", essentials: ["Sales funnel — awareness to conversion", "B2B vs B2C selling", "Basic target setting & tracking"], performance: ["Leading a sales team", "Integrating marketing into sales cycles", "Data-driven sales forecasting"] },
      { num: "08", title: "E-Commerce & Digital Marketing", essentials: ["SEO, SEM, Social Media basics", "E-commerce platforms & customer journeys", "Key metrics: CTR, CAC, conversion rate"], performance: ["Running & analyzing digital campaigns", "Content strategy & omnichannel thinking", "Google Analytics, Meta Ads Manager"] },
      { num: "09", title: "Business Networking", essentials: ["Why networking matters for managers", "How to introduce yourself & your org", "Building genuine professional relationships"], performance: ["Strategic networking — who & why", "Leveraging LinkedIn & industry events", "Creating value before asking for anything"] },
      { num: "10", title: "Brand Management", essentials: ["Visual identity vs brand value", "How managers represent the brand", "Consistency in communication & behavior"], performance: ["Brand positioning & competitive differentiation", "Internal brand culture", "Crisis communication & brand protection"] },
      { num: "11", title: "Market Research", essentials: ["Primary vs secondary research", "Understanding your customer", "Reading & interpreting basic market data"], performance: ["Competitive benchmarking techniques", "Consumer insight translation", "Using research to support business cases"] },
    ],
  },
  {
    id: "tech", label: "Tech & Analytics", color: "#0891b2",
    topics: [
      { num: "12", title: "Data Analytics", essentials: ["Data your team/org generates", "Reading dashboards & reports intelligently", "KPIs vs vanity metrics"], performance: ["Basic Excel/Google Sheets analysis", "Interpreting trend data for decisions", "Presenting data stories to non-technical audiences"] },
      { num: "13", title: "AI & Productivity in Management", essentials: ["AI tools for managers (ChatGPT, Copilot, Notion AI)", "Automating repetitive tasks", "AI ethics basics"], performance: ["Integrating AI into team workflows", "AI for faster research, content & decisions", "Staying updated in a rapidly changing landscape"] },
    ],
  },
  {
    id: "people", label: "People & Communication", color: "#7c3aed",
    topics: [
      { num: "14", title: "HR Management", essentials: ["Recruitment basics — JDs, interviewing, selecting", "Onboarding a new team member", "Leave policies, performance cycles, disciplinary processes"], performance: ["Performance management & PIPs", "Building psychologically safe teams", "Talent retention & career development"] },
      { num: "15", title: "Public Speaking", essentials: ["Overcoming fear of speaking", "Structuring a clear message", "Eye contact, voice modulation, body language"], performance: ["Leading town halls, presentations & pitches", "Storytelling as a leadership tool", "Handling Q&A & tough questions"] },
      { num: "16", title: "Time & Stress Management", essentials: ["Time auditing — where does time actually go?", "Eisenhower Matrix, 80/20 rule", "Recognizing early signs of burnout"], performance: ["Deep work habits & focus blocks", "Managing team workload", "Sustainable high-performance routines"] },
      { num: "17", title: "Business Communication", essentials: ["Written communication — emails, reports, memos", "Meeting management — agenda, facilitation, minutes", "Active listening as a management skill"], performance: ["Adapting style for different audiences", "Difficult conversations — feedback, conflict", "Cross-cultural communication"] },
    ],
  },
  {
    id: "global", label: "Global & Operations", color: "#059669",
    topics: [
      { num: "18", title: "International Business", essentials: ["How global markets differ", "Import/export basics & trade fundamentals", "Understanding global supply chains"], performance: ["Cross-cultural business etiquette & negotiation", "Managing remote/international teams", "Market entry strategies"] },
      { num: "19", title: "Event Management", essentials: ["Planning a team/org event from scratch", "Budget management for events", "Coordinating vendors, timelines & logistics"], performance: ["Large-scale event planning with multiple stakeholders", "Risk planning for events", "Events as leadership visibility & team building"] },
      { num: "20", title: "Logistics & Supply Chain", essentials: ["What is a supply chain?", "Inventory basics — too much vs too little", "Procurement & vendor relationships"], performance: ["Supply chain disruption management", "Cost optimization in procurement & distribution", "ERP basics & tracking systems"] },
    ],
  },
];

type TopicType = typeof modules[0]["topics"][0];
type ModuleType = typeof modules[0];

const allTopics = modules.flatMap(m =>
  m.topics.map(t => ({ ...t, moduleColor: m.color, moduleLabel: m.label }))
);

// ─── TILT CARD ────────────────────────────────────────────────────────────────

const TiltCard = ({ children, accent }: { children: React.ReactNode; accent: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);
  const raf = useRef(0);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      setRot({
        x: ((e.clientY - r.top - r.height / 2) / r.height) * 7,
        y: ((e.clientX - r.left - r.width / 2) / r.width) * 7,
      });
    });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { cancelAnimationFrame(raf.current); setRot({ x: 0, y: 0 }); setHov(false); }}
      style={{ transform: `perspective(1000px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)`, transition: "transform 0.12s ease-out", willChange: "transform", position: "relative" }}
    >
      {children}
      {hov && (
        <div
          aria-hidden
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ background: `radial-gradient(circle at ${50 + rot.y * 3}% ${50 + rot.x * 3}%, ${accent}1f, transparent 65%)` }}
        />
      )}
    </div>
  );
};

// ─── TOPIC ROW ────────────────────────────────────────────────────────────────

const TopicRow = ({
  topic, color, index, visible,
}: {
  topic: TopicType; color: string; index: number; visible: boolean;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        borderRadius: 12,
        border: open ? `1.5px solid ${color}45` : "1.5px solid rgba(255,255,255,0.06)",
        background: open ? `linear-gradient(135deg, ${color}10, rgba(255,255,255,0.02))` : "rgba(255,255,255,0.025)",
        marginBottom: 8,
        transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
        transitionDelay: visible ? `${(index % 8) * 30}ms` : "0ms",
        boxShadow: open ? `0 4px 24px ${color}15` : "none",
      }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "16px 20px", display: "flex", alignItems: "center", gap: 14, textAlign: "left" }}
      >
        <span style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 700, color, opacity: 0.85, minWidth: 28, letterSpacing: "0.05em", flexShrink: 0 }}>{topic.num}</span>
        <span style={{ flex: 1, color: "rgba(255,255,255,0.92)", fontWeight: 600, fontSize: 15, lineHeight: 1.4 }}>{topic.title}</span>
        <svg
          style={{ width: 16, height: 16, color: "rgba(255,255,255,0.4)", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.25s", flexShrink: 0 }}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div style={{ padding: "0 20px 18px 62px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10, fontFamily: "monospace" }}>Essentials</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {topic.essentials.map((e: string, i: number) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.3)", flexShrink: 0, marginTop: 6 }} />
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.55 }}>{e}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10, fontFamily: "monospace", opacity: 0.9 }}>Best Performance</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {topic.performance.map((p: string, i: number) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: color, flexShrink: 0, marginTop: 6, opacity: 0.8 }} />
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.55, fontWeight: 500 }}>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── SEAT BAR ─────────────────────────────────────────────────────────────────

const SeatBar = ({ pct, color, visible, delay }: { pct: number; color: string; visible: boolean; delay: number }) => {
  const [w, setW] = useState(0);
  const left = Math.round(parseInt(String(pct)) > 0 ? 100 * (1 - pct / 100) : 0);
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setW(pct), delay);
    return () => clearTimeout(t);
  }, [visible, pct, delay]);
  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 6, fontFamily: "monospace" }}>
        <span>Seats filling fast</span>
        <span style={{ color, fontWeight: 700 }}>{left} left</span>
      </div>
      <div style={{ height: 4, borderRadius: 999, background: "rgba(255,255,255,0.07)", overflow: "hidden" }} role="meter" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div style={{ height: "100%", borderRadius: 999, width: `${w}%`, transition: "width 1.4s cubic-bezier(0.4,0,0.2,1)", background: `linear-gradient(90deg, ${color}, ${color}88)` }} />
      </div>
    </div>
  );
};

// ─── COUNTDOWN ────────────────────────────────────────────────────────────────

const Countdown = ({ intake, color }: { intake: string; color: string }) => {
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => {
    if (intake === "Rolling") return;
    const target = new Date(`${intake} 1`);
    const diff = Math.max(0, Math.ceil((target.getTime() - Date.now()) / 86400000));
    setDays(diff);
  }, [intake]);
  if (days === null) return null;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 999, border: `1px solid ${color}38`, color, background: `${color}10`, fontFamily: "monospace" }}>
      <svg style={{ width: 12, height: 12 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      {days}d to intake
    </span>
  );
};

// ─── PARTICLES ────────────────────────────────────────────────────────────────

const useParticles = (n: number) => useMemo(() =>
  Array.from({ length: n }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 2.5 + 1,
    dur: Math.random() * 8 + 6,
    delay: Math.random() * 5,
  })), [n]);

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeModule, setActiveModule] = useState("foundations");
  const [search, setSearch] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const particles = useParticles(22);

  useEffect(() => {
    setIsMounted(true);
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const currentModule = modules.find(m => m.id === activeModule)!;
  const isSearching = search.trim().length > 0;

  const displayTopics = useMemo(() => {
    if (!isSearching) return currentModule.topics.map(t => ({ ...t, moduleColor: currentModule.color }));
    const q = search.toLowerCase();
    return allTopics.filter(t =>
      t.title.toLowerCase().includes(q) ||
      t.essentials.some((e: string) => e.toLowerCase().includes(q))
    );
  }, [search, isSearching, currentModule]);

  const modIcons: Record<string, string> = { foundations: "🏛️", sales: "📈", tech: "⚡", people: "🤝", global: "🌐" };

  return (
    <section
      id="services"
      ref={sectionRef}
      aria-labelledby="services-heading"
      className="relative overflow-hidden py-20 sm:py-28"
      style={{ background: "linear-gradient(175deg, #0a1628 0%, #0d1f45 55%, #0a1628 100%)" }}
    >
      {/* ── Atmosphere ── */}
      <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 2px 2px, rgba(4,77,212,0.32) 1px, transparent 1px)", backgroundSize: "38px 38px", opacity: 0.065 }} />
        <div style={{ position: "absolute", top: "8%",   right: "-140px", width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(4,77,212,0.09) 0%, transparent 70%)", filter: "blur(50px)" }} />
        <div style={{ position: "absolute", bottom: "12%", left: "-100px", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(235,72,0,0.07) 0%, transparent 70%)", filter: "blur(50px)" }} />
        {isMounted && particles.map(p => (
          <div key={p.id} style={{ position: "absolute", left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size, borderRadius: "50%", background: "rgba(235,72,0,0.12)", animation: `floatP ${p.dur}s ease-in-out ${p.delay}s infinite`, willChange: "transform" }} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* ══ HEADER ══ */}
        <div
          className="text-center mb-14"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}
        >
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5" style={{ background: "rgba(235,72,0,0.12)", border: "1px solid rgba(235,72,0,0.28)" }}>
            <span className="w-2 h-2 rounded-full" style={{ background: "#eb4800", animation: "ping 2s ease-in-out infinite" }} />
            <span className="text-xs font-bold tracking-widest" style={{ color: "#eb4800", fontFamily: "monospace" }}>2026 INAUGURAL INTAKE — NOW OPEN</span>
          </div>

          <p className="flex items-center justify-center gap-2.5 text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#044dd4" }}>
            <span className="w-8 h-px" style={{ background: "rgba(4,77,212,0.45)" }} />
            Our Programs
            <span className="w-8 h-px" style={{ background: "rgba(4,77,212,0.45)" }} />
          </p>

          <h2 id="services-heading" className="font-bold text-white mb-4" style={{ fontSize: "clamp(28px,5vw,50px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Education Designed for{" "}
            <span className="relative inline-block" style={{ color: "#eb4800", fontStyle: "italic" }}>
              Real Careers
              <svg className="absolute -bottom-2 left-0 w-full" height="4" aria-hidden>
                <line x1="0" y1="2" x2="100%" y2="2" stroke="#eb4800" strokeWidth="2.5" strokeDasharray="8 6" style={{ animation: "dash 2s linear infinite" }} />
              </svg>
            </span>
          </h2>

          <p className="text-base sm:text-lg max-w-xl mx-auto mb-10" style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.75 }}>
            Every programme is purpose-built with industry input — so you graduate ready, not just qualified.
          </p>

          <div className="flex justify-center gap-10 flex-wrap">
            {([
              { val: "20", label: "Topics" },
              { val: "45", label: "Days" },
              { val: "3 Hrs", label: "Daily" },
              { val: "100%", label: "Practical" },
            ] as const).map((s, i) => (
              <div key={s.label} className="text-center">
                <div className="font-black leading-none" style={{ fontSize: 26, color: i % 2 === 0 ? "#eb4800" : "#6699ff" }}>{s.val}</div>
                <div className="mt-1 text-sm tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ CURRICULUM EXPLORER ══ */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1.5px solid rgba(255,255,255,0.04)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: "all 0.7s ease 0.38s",
          }}
        >
          {/* Curriculum header bar */}
          <div className="flex flex-wrap items-end justify-between gap-4 px-6 sm:px-8 pt-7 pb-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div>
              <p className="text-sm font-bold tracking-widest uppercase mb-1.5 text-[#2e70ea]" style={{ fontFamily: "monospace" }}>Full Curriculum · 20 Topics</p>
              <h3 className="font-bold text-white" style={{ fontSize: "clamp(20px,3vw,28px)", letterSpacing: "-0.01em" }}>
                One Course.{" "}
                <span style={{ color: "rgba(255,255,255,0.45)", fontStyle: "italic", fontWeight: 400 }}>Complete Business Foundation.</span>
              </h3>
            </div>
            {/* Search input */}
            <div className="relative" style={{ width: 240 }}>
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(255,255,255,0.3)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
              </svg>
              <input
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                placeholder="Search topics…"
                className="w-full text-sm text-white placeholder-white/30 outline-none"
                style={{ background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.09)", borderRadius: 10, padding: "10px 12px 10px 36px", fontFamily: "inherit", transition: "border-color 0.2s" }}
                onFocus={(e: React.FocusEvent<HTMLInputElement>) => (e.currentTarget.style.borderColor = "rgba(4,77,212,0.55)")}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")}
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* ── Module sidebar ── */}
            {!isSearching && (
              <div className="flex flex-row lg:flex-col gap-2 p-4 lg:p-5 overflow-x-auto lg:overflow-visible" style={{ borderRight: "1px solid rgba(255,255,255,0.06)", minWidth: 220, flexShrink: 0 }}>
                {modules.map((m: ModuleType, i: number) => (
                  <button
                    key={m.id}
                    onClick={() => setActiveModule(m.id)}
                    aria-pressed={activeModule === m.id}
                    className="flex items-center gap-3 rounded-xl text-left whitespace-nowrap lg:whitespace-normal transition-all duration-250"
                    style={{
                      padding: "12px 16px",
                      background: activeModule === m.id ? `${m.color}1a` : "transparent",
                      border: activeModule === m.id ? `1.5px solid ${m.color}45` : "1.5px solid transparent",
                      boxShadow: activeModule === m.id ? `0 4px 20px ${m.color}1a` : "none",
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateX(0)" : "translateX(-12px)",
                      transitionDelay: visible ? `${i * 60}ms` : "0ms",
                    }}
                  >
                    <span style={{ fontSize: 18 }}>{modIcons[m.id]}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold leading-snug truncate" style={{ color: activeModule === m.id ? "white" : "rgba(255,255,255,0.6)", transition: "color 0.2s" }}>{m.label}</p>
                    </div>
                    <span
                      className="text-sm font-bold rounded-full px-2 py-0.5 flex-shrink-0"
                      style={{
                        background: activeModule === m.id ? m.color : "rgba(255,255,255,0.07)",
                        color: activeModule === m.id ? "#fff" : "rgba(255,255,255,0.4)",
                        fontFamily: "monospace",
                        transition: "all 0.2s",
                        fontSize: 11,
                      }}
                    >
                      {m.topics.length}
                    </span>
                  </button>
                ))}
                <div className="hidden lg:block mt-4 rounded-xl p-3 text-center" style={{ background: "rgba(235,72,0,0.08)", border: "1px solid rgba(235,72,0,0.18)" }}>
                  <p className="text-sm font-bold mb-0.5" style={{ color: "#eb4800" }}>20 Topics Total</p>
                  <p className="text-sm leading-snug" style={{ color: "rgba(255,255,255,0.35)" }}>Click any topic to expand</p>
                </div>
              </div>
            )}

            {/* ── Topics list ── */}
            <div className="flex-1 p-4 sm:p-6">
              {isSearching && (
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>{displayTopics.length} result{displayTopics.length !== 1 ? "s" : ""} for</span>
                  <span className="text-sm font-bold" style={{ color: "#eb4800" }}>"{search}"</span>
                  <button onClick={() => setSearch("")} className="ml-auto text-sm underline" style={{ color: "rgba(255,255,255,0.4)", background: "none", border: "none", cursor: "pointer" }}>Clear</button>
                </div>
              )}

              {!isSearching && (
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base" style={{ background: `${currentModule.color}1a` }}>
                    {modIcons[currentModule.id]}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white leading-none mb-1.5">{currentModule.label}</h4>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>{currentModule.topics.length} topics · tap to expand essentials & outcomes</p>
                  </div>
                </div>
              )}

              {displayTopics.length === 0 ? (
                <div className="py-12 text-center text-base" style={{ color: "rgba(255,255,255,0.3)" }}>No topics found for "{search}"</div>
              ) : (
                displayTopics.map((t, i: number) => (
                  <TopicRow
                    key={t.num}
                    topic={t}
                    color={"moduleColor" in t ? (t as typeof allTopics[0]).moduleColor : currentModule.color}
                    index={i}
                    visible={visible}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* ══ BOTTOM FEATURE STRIP (REMOVED) ══ */}

        {/* ══ CTA BUTTON ══ */}
        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-base font-bold rounded-full transition-all duration-250"
            style={{ padding: "16px 42px", border: "1.5px solid rgba(4,77,212,0.38)", color: "#6699ff", background: "rgba(4,77,212,0.08)", textDecoration: "none" }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "#044dd4";
              el.style.color = "#fff";
              el.style.borderColor = "#044dd4";
              el.style.transform = "translateY(-2px)";
              el.style.boxShadow = "0 8px 32px rgba(4,77,212,0.35)";
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(4,77,212,0.08)";
              el.style.color = "#6699ff";
              el.style.borderColor = "rgba(4,77,212,0.38)";
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "none";
            }}
          >
            View All Programs
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1" style={{ opacity: 0.25 }} aria-hidden>
        <span className="text-white text-sm">Explore</span>
        <svg className="w-4 h-4 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
        </svg>
      </div>

      <style jsx global>{`
        @keyframes ping   { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.7);opacity:0.35} }
        @keyframes dash   { to { stroke-dashoffset: -14; } }
        @keyframes floatP { 0%,100%{transform:translateY(0) translateX(0);opacity:0} 50%{transform:translateY(-44px) translateX(18px);opacity:0.5} }
        @media (prefers-reduced-motion: reduce) {
          *,[style*="animation"] { animation: none !important; transition-duration: 10ms !important; }
        }
      `}</style>
    </section>
  );
}