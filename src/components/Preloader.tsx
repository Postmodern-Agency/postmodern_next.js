'use client';

import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import AnimatedHeading from './AnimatedHeading';

export default function Preloader() {
  const [showPreloader, setShowPreloader] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Keine Überprüfung mehr nötig! Der Preloader startet immer, 
    // wenn diese Komponente durch einen Refresh frisch geladen wird.
    
    let preloaderAnimation: gsap.core.Tween;

    if (containerRef.current) {
      preloaderAnimation = gsap.to(containerRef.current, {
        yPercent: -100,
        duration: 1.2,
        delay: 2.5,
        ease: 'power4.inOut',
        onComplete: () => {
          // Animation fertig -> Komponente deaktiviert sich selbst
          setShowPreloader(false);
        }
      });
    }

    return () => {
      if (preloaderAnimation) preloaderAnimation.kill();
    };
  }, []);

  if (!showPreloader) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#d5d5d5] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="text-4xl md:text-6xl font-light text-black tracking-tight">
        <AnimatedHeading 
          highlightText="Postmodern"
          markerWidth="115%"              
          triggerOnLoad={true}           
          delay={0.5} 
          markerHeight="100%" 
          markerOffsetX="0" 
        />
      </div>
    </div>
  );
}