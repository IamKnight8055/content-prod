'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useHelpers';
import { experiences } from '@/data/achievements';

export default function ExperienceSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="experience"
      className="section-padding relative overflow-hidden"
      aria-label="Experience"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* BG */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-full opacity-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #3b82f6 20%, #3b82f6 80%, transparent)' }}
        aria-hidden="true"
      />

      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="text-label text-blue-400 mb-3 block">04 — Experience</span>
          <h2 className="text-display-lg font-display text-white">
            Where I&apos;ve been
            <br />
            <span className="gradient-text-violet">building</span>
          </h2>
        </motion.div>

        <div className="relative pl-8 md:pl-0">
          {/* Vertical line */}
          <div
            className="absolute left-3 md:left-1/2 top-0 w-px h-full opacity-20 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, #3b82f6, #8b5cf6, transparent)' }}
            aria-hidden="true"
          />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className={`relative md:grid md:grid-cols-2 md:gap-12 items-start ${
                  i % 2 === 1 ? 'md:grid-flow-dense' : ''
                }`}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-[-1.25rem] md:left-1/2 top-6 w-4 h-4 rounded-full border-2 md:-translate-x-1/2 transition-all duration-300 z-10"
                  style={{
                    borderColor: exp.color,
                    background: inView ? exp.color : '#09090b',
                    boxShadow: inView ? `0 0 20px ${exp.color}60` : 'none',
                  }}
                  aria-hidden="true"
                />

                {/* Content card */}
                <div className={`glass rounded-2xl p-6 hover:border-white/10 transition-all duration-300 ${i % 2 === 1 ? 'md:col-start-2' : ''}`}>
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span
                        className="text-label mb-2 block"
                        style={{ color: exp.color }}
                      >
                        {exp.type}
                      </span>
                      <h3 className="text-lg font-display font-bold text-white">
                        {exp.role}
                      </h3>
                      <p className="text-sm text-zinc-400 mt-0.5">{exp.organization}</p>
                    </div>
                    <span className="text-xs font-mono text-zinc-600 whitespace-nowrap ml-4 mt-1">
                      {exp.duration}
                    </span>
                  </div>

                  <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-2 mb-4">
                    {exp.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-zinc-400">
                        <span
                          className="w-1 h-1 rounded-full mt-2 flex-shrink-0"
                          style={{ background: exp.color }}
                          aria-hidden="true"
                        />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2.5 py-0.5 rounded-full border border-white/8 text-zinc-500"
                        style={{ background: 'rgba(255,255,255,0.03)' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Empty cell for alternating layout */}
                {i % 2 === 0 && <div className="hidden md:block" />}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
