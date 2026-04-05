import './globals.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
// 1. Inter importieren
import { Inter } from 'next/font/google';

// 2. Inter konfigurieren (Ohne 'weight', da es eine Variable Font ist!)
const inter = Inter({ 
  subsets: ['latin'],
  // Wir lassen 'weight' komplett weg, Next.js macht den Rest automatisch.
});

export const metadata = {
  title: 'Postmodern Agency',
  description: 'Developing & designing ideas into reality.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className="overscroll-none">
      {/* 3. inter.className anwenden */}
      <body className={`${inter.className} bg-gray-50 min-h-screen flex flex-col overscroll-none`}>
        <Header />
        
        <main className="p-6 mx-auto w-full flex-grow">
          {children}
        </main>
        
        <div className="px-6 mx-auto w-full">
          <Footer />
        </div>

      </body>
    </html>
  );
}