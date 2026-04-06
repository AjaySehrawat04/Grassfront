import { motion } from "framer-motion";
import { Pencil, Code, Zap, Shield, ArrowUpRight } from "lucide-react";
import heroShowcase from "@/assets/hero-showcase.jpg";

const ExpertiseSection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-end justify-between mb-16">
          <div>
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">Our Expertise</span>
            <h2 className="text-3xl md:text-5xl font-bold font-display mt-4">
              Our Expertise in <span className="text-gradient-blue">GrassFront</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl">End-to-end development services tailored for scalability and performance.</p>
          </div>
          <a href="#" className="flex items-center gap-2 text-primary font-medium mt-4 lg:mt-0">
            View all services <ArrowUpRight size={18} className="border border-primary rounded-full p-0.5" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Design &\nDevelopment",
              desc: "Crafting intuitive user journeys with pixel-perfect UI that captivates and converts.",
              tags: ["UX / UI", "Figma", "Adobe XD"],
              icon: Pencil,
            },
            {
              title: "Frontend &\nBackend",
              desc: "Building robust, scalable architectures for modern web apps with cutting-edge stacks.",
              tags: ["React", "Node.js", "JavaScript"],
              icon: Code,
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative rounded-xl glow-border glow-border-hover bg-card p-8 flex flex-col md:flex-row items-center gap-8 overflow-hidden"
            >
              <div className="relative w-full md:w-1/2 h-48 rounded-lg overflow-hidden">
                <img src={heroShowcase} alt={item.title} loading="lazy" className="w-full h-full object-cover opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>
              <div className="flex-1">
                <div className="w-10 h-10 rounded-lg icon-glow flex items-center justify-center mb-4">
                  <item.icon size={18} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground whitespace-pre-line mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="text-xs px-3 py-1.5 rounded-lg border border-border text-muted-foreground">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {[
            { icon: Zap, title: "Scalable", sub: "Built for Growth" },
            { icon: Shield, title: "Performance", sub: "Optimized Code" },
            { icon: Code, title: "Modern Stack", sub: "Future-Ready" },
            { icon: Pencil, title: "End-to-End", sub: "From Idea to Launch" },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full icon-glow flex items-center justify-center">
                <item.icon size={16} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
