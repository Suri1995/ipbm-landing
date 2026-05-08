"use client";
import { useEffect, useRef, useState, FormEvent } from "react";

const contactDetails = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Address",
    value: "12, Institutional Area, Madhapur, Hyderabad – 500081, Telangana",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Phone",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email",
    value: "admissions@ipbm.edu.in",
    href: "mailto:admissions@ipbm.edu.in",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Office Hours",
    value: "Mon–Sat, 9 AM – 6 PM",
  },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", program: "", message: "" });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate network request
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
  };

  return (
    <section
      id="contact"
      ref={ref}
      aria-labelledby="contact-heading"
      className="py-20 sm:py-28 bg-navy-900 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto pl-0 md:pl-20 xl:pl-24">
        <div
          className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-gold-500 font-semibold text-sm tracking-widest uppercase mb-3">
            Admissions & Enquiries
          </p>
          <h2
            id="contact-heading"
            className="font-display text-3xl sm:text-4xl font-bold text-white mb-4 text-balance"
          >
            Start Your Journey{" "}
            <em className="not-italic text-gold-400">With IPBM</em>
          </h2>
          <p className="text-navy-300 text-base sm:text-lg max-w-2xl mx-auto">
            Fill in the form below and our admissions counsellor will get in
            touch within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact info */}
          <div
            className={`lg:col-span-2 flex flex-col gap-6 transition-all duration-700 delay-100 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {contactDetails.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gold-500/15 border border-gold-500/30 rounded-xl flex items-center justify-center text-gold-400 flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-navy-400 text-xs uppercase tracking-wide font-medium mb-0.5">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-white text-sm hover:text-gold-400 transition-colors focus:outline-none focus:underline"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-white text-sm">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Social links */}
            <div className="mt-2">
              <p className="text-navy-400 text-xs uppercase tracking-wide font-medium mb-3">
                Follow Us
              </p>
              <div className="flex gap-3" role="list" aria-label="Social media links">
                {["LinkedIn", "Instagram", "YouTube", "Facebook"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    role="listitem"
                    aria-label={`Follow IPBM on ${s}`}
                    className="w-9 h-9 bg-white/8 border border-white/15 rounded-xl flex items-center justify-center text-navy-300 hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-navy-900 text-xs font-bold"
                  >
                    {s[0]}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div
            className={`lg:col-span-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {status === "sent" ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center mb-4" aria-hidden="true">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-white text-2xl mb-2">
                  Enquiry Received!
                </h3>
                <p className="text-navy-300 text-sm max-w-sm">
                  Thank you, <strong className="text-white">{form.name}</strong>. Our admissions team will contact you within 24 hours.
                </p>
                <button
                  onClick={() => { setStatus("idle"); setForm({ name: "", email: "", phone: "", program: "", message: "" }); }}
                  className="mt-6 text-gold-400 text-sm hover:text-gold-300 underline focus:outline-none"
                >
                  Submit another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-label="Admissions enquiry form">
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-navy-200 text-sm font-medium mb-1.5">
                      Full Name <span aria-hidden="true" className="text-gold-400">*</span>
                      <span className="sr-only">(required)</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full bg-white/8 border border-white/15 text-white placeholder-navy-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-navy-200 text-sm font-medium mb-1.5">
                      Email Address <span aria-hidden="true" className="text-gold-400">*</span>
                      <span className="sr-only">(required)</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@email.com"
                      className="w-full bg-white/8 border border-white/15 text-white placeholder-navy-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="phone" className="block text-navy-200 text-sm font-medium mb-1.5">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full bg-white/8 border border-white/15 text-white placeholder-navy-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="program" className="block text-navy-200 text-sm font-medium mb-1.5">
                      Program of Interest
                    </label>
                    <select
                      id="program"
                      name="program"
                      value={form.program}
                      onChange={handleChange}
                      className="w-full bg-navy-900 border border-white/15 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all appearance-none"
                    >
                      <option value="" className="text-navy-400">Select a program</option>
                      <option value="mba">MBA in Business Management</option>
                      <option value="pgdm">PGDM</option>
                      <option value="emba">Executive MBA</option>
                      <option value="cert">Short-Term Certification</option>
                    </select>
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-navy-200 text-sm font-medium mb-1.5">
                    Message / Questions
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your background or any specific questions..."
                    className="w-full bg-white/8 border border-white/15 text-white placeholder-navy-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  aria-disabled={status === "sending"}
                  className="w-full bg-gold-500 hover:bg-gold-400 disabled:opacity-70 text-white font-semibold py-3.5 rounded-full text-sm transition-all duration-200 hover:shadow-gold-glow focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-navy-900 flex items-center justify-center gap-2"
                >
                  {status === "sending" ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    "Submit Enquiry"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
