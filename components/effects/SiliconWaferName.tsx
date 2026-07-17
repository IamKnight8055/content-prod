'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

/* ─────────────────────────────────────────────────────────
   SILICON WAFER NAME TYPOGRAPHY
   Procedurally generated semiconductor die-shot typography.
   No raster images — everything built with Canvas + SVG + CSS.
   ───────────────────────────────────────────────────────── */

interface MousePos { x: number; y: number }

// ── Seeded pseudo-random so each letter is deterministically unique ──
function seededRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return ((s >>> 0) / 0xffffffff);
  };
}

// ── Draw one IC die block on a canvas context ──
function drawDieBlock(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number,
  rng: () => number,
  highlight: number,
  time: number,
) {
  const type = Math.floor(rng() * 7);

  // Base tile color — wafer palette
  const palettes = [
    [`hsl(220,55%,${12 + rng() * 8}%)`, `hsl(200,60%,${15 + rng() * 8}%)`],
    [`hsl(240,45%,${10 + rng() * 10}%)`, `hsl(260,50%,${14 + rng() * 8}%)`],
    [`hsl(195,50%,${11 + rng() * 9}%)`, `hsl(210,55%,${16 + rng() * 6}%)`],
    [`hsl(280,40%,${10 + rng() * 8}%)`, `hsl(220,50%,${13 + rng() * 9}%)`],
    [`hsl(30,50%,${9 + rng() * 7}%)`,   `hsl(45,55%,${12 + rng() * 8}%)`],
    [`hsl(170,40%,${10 + rng() * 8}%)`, `hsl(185,45%,${14 + rng() * 7}%)`],
    [`hsl(205,60%,${13 + rng() * 9}%)`, `hsl(230,55%,${17 + rng() * 7}%)`],
  ];
  const pal = palettes[Math.min(type, palettes.length - 1)];

  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);

  // Base fill
  const grad = ctx.createLinearGradient(x, y, x + w, y + h);
  grad.addColorStop(0, pal[0]);
  grad.addColorStop(1, pal[1]);
  ctx.fillStyle = grad;
  ctx.fill();

  // Micro grid overlay
  ctx.strokeStyle = `rgba(${100 + highlight * 80},${150 + highlight * 80},${220 + highlight * 35},${0.08 + highlight * 0.04})`;
  ctx.lineWidth = 0.3;
  const gStep = Math.max(2, Math.floor(w / (3 + rng() * 4)));
  for (let gx = x; gx < x + w; gx += gStep) {
    ctx.beginPath(); ctx.moveTo(gx, y); ctx.lineTo(gx, y + h); ctx.stroke();
  }
  const ghStep = Math.max(2, Math.floor(h / (3 + rng() * 4)));
  for (let gy = y; gy < y + h; gy += ghStep) {
    ctx.beginPath(); ctx.moveTo(x, gy); ctx.lineTo(x + w, gy); ctx.stroke();
  }

  // Internal structure based on die type
  ctx.strokeStyle = `rgba(${120 + highlight * 100},${190 + highlight * 60},${255},${0.15 + highlight * 0.15})`;
  ctx.lineWidth = 0.5;

  if (type === 0) {
    // Memory cell — tight horizontal bands
    const rows = Math.floor(h / 2.5);
    for (let r = 0; r < rows; r++) {
      const ry = y + r * (h / rows);
      const pulse = Math.sin(time * 2 + r * 0.4) * 0.3;
      ctx.globalAlpha = 0.6 + pulse * 0.3;
      ctx.beginPath(); ctx.moveTo(x + 1, ry); ctx.lineTo(x + w - 1, ry); ctx.stroke();
      if (rng() > 0.85) {
        ctx.fillStyle = `rgba(0,200,255,${0.15 + highlight * 0.2 + pulse * 0.1})`;
        ctx.fillRect(x + rng() * (w - 2), ry, rng() * 3 + 1, h / rows - 0.5);
      }
    }
  } else if (type === 1) {
    // Logic gates — H-tree routing
    ctx.beginPath();
    ctx.moveTo(x + w * 0.5, y + 2); ctx.lineTo(x + w * 0.5, y + h - 2);
    ctx.moveTo(x + 2, y + h * 0.5); ctx.lineTo(x + w - 2, y + h * 0.5);
    ctx.moveTo(x + 2, y + h * 0.25); ctx.lineTo(x + w * 0.5, y + h * 0.25);
    ctx.moveTo(x + w * 0.5, y + h * 0.75); ctx.lineTo(x + w - 2, y + h * 0.75);
    ctx.stroke();
    const gateCount = Math.floor(2 + rng() * 3);
    for (let g = 0; g < gateCount; g++) {
      const gx2 = x + rng() * (w * 0.6) + w * 0.1;
      const gy2 = y + rng() * (h * 0.6) + h * 0.1;
      const gw2 = w * 0.15 + rng() * w * 0.1;
      const gh2 = h * 0.12 + rng() * h * 0.08;
      ctx.strokeStyle = `rgba(${160 + highlight * 80},210,255,${0.25 + highlight * 0.2})`;
      ctx.strokeRect(gx2, gy2, gw2, gh2);
    }
  } else if (type === 2) {
    // Power rail — thick bus bars
    const rails = Math.floor(2 + rng() * 3);
    for (let r = 0; r < rails; r++) {
      const ry = y + (r + 1) * h / (rails + 1);
      ctx.lineWidth = 1 + rng();
      ctx.strokeStyle = `rgba(${200 + highlight * 55},${170 + highlight * 60},${50 + rng() * 30},${0.3 + highlight * 0.25})`;
      ctx.beginPath(); ctx.moveTo(x + 1, ry); ctx.lineTo(x + w - 1, ry); ctx.stroke();
      const vias = Math.floor(3 + rng() * 5);
      for (let v = 0; v < vias; v++) {
        const vx2 = x + (v + 1) * w / (vias + 1);
        ctx.fillStyle = `rgba(255,${220 + highlight * 35},100,${0.5 + highlight * 0.3})`;
        ctx.beginPath(); ctx.arc(vx2, ry, 1, 0, Math.PI * 2); ctx.fill();
      }
    }
  } else if (type === 3) {
    // Clock distribution — tree
    const mid = x + w * 0.5;
    ctx.strokeStyle = `rgba(0,${200 + highlight * 55},${180 + highlight * 75},${0.3 + highlight * 0.2})`;
    ctx.lineWidth = 0.7;
    ctx.beginPath();
    ctx.moveTo(mid, y + 2);
    ctx.lineTo(mid, y + h * 0.4);
    ctx.lineTo(x + w * 0.25, y + h * 0.4);
    ctx.lineTo(x + w * 0.25, y + h * 0.7);
    ctx.moveTo(mid, y + h * 0.4);
    ctx.lineTo(x + w * 0.75, y + h * 0.4);
    ctx.lineTo(x + w * 0.75, y + h * 0.7);
    ctx.stroke();
    const cpulse = Math.sin(time * 8 + x * 0.1) * 0.5 + 0.5;
    ctx.fillStyle = `rgba(0,255,200,${cpulse * 0.5 + highlight * 0.3})`;
    ctx.beginPath(); ctx.arc(mid, y + 2, 1.5, 0, Math.PI * 2); ctx.fill();
  } else if (type === 4) {
    // Test pads + alignment marks
    const padSize = Math.min(w, h) * 0.25;
    const pads: [number, number][] = [[0.2, 0.2], [0.8, 0.2], [0.5, 0.8], [0.2, 0.7], [0.8, 0.7]];
    pads.slice(0, Math.floor(2 + rng() * 3)).forEach(([px, py]) => {
      ctx.strokeStyle = `rgba(255,${220 + highlight * 35},${50 + rng() * 30},${0.4 + highlight * 0.3})`;
      ctx.lineWidth = 0.7;
      ctx.strokeRect(x + px * w - padSize / 2, y + py * h - padSize / 2, padSize, padSize);
      ctx.beginPath();
      ctx.moveTo(x + px * w - padSize * 0.3, y + py * h);
      ctx.lineTo(x + px * w + padSize * 0.3, y + py * h);
      ctx.moveTo(x + px * w, y + py * h - padSize * 0.3);
      ctx.lineTo(x + px * w, y + py * h + padSize * 0.3);
      ctx.stroke();
    });
  } else if (type === 5) {
    // Interconnect metal — dense routing
    const metalLayers = Math.floor(3 + rng() * 4);
    for (let m = 0; m < metalLayers; m++) {
      const isHoriz = m % 2 === 0;
      const lineCount = Math.floor(3 + rng() * 6);
      ctx.strokeStyle = `rgba(${120 + m * 20 + highlight * 60},${160 + m * 15 + highlight * 40},${220 + highlight * 35},${0.12 + m * 0.03 + highlight * 0.05})`;
      ctx.lineWidth = 0.4;
      for (let l = 0; l < lineCount; l++) {
        const offset = y + (l + 1) * h / (lineCount + 1);
        const offsetX = x + (l + 1) * w / (lineCount + 1);
        ctx.beginPath();
        if (isHoriz) { ctx.moveTo(x + 1, offset); ctx.lineTo(x + w - 1, offset); }
        else { ctx.moveTo(offsetX, y + 1); ctx.lineTo(offsetX, y + h - 1); }
        ctx.stroke();
      }
    }
  } else {
    // Transistor array — dense dots
    const dotSize = 0.8;
    const dotSpacingX = Math.max(2.5, w / 8);
    const dotSpacingY = Math.max(2.5, h / 6);
    for (let dx = dotSpacingX / 2; dx < w; dx += dotSpacingX) {
      for (let dy = dotSpacingY / 2; dy < h; dy += dotSpacingY) {
        const active = Math.sin(time * 3 + dx * 0.5 + dy * 0.3) > 0.6;
        ctx.fillStyle = active
          ? `rgba(${100 + highlight * 100},${200 + highlight * 55},${255},${0.5 + highlight * 0.3})`
          : `rgba(${60 + highlight * 40},${80 + highlight * 40},${120 + highlight * 60},0.3)`;
        ctx.beginPath();
        ctx.arc(x + dx, y + dy, dotSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  ctx.globalAlpha = 1;
  ctx.strokeStyle = `rgba(${80 + highlight * 80},${120 + highlight * 80},${200 + highlight * 55},${0.2 + highlight * 0.15})`;
  ctx.lineWidth = 0.5;
  ctx.strokeRect(x, y, w, h);

  if (highlight > 0.1) {
    const hlGrad = ctx.createLinearGradient(x, y, x + w, y + h);
    hlGrad.addColorStop(0, `rgba(0,200,255,${highlight * 0.08})`);
    hlGrad.addColorStop(1, `rgba(120,80,255,${highlight * 0.05})`);
    ctx.fillStyle = hlGrad;
    ctx.fillRect(x, y, w, h);
  }

  ctx.restore();
}

// ── Draw animated electrical trace signal ──
function drawSignalTrace(
  ctx: CanvasRenderingContext2D,
  points: [number, number][],
  progress: number,
  color: string,
  lineWidth = 0.7,
) {
  if (points.length < 2) return;
  let totalLen = 0;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    totalLen += Math.hypot(points[i][0] - prev[0], points[i][1] - prev[1]);
  }

  let traveled = 0;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const segLen = Math.hypot(curr[0] - prev[0], curr[1] - prev[1]);
    const segStart = traveled / totalLen;
    const segEnd = (traveled + segLen) / totalLen;

    if (progress > segStart && progress < segEnd) {
      const localProg = (progress - segStart) / (segEnd - segStart);
      const px = prev[0] + (curr[0] - prev[0]) * localProg;
      const py = prev[1] + (curr[1] - prev[1]) * localProg;

      const grd = ctx.createRadialGradient(px, py, 0, px, py, 4);
      grd.addColorStop(0, color);
      grd.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fill();
    }
    traveled += segLen;
  }

  ctx.globalAlpha = 0.15;
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i][0], points[i][1]);
  }
  ctx.stroke();
  ctx.restore();
}

