import React from 'react';
import './globals.css';
import Header3Clmn from "../components/Header3Clmn";
import FooterBigH from "../components/FooterBigH";
import CinematicPreloader from '../components/CinematicPreloader';

// 1. Inter importieren und konfigurieren
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

// 2. METADATA (Nur EINMAL erlaubt!)
export const metadata = {
  title: 'Postmodern Agency',
  description: 'Developing & designing ideas into reality.',
};

// 3. Die Layout-Komponente
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className="overscroll-none">
      <body className={`${inter.className} bg-gray-50 min-h-screen flex flex-col overscroll-none`}>
        <CinematicPreloader />
        
        <Header3Clmn />
        
        <main className="mx-auto w-full flex-grow">
          {children}
        </main>
        
        {/* === FIX: Der Footer ist jetzt völlig frei und kann 100% Breite einnehmen === */}
        <FooterBigH />

      </body>
    </html>
  );
}