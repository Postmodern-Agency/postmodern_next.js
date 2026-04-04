'use client'; // <-- Wichtig, da wir jetzt useState für den Bild-Hover nutzen

import React, { useState } from 'react';

// === DATEN FÜR DIE LISTEN (Ausgelagert für bessere Übersicht) ===
const capabilities = [
  "Brand Strategy", "Brand Positioning", "Messaging", "Naming", "Visual Identity", 
  "Logo Design", "Typography Systems", "Color Systems", "Digital Design", "Web Design", 
  "UI/UX", "Packaging Design", "Product Branding", "Art Direction", "Content Creation", 
  "Print Design", "Editorial Design", "Environmental Design", "Social Media Design", 
  "Communication Design"
];

const clients = [
  { name: "Lou Phelps", img: "/images/cat_wp.jpeg" },
  { name: "Sprout Society", img: "/images/google_account_icon.jpeg" },
  { name: "Heaven Mayhem", img: "/images/cat_wp.jpeg" },
  { name: "Lost in Space", img: "/images/google_account_icon.jpeg" },
  { name: "Who Decides War", img: "/images/cat_wp.jpeg" },
  { name: "Bad Influence", img: "/images/google_account_icon.jpeg" },
  { name: "Basa", img: "/images/cat_wp.jpeg" },
  { name: "ParaNano", img: "/images/google_account_icon.jpeg" },
  { name: "Finn", img: "/images/cat_wp.jpeg" },
  { name: "Free Range", img: "/images/google_account_icon.jpeg" },
  { name: "Openhouse", img: "/images/cat_wp.jpeg" },
  { name: "Acid", img: "/images/google_account_icon.jpeg" },
  { name: "Joon", img: "/images/cat_wp.jpeg" },
  { name: "OGGG", img: "/images/google_account_icon.jpeg" },
  { name: "Scala Computing", img: "/images/cat_wp.jpeg" },
  { name: "NOGUM", img: "/images/google_account_icon.jpeg" },
  { name: "Spicy Dan", img: "/images/cat_wp.jpeg" }
];

const pressLinks = [
  { name: "Awwwards", url: "#" },
  { name: "The Brand Identity", url: "#" },
  { name: "Dieline", url: "#" }
];

export default function Home() {
  // Der State für den Bild-Hover (Startbild ist "Finn" an Index 8)
  const [hoveredIndex, setHoveredIndex] = useState<number>(8);

  return (
    <main>
      {/* ========================================= */}
      {/* 1. DEINE ABOUT SECTION                    */}
      {/* ========================================= */}
      <section className="mt-24 pt-16 flex flex-col gap-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* === BIO === */}
          <div className="col-span-1">
            <h2 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-6">
              Bio
            </h2>
            <div className="text-gray-800 text-base leading-relaxed space-y-4">
              <p>
                Lorem ipsum dolor. Lorem ipsum dolor. Hallo ich bin ein Textblock. 
                Lorem ipsum dolor. Lorem ipsum dolor. Hallo ich bin ein Textblock.
              </p>
              <p>Currently based in Melbourne, Australia.</p>
            </div>
          </div>

          {/* === PERSONAL STORY === */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <h2 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-6">
              Personal Story
            </h2>
            <div className="text-gray-800 text-base leading-relaxed space-y-4">
              <p>
                Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor.
                Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. 
                Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. 
                Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. 
              </p>
              <p>
                Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. 
                Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. 
              </p>
            </div>
          </div>

          {/* === CONNECT === */}
          <div className="col-span-1">
            <h2 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-6">
              Connect
            </h2>
            <div className="text-gray-800 text-base leading-relaxed space-y-4">
              <p>Currently unavailable for work in 2026.</p>
              <p>
                For business inquiries, email me at <br />
                <a 
                  href="mailto:info@mail.de" 
                  className="text-black font-medium hover:text-[#2a3e79] underline underline-offset-4 transition-colors"
                >
                  test@mail.de
                </a>
              </p>
            </div>
          </div>

        </div>
      </section>

<h1 className="text-4xl font-bold uppercase md:mt-[200px] section-spacing h1 h-full">
  HEADACHES WE COVER.
</h1>
      {/* ========================================= */}
      {/* 2. DIE NEUE INFO SECTION                  */}
      {/* ========================================= */}
      <section className="mt-[120px] md:mt-[50px] grid grid-cols-12 gap-[14px]">
        
        {/* === CAPABILITIES === */}
        <section className="col-span-12 md:col-span-3">
          <p className="text-[12px] font-bold text-gray-500 uppercase tracking-widest">Capabilities</p>
          <div className="h-[1px] w-full bg-[#929292] mt-1 mb-2"></div>
          <ul className="flex flex-col gap-1">
            {capabilities.map((cap) => (
              <li key={cap} className="text-lg font-medium text-gray-900">{cap}</li>
            ))}
          </ul>
        </section>

        {/* === CLIENTS === */}
        <section className="col-span-12 md:col-span-3">
          <p className="text-[12px] font-bold text-gray-500 uppercase tracking-widest">Clients</p>
          <div className="h-[1px] w-full bg-[#929292] mt-1 mb-2"></div>
          <ul className="flex flex-col gap-1">
            {clients.map((client, index) => (
              <li 
                key={client.name} 
                onMouseEnter={() => setHoveredIndex(index)} 
                className="text-lg font-medium text-gray-900 cursor-pointer transition-all duration-300 hover:text-[#929292]"
              >
                {client.name}
              </li>
            ))}
          </ul>
          <p className="text-lg font-medium text-gray-900 mt-2">& More</p>
        </section>

      
        {/* === PRESS === */}
        <section className="col-span-12 md:col-span-3">
          <p className="text-[12px] font-bold text-gray-500 uppercase tracking-widest">Press</p>
          <div className="h-[1px] w-full bg-[#929292] mt-1 mb-2"></div>
          <div className="flex flex-col gap-1">
            {pressLinks.map((press) => (
              <a 
                key={press.name}
                href={press.url} 
                target="_blank" 
                rel="noopener noreferrer"
                // 'relative' hinzugefügt, damit die absoluten Klammern wissen, wo der Text ist
                className="relative group text-lg font-medium text-gray-900 cursor-pointer flex items-center hover:text-[#929292] transition-colors duration-300 w-fit"
              >
                {/* LINKE KLAMMER (absolut links neben den Text gesetzt) */}
                <span className="absolute right-full mr-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  [
                </span>
                
                {/* DER LINK TEXT (Bleibt exakt auf der Linie!) */}
                <span>{press.name}</span>
                
                {/* RECHTE KLAMMER (absolut rechts neben den Text gesetzt) */}
                <span className="absolute left-full ml-1 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  ]
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* === DYNAMIC IMAGE GALLERY === */}
        <div className="relative aspect-[4/5] col-span-6 md:col-span-3 md:col-start-11 w-full mt-[18px]">
          <div className="flex flex-col w-full h-full relative overflow-hidden bg-gray-100">
            {clients.map((client, index) => (
              <img 
                key={client.name}
                src={client.img} 
                alt={client.name} 
                className={`w-full absolute top-0 left-0 h-full object-cover transition-opacity duration-500 ease-in-out ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>
        </div>

      </section>

    </main>
  );
}