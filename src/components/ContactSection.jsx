import { motion } from "framer-motion";
import { Headphones, Mail, MessageSquare, MapPin, Clock, ShieldCheck } from "lucide-react";
import worldMap from "@/assets/world-map.jpg";

const contactOptions = [
  { icon: Headphones, title: "Talk to Us", desc: "Get help from our support team during business hours." },
  { icon: Mail, title: "Email Us", desc: "Drop us a message and we'll get back to you soon." },
  { icon: MessageSquare, title: "Talk to Support", desc: "Chat with our team in real-time for quick answers." },
];

const ContactSection = () => {

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

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {contactOptions.map((opt, i) => (
            <motion.div
              key={opt.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="contact-card flex flex-col items-center text-center gap-4 p-8 rounded-xl glow-border bg-card cursor-pointer group hover:-translate-y-1 transition-transform"
            >
              <div className="w-16 h-16 rounded-full icon-glow flex items-center justify-center shrink-0 mb-2">
                <opt.icon size={28} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xl text-foreground mb-2">{opt.title}</h3>
                <p className="text-sm text-muted-foreground">{opt.desc}</p>
              </div>
            </motion.div>
          ))}
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
