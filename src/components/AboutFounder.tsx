'use client';

import React from 'react';
import Image from 'next/image';

export default function AboutFounder() {
  return (
    <section className="w-full mx-auto px-6 py-24 md:py-32 text-black">
      
      {/* Das Editorial Grid: 
        12 Spalten auf Desktop. Wir lassen bewusst Spalten leer, 
        um diesen hochwertigen, asymmetrischen Magazin-Look zu erzeugen. 
      */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
        
        {/* === 1. BILD BEREICH === */}
        {/* Nimmt auf Mobile die volle Breite, auf Desktop die Spalten 2 bis 6 ein */}
        <div className="md:col-start-3 md:col-span-4">
          {/* aspect-[3/4] erzwingt ein edles Hochformat, egal welches Bild du hochlädst */}
          <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-200">
            <Image 
              src="/images/about_kk.jpg" // Hier den Pfad zu deinem Bild anpassen
              alt="Kelly K"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* === 2. TEXT BEREICH === */}
        {/* Startet auf Desktop erst in Spalte 8 und geht bis 11 (lässt Spalte 7 als Abstandhalter leer) */}
        <div className="md:col-start-8 md:col-span-4 flex flex-col justify-center pt-8 md:pt-16">
          
          
          {/* Titel */}
          <h3 className="text-2xl md:text-3xl font-medium mb-8">
            The founder
          </h3>
          
          {/* Beschreibungstext */}
          <div className="flex flex-col gap-6 text-xs md:text-xs leading-relaxed">
            <p>
              Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor.
              Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor.
              Lorem ipsum dolor. Lorem ipsum dolor.
            </p>
            <p>
              Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor.
              Lorem ipsum dolor. Lorem ipsum dolor.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}