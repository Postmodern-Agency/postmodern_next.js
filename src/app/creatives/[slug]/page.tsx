import React from 'react';
import Image from 'next/image';
import { creatorsData } from '../../../lib/creators'; 

export default async function CreatorProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  
  const resolvedParams = await params;
  const currentCreator = creatorsData.find((c) => c.slug === resolvedParams.slug);

  if (!currentCreator) {
    return (
      <main className="w-full min-h-screen pt-32 px-6 bg-white flex items-center justify-center">
        <h1 className="text-2xl font-bold uppercase">Creator not found</h1>
      </main>
    );
  }

  return (
    
    <main className="w-full min-h-screen bg-white pb-24 px-6 relative">
      
      {/* === Der CSS Calc-Block === */}
      <style dangerouslySetInnerHTML={{__html: `
        .editorial-layout {
          --pad: 3rem;
          --gap: 1.5rem;
          --cols: 12;
          --cw: min(100vw, 200rem);
          --col-w: calc((var(--cw) - var(--pad) - (var(--gap) * 11)) / var(--cols));
          
          --sticky-top: 8rem;
          padding-top: 8rem;
        }
        
        @media (min-width: 768px) {
          .editorial-layout {
            --img-w: calc((var(--col-w) * 5) + (var(--gap) * 4));
            --img-h: calc(var(--img-w) * 1.33333);
            --sticky-top: calc(100vh - var(--img-h) - 4rem); 
            padding-top: max(8rem, var(--sticky-top));
          }
        }
        
        @media (min-width: 1280px) {
          .editorial-layout {
            --img-w: calc((var(--col-w) * 3) + (var(--gap) * 2));
            --img-h: calc(var(--img-w) * 1.33333);
            --sticky-top: calc(100vh - var(--img-h) - 4rem);
            padding-top: max(8rem, var(--sticky-top));
          }
        }

        .sticky-image-wrapper {
          position: relative;
        }
        
        @media (min-width: 768px) {
          .sticky-image-wrapper {
            position: sticky;
            top: var(--sticky-top);
          }
        }
      `}} />

      {/* Das Haupt-Grid */}
      <div className="editorial-layout grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-20 md:gap-y-0 w-full max-w-[200rem] mx-auto min-h-screen">
        
        {/* === LINKE SEITE (FIXIERT) === */}
        <div className="col-span-1 md:col-span-5 xl:col-span-3">
          
          <div className="sticky-image-wrapper z-10">
            
            <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100">
              <Image
                src={currentCreator.src}
                alt={currentCreator.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover pointer-events-none select-none"
              />
            </div>
            
            {/* Nur noch Role, Name wurde entfernt */}
            <div className="mt-4 flex justify-end uppercase text-[10px] font-sans font-bold text-black leading-none">
              <span className="opacity-40">{currentCreator.role}</span>
            </div>

          </div>

        </div>

        {/* === RECHTE SEITE (SCROLLBAR) === */}
        <div className="col-span-1 md:col-start-7 md:col-end-13 xl:col-start-7 xl:col-end-13 flex flex-col gap-y-20 md:gap-y-20 pb-20">

          {/* Name als H1 */}
          <h1 className="text-4xl md:text-6xl font-bold uppercase leading-none text-black">
            {currentCreator.name}
          </h1>

          {/* Bereich 1: Bio */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
            <span className="text-[#22468a80] uppercase text-[10px]">Bio</span>
            <div className="lg:col-span-4 lg:col-start-1 text-xs md:text-sm text-black/80 leading-[1] flex flex-col gap-6">
              {currentCreator.bio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Bereich 2: Services, Clients, Social */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 text-[10px] md:text-[11px] uppercase font-light leading-[1] text-[#22468a]">
            
            {/* Oben Links: Services */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-black/30 text-[10px]">Services</span>
              <ul className="flex flex-col gap-1">
                {currentCreator.services.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Oben Rechts (und durchgehend): Clients */}
            <div className="flex flex-col gap-4 row-span-2">
              <span className="font-mono text-black/30 text-[10px]">Clients</span>
              <ul className="flex flex-col gap-1">
                {currentCreator.clients.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Unten Links: Social */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-black/30 text-[10px]">Social</span>
              <ul className="flex flex-col gap-1">
                {currentCreator.social.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}