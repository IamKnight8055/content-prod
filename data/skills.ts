export interface Skill {
  name: string;
  level: number; // 0-100
  icon: string;
}

export interface SkillCategory {
  title: string;
  color: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    color: "#3b82f6",
    skills: [
      { name: "C", level: 90, icon: "terminal" },
      { name: "C++", level: 85, icon: "terminal" },
      { name: "Java", level: 80, icon: "code" },
      { name: "Python", level: 90, icon: "code-2" },
      { name: "JavaScript", level: 80, icon: "file-code" },
      { name: "SQL", level: 75, icon: "database" },
      { name: "Verilog", level: 85, icon: "cpu" },
      { name: "SystemVerilog", level: 80, icon: "cpu" },
    ],
  },
  {
    title: "Web Technologies",
    color: "#06b6d4",
    skills: [
      { name: "HTML", level: 90, icon: "globe" },
      { name: "CSS", level: 85, icon: "layout" },
      { name: "Spring Boot", level: 80, icon: "server" },
    ],
  },
  {
    title: "Software & Environments",
    color: "#8b5cf6",
    skills: [
      { name: "AutoCAD", level: 80, icon: "pen-tool" },
      { name: "MATLAB", level: 85, icon: "sliders" },
      { name: "Simulink", level: 80, icon: "activity" },
      { name: "NI Multisim", level: 80, icon: "circuit-board" },
      { name: "LTspice", level: 90, icon: "waves" },
      { name: "Google Workspace", level: 85, icon: "layout" },
      { name: "MS Office", level: 85, icon: "file-text" },
    ],
  },
  {
    title: "Core ECE Concepts",
    color: "#10b981",
    skills: [
      { name: "Circuit Simulation", level: 90, icon: "activity" },
      { name: "Digital Logic Design", level: 85, icon: "layers" },
      { name: "Signal Processing", level: 85, icon: "radio" },
      { name: "Transmission Line Analysis", level: 80, icon: "git-commit" },
      { name: "Bioelectronic Sensing", level: 80, icon: "crosshair" },
    ],
  },
  {
    title: "Hardware & Instrumentation",
    color: "#f59e0b",
    skills: [
      { name: "Microcontrollers", level: 90, icon: "cpu" },
      { name: "Precision Op-Amps", level: 85, icon: "cpu" },
      { name: "Oscilloscopes", level: 85, icon: "activity" },
      { name: "Function Generators", level: 80, icon: "zap" },
      { name: "Multimeters", level: 85, icon: "activity" },
    ],
  },
];
