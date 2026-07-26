'use client';

import { useEffect, useRef, useCallback } from 'react';

/* ══════════════════════════════════════════════════════════════════════════
   SILICON WAFER NAME — Canvas Die-Shot Typography
   Single canvas; IC die texture clipped to text via destination-in.
   Zero raster images — 100% procedural, Retina/4K sharp.
   ══════════════════════════════════════════════════════════════════════════ */

const LINE1 = 'PRANJAL';
const LINE2 = 'KRISHNANAND';
const FONT  = "'Space Grotesk', 'Inter', Arial Black, sans-serif";

// ── XOR-shift seeded RNG ────────────────────────────────────────────────────
function mkRng(seed: number) {
  let s = (seed ^ 0xdeadbeef) >>> 0;
  return () => {
    s ^= s << 13; s ^= s >> 17; s ^= s << 5;
    return (s >>> 0) / 4294967296;
  };
}

// ── Build static IC die-shot texture canvas ─────────────────────────────────
function buildDieTex(W: number, H: number): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d')!;

  // Silicon substrate
  ctx.fillStyle = '#030b18';
  ctx.fillRect(0, 0, W, H);

  const r = mkRng(0xcafef00d);
  const scale = W / 1200; // normalise block sizes to a 1200px reference

  interface Block {
    x: number; y: number; w: number; h: number;
    hue: number; sat: number; lit: number;
    type: number; id: number;
  }
  const blocks: Block[] = [];

  let cy = 0, bid = 0;
  while (cy < H) {
    const rowH = (18 + r() * 58) * scale;
    let cx = 0;
    while (cx < W) {
      const bw = (28 + r() * 88) * scale;
      const pick = r();

      let hue: number, sat: number, lit: number;
      if (pick > 0.76) {
        // Bright accent: teal / cyan / electric-purple / gold
        const t = Math.floor(r() * 5);
        if      (t === 0) { hue = 188; sat = 88; lit = 24; }  // teal
        else if (t === 1) { hue = 200; sat = 92; lit = 30; }  // cyan
        else if (t === 2) { hue = 265; sat = 78; lit = 24; }  // purple
        else if (t === 3) { hue = 42;  sat = 68; lit = 22; }  // gold/amber
        else              { hue = 175; sat = 70; lit = 20; }  // green-teal
      } else if (pick > 0.42) {
        // Mid-tone silicon
        hue = 205 + r() * 55; sat = 46 + r() * 26; lit = 8 + r() * 12;
      } else {
        // Dark substrate
        hue = 210 + r() * 48; sat = 33 + r() * 18; lit = 3 + r() * 6;
      }

      blocks.push({
        x: cx, y: cy,
        w: Math.min(bw, W - cx),
        h: Math.min(rowH, H - cy),
        hue, sat, lit,
        type: Math.floor(r() * 6),
        id: bid++,
      });
      cx += bw + 0.8;
    }
    cy += rowH + 0.8;
  }

  for (const b of blocks) {
    if (b.w < 1 || b.h < 1) continue;
    const sr = mkRng(b.id * 2053 + 0xc0ffee);

    // Base fill
    ctx.fillStyle = `hsl(${b.hue},${b.sat}%,${b.lit}%)`;
    ctx.fillRect(b.x, b.y, b.w, b.h);

    // Interior detail — each block type is unique
    if (b.type === 0 && b.h > 6 * scale) {
      // ── Memory array: tight horizontal stripes ──
      const sh = Math.max(1.2, 2.2 * scale);
      for (let sy = b.y; sy < b.y + b.h; sy += sh * 2.1) {
        ctx.fillStyle = `rgba(0,${155 + sr() * 85},215,${0.09 + sr() * 0.14})`;
        ctx.fillRect(b.x + 0.5, sy, b.w - 1, Math.min(sh, b.y + b.h - sy));
      }
    } else if (b.type === 1) {
      // ── Logic gates: sub-blocks (standard cells) ──
      for (let s = 0; s < 2 + Math.floor(sr() * 4); s++) {
        const sx  = b.x + sr() * b.w * 0.65;
        const sy  = b.y + sr() * b.h * 0.62;
        const sw  = Math.min(b.w * (0.1 + sr() * 0.28), b.x + b.w - sx - 0.5);
        const sh  = Math.min(b.h * (0.15 + sr() * 0.32), b.y + b.h - sy - 0.5);
        if (sw > 1 && sh > 1) {
          ctx.fillStyle = `rgba(${sr() > 0.55 ? 0 : 50},${125 + sr() * 95},${195 + sr() * 60},${0.16 + sr() * 0.28})`;
          ctx.fillRect(sx, sy, sw, sh);
        }
      }
    } else if (b.type === 2 && b.w > 10 * scale && b.h > 8 * scale) {
      // ── Metal routing: H/V channels ──
      const n = 2 + Math.floor(sr() * 7);
      for (let l = 0; l < n; l++) {
        const isH = sr() > 0.5;
        ctx.strokeStyle = `rgba(0,${175 + sr() * 65},255,${0.11 + sr() * 0.19})`;
        ctx.lineWidth = 0.4 + sr() * 0.75;
        ctx.beginPath();
        if (isH) {
          const ly = b.y + (l + 1) * b.h / (n + 1);
          ctx.moveTo(b.x, ly); ctx.lineTo(b.x + b.w, ly);
        } else {
          const lx = b.x + (l + 1) * b.w / (n + 1);
          ctx.moveTo(lx, b.y); ctx.lineTo(lx, b.y + b.h);
        }
        ctx.stroke();
      }
    } else if (b.type === 3 && b.w > 14 * scale && b.h > 10 * scale) {
      // ── Transistor array: dot grid ──
      const dsx = Math.max(2.5, 3.5 * scale);
      const dsy = Math.max(2.2, 3.2 * scale);
      for (let dx = b.x + dsx / 2; dx < b.x + b.w - 1; dx += dsx) {
        for (let dy = b.y + dsy / 2; dy < b.y + b.h - 1; dy += dsy) {
          ctx.fillStyle = `rgba(0,${95 + sr() * 125},${155 + sr() * 100},${0.2 + sr() * 0.32})`;
          ctx.beginPath(); ctx.arc(dx, dy, 0.75, 0, Math.PI * 2); ctx.fill();
        }
      }
    } else if (b.type === 4) {
      // ── Power rail: thick horizontal bars + vias ──
      const rails = 1 + Math.floor(sr() * 3);
      for (let rl = 0; rl < rails; rl++) {
        const ry = b.y + (rl + 1) * b.h / (rails + 1);
        ctx.strokeStyle = `rgba(${200 + sr() * 55},${175 + sr() * 55},${50 + sr() * 40},${0.28 + sr() * 0.22})`;
        ctx.lineWidth = Math.max(1, 1.5 * scale);
        ctx.beginPath(); ctx.moveTo(b.x + 1, ry); ctx.lineTo(b.x + b.w - 1, ry); ctx.stroke();
        const vias = Math.floor(2 + sr() * 5);
        for (let v = 0; v < vias; v++) {
          const vx = b.x + (v + 1) * b.w / (vias + 1);
          ctx.fillStyle = `rgba(255,${215 + sr() * 40},80,${0.45 + sr() * 0.3})`;
          ctx.beginPath(); ctx.arc(vx, ry, Math.max(0.8, 1.2 * scale), 0, Math.PI * 2); ctx.fill();
        }
      }
    } else {
      // ── Gradient block (diffusion region) ──
      const g = ctx.createLinearGradient(b.x, b.y, b.x + b.w, b.y + b.h);
      g.addColorStop(0, `hsl(${b.hue},${b.sat}%,${b.lit}%)`);
      g.addColorStop(1, `hsl(${b.hue + 22},${Math.max(20, b.sat - 12)}%,${Math.max(2, b.lit - 6)}%)`);
      ctx.fillStyle = g;
      ctx.fillRect(b.x, b.y, b.w, b.h);
    }

    // Block outline (dark scribe line)
    ctx.strokeStyle = 'rgba(0,60,100,0.6)';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(b.x + 0.5, b.y + 0.5, b.w - 1, b.h - 1);

    // Bright accent border for highlighted blocks
    if (b.lit > 16) {
      ctx.strokeStyle = `rgba(0,${170 + sr() * 85},255,${0.18 + sr() * 0.22})`;
      ctx.lineWidth = 0.8;
      ctx.strokeRect(b.x + 0.5, b.y + 0.5, b.w - 1, b.h - 1);
    }
  }

  // ── Global metal interconnect overlay ──
  const gr = mkRng(0xfeed5678);
  for (let i = 0; i < 25; i++) {
    const x1 = gr() * W, y1 = gr() * H;
    const xm = x1 + (gr() - 0.5) * W * 0.45;
    const y2 = y1 + (gr() - 0.5) * H * 0.55;
    ctx.strokeStyle = `rgba(0,${155 + gr() * 65},255,${0.045 + gr() * 0.065})`;
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(x1, y1); ctx.lineTo(xm, y1); ctx.lineTo(xm, y2);
    ctx.stroke();
    // via circles
    ctx.fillStyle = `rgba(0,210,255,${0.18 + gr() * 0.22})`;
    ctx.beginPath(); ctx.arc(xm, y1, Math.max(1, 1.4 * scale), 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(xm, y2, Math.max(1, 1.4 * scale), 0, Math.PI * 2); ctx.fill();
  }

  return c;
}

