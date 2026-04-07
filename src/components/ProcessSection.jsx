import { useRef, useMemo, useState, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FileText, Search, Blocks, Code, ShieldCheck, Headphones } from "lucide-react";

const steps = [
  { num: "01", icon: FileText, title: "Select a Project", desc: "We begin by understanding your unique requirements and goals. Whether you're looking to build a custom software solution, improve your website's performance, or integrate the latest technology, our team will help you select the right project scope to align with your objectives." },
  { num: "02", icon: Search, title: "Project Analysis", desc: "Once the project is selected, our team conducts a thorough analysis to determine the perfect strategy. We break down the project into clear milestones, conduct risk assessments, and allocate the right resources for each phase." },
  { num: "03", icon: Blocks, title: "Architecture", desc: "Our architects design a technical blueprint and roadmap tailored to your needs. We select the right technology stack and structure to ensure scalability, performance, and maintainability." },
  { num: "04", icon: Code, title: "Engineering", desc: "Development begins with clean coding practices and agile methodologies. Our engineers build robust features iteratively, ensuring code quality and alignment with your goals at every step." },
  { num: "05", icon: ShieldCheck, title: "Quality Assurance", desc: "Rigorous testing ensures your product is reliable and bug-free. We conduct comprehensive QA checks before deployment, guaranteeing a smooth and successful launch." },
  { num: "06", icon: Headphones, title: "Support & Optimization", desc: "Post-launch, we provide continuous maintenance, performance optimization, and support. We help your solution evolve with your business needs, ensuring long-term success and growth." },
];

const BubbleBackground = ({ mouseX, mouseY }) => {
  const bubbles = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => {
      // 90% chance for sides, 10% for center
      const rand = Math.random();
      let xBase;
      if (rand < 0.45) {
        xBase = Math.random() * 20; // 0-20% (Left)
      } else if (rand < 0.9) {
        xBase = 80 + Math.random() * 20; // 80-100% (Right)
      } else {
        xBase = 20 + Math.random() * 60; // 20-80% (Center)
      }
      
      return {
        id: i,
        size: Math.random() * 30 + 10, // 10px to 40px
        x: xBase, 
        delay: Math.random() * 20,
        duration: Math.random() * 25 + 20, 
        opacity: Math.random() * 0.5 + 0.4, // Brightness (0.4 to 0.9)
        blur: Math.random() * 2 + 0.5,
        color: i % 2 === 0 ? "rgba(59, 130, 246, 0.8)" : "rgba(139, 92, 246, 0.7)",
        parallax: Math.random() * 60 + 40,
      };
    });
  }, []);

  return (
    <div className="absolute inset-x-0 top-0 bottom-0 w-screen left-1/2 -translate-x-1/2 overflow-hidden pointer-events-none z-0">
      {bubbles.map((b) => {
        const translateX = useTransform(mouseX, [-0.5, 0.5], [-b.parallax, b.parallax]);
        const translateY = useTransform(mouseY, [-0.5, 0.5], [-b.parallax, b.parallax]);

        return (
          <motion.div
            key={b.id}
            initial={{ top: "110%", opacity: 0 }}
            animate={{ 
              top: "-15%",
              opacity: [0, b.opacity, b.opacity, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: b.duration,
              repeat: Infinity,
              delay: b.delay,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              width: b.size,
              height: b.size,
              borderRadius: "50%",
              background: `radial-gradient(circle at 30% 30%, ${b.color}, transparent)`,
              filter: `blur(${b.blur}px)`,
              x: translateX,
              y: translateY,
              left: `${b.x}%`,
            }}
          />
        );
      })}
    </div>
  );
};


const ProcessSection = () => {
  const timelineRef = useRef(null);
  const containerRef = useRef(null);
  const isTimelineInView = useInView(timelineRef, { once: true, margin: "-100px" });

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mouseX = useSpring(rawX, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(rawY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    rawX.set(x);
    rawY.set(y);
  };

  return (
    <section 
      id="how-it-works" 
      className="section-padding relative bg-[#05070d] overflow-hidden"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      <div className="container mx-auto max-w-4xl pt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-semibold uppercase tracking-wider mb-4">Our Process</span>
          <h2 className="text-3xl md:text-5xl font-bold font-display">
            Our Approach <span className="text-gradient-blue">To Excellence</span>
          </h2>
          <p className="text-muted-foreground mt-4">A proven process that turns your ideas into scalable, high-performance digital solutions.</p>
        </motion.div>

        <div className="relative px-4 md:px-0" ref={timelineRef}>
          <BubbleBackground mouseX={mouseX} mouseY={mouseY} />
          
          {/* Animated timeline line that draws on scroll */}
          <div className="absolute left-8 top-0 bottom-0 w-px hidden md:block overflow-hidden">
            <motion.div
              className="w-full h-full bg-gradient-to-b from-primary/60 via-primary/30 to-transparent origin-top"
              initial={{ scaleY: 0 }}
              animate={isTimelineInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </div>

          <div className="space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{
                  opacity: 0,
                  x: i % 2 === 0 ? -60 : 60,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: i * 0.12,
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="process-step relative rounded-xl glow-border bg-card p-6 md:pl-20"
              >
                {/* Step number with ping animation */}
                <div className="hidden md:flex absolute left-4 top-6 items-center justify-center">
                  <span className="text-2xl md:text-3xl font-black text-[#001f3f] font-display relative">
                    {step.num}
                    <span
                      className="absolute inset-0 rounded-full"
                      style={{
                        animation: `step-ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite`,
                        animationDelay: `${i * 0.3}s`,
                      }}
                    />
                  </span>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg icon-glow flex items-center justify-center shrink-0">
                    <step.icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex justify-center mt-4 md:hidden">
                    <div className="w-px h-6 bg-primary/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
