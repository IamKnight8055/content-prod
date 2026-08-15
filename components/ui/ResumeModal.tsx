'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={backdropRef}
          id="resume-modal-backdrop"
          onClick={handleBackdropClick}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            id="resume-modal-panel"
            className="relative w-full max-w-4xl h-[90vh] rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: 'linear-gradient(135deg, rgba(24,24,27,0.98) 0%, rgba(15,15,20,0.98) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 25px 80px rgba(0,0,0,0.7)',
            }}
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 24 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 flex-shrink-0"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="flex items-center gap-3">
                {/* PDF icon */}
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)' }}
                >
                  PDF
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Pranjal Krishnanand — Resume</p>
                  <p className="text-xs text-zinc-500">Updated Aug 2026</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Download button */}
                <a
                  id="resume-modal-download"
                  href="/resume.pdf"
                  download="Pranjal_Krishnanand_Resume.pdf"
                  className="flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-full text-white transition-all duration-200"
                  style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' }}
                  aria-label="Download resume PDF"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download
                </a>

                {/* Close button */}
                <button
                  id="resume-modal-close"
                  onClick={onClose}
                  aria-label="Close resume viewer"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white transition-colors duration-200"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 overflow-hidden bg-zinc-950">
              <iframe
                id="resume-modal-iframe"
                src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=1"
                title="Pranjal Krishnanand Resume"
                className="w-full h-full border-0"
                style={{ display: 'block' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
