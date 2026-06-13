'use client';
import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';

// === DAS GEDÄCHTNIS ===
// Diese globale Variable merkt sich, ob die Website gerade komplett frisch geladen (F5/URL-Eingabe) wurde.
let isInitialLoad = true;

export default function CinematicPreloader() {
  const pathname = usePathname();
  
  // === DER FIX ===
  // Anstatt useRef nutzen wir die Initialisierungs-Funktion von useState.
  // Das checkt beim Mounten exakt einmal: "Ist das ein frischer Start UND sind wir auf der Startseite?"
  const [showPreloader, setShowPreloader] = useState(() => {
    if (isInitialLoad && pathname === '/') {
      return true; // Preloader anzeigen
    }
    return false;  // Preloader sofort verstecken (z.B. beim Zurück-Navigieren)
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Sobald die Seite geladen ist, steht fest: Jeder weitere Klick ist KEIN frischer Start mehr.
    isInitialLoad = false;

    // Wenn der Preloader laut unserem Check gar nicht laufen soll, beenden wir das hier sofort.
    if (!showPreloader) return;
    if (pathname !== '/') return;

    // === AB HIER: Die ganz normale Preloader-Animation ===
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    window.scrollTo(0, 0);

    const preventScroll = (e: Event) => e.preventDefault();
    const preventKeyScroll = (e: KeyboardEvent) => {
      if (['Space', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown'].includes(e.code)) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('keydown', preventKeyScroll, { passive: false });

    const tl = gsap.timeline({
      onComplete: () => {
        window.removeEventListener('wheel', preventScroll);
        window.removeEventListener('touchmove', preventScroll);
        window.removeEventListener('keydown', preventKeyScroll);
        setShowPreloader(false);
      }
    });

    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: 'power3.out',
      delay: 0.3
    })
    .to(glowRef.current, {
      opacity: 1,
      scale: 1,
      duration: 2.5,
      ease: 'power2.out',
    }, "-=0.8")
    .to({}, { duration: 0.6 })
    .to(glowRef.current, {
      scaleY: 0,
      opacity: 0,
      duration: 0.4,
      ease: 'expo.inOut'
    })
    .to(textRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.4,
      ease: 'power2.out'
    }, "-=0.2")
    .to(containerRef.current, {
      opacity: 0,
      duration: 1.0,
      ease: 'power2.inOut'
    });

    return () => {
      tl.kill();
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventKeyScroll);
    };
  }, [pathname, showPreloader]);

  // Wenn der Status false ist (z.B. Zurück-Navigieren), wird das HTML erst gar nicht gebaut
  if (!showPreloader) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#22468a]"
    >
      <div className="relative flex items-center justify-center">
        <div
          ref={glowRef}
          className="absolute w-[80vw] md:w-[450px] h-[40vw] md:h-[180px] bg-white/40 rounded-[50%] blur-[40px] md:blur-[70px] pointer-events-none opacity-0 scale-50 transform-gpu origin-center"
        />
        <div
          ref={textRef}
          className="relative z-10 text-2xl md:text-4xl font-bold tracking-[-0.02em] text-white uppercase opacity-0 translate-y-4 origin-center"
        >
          Postmodern
        </div>
      </div>
    </div>
  );
}