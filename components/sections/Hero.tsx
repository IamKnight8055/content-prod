'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// ─── PCB Circuit Canvas Animation ───────────────────────────────────────────
function CircuitCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Generate circuit nodes
    const cols = Math.floor(canvas.width / 60);
    const rows = Math.floor(canvas.height / 60);

    interface Node { x: number; y: number; active: boolean; pulse: number }
    const nodes: Node[] = [];
    for (let i = 0; i <= cols; i++) {
      for (let j = 0; j <= rows; j++) {
        nodes.push({
          x: i * 60 + (Math.random() - 0.5) * 20,
          y: j * 60 + (Math.random() - 0.5) * 20,
          active: Math.random() > 0.7,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    }

    // Generate connections
    interface Edge { a: Node; b: Node; progress: number; speed: number; active: boolean }
    const edges: Edge[] = [];
    for (const node of nodes) {
      const close = nodes.filter(
        (n) =>
          n !== node &&
          Math.abs(n.x - node.x) < 80 &&
          Math.abs(n.y - node.y) < 80 &&
          (Math.abs(n.x - node.x) < 5 || Math.abs(n.y - node.y) < 5) // orthogonal
      );
      for (const neighbor of close.slice(0, 2)) {
        if (Math.random() > 0.4) {
          edges.push({
            a: node,
            b: neighbor,
            progress: Math.random(),
            speed: 0.002 + Math.random() * 0.004,
            active: Math.random() > 0.5,
          });
        }
      }
    }

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      time += 0.01;

      // Draw edges
      for (const edge of edges) {
        if (!edge.active) continue;
        const alpha = 0.08 + Math.sin(time + edge.progress * 10) * 0.03;
        ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(edge.a.x, edge.a.y);
        ctx.lineTo(edge.b.x, edge.b.y);
        ctx.stroke();

        // Animate signal pulse along edge
        edge.progress += edge.speed;
        if (edge.progress > 1) edge.progress = 0;

        const px = edge.a.x + (edge.b.x - edge.a.x) * edge.progress;
        const py = edge.a.y + (edge.b.y - edge.a.y) * edge.progress;
        const pulseAlpha = Math.sin(edge.progress * Math.PI) * 0.8;

        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${pulseAlpha})`;
        ctx.fill();

        // Glow trail
        const grad = ctx.createRadialGradient(px, py, 0, px, py, 8);
        grad.addColorStop(0, `rgba(59, 130, 246, ${pulseAlpha * 0.4})`);
        grad.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Draw nodes
      for (const node of nodes) {
        if (!node.active) continue;
        const pulse = Math.sin(time * 1.5 + node.pulse) * 0.5 + 0.5;
        const r = 2 + pulse * 1.5;
        const alpha = 0.3 + pulse * 0.5;

        // Node dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${alpha})`;
        ctx.fill();

        // Node glow
        const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 12);
        grad.addColorStop(0, `rgba(59, 130, 246, ${alpha * 0.3})`);
        grad.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(node.x, node.y, 12, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-canvas"
      aria-hidden="true"
    />
  );
}

// ─── Animated Scroll Indicator ───────────────────────────────────────────────
function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5, duration: 0.6 }}
      aria-label="Scroll down"
    >
      <span className="text-label text-zinc-500">Scroll</span>
      <div className="w-px h-16 relative overflow-hidden">
        <motion.div
          className="absolute inset-x-0 top-0 h-full"
          style={{
            background: 'linear-gradient(to bottom, transparent, #3b82f6, transparent)',
          }}
          animate={{ y: ['-100%', '200%'] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </motion.div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
const ROLES = [
  'Electronics Engineer',
  'Embedded Systems Dev',
  'IoT Enthusiast',
  'FPGA Designer',
  'AI on the Edge',
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const charRef = useRef(0);

  // Typewriter effect
  useEffect(() => {
    const target = ROLES[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (charRef.current < target.length) {
        timeout = setTimeout(() => {
          charRef.current++;
          setDisplayed(target.slice(0, charRef.current));
        }, 60);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (charRef.current > 0) {
        timeout = setTimeout(() => {
          charRef.current--;
          setDisplayed(target.slice(0, charRef.current));
        }, 30);
      } else {
        setIsDeleting(false);
        setRoleIndex((i) => (i + 1) % ROLES.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  // Stagger animation variants
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  };
  const item = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  const handleNavClick = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-[#09090b]" />

      {/* Gradient orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.06] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.04] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }}
        aria-hidden="true"
      />

      {/* Circuit canvas */}
      <CircuitCanvas />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, #09090b 100%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 container-xl px-6 pt-20">
        <motion.div
          className="max-w-5xl"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Label */}
          <motion.div variants={item} className="mb-6">
            <span
              className="text-label text-blue-400 border border-blue-500/30 rounded-full px-4 py-1.5 inline-block"
              style={{ background: 'rgba(37, 99, 235, 0.08)' }}
            >
              BUILDING WHERE ELECTRONS MEET INTELLIGENCE
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={item}
            className="text-display-2xl font-display text-white mb-4"
          >
            Pranjal{' '}
            Krishnanand
          </motion.h1>

          {/* Typewriter role */}
          <motion.div
            variants={item}
            className="text-display-md text-zinc-400 mb-8 font-display"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="gradient-text-violet">{displayed}</span>
            <span
              className="inline-block w-0.5 h-8 bg-blue-400 ml-1 align-middle"
              style={{ animation: 'fadeIn 0.8s steps(2) infinite' }}
              aria-hidden="true"
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={item}
            className="text-lg text-zinc-400 max-w-2xl leading-relaxed"
          >
            Engineering the future at the intersection of{' '}
            <span className="text-blue-400">hardware</span>,{' '}
            <span className="text-violet-400">AI</span>, and{' '}
            <span className="text-cyan-400">systems design</span>. I build
            things that live at the edge — where electrons meet intelligence.
          </motion.p>


        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
