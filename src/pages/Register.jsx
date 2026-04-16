import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    tos: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.firstName || !form.email || !form.password || !form.confirmPassword) {
      setError("Please fill in all required fields.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!form.tos) {
      setError("Please accept the Terms of Service to continue.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      // Save registered user
      const user = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        company: form.company,
      };
      localStorage.setItem("gf_registered_user", JSON.stringify(user));
      setLoading(false);
      // Redirect to login to complete sign-in
      navigate("/login");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center pt-16 sm:pt-20 md:pt-24 pb-12 px-4 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-xl bg-card/60 backdrop-blur-xl border border-border rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl relative z-10"
        >
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-[10px] font-bold text-primary uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Create Account
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold font-display mb-4">
              Start <span className="text-blue-400">Building</span> Today
            </h1>
            <p className="text-muted-foreground text-sm">
              Join thousands of teams shipping faster with GrassFront.
            </p>
          </div>

          {/* Social Auth */}
          <button
            onClick={() => {
              const user = { email: "demo@gmail.com", firstName: "Demo", lastName: "User" };
              localStorage.setItem("gf_user", JSON.stringify(user));
              navigate("/project");
            }}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl border border-border bg-background hover:bg-white/5 transition-all text-sm font-medium mb-8 group">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign up with Google
          </button>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
              <span className="bg-card text-muted-foreground px-4 py-1 rounded-full border border-border">Or register with email</span>
            </div>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
              {error}
            </motion.div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">First Name *</label>
                <input name="firstName" value={form.firstName} onChange={handleChange}
                  type="text" placeholder="John"
                  className="w-full bg-black/20 border border-border focus:border-primary/50 rounded-xl px-4 py-3 text-sm transition-all outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Last Name</label>
                <input name="lastName" value={form.lastName} onChange={handleChange}
                  type="text" placeholder="Smith"
                  className="w-full bg-black/20 border border-border focus:border-primary/50 rounded-xl px-4 py-3 text-sm transition-all outline-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Work Email *</label>
              <input name="email" value={form.email} onChange={handleChange}
                type="email" placeholder="you@company.com"
                className="w-full bg-black/20 border border-border focus:border-primary/50 rounded-xl px-4 py-3 text-sm transition-all outline-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Password *</label>
                <input name="password" value={form.password} onChange={handleChange}
                  type="password" placeholder="Min. 8 characters"
                  className="w-full bg-black/20 border border-border focus:border-primary/50 rounded-xl px-4 py-3 text-sm transition-all outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Confirm Password *</label>
                <input name="confirmPassword" value={form.confirmPassword} onChange={handleChange}
                  type="password" placeholder="Repeat password"
                  className="w-full bg-black/20 border border-border focus:border-primary/50 rounded-xl px-4 py-3 text-sm transition-all outline-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Company (Optional)</label>
              <input name="company" value={form.company} onChange={handleChange}
                type="text" placeholder="Your organization"
                className="w-full bg-black/20 border border-border focus:border-primary/50 rounded-xl px-4 py-3 text-sm transition-all outline-none" />
            </div>

            <div className="flex items-start sm:items-center gap-3 py-2">
              <input name="tos" type="checkbox" id="tos" checked={form.tos} onChange={handleChange}
                className="w-4 h-4 mt-0.5 sm:mt-0 rounded border-border bg-black/20 text-primary focus:ring-primary/20 cursor-pointer" />
              <label htmlFor="tos" className="text-xs text-muted-foreground leading-relaxed">
                I agree to GrassFront's{" "}
                <Link to="#" className="text-primary hover:underline">Terms of Service</Link> and{" "}
                <Link to="#" className="text-primary hover:underline">Privacy Policy</Link>
              </label>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(37,99,235,0.2)] disabled:opacity-70 disabled:cursor-not-allowed">
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Creating account…
                </span>
              ) : (
                <>Create My Account <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-bold hover:underline">Sign in here</Link>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;