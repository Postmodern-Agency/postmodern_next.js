import './globals.css';
import Header from "../components/Header";

export const metadata = {
  title: 'Postmodern Agency',
  description: 'Developing & designing ideas into reality.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="bg-gray-50 min-h-screen flex flex-col">
        <Header />
        <main className="p-6 mx-auto w-full">
          {children}
        </main>
      </body>
    </html>
  );
}