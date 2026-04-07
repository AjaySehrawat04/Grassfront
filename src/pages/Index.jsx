import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WhySection from "@/components/WhySection";
import ExpertiseSection from "@/components/ExpertiseSection";
import ProcessSection from "@/components/ProcessSection";
import OfferingsSection from "@/components/OfferingsSection";
import ProjectsSection from "@/components/ProjectsSection";
import MediaSection from "@/components/MediaSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <WhySection />
      <ExpertiseSection />
      <ProcessSection />
      <OfferingsSection />
      <ProjectsSection />
      <MediaSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
