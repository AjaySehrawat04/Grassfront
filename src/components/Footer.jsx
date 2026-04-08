import logoImg from "@/assets/logo.jpeg";

const Footer = () => {
  return (
    <footer className="border-t border-border py-6 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <a href="#" className="flex items-center">
                <img
                  src={logoImg}
                  alt="grassFRONT"
                  className="h-9 md:h-12 w-auto object-contain mix-blend-screen opacity-90 hover:opacity-100 transition-opacity"
                />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">Building enterprise solutions that businesses rely on.</p>
          </div>
          {[
            { title: "Company", links: ["About", "Careers", "Blog", "Contact"] },
            { title: "Services", links: ["Web Development", "Mobile Apps", "Cloud Solutions", "Consulting"] },
            { title: "Resources", links: ["Documentation", "API Reference", "Community", "Support"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-bold text-foreground text-sm mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-border pt-8 text-center">
          <p className="text-xs text-muted-foreground">© 2024 GrassFront. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
