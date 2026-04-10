import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Lock, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Login = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center pt-16 sm:pt-20 md:pt-24 pb-12 px-4 relative overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg bg-card/60 backdrop-blur-xl border border-border rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl relative z-10"
        >
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-[10px] font-bold text-primary uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              User Portal
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold font-display mb-4">
              Welcome <span className="text-gradient-blue text-blue-400">Back</span>
            </h1>
            <p className="text-muted-foreground text-sm">
              Log in to your workspace to continue building.
            </p>
          </div>

          {/* Social Auth */}
          <button className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl border border-border bg-background hover:bg-white/5 transition-all text-sm font-medium mb-8 group">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
              <span className="bg-card text-muted-foreground px-4 py-1 rounded-full border border-border">Use your email</span>
            </div>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Work Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-3.5 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="w-full bg-black/20 border border-border focus:border-primary/50 rounded-xl px-12 py-3 text-sm transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Password</label>
                <Link to="#" className="text-[10px] uppercase font-bold text-primary hover:underline">Forgot Password?</Link>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-3.5 text-muted-foreground" />
                <input
                  type="password"
                  placeholder="Your password"
                  className="w-full bg-black/20 border border-border focus:border-primary/50 rounded-xl px-12 py-3 text-sm transition-all outline-none"
                />
              </div>
            </div>

            <button className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(37,99,235,0.2)]">
              Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Start building for free</Link>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