// ── Helper: set letterSpacing on canvas context ────────────────────────────
function setLetterSpacing(ctx: CanvasRenderingContext2D, val: string) {
  (ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = val;
}

// ══════════════════════════════════════════════════════════════════════════════
// SiliconWaferName — main component
// ══════════════════════════════════════════════════════════════════════════════
export default function SiliconWaferName() {
  const mainRef = useRef<HTMLCanvasElement>(null);
  const offRef  = useRef<HTMLCanvasElement | null>(null);
  const dieRef  = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const mxRef   = useRef(0.5);
  const myRef   = useRef(0.35);
  const fontOkRef = useRef(false);
  const sizeRef = useRef({ W: 0, H: 0, fs: 0, gap: 0 });

  // ── resize: measure parent, set canvas dims, rebuild die texture ──────────
  const resize = useCallback(() => {
    const canvas = mainRef.current;
    if (!canvas?.parentElement) return;
    const dpr = window.devicePixelRatio || 1;
    const lW  = canvas.parentElement.offsetWidth;
    // Font size that makes KRISHNANAND (11 chars) fill ~95% of width
    const fs  = lW / 6.7;          // logical px
    const gap = fs * 0.88;          // row spacing (logical px)
    const lH  = fs + gap + 8;       // two rows, tight

    const W = Math.round(lW * dpr);
    const H = Math.round(lH * dpr);

    canvas.width  = W;
    canvas.height = H;
    canvas.style.width  = `${lW}px`;
    canvas.style.height = `${lH}px`;

    // Re-allocate offscreen buffer
    const off = document.createElement('canvas');
    off.width = W; off.height = H;
    offRef.current = off;

    // Rebuild die texture at full physical resolution
    dieRef.current = buildDieTex(W, H);
    sizeRef.current = { W, H, fs: fs * dpr, gap: gap * dpr };
  }, []);

  // ── draw: runs every frame ─────────────────────────────────────────────────
  const draw = useCallback(() => {
    const canvas = mainRef.current;
    const off    = offRef.current;
    const die    = dieRef.current;

    if (!canvas || !off || !die || !fontOkRef.current) {
      animRef.current = requestAnimationFrame(draw);
      return;
    }

    timeRef.current += 0.006;
    const t   = timeRef.current;
    const mx  = mxRef.current;
    const my  = myRef.current;
    const { W, H, fs, gap } = sizeRef.current;
    if (!W || !H || !fs) { animRef.current = requestAnimationFrame(draw); return; }

    // ── PASS 1: build die-textured text on offscreen canvas ──────────────────
    const oc = off.getContext('2d')!;
    oc.clearRect(0, 0, W, H);

    // Draw static die texture
    oc.drawImage(die, 0, 0);

    // Scan line animation (slow horizontal sweep)
    const scanY = ((t * 0.055) % 1) * H;
    const sg = oc.createLinearGradient(0, scanY - 12, 0, scanY + 12);
    sg.addColorStop(0,   'rgba(0,200,255,0)');
    sg.addColorStop(0.5, 'rgba(0,200,255,0.06)');
    sg.addColorStop(1,   'rgba(0,200,255,0)');
    oc.fillStyle = sg;
    oc.fillRect(0, scanY - 12, W, 24);

    // Mouse specular highlight
    const specX = mx * W, specY = my * H;
    const specG = oc.createRadialGradient(specX, specY, 0, specX, specY, W * 0.72);
    specG.addColorStop(0,    'rgba(180,230,255,0.16)');
    specG.addColorStop(0.3,  'rgba(100,180,255,0.07)');
    specG.addColorStop(0.65, 'rgba(60,120,200,0.02)');
    specG.addColorStop(1,    'rgba(0,0,0,0)');
    oc.fillStyle = specG;
    oc.fillRect(0, 0, W, H);

    // Holographic rainbow interference (angle follows mouse)
    const angle = Math.atan2(my - 0.5, mx - 0.5);
    const cos   = Math.cos(angle), sin = Math.sin(angle);
    const holoG = oc.createLinearGradient(
      W * 0.5 + cos * W * 0.9, H * 0.5 + sin * H * 0.9,
      W * 0.5 - cos * W * 0.9, H * 0.5 - sin * H * 0.9,
    );
    holoG.addColorStop(0,    'rgba(0,255,255,0.055)');
    holoG.addColorStop(0.25, 'rgba(80,0,255,0.04)');
    holoG.addColorStop(0.5,  'rgba(255,180,0,0.045)');
    holoG.addColorStop(0.75, 'rgba(0,255,120,0.035)');
    holoG.addColorStop(1,    'rgba(0,200,255,0.05)');
    oc.fillStyle = holoG;
    oc.fillRect(0, 0, W, H);

    // Random chip activity blinks
    if (Math.random() > 0.966) {
      oc.save();
      oc.fillStyle   = 'rgba(0,245,255,0.6)';
      oc.shadowColor = 'rgba(0,200,255,0.9)';
      oc.shadowBlur  = 8;
      oc.beginPath();
      oc.arc(Math.random() * W, Math.random() * H, 1.6, 0, Math.PI * 2);
      oc.fill();
      oc.restore();
    }

    // ── Clip entire texture to letter shapes (destination-in) ────────────────
    oc.globalCompositeOperation = 'destination-in';
    oc.fillStyle   = '#ffffff';
    oc.textAlign   = 'left';
    oc.textBaseline = 'top';
    setLetterSpacing(oc, '-1px');

    oc.font = `800 ${fs}px ${FONT}`;
    oc.fillText(LINE1, 0, 0);
    oc.font = `800 ${fs}px ${FONT}`;
    oc.fillText(LINE2, 0, gap);

    oc.globalCompositeOperation = 'source-over';

    // ── PASS 2: composite onto main canvas ───────────────────────────────────
    const mc = canvas.getContext('2d')!;
    mc.clearRect(0, 0, W, H);
    mc.textAlign    = 'left';
    mc.textBaseline = 'top';
    setLetterSpacing(mc, '-1px');

    // Outer glow (blurred stroked text behind the fill)
    mc.save();
    const blurPx = Math.round(Math.max(4, 7 * (W / 1400)));
    mc.filter      = `blur(${blurPx}px)`;
    mc.strokeStyle = 'rgba(0,220,255,0.55)';
    mc.lineWidth   = Math.max(2, 3 * (W / 1400));
    mc.font        = `800 ${fs}px ${FONT}`;
    mc.strokeText(LINE1, 0, 0);
    mc.strokeText(LINE2, 0, gap);
    mc.restore();

    // Second glow pass — wider, dimmer (ambient halo)
    mc.save();
    mc.filter      = `blur(${blurPx * 2.5}px)`;
    mc.strokeStyle = 'rgba(0,150,255,0.25)';
    mc.lineWidth   = Math.max(3, 5 * (W / 1400));
    mc.font        = `800 ${fs}px ${FONT}`;
    mc.strokeText(LINE1, 0, 0);
    mc.strokeText(LINE2, 0, gap);
    mc.restore();

    // Die-textured fill
    mc.drawImage(off, 0, 0);

    // Crisp outline on top (1-2px cyan)
    mc.strokeStyle = 'rgba(0,210,255,0.75)';
    mc.lineWidth   = Math.max(1, 1.4 * (W / 1400));
    mc.font        = `800 ${fs}px ${FONT}`;
    mc.strokeText(LINE1, 0, 0);
    mc.strokeText(LINE2, 0, gap);

    animRef.current = requestAnimationFrame(draw);
  }, []);

  // ── Mount / unmount ────────────────────────────────────────────────────────
  useEffect(() => {
    // Ensure Space Grotesk is available; fallback after 2 s
    document.fonts.load(`800 48px ${FONT}`).then(() => { fontOkRef.current = true; });
    const fallback = setTimeout(() => { fontOkRef.current = true; }, 2000);

    resize();

    // Watch parent width for responsive resizing
    const ro = new ResizeObserver(resize);
    if (mainRef.current?.parentElement) ro.observe(mainRef.current.parentElement);
    window.addEventListener('resize', resize);

    // Track mouse
    const onMM = (e: MouseEvent) => {
      const c = mainRef.current;
      if (!c) return;
      const rect = c.getBoundingClientRect();
      mxRef.current = Math.max(0, Math.min(1, (e.clientX - rect.left)  / rect.width));
      myRef.current = Math.max(0, Math.min(1, (e.clientY - rect.top)   / rect.height));
    };
    window.addEventListener('mousemove', onMM, { passive: true });

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      clearTimeout(fallback);
      ro.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMM);
    };
  }, [resize, draw]);

  return (
    <>
      {/* Load Space Grotesk 800 */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@800&display=swap');`}</style>

      {/* Accessible heading wrapper */}
      <div
        style={{ position: 'relative', width: '100%', lineHeight: 0 }}
        role="heading"
        aria-level={1}
        aria-label="PRANJAL KRISHNANAND"
      >
        <canvas
          ref={mainRef}
          style={{ display: 'block', width: '100%' }}
          aria-hidden="true"
        />
      </div>
    </>
  );
}
