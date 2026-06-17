'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const IMAGE_PATHS = [
  '/images/universe/491451305_18492991288041551_6902911927720311447_n.jpg',
  '/images/universe/508707284_18361762234144106_5988798950698380931_n.jpg',
  '/images/universe/522865973_18511742740041551_4183107987768122259_n.jpg',
  '/images/universe/631949054_18513447736077622_491450810801928550_n.jpg',
  '/images/universe/652764890_18398061847199312_2635696673912322817_n.jpg',
  '/images/universe/652770040_18398061811199312_4635558372509135957_n.jpg',
  '/images/universe/662473867_18402831874144106_193474917491398322_n.jpg',
];

const ATLAS_COLS = 3;
const ATLAS_ROWS = Math.ceil(IMAGE_PATHS.length / ATLAS_COLS);
const WRAP_LENGTH = 180;

type Particle = {
  x: number;
  y: number;
  startZ: number;
  side: number;
};

async function createAtlasTexture(
  imagePaths: string[],
  slotSize = 512
): Promise<THREE.CanvasTexture> {
  const canvas = document.createElement('canvas');
  canvas.width = ATLAS_COLS * slotSize;
  canvas.height = ATLAS_ROWS * slotSize;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas Context nicht gefunden');

  for (let i = 0; i < imagePaths.length; i++) {
    const col = i % ATLAS_COLS;
    const row = Math.floor(i / ATLAS_COLS);
    await new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => {
        const min = Math.min(img.width, img.height);
        ctx.drawImage(
          img,
          (img.width - min) / 2, (img.height - min) / 2, min, min,
          col * slotSize, row * slotSize, slotSize, slotSize
        );
        resolve();
      };
      img.onerror = () => resolve();
      img.src = imagePaths[i];
    });
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.flipY = false;
  return texture;
}

