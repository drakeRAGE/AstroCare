// pages/KundaliPage.jsx
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar"; // adjust path as needed
import Kundali from "./Kundali"; // adjust path as needed

const DEMO_PLANETS = {
    1: ["Sun", "Rahu"],
    2: ["Moon"],
    3: ["Mars", "Mercury"],
    4: ["Jupiter"],
    5: ["Venus"],
    6: ["Saturn"],
    7: ["Ketu"],
    8: ["Mercury"],
    9: ["Jupiter"],
    10: ["Saturn"],
    11: ["Mars"],
    12: ["Venus", "Moon"],
};

export default function KundaliPage() {
    // NOTE: removed useNavigate to avoid crashes when Router is missing.
    const [planetsMap, setPlanetsMap] = useState(DEMO_PLANETS);
    const [selectedHouse, setSelectedHouse] = useState(null);
    const [copied, setCopied] = useState(false);
    const [panelOpen, setPanelOpen] = useState(true); // controls right-side panel on small screens

    useEffect(() => {
        if (copied) {
            const id = setTimeout(() => setCopied(false), 2000);
            return () => clearTimeout(id);
        }
    }, [copied]);

    function findKundaliCanvas() {
        return document.querySelector('canvas[aria-label="Kundali chart"]') || document.querySelector("canvas");
    }

    function downloadCanvasPNG() {
        const canvas = findKundaliCanvas();
        if (!canvas) {
            alert("Kundali canvas not found on the page.");
            return;
        }

        try {
            canvas.toBlob((blob) => {
                if (!blob) {
                    alert("Could not create image blob.");
                    return;
                }
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `kundali-${new Date().toISOString().slice(0, 10)}.png`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(url);
            }, "image/png");
        } catch (err) {
            alert("Export failed: " + err.message);
        }
    }

    function copyJson() {
        const json = JSON.stringify(planetsMap, null, 2);
        if (!navigator.clipboard) {
            const ta = document.createElement("textarea");
            ta.value = json;
            document.body.appendChild(ta);
            ta.select();
            try {
                document.execCommand("copy");
                setCopied(true);
            } catch (err) {
                alert("Copy failed.");
            }
            ta.remove();
            return;
        }

        navigator.clipboard
            .writeText(json)
            .then(() => setCopied(true))
            .catch(() => alert("Copy failed — permission denied or unsupported browser."));
    }

    function saveSampleJson() {
        const json = JSON.stringify(planetsMap, null, 2);
        try {
            const blob = new Blob([json], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "kundali-planets-sample.json";
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        } catch (err) {
            alert("Save failed: " + err.message);
        }
    }

    function handleHouseClick(houseNum) {
        setSelectedHouse(houseNum);
    }

    return (
        <div className="min-h-screen pt-24 bg-gradient-to-br from-yellow-100 via-orange-50 to-yellow-200 text-gray-800 font-sans">
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
            <main className="max-w-7xl mx-auto px-6 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    <div className="md:col-span-2">
                        <div className="glass rounded-2xl p-6 shadow-lg border border-white/10">
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-3">
                                <div>
                                    <h2 className="text-lg font-semibold text-orange-700">Kundali Viewer</h2>
                                    <div className="text-sm text-gray-600">Interactive chart — click houses on the chart to view planets (canvas handles clicks).</div>
                                </div>

                                <div className="flex items-center gap-3 w-full md:w-auto">
                                    <button onClick={downloadCanvasPNG} className="w-full md:w-auto px-4 py-2 rounded-full bg-orange-500 text-white text-sm hover:scale-105 transition">Download PNG</button>
                                    <button onClick={() => (window.location.href = "/")} className="w-full md:w-auto px-4 py-2 rounded-full border border-white/20 text-sm">Back Home</button>
                                </div>
                            </div>

                            <div className="w-full flex justify-center">
                                <div className="w-full max-w-[720px]">
                                    <Kundali planets={planetsMap} />
                                </div>
                            </div>

                            <div className="mt-4 text-xs text-gray-500">Note: the chart is rendered client-side. For accurate Kundali you must pass exact birth coordinates + timezone and call a planetary ephemeris API (not enabled in demo).</div>
                        </div>
                    </div>

                    {/* Right panel - collapsible on small screens */}
                    <aside className={`space-y-6 transition-all ${panelOpen ? "block" : "hidden"} md:block`}>
                        <div className="glass rounded-2xl p-5 shadow-lg border border-white/10">
                            <h3 className="text-orange-700 font-semibold mb-3">Planets by House</h3>
                            <div className="grid grid-cols-3 gap-2">
                                {Array.from({ length: 12 }).map((_, i) => {
                                    const house = i + 1;
                                    const planets = planetsMap[house] || [];
                                    return (
                                        <button
                                            key={house}
                                            onClick={() => handleHouseClick(house)}
                                            className="text-left p-2 rounded-lg hover:bg-white/10 transition border border-white/6"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="font-medium">House {house}</div>
                                                <div className="text-xs text-gray-400">{planets.length}</div>
                                            </div>
                                            <div className="text-xs text-gray-500 truncate">{planets.join(", ") || "—"}</div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="glass rounded-2xl p-5 shadow-lg border border-white/10">
                            <h4 className="text-orange-700 font-semibold mb-2">House Details</h4>
                            {selectedHouse ? (
                                <>
                                    <div className="text-sm mb-2">House <span className="font-semibold">{selectedHouse}</span></div>
                                    <div className="text-sm text-gray-700 mb-3">Planets: <span className="font-medium">{(planetsMap[selectedHouse] || []).join(", ") || "—"}</span></div>
                                    <div className="text-xs text-gray-500">Tip: Click a house on the chart or here to inspect planets. For real data use a planetary API and update the chart mapping.</div>
                                    <div className="mt-3 flex gap-2">
                                        <button className="px-3 py-2 rounded-md bg-orange-500 text-white text-sm" onClick={() => alert("Open deeper reading (not implemented in demo).")}>Open Reading</button>
                                        <button className="px-3 py-2 rounded-md border border-white/20 text-sm" onClick={() => setSelectedHouse(null)}>Clear</button>
                                    </div>
                                </>
                            ) : (
                                <div className="text-sm text-gray-600">Select a house to view planets and sample notes.</div>
                            )}
                        </div>

                        <div className="glass rounded-2xl p-5 shadow-lg border border-white/10">
                            <h4 className="text-orange-700 font-semibold mb-3">Export & Utilities</h4>
                            <div className="flex flex-col gap-3">
                                <button onClick={downloadCanvasPNG} className="w-full px-3 py-2 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white">Download Chart PNG</button>
                                <button onClick={copyJson} className="w-full px-3 py-2 rounded-full border border-white/10 text-sm">{copied ? "Copied ✓" : "Copy planets JSON"}</button>
                                <button onClick={saveSampleJson} className="w-full px-3 py-2 rounded-full border border-white/10 text-sm">Save sample JSON</button>
                                <button onClick={() => alert("This demo does not call a live API. In production you can call your ephemeris API and update the chart mapping.")} className="w-full px-3 py-2 rounded-full text-sm">Fetch live planetary positions (demo)</button>
                            </div>
                        </div>

                        <div className="glass rounded-2xl p-4 text-xs text-gray-600 border border-white/8">
                            <strong>Quick notes</strong>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>Chart in this demo uses dummy planet placements.</li>
                                <li>For real Kundali: exact birth time + lat/lon + timezone are required.</li>
                                <li>Canvas interactions (click on house) are handled inside the canvas component.</li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </main>

        </div>
    );
}