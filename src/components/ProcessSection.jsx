import { motion } from "framer-motion";
import { FileText, Search, Blocks, Code, ShieldCheck, Headphones } from "lucide-react";

const steps = [
  { num: "01", icon: FileText, title: "Select a Project", desc: "We begin by understanding your unique requirements and goals. Whether you're looking to build a custom software solution, improve your website's performance, or integrate the latest technology, our team will help you select the right project scope to align with your objectives." },
  { num: "02", icon: Search, title: "Project Analysis", desc: "Once the project is selected, our team conducts a thorough analysis to determine the perfect strategy. We break down the project into clear milestones, conduct risk assessments, and allocate the right resources for each phase." },
  { num: "03", icon: Blocks, title: "Architecture", desc: "Our architects design a technical blueprint and roadmap tailored to your needs. We select the right technology stack and structure to ensure scalability, performance, and maintainability." },
  { num: "04", icon: Code, title: "Engineering", desc: "Development begins with clean coding practices and agile methodologies. Our engineers build robust features iteratively, ensuring code quality and alignment with your goals at every step." },
  { num: "05", icon: ShieldCheck, title: "Quality Assurance", desc: "Rigorous testing ensures your product is reliable and bug-free. We conduct comprehensive QA checks before deployment, guaranteeing a smooth and successful launch." },
  { num: "06", icon: Headphones, title: "Support & Optimization", desc: "Post-launch, we provide continuous maintenance, performance optimization, and support. We help your solution evolve with your business needs, ensuring long-term success and growth." },
];

const ProcessSection = () => {
  return (
    <section id="how-it-works" className="section-padding relative">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-semibold uppercase tracking-wider mb-4">Our Process</span>
          <h2 className="text-3xl md:text-5xl font-bold font-display">
            Our Approach <span className="text-gradient-blue">To Excellence</span>
          </h2>
          <p className="text-muted-foreground mt-4">A proven process that turns your ideas into scalable, high-performance digital solutions.</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent hidden md:block" />

          <div className="space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative rounded-xl glow-border bg-card p-6 md:pl-20"
              >
                <div className="hidden md:flex absolute left-4 top-6 text-3xl font-black text-primary/20 font-display">{step.num}</div>
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
