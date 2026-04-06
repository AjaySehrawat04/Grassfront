import { motion } from "framer-motion";
import { Wrench, Code, Smartphone, Monitor, Cpu, Plus, ArrowRight } from "lucide-react";
import serviceBespoke from "@/assets/service-bespoke.jpg";
import serviceApps from "@/assets/service-apps.jpg";
import serviceAutomation from "@/assets/service-automation.jpg";
import serviceMore from "@/assets/service-more.jpg";

const offerings = [
  { icon: Wrench, img: serviceBespoke, title: "Bespoke Solutions", desc: "Custom-built software engineered around business logic, scalability, and long-term performance.", tag: "CUSTOMIZATION" },
  { icon: Code, img: serviceBespoke, title: "Web Platform", desc: "Secure, cloud-ready web platforms designed for reliability, speed, and enterprise growth.", tag: "DIGITAL PLATFORMS" },
  { icon: Smartphone, img: serviceApps, title: "Smart Apps", desc: "AI-enabled mobile applications delivering intelligent experiences and real-time insights.", tag: "MOBILITY" },
  { icon: Monitor, img: serviceBespoke, title: "Enterprise Systems", desc: "Robust enterprise systems that integrate operations, data, and decision-making.", tag: "ENTERPRISE" },
  { icon: Cpu, img: serviceAutomation, title: "Intelligent Automation", desc: "Automation powered by intelligence to optimize workflows and operational efficiency.", tag: "AUTOMATION" },
  { icon: Plus, img: serviceMore, title: "Many More", desc: "Extended digital capabilities aligned with evolving technologies and business demands.", tag: "EXTENSIONS" },
];

const OfferingsSection = () => {
  return (
    <section className="section-padding relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">What We Do</span>
          <h2 className="text-3xl md:text-5xl font-bold font-display mt-4">
            Core <span className="text-gradient-blue">Offerings</span>
          </h2>
          <p className="text-muted-foreground mt-4">Comprehensive solutions tailored to your business needs</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offerings.map((o, i) => (
            <motion.div
              key={o.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl glow-border glow-border-hover bg-card overflow-hidden group cursor-pointer transition-all"
            >
              <div className="relative h-40 overflow-hidden">
                <img src={o.img} alt={o.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" />
                <div className="absolute top-3 left-3 w-8 h-8 rounded-lg icon-glow flex items-center justify-center">
                  <o.icon size={14} className="text-primary" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{o.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{o.desc}</p>
                <span className="text-xs font-bold tracking-widest text-primary">{o.tag}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <a href="#" className="flex items-center gap-3 text-primary font-medium italic hover:underline">
            Explore all services <ArrowRight size={16} className="border border-primary rounded-full p-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default OfferingsSection;
