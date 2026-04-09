'use client'; 

import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import References from "../components/References";
import AnimatedHeading from "../components/AnimatedHeading";
import HomeHero from "../components/HomeHero";
import HeadlineSection from "../components/HeadlineSection";
import ClientGrid from "../components/ClientGrid";
import MarqueeHero from "../components/MarqueeHero"
import AboutFounder from "../components/AboutFounder"


// === GSAP ScrollTrigger registrieren ===
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// === DATEN FÜR DIE LISTEN ===
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
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  
  // Refs für die SVG-Marker und den aktuell aktiven Index
  const clientMarkerRefs = useRef<(SVGPathElement | null)[]>([]);
  // Wir nutzen useRef für den aktiven Index, um React-Rerenders für GSAP zu vermeiden
  const activeIndex = useRef<number>(0); 

  // === 1. INITIALISIERUNG (David.Kxm sofort markieren) ===
  useGSAP(() => {
    // Setzt den allerersten Marker direkt auf sichtbar, ohne Animation (gsap.set)
    if (clientMarkerRefs.current[0]) {
      gsap.set(clientMarkerRefs.current[0], { strokeDashoffset: 0 });
    }
  });

  // === 2. DIE HOVER-LOGIK ===
  const handleMouseEnter = (index: number) => {
    // Wenn wir über das bereits markierte Element fahren, mach gar nichts
    if (activeIndex.current === index) return;

    // A) Den ALTEN Marker blitzschnell wegradieren
    if (clientMarkerRefs.current[activeIndex.current]) {
      gsap.to(clientMarkerRefs.current[activeIndex.current], {
        strokeDashoffset: 200, 
        duration: 0.15, 
        ease: 'power1.in', 
        overwrite: 'auto',
      });
    }

    // B) Den NEUEN Marker weich zeichnen
    if (clientMarkerRefs.current[index]) {
      gsap.to(clientMarkerRefs.current[index], {
        strokeDashoffset: 0, 
        duration: 0.3, 
        ease: 'power2.out',
        overwrite: 'auto', 
      });
    }

    // C) Den neuen Index merken und das Bild rechts aktualisieren
    activeIndex.current = index;
    setHoveredIndex(index);
  };

  return (
    <main className="flex flex-col gap-24 md:gap-44 pb-32">

      <MarqueeHero />
      <References />
      
      <ClientGrid />
      
      {/* ========================================= */}
      {/* DIE ANIMIERTE ÜBERSCHRIFT                 */}
      {/* ========================================= */}
     

      {/* ========================================= */}
      {/* 2. DIE INFO SECTION                       */}
      {/* ========================================= */}
      <section className="grid grid-cols-12 gap-[14px] px-6">
        
        <section className="col-span-12 md:col-span-3">
          <p className="text-[11px] text-[#1a1a1a] font-medium">Artist Administration</p>
          <div className="h-[1px] w-full bg-[#1a1a1a] mt-1 mb-2"></div>
          <ul className="flex flex-col gap-1">
            {capabilities.map((cap) => (
              <li key={cap} className="text-base md:text-lg font-medium text-gray-900">{cap}</li>
            ))}
          </ul>
        </section>

        <section className="col-span-12 md:col-span-3">
          <p className="text-[11px] text-[#1a1a1a] font-medium">Campaign Coordination</p>
          <div className="h-[1px] w-full bg-[#1a1a1a] mt-1 mb-2"></div>
          <ul className="flex flex-col gap-1">
            {campaignC.map((campaign) => (
              <li key={campaign} className="text-base md:text-lg font-medium text-gray-900">{campaign}</li>
            ))}
          </ul>
        </section>

        <section className="col-span-12 md:col-span-3">
          <p className="text-[11px] text-[#1a1a1a] font-medium">Creatives</p>
          <div className="h-[1px] w-full bg-[#1a1a1a] mt-1 mb-2"></div>
          <ul className="flex flex-col gap-1">
            {clients.map((client, index) => (
              <li 
                key={client.name} 
                // === HIER WIRD NUR NOCH MOUSE-ENTER AUFGERUFEN ===
                onMouseEnter={() => handleMouseEnter(index)} 
                // Auch den Click fangen wir damit ab, falls jemand auf dem Handy drauftippt
                onClick={() => handleMouseEnter(index)}
                className="text-base md:text-lg font-medium cursor-pointer w-fit"
              >
                <span className="relative inline-block whitespace-nowrap px-1">
                  <span className="relative z-0 text-black">{client.name}</span>
                  <svg 
                    viewBox="0 0 100 100" 
                    preserveAspectRatio="none" 
                    className="absolute top-0 left-[-2%] w-[105%] h-full z-10 opacity-60 pointer-events-none"
                  >
                    <path 
                      ref={(el) => {
                        if (el) clientMarkerRefs.current[index] = el;
                      }}
                      d="M 5,80 C 10,75 25,75 35,70 L 65,55 C 75,50 90,50 95,45" 
                      stroke="#90d5ff" 
                      strokeWidth="35" 
                      strokeLinecap="round" 
                      fill="none" 
                      style={{ strokeDasharray: '200', strokeDashoffset: '200' }}
                    />
                  </svg>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* BILD-CONTAINER */}
        <div className="relative aspect-[4/5] md:col-span-3 col-span-6 md:col-start-11 w-full mt-[18px]">
          <div className="flex flex-col w-full h-full relative overflow-hidden bg-gray-100">
            {clients.map((client, index) => (
              <img 
                key={client.name}
                src={client.img} 
                alt={client.name} 
                className={`w-full absolute top-0 left-0 h-full object-cover transition-opacity duration-500 ease-in-out ${
                  hoveredIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              />
            ))}
          </div>
        </div>

      </section>
      
      
      
      
    </main>
  );
}