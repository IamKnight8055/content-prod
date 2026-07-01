export interface Experience {
  id: string;
  role: string;
  organization: string;
  type: "internship" | "research" | "club" | "competition";
  duration: string;
  year: string;
  description: string;
  highlights: string[];
  tech: string[];
  color: string;
}

export const experiences: Experience[] = [
  {
    id: "research-iot",
    role: "Undergraduate Research Assistant",
    organization: "IoT & Embedded Systems Lab",
    type: "research",
    duration: "Aug 2024 – Present",
    year: "2024",
    description:
      "Conducting research on energy-efficient edge AI architectures for IoT sensing applications. Focusing on model compression techniques including quantization and pruning for deployment on ARM Cortex-M series microcontrollers.",
    highlights: [
      "Reduced model size by 8× with <2% accuracy loss using structured pruning",
      "Published a workshop paper on TFLite Micro deployment optimizations",
      "Co-mentoring 2 junior students on embedded ML projects",
    ],
    tech: ["TFLite Micro", "C++", "Python", "STM32", "Quantization"],
    color: "#3b82f6",
  },
  {
    id: "robotics-club",
    role: "Technical Lead — Robotics Club",
    organization: "IEEE Student Branch",
    type: "club",
    duration: "Jan 2024 – Present",
    year: "2024",
    description:
      "Leading the autonomous systems division of the college robotics club. Responsible for designing and building competition robots, mentoring a team of 10 members, and organizing hands-on workshops on ROS2 and embedded systems.",
    highlights: [
      "Led team to 2nd place in Inter-College Robotics Competition 2024",
      "Organized 3 workshops on ROS2, PCB Design, and FPGA basics",
      "Built custom omnidirectional robot with real-time path planning",
    ],
    tech: ["ROS2", "Python", "Arduino", "PCB Design", "Computer Vision"],
    color: "#8b5cf6",
  },
  {
    id: "internship-embedded",
    role: "Embedded Software Intern",
    organization: "TechVista Systems Pvt. Ltd.",
    type: "internship",
    duration: "May 2024 – Jul 2024",
    year: "2024",
    description:
      "Worked on firmware development for industrial IoT gateway devices. Implemented MQTT communication protocol for device telemetry and developed a custom bootloader for OTA firmware updates on STM32-based hardware.",
    highlights: [
      "Developed OTA update system reducing field maintenance visits by 40%",
      "Implemented secure MQTT with TLS 1.3 for device-cloud communication",
      "Optimized RTOS task scheduling reducing power consumption by 22%",
    ],
    tech: ["STM32", "FreeRTOS", "MQTT", "C", "Python", "TLS/SSL"],
    color: "#06b6d4",
  },
];

export interface Achievement {
  id: string;
  title: string;
  event: string;
  year: string;
  description: string;
  type: "award" | "hackathon" | "certification" | "competition";
  color: string;
}

export const achievements: Achievement[] = [
  {
    id: "hack-1",
    title: "1st Place — Hardware Hackathon",
    event: "TechFest 2025 — IIT Bombay",
    year: "2025",
    description:
      "Built a real-time wildfire detection system using thermal imaging and edge AI in 36 hours. Won ₹1,00,000 prize.",
    type: "hackathon",
    color: "#f59e0b",
  },
  {
    id: "robotics-2nd",
    title: "2nd Place — Autonomous Robotics",
    event: "Inter-College Robotics Competition 2024",
    year: "2024",
    description:
      "Designed and deployed an autonomous line-following robot with real-time obstacle avoidance.",
    type: "competition",
    color: "#8b5cf6",
  },
  {
    id: "paper-published",
    title: "Workshop Paper Accepted",
    event: "IEEE ANTS 2024 Workshop",
    year: "2024",
    description:
      "Paper on 'Quantization-Aware Training for Edge Cardiac Monitoring' accepted at IEEE ANTS 2024 workshop proceedings.",
    type: "award",
    color: "#3b82f6",
  },
];

export const stats = [
  { label: "Projects Built", value: 25, suffix: "+" },
  { label: "GitHub Commits", value: 1200, suffix: "+" },
  { label: "Lines of Code", value: 50, suffix: "K+" },
  { label: "Competitions Won", value: 4, suffix: "" },
];

export const certifications = [
  {
    name: "TensorFlow Developer Certificate",
    issuer: "Google",
    year: "2024",
    color: "#f59e0b",
  },
  {
    name: "Embedded Systems Design",
    issuer: "Coursera – UC Boulder",
    year: "2024",
    color: "#3b82f6",
  },
  {
    name: "PCB Design Professional",
    issuer: "Udemy / KiCad",
    year: "2023",
    color: "#10b981",
  },
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2025",
    color: "#f97316",
  },
  {
    name: "ROS2 Humble Certification",
    issuer: "The Construct",
    year: "2024",
    color: "#8b5cf6",
  },
  {
    name: "NPTEL: Digital VLSI Design",
    issuer: "IIT Madras",
    year: "2024",
    color: "#06b6d4",
  },
];