export default function ShaderUniverse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Mobile-Erkennung
    const isMobile = window.innerWidth < 768;
    const TOTAL_PARTICLES = isMobile ? 20 : 40;
    const ATLAS_SLOT_SIZE = isMobile ? 256 : 512;
    const MAX_PIXEL_RATIO = isMobile ? 1 : 2;

    // Scroll-Wert gecacht — kein window.scrollY im Animation-Loop
    let cachedScrollY = window.scrollY;
    const handleScroll = () => { cachedScrollY = window.scrollY; };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 1. SCENE SETUP
    const scene = new THREE.Scene();
    const sizes = { width: window.innerWidth, height: window.innerHeight };
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: !isMobile, // Auf Mobile deaktiviert für bessere Performance
      alpha: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO));

    // 2. GEOMETRY & CLUSTER LOGIK
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(TOTAL_PARTICLES * 3);
    const scales = new Float32Array(TOTAL_PARTICLES);
    const opacities = new Float32Array(TOTAL_PARTICLES);
    const textureIndices = new Float32Array(TOTAL_PARTICLES);

    const particleData: Particle[] = [];
    const clusterSizes: number[] = [];
    let currentCount = 0;

    while (currentCount < TOTAL_PARTICLES) {
      const size = Math.min(
        Math.floor(Math.random() * 3) + 1,
        TOTAL_PARTICLES - currentCount
      );
      clusterSizes.push(size);
      currentCount += size;
    }

    const numClusters = clusterSizes.length;
    const zStep = WRAP_LENGTH / numClusters;
    const wallSequence = [0, 2, 1, 3];

    let pIdx = 0;
    clusterSizes.forEach((size, clusterIdx) => {
      const side = wallSequence[clusterIdx % 4];
      const clusterZ = 25 - clusterIdx * zStep;

      const refZ = 60;
      const vHeight = 2 * refZ * Math.tan(THREE.MathUtils.degToRad(75) / 2);
      const vWidth = vHeight * (sizes.width / sizes.height);

      let baseX = 0, baseY = 0;
      if (side === 0) { baseX = -vWidth * 0.35; baseY = (Math.random() - 0.5) * vHeight * 0.6; }
      else if (side === 1) { baseX = vWidth * 0.35; baseY = (Math.random() - 0.5) * vHeight * 0.6; }
      else if (side === 2) { baseX = (Math.random() - 0.5) * vWidth * 0.6; baseY = vHeight * 0.35; }
      else { baseX = (Math.random() - 0.5) * vWidth * 0.6; baseY = -vHeight * 0.35; }

      for (let i = 0; i < size; i++) {
        const offX = (Math.random() - 0.5) * 6;
        const offY = (Math.random() - 0.5) * 6;
        const offZ = i * 0.5;

        const x = baseX + offX;
        const y = baseY + offY;
        const z = clusterZ - offZ;

        positions[pIdx * 3] = x;
        positions[pIdx * 3 + 1] = y;
        positions[pIdx * 3 + 2] = z;
        scales[pIdx] = 35.0 + Math.random() * 25.0;
        opacities[pIdx] = 0;
        textureIndices[pIdx] = Math.floor(Math.random() * IMAGE_PATHS.length);

        particleData.push({ x, y, startZ: z, side });
        pIdx++;
      }
    });

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1));
    geometry.setAttribute('textureIndex', new THREE.BufferAttribute(textureIndices, 1));

    // 3. SHADER MATERIAL
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTexture: { value: new THREE.Texture() },
        uIntro: { value: 0 },
        atlasCols: { value: ATLAS_COLS },
        atlasRows: { value: ATLAS_ROWS },
      },
      vertexShader: `
        attribute float scale;
        attribute float opacity;
        attribute float textureIndex;
        varying float vOpacity;
        varying float vTextureIndex;
        uniform float uIntro;
        void main() {
          vOpacity = opacity * uIntro;
          vTextureIndex = textureIndex;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = scale * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform float atlasCols;
        uniform float atlasRows;
        varying float vOpacity;
        varying float vTextureIndex;
        void main() {
          vec2 uv = gl_PointCoord;
          float col = mod(vTextureIndex, atlasCols);
          float row = floor(vTextureIndex / atlasCols);
          vec2 atlasUv = vec2(
            (col + uv.x) / atlasCols,
            (row + uv.y) / atlasRows
          );
          vec4 color = texture2D(uTexture, atlasUv);
          gl_FragColor = vec4(color.rgb, color.a * vOpacity);
        }
      `,
    });

    createAtlasTexture(IMAGE_PATHS, ATLAS_SLOT_SIZE).then((tex) => {
      material.uniforms.uTexture.value = tex;
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // 4. ANIMATION LOOP — kein window.scrollY, nur cachedScrollY
    let animationFrameId: number;

    const tick = (time: number) => {
      const elapsedTime = time / 1000;
      material.uniforms.uIntro.value = Math.min(
        1,
        Math.max(0, (elapsedTime - 4.2) * 1.5)
      );

      const scrollProgress = cachedScrollY / (window.innerHeight * 3);

      const posAttr = geometry.getAttribute('position');
      const opacAttr = geometry.getAttribute('opacity');

      for (let i = 0; i < TOTAL_PARTICLES; i++) {
        const p = particleData[i];
        const rawZ = p.startZ + scrollProgress * 200;
        const wrappedZ =
          25 - (((25 - rawZ) % WRAP_LENGTH) + WRAP_LENGTH) % WRAP_LENGTH;

       

      // Partikel, die bereits durch die Kamera sind: verstecken
if (wrappedZ > 0) {
  opacAttr.setX(i, 0);
} else {
  const fadeThreshold = -6;
  const opacity = wrappedZ > fadeThreshold
    ? Math.max(0, wrappedZ / fadeThreshold)
    : 1.0;
  opacAttr.setX(i, opacity);
}

posAttr.setXYZ(i, p.x, p.y, wrappedZ);
      }

      posAttr.needsUpdate = true;
      opacAttr.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    // 5. RESIZE
    const handleResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
    };
    window.addEventListener('resize', handleResize);

    // 6. CLEANUP
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <section className="relative w-full h-[400vh] bg-transparent">
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-full flex items-center justify-center pointer-events-none z-10">
          <h1 className="text-2xl md:text-4xl font-bold tracking-[-0.02em] uppercase opacity-100 text-[#22468a] text-center">
            Postmodern
          </h1>
        </div>
      </div>
    </section>
  );
}