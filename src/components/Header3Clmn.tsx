'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// === HIER IST DER FIX ===
// Ganz normaler Import! Kein next/dynamic mehr nötig.
// So ist das Wort "Postmodern" sofort beim ersten Pixel der Seite sichtbar.
import AnimatedHeading from './AnimatedHeading'; 

export default function Header() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('de-DE', {
        timeZone: 'Europe/Berlin', 
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setTime(formatter.format(now));
    };

    updateClock(); 
    const interval = setInterval(updateClock, 1000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full px-6 z-50 text-black font-medium text-xs tracking-tight transition-colors duration-300 ${
        isAboutOpen ? 'bg-[#f4f4f4] h-auto shadow-md' : 'bg-transparent h-[66px]'
      }`}
    >
     <nav className="flex flex-col md:grid md:grid-cols-10 gap-4 md:gap-1 pt-4 leading-tight">
        
        <div className="md:col-span-3 flex flex-col justify-start">
          <Link href="/" className="w-fit group">
            
            
            <AnimatedHeading 
              
            highlightText="Postmodern"
            markerWidth="115%"              // CSS-String statt 0.8!
                   // Eckige Enden (ersetzt markerCap="butt")
            triggerOnLoad={true}           // Im Header soll er ja direkt starten
            delay={0.2} 
            
          
            markerHeight="100%" 
            markerOffsetX="0"             
/>
            
          </Link>

          <span className="text-[#1a1a1a] flex items-center gap-2 mt-[-2px]">
            Germany <span className="w-[70px] font-light text-xs">{time || '...'}</span>
          </span>
        </div>

        {/* --- MAIN MENU --- */}
        <ul className="md:col-start-5 md:col-span-2 flex flex-row md:flex-col gap-4 md:gap-0 justify-start md:items-end md:text-right">
          <li><Link href="/creatives" className="hover:opacity-50 transition-opacity">Creatives</Link></li>
          <li><Link href="/services" className="hover:opacity-50 transition-opacity">Services</Link></li>
          
          <li className="flex gap-2 items-center justify-end w-full">
            {isAboutOpen && (
              <button 
                onClick={() => setIsAboutOpen(false)} 
                className="text-gray-500 hover:opacity-50 transition-opacity"
              >
                (Close)
              </button>
            )}
            
            <button 
              onClick={() => setIsAboutOpen(true)} 
              className="hover:opacity-50 transition-opacity"
            >
              About
            </button>
          </li>

        </ul>

        {/* --- SOCIAL / CONTACT --- */}
        <ul className="flex flex-row md:flex-col gap-4 md:gap-0 justify-start md:text-right md:col-start-10 md:col-span-1">
          <li><Link href="#" className="hover:opacity-50 transition-opacity">Instagram</Link></li>
          <li><Link href="#" className="hover:opacity-50 transition-opacity">Contact</Link></li>
        </ul>
      </nav>

      {/* === ABOUT MENÜ === */}
      {isAboutOpen && (
        <main className="w-full bg-[#f4f4f4] border-b border-black p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-[22px]">
          
          {/* Spalte 1: Beschreibung */}
          <div className="flex flex-col gap-4 text-sm leading-relaxed">
            <p>
              POSTMODERN IS A HAMBURG BASED CREATIVE OFFICE,<br/>
              CO-founded by Elias Don Andollini.
            </p>
            <p>
              Lorem ipsum dolor. Lorem ipsum dolor.
            </p>
          </div>

          {/* Spalte 2: Adresse & Kontakt */}
          <div className="flex flex-col gap-8 text-sm">
            <div>
              <p className="font-bold mb-2">POSTMODERN</p>
              <p className="text-gray-600">
                HOUSE OF/FOR CREATIVES <br />
                HAMBURG (HH)
              </p>
            </div>
            
            <div className="flex flex-col gap-2">
              <a href="mailto:hi@postmodern.de" className="hover:opacity-50 transition-opacity w-fit">hi@postmodern.de</a>
              <a href="#" target="_blank" rel="noreferrer" className="hover:opacity-50 transition-opacity w-fit">IG</a>
            </div>
          </div>

          {/* Spalte 3: Credits & Logo */}
          <div className="flex flex-col justify-between items-start md:items-end text-sm">
            <div className="text-left md:text-right text-gray-500">
              <p>© 2026 postmodern</p>
              <p>designed by</p>
            </div>
            
            <div className="relative w-full max-w-[200px] h-[30px] mt-8 md:mt-0 opacity-80">
              <Image 
                src="/images/Manyforms_Wordmark_Embossed.png" 
                alt="POSTMODERN"
                fill
                className="object-contain object-left md:object-right"
              />
            </div>
          </div>

        </main>
      )}
    </header>
  );
}