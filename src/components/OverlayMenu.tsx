'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
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
  }, { scope: containerRef, dependencies: [isOpen] });

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-[#eee] z-50 flex flex-col items-center justify-center -translate-y-full"
    >
      <div className="absolute top-0 w-full h-[66px] px-6 flex items-center">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-2 lg:grid-cols-3 items-center">
          <div></div>
          
          {/* === HIER IST DER NEUE CLOSE BUTTON MIT KLAMMERN === */}
          <div className="hidden lg:flex justify-center">
            <button 
              onClick={onClose}
              className="group relative flex items-center text-gray-900 hover:text-gray-500 transition-colors text-xs font-normal cursor-pointer w-fit"
            >
              {/* LINKE KLAMMER */}
              <span className="absolute right-full mr-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                [
              </span>
              
              {/* TEXT */}
              <span>Close</span>

              {/* RECHTE KLAMMER */}
              <span className="absolute left-full ml-1 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                ]
              </span>
            </button>
          </div>
          
          <div></div>
        </div>
      </div>

      <nav className="flex flex-col gap-2 text-center">
        <Link href="/" onClick={onClose} className="text-black text-base font-normal hover:text-[#2a3e79] transition-colors">
          Home
        </Link>
        <Link href="/work" onClick={onClose} className="text-black text-base font-normal hover:text-[#2a3e79] transition-colors">
          Work
        </Link>
        <Link href="/about" onClick={onClose} className="text-black text-base font-normal hover:text-[#2a3e79] transition-colors">
          About
        </Link>
      </nav>
    </div>
  );
};

export default OverlayMenu;