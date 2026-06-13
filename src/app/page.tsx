'use client'; 

import React, { useState } from 'react';
import Image from 'next/image'; // === PROFI: Next.js Image Import ===
import AnimatedHeading from "../components/AnimatedHeading";
import ClientGrid from "../components/ClientGrid";
import ProjectList from '../components/ProjectList';
import ImageUniverse from '../components/ImageUniverse';

// === DATEN FÜR DIE LISTEN ===
const capabilities = [
  "Exclusive Artist Management", "E-Mail Consulting", "Schedule Management", "Product Development", "Contracts"
];

const clients = [
  { name: "David.Kxm", img: "/images/652770040_18398061811199312_4635558372509135957_n.jpg" },
  { name: "Nidelle.TG", img: "/images/Nidelle_pma_stamp-frame_member.webp" },
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

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  return (
    <main className="flex flex-col gap-24 md:gap-44 pb-32">

      {/* Das 3D Universum - Scrollt für 400vh und gibt dann den Rest der Seite frei */}
      <ImageUniverse />
      
      <ProjectList />
      <ClientGrid />
      
      {/* ========================================= */}
      {/* DIE INFO SECTION                          */}
      {/* ========================================= */}
      <section className="grid grid-cols-12 gap-[14px] px-6">
        
        {/* Spalte 1: Artist Administration */}
        <section className="col-span-12 md:col-span-3">
          <p className="text-[12px] text-[#2a3e79] font-medium">Artist Administration</p>
          <div className="h-[1px] w-full bg-[#2a3e79] mt-1 mb-2"></div>
          <ul className="flex flex-col text-[16px] leading-[1] font-medium text-[#2a3e79]">
            {capabilities.map((cap) => (
              <li key={cap}>{cap}</li>
            ))}
          </ul>
        </section>

        {/* Spalte 2: Campaign Coordination */}
        <section className="col-span-12 md:col-span-3">
          <p className="text-[12px] text-[#2a3e79] font-medium">Campaign Coordination</p>
          <div className="h-[1px] w-full bg-[#2a3e79] mt-1 mb-2"></div>
          <ul className="flex flex-col text-[16px] leading-[1] font-medium text-[#2a3e79]">
            {campaignC.map((campaign) => (
              <li key={campaign}>{campaign}</li>
            ))}
          </ul>
        </section>

        {/* Spalte 3: Creatives (Mit AnimatedHeading) */}
        <section className="col-span-12 md:col-span-3">
          <p className="text-[12px] text-[#2a3e79] font-medium">Creatives</p>
          <div className="h-[1px] w-full bg-[#2a3e79] mt-1 mb-2"></div>
          <ul className="flex flex-col text-[16px] leading-[1] font-medium text-[#2a3e79]">
            {clients.map((client, index) => (
              <li 
                key={client.name} 
                onMouseEnter={() => handleMouseEnter(index)} 
                onClick={() => handleMouseEnter(index)}
                className="cursor-pointer w-fit"
              >
                <AnimatedHeading 
                  highlightText={client.name}
                  isActive={hoveredIndex === index}
                  markerColorRGB="34 70 138" 
                  markerHeight="60%" 
                  markerWidth="105%"
                  markerOffsetX="-5px"
                  markerRotation="-1deg"
                />
              </li>
            ))}
          </ul>
        </section>

        {/* Spalte 4: BILD-CONTAINER */}
        <div className="relative aspect-[4/5] md:col-span-3 col-span-6 md:col-start-11 w-full mt-[18px]">
          <div className="w-full h-full relative overflow-hidden bg-gray-100">
            {clients.map((client, index) => (
              // === PROFI: Die Next.js Image Komponente ===
              <Image 
                key={client.name}
                src={client.img} 
                alt={`Portrait von ${client.name}`} 
                fill // Passt sich perfekt dem relativen Container an
                sizes="(max-width: 768px) 50vw, 25vw" // Sagt dem Browser, welche Bildgröße er laden soll
                priority={index === 0} // Das erste Bild wird sofort geladen, ohne Delay (sehr gut für SEO!)
                className={`object-cover transition-opacity duration-500 ease-in-out ${
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