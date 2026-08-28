import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AvailabilityStrip from "@/components/AvailabilityStrip";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import CurrentlyBuilding from "@/components/CurrentlyBuilding";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import RecruiterCard from "@/components/RecruiterCard";

const Index = () => {
  useEffect(() => {
    document.title = "Kristhian Pinili — Data Analyst & ML Engineer Portfolio";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-300">
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <AvailabilityStrip />
        <About />
        <Skills />
        <Projects />
        <CurrentlyBuilding />
        <Experience />
        <Certifications />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <RecruiterCard />
    </div>
  );
};

export default Index;
