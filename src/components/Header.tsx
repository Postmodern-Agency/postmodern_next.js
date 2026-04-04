'use client';

import React, { useState } from 'react';
import Link from 'next/link'; // <-- 1. Das hier neu importieren!
import OverlayMenu from './OverlayMenu';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="w-full h-[66px] px-6 bg-white border-b border-gray-200 flex items-center">
        <div className="mx-auto w-full grid grid-cols-2 lg:grid-cols-3 items-center">
          
          <div className="flex justify-start">
            {/* 2. Hier Link statt a benutzen */}
            <Link href="/" className="text-xl font-bold text-gray-900 tracking-tight">
              MeinLogo
            </Link>
          </div>

          <div className="hidden lg:flex justify-center">
            <button 
              onClick={() => setIsMenuOpen(true)} 
              className="text-gray-600 hover:text-black transition-colors font-medium cursor-pointer"
            >
              Menu
            </button>
          </div>

          <div className="flex justify-end">
            {/* 3. Auch hier Link statt a benutzen */}
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