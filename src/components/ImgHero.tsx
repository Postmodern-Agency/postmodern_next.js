'use client';

import React from 'react';
import Image from 'next/image';

export default function HeroSection() {
  return (
    // Der äußere Container entspricht deinem CSS (.page-homeV2 .home-hero)
    // mt-24 sorgt für Abstand zum Header, mb-20 für Abstand zur nächsten Section
    <section className="w-[75%] mx-auto mt-34 flex justify-center">
      
      {/* Das ist die eigentliche Bilder-Box (.home-galleryv2) */}
      {/* aspect-video ist Tailwind's eingebautes 16:9 Format */}
      <div className="relative w-full aspect-video overflow-hidden bg-gray-100">
        
        {/* === DEIN HERO BILD === */}
        <Image 
          // Setze hier dein gewünschtes Hero-Bild ein
          src="/images/652770040_18398061811199312_4635558372509135957_n.jpg" 
          alt="Postmodern Hero Image"
          fill // Das Bild füllt den 16:9 Container perfekt aus
          priority // EXTREM WICHTIG FÜR HERO-BILDER! (Google SEO/Pagespeed)
          sizes="83vw" // Hilft dem Browser, sofort die richtige Bildgröße zu laden
          className="object-cover" 
        />
        
      </div>
      
    </section>
  );
}