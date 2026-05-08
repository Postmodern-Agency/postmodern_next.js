'use client';

import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';

export default function CinematicPreloader() {
  const [showPreloader, setShowPreloader] = useState(true);
  
  const pathname = usePathname(); 
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pathname !== '/') {
      return; 
    }

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        setShowPreloader(false);
      }
    });

    // 1. Text taucht auf
    tl.to(textRef.current, {
      opacity: 1,
      y: 0, 
      duration: 1.5,
      ease: 'power3.out',
      delay: 0.3
    })
    
    // 2. Licht
    .to(glowRef.current, {
      opacity: 1,
      scale: 1,
      duration: 2.5,
      ease: 'power2.out',
    }, "-=0.8")
    
    // 3. Hold
    .to({}, { duration: 0.6 })
    
    // 4. Verblinzeln
    .to(glowRef.current, {
      scaleY: 0,
      opacity: 0,
      duration: 0.4, 
      ease: 'expo.inOut' 
    })

    // Text weg
    .to(textRef.current, {
      opacity: 0,
      scale: 0.95, 
      duration: 0.4,
      ease: 'power2.out'
    }, "-=0.2")
    
    // 5. NEU: Einfach das Schwarz ausblenden, um das Vollbild-3D-Universum zu zeigen!
    .to(containerRef.current, {
      opacity: 0,
      duration: 1.0,
      ease: 'power2.inOut'
    });

    return () => {
      tl.kill();
      document.body.style.overflow = '';
    };
  }, [pathname, setShowPreloader]); 

  if (pathname !== '/') return null;
  if (!showPreloader) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed top-0 left-0 w-[100vw] h-[100vh] z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative flex items-center justify-center">
        <div 
          ref={glowRef}
          className="absolute w-[80vw] md:w-[450px] h-[40vw] md:h-[180px] bg-white/40 rounded-[50%] blur-[40px] md:blur-[70px] pointer-events-none opacity-0 scale-50 transform-gpu origin-center"
        />
        <div 
          ref={textRef}
          className="relative z-10 text-2xl md:text-4xl font-bold text-white tracking-widest uppercase opacity-0 translate-y-4 origin-center"
        >
          Postmodern
        </div>
      </div>
    </div>
  );
}