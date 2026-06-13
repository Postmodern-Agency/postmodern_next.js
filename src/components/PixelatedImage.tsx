'use client';

import React, { useRef, useEffect, useCallback } from 'react';

// Diskrete Pixel-Schritte für den visuellen Effekt
const PIXEL_STEPS = [40, 20, 10, 5, 2, 1];

interface PixelatedImageProps {
  src: string;
  alt: string;
  width?: number;          
  aspectRatio?: string;
  stepDuration?: number;   
  delay?: number;
  initialPixelSize?: number;
  className?: string;      
}

// === FIX: Hilfsfunktion, die CSS "object-fit: cover" für Canvas simuliert ===
function drawImageCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, w: number, h: number) {
  const imgRatio = img.width / img.height;
  const canvasRatio = w / h;
  let sw, sh, sx, sy;

  if (imgRatio < canvasRatio) {
    // Bild ist schmaler als das Canvas -> Oben & Unten proportional abschneiden
    sw = img.width;
    sh = img.width / canvasRatio;
    sx = 0;
    sy = (img.height - sh) / 2;
  } else {
    // Bild ist breiter als das Canvas -> Links & Rechts proportional abschneiden
    sh = img.height;
    sw = img.height * canvasRatio;
    sy = 0;
    sx = (img.width - sw) / 2;
  }
  
  // Bild perfekt zentriert und ohne Verzerrung zeichnen
  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
}

export function PixelatedImage({
  src,
  alt,
  width = 800, 
  aspectRatio = '4/5',
  stepDuration = 100,
  delay = 100,
  initialPixelSize = 40,
  className = '',
}: PixelatedImageProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const stepTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const delayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentStepRef = useRef<number>(0);
  const isLoadedRef = useRef<boolean>(false);

  const [aspectW, aspectH] = aspectRatio.split('/').map(Number);
  const canvasHeight = Math.round(width * (aspectH / aspectW));

  const drawPixelated = useCallback((pixelSize: number) => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !image || !isLoadedRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // === FIX: Retina (DPR) Skalierungs-Fehler behoben ===
    const dpr = window.devicePixelRatio || 1;
    // displayWidth ist die logische Größe (ohne die DPR-Verdopplung)
    const displayWidth = canvas.width / dpr;
    const displayHeight = canvas.height / dpr;

    ctx.clearRect(0, 0, displayWidth, displayHeight);

    if (pixelSize <= 1) {
      // Finaler Frame: Volle Auflösung
      ctx.imageSmoothingEnabled = true;
      drawImageCover(ctx, image, 0, 0, displayWidth, displayHeight);
      return;
    }

    // Off-screen Canvas für den verpixelten Look
    const scaledWidth = Math.ceil(displayWidth / pixelSize);
    const scaledHeight = Math.ceil(displayHeight / pixelSize);

    const offscreen = document.createElement('canvas');
    offscreen.width = scaledWidth;
    offscreen.height = scaledHeight;

    const offCtx = offscreen.getContext('2d');
    if (!offCtx) return;
    
    // Bild winzig klein zeichnen (mit sauberen object-cover Proportionen)
    drawImageCover(offCtx, image, 0, 0, scaledWidth, scaledHeight);

    // Wieder groß auf das Haupt-Canvas ziehen (ohne Smoothing = Pixeleffekt)
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(offscreen, 0, 0, scaledWidth, scaledHeight, 0, 0, displayWidth, displayHeight);
  }, []);

  const animateStep = useCallback(function performStep() {
    const stepIndex = currentStepRef.current;

    if (stepIndex >= PIXEL_STEPS.length) {
      stepTimeoutRef.current = null;
      return;
    }

    const pixelSize = PIXEL_STEPS[stepIndex];
    drawPixelated(pixelSize);

    currentStepRef.current = stepIndex + 1;

    if (currentStepRef.current < PIXEL_STEPS.length) {
      stepTimeoutRef.current = setTimeout(performStep, stepDuration);
    } else {
      stepTimeoutRef.current = null;
    }
  }, [stepDuration, drawPixelated]);

  const startAnimation = useCallback(() => {
    if (stepTimeoutRef.current !== null) clearTimeout(stepTimeoutRef.current);
    if (delayTimeoutRef.current !== null) clearTimeout(delayTimeoutRef.current);
    
    currentStepRef.current = 0;

    if (delay > 0) {
      delayTimeoutRef.current = setTimeout(() => {
        delayTimeoutRef.current = null;
        animateStep();
      }, delay);
    } else {
      animateStep();
    }
  }, [animateStep, delay]);

  const resetToPixelated = useCallback(() => {
    if (stepTimeoutRef.current !== null) {
      clearTimeout(stepTimeoutRef.current);
      stepTimeoutRef.current = null;
    }
    if (delayTimeoutRef.current !== null) {
      clearTimeout(delayTimeoutRef.current);
      delayTimeoutRef.current = null;
    }
    currentStepRef.current = 0;
    drawPixelated(initialPixelSize);
  }, [initialPixelSize, drawPixelated]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    // Physische Pixel setzen
    canvas.width = width * dpr;
    canvas.height = canvasHeight * dpr;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Logische Koordinaten skalieren
      ctx.scale(dpr, dpr);
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageRef.current = img;
      isLoadedRef.current = true;
      drawPixelated(initialPixelSize);
    };
    img.src = src;

    return () => {
      isLoadedRef.current = false;
    };
  }, [src, width, canvasHeight, initialPixelSize, drawPixelated]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          startAnimation();
        } else {
          resetToPixelated();
        }
      },
      { threshold: 0.4 } 
    );

    observer.observe(canvas);

    return () => {
      observer.disconnect();
      if (stepTimeoutRef.current !== null) clearTimeout(stepTimeoutRef.current);
      if (delayTimeoutRef.current !== null) clearTimeout(delayTimeoutRef.current);
    };
  }, [startAnimation, resetToPixelated]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: '100%',     
        height: '100%',
        display: 'block',
        objectFit: 'cover' 
      }}
      aria-label={alt}
      role="img"
    />
  );
}