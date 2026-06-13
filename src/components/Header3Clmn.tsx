'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { usePathname } from 'next/navigation'; // === NEU: Router Import ===

import AnimatedHeading from './AnimatedHeading'; 

export default function Header() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [time, setTime] = useState<string>('');
  
  // === NEU: Wir holen uns den aktuellen Pfad ===
  const pathname = usePathname();
  
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLElement>(null);

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

  // GSAP Choreographie
  useEffect(() => {
    if (!headerRef.current || !menuRef.current || !contentRef.current) return;

    gsap.killTweensOf([headerRef.current, menuRef.current, contentRef.current]);

    if (isAboutOpen) {
      gsap.to(headerRef.current, { 
        backgroundColor: '#22468a80',       
        backdropFilter: 'blur(30px)',       
        WebkitBackdropFilter: 'blur(30px)', 
        color: '#ffffff',                   
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
        duration: 0.3, 
        ease: 'power2.out' 
      });
      
      gsap.to(menuRef.current, { 
        height: 'auto', 
        duration: 0.6, 
        ease: 'power3.inOut' 
      });
      
      gsap.fromTo(contentRef.current, 
        { opacity: 0, y: 10 }, 
        { opacity: 1, y: 0, duration: 0.4, delay: 0.2, ease: 'power2.out' }
      );

    } else {
      gsap.to(contentRef.current, { 
        opacity: 0, 
        y: -5, 
        duration: 0.2, 
        ease: 'power2.in' 
      });
      
      gsap.to(menuRef.current, { 
        height: 0, 
        duration: 0.5, 
        delay: 0.1, 
        ease: 'power3.inOut' 
      });
      
      gsap.to(headerRef.current, { 
        backgroundColor: 'rgba(244, 244, 244, 0)', 
        backdropFilter: 'blur(0px)',
        WebkitBackdropFilter: 'blur(0px)',
        color: '#000000', 
        boxShadow: '0 0px 0px 0px rgba(0, 0, 0, 0)', 
        duration: 0.4, 
        delay: 0.3, 
        ease: 'power2.inOut' 
      });
    }
  }, [isAboutOpen]);

  // === NEU: Dynamischer Delay (Verzögerung) ===
  // Startseite: 6.2s Preloader-Dauer + 0.2s Puffer = 6.4s
  // Unterseiten: Standard 0.2s
  const highlightDelay = pathname === '/' ? 6.4 : 0.2;

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-700 ease-in-out ${
          isAboutOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsAboutOpen(false)} 
      />

      <header 
        ref={headerRef}
        className="fixed top-0 left-0 w-full px-6 z-50 text-black font-medium text-xs tracking-tight"
      >
        <nav className="flex flex-col md:grid md:grid-cols-10 gap-4 md:gap-1 pt-4 pb-4 leading-tight">
          
          <div className="md:col-span-3 flex flex-col justify-start">
            <Link href="/" className="w-fit group text-[#22468a] text-base md:text-xl font-bold tracking-normal">
              <AnimatedHeading 
                highlightText="Postmodern."
                markerWidth="115%"              
                triggerOnLoad={true}           
                delay={highlightDelay} // === FIX: Hier übergeben wir den dynamischen Wert! ===
                markerHeight="72%" 
                markerOffsetX="0"  
                markerColorRGB="255 232 62"
              />
            </Link>

            <span className="flex items-center gap-2 mt-[-2px] text-[#22468a]">
              Germany <span className="w-[70px] font-light text-xs opacity-100 text-[#22468a]">{time || '...'}</span>
            </span>
          </div>

          <ul className="text-[#22468a] md:col-start-5 md:col-span-2 flex flex-row md:flex-col gap-4 md:gap-0 justify-start md:items-end md:text-right">
            <li><Link href="/creatives" className="hover:opacity-50 transition-opacity">Creatives</Link></li>
            <li><Link href="/services" className="hover:opacity-50 transition-opacity">Services</Link></li>
            
            <li className="flex justify-end w-full">
              <button 
                onClick={() => setIsAboutOpen(!isAboutOpen)} 
                className={`cursor-pointer transition-opacity hover:opacity-50 ${isAboutOpen ? 'opacity-60' : ''}`}
              >
                {isAboutOpen ? '(Close)' : 'About'}
              </button>
            </li>
          </ul>

          <ul className="text-[#22468a] flex flex-row md:flex-col gap-4 md:gap-0 justify-start md:text-right md:col-start-10 md:col-span-1">
            <li><Link href="#" className="hover:opacity-50 transition-opacity">Instagram</Link></li>
            <li><Link href="#" className="hover:opacity-50 transition-opacity">Contact</Link></li>
          </ul>
        </nav>

        <div ref={menuRef} className="w-full h-0 overflow-hidden">
          <div className="pt-2"> 
            <main 
              ref={contentRef} 
              className="w-full border-t border-current/20 p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 opacity-0"
            >
              
              <div className="flex flex-col gap-4 text-sm leading-relaxed">
                <p>
                  POSTMODERN IS A HAMBURG BASED CREATIVE OFFICE,<br/>
                  CO-founded by Elias Don Andollini.
                </p>
                <p>
                  Lorem ipsum dolor. Lorem ipsum dolor.
                </p>
              </div>

              <div className="flex flex-col gap-8 text-sm">
                <div>
                  <p className="font-bold mb-2">POSTMODERN</p>
                  <p className="opacity-70">
                    HOUSE OF/FOR CREATIVES <br />
                    HAMBURG (HH)
                  </p>
                </div>
                
                <div className="flex flex-col gap-2">
                  <a href="mailto:hi@postmodern.de" className="hover:opacity-50 transition-opacity w-fit">hi@postmodern.de</a>
                  <a href="#" target="_blank" rel="noreferrer" className="hover:opacity-50 transition-opacity w-fit">IG</a>
                </div>
              </div>

              <div className="flex flex-col justify-between items-start md:items-end text-sm">
                <div className="text-left md:text-right opacity-60">
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
          </div>

        </div>
      </header>
    </>
  );
}