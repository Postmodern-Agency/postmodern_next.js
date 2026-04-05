'use client'; // <-- Wichtig, da wir jetzt useState und useRef nutzen

import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// === GSAP ScrollTrigger registrieren (Nur im Browser ausführen) ===
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// === DATEN FÜR DIE LISTEN (Ausgelagert für bessere Übersicht) ===
const capabilities = [
  "Exclusive Artist Management", "E-Mail Consulting", "Schedule Management", "Product Development", "Contracts"
];

const clients = [
  { name: "David.Kxm", img: "/images/652770040_18398061811199312_4635558372509135957_n.jpg" },
  { name: "Nidelle.TG", img: "/images/google_account_icon.jpeg" },
  { name: "EinfachMinh", img: "/images/cat_wp.jpeg" },
  { name: "DollarEuroYen", img: "/images/google_account_icon.jpeg" },
  { name: "KevinCostinha", img: "/images/cat_wp.jpeg" },
  { name: "Kingsonflacko", img: "/images/google_account_icon.jpeg" },
  { name: "Vivienarchive", img: "/images/cat_wp.jpeg" },
  { name: "KellyKaiio", img: "/images/google_account_icon.jpeg" },
  { name: "Joshiiks", img: "/images/cat_wp.jpeg" }
  
];



const campaignC = [
  "Pitches", "Briefings", "Content Production", "Execution", "Payment"
];


