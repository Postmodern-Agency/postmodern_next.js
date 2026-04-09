import React from 'react';

export default function HeroSection() {
  return (
    <section className="mt-14 md:mt-14 w-full mx-auto mb-44">
      
      {/* Haupt-Container: flex-col für Mobile (Text oben, Bild unten), flex-row für Desktop. */}
      <div className="flex flex-col md:flex-row items-center">
        
        {/* === TEXT CONTAINER LINKS (Desktop: 33.3% Breite, 5% Padding rechts) === */}
        {/* mb-8 md:mb-0 gibt dem Text auf dem Smartphone einen Abstand zum Bild darunter */}
        <div className="flex flex-col w-full md:w-1/3 md:pr-[5%] mb-8 md:mb-0">
          
          {/* Titel */}
          <h1 className="hero-heading text-2xl md:text-[56px] leading-[0.85] font-bold text-black mb-3 md:mb-4 tracking-tighter">
            We create content that turns into results.
          </h1>
          
          {/* Subtitle / Excerpt */}
          <p className="text-base text-gray-600 leading-relaxed font-light">
            A boutique agency focusing on maximizing ROI through cutting-edge production and algorithmic strategy.
          </p>

        </div>

        {/* === BILD CONTAINER RECHTS (Desktop: 66.6% Breite) === */}
        <div className="relative w-full md:w-2/3 aspect-[4/3] md:aspect-[16/9] overflow-hidden bg-gray-100 shrink-0">
          <img 
            src="/images/hero_img.jpg"
            alt="MW.S NY Office" 
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </section>
  );
}