'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useHelpers';

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/iamknight8055',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    color: '#a1a1aa',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/pranjalkrishnanand18/',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: '#0ea5e9',
  },
  {
    label: 'Email',
    href: 'mailto:pranjalkrishnanand183@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: '#10b981',
  },
];

export default function ContactSection() {
  const { ref, inView } = useInView(0.1);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate send for static site
    setTimeout(() => {
      setStatus('sent');
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="section-padding relative overflow-hidden"
      aria-label="Contact"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* BG glow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[800px] h-[400px] opacity-[0.04] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #3b82f6, transparent)' }}
        aria-hidden="true"
      />

      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <span className="text-label text-blue-400 mb-3 block">07 — Contact</span>
          <h2 className="text-display-lg font-display text-white mx-auto">
            Let&apos;s build
            <br />
            <span className="gradient-text-blue">something great</span>
          </h2>
          <p className="text-zinc-400 max-w-md mx-auto mt-4 leading-relaxed">
            Open to internships, research collaborations, hackathon teams, and
            interesting conversations. Don&apos;t hesitate to reach out.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Left — Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {status === 'sent' ? (
              <div className="glass rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center gap-4">
                <div className="text-4xl">✉️</div>
                <h3 className="text-xl font-display font-bold text-white">Message Sent!</h3>
                <p className="text-zinc-400 text-sm">
                  Thanks for reaching out — I&apos;ll get back to you within 24 hours.
                </p>
                <button
                  id="contact-send-another-btn"
                  onClick={() => { setStatus('idle'); setForm({ name: '', email: '', message: '' }); }}
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass rounded-2xl p-8 space-y-5"
                noValidate
                aria-label="Contact form"
              >
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-medium text-zinc-500 mb-2 text-label">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-medium text-zinc-500 mb-2 text-label">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-medium text-zinc-500 mb-2 text-label">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="What's on your mind?"
                    className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all duration-300 resize-none"
                  />
                </div>
                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-sm transition-all duration-300"
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>

          {/* Right — Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6 justify-center"
          >
            <div>
              <p className="text-xs font-medium text-zinc-500 mb-4 text-label">Find me on</p>
              <div className="grid grid-cols-3 gap-3" role="list" aria-label="Social media links">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3 glass rounded-xl p-4 hover:border-white/15 transition-all duration-300 group"
                    id={`contact-social-${s.label.toLowerCase().replace(/\s+/g, '-')}`}
                    aria-label={s.label}
                  >
                    <span className="text-zinc-500 group-hover:text-white transition-colors duration-200">
                      {s.icon}
                    </span>
                    <span className="text-sm font-medium text-zinc-400 group-hover:text-white transition-colors duration-200">
                      {s.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Resume download */}
            <div className="glass rounded-2xl p-6">
              <p className="text-xs text-zinc-500 mb-3 text-label">Download</p>
              <a
                id="contact-resume-download"
                href="/resume.pdf"
                download
                className="flex items-center justify-between gap-4 group"
                aria-label="Download resume PDF"
              >
                <div>
                  <p className="font-semibold text-white group-hover:text-blue-300 transition-colors duration-200">
                    Resume / CV
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5">PDF · Updated 2025</p>
                </div>
                <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-zinc-400 group-hover:border-blue-500/40 group-hover:text-blue-400 transition-all duration-300">
                  ↓
                </div>
              </a>
            </div>

            {/* Availability */}
            <div
              className="flex items-center gap-3 px-5 py-3.5 rounded-xl border border-emerald-500/20"
              style={{ background: 'rgba(16, 185, 129, 0.06)' }}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              <span className="text-sm text-emerald-300">
                Available for Summer 2025 internships
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
