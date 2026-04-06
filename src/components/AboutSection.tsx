rmdir /s /q grassfront-mainimport { motion } from "framer-motion";
import { Diamond, Layers, Shield, BarChart3 } from "lucide-react";

const features = [
  { icon: Diamond, title: "Business-First Approach", desc: "We start with your goals, not just requirements." },
  { icon: Layers, title: "Scalable Solutions", desc: "Built to grow with your business, not limit it." },
  { icon: Shield, title: "Risk-Aware Engineering", desc: "We design with security, compliance and reliability in mind." },
  { icon: BarChart3, title: "Real Outcomes", desc: "Every solution is built to drive measurable impact." },
];

const AboutSection = () => {
  return (
    <section id="features" className="relative section-padding overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
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
          <p className="text-muted-foreground max-w-2xl mx-auto mb-16">
            Instead of merely shipping code, we assess workflows, business rules and operational risks, engineering scalable platforms that support real business outcomes.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="p-6 rounded-xl glow-border glow-border-hover bg-card transition-all text-left"
            >
              <div className="w-12 h-12 rounded-lg icon-glow flex items-center justify-center mb-5">
                <f.icon size={22} className="text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
