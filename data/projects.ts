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
    id: "sigsense",
    title: "SigSense",
    subtitle: "AI-Powered ECG Anomaly Detector",
    description:
      "Real-time cardiac monitoring system using CNN-LSTM hybrid architecture deployed on an STM32 microcontroller, achieving 97.4% detection accuracy.",
    longDescription:
      "SigSense is a wearable medical device that continuously monitors ECG signals and detects cardiac anomalies in real-time. The system uses a compressed CNN-LSTM model quantized for edge inference on an STM32H7 microcontroller. Data is streamed via BLE to a companion app for visualization and alert management.",
    tags: ["STM32", "TensorFlow Lite", "BLE", "Python", "C++", "RTOS"],
    category: "Embedded AI",
    color: "#3b82f6",
    accentColor: "rgba(59, 130, 246, 0.15)",
    github: "https://github.com/iamknight8055",
    demo: undefined,
    featured: true,
    year: "2025",
    metrics: [
      { label: "Detection Accuracy", value: "97.4%" },
      { label: "Inference Latency", value: "<8ms" },
      { label: "Power Draw", value: "2.1mW" },
    ],
    features: [
      "Real-time ECG signal processing at 500Hz",
      "On-device ML inference with TensorFlow Lite Micro",
      "BLE 5.0 streaming to mobile app",
      "5 arrhythmia types classified",
    ],
  },
  {
    id: "aerobot",
    title: "AeroBot",
    subtitle: "Autonomous Quadrotor Navigation",
    description:
      "A self-navigating drone with onboard computer vision for obstacle avoidance and GPS-denied indoor localization using visual odometry.",
    longDescription:
      "AeroBot is a custom-built quadrotor equipped with a Raspberry Pi 4 running a visual SLAM pipeline. The drone can navigate autonomously in GPS-denied environments using stereo visual odometry and IMU fusion. A custom PID controller maintains stability while the onboard CV system identifies and avoids obstacles in real-time.",
    tags: ["ROS2", "OpenCV", "Raspberry Pi", "Python", "PID", "SLAM"],
    category: "Robotics",
    color: "#8b5cf6",
    accentColor: "rgba(139, 92, 246, 0.15)",
    github: "https://github.com/iamknight8055",
    demo: undefined,
    featured: true,
    year: "2024",
    metrics: [
      { label: "Localization Error", value: "<5cm" },
      { label: "Obstacle Detection", value: "30fps" },
      { label: "Flight Time", value: "18 min" },
    ],
    features: [
      "Visual-inertial odometry (VIO) for indoor navigation",
      "Real-time stereo depth estimation",
      "Custom PID autopilot with adaptive gains",
      "ROS2 node architecture for modularity",
    ],
  },
  {
    id: "cryptonode",
    title: "CryptoNode",
    subtitle: "Embedded Secure Communication Node",
    description:
      "Hardware security module implementing AES-256 and ChaCha20 encryption at the silicon level for IoT device-to-device authentication.",
    longDescription:
      "CryptoNode is a hardware security module designed for resource-constrained IoT devices. It implements AES-256-GCM and ChaCha20-Poly1305 cryptographic algorithms directly in hardware using an FPGA fabric, enabling authenticated encryption with minimal power overhead. The system includes a custom ECDH key exchange protocol.",
    tags: ["FPGA", "Verilog", "Python", "UART", "AES-256", "IoT Security"],
    category: "Security",
    color: "#06b6d4",
    accentColor: "rgba(6, 182, 212, 0.15)",
    github: "https://github.com/iamknight8055",
    demo: undefined,
    featured: true,
    year: "2025",
    metrics: [
      { label: "Encryption Speed", value: "1.2 Gbps" },
      { label: "Power Overhead", value: "<150mW" },
      { label: "Key Generation", value: "<2ms" },
    ],
    features: [
      "AES-256-GCM hardware acceleration",
      "ECDH P-256 key exchange protocol",
      "Hardware True Random Number Generator",
      "Side-channel attack mitigation",
    ],
  },
  {
    id: "spectralens",
    title: "SpectraLens",
    subtitle: "FPGA Real-Time Spectrum Analyzer",
    description:
      "A 1 GHz bandwidth real-time spectrum analyzer implemented on a Xilinx FPGA with custom FFT pipeline and waterfall display.",
    longDescription:
      "SpectraLens is a high-performance spectrum analyzer built on a Xilinx Artix-7 FPGA. It implements a custom 4096-point FFT pipeline with configurable windowing functions (Hann, Blackman, Kaiser) and real-time waterfall display via HDMI output. The system can capture and analyze RF signals up to 1 GHz bandwidth with 10 MHz frequency resolution.",
    tags: ["FPGA", "Verilog", "DSP", "FFT", "Xilinx", "HDMI"],
    category: "Signal Processing",
    color: "#10b981",
    accentColor: "rgba(16, 185, 129, 0.15)",
    github: "https://github.com/iamknight8055",
    demo: undefined,
    featured: false,
    year: "2024",
    metrics: [
      { label: "FFT Size", value: "4096-pt" },
      { label: "Max BW", value: "1 GHz" },
      { label: "Update Rate", value: "60 fps" },
    ],
    features: [
      "Pipelined 4096-point radix-4 FFT",
      "HDMI waterfall display output",
      "Configurable windowing functions",
      "Python control interface",
    ],
  },
  {
    id: "echomap",
    title: "EchoMap",
    subtitle: "Ultrasonic Environment Mapper",
    description:
      "A rotating ultrasonic rangefinder that builds 2D maps of indoor environments in real-time, streamed to a live web dashboard.",
    longDescription:
      "EchoMap is an affordable indoor mapping system using an array of HC-SR04 ultrasonic sensors mounted on a stepper motor-driven turntable. An Arduino Mega orchestrates the sensor sweep while a Raspberry Pi processes the polar coordinate data into occupancy grid maps using a custom ROS2 node. Maps are served live over WebSocket to a React dashboard.",
    tags: ["Arduino", "ROS2", "React", "WebSocket", "Python", "Robotics"],
    category: "Sensing",
    color: "#f59e0b",
    accentColor: "rgba(245, 158, 11, 0.15)",
    github: "https://github.com/iamknight8055",
    demo: undefined,
    featured: false,
    year: "2024",
    metrics: [
      { label: "Angular Resolution", value: "0.9°" },
      { label: "Max Range", value: "4 meters" },
      { label: "Map Update Rate", value: "2 Hz" },
    ],
    features: [
      "360° rotary ultrasonic sweep",
      "Occupancy grid map generation",
      "Live WebSocket map streaming",
      "Web-based visualization dashboard",
    ],
  },
];
