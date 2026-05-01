'use client'; 

// === 1. ElementType importieren ===
import React, { ReactNode, ElementType } from 'react';

interface HeadlineSectionProps {
  children: ReactNode;
  // === 2. Das neue Prop für die SEO-Ebene ===
  as?: ElementType; 
}

export default function HeadlineSection({ 
  children, 
  // === 3. Standardmäßig ist es eine h2 (weil man meist nur eine h1 pro Seite hat) ===
  as: Component = 'h2' 
}: HeadlineSectionProps) {
  
  return (
    <div className="px-[30px] w-full md:w-[66%] max-w-[1000px]">
      
      {/* === 4. HIER IST DIE MAGIE === */}
      {/* Es rendert jetzt dynamisch als <h1>, <h2> oder <h3>, behält aber immer denselben Look! */}
      <Component className="text-3xl sm:text-3xl md:text-4xl leading-[1.2] font-light text-[#2a3e79] tracking-tight">
        
        <span className="block md:ml-[6.9rem]">
          {children}
        </span>

      </Component>

    </div>
  );
}