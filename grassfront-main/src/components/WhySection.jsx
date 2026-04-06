import { motion } from "framer-motion";
import { Rocket, BarChart3, Handshake, Users, TrendingUp, Target } from "lucide-react";

const reasons = [
  { icon: Rocket, title: "Real Execution,\nNot Just Consulting", desc: "We combine product development with real business execution." },
  { icon: BarChart3, title: "Built for Long-Term\nImpact", desc: "Every solution is built for scale, profitability, and lasting growth." },
  { icon: Handshake, title: "Your Growth,\nOur KPI", desc: "We take ownership of outcomes, not just deliverables — your growth is our KPI." },
];

const stats = [
  { icon: Users, value: "50+", label: "Projects Delivered" },
  { icon: TrendingUp, value: "98%", label: "Client Satisfaction" },
  { icon: Target, value: "10+", label: "Industries Served" },
];

const WhySection = () => {
  return (
    <section className="section-padding relative">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">Why GrassFront</span>
            <h2 className="text-4xl md:text-5xl font-bold font-display mt-4 mb-2">
              Why<br /><span className="text-gradient-blue">GrassFront</span>?
            </h2>
            <div className="w-12 h-1 bg-primary rounded mb-8" />
            <p className="text-muted-foreground text-lg mb-12 max-w-md">
              We go beyond code. We build technology that drives real business growth and lasting impact.
            </p>
            <div className="flex flex-wrap gap-8">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-full icon-glow flex items-center justify-center">
                      <s.icon size={14} className="text-primary" />
                    </div>
                    <span className="text-3xl font-bold text-gradient-blue">{s.value}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-8">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex gap-6 items-start"
              >
                <div className="w-16 h-16 rounded-full icon-glow flex items-center justify-center shrink-0 animate-pulse-glow">
                  <r.icon size={28} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2 whitespace-pre-line">{r.title}</h3>
                  <p className="text-muted-foreground text-sm">{r.desc}</p>
                  <div className="w-8 h-0.5 bg-primary rounded mt-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
