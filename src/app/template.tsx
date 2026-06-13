'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePathname } from 'next/navigation'; // 1. Hook importieren

export default function Template({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname(); // 2. Aktuelle URL auslesen

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // gsap.fromTo erzwingt den unsichtbaren Startpunkt, 
      // selbst wenn die Seite aus dem Browser-Cache geladen wird!
      gsap.fromTo(containerRef.current, 
        { 
          opacity: 0, 
          y: 30 
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: 'expo.out',
          delay: 0.15,
          clearProps: 'all'
        }
      );

    });

    return () => ctx.revert();
  }, [pathname]); // 3. WICHTIG: Hier steht jetzt "pathname"! 
                  // Dadurch feuert die Animation JEDES MAL, wenn sich die URL ändert.

  return (
    <div ref={containerRef} style={{ opacity: 0 }} className="w-full min-h-screen">
      {children}
    </div>
  );
}