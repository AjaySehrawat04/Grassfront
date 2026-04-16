import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, User, ChevronDown, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/logo.jpeg";

const navLinks = [
  { label: "Home", id: "home", type: "link" },
  { 
    label: "About", id: "about", type: "dropdown", 
    subLinks: [
      { label: "About Us", id: "about", type: "section" },
      { label: "About Founder", path: "/about-founder", type: "page" }
    ]
  },
  { label: "How It Works", id: "how-it-works", type: "link" },
  { 
    label: "Our Work", id: "our-work", type: "dropdown", 
    subLinks: [
      { label: "Our Projects", id: "our-work", type: "section" },
      { label: "Case Study", path: "/case-study", type: "page" }
    ]
  },
  { label: "What We Offer", id: "what-we-offer", type: "link" },
  { label: "Media Updates", id: "media-updates", type: "link" }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  // Add state for mobile dropdown
  const [openDropdown, setOpenDropdown] = useState(null);

  const profileRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isStandalonePage = location.pathname !== "/";

  useEffect(() => {
    const stored = localStorage.getItem("gf_user");
    if (stored) setUser(JSON.parse(stored));
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (isStandalonePage) return;
    const options = { root: null, rootMargin: "-30% 0px -60% 0px", threshold: 0 };
    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const isValidNavLink = navLinks.some(
            (link) => link.id === id || (link.subLinks && link.subLinks.some(sub => sub.id === id))
          );
          setActiveSection(isValidNavLink && id ? id : "home");
        }
      });
    };
    const observer = new IntersectionObserver(handleIntersect, options);
    document.querySelectorAll("section").forEach((s) => observer.observe(s));
    const handleScroll = () => { if (window.scrollY < 100) setActiveSection("home"); };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => { observer.disconnect(); window.removeEventListener("scroll", handleScroll); };
  }, [isStandalonePage]);

  const handleLogout = () => {
    localStorage.removeItem("gf_user");
    setUser(null);
    setProfileOpen(false);
    setIsOpen(false);
    navigate("/");
  };

  const getInitials = (u) => {
    if (!u) return "U";
    return `${u.firstName?.[0] ?? ""}${u.lastName?.[0] ?? ""}`.toUpperCase() || u.email?.[0]?.toUpperCase() || "U";
  };

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

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-5 lg:gap-6">
          {navLinks.map((link) => {
            const isActive = !isStandalonePage && (activeSection === link.id || (link.subLinks && link.subLinks.some(sub => sub.id === activeSection)));
            
            if (link.type === 'dropdown') {
              return (
                <div key={link.label} className="relative group py-5">
                  <span className={`text-sm cursor-pointer transition-colors flex items-center gap-1 ${isActive ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}>
                    {link.label} <ChevronDown size={14} className="group-hover:rotate-180 transition-transform"/>
                    {isActive && (
                      <motion.div layoutId="navbar-underline"
                        className="absolute bottom-4 left-0 right-0 h-0.5 bg-primary"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                    )}
                  </span>
                  
                  <div className="absolute top-[80%] left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:top-full transition-all duration-300 w-48 bg-card border border-border mt-2 rounded-xl shadow-xl overflow-hidden">
                    <div className="py-2">
                      {link.subLinks.map(sub => (
                        sub.type === 'page' ? (
                          <Link key={sub.label} to={sub.path} className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all">
                            {sub.label}
                          </Link>
                        ) : (
                          <a key={sub.label} href={isStandalonePage ? `/#${sub.id}` : `#${sub.id}`} className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all">
                            {sub.label}
                          </a>
                        )
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            if (isStandalonePage) {
              return (
                <Link key={link.label} to={link.id === "home" ? "/" : `/#${link.id}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </Link>
              );
            }
            return (
              <a key={link.label} href={`#${link.id}`}
                className={`text-sm transition-colors relative py-1 ${isActive ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}>
                {link.label}
                {isActive && (
                  <motion.div layoutId="navbar-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                )}
              </a>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link to="/project"
                className="px-4 lg:px-5 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-full hover:bg-primary/90 transition-colors inline-flex items-center gap-1.5">
                + Start a Project
              </Link>
              <div className="relative" ref={profileRef}>
                <button onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-border hover:border-primary/50 transition-all bg-background/50">
                  <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                    {getInitials(user)}
                  </div>
                  <span className="text-sm font-medium max-w-[100px] truncate">
                    {user.firstName || user.email}
                  </span>
                  <ChevronDown size={14} className={`text-muted-foreground transition-transform ${profileOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-64 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
                      <div className="p-4 border-b border-border bg-background/40">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
                            {getInitials(user)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate">
                              {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : "User"}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <Link to="/project" onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all">
                          <Layers size={15} /> My Projects
                        </Link>
                        <Link to="#" onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all">
                          <User size={15} /> Account Settings
                        </Link>
                        <div className="border-t border-border my-1.5" />
                        <button onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all">
                          <LogOut size={15} /> Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <>
              {location.pathname !== "/login" && (
                <Link to="/login"
                  className="px-5 py-2 text-sm font-medium text-foreground rounded-full border border-border hover:border-primary/50 transition-colors">
                  Log in
                </Link>
              )}
              {location.pathname !== "/register" && (
                <Link to="/register"
                  className="px-5 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-full hover:bg-primary/90 transition-colors inline-block">
                  Get Started →
                </Link>
              )}
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-border bg-background overflow-hidden">
            <div className="flex flex-col gap-4 p-6">
              {navLinks.map((link) => {
                const isActive = !isStandalonePage && (activeSection === link.id || (link.subLinks && link.subLinks.some(sub => sub.id === activeSection)));
                
                if (link.type === 'dropdown') {
                  const isDropdownOpen = openDropdown === link.label;
                  return (
                    <div key={link.label} className="flex flex-col gap-2">
                       <button 
                         className={`text-sm transition-colors text-left flex justify-between items-center ${isActive ? "text-primary font-bold" : "text-muted-foreground"}`}
                         onClick={() => setOpenDropdown(isDropdownOpen ? null : link.label)}>
                         {link.label}
                         <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                       </button>
                       <AnimatePresence>
                         {isDropdownOpen && (
                           <motion.div 
                             initial={{ height: 0, opacity: 0 }}
                             animate={{ height: "auto", opacity: 1 }}
                             exit={{ height: 0, opacity: 0 }}
                             className="flex flex-col gap-2 pl-4 border-l border-border/50 overflow-hidden"
                           >
                             {link.subLinks.map(sub => (
                               sub.type === 'page' ? (
                                 <Link key={sub.label} to={sub.path} className="text-sm py-1.5 text-muted-foreground hover:text-foreground" onClick={() => setIsOpen(false)}>
                                   {sub.label}
                                 </Link>
                               ) : (
                                 <a key={sub.label} href={isStandalonePage ? `/#${sub.id}` : `#${sub.id}`} className="text-sm py-1.5 text-muted-foreground hover:text-foreground" onClick={() => setIsOpen(false)}>
                                   {sub.label}
                                 </a>
                               )
                             ))}
                           </motion.div>
                         )}
                       </AnimatePresence>
                    </div>
                  );
                }

                if (isStandalonePage) {
                  return (
                    <Link key={link.label} to={link.id === "home" ? "/" : `/#${link.id}`}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setIsOpen(false)}>
                      {link.label}
                    </Link>
                  );
                }
                return (
                  <a key={link.label} href={`#${link.id}`}
                    className={`text-sm transition-colors ${isActive ? "text-primary font-bold" : "text-muted-foreground"}`}
                    onClick={() => setIsOpen(false)}>
                    {link.label}
                  </a>
                );
              })}

              <div className="flex flex-col gap-3 mt-4">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-border">
                      <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
                        {getInitials(user)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">
                          {user.firstName ? `${user.firstName} ${user.lastName ?? ""}` : "User"}
                        </p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <Link to="/project" onClick={() => setIsOpen(false)}
                      className="px-5 py-2.5 text-sm font-medium text-primary-foreground bg-primary rounded-full text-center">
                      + Start a Project
                    </Link>
                    <button onClick={handleLogout}
                      className="px-5 py-2.5 text-sm font-medium text-red-400 border border-red-500/30 rounded-full text-center flex items-center justify-center gap-2">
                      <LogOut size={15} /> Logout
                    </button>
                  </>
                ) : (
                  <>
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
                  </>
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