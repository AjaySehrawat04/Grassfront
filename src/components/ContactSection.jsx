import { useState } from "react";
import { motion } from "framer-motion";
import { Headphones, Mail, MessageSquare, ChevronRight, Send, MapPin, Clock, ShieldCheck, User, AtSign, FileText, PenLine } from "lucide-react";
import worldMap from "@/assets/world-map.jpg";

const contactOptions = [
  { icon: Headphones, title: "Talk to Support", desc: "Get help from our support team during business hours." },
  { icon: Mail, title: "Email Us", desc: "Drop us a message and we'll get back to you soon." },
  { icon: MessageSquare, title: "Live Chat", desc: "Chat with our team in real-time for quick answers." },
];

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-secondary mb-4">
            <Headphones size={14} className="text-primary" />
            <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">We're Here to Help</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-display">
            Support & <span className="text-gradient-blue">Contact</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Have a question or a project in mind? Our team is ready to help you move forward with confidence.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {contactOptions.map((opt, i) => (
              <motion.div
                key={opt.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="contact-card flex items-center gap-4 p-5 rounded-xl glow-border bg-card cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full icon-glow flex items-center justify-center shrink-0">
                  <opt.icon size={22} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground">{opt.title}</h3>
                  <p className="text-sm text-muted-foreground">{opt.desc}</p>
                </div>
                <ChevronRight size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.div>
            ))}
          </div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl glow-border bg-card p-8"
          >
            <h3 className="text-xl font-bold text-foreground mb-1">Send Us a Message</h3>
            <p className="text-sm text-muted-foreground mb-6">Tell us about your project or inquiry.</p>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="flex items-center gap-1 text-xs font-medium text-muted-foreground mb-1.5">
                  <User size={12} /> Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                />
              </div>
              <div>
                <label className="flex items-center gap-1 text-xs font-medium text-muted-foreground mb-1.5">
                  <AtSign size={12} /> Work Email
                </label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="flex items-center gap-1 text-xs font-medium text-muted-foreground mb-1.5">
                <FileText size={12} /> Subject
              </label>
              <input
                type="text"
                placeholder="What's this about?"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
              />
            </div>
            <div className="mb-6">
              <label className="flex items-center gap-1 text-xs font-medium text-muted-foreground mb-1.5">
                <PenLine size={12} /> Message
              </label>
              <textarea
                rows={4}
                placeholder="Tell us more about your project or question..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 resize-none"
              />
            </div>
            <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Send Message <Send size={16} />
            </button>
          </motion.form>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 rounded-xl glow-border bg-card overflow-hidden"
        >
          <div className="grid md:grid-cols-[1fr_2fr] items-center">
            <div className="h-48 md:h-full overflow-hidden">
              <img src={worldMap} alt="World map" loading="lazy" className="w-full h-full object-cover opacity-70" />
            </div>
            <div className="grid sm:grid-cols-3 gap-6 p-8">
              {[
                { icon: MapPin, title: "Our Office", lines: ["123 Innovation Drive", "Suite 500, Boston, MA", "02108, USA"] },
                { icon: Clock, title: "Business Hours", lines: ["Monday - Friday", "9:00 AM - 6:00 PM", "(EST)"] },
                { icon: ShieldCheck, title: "Response Time", lines: ["We typically respond", "within 2 hours during", "business hours."] },
              ].map((info) => (
                <div key={info.title} className="flex gap-3">
                  <info.icon size={18} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-foreground text-sm mb-1">{info.title}</h4>
                    {info.lines.map((l) => (
                      <p key={l} className="text-xs text-muted-foreground">{l}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
