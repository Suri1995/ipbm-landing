"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const faqs = [
  {
    q: "What are the eligibility criteria for the MBA program?",
    a: "Applicants must hold a bachelor's degree (any discipline) with a minimum of 50% aggregate from a recognised university. Final-year students awaiting results may also apply conditionally. Work experience is preferred but not mandatory.",
  },
  {
    q: "Is there an entrance examination for admission?",
    a: "Yes. IPBM accepts scores from CAT, MAT, XAT, CMAT, or our own IPBM Admission Test (IPBMAT). Shortlisted candidates are then invited for a Group Discussion and Personal Interview round.",
  },
  {
    q: "What is the average package for MBA graduates?",
    a: "The median CTC for our MBA graduates is ₹8.5 LPA with the highest recorded package at ₹22 LPA. Our placement rate stands at 98% within 90 days of graduation.",
  },
  {
    q: "Do you offer scholarships or financial aid?",
    a: "Yes. IPBM offers merit-based scholarships (up to 100% tuition waiver), need-based grants, and has tie-ups with leading banks for education loans at concessional rates. Women students and first-generation learners receive additional support.",
  },
  {
    q: "Are the programs available online or hybrid?",
    a: "The Executive MBA and short-term certification programs are available in hybrid mode (weekend classes + recorded lectures). The full-time MBA and PGDM are campus-based with optional online electives in semester 4.",
  },
  {
    q: "What industries do IPBM alumni typically enter?",
    a: "Our alumni are spread across banking & finance (28%), technology & consulting (24%), FMCG & retail (20%), manufacturing & operations (14%), healthcare (8%), and entrepreneurship (6%).",
  },
  {
    q: "Does IPBM have international tie-ups?",
    a: "Yes. We have academic partnerships with institutions in Singapore, UK, and Germany. MBA students have access to a semester exchange programme and dual certificate options with partner universities.",
  },
  {
    q: "How do I apply and what is the deadline?",
    a: "Applications are accepted on a rolling basis through our website. The primary deadline for July intake is 31st May and for January intake is 30th November. Apply through the Contact section below or call our admissions helpline.",
  },
];

function FAQItem({ q, a, index, isOpen, onToggle }: { q: string; a: string; index: number; isOpen: boolean; onToggle: () => void }) {
  const id = `faq-${index}`;
  const panelId = `faq-panel-${index}`;
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border-b border-navy-100 last:border-0">
      <h3>
        <button
          id={id}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="w-full flex items-center justify-between gap-4 py-4 sm:py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-inset rounded"
        >
          <span className="font-display font-semibold text-navy-900 text-sm sm:text-base lg:text-lg pr-2">
            {q}
          </span>
          <span
            className={`flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-navy-200 flex items-center justify-center transition-all duration-200 ${
              isOpen ? "bg-navy-600 border-navy-600 rotate-45" : ""
            }`}
            aria-hidden="true"
          >
            <svg
              className={`w-3 h-3 transition-colors ${isOpen ? "text-white" : "text-navy-400"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
            </svg>
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={id}
        ref={contentRef}
        className="grid transition-all duration-300 ease-in-out"
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
        }}
      >
        <div className="overflow-hidden">
          <p className="text-navy-500 text-xs sm:text-sm lg:text-base leading-relaxed pb-4 sm:pb-5">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQs() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = useCallback((index: number) => {
    setOpenIndex(prev => prev === index ? null : index);
  }, []);

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
      id="faqs"
      ref={ref}
      aria-labelledby="faqs-heading"
      className="py-16 sm:py-20 lg:py-28 bg-cream px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto pl-0 md:pl-20 xl:pl-24">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 xl:gap-16">
          {/* Left label */}
          <div
            className={`lg:col-span-2 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-gold-600 font-semibold text-sm tracking-widest uppercase mb-3">
              Got Questions?
            </p>
            <h2
              id="faqs-heading"
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-900 mb-4 text-balance"
            >
              Frequently Asked{" "}
              <span className="text-navy-600">Questions</span>
            </h2>
            <p className="text-navy-500 leading-relaxed mb-5 sm:mb-6 text-sm sm:text-base">
              Can&apos;t find your answer here? Our admissions team is happy to
              help.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-navy-600 hover:bg-navy-700 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:ring-offset-2"
              aria-label="Go to contact section to ask a question"
            >
              Ask a Question
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Right accordion */}
          <div
            className={`lg:col-span-3 bg-white border border-navy-100 rounded-2xl px-4 sm:px-6 lg:px-8 transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {faqs.map((faq, i) => (
              <FAQItem 
                key={faq.q} 
                q={faq.q} 
                a={faq.a} 
                index={i} 
                isOpen={openIndex === i}
                onToggle={() => handleToggle(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
