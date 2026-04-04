'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import OverlayMenu from './OverlayMenu';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="w-full h-[66px] px-6 bg-white border-b border-gray-200 flex items-center">
        <div className="mx-auto w-full grid grid-cols-2 lg:grid-cols-3 items-center">
          
          <div className="flex justify-start">
            <Link href="/" className="text-xl font-bold text-gray-900 tracking-tight">
              MeinLogo
            </Link>
          </div>

          {/* === HIER IST DER NEUE MENU BUTTON MIT KLAMMERN === */}
          <div className="hidden lg:flex justify-center">
            <button 
              onClick={() => setIsMenuOpen(true)} 
              // 'group', 'relative' und 'flex items-center' hinzugefügt
              className="group relative flex items-center text-gray-600 hover:text-black transition-colors text-xs font-normal cursor-pointer w-fit"
            >
              {/* LINKE KLAMMER */}
              <span className="absolute right-full mr-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                [
              </span>
              
              {/* TEXT */}
              <span>Menu</span>

              {/* RECHTE KLAMMER */}
              <span className="absolute left-full ml-1 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                ]
              </span>
            </button>
          </div>

          <div className="flex justify-end">
            <Link 
              href="/contact" 
              className="px-5 py-2 bg-black text-white text-sm font-semibold rounded-md hover:bg-gray-800 transition-colors"
            >
              Contact
            </Link>
          </div>

        </div>
      </header>

      <OverlayMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />
    </>
  );
};

export default Header;