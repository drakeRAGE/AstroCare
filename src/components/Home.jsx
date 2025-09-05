import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function AstroCare() {
    
    const [form, setForm] = useState({ name: "", dob: "", time: "", place: "" });

    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        // placeholder - form would be sent to API in a real app
        alert(`Thanks ${form.name || "traveller"}! We'll generate your demo Kundali (dummy data).`);

        navigate('/kundali');
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-50 to-yellow-200 font-sans overflow-x-hidden text-gray-800">
            <style>{`
        /* --- Animations & small utilities --- */
        @keyframes float { 0%{transform:translateY(0)}50%{transform:translateY(-12px)}100%{transform:translateY(0)} }
        @keyframes float-slow { 0%{transform:translateY(0)}50%{transform:translateY(-8px)}100%{transform:translateY(0)} }
        @keyframes pulseGlow { 0%,100%{opacity:.8;transform:scale(1)}50%{opacity:1;transform:scale(1.04)} }
        @keyframes fadeUp {from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{animation:fadeUp .9s ease both}
        .float{animation:float 5s ease-in-out infinite}
        .float-slow{animation:float-slow 7s ease-in-out infinite}
        .pulseGlow{animation:pulseGlow 6s ease-in-out infinite}
        .glass { background: rgba(255,255,255,0.18); -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px); }
        .glass-strong { background: rgba(255,255,255,0.08); -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); }

        /* responsive small tweaks */
        @media (max-width:640px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>


            {/* HERO */}
            <main className="pt-24">
                <section className="relative text-center py-20 px-6 overflow-hidden">
                    {/* decorative blobs */}
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[540px] h-[540px] bg-orange-300/30 rounded-full blur-3xl pulseGlow" />
                    <div className="absolute -bottom-20 -left-10 w-[380px] h-[380px] bg-yellow-400/30 rounded-full blur-3xl float-slow" />
                    <div className="absolute -bottom-28 -right-10 w-[280px] h-[280px] bg-orange-400/25 rounded-full blur-3xl float" />

                    <div className="max-w-7xl mx-auto grid hero-grid grid-cols-2 gap-12 items-center">
                        <div className="text-left px-2">
                            <h1 className="text-5xl md:text-6xl font-extrabold text-orange-800 leading-tight drop-shadow-lg fade-up">Discover Yourself <span className="block text-3xl md:text-4xl text-orange-600 font-medium mt-2">with AI & Vedic Wisdom</span></h1>

                            <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-xl">Explore your <span className="text-orange-700 font-semibold">Kundali</span>, <span className="text-orange-700 font-semibold">Kalchakra</span> and personalized horoscope explained in plain, friendly language — supplemented by actionable tips.</p>

                            <div className="mt-8 flex flex-wrap gap-4">
                                <button className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition">Start Free Demo</button>
                                <a href="#features" className="inline-flex items-center gap-2 px-4 py-3 rounded-full border border-orange-200 hover:border-orange-300 transition">
                                    Learn More <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </a>
                            </div>

                            <div className="mt-8 flex gap-6 items-center text-sm text-gray-600">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white/60 glass flex items-center justify-center">⭐</div>
                                    <div>
                                        <div className="font-semibold">4.8/5</div>
                                        <div className="text-xs">User satisfaction</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white/60 glass flex items-center justify-center">⚡</div>
                                    <div>
                                        <div className="font-semibold">Fast results</div>
                                        <div className="text-xs">Generate in seconds</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right side: demo form / card */}
                        <div className="mx-auto w-full max-w-md glass rounded-3xl p-6 shadow-2xl border border-white/20">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h4 className="text-lg font-semibold text-orange-700">Quick Kundali Demo</h4>
                                    <p className="text-sm text-gray-600">Enter a few details — we’ll show a demo (dummy) reading.</p>
                                </div>
                                <div className="text-yellow-400 text-2xl">✨</div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">Full name</label>
                                    <input name="name" value={form.name} onChange={handleChange} className="mt-2 w-full px-4 py-2 rounded-lg glass-strong border border-white/10 text-sm" placeholder="e.g. Asha Sharma" />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-sm font-medium">Date of birth</label>
                                        <input name="dob" value={form.dob} onChange={handleChange} type="date" className="mt-2 w-full px-3 py-2 rounded-lg glass-strong border border-white/10 text-sm" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Time</label>
                                        <input name="time" value={form.time} onChange={handleChange} type="time" className="mt-2 w-full px-3 py-2 rounded-lg glass-strong border border-white/10 text-sm" />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium">Place</label>
                                    <input name="place" value={form.place} onChange={handleChange} placeholder="City, Country" className="mt-2 w-full px-4 py-2 rounded-lg glass-strong border border-white/10 text-sm" />
                                </div>

                                <div className="flex gap-3">
                                    <button type="submit" className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-4 py-2 rounded-full font-semibold hover:scale-105 transition">Generate Demo</button>
                                    <button type="button" onClick={() => setForm({ name: "", dob: "", time: "", place: "" })} className="flex-1 border border-white/20 rounded-full px-4 py-2">Reset</button>
                                </div>

                                <div className="text-xs text-gray-500">This demo uses dummy data. Accurate charts require exact birth details and time zone handling.</div>
                            </form>

                            <div className="mt-4 text-sm text-gray-600 border-t border-white/10 pt-3">Suggested: try random DOBs to see different sample insights.</div>
                        </div>
                    </div>
                </section>

                {/* FEATURES */}
                <section className="relative max-w-7xl mx-auto py-24 px-6">
                    <h2 className="text-center text-4xl md:text-5xl font-bold text-orange-700 mb-16">
                        ✨ Discover Yourself with Astrology
                    </h2>

                    <div className="grid md:grid-cols-3 gap-12">
                        <div
                            className="relative group backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-10 text-center transform transition duration-500 hover:scale-105 hover:shadow-orange-200/50 animate-[fadeUp_1s_ease-in-out]">

                            <div
                                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-orange-500/20 opacity-0 group-hover:opacity-100 blur-2xl transition">
                            </div>

                            <h3 className="relative text-3xl font-semibold text-orange-700 mb-4">🌀 Your Kundali</h3>
                            <p className="relative text-gray-800">
                                Enter your birth details and see your Kundali explained in
                                <span className="text-orange-600 font-medium">easy words</span> that anyone can understand.
                            </p>
                        </div>

                        <div
                            className="relative group backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-10 text-center transform transition duration-500 hover:scale-105 hover:shadow-orange-200/50 animate-[fadeUp_1s_ease-in-out] [animation-delay:0.2s]">
                            <div
                                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-400/20 to-pink-500/20 opacity-0 group-hover:opacity-100 blur-2xl transition">
                            </div>

                            <h3 className="relative text-3xl font-semibold text-orange-700 mb-4">🌌 Kalchakra</h3>
                            <p className="relative text-gray-800">
                                Explore your life cycle and energies — no complex charts, just
                                <span className="text-orange-600 font-medium">clear insights</span> you can feel.
                            </p>
                        </div>

                        <div
                            className="relative group backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-10 text-center transform transition duration-500 hover:scale-105 hover:shadow-orange-200/50 animate-[fadeUp_1s_ease-in-out] [animation-delay:0.4s]">
                            <div
                                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-400/20 to-red-500/20 opacity-0 group-hover:opacity-100 blur-2xl transition">
                            </div>

                            <h3 className="relative text-3xl font-semibold text-orange-700 mb-4">🔮 AI Horoscope</h3>
                            <p className="relative text-gray-800">
                                Daily, weekly & monthly horoscope in
                                <span className="text-orange-600 font-medium">fun, simple language</span> you’ll actually enjoy reading.
                            </p>
                        </div>
                    </div>
                </section>

                {/* TESTIMONIALS */}
                <section className="bg-gradient-to-r from-orange-50 to-yellow-100 py-16">
                    <div className="max-w-5xl mx-auto px-6 text-center">
                        <h4 className="text-2xl font-semibold text-orange-700 mb-6">Loved by curious minds</h4>
                        <div className="grid md:grid-cols-3 gap-6">
                            <Testimonial name="Priya" text="Easy to understand — I actually followed the advice and it helped!" />
                            <Testimonial name="Rajat" text="Beautiful UI and quick demo. Recommended for beginners." />
                            <Testimonial name="Meera" text="Cute, magical, and surprisingly accurate on timing." />
                        </div>
                    </div>
                </section>

                {/* ABOUT & CTA */}
                <section id="about" className="max-w-7xl mx-auto px-6 py-20">
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <div>
                            <h3 className="text-3xl font-bold text-orange-700 mb-4">Why AstroCare?</h3>
                            <p className="text-lg text-gray-700 mb-6">We blend time-tested Vedic ideas with modern AI to make astrology approachable. No jargon — just clear suggestions you can use today.</p>
                            <ul className="list-disc pl-5 text-gray-700 space-y-2">
                                <li>Plain-language readings for every user</li>
                                <li>Practical daily actions — not vague predictions</li>
                                <li>Privacy-first: data stays with you (demo is client-side)</li>
                            </ul>
                            <div className="mt-6">
                                <button className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-6 py-3 rounded-full shadow-lg">Get Started</button>
                            </div>
                        </div>

                        <div>
                            <div className="glass rounded-2xl p-6 shadow-lg">
                                <h5 className="font-semibold text-orange-700">Sample Insight</h5>
                                <p className="mt-3 text-sm text-gray-700">"This period is great for learning new skills — allocate 30 minutes daily. Favor calm mornings for important talks."</p>
                                <div className="mt-4 text-xs text-gray-500">(Example generated from demo data.)</div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            
        </div>
    );
}


/* --- Small presentational subcomponents below (kept in same file for convenience) --- */

function Card({ icon, title, text }) {
    return (
        <div className="group">
            <div className="glass rounded-3xl p-6 shadow-lg border border-white/10 hover:border-white/20 transition transform hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl hover:backdrop-brightness-110">
                <div className="flex items-start gap-4">
                    <div className="text-4xl bg-white/10 rounded-lg p-3 flex items-center justify-center min-w-[56px] min-h-[56px] group-hover:bg-white/20 transition">
                        {icon}
                    </div>
                    <div>
                        <h5 className="font-semibold text-orange-700 mb-1">{title}</h5>
                        <p className="text-sm text-gray-700 max-w-xs">{text}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Testimonial({ name, text }) {
    return (
        <div className="group">
            <div className="glass rounded-2xl p-6 shadow border border-white/8 hover:border-white/20 transition transform hover:-translate-y-1 hover:shadow-xl">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 rounded-full bg-white/30 flex items-center justify-center text-xl group-hover:bg-white/40 transition">👤</div>
                    <div>
                        <div className="font-semibold">{name}</div>
                        <div className="text-xs text-gray-600">Verified user</div>
                    </div>
                </div>
                <p className="text-sm text-gray-700 italic">“{text}”</p>
            </div>
        </div>
    );
}
