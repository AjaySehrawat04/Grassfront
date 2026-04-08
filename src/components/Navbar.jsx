import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/logo.jpeg";

const navLinks = ["Home", "Features", "How It Works", "Use Cases", "Pricing", "Docs"];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "-30% 0px -60% 0px", // Focus window
      threshold: 0,
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const isValidNavLink = navLinks.some(
            (link) => link.toLowerCase().replace(/\s+/g, "-") === id
          );
          if (isValidNavLink && id) {
            setActiveSection(id);
          } else {
            setActiveSection("home");
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);

    // Observe all sections so it can reset to 'home' on untracked sections
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));

    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection("home");
      }
    };
    window.addEventListener("scroll", handleScroll);
    
    // Initial check
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-8">
        <Link to="/" className="flex items-center">
          <img 
            src={logoImg} 
            alt="grassFRONT" 
            className="h-9 md:h-12 w-auto object-contain mix-blend-screen opacity-90 hover:opacity-100 transition-opacity" 
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const id = link.toLowerCase().replace(/\s+/g, "-");
            const isActive = !isAuthPage && activeSection === id;
            
            if (isAuthPage) {
              return (
                <Link
                  key={link}
                  to={link === "Home" ? "/" : `/#${id}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link}
                </Link>
              );
            }

            return (
              <a
                key={link}
                href={`#${id}`}
                className={`text-sm transition-colors relative py-1 ${
                  isActive
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link}
                {isActive && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {location.pathname !== "/login" && (
            <Link to="/login" className="px-5 py-2 text-sm font-medium text-foreground rounded-full border border-border hover:border-primary/50 transition-colors">
              Log in
            </Link>
          )}
          {location.pathname !== "/register" && (
            <Link to="/register" className="px-5 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-full hover:bg-primary/90 transition-colors inline-block">
              Get Started →
            </Link>
          )}
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-border bg-background overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-6">
              {navLinks.map((link) => {
                const id = link.toLowerCase().replace(/\s+/g, "-");
                const isActive = !isAuthPage && activeSection === id;
                
                if (isAuthPage) {
                  return (
                    <Link
                      key={link}
                      to={link === "Home" ? "/" : `/#${id}`}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link}
                    </Link>
                  );
                }

                return (
                  <a
                    key={link}
                    href={`#${id}`}
                    className={`text-sm transition-colors ${
                      isActive ? "text-primary font-bold" : "text-muted-foreground"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link}
                  </a>
                );
              })}
              <div className="flex flex-col gap-3 mt-4">
                {location.pathname !== "/login" && (
                  <Link to="/login" className="px-5 py-2 text-sm font-medium text-foreground rounded-full border border-border text-center" onClick={() => setIsOpen(false)}>
                    Log in
                  </Link>
                )}
                {location.pathname !== "/register" && (
                  <Link to="/register" className="px-5 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-full text-center" onClick={() => setIsOpen(false)}>
                    Get Started →
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
