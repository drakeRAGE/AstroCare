import React, { useState } from 'react'

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div>

          {/* NAVBAR */}
          <header className="fixed inset-x-0 top-0 z-30 glass shadow-md">
              <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                      <div className="text-2xl">🔮</div>
                      <div>
                          <div className="text-xl font-bold text-orange-700">AstroCare</div>
                          <div className="text-xs text-orange-600">AI + Vedic Astrology</div>
                      </div>
                  </div>

                  <nav className="hidden md:flex items-center gap-8 text-orange-800 font-medium">
                      <a href="/" className="hover:text-orange-600 transition">Home</a>
                      <a href="#features" className="hover:text-orange-600 transition">Discover</a>
                      <a href="#about" className="hover:text-orange-600 transition">About</a>
                      <a href="#contact" className="hover:text-orange-600 transition">Contact</a>
                      <button className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-4 py-2 rounded-full shadow-md hover:scale-105 transition">Try Now</button>
                  </nav>

                  {/* Mobile menu toggle */}
                  <div className="md:hidden">
                      <button aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-md glass-strong">
                          {menuOpen ? (
                              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          ) : (
                              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          )}
                      </button>
                  </div>
              </div>

              {/* Mobile menu panel */}
              {menuOpen && (
                  <div className="md:hidden px-6 pb-6 glass-strong shadow-inner">
                      <div className="flex flex-col gap-3 py-2">
                          <a href="/" className="block py-2">Home</a>
                          <a href="#features" className="block py-2">Discover</a>
                          <a href="#about" className="block py-2">About</a>
                          <a href="#contact" className="block py-2">Contact</a>
                          <button className="mt-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-4 py-2 rounded-full">Try Now</button>
                      </div>
                  </div>
              )}
          </header>
    </div>
  )
}

export default Navbar