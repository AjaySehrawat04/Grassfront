import { useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import heroShowcase from "@/assets/hero-showcase.png";

/* ── Galaxy Canvas ─────────────────────────────────────────── */
const GalaxyCanvas = ({ mouseX, mouseY }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf, frame = 0;

    const setSize = () => {
      const d = devicePixelRatio;
      canvas.width = canvas.offsetWidth * d;
      canvas.height = canvas.offsetHeight * d;
      ctx.scale(d, d);
    };
    setSize();
    window.addEventListener("resize", setSize);
    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    // Stars
    const stars = Array.from({ length: 200 }, () => {
      const p = Math.random();
      return {
        x: Math.random(), y: Math.random(),
        r: Math.random() * 1.8 + 0.2,
        alpha: Math.random() * 0.65 + 0.2,
        phase: Math.random() * Math.PI * 2,
        spd: Math.random() * 0.025 + 0.006,
        type: p < 0.55 ? 0 : p < 0.75 ? 1 : p < 0.88 ? 2 : 3,
        pf: Math.random() * 0.8 + 0.1,
      };
    });
    const STAR_COLORS = ["#ffffff", "hsl(210,100%,78%)", "hsl(270,100%,80%)", "hsl(185,100%,76%)"];
    const GLOW_COLORS = (t, a) => [`rgba(255,255,255,${a})`, `hsla(210,100%,70%,${a})`, `hsla(270,100%,75%,${a})`, `hsla(185,100%,72%,${a})`][t];

    // Energy beams (quadratic bezier)
    const beams = [
      { sx: .02, sy: .98, cx: .45, cy: .02, ex: .98, ey: .55, hue: 215, spd: .35, w: 2.0, dt: Math.random() },
      { sx: .95, sy: .02, cx: .08, cy: .55, ex: .88, ey: .98, hue: 265, spd: .25, w: 1.5, dt: Math.random() },
      { sx: .15, sy: .00, cx: .90, cy: .45, ex: .10, ey: .95, hue: 190, spd: .45, w: 1.0, dt: Math.random() },
    ];
    const qb = (t, a, b, c) => (1 - t) ** 2 * a + 2 * (1 - t) * t * b + t * t * c;

    const drawBeam = (b, w, h, t) => {
      const pulse = .5 + .5 * Math.sin(t * b.spd);
      ctx.beginPath();
      for (let i = 0; i <= 80; i++) {
        const tt = i / 80;
        i === 0 ? ctx.moveTo(qb(tt, b.sx, b.cx, b.ex) * w, qb(tt, b.sy, b.cy, b.ey) * h)
          : ctx.lineTo(qb(tt, b.sx, b.cx, b.ex) * w, qb(tt, b.sy, b.cy, b.ey) * h);
      }
      ctx.strokeStyle = `hsla(${b.hue},100%,68%,${.1 + pulse * .2})`;
      ctx.lineWidth = b.w + pulse * 1.5;
      ctx.shadowColor = `hsl(${b.hue},100%,65%)`; ctx.shadowBlur = 18 + pulse * 22;
      ctx.stroke(); ctx.shadowBlur = 0;
      b.dt = (b.dt + .003 * b.spd) % 1;
      const dx = qb(b.dt, b.sx, b.cx, b.ex) * w, dy = qb(b.dt, b.sy, b.cy, b.ey) * h;
      ctx.shadowColor = `hsl(${b.hue},100%,90%)`; ctx.shadowBlur = 24;
      ctx.fillStyle = `hsla(${b.hue},100%,92%,${.7 + pulse * .3})`;
      ctx.beginPath(); ctx.arc(dx, dy, b.w + 2.5, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
    };

    // Glow pockets
    const glows = [
      { x: .52, y: .50, r: .38, hue: 220 },
      { x: .82, y: .22, r: .22, hue: 260 },
      { x: .22, y: .78, r: .18, hue: 200 },
    ];

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const w = W(), h = H(), t = frame * .018;
      const mx = mouseX?.get?.() ?? 0, my = mouseY?.get?.() ?? 0;
      ctx.clearRect(0, 0, w, h);

      // Glow pockets
      glows.forEach((g, i) => {
        const pulse = .5 + .5 * Math.sin(t * .35 + i * 1.4);
        const grd = ctx.createRadialGradient(g.x * w, g.y * h, 0, g.x * w, g.y * h, g.r * Math.min(w, h));
        grd.addColorStop(0, `hsla(${g.hue},100%,55%,${.09 + pulse * .06})`);
        grd.addColorStop(.6, `hsla(${g.hue},100%,45%,.03)`);
        grd.addColorStop(1, "transparent");
        ctx.globalAlpha = 1; ctx.fillStyle = grd; ctx.fillRect(0, 0, w, h);
      });

      // Stars + parallax
      stars.forEach(s => {
        const tw = s.alpha * (.4 + .6 * Math.sin(t * s.spd * 100 + s.phase));
        const sx = s.x * w + mx * s.pf * 28, sy = s.y * h + my * s.pf * 18;
        if (s.r > 1.3) { ctx.shadowBlur = s.r * 5; ctx.shadowColor = GLOW_COLORS(s.type, tw * .7); }
        ctx.globalAlpha = tw; ctx.fillStyle = STAR_COLORS[s.type];
        ctx.beginPath(); ctx.arc(sx, sy, s.r, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
      });

      ctx.globalAlpha = 1;
      beams.forEach(b => drawBeam(b, w, h, t));
      frame++;
    };
    animate();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", setSize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />;
};

/* ── Card Contents ────────────────────────────────────────── */
const glass = { backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderRadius: 14 };

const CardShowcase = () => (
  <div style={{ ...glass, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(99,155,255,0.22)", overflow: "hidden", boxShadow: "0 30px 80px rgba(0,15,80,0.7),inset 0 1px 0 rgba(255,255,255,0.06)", position: "relative" }}>
    <img src={heroShowcase} alt="Showcase" style={{ width: "100%", display: "block" }} />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,7,13,0.5) 0%, transparent 60%)" }} />
    <div style={{ position: "absolute", bottom: 10, left: 12, display: "flex", alignItems: "center", gap: 7 }}>
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px rgba(74,222,128,0.8)" }} />
      <span style={{ fontSize: 9, color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>Digital experiences · Real results</span>
    </div>
  </div>
);

const CardInnovation = () => (
  <div style={{ ...glass, background: "linear-gradient(135deg,rgba(28,18,80,0.92),rgba(10,28,72,0.92))", border: "1px solid rgba(120,100,255,0.3)", padding: "18px 20px", boxShadow: "0 20px 50px rgba(0,0,50,0.7)" }}>
    <div style={{ fontSize: 8, color: "rgba(160,130,255,0.9)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>✦ Platform</div>
    <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", lineHeight: 1.35, marginBottom: 12 }}>Where innovation<br />meets execution</div>
    {[["UI/UX Design", 82], ["Performance", 96], ["Scalability", 68]].map(([l, v], i) => (
      <div key={l} style={{ marginBottom: 7 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
          <span style={{ fontSize: 8, color: "rgba(200,200,255,0.55)" }}>{l}</span>
          <span style={{ fontSize: 8, color: "rgba(200,200,255,0.45)" }}>{v}%</span>
        </div>
        <div style={{ height: 2, background: "rgba(255,255,255,0.08)", borderRadius: 4, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${v}%`, background: `linear-gradient(90deg,hsl(${215 + i * 20},100%,58%),hsl(${215 + i * 20},80%,72%))`, boxShadow: `0 0 6px hsla(${215 + i * 20},100%,60%,0.6)` }} />
        </div>
      </div>
    ))}
  </div>
);

const CardMetrics = () => (
  <div style={{ ...glass, background: "rgba(4,12,36,0.88)", border: "1px solid rgba(50,120,255,0.22)", padding: "14px 16px", boxShadow: "0 16px 42px rgba(0,0,60,0.6)" }}>
    <div style={{ fontSize: 7, color: "rgba(100,160,255,0.75)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Analytics</div>
    <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 40, marginBottom: 10 }}>
      {[35, 55, 42, 70, 52, 80, 65].map((h, i) => (
        <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: "3px 3px 0 0", background: `linear-gradient(to top,hsl(${200 + i * 7},100%,52%),hsl(${200 + i * 7},80%,68%))`, boxShadow: `0 0 6px hsla(${200 + i * 7},100%,52%,0.4)` }} />
      ))}
    </div>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div><div style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>98<span style={{ fontSize: 10, color: "#4ade80" }}>%</span></div><div style={{ fontSize: 7, color: "rgba(255,255,255,0.35)" }}>Uptime SLA</div></div>
      <div style={{ textAlign: "right" }}><div style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>3<span style={{ fontSize: 10, color: "rgba(100,180,255,0.9)" }}>x</span></div><div style={{ fontSize: 7, color: "rgba(255,255,255,0.35)" }}>Faster deploys</div></div>
    </div>
  </div>
);

const CardCode = () => (
  <div style={{ ...glass, background: "rgba(6,10,26,0.92)", border: "1px solid rgba(60,70,110,0.4)", padding: "12px 14px", fontFamily: "monospace", fontSize: 9, lineHeight: 1.75, boxShadow: "0 12px 32px rgba(0,0,45,0.65)" }}>
    <div style={{ display: "flex", gap: 5, marginBottom: 8 }}>
      {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: c }} />)}
    </div>
    <div><span style={{ color: "rgba(130,180,255,0.9)" }}>const </span><span style={{ color: "rgba(200,158,255,0.95)" }}>deploy</span><span style={{ color: "rgba(255,255,255,0.45)" }}> = async () ={">"} {"{"}</span></div>
    <div style={{ paddingLeft: 12, color: "rgba(100,220,150,0.85)" }}>await build<span style={{ color: "rgba(255,255,255,0.45)" }}>();</span></div>
    <div style={{ paddingLeft: 12, color: "rgba(100,220,150,0.85)" }}>await push<span style={{ color: "rgba(255,255,255,0.45)" }}>('prod');</span></div>
    <div style={{ color: "rgba(255,255,255,0.3)" }}>{"}"}</div>
    <div style={{ marginTop: 5, color: "rgba(80,255,130,0.75)", fontSize: 7.5 }}>✓ Deployed in 2.3s · Zero downtime</div>
  </div>
);

const CardBadge = () => (
  <div style={{ background: "rgba(16,24,58,0.9)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderRadius: 50, border: "1px solid rgba(100,150,255,0.3)", padding: "7px 14px", display: "inline-flex", alignItems: "center", gap: 7, boxShadow: "0 8px 28px rgba(50,100,255,0.25)", whiteSpace: "nowrap" }}>
    <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 10px rgba(74,222,128,0.9)" }} />
    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.92)", fontWeight: 600 }}>🚀 Live in Production</span>
  </div>
);

/* ── Float Card Wrapper ───────────────────────────────────── */
const FloatCard = ({ children, style, className, baseRX, baseRY, tz, delay, mouseX, mouseY, depth }) => {
  const rx = useTransform(mouseY, v => baseRX - v * 10 * depth);
  const ry = useTransform(mouseX, v => baseRY + v * 10 * depth);
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1, y: [0, -10 * depth, 0] }}
      transition={{ opacity: { duration: .6, delay }, scale: { duration: .6, delay }, y: { duration: 4 + depth * 1.5, repeat: Infinity, ease: "easeInOut", delay } }}
      style={{ position: "absolute", ...style, transformStyle: "preserve-3d" }}
    >
      <motion.div style={{ rotateX: rx, rotateY: ry, translateZ: tz, transformStyle: "preserve-3d" }}>
        {children}
      </motion.div>
    </motion.div>
  );
};

/* ── Main Export ─────────────────────────────────────────── */
const HeroRight = () => {
  const ref = useRef(null);
  const rawX = useMotionValue(0), rawY = useMotionValue(0);
  const mouseX = useSpring(rawX, { stiffness: 60, damping: 25 });
  const mouseY = useSpring(rawY, { stiffness: 60, damping: 25 });

  const onMove = useCallback((e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    rawX.set((e.clientX - r.left - r.width / 2) / r.width);
    rawY.set((e.clientY - r.top - r.height / 2) / r.height);
  }, []);
  const onLeave = useCallback(() => { rawX.set(0); rawY.set(0); }, []);

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      className="relative w-full min-h-[340px] lg:min-h-[540px] mt-8 lg:mt-0"
      style={{ perspective: "1100px" }}>
      <GalaxyCanvas mouseX={mouseX} mouseY={mouseY} />

      {/* Soft radial glow behind cards */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 55% 48%, rgba(59,80,200,0.18) 0%, transparent 70%)", pointerEvents: "none", zIndex: 1 }} />

      {/* ── Card 1: Main Showcase (center) */}
      <FloatCard
        className="w-[90%] left-[5%] top-[5%] lg:w-[68%] lg:left-[12%] lg:top-[8%]"
        style={{ zIndex: 10 }}
        baseRX={4} baseRY={-5} tz={0} delay={0.1} mouseX={mouseX} mouseY={mouseY} depth={1}
      >
        <CardShowcase />
      </FloatCard>


    </div>
  );
};

export default HeroRight;