"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, Database, Network, Globe } from 'lucide-react';

export default function JarvisDashboard() {
  const [isBooting, setIsBooting] = useState(true);
  const [loadingText, setLoadingText] = useState("Initializing J.A.R.V.I.S...");

  // Cinematic Boot Sequence Logic
  useEffect(() => {
    const bootSteps = [
      "Loading Neural Interface...",
      "Scanning Environment...",
      "bypassing main frame samples",
      "Loading Engineering Database...",
      "Connecting AI Modules...",
      "System Online. Welcome."
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < bootSteps.length) {
        setLoadingText(bootSteps[step]);
        step++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsBooting(false), 1000);
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  if (isBooting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] text-[#00FFFF]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-24 h-24 border-t-2 border-b-2 border-[#00FFFF] rounded-full mb-8"
        />
        <h1 className="text-xl tracking-widest uppercase animate-pulse">{loadingText}</h1>
        <div className="w-64 h-1 bg-gray-800 mt-4 overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 4.8, ease: "easeInOut" }}
            className="h-full bg-[#00E5FF] shadow-[0_0_10px_#00FFFF]"
          />
        </div>
      </div>
    );
  }

  // Dashboard Interface
  return (
    <div className="min-h-screen p-6 grid grid-cols-12 gap-6 relative z-10">

      {/* Floating AI Assistant Panel (Left) */}
      <motion.div
        initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
        className="col-span-3 holo-panel p-6 flex flex-col gap-4"
      >
        <div className="flex items-center gap-3 border-b border-[#00FFFF]/20 pb-4">
          <Cpu className="text-[#00E5FF] animate-pulse" />
          <h2 className="tracking-widest">SYSTEM_STATUS</h2>
        </div>
        <ul className="space-y-4 mt-4 text-sm tracking-wider">
          <li className="flex items-center gap-2 hover:bg-[#00FFFF]/10 p-2 rounded cursor-pointer transition-colors"><Database size={16} /> PROFILE</li>
          <li className="flex items-center gap-2 hover:bg-[#00FFFF]/10 p-2 rounded cursor-pointer transition-colors"><Terminal size={16} /> MISSION_LOG</li>
          <li className="flex items-center gap-2 hover:bg-[#00FFFF]/10 p-2 rounded cursor-pointer transition-colors"><Network size={16} /> SKILLS_MATRIX</li>
          <li className="flex items-center gap-2 hover:bg-[#00FFFF]/10 p-2 rounded cursor-pointer transition-colors"><Globe size={16} /> COMM_LINK</li>
        </ul>
      </motion.div>

      {/* Main Center Hologram (Hero) */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}
        className="col-span-6 flex flex-col items-center justify-center text-center holo-panel p-12 relative overflow-hidden"
      >
        {/* Decorative Rotating Ring */}
        <motion.div
          animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="absolute w-[400px] h-[400px] border border-[#00FFFF]/10 rounded-full border-dashed"
        />

        <h1 className="text-5xl font-bold tracking-[0.2em] mb-4 text-white drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]">
          HELLO. I'M PRANJAL KRISHNANAND
        </h1>
        <h2 className="text-xl text-[#00E5FF] tracking-widest mb-6">
          Electronics & Communication Engineer // Future Innovator
        </h2>

        <div className="holo-panel bg-black/50 p-6 mt-4 w-full text-left">
          <h3 className="text-sm text-gray-400 mb-2">// PERSONNEL_FILE</h3>
          <p className="leading-relaxed">
            I am a 19-year-old ECE major and hardware enthusiast. I specialize in designing and developing electronic systems, with core skills spanning embedded systems, IoT, robotics, and wireless communication, all backed by a strong foundation in software logic.
          </p>
        </div>
      </motion.div>

      {/* Right System Metrics Panel */}
      <motion.div
        initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}
        className="col-span-3 holo-panel p-6"
      >
        <h2 className="tracking-widest border-b border-[#00FFFF]/20 pb-4 mb-6">PERFORMANCE_METRICS</h2>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>EMBEDDED_SYSTEMS</span>
              <span>95%</span>
            </div>
            <div className="h-2 w-full bg-gray-900 rounded">
              <motion.div initial={{ width: 0 }} animate={{ width: "95%" }} transition={{ delay: 1, duration: 1.5 }} className="h-full bg-[#00E5FF] shadow-[0_0_8px_#00FFFF]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>IOT_DEVELOPMENT</span>
              <span>90%</span>
            </div>
            <div className="h-2 w-full bg-gray-900 rounded">
              <motion.div initial={{ width: 0 }} animate={{ width: "90%" }} transition={{ delay: 1.2, duration: 1.5 }} className="h-full bg-[#00E5FF] shadow-[0_0_8px_#00FFFF]" />
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  );
}