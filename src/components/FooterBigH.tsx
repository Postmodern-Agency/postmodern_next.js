'use client'; 

import React from 'react';

const Footer: React.FC = () => {
  const word = "Postmodern".split('');

  return (
    <footer className="w-full px-6 py-2 md:py-5 text-[#22468a]">
      
      <div className="w-full max-w-[200rem] mx-auto flex flex-col">
        
        {/* === DER RIESIGE TEXT === */}
        {/* FIX 1: Margin unten komplett entfernt (mb-0) */}
        <div className="w-full mb-0 md:mb-2">
          {/* FIX 2: leading-[0.75] schneidet den unsichtbaren Abstand der großen Schrift ab */}
          <h1 className="flex justify-between w-full text-[13vw] md:text-[14vw] leading-[0.75] font-bold uppercase tracking-tighter m-0 p-0 cursor-default select-none">
            {word.map((char, index) => {
              // === OPTISCHER AUSGLEICH ===
              // Zieht das "P" nach links und das "N" nach rechts, um den unsichtbaren Rahmen der Schriftart auszugleichen.
              // Du kannst die Werte (z.B. 0.04em) anpassen, bis es für deine Schriftart 100% bündig ist.
              let opticalFix = "";
              if (index === 0) opticalFix = "-ml-[0.04em]"; 
              if (index === word.length - 1) opticalFix = "-mr-[0.04em]"; 

              return (
                <span key={index} className={opticalFix}>
                  {char}
                </span>
              );
            })}
          </h1>
        </div>

        {/* === FOOTER BOTTOM === */}
        {/* Durch das pt-4 (Padding Top) hier kannst du jetzt den Abstand millimeternau steuern */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-12 md:gap-4 text-sm font-bold pt-2 md:pt-4">
          
          {/* Copyright */}
          <div className="text-[#22468a]">
            © {new Date().getFullYear()}
          </div> 
          
          {/* Links */}
          <div className="flex flex-col md:flex-row gap-2 md:gap-8">
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-black transition-colors"
            >
              Postmodern Agency
            </a> 
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-black transition-colors"
            >
              Block 1
            </a> 
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-black transition-colors"
            >
              Block 2
            </a>
          </div> 
          
          {/* Adresse */}
          <div className="text-left md:text-right leading-relaxed">
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-black transition-colors"
            >
              Muster Straße 1/<br/>
              11111 Musterstadt
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;