// ── Per-letter Canvas renderer ──
interface LetterCanvasProps {
  seed: number;
  mousePos: MousePos;
  index: number;
}

function LetterCanvas({ seed, mousePos, index }: LetterCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(index * 0.3); // offset so letters animate differently

  const dieDataRef = useRef<{
    blocks: { x: number; y: number; w: number; h: number; seedOffset: number }[];
    traces: [number, number][][];
    traceProgress: number[];
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const overlay = overlayRef.current;
    if (!canvas || !overlay) return;

    const dpr = window.devicePixelRatio || 1;
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    if (W === 0 || H === 0) return;

    canvas.width = W * dpr;
    canvas.height = H * dpr;
    overlay.width = W * dpr;
    overlay.height = H * dpr;

    const ctx = canvas.getContext('2d');
    const ovCtx = overlay.getContext('2d');
    if (!ctx || !ovCtx) return;

    ctx.scale(dpr, dpr);
    ovCtx.scale(dpr, dpr);

    const rng = seededRng(seed + index * 97531);

    // Build die grid layout (varies per letter)
    const tileW = 5 + rng() * 10;
    const tileH = 4 + rng() * 8;
    const blocks: { x: number; y: number; w: number; h: number; seedOffset: number }[] = [];
    let cy = 0;
    let blockIdx = 0;
    while (cy < H) {
      let cx = 0;
      while (cx < W) {
        const bw = tileW * (0.7 + rng() * 0.7);
        const bh = tileH * (0.7 + rng() * 0.7);
        blocks.push({
          x: cx,
          y: cy,
          w: Math.min(bw, W - cx),
          h: Math.min(bh, H - cy),
          seedOffset: blockIdx++,
        });
        cx += bw + 0.5;
      }
      cy += tileH + 0.5;
    }

    // Signal traces across letter interior
    const traces: [number, number][][] = [];
    const traceCount = 3 + Math.floor(rng() * 7);
    for (let t = 0; t < traceCount; t++) {
      const trace: [number, number][] = [];
      let tx = rng() * W * 0.15;
      let ty = rng() * H;
      trace.push([tx, ty]);
      const steps = 3 + Math.floor(rng() * 5);
      for (let s = 0; s < steps; s++) {
        if (rng() > 0.5) { tx = Math.min(W - 2, tx + rng() * W * 0.4 + W * 0.05); }
        else { ty = Math.max(2, Math.min(H - 2, ty + (rng() - 0.5) * H * 0.45)); }
        trace.push([tx, ty]);
      }
      traces.push(trace);
    }

    dieDataRef.current = {
      blocks,
      traces,
      traceProgress: traces.map(() => rng()),
    };

    const draw = () => {
      if (!ctx || !canvas || !overlay || !ovCtx || !dieDataRef.current) return;
      timeRef.current += 0.007;
      const t = timeRef.current;

      // Compute mouse proximity
      const rect = canvas.getBoundingClientRect();
      const lx = mousePos.x - (rect.left + rect.width / 2);
      const ly = mousePos.y - (rect.top + rect.height / 2);
      const dist = Math.hypot(lx, ly);
      const highlight = Math.max(0, 1 - dist / 220);

      ctx.clearRect(0, 0, W, H);
      ovCtx.clearRect(0, 0, W, H);

      const { blocks: blks, traces: trs, traceProgress } = dieDataRef.current;

      // Draw die blocks
      for (const block of blks) {
        const blockRng = seededRng(seed + block.seedOffset * 1337 + index * 421);
        drawDieBlock(ctx, block.x, block.y, block.w, block.h, blockRng, highlight, t);
      }

      // Animate signal traces
      const traceColors = [
        `rgba(0,220,255,0.9)`,
        `rgba(140,80,255,0.8)`,
        `rgba(255,190,0,0.7)`,
        `rgba(0,230,160,0.85)`,
        `rgba(255,100,120,0.75)`,
        `rgba(80,200,255,0.9)`,
      ];
      for (let ti = 0; ti < trs.length; ti++) {
        traceProgress[ti] += 0.0025 + ti * 0.0004 + highlight * 0.001;
        if (traceProgress[ti] > 1) traceProgress[ti] = 0;

        ovCtx.save();
        ovCtx.globalAlpha = 0.55 + highlight * 0.4;
        drawSignalTrace(
          ovCtx,
          trs[ti],
          traceProgress[ti],
          traceColors[ti % traceColors.length],
          0.7 + highlight * 0.8,
        );
        ovCtx.restore();
      }

      // Scan line sweep
      const scanY = ((t * 0.12) % 1) * H;
      const scanGrad = ovCtx.createLinearGradient(0, scanY - 5, 0, scanY + 5);
      scanGrad.addColorStop(0, 'rgba(0,200,255,0)');
      scanGrad.addColorStop(0.5, `rgba(0,200,255,${0.025 + highlight * 0.04})`);
      scanGrad.addColorStop(1, 'rgba(0,200,255,0)');
      ovCtx.fillStyle = scanGrad;
      ovCtx.fillRect(0, scanY - 5, W, 10);

      // Breathing glow
      const breathe = Math.sin(t * 0.55 + index * 0.7) * 0.5 + 0.5;
      ovCtx.save();
      ovCtx.globalAlpha = 0.035 + breathe * 0.025 + highlight * 0.055;
      const breatheGrad = ovCtx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H));
      breatheGrad.addColorStop(0, `hsl(${195 + breathe * 45},100%,60%)`);
      breatheGrad.addColorStop(1, 'transparent');
      ovCtx.fillStyle = breatheGrad;
      ovCtx.fillRect(0, 0, W, H);
      ovCtx.restore();

      // Random chip activity blink
      if (Math.random() > 0.968) {
        const bx = Math.random() * W;
        const by = Math.random() * H;
        const br = 1.2 + Math.random() * 2.5;
        ovCtx.save();
        ovCtx.fillStyle = `rgba(0,220,255,${0.25 + highlight * 0.45})`;
        ovCtx.shadowColor = 'rgba(0,200,255,0.8)';
        ovCtx.shadowBlur = 6;
        ovCtx.beginPath();
        ovCtx.arc(bx, by, br, 0, Math.PI * 2);
        ovCtx.fill();
        ovCtx.restore();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed, index]);

  // Re-render on mouse move by updating the canvas rect lookup inside draw loop
  // (mousePos is read live via canvas.getBoundingClientRect() inside the RAF loop)
  // We don't need to restart the loop — the draw closure captures mousePos via ref trick:
  const mousePosRef = useRef(mousePos);
  useEffect(() => { mousePosRef.current = mousePos; }, [mousePos]);

  return (
    <div style={{ position: 'absolute', inset: 0, borderRadius: 2, overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
      <canvas
        ref={overlayRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', mixBlendMode: 'screen' }}
      />
    </div>
  );
}

// ── Main SiliconWaferName component ──
export default function SiliconWaferName() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<MousePos>({ x: -9999, y: -9999 });
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const FIRST = 'PRANJAL';
  const LAST  = 'KRISHNANAND';

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // Compute specular reflection angle from mouse vs container center
  const getSpecAngle = () => {
    if (!containerRef.current) return 45;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return Math.atan2(mousePos.y - cy, mousePos.x - cx) * (180 / Math.PI) + 90;
  };

  const renderWord = (word: string, startSeed: number, wordIndex: number) =>
    word.split('').map((letter, i) => {
      const globalIdx = wordIndex * 50 + i;
      const isHovered = hoveredIdx === globalIdx;
      const specAngle = getSpecAngle();

      // Unique IDs per letter
      const clipId = `wclip-${wordIndex}-${i}`;
      const edgeFilterId = `wedge-${wordIndex}-${i}`;
      const specGradId = `wspec-${wordIndex}-${i}`;
      const innerGlowId = `wglow-${wordIndex}-${i}`;

      return (
        <span
          key={i}
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'flex-end',
            width: 'clamp(2.2rem, 5.2vw, 5.5rem)',
            height: 'clamp(2.7rem, 6.4vw, 6.7rem)',
            cursor: 'default',
            transform: isHovered ? 'translateY(-5px) scale(1.06)' : 'none',
            transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
            zIndex: isHovered ? 10 : 1,
          }}
          onMouseEnter={() => setHoveredIdx(globalIdx)}
          onMouseLeave={() => setHoveredIdx(null)}
          aria-hidden="true"
        >
          {/* Die canvas — absolutely positioned behind SVG */}
          <LetterCanvas
            seed={startSeed + i * 7919}
            mousePos={mousePos}
            index={globalIdx}
          />

          {/* SVG for letter shape masking, outlines, reflections */}
          <svg
            viewBox="0 0 100 120"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}
          >
            <defs>
              {/* Letter shape clip path */}
              <clipPath id={clipId}>
                <text
                  x="50" y="108"
                  textAnchor="middle"
                  fontFamily="'Space Grotesk', 'Inter Tight', Arial, sans-serif"
                  fontWeight="800"
                  fontSize="108"
                  letterSpacing="-3"
                >
                  {letter}
                </text>
              </clipPath>

              {/* Glow filter for outline */}
              <filter id={edgeFilterId} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceGraphic" stdDeviation={isHovered ? '3' : '1.5'} result="blur" />
                <feColorMatrix
                  in="blur"
                  type="matrix"
                  values="0 0 0 0 0   0 0.85 0 0 1   0 0 0 0 1   0 0 0 3 -0.5"
                  result="colored"
                />
                <feMerge>
                  <feMergeNode in="colored" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Inner glow filter */}
              <filter id={innerGlowId} x="-5%" y="-5%" width="110%" height="110%">
                <feFlood floodColor="rgba(0,200,255,0.15)" result="flood" />
                <feComposite in="flood" in2="SourceGraphic" operator="in" result="innerGlow" />
                <feMerge>
                  <feMergeNode in="SourceGraphic" />
                  <feMergeNode in="innerGlow" />
                </feMerge>
              </filter>

              {/* Specular reflection gradient — follows mouse angle */}
              <linearGradient
                id={specGradId}
                x1="0%" y1="0%" x2="100%" y2="100%"
                gradientTransform={`rotate(${specAngle}, 50, 60)`}
              >
                <stop offset="0%"   stopColor="rgba(255,255,255,0)" />
                <stop offset="40%"  stopColor="rgba(255,255,255,0)" />
                <stop offset="48%"  stopColor={`rgba(255,255,255,${isHovered ? 0.22 : 0.07})`} />
                <stop offset="52%"  stopColor={`rgba(200,230,255,${isHovered ? 0.15 : 0.04})`} />
                <stop offset="60%"  stopColor="rgba(255,255,255,0)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>

              {/* Rainbow interference gradient */}
              <linearGradient id={`rainbow-${wordIndex}-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"    stopColor="rgba(0,200,255,0.07)" />
                <stop offset="20%"   stopColor="rgba(120,0,255,0.05)" />
                <stop offset="40%"   stopColor="rgba(0,255,180,0.06)" />
                <stop offset="60%"   stopColor="rgba(255,200,0,0.05)" />
                <stop offset="80%"   stopColor="rgba(255,80,120,0.04)" />
                <stop offset="100%"  stopColor="rgba(0,200,255,0.07)" />
              </linearGradient>
            </defs>

            {/* Die canvas clipped to letter shape — transparent placeholder for clip path */}
            <foreignObject x="0" y="0" width="100" height="120" clipPath={`url(#${clipId})`}>
              <div style={{ width: '100%', height: '100%', background: 'transparent' }} />
            </foreignObject>

            {/* Cyan glow outline — the main letter border */}
            <text
              x="50" y="108"
              textAnchor="middle"
              fontFamily="'Space Grotesk', 'Inter Tight', Arial, sans-serif"
              fontWeight="800"
              fontSize="108"
              letterSpacing="-3"
              fill="none"
              stroke={isHovered ? 'rgba(0,240,255,0.95)' : 'rgba(0,220,255,0.55)'}
              strokeWidth={isHovered ? '2.2' : '1.5'}
              filter={`url(#${edgeFilterId})`}
              style={{ transition: 'stroke 0.3s ease, stroke-width 0.3s ease' }}
            />

            {/* Thin metallic highlight stroke */}
            <text
              x="50" y="108"
              textAnchor="middle"
              fontFamily="'Space Grotesk', 'Inter Tight', Arial, sans-serif"
              fontWeight="800"
              fontSize="108"
              letterSpacing="-3"
              fill="none"
              stroke="rgba(180,220,255,0.18)"
              strokeWidth="0.5"
            />

            {/* Specular reflection — mouse-reactive */}
            <text
              x="50" y="108"
              textAnchor="middle"
              fontFamily="'Space Grotesk', 'Inter Tight', Arial, sans-serif"
              fontWeight="800"
              fontSize="108"
              letterSpacing="-3"
              fill={`url(#${specGradId})`}
              clipPath={`url(#${clipId})`}
            />

            {/* Rainbow interference reflection */}
            <text
              x="50" y="108"
              textAnchor="middle"
              fontFamily="'Space Grotesk', 'Inter Tight', Arial, sans-serif"
              fontWeight="800"
              fontSize="108"
              letterSpacing="-3"
              fill={`url(#rainbow-${wordIndex}-${i})`}
              clipPath={`url(#${clipId})`}
              opacity={isHovered ? '1' : '0.5'}
              style={{ transition: 'opacity 0.4s ease' }}
            />
          </svg>

          {/* Holographic shimmer overlay */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 2,
              background: 'conic-gradient(from 0deg at 50% 50%, rgba(0,255,255,0.05), rgba(120,0,255,0.03), rgba(255,200,0,0.04), rgba(0,255,120,0.03), rgba(0,200,255,0.05), rgba(0,255,255,0.05))',
              mixBlendMode: 'screen',
              pointerEvents: 'none',
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.4s ease',
              animation: 'holoshimmer 8s linear infinite',
            }}
          />

          {/* Ambient glow below letter on hover */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: -10,
              borderRadius: 6,
              background: 'radial-gradient(ellipse at 50% 85%, rgba(0,200,255,0.2), transparent 70%)',
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.4s ease',
              pointerEvents: 'none',
              zIndex: -1,
            }}
          />

          {/* Metallic border frame */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              border: `1px solid ${isHovered ? 'rgba(0,220,255,0.55)' : 'rgba(0,160,255,0.18)'}`,
              borderRadius: 2,
              pointerEvents: 'none',
              transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              boxShadow: isHovered
                ? '0 0 10px rgba(0,200,255,0.35), inset 0 0 6px rgba(0,200,255,0.12)'
                : 'none',
            }}
          />

          {/* Fabrication micro-label */}
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: 2,
              right: 3,
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '5px',
              color: isHovered ? 'rgba(0,220,255,0.75)' : 'rgba(0,200,255,0.3)',
              pointerEvents: 'none',
              letterSpacing: '0.04em',
              lineHeight: 1,
              transition: 'color 0.3s ease',
              whiteSpace: 'nowrap',
            }}
          >
            {`N${(startSeed + i * 7919).toString(16).slice(-3).toUpperCase()}`}
          </span>
        </span>
      );
    });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;800&display=swap');

        @keyframes holoshimmer {
          from { filter: hue-rotate(0deg) brightness(1); }
          to   { filter: hue-rotate(360deg) brightness(1.1); }
        }

        .wafer-name-accessible {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip: rect(0,0,0,0);
          white-space: nowrap;
        }
      `}</style>

      <div ref={containerRef} aria-label="Pranjal Krishnanand" role="heading" aria-level={1}>
        {/* Screen-reader accessible text */}
        <span className="wafer-name-accessible">PRANJAL KRISHNANAND</span>

        {/* First name row */}
        <div
          aria-hidden="true"
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: 0, lineHeight: 1 }}
        >
          {renderWord(FIRST, 0x4a2f8c, 0)}
        </div>

        {/* Last name row */}
        <div
          aria-hidden="true"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            gap: 0,
            lineHeight: 1,
            marginTop: '0.1em',
          }}
        >
          {renderWord(LAST, 0x9f3e1b, 1)}
        </div>
      </div>
    </>
  );
}
