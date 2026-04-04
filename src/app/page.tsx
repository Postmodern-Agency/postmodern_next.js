export default function Home() {
  return (
    <main>
      {/* DEINE ABOUT SECTION */}
      <section className="mt-24 pt-16 flex flex-col gap-16">
        
        {/* Raster-Layout: 1 Spalte Mobile, 2 Spalten Tablet, 4 Spalten Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* === BIO === */}
          <div className="col-span-1">
            <h2 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-6">
              Bio
            </h2>
            <div className="text-gray-800 text-base leading-relaxed space-y-4">
              <p>
                Lorem ipsum dolor. Lorem ipsum dolor. Hallo ich bin ein Textblock. 
                Lorem ipsum dolor. Lorem ipsum dolor. Hallo ich bin ein Textblock.
              </p>
              <p>Currently based in Melbourne, Australia.</p>
            </div>
          </div>

          {/* === PERSONAL STORY === */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <h2 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-6">
              Personal Story
            </h2>
            <div className="text-gray-800 text-base leading-relaxed space-y-4">
              <p>
                Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor.
                Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. 
                Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. 
                Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. 
              </p>
              <p>
                Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. 
                Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. 
              </p>
            </div>
          </div>

          {/* === CONNECT === */}
          <div className="col-span-1">
            <h2 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-6">
              Connect
            </h2>
            <div className="text-gray-800 text-base leading-relaxed space-y-4">
              <p>Currently unavailable for work in 2026.</p>
              <p>
                For business inquiries, email me at <br />
                <a 
                  href="mailto:info@mail.de" 
                  className="text-black font-medium hover:text-[#2a3e79] underline underline-offset-4 transition-colors"
                >
                  test@mail.de
                </a>
              </p>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}