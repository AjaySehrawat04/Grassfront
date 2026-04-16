import { motion } from "framer-motion";
import { Diamond, Layers, Shield, BarChart3 } from "lucide-react";

const features = [
  { icon: Diamond, title: "Business-First Approach", desc: "We start with your goals, not just requirements." },
  { icon: Layers, title: "Scalable Solutions", desc: "Built to grow with your business, not limit it." },
  { icon: Shield, title: "Risk-Aware Engineering", desc: "We design with security, compliance and reliability in mind." },
  { icon: BarChart3, title: "Real Outcomes", desc: "Every solution is built to drive measurable impact." },
];

const AboutSection = () => {
  return (
    <section id="about" className="relative section-padding overflow-hidden z-0 bg-[#05070d]">
      {/* Background (z-0) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none z-0" />



      <div className="container mx-auto text-center relative flex flex-col items-center">
        
        {/* TEXT CONTENT - Above Arc 1 (z-4) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative z-[4] pb-24 w-full"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">About GrassFront</span>
          <h2 className="text-3xl md:text-5xl font-bold font-display mt-4 mb-6">
            IT Services Organization<br />
            Empowering Modern<br />
            <span className="text-gradient-blue">Business Technology</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
            GrassFront works alongside startups, SMEs and enterprises to architect, develop and sustain dependable technology solutions.
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Instead of merely shipping code, we assess workflows, business rules and operational risks, engineering scalable platforms that support real business outcomes.
          </p>
        </motion.div>

        {/* WRAPPER FOR HORIZON ARC AND CARDS */}
        <div className="relative w-full z-[2]">

          {/* LUMINOUS HORIZON ARC */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 w-[150vw] md:w-[120vw] h-[60px] pointer-events-none z-0"
            style={{
              top: '-70px', 
              background: 'radial-gradient(ellipse at top, rgba(59, 130, 246, 0.4) 0%, transparent 60%)',
              borderTop: '2px solid rgba(59, 130, 246, 0.9)',
              borderRadius: '50% 50% 0 0',
              boxShadow: '0 -15px 50px rgba(59, 130, 246, 0.5), inset 0 5px 15px rgba(59, 130, 246, 0.3)',
              filter: 'blur(1px)'
            }}
          />

          {/* CARDS - Below Arc 2 (z-2) */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-[2]">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="about-card p-6 rounded-xl glow-border bg-card text-left cursor-pointer pointer-events-auto"
              >
                <div className="relative z-[5]">
                  <div className="w-12 h-12 rounded-lg icon-glow flex items-center justify-center mb-5 transition-all duration-300">
                    <f.icon size={22} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
