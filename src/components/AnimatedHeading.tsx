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
  
  markerColorRGB?: string; 
  markerBgAngle?: string;
  markerSkew?: string;
  markerScale?: string;

  isActive?: boolean; 
  // === FIX 1: textColor im Interface erlauben ===
  textColor?: string; 
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

  markerColorRGB = "255 232 62", 
  markerBgAngle = "50deg",
  markerSkew = "-5deg",
  markerScale = "1.1",

  isActive = undefined,
  // === FIX 2: textColor als Prop entgegennehmen ===
  textColor = "" 
}: AnimatedHighlightProps) {
  
  const containerRef = useRef<HTMLElement>(null);
  const markerRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!markerRef.current || !containerRef.current) return;

    if (isActive !== undefined) {
      gsap.to(markerRef.current, {
        clipPath: isActive ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)', 
        duration: isActive ? 0.3 : 0.15,
        ease: isActive ? 'power2.out' : 'power1.in',
        overwrite: 'auto' 
      });
      return; 
    }

    const startConfig = { clipPath: 'inset(0 100% 0 0)' };
    const endConfig: gsap.TweenVars = {
      clipPath: 'inset(0 0% 0 0)', 
      duration: 0.4, 
      delay: delay,
      ease: 'power2.out',
      paused: true 
    };

    const anim = gsap.fromTo(markerRef.current, startConfig, endConfig);

    if (!triggerOnLoad) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          anim.play(); 
          observer.disconnect(); 
        }
      }, {
        rootMargin: "-50% 0px -50% 0px"
      });

      observer.observe(containerRef.current);
      return () => observer.disconnect(); 
    } else {
      anim.play(); 
    }

  }, { scope: containerRef, dependencies: [delay, triggerOnLoad, markerWidth, isActive] });

  const markerBackground = `
    conic-gradient(at 0 100%, rgb(${markerColorRGB} / 100%) 1% , #fff0 3%) no-repeat 0 0 / auto 120%,
    conic-gradient(from 180deg at 100% 0, #fff0, rgb(${markerColorRGB} / 100%) 1%, #fff0 4%) no-repeat 100% 100% / auto 120%,
    linear-gradient(${markerBgAngle}, rgb(${markerColorRGB} / 60%), rgb(${markerColorRGB} / 20%) 75%, rgb(${markerColorRGB} / 55%)) no-repeat center / auto
  `;

  return (
    // === FIX 3: textColor (falls übergeben) dem Container hinzufügen, ansonsten bleibt er text-current ===
    <Component ref={containerRef} className={`relative inline-block ${textColor || 'text-current'} ${className}`}>
      {preText && <span>{preText.endsWith(' ') ? preText.slice(0, -1) + '\u00A0' : preText}</span>}
      <span className="relative inline-block whitespace-nowrap">
        {/* Durch das "text-current" hier unten erbt dieser Span die Farbe aus dem Component-Tag darüber */}
        <span className="relative z-0 text-current">{highlightText}</span>
        <span 
          ref={markerRef}
          className="absolute z-10 pointer-events-none"
          style={{
            left: markerOffsetX,
            width: markerWidth, 
            height: markerHeight,
            padding: '0 0.1em',
            margin: '0 -0.1em',
            borderRadius: '3px 5px 3px 5px',
            background: markerBackground,
            top: '50%',
            transform: `translateY(calc(-50% + ${markerOffsetY})) rotate(${markerRotation}) skew(${markerSkew}) scale(${markerScale})`, 
            clipPath: 'inset(0 100% 0 0)',
            WebkitMaskImage: 'linear-gradient(to right, black 85%, transparent 100%)',
            maskImage: 'linear-gradient(to right, black 85%, transparent 100%)'
          }}
        />
      </span>
      {postText && <span>{postText.startsWith(' ') ? '\u00A0' + postText.slice(1) : postText}</span>}
    </Component>
  );
}