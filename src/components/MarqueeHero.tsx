'use client';

import React from 'react';
import AnimatedHeading from './AnimatedHeading'; 

const MarqueeContent = () => (
  <div className="flex gap-16 pr-16 items-center">
    <span className="text-[32vw] md:text-[18vw] lg:text-[24vw] font-black leading-none text-[#f1f1f0]">POST</span>
    <span className="text-[32vw] md:text-[18vw] lg:text-[24vw] font-black leading-none text-[#f1f1f0]">WORK</span>
    <span className="text-[32vw] md:text-[18vw] lg:text-[24vw] font-black leading-none text-[#f1f1f0]">MODERN</span>
    <span className="text-[32vw] md:text-[18vw] lg:text-[24vw] font-black leading-none text-[#f1f1f0]">RESULTS</span>
  </div>
);

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen text-[#2a3e79] bg-[#fff] overflow-hidden flex flex-col justify-end pb-18 md:pb-32">
      
      {/* === 1. DER HINTERGRUND-MARQUEE === */}
      <div className="absolute top-[10%] left-0 w-full overflow-hidden opacity-100 pointer-events-none select-none z-0">
        <div className="animate-marquee">
          {/* Block 1 */}
          <MarqueeContent />
          
          {/* Block 2 */}
          <div aria-hidden="true" className="flex">
            <MarqueeContent />
          </div>
        </div>
      </div>

      {/* === 2. DER VORDERGRUND-INHALT === */}
      <div className="container mx-auto px-6 relative z-10 grid grid-cols-12 gap-[6px] items-end">
        
        {/* Leere linke Spalte */}
        <div className="hidden md:block md:col-span-6"></div>
        
        {/* Haupt-Textblock */}
        <div className="col-span-12 md:col-span-6">
          <h1 className="text-5xl md:text-5xl lg:text-6xl xl:text-6xl font-bold leading-none">
            <span className="block">We create content that turns into results.</span>
            
            {/* === HIER IST DER FIX === */}
            {/* Alle alten Größen-Props entfernt. Farbe als RGBA-Objekt übergeben (Hex #90d5ff = 144, 213, 255) */}
            <AnimatedHeading 
               className="text-light text-base"
               highlightText="c³"
               postText=" = Concept. Creation. Conversion."
               markerWidth="80%"              // CSS-String statt 0.8!
                   // Eckige Enden (ersetzt markerCap="butt")
               triggerOnLoad={true}           // Im Header soll er ja direkt starten
               delay={0.2}             
/> 
              
            
          </h1>
        </div>
        
      </div>
    </section>
  );
}