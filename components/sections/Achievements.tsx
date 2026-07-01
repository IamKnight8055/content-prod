'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useHelpers';
import { certifications, stats, achievements } from '@/data/achievements';

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView(0.5);
  const started = useRef(false);

  useEffect(() => {
    if (inView && !started.current) {
      started.current = true;
      const duration = 1500;
      const startTime = Date.now();

      const tick = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * value));
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    }
  }, [inView, value]);

  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>}>
      {count}
      {suffix}
    </span>
  );
}

// ─── Certifications Slider ────────────────────────────────────────────────────
function CertificationsSlider() {
  const { ref, inView } = useInView(0.1);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="flex gap-4 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory no-scrollbar">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex-none snap-center glass rounded-2xl p-5 min-w-[240px] max-w-[280px] hover:border-white/10 transition-all duration-300 group"
              id={`cert-${cert.name.toLowerCase().replace(/\s+/g, '-').slice(0, 20)}`}
            >
              {/* Badge */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm font-mono mb-4 border"
                style={{
                  background: `${cert.color}15`,
                  borderColor: `${cert.color}40`,
                  color: cert.color,
                }}
                aria-hidden="true"
              >
                ✓
              </div>
              <h4 className="text-sm font-semibold text-white mb-1 leading-snug group-hover:text-blue-200 transition-colors duration-200">
                {cert.name}
              </h4>
              <p className="text-xs text-zinc-500">{cert.issuer}</p>
              <p className="text-xs text-zinc-600 mt-1 font-mono">{cert.year}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ─── Achievements & Stats Section ─────────────────────────────────────────────
export default function AchievementsSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="achievements"
      className="section-padding relative overflow-hidden"
      aria-label="Achievements and certifications"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Dot grid bg */}
      <div className="absolute inset-0 pointer-events-none opacity-30" style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }} aria-hidden="true" />

      <div className="container-xl space-y-20">

        {/* ── Stats ─────────────────────────────────────────── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <span className="text-label text-blue-400 mb-3 block">06 — Achievements</span>
            <h2 className="text-display-lg font-display text-white">
              Numbers that
              <br />
              <span className="gradient-text-blue">speak</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="glass rounded-2xl p-6 text-center"
                id={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="text-4xl font-display font-bold gradient-text-blue mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-zinc-500 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Awards & Competition Wins ────────────────────── */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-display-md font-display text-white mb-8"
          >
            Awards &amp; Recognitions
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-5">
            {achievements.map((ach, i) => (
              <motion.div
                key={ach.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="glass rounded-2xl p-6 hover:border-white/10 transition-all duration-300 group"
                id={`achievement-${ach.id}`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4 border"
                  style={{
                    background: `${ach.color}15`,
                    borderColor: `${ach.color}40`,
                  }}
                  aria-hidden="true"
                >
                  {ach.type === 'hackathon' ? '🏆' : ach.type === 'competition' ? '🥈' : '📄'}
                </div>
                <h4 className="text-sm font-bold text-white mb-1 group-hover:text-blue-200 transition-colors duration-200">
                  {ach.title}
                </h4>
                <p className="text-xs text-zinc-500 mb-2">{ach.event}</p>
                <p className="text-xs text-zinc-400 leading-relaxed">{ach.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Certifications ───────────────────────────────── */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-display-md font-display text-white mb-8"
          >
            Certifications
          </motion.h3>
          <CertificationsSlider />
        </div>
      </div>
    </section>
  );
}
