'use client';

// === NEU: useId für den Verlauf importiert ===
import React, { useRef, ElementType, useId } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedUnderlineProps {
  preText?: string;      
  highlightText: string; 
  postText?: string;     
  className?: string;     
  as?: ElementType;  
  
  lineColor?: string;         
  lineThickness?: string;     
  lineWidth?: string;         
  lineLeft?: string;          
  lineBottom?: string;        
  
  // === NEU: Trigger-Optionen wie beim Marker ===
  triggerOnLoad?: boolean;      
  delay?: number;               
}

export default function AnimatedUnderline({ 
  preText = "", 
  highlightText, 
  postText = "", 
  className = "",
  as: Component = 'span', 
  
  lineColor = "#2a3e79",
  lineThickness = "4",    
  lineWidth = "w-full",
  lineLeft = "left-0",
  lineBottom = "bottom-[-0.1em]",
  
  triggerOnLoad = false,        
  delay = 0                     
}: AnimatedUnderlineProps) {
  
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  
  // === NEU: Eindeutige ID für den Farbverlauf ===
  const gradientId = useId();

  useGSAP(() => {
    if (!lineRef.current) return;
    
    // 1. Exakte Länge berechnen für nahtlosen Start
    const pathLength = lineRef.current.getTotalLength();

    gsap.set(lineRef.current, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    // 2. Animations-Konfiguration
    const animationConfig: gsap.TweenVars = {
      strokeDashoffset: 0,
      duration: 0.6, // Darf für eine Unterstreichung ruhig einen Tick länger dauern
      delay: delay,
      ease: 'power2.out', // Dynamischeres Easing
    };

    if (!triggerOnLoad) {
      animationConfig.scrollTrigger = {
        trigger: containerRef.current,
        start: 'top 50%', 
      };
    }

    gsap.to(lineRef.current, animationConfig);
  }, { scope: containerRef });

  return (
    <Component 
      ref={containerRef} 
      className={`relative inline-block ${className}`}
    >
      {/* Harte Leerzeichen entfernt für sauberes Wort-Splitting */}
      {preText && <span>{preText}</span>}
      
      <span className="relative inline-block whitespace-nowrap">
        <span className="relative z-10">{highlightText}</span>
        
        <svg 
          viewBox="0 0 100 30" 
          preserveAspectRatio="none" 
          className={`absolute ${lineBottom} ${lineLeft} ${lineWidth} h-[0.4em] z-0 pointer-events-none`}
        >
          {/* === NEU: Der Farbverlauf (Gradient) für den Stift-Lift-Off-Effekt === */}
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              {/* Bis 80% deckend, dann fadet die Tinte aus */}
              <stop offset="90%" stopColor={lineColor} stopOpacity="1" />
              <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
            </linearGradient>
          </defs>

          <path 
            ref={lineRef}
            d="M 2 20 Q 50 30 98 15" 
            stroke={`url(#${gradientId})`} // Verlauf angewendet         
            strokeWidth={lineThickness} 
            strokeLinecap="round" 
            fill="none" 
            style={{
              // Fallback für den ersten Frame beim Neuladen
              strokeDasharray: '150', 
              strokeDashoffset: '150' 
            }}
          />
        </svg>
      </span>

      {postText && <span>{postText}</span>}
    </Component>
  );
}