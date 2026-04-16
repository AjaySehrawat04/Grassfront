import { useRef, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import heroShowcase from "@/assets/hero-showcase.png";

/* ── Galaxy Canvas ─────────────────────────────────────────── */
const GalaxyCanvas = ({ mouseX, mouseY }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf, frame = 0;

    const setSize = () => {
      const d = window.devicePixelRatio || 1;
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
        grd.addColorStop(.6, `hsla(${g.hue},100%,45%,.1)`);
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
  }, [mouseX, mouseY]);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />;
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
  }, [rawX, rawY]);
  const onLeave = useCallback(() => { rawX.set(0); rawY.set(0); }, [rawX, rawY]);

  // Subtle mouse parallax for the laptop image
  const imgX = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
  const imgY = useTransform(mouseY, [-0.5, 0.5], [-15, 15]);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative w-full min-h-[400px] lg:min-h-[550px] mt-8 lg:mt-0 flex items-center justify-center overflow-visible"
      style={{ perspective: "1200px" }}
    >
      <GalaxyCanvas mouseX={mouseX} mouseY={mouseY} />

      {/* Weightless Floating 3D Laptop */}
      <motion.div
        style={{
          x: imgX,
          y: imgY,
          zIndex: 10,
          position: "relative",
          width: "100%",
          maxWidth: "750px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
        initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <motion.img
          src={heroShowcase}
          alt="Grassfront 3D Showcase"
          style={{
            width: "115%", // Slightly larger for impact
            height: "auto",
            mixBlendMode: "screen",
            filter: "drop-shadow(0 0 30px rgba(100, 120, 255, 0.5))",
            pointerEvents: "none",
            userSelect: "none"
          }}
        />
      </motion.div>
    </div>
  );
};

export default HeroRight;