export default function Home() {
  // Der State für den Bild-Hover (Startbild ist "Finn" an Index 8)
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  // === REFs FÜR DIE ANIMATION ===
  const containerRef = useRef<HTMLHeadingElement>(null);
  
  // WICHTIG: Das ist jetzt ein SVGPathElement, kein SpanElement mehr!
  const markerRef = useRef<SVGPathElement>(null);

 // === GSAP ANIMATION ===
  useGSAP(() => {
    gsap.to(markerRef.current, {
      strokeDashoffset: 0, // Zieht den unsichtbaren SVG-Strich nach!
      duration: 0.4,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      }
    });
  }, { scope: containerRef });

  return (
    <main>
      {/* ========================================= */}
      {/* 1. DEINE ABOUT SECTION                    */}
      {/* ========================================= */}
      <section className="mt-24 pt-16 flex flex-col gap-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* === BIO === */}
          <div className="col-span-1">
            <h2 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-6">
              Bio
            </h2>
            <div className="text-gray-800 text-base leading-relaxed space-y-4">
              <p>
                Lorem ipsum dolor. Lorem ipsum dolor. Hallo ich bin ein Textblock. 
                Lorem ipsum dolor. Lorem ipsum dolor. Hallo ich bin ein Textblock.
              </p>
              <p>Currently based in Melbourne, Australia.</p>
            </div>
          </div>

          {/* === PERSONAL STORY === */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <h2 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-6">
              Personal Story
            </h2>
            <div className="text-gray-800 text-base leading-relaxed space-y-4">
              <p>
                Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor.
                Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. 
                Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. 
                Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. 
              </p>
              <p>
                Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. 
                Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. 
              </p>
            </div>
          </div>

          {/* === CONNECT === */}
          <div className="col-span-1">
            <h2 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-6">
              Connect
            </h2>
            <div className="text-gray-800 text-base leading-relaxed space-y-4">
              <p>Currently unavailable for work in 2026.</p>
              <p>
                For business inquiries, email me at <br />
                <a 
                  href="mailto:info@mail.de" 
                  className="text-black font-medium hover:text-[#2a3e79] underline underline-offset-4 transition-colors"
                >
                  test@mail.de
                </a>
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================= */}
      {/* DIE ANIMIERTE ÜBERSCHRIFT (Natürlicher SVG-Marker) */}
      {/* ========================================= */}
      <h1 
        ref={containerRef} 
        className="text-2xl md:text-4xl lg:text-4xl font-bold uppercase mt-[100px] md:mt-[200px] section-spacing h1 h-full relative"
      >
        {/* Container für das Wort mit relativem Kontext für den SVG-Pfad */}
        {' '}OUR
        <span className="relative inline-block whitespace-nowrap">
          
          
          {/* TEXT: z-index runter auf z-0 (liegt jetzt dahinter) */}
          <span className="relative z-0 px-1 text-black">AGENCY.</span>
          
         {/* === NATÜRLICHER SVG-MARKER === */}
          <svg 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none" 
            // 1. mix-blend-multiply wurde entfernt!
            // 2. opacity-80 sorgt jetzt dafür, dass der Marker wie ein 
            //    halb-transparenter Aufkleber ÜBER dem schwarzen Text liegt.
            className="absolute top-0 left-[10%] w-[80%] h-full z-10 opacity-60 pointer-events-none"
          >
            <path 
              ref={markerRef}
              d="M 5,80 C 10,75 25,75 35,70 L 65,55 C 75,50 90,50 95,45" 
              stroke="#ccff00" 
              // 3. Den Strich noch etwas dicker gemacht (35 statt 25), 
              // damit er das komplette Wort in der Höhe satt abdeckt.
              strokeWidth="85" 
              strokeLinecap="round" 
              fill="none" 
              style={{
                strokeDasharray: '200', 
                strokeDashoffset: '200' 
              }}
            />
          </svg>
          
        </span>
        
      </h1>

      {/* ========================================= */}
      {/* 2. DIE NEUE INFO SECTION                  */}
      {/* ========================================= */}
      <section className="mt-[50px] md:mt-[50px] grid grid-cols-12 gap-[14px]">
        
        {/* === CAPABILITIES === */}
        <section className="col-span-12 md:col-span-3">
          <p className="text-[11px] font-light text-gray-500 uppercase">Artist Administration</p>
          <div className="h-[1px] w-full bg-[#1a1a1a] mt-1 mb-2"></div>
          <ul className="flex flex-col gap-1">
            {capabilities.map((cap) => (
              <li key={cap} className="text-base md:text-lg font-medium text-gray-900">{cap}</li>
            ))}
          </ul>
        </section>

        <section className="col-span-12 md:col-span-3">
          <p className="text-[11px] font-light text-gray-500 uppercase">Campaign Coordination</p>
          <div className="h-[1px] w-full bg-[#1a1a1a] mt-1 mb-2"></div>
          <ul className="flex flex-col gap-1">
            {campaignC.map((campaign) => (
              <li key={campaign} className="text-base md:text-lg font-medium text-gray-900">{campaign}</li>
            ))}
          </ul>
        </section>

        

        {/* === CLIENTS === */}
        <section className="col-span-12 md:col-span-3">
          <p className="text-[11px] font-light text-gray-500 uppercase">Creatives</p>
          <div className="h-[1px] w-full bg-[#1a1a1a] mt-1 mb-2"></div>
          <ul className="flex flex-col gap-1">
            {clients.map((client, index) => (
              <li 
                key={client.name} 
                onMouseEnter={() => setHoveredIndex(index)} 
                className="text-base md:text-lg font-medium text-gray-900 cursor-pointer transition-all duration-300 hover:text-[#929292]"
              >
                {client.name}
              </li>
            ))}
          </ul>
          
        </section>

      
       

        {/* === DYNAMIC IMAGE GALLERY === */}
        <div className="relative aspect-[4/5] col-span-6 md:col-span-3 md:col-start-11 w-full mt-[18px]">
          <div className="flex flex-col w-full h-full relative overflow-hidden bg-gray-100">
            {clients.map((client, index) => (
              <img 
                key={client.name}
                src={client.img} 
                alt={client.name} 
                className={`w-full absolute top-0 left-0 h-full object-cover transition-opacity duration-500 ease-in-out ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>
        </div>

      {/* HIER SIND DIE WICHTIGEN SCHLIESSENDEN TAGS, DIE WAHRSCHEINLICH FEHLEN: */}
      </section>

    </main>
  );
}