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
    id: "iste-volunteer",
    role: "Volunteer",
    organization: "ISTE (Indian Society for Technical Education)",
    type: "club",
    duration: "Aug 2024 – Present",
    year: "2024",
    description:
      "Facilitated core hardware and technical sessions, and spearheaded end-to-end logistics for 2 major workshops, streamlining event operations and seamlessly managing a crowd of 300+ attendees.",
    highlights: [
      "Facilitated core hardware and technical sessions for workshop attendees",
      "Spearheaded end-to-end logistics for 2 major workshops",
      "Managed crowd flow and event operations for 300+ attendees",
    ],
    tech: ["Hardware", "Logistics", "Event Management", "Technical Training"],
    color: "#3b82f6",
  },
  {
    id: "vj-teatro-dp",
    role: "Director of Photography & Core Member",
    organization: "VJ Teatro",
    type: "club",
    duration: "Aug 2024 – Present",
    year: "2024",
    description:
      "Managed event operations and coordination for VJ Teatro during Sintillashunz 2026; currently serving as the Director of Photography for the club, handling cinematography and camera work for upcoming short films and scene recreation projects.",
    highlights: [
      "Managed event operations and coordination during Sintillashunz 2026",
      "Handled cinematography and camera work for upcoming short films",
      "Directed camera work and scene recreation projects for the drama club",
    ],
    tech: ["Cinematography", "Camera Work", "Event Operations", "Coordination"],
    color: "#8b5cf6",
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

export const achievements: Achievement[] = [];

export const stats: { label: string; value: number; suffix: string }[] = [];

export const certifications: { name: string; issuer: string; year: string; color: string }[] = [];
