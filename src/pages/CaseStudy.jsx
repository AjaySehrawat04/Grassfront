import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CaseStudy = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center mt-24 px-4 text-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Case Study</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">This page is under construction.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudy;
