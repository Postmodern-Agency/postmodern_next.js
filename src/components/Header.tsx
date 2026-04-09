'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OverlayMenu from './OverlayMenu';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // States für die Scroll-Logik
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Wenn wir weiter als 50px nach unten gescrollt haben -> Header verstecken
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        // Beim Hochscrollen -> Header anzeigen
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    // Event-Listener hinzufügen
    window.addEventListener('scroll', handleScroll);
    
    // Aufräumen, wenn die Komponente entfernt wird
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* HIER PASSIERT DIE MAGIE:
        1. 'fixed top-0 z-50' -> Fixiert den Header immer oben über allem.
        2. 'transition-transform duration-300' -> Weiche Animation beim Verstecken.
        3. 'translate-y-0' / '-translate-y-full' -> Schiebt ihn rein oder raus.
        4. 'mix-blend-difference text-white' -> Ändert die Farbe basierend auf dem Hintergrund!
      */}
      <header 
        className={`fixed top-0 left-0 w-full h-[66px] px-6 z-50 flex items-center transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } mix-blend-difference text-white`}
      >
        <div className="mx-auto w-full grid grid-cols-2 lg:grid-cols-3 items-center">
          
          <div className="flex justify-start">
            {/* WICHTIG: Keine eigenen Textfarben (wie text-gray-900) vergeben! Das regelt jetzt text-white vom Header */}
            <Link href="/" className="text-m uppercase font-normal tracking-tight">
              Postmodern
            </Link>
          </div>

          <div className="hidden lg:flex justify-center">
            <button 
              onClick={() => setIsMenuOpen(true)} 
              className="group relative flex items-center text-xs font-normal cursor-pointer w-fit"
            >
              <span className="absolute right-full mr-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                [
              </span>
              <span>Menu</span>
              <span className="absolute left-full ml-1 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                ]
              </span>
            </button>
          </div>

          <div className="flex justify-end">
            {/* Ich habe den fetten schwarzen Hintergrund entfernt, da "mix-blend-difference" sonst einen riesigen weißen Block daraus macht. Ein feiner Rahmen sieht edler aus! */}
            <Link 
              href="/contact" 
              className="px-5 py-2 border border-white text-sm font-semibold rounded-md hover:bg-white hover:text-black transition-colors"
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