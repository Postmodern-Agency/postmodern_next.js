import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import HeadlineSection from './HeadlineSection';

// === 1. IMPORT DER ANIMATION ===
import AnimatedUnderline from './AnimatedUnderline';

// === 2. DATEN-ARRAY ===
const clients = [
  {
    id: 'prada',
    name: 'Prada',
    logoUrl: '/images/adidas-18.svg', 
    link: '/projects/prada-galleria',
  },
  {
    id: 'miumiu',
    name: 'Miu Miu',
    logoUrl: '/images/adidas-18.svg',
    link: '/projects/miu-miu-summer-club',
  },
  {
    id: 'mandarin',
    name: 'Mandarin Oriental',
    logoUrl: '/images/adidas-18.svg',
    link: '/projects/mandarin-oriental',
  },
  {
    id: 'jimmy',
    name: 'PSG x Jordan',
    logoUrl: '/images/adidas-18.svg',
    link: '/projects/psg-x-jordan',
  },
  {
    id: 'cho',
    name: 'Jimmy Choo',
    logoUrl: '/images/adidas-18.svg',
    link: '/projects/jimmy-choo',
  },
  {
    id: 'wrangler',
    name: 'Four Seasons',
    logoUrl: '/images/adidas-18.svg',
    link: '/projects/four-seasons',
  },
];

export default function ClientGrid() {
  return (
    // Ich habe 'px-6' und 'max-w-[1400px]' wieder leicht ergänzt, 
    // damit der Text und das Grid auf dem Handy nicht direkt am Bildschirmrand kleben!
    <section className="w-full mx-auto px-6 flex flex-col gap-12 md:gap-20">
      
    
      <HeadlineSection as="h2">
       <AnimatedUnderline 
              highlightText="Trusted" 
              as="span"
              postText=" by," 
              lineColor="#1a1a1a" 
               
              lineThickness="5"       
              lineWidth="w-[105%]"    
              lineLeft="-left-[2.5%]" 
              lineBottom="bottom-[-0.1em]" 
            />
      <br />
                  
                  <span>industry leading brands.</span>
      </HeadlineSection>



      {/* ======================================================== */}
      {/* === 4. CSS GRID FÜR DIE KACHELN                      === */}
      {/* ======================================================== */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 w-full">
        
        {clients.map((client) => {
          
          // Deine angepassten Klassen (ohne Kachel-Opacity-Fade)
          const tileClasses = `
            flex items-center justify-center
            w-full aspect-square
            p-8 md:p-10 lg:p-12
            bg-[#f4f4f4]
            relative
            group
          `;

         // Das Logo mit dem Grayscale-Hover-Effekt
          const LogoImage = (
            <div className="relative flex items-center justify-center 
                            w-[60%] h-[60%] md:w-[70%] md:h-[70%] lg:w-[80%] lg:h-[80%]">
              <Image 
                src={client.logoUrl}
                alt={`${client.name} Logo`}
                fill
                className="object-contain" 
              />
            </div>
          );

          // Render-Logik (Link oder Div)
          return client.link ? (
            <Link key={client.id} href={client.link} className={tileClasses}>
              {LogoImage}
            </Link>
          ) : (
            <div key={client.id} className={tileClasses}>
              {LogoImage}
            </div>
          );
          
        })}

      </div>
      
    </section>
  );
}