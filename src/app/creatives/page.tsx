'use client';
import { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// === FIX 1: Der relative Import ===
// Wir gehen aus 'app/creatives/' zwei Ebenen nach oben ('../../') in den 'lib' Ordner.
// Falls dein lib-Ordner noch weiter oben liegt, mach ein '../../../' daraus!
// Wir importieren hier auch direkt das "Creator" Interface.
import { creatorsData, Creator } from '../../lib/creators';

const columns = [
  { items: [creatorsData[0], creatorsData[1], creatorsData[2]], speed: 1, startOffset: 0 },    
  { items: [creatorsData[3], creatorsData[4], creatorsData[5]], speed: -1.6, startOffset: 400 }, 
  { items: [creatorsData[6], creatorsData[7], creatorsData[8]], speed: 0.8, startOffset: 150 },  
  { items: [creatorsData[9], creatorsData[10], creatorsData[11]], speed: -1.4, startOffset: 600 },
];

const LERP_FACTOR = 0.05;
const LERP_THRESHOLD = 0.01;
const LINE_HEIGHT = 100 / 6;
const WHEEL_MULTIPLIER = 1;
const TOUCH_MULTIPLIER = 2;

export default function SmoothParallaxScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const columnInnerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cycleHeights = useRef<number[]>([]);
  const targetScrollRef = useRef(0);
  const animatedScrollRef = useRef(0);
  const touchStartRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const measureCycles = useCallback(() => {
    columns.forEach((_, i) => {
      const innerEl = columnInnerRefs.current[i];
      if (!innerEl) return;
      const secondSet = innerEl.children[1] as HTMLElement;
      if (secondSet) {
        cycleHeights.current[i] = secondSet.offsetTop;
      }
    });
  }, []);

  const animate = useCallback(function loop() {
    const target = targetScrollRef.current;
    const current = animatedScrollRef.current;
    const distance = Math.abs(target - current);
    
    const next = distance < LERP_THRESHOLD
      ? target
      : current + (target - current) * LERP_FACTOR;

    animatedScrollRef.current = next;

    columns.forEach((col, i) => {
      const innerEl = columnInnerRefs.current[i];
      const cycleH = cycleHeights.current[i];
      if (!innerEl || !cycleH) return;

      const offset = (next * col.speed) + col.startOffset;
      const wrapped = -(((offset % cycleH) + cycleH) % cycleH);

      innerEl.style.transform = `translate3d(0,${wrapped}px,0)`;
    });

    rafRef.current = requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    setTimeout(measureCycles, 100);
    rafRef.current = requestAnimationFrame(animate);

    const observer = new ResizeObserver(measureCycles);
    columnInnerRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [animate, measureCycles]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const { deltaY, deltaMode } = e;
      const multiplier =
        deltaMode === 1 ? LINE_HEIGHT : deltaMode === 2 ? window.innerHeight : 1;
      targetScrollRef.current += deltaY * multiplier * WHEEL_MULTIPLIER;
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.targetTouches?.[0] ?? e.changedTouches?.[0];
      if (!touch) return;
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.targetTouches?.[0] ?? e.changedTouches?.[0];
      if (!touch) return;
      const deltaY = -(touch.clientY - touchStartRef.current.y) * TOUCH_MULTIPLIER;
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
      targetScrollRef.current += deltaY;
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    el.addEventListener('touchstart', handleTouchStart, { passive: false });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // === FIX 2: Strikte Typisierung mit "Creator[]" ===
  // So weiß TypeScript ganz genau, was in colItems drinsteckt.
  const renderSet = (colItems: Creator[], setIndex: number) => (
    <div key={setIndex} className="flex flex-col gap-8 w-full">
      {colItems.map((creator, j) => (
        
        <Link 
          key={`${setIndex}-${j}`} 
          href={`/creatives/${creator.slug}`} 
          className="flex flex-col w-full group cursor-pointer"
        >
          {/* Bild-Container */}
          <div className="relative w-full aspect-[4/5] bg-gray-100 overflow-hidden">
            <Image
              src={creator.src}
              alt={creator.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
          
          {/* Text-Container */}
          <div className="w-full text-left font-sans text-[#22468a] leading-[1] m-0 p-0 mt-1.5 transition-opacity duration-300 group-hover:opacity-60">
            <h2 className="w-full m-0 p-0 uppercase">
              <span className="text-[11px] font-bold">{creator.name}</span>
              <span className="text-[7px] font-normal ml-1 opacity-60">Creator</span>
            </h2>
          </div>
          
        </Link>
        
      ))}
    </div>
  );

  return (
    <main 
      ref={containerRef} 
      className="w-full h-screen bg-white overflow-hidden pt-32 px-6 pb-4 cursor-default"
    >
      
      <style dangerouslySetInnerHTML={{__html: `
        html, body { 
          overflow: hidden !important; 
          background-color: white !important;
          scrollbar-gutter: auto !important; 
        }
      `}} />

      <div className="w-full h-full grid grid-cols-2 md:grid-cols-4 gap-4 items-start relative">
        
        {columns.map((col, i) => (
          <div key={i} className="relative w-full h-[150vh] -top-[25vh] overflow-hidden">
            
            <div 
              ref={(el) => { columnInnerRefs.current[i] = el; }} 
              className="absolute top-0 left-0 w-full flex flex-col gap-8 will-change-transform"
            >
              {renderSet(col.items, 0)}
              {renderSet(col.items, 1)}
              {renderSet(col.items, 2)}
            </div>
            
          </div>
        ))}
        
      </div>
      
    </main>
  );
}