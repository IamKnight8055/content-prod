'use client';

import { useEffect, useRef, useState } from 'react';
import { useMousePosition } from '@/hooks/useHelpers';

export default function CustomCursor() {
  const { x, y } = useMousePosition();
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(false);
  const ringPos = useRef({ x: 0, y: 0 });
  const animFrame = useRef<number>(0);

  useEffect(() => {
    // Smoothly animate the ring following the dot
    const animate = () => {
      ringPos.current.x += (x - ringPos.current.x) * 0.12;
      ringPos.current.y += (y - ringPos.current.y) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }
      animFrame.current = requestAnimationFrame(animate);
    };

    animFrame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame.current);
  }, [x, y]);

  useEffect(() => {
    const handleMouseEnter = () => setHidden(false);
    const handleMouseLeave = () => setHidden(true);

    // Track hover on interactive elements
    const handleElementEnter = () => setHovering(true);
    const handleElementLeave = () => setHovering(false);

    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    const interactives = document.querySelectorAll(
      'a, button, [data-cursor="hover"], input, textarea'
    );
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', handleElementEnter);
      el.addEventListener('mouseleave', handleElementLeave);
    });

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleElementEnter);
        el.removeEventListener('mouseleave', handleElementLeave);
      });
    };
  }, []);

  if (typeof window === 'undefined') return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          left: `${x}px`,
          top: `${y}px`,
          opacity: hidden ? 0 : 1,
          transform: `translate(-50%, -50%) scale(${hovering ? 0.5 : 1})`,
        }}
        aria-hidden="true"
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className={`cursor-ring ${hovering ? 'hovering' : ''}`}
        style={{ opacity: hidden ? 0 : 1 }}
        aria-hidden="true"
      />
    </>
  );
}
