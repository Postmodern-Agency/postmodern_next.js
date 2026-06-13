'use client'; 

import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    // === FIX: text-[#1a1a1a] hier oben vererbt die Farbe an ALLE Elemente im Footer ===
    <footer className="w-full px-6 py-12 bg-[#22468a] text-[#c6c6c6] border-t border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-sm">
        
        {/* === SPALTE 1: Intro === */}
        <div className="flex flex-col">
          {/* font-medium und Textgröße bleiben, Farbe kommt von oben */}
          <span className="text-lg md:text-xl font-medium tracking-tight">
            Hello, we are Postmodern.
          </span>
        </div>

        {/* === SPALTE 2: Adresse & Kontakt === */}
        <ul className="flex flex-col gap-4">
          <div className="flex flex-col gap-1 mb-4">
            <li className="flex gap-4">
              <span className="font-light min-w-[80px]">[Company]</span>
              <span>Postmodern Agency GmbH</span>
            </li>
            <li className="flex gap-4">
              <span className="font-light min-w-[80px]">[Street]</span>
              <span>Muster Straße 1/</span>
            </li>
            <li className="flex gap-4">
              <span className="font-light min-w-[80px]">[City]</span>
              <span>11111 Musterstadt</span>
            </li>
            <li className="flex gap-4">
              <span className="font-light min-w-[80px]">[Country]</span>
              <span>Germany</span>
            </li>
          </div>
          
          <li className="flex gap-4">
            <span className="font-light min-w-[80px]">[Email]</span>
            <a 
              href="mailto:office@postmodern.com" 
              className="hover:text-gray-400 transition-colors"
            >
              office@postmodern.com
            </a>
          </li>
          <li className="flex gap-4">
            <span className="font-light min-w-[80px]">[Telephone]</span>
            <a 
              href="tel:+49301234567" 
              className="hover:text-gray-400 transition-colors"
            >
              +49 10 010010 0101
            </a>
          </li>
        </ul>

        {/* === SPALTE 3: Links === */}
        <ul className="flex flex-col gap-1">
          <li className="mb-4">
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-gray-400 transition-colors"
            >
              Instagram
            </a>
          </li>
          <li>
            <Link href="#" className="hover:text-gray-400 transition-colors">
              Imprint
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:text-gray-400 transition-colors">
              Online Presence
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:text-gray-400 transition-colors">
              Datenschutz
            </Link>
          </li>
        </ul>

        {/* === SPALTE 4: Back to top & Copyright === */}
        <div className="flex flex-col justify-between h-full">
          <button 
            onClick={scrollToTop} 
            className="text-left hover:text-gray-400 transition-colors cursor-pointer w-fit"
          >
            Back to top ↑
          </button>
          
          <div className="mt-8 lg:mt-0">
            © {new Date().getFullYear()} Postmodern Agency GmbH
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;