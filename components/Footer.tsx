export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="bg-ink border-t border-white/8 py-10 sm:py-12 lg:py-16"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-8 sm:mb-10 lg:mb-12">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a
              href="/"
              aria-label="IPBM Home"
              className="flex items-center gap-3 mb-4 group w-fit"
            >
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0">
                <div className="absolute inset-0 bg-navy-600 rounded-lg rotate-3" aria-hidden="true" />
                <div className="absolute inset-0 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center font-display font-bold text-white text-sm sm:text-base">
                  IP
                </div>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-display font-bold text-white text-sm">
                  Institute of Practical
                </span>
                <span className="text-gold-500 text-xs font-medium tracking-widest uppercase">
                  Business Management
                </span>
              </div>
            </a>
            <p className="text-navy-400 text-sm leading-relaxed max-w-xs">
              Shaping India&apos;s future business leaders through practical,
              industry-aligned education since 2009.
            </p>
          </div>

          {/* Programs */}
          <nav aria-label="Programs links">
            <h3 className="text-white font-semibold text-sm mb-3 sm:mb-4 tracking-wide">
              Programs
            </h3>
            <ul className="space-y-2 sm:space-y-2.5">
              {["MBA in Business Management", "PGDM", "Executive MBA", "Certifications", "Online Courses"].map((item) => (
                <li key={item}>
                  <a
                    href="#services"
                    className="text-navy-400 hover:text-gold-400 text-sm transition-colors focus:outline-none focus:underline"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Quick links */}
          <nav aria-label="Quick links">
            <h3 className="text-white font-semibold text-sm mb-3 sm:mb-4 tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2 sm:space-y-2.5">
              {[
                { label: "About IPBM", href: "#about" },
                { label: "Our Faculty", href: "#team" },
                { label: "Alumni Speak", href: "#testimonials" },
                { label: "FAQs", href: "#faqs" },
                { label: "Contact Us", href: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-navy-400 hover:text-gold-400 text-sm transition-colors focus:outline-none focus:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3 sm:mb-4 tracking-wide">
              Get In Touch
            </h3>
            <address className="not-italic space-y-2 sm:space-y-3">
              <p className="text-navy-400 text-sm leading-relaxed">
                12, Institutional Area,<br />
                Madhapur, Hyderabad – 500081<br />
                Telangana, India
              </p>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 text-navy-400 hover:text-gold-400 text-sm transition-colors focus:outline-none focus:underline"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +91 98765 43210
              </a>
              <a
                href="mailto:admissions@ipbm.edu.in"
                className="flex items-center gap-2 text-navy-400 hover:text-gold-400 text-sm transition-colors focus:outline-none focus:underline"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                admissions@ipbm.edu.in
              </a>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 sm:pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-navy-500 text-xs text-center sm:text-left">
            © {year} Institute of Practical Business Management. All rights reserved.
          </p>
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-5" aria-label="Legal links">
            {["Privacy Policy", "Terms of Use", "Sitemap"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-navy-500 hover:text-navy-300 text-xs transition-colors focus:outline-none focus:underline"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
