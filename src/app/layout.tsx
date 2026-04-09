import React from 'react';
import './globals.css';
import Header3Clmn from "../components/Header3Clmn";
import Footer from "../components/Footer";

// 1. Inter importieren und konfigurieren
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

// 2. METADATA (Nur EINMAL erlaubt!)
// Ich habe hier die Daten deiner "Postmodern Agency" behalten, da das besser passt.
export const metadata = {
  title: 'Postmodern Agency',
  description: 'Developing & designing ideas into reality.',
};

// 3. Die Layout-Komponente
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className="overscroll-none">
      <body className={`${inter.className} bg-gray-50 min-h-screen flex flex-col overscroll-none`}>
        
        <Header3Clmn />
        
        <main className="mx-auto w-full flex-grow">
          {children}
        </main>
        
        <div className="px-6 mx-auto w-full">
          <Footer />
        </div>

      </body>
    </html>
  );
}