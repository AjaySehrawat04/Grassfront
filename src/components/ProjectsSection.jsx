import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

import imgEnterprise from "@/assets/service-enterprise.jpg";
import imgWeb from "@/assets/service-web.jpg";
import imgAutomation from "@/assets/service-automation.jpg";
import imgApps from "@/assets/service-apps.jpg";
import imgBespoke from "@/assets/service-bespoke.jpg";

const projects = [
  {
    id: 1,
    title: "Global FinTech Hub",
    description: "Enterprise payment processing platform processing $10M+ daily.",
    image: imgEnterprise,
    tag: "FINANCE"
  },
  {
    id: 2,
    title: "AI Health Assistant",
    description: "Machine learning application for predictive diagnostic insights.",
    image: imgApps,
    tag: "HEALTHCARE"
  },
  {
    id: 3,
    title: "EcoLogistics SaaS",
    description: "Global supply chain tracking with real-time carbon footprint metrics.",
    image: imgWeb,
    tag: "LOGISTICS"
  },
  {
    id: 4,
    title: "Smart Mfg Grid",
    description: "Automated factory floor monitoring and predictive maintenance system.",
    image: imgAutomation,
    tag: "INDUSTRIALS"
  },
  {
    id: 5,
    title: "Cloud Commerce",
    description: "Scalable global e-commerce engine with real-time inventory multi-region syncing.",
    image: imgBespoke,
    tag: "RETAIL"
  }
];

const ProjectsSection = () => {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const isInView = useInView(scrollRef, { once: false, amount: 0.1 });

  // Continuous auto-scroll animation
  useEffect(() => {
    let animationId;
    const scrollContainer = scrollRef.current;

    const scroll = () => {
      if (scrollContainer && !isHovered) {
        scrollContainer.scrollLeft += 1; // Speed of auto-scroll
        
        // Reset scroll position if we've reached the end of the cloned items
        // Since we duplicate the list once, when we scroll past half the width, we snap back
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isHovered]);

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
  };
  
  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
  };

  return (
    <section id="use-cases" className="section-padding relative overflow-hidden bg-background">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="relative flex flex-col items-center justify-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-2 block">Our Projects</span>
            <h2 className="text-3xl md:text-5xl font-bold font-display">
              Featured <span className="text-gradient-blue">Work</span>
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Innovative solutions powering businesses worldwide
            </p>
          </motion.div>

          {/* Controls */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden md:flex items-center gap-4 absolute right-0 bottom-0"
          >
            <button 
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full border border-border/50 bg-card hover:bg-white/5 text-foreground flex items-center justify-center transition-all hover:border-primary/50 hover:shadow-[0_0_15px_rgba(37,99,235,0.2)]"
            >
              <ArrowLeft size={20} />
            </button>
            <button 
               onClick={scrollRight}
              className="w-12 h-12 rounded-full border border-border/50 bg-card hover:bg-white/5 text-foreground flex items-center justify-center transition-all hover:border-primary/50 hover:shadow-[0_0_15px_rgba(37,99,235,0.2)]"
            >
              <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Slider Container */}
      <div className="relative w-full max-w-[100vw] mt-4">
         {/* Left and Right Fade Gradients */}
         <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
         <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />
         
         <div 
            ref={scrollRef}
            className="flex gap-6 md:gap-8 overflow-x-auto pb-12 pt-4 px-4 md:px-[calc((100vw-min(100vw,1280px))/2+2rem)] snap-x snap-mandatory lg:snap-none hide-scrollbar cursor-grab active:cursor-grabbing"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
          >
             {/* Duplicate items for infinite scroll effect */}
             {[...projects, ...projects].map((project, idx) => (
                <motion.div
                  key={`${project.id}-${idx}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                  className="min-w-[300px] sm:min-w-[380px] md:min-w-[420px] flex-shrink-0 group relative rounded-2xl bg-card border border-border overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(37,99,235,0.15)] snap-start lg:snap-align-none"
                >
                   {/* Glow border pseudo-element for hover */}
                   <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" style={{ boxShadow: 'inset 0 0 0 1px hsl(217 91% 55% / 0.5)' }}></div>
                   
                   <div className="h-56 sm:h-64 w-full overflow-hidden relative">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute top-5 left-5 z-20 bg-background/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full">
                        <span className="text-[10px] sm:text-xs font-bold tracking-wider text-primary">{project.tag}</span>
                      </div>
                      <div className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-background/50 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 text-white hover:bg-primary/80">
                        <ExternalLink size={16} />
                      </div>
                   </div>
                   
                   <div className="p-6 sm:p-8 relative z-10 bg-gradient-to-b from-transparent to-card/50">
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                      <p className="text-sm sm:text-base text-muted-foreground line-clamp-2">{project.description}</p>
                   </div>
                </motion.div>
             ))}
         </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
