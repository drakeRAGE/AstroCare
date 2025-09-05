import React from 'react'

const Footer = () => {
  return (
    <div>
          {/* FOOTER */}
          <footer id="contact" className="relative bg-gradient-to-r from-orange-600 to-yellow-500 text-white py-14 mt-8 overflow-hidden">
              <div className="absolute inset-0 bg-black/12 backdrop-blur-sm" />
              <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center md:text-left">
                  <div>
                      <h2 className="text-2xl font-bold tracking-wide">✨ AstroCare</h2>
                      <p className="text-sm mt-3 text-orange-100">Know yourself better with <br /> AI + Vedic Astrology.</p>
                  </div>

                  <div>
                      <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                      <ul className="space-y-2 text-orange-100">
                          <li><a href="#" className="hover:text-white transition">Your Kundali</a></li>
                          <li><a href="#" className="hover:text-white transition">Kalchakra</a></li>
                          <li><a href="#" className="hover:text-white transition">AI Horoscope</a></li>
                      </ul>
                  </div>

                  <div>
                      <h3 className="text-lg font-semibold mb-4">Connect</h3>
                      <div className="flex justify-center md:justify-start space-x-5">
                          <a href="#" className="hover:scale-110 transition" aria-label="Facebook">FB</a>
                          <a href="#" className="hover:scale-110 transition" aria-label="Twitter">TW</a>
                          <a href="#" className="hover:scale-110 transition" aria-label="Instagram">IG</a>
                          <a href="#" className="hover:scale-110 transition" aria-label="YouTube">YT</a>
                      </div>
                  </div>
              </div>

              <div className="relative border-t border-white/30 mt-10 pt-6 text-center text-sm text-orange-100">&copy; 2025 AstroCare. All rights reserved.</div>
          </footer>
    </div>
  )
}

export default Footer