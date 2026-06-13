'use client';

import React from 'react';
import Image from 'next/image'; // Zurück zur normalen Next.js Image Komponente
import HeadlineSection from './HeadlineSection';
import AnimatedHeading from './AnimatedHeading'; 

// === DATEN ===
const projects = [
  {
    id: 'devin-booker',
    imgSrc: '/images/652770040_18398061811199312_4635558372509135957_n.jpg',
    title: 'Project 1',
    metadata: [
      { value: 'Client 1', label: 'Client' },
      { value: 'Branding', label: 'Categories' },
      { value: 'Various', label: 'Format' }
    ] 
  },
  {
    id: 'bmw-m',
    imgSrc: '/images/657168499_18341097094246402_3273964248574590946_n.jpg',
    title: 'Project 2',
    metadata: [
      { value: 'Client 2', label: 'Client' },
      { value: 'Campaign', label: 'Categories' },
      { value: 'Digital', label: 'Format' }
    ]
  },
  {
    id: 'avv-euroshop',
    imgSrc: '/images/652770040_18398061811199312_4635558372509135957_n.jpg',
    title: 'Project 3',
    metadata: [
      { value: 'Client 3', label: 'Client' },
      { value: 'Architecture', label: 'Categories' },
      { value: 'Exhibition', label: 'Format' }
    ]
  },
  {
    id: 'kadewe',
    imgSrc: '/images/652770040_18398061811199312_4635558372509135957_n.jpg',
    title: 'Project 4',
    metadata: [
      { value: 'Client 4', label: 'Client' },
      { value: 'Campaign', label: 'Categories' },
      { value: 'Print, Film', label: 'Format' }
    ]
  },
  {
    id: 'casper',
    imgSrc: '/images/652770040_18398061811199312_4635558372509135957_n.jpg',
    title: 'Project 5',
    metadata: [
      { value: 'Client 5', label: 'Client' },
      { value: 'Digital, Film', label: 'Categories' },
      { value: 'Social', label: 'Format' }
    ]
  },
  {
    id: 'siematic',
    imgSrc: '/images/652770040_18398061811199312_4635558372509135957_n.jpg',
    title: 'Project 6',
    metadata: [
      { value: 'Client 6', label: 'Client' },
      { value: 'Branding', label: 'Categories' },
      { value: 'Print', label: 'Format' }
    ]
  }
];

export default function ProjectList() {
  return (
    <section className="w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-[60px_1fr] lg:grid-cols-[100px_1fr] gap-x-8 gap-y-12 md:gap-y-20 mt-20">

      {/* === ZEILE 1: HEADLINE === */}
      <div className="md:col-start-2">
        <HeadlineSection as="h2">
          <AnimatedHeading 
            highlightText="Influencers"
            postText=" in Europe."
            textColor="text-[#22468a]"
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
          <span className="text-[#22468a]">For fashion, beauty & lifestyle companies.</span>
        </HeadlineSection>
      </div>

      {/* === ZEILE 2: STICKY SIDEBAR === */}
      <aside className="hidden md:block relative w-full h-full md:col-start-1 md:row-start-2">
        <div className="sticky top-32 flex justify-center w-full h-fit">
          <span className="[writing-mode:vertical-rl] -rotate-180 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] text-[#22468a]">
            Selected Work
          </span>
        </div>
      </aside>

      {/* === ZEILE 2: 3-SPALTEN BILDER GRID === */}
      <div className="md:col-start-2 md:row-start-2">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 items-start">
          
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="flex flex-col w-full group cursor-default"
            >
              
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-100 shrink-0">
                
                {/* === WIEDERHERGESTELLT: Native Next.js Image Komponente === */}
                <Image 
                  src={project.imgSrc} 
                  alt={project.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                />

              </div>

              <div className="w-full text-left font-sans text-[#22468a] leading-[1] m-0 p-0 mt-3">
                <p className="w-full">
                  <span className="text-[11px] font-bold">{project.title}</span>
                  <span className="text-[7px] font-normal ml-1 mr-4">Project title</span>
                  
                  {project.metadata.map((meta, idx) => (
                    <React.Fragment key={idx}>
                      <span className="text-[11px] font-bold">{meta.value}</span>
                      <span className="text-[7px] font-normal ml-1 mr-4">{meta.label}</span>
                    </React.Fragment>
                  ))}
                </p>
              </div>

            </div>
          ))}

        </div>
      </div>
      
    </section>
  );
}