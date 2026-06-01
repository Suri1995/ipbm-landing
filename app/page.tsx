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
import Image from "next/image"; // Add this import

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
        {/* <SideNavbar /> */}

        <About />
        <Services />
        <Team />

        {/* <Testimonials data={testimonialsSection} /> */}

        <FAQs />
        <Contact />
      </main>

      {/* <Footer /> */}
<a href="https://wa.me/+919866739499" target="_blank" className="absolute top-0 right-0">
                <Image
                  src = "/whatsapp-image.webp"
                  alt = "whatsapp"
                  width={40}
                  height={41}
                  sizes="40px"
                  className="fixed bottom-5 right-5 z-50 shadow-lg transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-2xl active:scale-95 rounded-full animate-bounce w-10 md:w-[70px]"
                /> 
              </a>
    </>
  );
}