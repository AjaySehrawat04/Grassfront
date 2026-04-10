import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

import imgBizzStudio from "@/assets/projects-Bizz-Studio.jpg";
import imgHorecaMall from "@/assets/projects-Horeca-Mall.jpg";
import imgPlatter from "@/assets/projects-Platter.jpg";
import imgBizzeazy from "@/assets/projects-bizzeazy.jpg";
import imgGrassFront from "@/assets/projects-grassFront.png";

const projects = [
  {
    id: 1,
    title: "Bizz Studio",
    description: "Creative digital studio crafting innovative designs and brand experiences",
    image: imgBizzStudio,
  },
  {
    id: 2,
    title: "Horeca Mall",
    description: "Complete hospitality marketplace connecting hotels, restaurants, and catering suppliers",
    image: imgHorecaMall,
  },
  {
    id: 3,
    title: "Platter",
    description: "Smart food ordering and restaurant management platform for seamless dining experiences",
    image: imgPlatter,
  },
  {
    id: 4,
    title: "Bizzeazy",
    description: "Comprehensive business automation platform streamlining operations and boosting productivity",
    image: imgBizzeazy,
  },
  {
    id: 5,
    title: "GrassFront",
    description: "Building enterprise solutions that businesses rely on",
    image: imgGrassFront,
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
        scrollContainer.scrollLeft += 1; 


        
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
                  className="min-w-[190px] sm:min-w-[220px] md:min-w-[250px] flex-shrink-0 group relative rounded-xl bg-card border border-border overflow-hidden transition-all duration-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.1)] snap-start lg:snap-align-none"
                >
                   {/* Glow border pseudo-element for hover */}
                   <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none z-30" style={{ boxShadow: 'inset 0 0 0 1px hsl(217 91% 55% / 0.5)' }}></div>
                   
                   <div className="h-32 sm:h-40 w-full overflow-hidden relative">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10" />
                      
                      {/* Description Overlay */}
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="absolute inset-0 z-20 flex flex-col items-center justify-center p-3 text-center bg-background/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
                      >
                        <p className="text-[10px] sm:text-xs text-foreground font-medium leading-tight">
                          {project.description}
                        </p>
                        <div className="mt-2 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                          <ExternalLink size={12} />
                        </div>
                      </motion.div>

                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className={`w-full h-full transition-transform duration-700 ease-out group-hover:scale-110 ${
                          project.title === "Platter" || project.title === "Bizzeazy" || project.title === "GrassFront"
                            ? "object-contain p-8" 
                            : "object-cover"
                        }`}
                        loading="lazy"
                      />
                   </div>
                   
                   <div className="p-3 sm:p-4 relative z-10 bg-gradient-to-b from-transparent to-card/50">
                      <h3 className="text-sm sm:text-base font-bold group-hover:text-primary transition-colors text-center">{project.title}</h3>
                   </div>
                </motion.div>
             ))}
         </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
