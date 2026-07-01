'use client';

import Link from 'next/link';

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/iamknight8055', icon: 'GH' },
  { label: 'LinkedIn', href: '#', icon: 'LI' },
  { label: 'Twitter', href: '#', icon: 'TW' },
  { label: 'Email', href: 'mailto:pranjal@example.com', icon: '@' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 py-12 px-6" role="contentinfo">
      <div className="container-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-display font-bold text-xl gradient-text-blue">
              Pranjal Krishnanand
            </span>
            <p className="text-sm text-zinc-500">
              Electronics &amp; Communication Engineering Student
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4" role="list" aria-label="Social links">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-xs font-bold text-zinc-400 hover:text-white hover:border-blue-500/50 transition-all duration-300"
                aria-label={link.label}
                id={`footer-social-${link.label.toLowerCase()}`}
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs text-zinc-600" aria-label="Copyright">
            © {year} Pranjal Krishnanand. Crafted with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
