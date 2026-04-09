'use client';

import React, { useRef, ElementType } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedHighlightProps {
  preText?: string;      
  highlightText: string; 
  postText?: string;     
  className?: string;     
  as?: ElementType;  
  
  markerColor?: string; // 6-stelliger Hex-Code, z.B. '#ffffaf'
  
  triggerOnLoad?: boolean;      
  delay?: number;
  
  markerWidth?: string;  // Wie breit wird der Marker am Ende? (z.B. '100%', '80%')
  markerOffset?: string; // Wo startet der Marker? (z.B. '0px', '15px', '-5px')
}

export default function AnimatedHighlight({ 
  preText = "", 
  highlightText, 
  postText = "", 
  className = "",
  as: Component = 'span',
  markerColor = '#ffffaf', 
  triggerOnLoad = false,        
  delay = 0,
  markerWidth = '100%',
  markerOffset = '0px'
}: AnimatedHighlightProps) {
  
  const containerRef = useRef<HTMLElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);

  // === CSS-VERLAUF GENERIEREN ===
  const baseColor = markerColor.length === 7 ? markerColor : '#ffffaf';
  const gradientBackground = `
    linear-gradient(
      100deg,
      ${baseColor}00 1%,
      ${baseColor} 2.5%,
      ${baseColor}80 5.7%,
      ${baseColor}1a 93%,
      ${baseColor}b4 95%,
      ${baseColor}00 98%
    ),
    linear-gradient(
      182deg, 
      ${baseColor}00, 
      ${baseColor}4d 8%, 
      ${baseColor}00 15%
    )
  `;

  useGSAP(() => {
    if (!highlightRef.current) return;

    // 1. Zwingender Start-Zustand: Marker ist unsichtbar (0% Breite)
    gsap.set(highlightRef.current, { width: '0%' });

    // 2. Animations-Logik (exakt wie bei der Unterstreichung!)
    const animationConfig: gsap.TweenVars = {
      width: markerWidth, // Wächst auf die gewünschte Breite an
      duration: 0.5,
      delay: delay,
      ease: 'power2.out',
    };

    if (!triggerOnLoad) {
      animationConfig.scrollTrigger = {
        trigger: containerRef.current,
        start: 'top 50%', // Triggert zuverlässig im Viewport
        once: true
      };
    }

    gsap.to(highlightRef.current, animationConfig);

  }, { scope: containerRef, dependencies: [delay, triggerOnLoad, markerWidth] });

  return (
    <Component ref={containerRef} className={`relative inline-block ${className}`}>
      {preText && (
        <span>{preText.endsWith(' ') ? preText.slice(0, -1) + '\u00A0' : preText}</span>
      )}
      
      <span className="inline-block relative">
        {/* === TEXT SCHICHT (Unten, z-0) === */}
        <span className="relative z-0 text-current">{highlightText}</span>

        {/* === MARKER SCHICHT (Oben drauf, z-10) === */}
        <span 
          ref={highlightRef} 
          className="absolute top-0 bottom-0 z-10 pointer-events-none"
          style={{
            left: markerOffset,
            width: '0%', // Start-Zustand für den allerersten Frame
            backgroundImage: gradientBackground,
            backgroundSize: '100% 100%', 
            // Der "Echte-Tinte"-Effekt! 
            // WICHTIG: Funktioniert am besten auf hellem Hintergrund. 
            // Falls deine Seite komplett schwarz ist, kommentiere diese Zeile aus!
            mixBlendMode: 'multiply',
          }}
        />
      </span>

      {postText && (
        <span>{postText.startsWith(' ') ? '\u00A0' + postText.slice(1) : postText}</span>
      )}
    </Component>
  );
}