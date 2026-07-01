'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '@/hooks/useHelpers';
import { projects, type Project } from '@/data/projects';

function ProjectCard({ project, onClick, index }: { project: Project; onClick: () => void; index: number }) {
  const { ref, inView } = useInView(0.1);

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className="project-card cursor-pointer group"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`View project: ${project.title}`}
      id={`project-card-${project.id}`}
    >
      {/* Thumbnail */}
      <div
        className="h-56 relative flex items-center justify-center overflow-hidden rounded-2xl"
        style={{ background: `linear-gradient(135deg, ${project.accentColor}, rgba(9,9,11,0.8))` }}
      >
        {/* Decorative circuit pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          viewBox="0 0 400 230"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <g stroke={project.color} strokeWidth="1" fill="none" opacity="0.6">
            <path d="M20 115 H120 V50 H200" />
            <path d="M200 50 H280 V115 H380" />
            <path d="M80 180 H180 V115" />
            <path d="M220 115 V180 H320" />
            <circle cx="120" cy="115" r="4" fill={project.color} />
            <circle cx="280" cy="115" r="4" fill={project.color} />
            <circle cx="200" cy="50" r="3" fill={project.color} />
            <circle cx="180" cy="180" r="3" fill={project.color} />
          </g>
        </svg>

        {/* Project icon */}
        <div
          className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-display font-bold border"
          style={{
            background: `${project.accentColor}`,
            borderColor: `${project.color}40`,
            color: project.color,
          }}
        >
          {project.title[0]}
        </div>

        {/* Year badge */}
        <span
          className="absolute top-4 right-4 text-xs font-mono px-2.5 py-1 rounded-full border"
          style={{
            background: 'rgba(9,9,11,0.8)',
            borderColor: `${project.color}30`,
            color: project.color,
          }}
        >
          {project.year}
        </span>

        {/* Category badge */}
        <span
          className="absolute top-4 left-4 text-label px-2.5 py-1 rounded-full border"
          style={{
            background: 'rgba(9,9,11,0.8)',
            borderColor: 'rgba(255,255,255,0.08)',
            color: '#a1a1aa',
          }}
        >
          {project.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-display font-bold text-white mb-1 group-hover:text-blue-300 transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-xs text-zinc-500 mb-3 font-medium">{project.subtitle}</p>
        <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2 mb-4">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full border border-white/8 text-zinc-500"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="text-xs px-2 py-0.5 rounded-full text-zinc-600">
              +{project.tags.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9970] flex items-center justify-center p-4 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-modal="true"
        role="dialog"
        aria-label={`Project details: ${project.title}`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0" style={{ background: 'rgba(9,9,11,0.95)', backdropFilter: 'blur(24px)' }} />

        {/* Panel */}
        <motion.div
          className="relative z-10 w-full max-w-3xl glass-strong rounded-3xl overflow-hidden"
          initial={{ scale: 0.9, y: 40 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 40 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header banner */}
          <div
            className="h-40 relative flex items-end p-8"
            style={{ background: `linear-gradient(135deg, ${project.accentColor}, rgba(9,9,11,0.8))` }}
          >
            <div>
              <span className="text-label mb-2 block" style={{ color: project.color }}>
                {project.category} · {project.year}
              </span>
              <h2 className="text-3xl font-display font-bold text-white">{project.title}</h2>
              <p className="text-zinc-400 text-sm mt-1">{project.subtitle}</p>
            </div>

            {/* Close btn */}
            <button
              id={`project-modal-close-${project.id}`}
              onClick={onClose}
              className="absolute top-6 right-6 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/40 transition-all duration-200"
              aria-label="Close project details"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto">
            <p className="text-zinc-300 leading-relaxed">{project.longDescription}</p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="text-center p-4 rounded-xl border border-white/5"
                  style={{ background: `${project.accentColor}` }}
                >
                  <div className="text-xl font-display font-bold" style={{ color: project.color }}>
                    {m.value}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div>
              <h4 className="text-sm font-semibold text-zinc-300 mb-3 text-label">Key Features</h4>
              <ul className="space-y-2">
                {project.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-zinc-400">
                    <span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full border border-white/8 text-zinc-400"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-3 pt-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-sm text-zinc-300 hover:text-white border border-white/8 hover:border-white/20 transition-all duration-300"
                  id={`project-github-${project.id}`}
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  View on GitHub
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-sm text-white transition-all duration-300"
                  id={`project-demo-${project.id}`}
                >
                  Live Demo →
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ProjectsSection() {
  const { ref, inView } = useInView(0.05);
  const [selected, setSelected] = useState<Project | null>(null);

  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="section-padding relative"
      aria-label="Projects"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span className="text-label text-blue-400 mb-3 block">03 — Projects</span>
            <h2 className="text-display-lg font-display text-white">
              Things I&apos;ve
              <br />
              <span className="gradient-text-blue">built & shipped</span>
            </h2>
          </div>
          <p className="text-zinc-400 max-w-sm text-sm leading-relaxed">
            From wearable medical devices to autonomous drones — each project
            is a proof of concept that ideas can become reality.
          </p>
        </motion.div>

        {/* Featured grid — asymmetric */}
        <div className="grid md:grid-cols-3 gap-5 mb-5">
          {featured.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelected(project)}
              index={i}
            />
          ))}
        </div>

        {/* Other projects */}
        <div className="grid md:grid-cols-2 gap-5">
          {others.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelected(project)}
              index={i + featured.length}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
