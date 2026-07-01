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
    title: "Hardware & Embedded",
    color: "#3b82f6",
    skills: [
      { name: "STM32 / ARM Cortex", level: 90, icon: "cpu" },
      { name: "FPGA (Verilog/VHDL)", level: 80, icon: "circuit-board" },
      { name: "PCB Design (KiCad)", level: 85, icon: "layers" },
      { name: "Arduino / ESP32", level: 95, icon: "zap" },
      { name: "RTOS (FreeRTOS)", level: 75, icon: "activity" },
      { name: "Raspberry Pi", level: 90, icon: "server" },
    ],
  },
  {
    title: "Signal & Systems",
    color: "#06b6d4",
    skills: [
      { name: "Signal Processing (DSP)", level: 80, icon: "radio" },
      { name: "VLSI Design", level: 70, icon: "chip" },
      { name: "Analog Electronics", level: 85, icon: "waves" },
      { name: "RF & Wireless", level: 72, icon: "wifi" },
      { name: "Control Systems", level: 78, icon: "settings" },
      { name: "Sensor Fusion", level: 82, icon: "crosshair" },
    ],
  },
  {
    title: "Software & AI",
    color: "#8b5cf6",
    skills: [
      { name: "Python", level: 92, icon: "code-2" },
      { name: "C / C++", level: 88, icon: "terminal" },
      { name: "TensorFlow / PyTorch", level: 78, icon: "brain" },
      { name: "ROS2", level: 75, icon: "git-branch" },
      { name: "Computer Vision", level: 76, icon: "eye" },
      { name: "Edge AI / TFLite", level: 80, icon: "zap" },
    ],
  },
  {
    title: "Web & Tools",
    color: "#10b981",
    skills: [
      { name: "React / Next.js", level: 80, icon: "layout" },
      { name: "TypeScript", level: 78, icon: "file-code" },
      { name: "Git / GitHub", level: 92, icon: "github" },
      { name: "Linux", level: 88, icon: "terminal" },
      { name: "MATLAB / Simulink", level: 75, icon: "bar-chart" },
      { name: "Docker", level: 68, icon: "box" },
    ],
  },
];
