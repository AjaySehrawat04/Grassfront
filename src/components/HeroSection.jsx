import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Zap, Cloud, Shield } from "lucide-react";
import HeroRight from "@/components/HeroRight";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center section-padding pt-24 overflow-hidden">
      <div className="absolute inset-0 bg-glow-radial pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary mt-8 mb-8">
              <span className="text-primary">✦</span>
              <span className="text-sm text-muted-foreground">AI-Powered. Dev-Approved.</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight mb-6">
              Building{" "}
              <span className="text-gradient-blue">Enterprise Solutions</span>{" "}
              That Businesses{" "}
              <span className="text-gradient-blue">Rely On</span>
            </h1>

            <p className="text-muted-foreground text-lg mb-4 max-w-lg">
              We design, develop, and scale <strong className="text-foreground">high-performing</strong> websites and web applications that help businesses grow, operate, and lead.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link to="/register" className="inline-flex items-center gap-2 px-7 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Start a Project <ArrowRight size={18} />
              </Link>
              <button className="inline-flex items-center gap-2 px-7 py-3 rounded-lg font-medium border border-border text-foreground hover:border-primary/50 transition-colors">
                <Play size={18} /> Watch Our Work
              </button>
            </div>

            <div className="flex flex-wrap gap-8">
              {[
                { icon: Zap, label: "No Credit Card", sub: "Required" },
                { icon: Cloud, label: "Deploy to Vercel", sub: "in One Click" },
                { icon: Shield, label: "Trusted by", sub: "Growing Teams" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg icon-glow flex items-center justify-center">
                    <item.icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <HeroRight />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-20 text-center"
        >
          <p className="text-xs tracking-[0.3em] text-muted-foreground mb-8 uppercase">Trusted by builders at</p>
          <div className="flex flex-wrap justify-center items-center gap-10 text-muted-foreground/60">
            {["▲ Vercel", "React.js", "⌇ tailwindcss", "mongoDB", "◎ GitHub"].map((name) => (
              <span key={name} className="text-lg font-semibold tracking-wide">{name}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
