'use client';

import React from 'react';
import Image from 'next/image'; // === NEU: Next.js Image Komponente importiert ===
import HeadlineSection from './HeadlineSection';
import AnimatedHeading from './AnimatedHeading'; 

// === 2. DATEN ===
const projects = [
  {
    id: 'bikini-berlin',
    imgSrc: '/images/652770040_18398061811199312_4635558372509135957_n.jpg',
    type: '[Case study]',
    title: 'Adidas',
    metadata: [] 
  },
  {
    id: 'bmw-m',
    imgSrc: '/images/657168499_18341097094246402_3273964248574590946_n.jpg',
    type: '[Case study]',
    title: 'Maybach',
    metadata: []
  },
  {
    id: 'avv-euroshop',
    imgSrc: '/images/652770040_18398061811199312_4635558372509135957_n.jpg',
    type: '[Case study]',
    title: 'Adidas',
    metadata: [
      { label: '[Year]', value: '2020' },
      { label: '[Client]', value: 'AVV' },
      { label: '[Type]', value: 'Architecture' }
    ]
  },
  {
    id: 'kadewe',
    imgSrc: '/images/652770040_18398061811199312_4635558372509135957_n.jpg',
    type: '[Case study]',
    title: 'Adidas',
    metadata: [
      { label: '[Year]', value: '2020' },
      { label: '[Type]', value: 'Campaign' }
    ]
  },
  {
    id: 'casper',
    imgSrc: '/images/652770040_18398061811199312_4635558372509135957_n.jpg',
    type: '[Case study]',
    title: 'Adidas',
    metadata: [
      { label: '[Year]', value: '2018' },
      { label: '[Client]', value: 'Casper' },
      { label: '[Type]', value: 'Campaign, Digital, Film' }
    ]
  },
  {
    id: 'siematic',
    imgSrc: '/images/652770040_18398061811199312_4635558372509135957_n.jpg',
    type: '[Case study]',
    title: 'Adidas',
    metadata: []
  }
];

export default function References() {
  return (
    <section className="w-full mx-auto px-6 flex flex-col gap-12 md:gap-20">

      <HeadlineSection as="h2">
  <AnimatedHeading 
      
          highlightText="Influencers"
          postText=" in Europe."
          markerColorRGB="255 232 62"
          markerBgAngle="50deg"
          markerRotation="1deg"
          markerScale="1"
          markerSkew="-5deg"
          markerWidth="105%"
          markerHeight="60%"
          markerOffsetX="-5px"
          markerOffsetY="2px"
 
/>
<br />
            
            <span>For fashion, beauty & lifestyle companies.</span>
</HeadlineSection>

      {/* === GRID CONTAINER === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="flex flex-row items-start"
          >
            
            {/* === BILD CONTAINER (60% Breite) === */}
            <div className="relative w-[60%] aspect-[4/5] overflow-hidden bg-gray-100 shrink-0">
              {/* === FIX: Next.js <Image> statt normalem <img>, verhindert ESLint-Fehler === */}
              <Image 
                src={project.imgSrc} 
                alt={project.title} 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* === TEXT CONTAINER (40% Breite) === */}
            <div className="flex flex-col w-[40%] pl-[15px]">
              
              <span className="text-[11px] text-[#2a3e79] font-light mb-1">
                {project.type}
              </span>
              
              <h2 className="text-m md:text-xl leading-tight font-medium text-[#2a3e79] mb-4">
                {project.title}
              </h2>
              
              {project.metadata.length > 0 && (
                <ul className="flex flex-col gap-1 text-[11px] text-[#2a3e79]">
                  {project.metadata.map((meta, index) => (
                    <li key={index} className="flex flex-wrap">
                      <span className="min-w-[70px]">{meta.label}</span>
                      <span className="text-[#2a3e79]">{meta.value}</span>
                    </li>
                  ))}
                </ul>
              )}

            </div>

          </div>
        ))}

      </div>
    </section>
  );
}