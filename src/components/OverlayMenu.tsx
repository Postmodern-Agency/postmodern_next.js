'use client'; // <-- Das ist der entscheidende Teil für Next.js!

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface OverlayMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const OverlayMenu: React.FC<OverlayMenuProps> = ({ isOpen, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isOpen) {
      gsap.to(containerRef.current, {
        y: 0,
        duration: 0.6,
        ease: 'power3.inOut',
      });
    } else {
      gsap.to(containerRef.current, {
        y: '-100%',
        duration: 0.5,
        ease: 'power3.inOut',
      });
    }
  }, [isOpen]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-[#eee] z-50 flex flex-col items-center justify-center -translate-y-full"
    >
      <div className="absolute top-0 w-full h-[66px] px-6 flex items-center">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-2 lg:grid-cols-3 items-center">
          <div></div>
          <div className="hidden lg:flex justify-center">
            <button 
              onClick={onClose}
              className="text-gray-900 hover:text-gray-500 transition-colors font-medium cursor-pointer"
            >
              Close
            </button>
          </div>
          <div></div>
        </div>
      </div>

      <nav className="flex flex-col gap-8 text-center">
        <a href="/" className="text-black text-5xl font-bold hover:text-[#2a3e79] transition-colors">
          Home
        </a>
        <a href="/work" className="text-black text-5xl font-bold hover:text-[#2a3e79] transition-colors">
          Work
        </a>
        <a href="/about" className="text-black text-5xl font-bold hover:text-[#2a3e79] transition-colors">
          About
        </a>
      </nav>
    </div>
  );
};

export default OverlayMenu;