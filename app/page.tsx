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

export default function Home() {
  return (
    <>
      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] bg-gold-500 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-lg"
      >
        Skip to main content
      </a>

      <Header />

      <main id="main-content">
        <Hero />

        {/* Side navbar appears after hero */}
        <SideNavbar />

        <About />
        <Services />
        <Team />
        <Testimonials />
        <FAQs />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
