export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="bg-ink border-t border-white/8 px-4 sm:px-6 py-12 sm:py-16"
    >
      <div className="max-w-7xl mx-auto pl-0 md:pl-20 xl:pl-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10 sm:mb-12">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a
              href="/"
              aria-label="IPBM Home"
              className="flex items-center gap-3 mb-4 group w-fit"
            >
              <div className="relative w-10 h-10 flex-shrink-0">
                <div className="absolute inset-0 bg-navy-600 rounded-lg rotate-3" aria-hidden="true" />
                <div className="absolute inset-0 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center font-display font-bold text-white">
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
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wide">
              Programs
            </h3>
            <ul className="space-y-2.5">
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
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
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
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wide">
              Get In Touch
            </h3>
            <address className="not-italic space-y-3">
              <p className="text-navy-400 text-sm leading-relaxed">
                12, Institutional Area,<br />
                Madhapur, Hyderabad – 500081<br />
                Telangana, India
              </p>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 text-navy-400 hover:text-gold-400 text-sm transition-colors focus:outline-none focus:underline"
              >
                📞 +91 98765 43210
              </a>
              <a
                href="mailto:admissions@ipbm.edu.in"
                className="flex items-center gap-2 text-navy-400 hover:text-gold-400 text-sm transition-colors focus:outline-none focus:underline"
              >
                ✉️ admissions@ipbm.edu.in
              </a>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-navy-500 text-xs text-center sm:text-left">
            © {year} Institute of Practical Business Management. All rights reserved.
          </p>
          <div className="flex gap-5" role="list" aria-label="Legal links">
            {["Privacy Policy", "Terms of Use", "Sitemap"].map((item) => (
              <a
                key={item}
                href="#"
                role="listitem"
                className="text-navy-500 hover:text-navy-300 text-xs transition-colors focus:outline-none focus:underline"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
