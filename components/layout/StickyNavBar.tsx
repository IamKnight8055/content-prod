'use client';

import { useEffect, useState } from 'react';

const sections = [
  { id: 'hero',       label: 'Home',       icon: '⬡' },
  { id: 'about',      label: 'About',      icon: '⬡' },
  { id: 'skills',     label: 'Skills',     icon: '⬡' },
  { id: 'projects',   label: 'Projects',   icon: '⬡' },
  { id: 'experience', label: 'Experience', icon: '⬡' },
  { id: 'contact',    label: 'Contact',    icon: '⬡' },
];

export default function StickyNavBar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const ids = sections.map((s) => s.id);
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 220) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className="sticky-nav-bar"
      aria-label="Section navigation"
      role="navigation"
    >
      {/* Vertical line track */}
      <div className="snb-track" aria-hidden="true" />

      <ul className="snb-list" role="list">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          const isHovered = hovered === section.id;

          return (
            <li key={section.id} className="snb-item">
              <button
                id={`snb-${section.id}`}
                onClick={() => scrollTo(section.id)}
                onMouseEnter={() => setHovered(section.id)}
                onMouseLeave={() => setHovered(null)}
                className={`snb-btn${isActive ? ' snb-btn--active' : ''}`}
                aria-label={`Navigate to ${section.label} section`}
                aria-current={isActive ? 'true' : undefined}
              >
                {/* Dot */}
                <span className={`snb-dot${isActive ? ' snb-dot--active' : ''}`} />

                {/* Label (slides in on hover / active) */}
                <span
                  className={`snb-label${isActive || isHovered ? ' snb-label--visible' : ''}`}
                >
                  {section.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
