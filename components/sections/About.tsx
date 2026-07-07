'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useHelpers';

const highlights = [
  { label: 'Focus Area', value: 'Electronics & Communication' },
  { label: 'University', value: 'VNR VJIET' },
  { label: 'Year', value: '2nd Year Undergraduate' },
  { label: 'Based In', value: 'Hyderabad, India 🇮🇳' },
];

const passions = [
  'Bioelectronic sensing & instrumentation',
  'Circuit simulation & design',
  'Control systems & signal processing',
  'Cinematography & photography',
  'Embedded systems prototyping',
  'Technical workshops & training',
];

export default function AboutSection() {
  const { ref, inView } = useInView(0.15);

  return (
    <section
      id="about"
      className="section-padding relative overflow-hidden"
      aria-label="About me"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Background accent */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-[0.04] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }}
        aria-hidden="true"
      />

      <div className="container-xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="text-label text-blue-400 mb-3 block">01 — About</span>
          <h2 className="text-display-lg font-display text-white">
            The person behind
            <br />
            <span className="gradient-text-violet">the circuits</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — Bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <p className="text-zinc-300 text-lg leading-relaxed">
              Hey! I&apos;m <strong className="text-white font-semibold">Pranjal Krishnanand</strong>,
              a 19-year-old Electronics and Communication Engineering student with an
              obsession for building things that exist at the edge of software and hardware.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              My journey started with an Arduino kit and a dream of making robots. Today,
              I design custom PCBs, program FPGAs in Verilog, deploy machine learning
              models on microcontrollers, and build autonomous robotic systems.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              I believe the most exciting engineering happens at the intersection of
              disciplines — where a signal becomes data, data becomes intelligence, and
              intelligence becomes action. That&apos;s the space I live in.
            </p>

            {/* Passion tags */}
            <div>
              <p className="text-sm font-medium text-zinc-500 mb-3 text-label">I care about</p>
              <div className="flex flex-wrap gap-2">
                {passions.map((p) => (
                  <span key={p} className="skill-pill text-zinc-300 text-sm">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Info Card + Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {/* Floating profile card */}
            <div className="glass rounded-2xl p-8 relative overflow-hidden gradient-border animate-float">
              {/* Decorative corner accent */}
              <div
                className="absolute top-0 right-0 w-32 h-32 opacity-20 rounded-bl-full"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
                aria-hidden="true"
              />
              <div className="relative">
                {/* Avatar placeholder */}
                <div className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center text-2xl font-display font-bold gradient-text-blue border border-blue-500/30"
                  style={{ background: 'rgba(37, 99, 235, 0.1)' }}
                >
                  PK
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-1">
                  Pranjal Krishnanand
                </h3>
                <p className="text-sm text-blue-400 mb-6">
                  B.Tech Electronics &amp; Communication Engineering
                </p>

                <div className="space-y-4">
                  {highlights.map((h) => (
                    <div key={h.label} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                      <span className="text-xs text-zinc-500 font-medium">{h.label}</span>
                      <span className="text-sm text-zinc-200 font-medium">{h.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Open to opportunities badge */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-emerald-500/20"
              style={{ background: 'rgba(16, 185, 129, 0.06)' }}>
              <span className="animate-pulse-ring w-2.5 h-2.5 rounded-full bg-emerald-400 flex-shrink-0" />
              <span className="text-sm text-emerald-300">
                Open to internships &amp; research collaborations
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
