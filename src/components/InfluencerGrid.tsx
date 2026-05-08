'use client';

import React from 'react';
import Image from 'next/image';
import HeadlineSection from './HeadlineSection';
import AnimatedHeading from './AnimatedHeading'; 

// === DATEN ===
const projects = [
  {
    id: 'devin-booker',
    imgSrc: '/images/652770040_18398061811199312_4635558372509135957_n.jpg',
    title: 'Book Projects',
    metadata: [
      { value: 'Devin Booker', label: 'Client' },
      { value: 'Branding', label: 'Categories' },
      { value: 'Various', label: 'Format' }
    ] 
  },
  {
    id: 'bmw-m',
    imgSrc: '/images/657168499_18341097094246402_3273964248574590946_n.jpg',
    title: 'Maybach Vision',
    metadata: [
      { value: 'BMW Group', label: 'Client' },
      { value: 'Campaign', label: 'Categories' },
      { value: 'Digital', label: 'Format' }
    ]
  },
  {
    id: 'avv-euroshop',
    imgSrc: '/images/652770040_18398061811199312_4635558372509135957_n.jpg',
    title: 'Euroshop 2020',
    metadata: [
      { value: 'AVV', label: 'Client' },
      { value: 'Architecture', label: 'Categories' },
      { value: 'Exhibition', label: 'Format' }
    ]
  },
  {
    id: 'kadewe',
    imgSrc: '/images/652770040_18398061811199312_4635558372509135957_n.jpg',
    title: 'KaDeWe',
    metadata: [
      { value: 'KaDeWe Group', label: 'Client' },
      { value: 'Campaign', label: 'Categories' },
      { value: 'Print, Film', label: 'Format' }
    ]
  },
  {
    id: 'casper',
    imgSrc: '/images/652770040_18398061811199312_4635558372509135957_n.jpg',
    title: 'Casper Tour',
    metadata: [
      { value: 'Casper', label: 'Client' },
      { value: 'Digital, Film', label: 'Categories' },
      { value: 'Social', label: 'Format' }
    ]
  },
  {
    id: 'siematic',
    imgSrc: '/images/652770040_18398061811199312_4635558372509135957_n.jpg',
    title: 'SieMatic',
    metadata: [
      { value: 'SieMatic', label: 'Client' },
      { value: 'Branding', label: 'Categories' },
      { value: 'Print', label: 'Format' }
    ]
  }
];

export default function InfluencerGrid() {
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

      {/* === 3-SPALTEN GRID === */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="flex flex-col w-full group"
          >
            
            {/* === BILD CONTAINER === */}
            <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-100 shrink-0">
              <Image 
                src={project.imgSrc} 
                alt={project.title} 
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
              />
            </div>

            {/* === NEUER TEXT CONTAINER (Bündig & Volle Breite) === */}
            {/* mt-3 wurde entfernt, w-full bleibt für exakte Breitenanpassung ans Bild */}
            <div className="w-full text-left font-sans text-black leading-[1.3] m-0 p-0 break-words">
              <p className="inline-block w-full">
                
                {/* 1. Das Projekt (Title) */}
                <span className="text-[11px] font-bold">{project.title}</span>
                <span className="text-[7px] font-normal ml-1 mr-4">Project title</span>
                
                {/* 2. Die dynamischen Metadaten */}
                {project.metadata.map((meta, index) => (
                  <React.Fragment key={index}>
                    <span className="text-[11px] font-bold">{meta.value}</span>
                    <span className="text-[7px] font-normal ml-1 mr-4">{meta.label}</span>
                  </React.Fragment>
                ))}
                
              </p>
            </div>

          </div>
        ))}

      </div>
    </section>
  );
}