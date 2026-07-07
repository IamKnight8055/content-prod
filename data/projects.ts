export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  tags: string[];
  category: string;
  color: string;
  accentColor: string;
  github?: string;
  demo?: string;
  featured: boolean;
  year: string;
  metrics: { label: string; value: string }[];
  features: string[];
}

export const projects: Project[] = [
  {
    id: "praseom",
    title: "Praseom",
    subtitle: "Bioelectronic Sensor System",
    description:
      "High-fidelity potassium bioelectronic sensor system modeled, simulated, and prototyped using LTspice, precision operational amplifiers, and microcontrollers.",
    longDescription:
      "Praseom is a high-fidelity bioelectronic sensor system specifically designed for potassium sensing. Focuses on modeling and simulating high-impedance bioelectronic sensors in LTspice to analyze complex transient responses, designing physical hardware prototypes with precision operational amplifiers, and optimizing signal-to-noise ratios for clear biosensor readings.",
    tags: ["LTspice", "Op-Amps", "Microcontrollers", "Bioelectronic Sensing", "Circuit Simulation"],
    category: "Bioelectronics",
    color: "#3b82f6",
    accentColor: "rgba(59, 130, 246, 0.15)",
    github: "https://github.com/iamknight8055",
    demo: undefined,
    featured: true,
    year: "2025",
    metrics: [
      { label: "Simulation Accuracy", value: "High" },
      { label: "Hardware Prototype", value: "Op-Amp Based" },
      { label: "Signal Integrity", value: "Optimized SNR" },
    ],
    features: [
      "Modeled and simulated high-impedance bioelectronic sensors for potassium circuitry in LTspice",
      "Architected physical hardware prototype by sourcing, configuring, and integrating precision op-amps and microcontrollers",
      "Troubleshot schematic alignments and optimized signal-to-noise ratio for biosensor readings",
    ],
  },
  {
    id: "hf-compensator",
    title: "High-Frequency Compensator",
    subtitle: "Transmission Network & Control System",
    description:
      "Lead/lag compensator network and transmission line impedance analysis designed and tested with MATLAB, Oscilloscopes, and Signal Generators.",
    longDescription:
      "Designed and analyzed lead/lag compensator networks to optimize system stability and improve transient response in physical control systems. Evaluated high-frequency wave behavior by calculating complex transmission line equations and measuring intrinsic impedance, verifying mathematical models against physical hardware testing.",
    tags: ["MATLAB", "Oscilloscopes", "Signal Generators", "Control Systems", "Transmission Lines", "RF & Wireless"],
    category: "Signal Processing & Control",
    color: "#8b5cf6",
    accentColor: "rgba(139, 92, 246, 0.15)",
    github: "https://github.com/iamknight8055",
    demo: undefined,
    featured: true,
    year: "2025",
    metrics: [
      { label: "Analysis Tool", value: "MATLAB" },
      { label: "Hardware Testing", value: "Oscilloscopes" },
      { label: "System Stability", value: "Optimized" },
    ],
    features: [
      "Designed and analyzed lead/lag compensator networks to optimize system stability",
      "Calculated complex transmission line equations and measured intrinsic impedance across hardware mediums",
      "Verified theoretical mathematical models against physical hardware testing with Signal Generators and Oscilloscopes",
    ],
  },
];
