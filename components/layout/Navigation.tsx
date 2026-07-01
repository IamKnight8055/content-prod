'use client';

import { useEffect, useRef, useState } from 'react';
import { useScrollProgress } from '@/hooks/useHelpers';

export default function Navigation() {
  const scrollProgress = useScrollProgress();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#research', label: 'Research' },
    { href: '#contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'research', 'achievements', 'contact'];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2px] z-[9998] transition-all duration-150"
        style={{
          width: `${scrollProgress * 100}%`,
          background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4)',
        }}
        aria-hidden="true"
      />

      <header
        className={`fixed top-0 left-0 right-0 z-[9990] transition-all duration-500 ${
          scrolled
            ? 'glass-strong border-b border-white/5 py-4'
            : 'py-6 bg-transparent'
        }`}
      >
        <nav
          className="container-xl px-6 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
            className="font-display font-bold text-lg tracking-tight group"
            id="nav-logo"
            aria-label="Pranjal Krishnanand - Home"
          >
            <span className="gradient-text-blue">PK</span>
            <span className="text-white/20 mx-2 font-light">|</span>
            <span className="text-text-secondary text-sm font-normal hidden sm:inline">
              pranjalkrishnanand.xyz
            </span>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={`nav-link text-sm font-medium transition-colors duration-200 ${
                    activeSection === link.href.replace('#', '')
                      ? 'text-white active'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  id={`nav-link-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="/resume.pdf"
              download
              className="text-sm font-medium px-4 py-2 rounded-full border border-white/10 text-zinc-300 hover:text-white hover:border-blue-500/50 transition-all duration-300"
              id="nav-resume-btn"
            >
              Resume
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
              className="text-sm font-medium px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white transition-all duration-300"
              id="nav-contact-btn"
            >
              Get in Touch
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            id="nav-mobile-menu-btn"
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className={`w-6 h-px bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-px bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-px bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[9980] flex flex-col items-center justify-center transition-all duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(9, 9, 11, 0.97)', backdropFilter: 'blur(20px)' }}
        aria-hidden={!menuOpen}
      >
        <ul className="flex flex-col items-center gap-8" role="list">
          {navLinks.map((link, i) => (
            <li
              key={link.href}
              style={{
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: menuOpen ? 1 : 0,
                transition: `all 0.4s ${i * 0.05}s ease-out`,
              }}
            >
              <a
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="text-3xl font-display font-bold text-zinc-400 hover:text-white transition-colors duration-200"
                id={`mobile-nav-link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li style={{ transform: menuOpen ? 'translateY(0)' : 'translateY(20px)', opacity: menuOpen ? 1 : 0, transition: 'all 0.4s 0.35s ease-out' }}>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
              className="mt-4 text-sm font-medium px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white transition-all duration-300"
              id="mobile-nav-contact-btn"
            >
              Get in Touch
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
