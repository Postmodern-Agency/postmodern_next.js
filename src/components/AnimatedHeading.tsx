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
  
  triggerOnLoad?: boolean;      
  delay?: number;               

  markerWidth?: string;         
  markerHeight?: string;        
  markerOffsetX?: string;       
  markerOffsetY?: string;       
  markerRotation?: string;
  
  // === NEU: Die Props für deinen realistischen CSS-Marker ===
  // WICHTIG: Gib die RGB-Werte mit Leerzeichen getrennt ein, z.B. "255 232 62"
  markerColorRGB?: string; 
  markerBgAngle?: string;
  markerSkew?: string;
  markerScale?: string;
}

export default function AnimatedHeading({ 
  preText = "", 
  highlightText, 
  postText = "", 
  className = "",
  as: Component = 'span',
  
  triggerOnLoad = false,        
  delay = 0,
  
  markerWidth = '100%',
  markerHeight = '100%',
  markerOffsetX = '0px',
  markerOffsetY = '0px',
  markerRotation = '0deg',

  // Standardwerte (Das Gelb aus deiner CSS-Referenz)
  markerColorRGB = "255 232 62", 
  markerBgAngle = "50deg",
  markerSkew = "-5deg",
  markerScale = "1.1"
}: AnimatedHighlightProps) {
  
  const containerRef = useRef<HTMLElement>(null);
  const markerRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!markerRef.current) return;

    const startConfig = {
      clipPath: 'inset(0 100% 0 0)', 
    };

    const endConfig: gsap.TweenVars = {
      clipPath: 'inset(0 0% 0 0)', 
      duration: 0.4, 
      delay: delay,
      ease: 'power2.out',
    };

    if (!triggerOnLoad) {
      endConfig.scrollTrigger = {
        trigger: containerRef.current,
        start: 'top 50%', 
        once: true
      };
    }

    gsap.fromTo(markerRef.current, startConfig, endConfig);

  }, { scope: containerRef, dependencies: [delay, triggerOnLoad, markerWidth] });

  // === HIER WIRD DEIN CSS-MARKER GENERIERT ===
  const markerBackground = `
    conic-gradient(at 0 100%, rgb(${markerColorRGB} / 100%) 1% , #fff0 3%) no-repeat 0 0 / auto 120%,
    conic-gradient(from 180deg at 100% 0, #fff0, rgb(${markerColorRGB} / 100%) 1%, #fff0 4%) no-repeat 100% 100% / auto 120%,
    linear-gradient(${markerBgAngle}, rgb(${markerColorRGB} / 60%), rgb(${markerColorRGB} / 20%) 75%, rgb(${markerColorRGB} / 55%)) no-repeat center / auto
  `;

  return (
    <Component ref={containerRef} className={`relative inline-block ${className}`}>
      
      {preText && (
        <span>{preText.endsWith(' ') ? preText.slice(0, -1) + '\u00A0' : preText}</span>
      )}
      
      <span className="relative inline-block whitespace-nowrap">
        
        {/* TEXT SCHICHT (z-0) */}
        <span className="relative z-0 text-current">{highlightText}</span>

        {/* === MARKER SCHICHT === */}
        {/* Wir nutzen jetzt ein span statt SVG, um deine CSS-Styles anzuwenden! */}
        <span 
          ref={markerRef}
          className="absolute z-10 pointer-events-none"
          style={{
            // Positionierung & Größe
            left: markerOffsetX,
            width: markerWidth, 
            height: markerHeight,
            padding: '0 0.1em',
            margin: '0 -0.1em',
            
            // Deine CSS Eigenschaften
            borderRadius: '3px 5px 3px 5px',
            background: markerBackground,
            
            // Zentrierung, Rotation, Skalierung & Skew kombiniert in einem Transform
            top: '50%',
            transform: `translateY(calc(-50% + ${markerOffsetY})) rotate(${markerRotation}) skew(${markerSkew}) scale(${markerScale})`, 
            
            // Startet hart versteckt (für SSR)
            clipPath: 'inset(0 100% 0 0)',
            
            // Der softe Fade-Out Effekt am Ende (ersetzt die SVG Maske elegant durch reines CSS)
            WebkitMaskImage: 'linear-gradient(to right, black 85%, transparent 100%)',
            maskImage: 'linear-gradient(to right, black 85%, transparent 100%)'
          }}
        />
      </span>

      {postText && (
        <span>{postText.startsWith(' ') ? '\u00A0' + postText.slice(1) : postText}</span>
      )}
      
    </Component>
  );
}