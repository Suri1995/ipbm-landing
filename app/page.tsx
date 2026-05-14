import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SideNavbar from "@/components/SideNavbar";
import About from "@/components/About";
import Services from "@/components/Services";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import FAQs from "@/components/FAQs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

import { getHomePage } from "@/lib/strapi";

export default async function Home() {
  const data = await getHomePage();

  const testimonialsSection =
    data?.data?.attributes?.testimonialsSection ||
    data?.data?.testimonialsSection ||
    null;

  return (
    <>
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] bg-gold-500 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-lg"
      >
        Skip to main content
      </a>

      <Header />

      <main id="main-content">
        <Hero />
        <SideNavbar />

        <About />
        <Services />
        <Team />

        <Testimonials data={testimonialsSection} />

        <FAQs />
        <Contact />
      </main>

      <Footer />
    </>
  );
}