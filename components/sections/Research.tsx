'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useHelpers';

const papers = [
  {
    id: 'paper-1',
    title: 'Quantization-Aware Training for Edge Cardiac Monitoring Systems',
    venue: 'IEEE ANTS 2024 Workshop',
    year: '2024',
    type: 'Workshop Paper',
    abstract:
      'We present a methodology for deploying cardiac arrhythmia classification models on ARM Cortex-M microcontrollers using quantization-aware training (QAT). Our approach achieves 97.4% accuracy with 8× model compression and sub-10ms inference latency.',
    tags: ['Edge AI', 'Quantization', 'Embedded Systems', 'Healthcare'],
    color: '#3b82f6',
    status: 'Published',
  },
  {
    id: 'paper-2',
    title: 'Visual-Inertial Odometry for GPS-Denied Indoor Drone Navigation',
    venue: 'Undergraduate Research Symposium 2025',
    year: '2025',
    type: 'Technical Report',
    abstract:
      'A custom visual-inertial odometry (VIO) system for quadrotor UAVs operating in GPS-denied indoor environments. The system achieves centimeter-level localization accuracy by fusing stereo camera data with IMU measurements using an extended Kalman filter.',
    tags: ['Robotics', 'SLAM', 'UAV', 'Computer Vision'],
    color: '#8b5cf6',
    status: 'In Review',
  },
  {
    id: 'paper-3',
    title: 'Low-Power FPGA Implementation of AES-256-GCM for IoT Security',
    venue: 'VLSI Design Course Project Report',
    year: '2024',
    type: 'Technical Report',
    abstract:
      'Hardware implementation of AES-256-GCM authenticated encryption on Xilinx Artix-7 FPGA achieving 1.2 Gbps throughput at <150mW power consumption, suitable for resource-constrained IoT security applications.',
    tags: ['FPGA', 'Cryptography', 'VLSI', 'IoT Security'],
    color: '#06b6d4',
    status: 'Course Project',
  },
];

export default function ResearchSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="research"
      className="section-padding relative overflow-hidden"
      aria-label="Research and publications"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Background gradient */}
      <div
        className="absolute right-0 bottom-0 w-96 h-96 rounded-full opacity-[0.04] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }}
        aria-hidden="true"
      />

      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="text-label text-blue-400 mb-3 block">05 — Research</span>
          <h2 className="text-display-lg font-display text-white">
            Ideas I&apos;ve
            <br />
            <span className="gradient-text-emerald">explored</span>
          </h2>
        </motion.div>

        <div className="space-y-5">
          {papers.map((paper, i) => (
            <motion.article
              key={paper.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-2xl p-6 md:p-8 hover:border-white/10 transition-all duration-300 group"
              id={`research-${paper.id}`}
            >
              <div className="grid md:grid-cols-[1fr_auto] gap-6">
                <div>
                  {/* Header */}
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span
                      className="text-label px-2.5 py-1 rounded-full border"
                      style={{
                        color: paper.color,
                        borderColor: `${paper.color}40`,
                        background: `${paper.color}10`,
                      }}
                    >
                      {paper.type}
                    </span>
                    <span
                      className="text-label px-2.5 py-1 rounded-full border"
                      style={{
                        color: paper.status === 'Published' ? '#10b981' : '#f59e0b',
                        borderColor: paper.status === 'Published' ? '#10b98140' : '#f59e0b40',
                        background: paper.status === 'Published' ? '#10b98110' : '#f59e0b10',
                      }}
                    >
                      {paper.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-display font-bold text-white mb-1 group-hover:text-blue-200 transition-colors duration-200">
                    {paper.title}
                  </h3>
                  <p className="text-sm text-zinc-500 mb-3">
                    {paper.venue} · {paper.year}
                  </p>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                    {paper.abstract}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {paper.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-0.5 rounded-full border border-white/8 text-zinc-500"
                        style={{ background: 'rgba(255,255,255,0.03)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Year stamp */}
                <div className="flex flex-col items-end justify-between">
                  <span
                    className="text-4xl font-display font-bold opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                    style={{ color: paper.color }}
                  >
                    {paper.year}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
