import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowRight, Code2, BarChart3, Globe, Smartphone, ShoppingCart,
  Brain, Shield, Rocket, CheckCircle2, ChevronRight, Sparkles, Layers
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const serviceTypes = [
  { id: "web-app", icon: Globe, label: "Web Application", desc: "Full-stack web platforms & portals" },
  { id: "mobile-app", icon: Smartphone, label: "Mobile App", desc: "iOS & Android native or hybrid" },
  { id: "ecommerce", icon: ShoppingCart, label: "E-Commerce", desc: "Online stores & marketplaces" },
  { id: "ai-ml", icon: Brain, label: "AI / ML Solution", desc: "Intelligent automation & analytics" },
  { id: "bi-dashboard", icon: BarChart3, label: "Business Insights", desc: "Dashboards, reports & data pipelines" },
  { id: "api-backend", icon: Code2, label: "API & Backend", desc: "Scalable services & integrations" },
];

const budgetRanges = [
  { id: "under-5k", label: "Under $5K" },
  { id: "5k-25k", label: "$5K – $25K" },
  { id: "25k-100k", label: "$25K – $100K" },
  { id: "100k-plus", label: "$100K+" },
  { id: "discuss", label: "Let's Discuss" },
];

const timelines = [
  { id: "asap", label: "ASAP" },
  { id: "1-3mo", label: "1–3 Months" },
  { id: "3-6mo", label: "3–6 Months" },
  { id: "6mo-plus", label: "6+ Months" },
  { id: "flexible", label: "Flexible" },
];

const ProjectPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [step, setStep] = useState(1); // 1 = type, 2 = details, 3 = success
  const [selected, setSelected] = useState([]);
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [description, setDescription] = useState("");
  const [projectName, setProjectName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("gf_user");
    if (!stored) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(stored));
  }, [navigate]);

  const toggleService = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 1200);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-20 px-4 relative overflow-hidden">
        {/* Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-3xl mx-auto relative z-10">

          {/* Header */}
          <AnimatePresence mode="wait">
            {step < 3 && (
              <motion.div key="header" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }} className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-[10px] font-bold text-primary uppercase tracking-widest mb-5">
                  <Sparkles size={10} />
                  New Project Request
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                  What can we{" "}
                  <span className="text-blue-400">build</span> for you?
                </h1>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Tell us about your vision. Our team will review your brief and reach out within 24 hours with a tailored proposal.
                </p>

                {/* Step indicator */}
                <div className="flex items-center justify-center gap-3 mt-8">
                  {[1, 2].map((s) => (
                    <div key={s} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${
                        step === s ? "bg-primary text-primary-foreground border-primary" :
                        step > s ? "bg-primary/20 text-primary border-primary/40" :
                        "bg-background text-muted-foreground border-border"
                      }`}>
                        {step > s ? <CheckCircle2 size={14} /> : s}
                      </div>
                      <span className={`text-xs ${step === s ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                        {s === 1 ? "Service Type" : "Project Details"}
                      </span>
                      {s < 2 && <ChevronRight size={14} className="text-border" />}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* STEP 1: Service Type */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <div className="bg-card/60 backdrop-blur-xl border border-border rounded-3xl p-6 sm:p-8 shadow-xl">
                  <h2 className="text-lg font-bold mb-2">What are you looking to build?</h2>
                  <p className="text-sm text-muted-foreground mb-6">Select all that apply — you can choose multiple.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {serviceTypes.map(({ id, icon: Icon, label, desc }) => {
                      const isSelected = selected.includes(id);
                      return (
                        <motion.button
                          key={id}
                          onClick={() => toggleService(id)}
                          whileTap={{ scale: 0.97 }}
                          className={`flex items-start gap-4 p-4 rounded-2xl border text-left transition-all ${
                            isSelected
                              ? "border-primary/60 bg-primary/10 shadow-[0_0_20px_rgba(37,99,235,0.15)]"
                              : "border-border bg-background/30 hover:border-border/80 hover:bg-white/5"
                          }`}>
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            isSelected ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"
                          }`}>
                            <Icon size={17} />
                          </div>
                          <div>
                            <p className={`text-sm font-semibold ${isSelected ? "text-foreground" : "text-foreground/80"}`}>{label}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                          </div>
                          {isSelected && (
                            <CheckCircle2 size={16} className="ml-auto text-primary flex-shrink-0 mt-0.5" />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    disabled={selected.length === 0}
                    className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(37,99,235,0.2)] disabled:opacity-40 disabled:cursor-not-allowed">
                    Continue <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Project Details */}
            {step === 2 && (
              <motion.div key="step2"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <div className="bg-card/60 backdrop-blur-xl border border-border rounded-3xl p-6 sm:p-8 shadow-xl">

                  {/* Selected services chips */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selected.map((id) => {
                      const svc = serviceTypes.find((s) => s.id === id);
                      const Icon = svc.icon;
                      return (
                        <span key={id} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-xs font-medium text-primary">
                          <Icon size={11} /> {svc.label}
                        </span>
                      );
                    })}
                    <button onClick={() => setStep(1)} className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2">Edit</button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Project name */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        Project Name
                      </label>
                      <input
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder="e.g. Customer Analytics Dashboard"
                        className="w-full bg-black/20 border border-border focus:border-primary/50 rounded-xl px-4 py-3 text-sm transition-all outline-none"
                      />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        Project Description *
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={6}
                        placeholder="Describe what you want to build. Include your target audience, key features, any existing systems to integrate with, and what success looks like for you..."
                        className="w-full bg-black/20 border border-border focus:border-primary/50 rounded-xl px-4 py-3 text-sm transition-all outline-none resize-none"
                        required
                      />
                      <p className="text-xs text-muted-foreground">{description.length} / 2000 characters</p>
                    </div>

                    {/* Budget */}
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Budget Range</label>
                      <div className="flex flex-wrap gap-2">
                        {budgetRanges.map((b) => (
                          <button
                            key={b.id}
                            type="button"
                            onClick={() => setBudget(b.id)}
                            className={`px-4 py-2 rounded-full text-xs font-medium border transition-all ${
                              budget === b.id
                                ? "border-primary/60 bg-primary/15 text-primary"
                                : "border-border bg-background/30 text-muted-foreground hover:border-border/60"
                            }`}>
                            {b.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Timeline</label>
                      <div className="flex flex-wrap gap-2">
                        {timelines.map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setTimeline(t.id)}
                            className={`px-4 py-2 rounded-full text-xs font-medium border transition-all ${
                              timeline === t.id
                                ? "border-primary/60 bg-primary/15 text-primary"
                                : "border-border bg-background/30 text-muted-foreground hover:border-border/60"
                            }`}>
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Reference links / files */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        Reference Links <span className="font-normal normal-case text-muted-foreground">(optional)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Competitor sites, inspiration, Figma links, docs…"
                        className="w-full bg-black/20 border border-border focus:border-primary/50 rounded-xl px-4 py-3 text-sm transition-all outline-none"
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button type="button" onClick={() => setStep(1)}
                        className="flex-1 py-4 font-bold rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-border/80 transition-all">
                        ← Back
                      </button>
                      <button type="submit" disabled={!description.trim() || loading}
                        className="flex-[2] py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(37,99,235,0.2)] disabled:opacity-40 disabled:cursor-not-allowed">
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                            </svg>
                            Submitting…
                          </span>
                        ) : (
                          <>Submit Brief <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Success */}
            {step === 3 && (
              <motion.div key="step3"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }} className="text-center">
                <div className="bg-card/60 backdrop-blur-xl border border-border rounded-3xl p-10 sm:p-16 shadow-xl">
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    className="w-20 h-20 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={36} className="text-primary" />
                  </motion.div>

                  <h2 className="text-3xl sm:text-4xl font-bold mb-4">Brief Submitted!</h2>
                  <p className="text-muted-foreground max-w-md mx-auto mb-2">
                    Thank you, <strong className="text-foreground">{user.firstName || "there"}</strong>! Our team will review your project brief and get back to you at
                  </p>
                  <p className="text-primary font-semibold mb-8">{user.email}</p>

                  <div className="grid grid-cols-3 gap-4 mb-10 text-center">
                    {[
                      { label: "Review", value: "< 24h" },
                      { label: "Proposal", value: "2–3 days" },
                      { label: "Kickoff", value: "1 week" },
                    ].map((item) => (
                      <div key={item.label} className="p-4 rounded-2xl bg-background/40 border border-border">
                        <p className="text-lg font-bold text-primary">{item.value}</p>
                        <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button onClick={() => { setStep(1); setSelected([]); setDescription(""); setBudget(""); setTimeline(""); setProjectName(""); }}
                      className="px-6 py-3 rounded-full border border-border text-sm font-medium hover:border-primary/50 transition-all">
                      Submit Another Project
                    </button>
                    <Link to="/"
                      className="px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                      Back to Home <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trust strip */}
          {step < 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="mt-8 flex items-center justify-center gap-6 flex-wrap text-xs text-muted-foreground">
              {["🔒 NDA on request", "⚡ 24h response", "🌍 Global team", "✅ Free initial consultation"].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectPage;