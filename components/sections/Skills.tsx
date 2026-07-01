'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useHelpers';
import { skillCategories } from '@/data/skills';

export default function SkillsSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="skills"
      className="section-padding relative overflow-hidden"
      aria-label="Skills"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Background */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-[0.04] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #06b6d4, transparent)' }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.015) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} aria-hidden="true" />

      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="text-label text-blue-400 mb-3 block">02 — Skills</span>
          <h2 className="text-display-lg font-display text-white">
            My engineering
            <br />
            <span className="gradient-text-cyan">toolkit</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIdx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-2xl p-6 hover:border-white/10 transition-colors duration-300"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-2 h-8 rounded-full"
                  style={{ background: category.color }}
                  aria-hidden="true"
                />
                <h3 className="font-display font-semibold text-white text-lg">
                  {category.title}
                </h3>
              </div>

              {/* Skills list */}
              <div className="space-y-3">
                {category.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: catIdx * 0.1 + skillIdx * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group"
                  >
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors duration-200">
                        {skill.name}
                      </span>
                      <span className="text-xs font-mono text-zinc-600 group-hover:text-zinc-400 transition-colors duration-200">
                        {skill.level}%
                      </span>
                    </div>
                    {/* Progress bar */}
                    <div
                      className="h-px rounded-full overflow-hidden"
                      style={{ background: 'rgba(255,255,255,0.06)' }}
                      role="progressbar"
                      aria-valuenow={skill.level}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${skill.name} proficiency: ${skill.level}%`}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${category.color}, ${category.color}80)` }}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{
                          duration: 0.8,
                          delay: catIdx * 0.1 + skillIdx * 0.05 + 0.3,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating tech pills marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 overflow-hidden relative"
          aria-hidden="true"
        >
          <div className="animate-marquee flex gap-4 w-max">
            {[
              'STM32', 'FPGA', 'ROS2', 'TFLite', 'Verilog', 'KiCad', 'FreeRTOS',
              'OpenCV', 'MQTT', 'BLE', 'Python', 'C++', 'React', 'Next.js',
              'STM32', 'FPGA', 'ROS2', 'TFLite', 'Verilog', 'KiCad', 'FreeRTOS',
              'OpenCV', 'MQTT', 'BLE', 'Python', 'C++', 'React', 'Next.js',
            ].map((tech, i) => (
              <span key={i} className="skill-pill text-zinc-500 whitespace-nowrap text-xs">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
