import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowRight, Bell, Building2, Rocket, Code, Lightbulb, Calendar, Globe, Target, Leaf } from "lucide-react";
import blogAi from "@/assets/blog-ai.jpg";
import blogCulture from "@/assets/blog-culture.jpg";

const articles = [
  { tag: "CULTURE", date: "APR 10, 2024", img: blogCulture, title: "Life at GrassFront", desc: "A look into our culture, team, and the values that drive everything we build.", featured: false },
  { tag: "PRODUCT", date: "APR 28, 2024", img: blogAi, title: "GrassFront v2.0 is Live", desc: "Improved performance, smarter workflows, and a better developer experience.", featured: false },
  { tag: "FEATURED", date: "MAY 16, 2024", img: blogAi, title: "Building AI-Powered Solutions That Drive Real Impact", desc: "How we help businesses scale smarter with intelligent systems, modern architectures, and a product mindset.", featured: true },
  { tag: "ENGINEERING", date: "MAY 02, 2024", img: blogCulture, title: "Engineering Better, Every Day", desc: "Exploring how our team ships high-quality code, faster.", featured: false },
  { tag: "UPDATE", date: "MAY 30, 2024", img: blogAi, title: "What's Next at GrassFront", desc: "New capabilities. Bigger vision. Here's a glimpse of what's coming.", featured: false },
];



const overviewArticles = [
  { tag: "ABOUT", date: "2024", img: blogCulture, title: "Who We Are", desc: "We build modern websites, UI/UX experiences, and smart digital solutions.", featured: false },
  { tag: "MISSION", date: "2024", img: blogAi, title: "Our Mission", desc: "To deliver scalable, user-friendly, and premium digital experiences.", featured: false },
  { tag: "DELIVERY", date: "2024", img: blogCulture, title: "What We Deliver", desc: "Web development, creative design, smooth performance, and continuous support.", featured: false },
];

const categories = [
  { icon: Rocket, label: "Product Updates" },
  { icon: Code, label: "Engineering" },
  { icon: Building2, label: "Company News" },
  { icon: Lightbulb, label: "Insights" },
  { icon: Calendar, label: "Events" },
];

const MediaSection = () => {
  const [activeTab, setActiveTab] = useState('announcements');
  const displayData = activeTab === 'announcements' ? articles : overviewArticles;

  return (
    <section id="media-updates" className="section-padding relative overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-secondary mb-4">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Stay Informed</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-display">
            Media & <span className="text-gradient-blue">Updates</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            The latest news, product updates, and insights from our team—delivered to keep you ahead.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <button 
              onClick={() => setActiveTab('announcements')}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'announcements' ? 'bg-primary text-primary-foreground' : 'border border-border text-foreground hover:bg-white/5'}`}
            >
              <Bell size={14} /> View Announcements
            </button>
            <button 
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'overview' ? 'bg-primary text-primary-foreground' : 'border border-border text-foreground hover:bg-white/5'}`}
            >
              <Building2 size={14} /> Company Overview
            </button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className={`grid grid-cols-1 sm:grid-cols-2 ${activeTab === 'announcements' ? 'lg:grid-cols-5' : 'lg:grid-cols-3'} gap-4 relative`}
          >
            {displayData.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)", scale: 0.96 }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`media-card rounded-xl glow-border bg-card overflow-hidden group cursor-pointer ${a.featured ? "sm:col-span-1 media-shimmer" : ""}`}
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={a.img}
                    alt={a.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded bg-primary/20 backdrop-blur text-xs font-bold text-primary">
                    {a.featured && <Star size={10} />} {a.tag}
                  </div>
                  <span className="absolute top-2 right-2 text-[10px] text-muted-foreground">{a.date}</span>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-foreground mb-1 line-clamp-2">{a.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{a.desc}</p>
                  <a className="text-xs font-medium text-primary flex items-center gap-1">Read More <ArrowRight size={12} /></a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-wrap justify-center gap-4 mt-12">
          {categories.map((c, i) => (
            <motion.button
              key={c.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.06 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-sm text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors"
            >
              <c.icon size={16} className="text-primary" /> {c.label}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaSection;
