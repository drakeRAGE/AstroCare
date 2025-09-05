// pages/KundaliPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; // adjust path as needed
import KundaliWithPlanets from "./KundaliWithPlanets"; // adjust path as needed

// duplicate of the same demo planet mapping used by the canvas component
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
    const navigate = useNavigate();
    const [planetsMap, setPlanetsMap] = useState(DEMO_PLANETS);
    const [selectedHouse, setSelectedHouse] = useState(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (copied) {
            const id = setTimeout(() => setCopied(false), 2000);
            return () => clearTimeout(id);
        }
    }, [copied]);

    // Attempts to find the Kundali canvas by aria-label (keeps component unchanged).
    // If your canvas markup differs, change the selector to match it.
    function findKundaliCanvas() {
        return document.querySelector('canvas[aria-label="Kundali chart"]') || document.querySelector("canvas");
    }

    async function downloadCanvasPNG() {
        const canvas = findKundaliCanvas();
        if (!canvas) {
            alert("Kundali canvas not found on the page.");
            return;
        }

        // Use toBlob for better memory handling; convert to object URL and download
        // Note: canvas must be same-origin (it is, since it's drawn locally).
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
    }

    function copyJson() {
        const json = JSON.stringify(planetsMap, null, 2);
        navigator.clipboard
            .writeText(json)
            .then(() => setCopied(true))
            .catch(() => alert("Copy failed — permission denied or unsupported browser."));
    }

    function saveSampleJson() {
        const json = JSON.stringify(planetsMap, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "kundali-planets-sample.json";
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    }

    function handleHouseClick(houseNum) {
        setSelectedHouse(houseNum);
        // optional: find and highlight house on canvas in future (would require exposing API from the canvas)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-50 to-yellow-200 text-gray-800 font-sans">
            <Navbar />

            {/* HERO / Page head */}
            <header className="pt-20 pb-8">
                <div className="max-w-6xl mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-orange-800">Your Kundali</h1>
                    <p className="mt-2 text-gray-700 max-w-2xl">Interactive Kundali viewer — main focus is the chart. Use the side panel for details, export & quick actions.</p>
                </div>
            </header>

            {/* MAIN */}
            <main className="max-w-7xl mx-auto px-6 pb-20">
                <div className="grid md:grid-cols-3 gap-8 items-start">
                    {/* Left: big canvas & minimal controls */}
                    <div className="md:col-span-2">
                        <div className="glass rounded-2xl p-6 shadow-lg border border-white/10">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h2 className="text-lg font-semibold text-orange-700">Kundali Viewer</h2>
                                    <div className="text-sm text-gray-600">Interactive chart — click houses on the chart to view planets (canvas handles clicks).</div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button onClick={downloadCanvasPNG} className="px-4 py-2 rounded-full bg-orange-500 text-white text-sm hover:scale-105 transition">Download PNG</button>
                                    <button onClick={() => navigate("/")} className="px-4 py-2 rounded-full border border-white/20 text-sm">Back Home</button>
                                </div>
                            </div>

                            {/* Canvas component stays unchanged */}
                            <div className="w-full flex justify-center">
                                <div className="w-full max-w-[720px]">
                                    <KundaliWithPlanets />
                                </div>
                            </div>

                            <div className="mt-4 text-xs text-gray-500">Note: the chart is rendered client-side. For accurate Kundali you must pass exact birth coordinates + timezone and call a planetary ephemeris API (not enabled in demo).</div>
                        </div>
                    </div>

                    {/* Right: info, houses, export */}
                    <aside className="space-y-6">
                        {/* Planets by house */}
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
                                            className="text-left p-2 rounded-lg hover:bg-white/10 transition border border-white/6">
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

                        {/* Selected house detail */}
                        <div className="glass rounded-2xl p-5 shadow-lg border border-white/10">
                            <h4 className="text-orange-700 font-semibold mb-2">House Details</h4>
                            {selectedHouse ? (
                                <>
                                    <div className="text-sm mb-2">House <span className="font-semibold">{selectedHouse}</span></div>
                                    <div className="text-sm text-gray-700 mb-3">
                                        Planets: <span className="font-medium">{(planetsMap[selectedHouse] || []).join(", ") || "—"}</span>
                                    </div>
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

                        {/* Export / utilities */}
                        <div className="glass rounded-2xl p-5 shadow-lg border border-white/10">
                            <h4 className="text-orange-700 font-semibold mb-3">Export & Utilities</h4>
                            <div className="flex flex-col gap-3">
                                <button onClick={downloadCanvasPNG} className="w-full px-3 py-2 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white">Download Chart PNG</button>
                                <button onClick={copyJson} className="w-full px-3 py-2 rounded-full border border-white/10 text-sm">{copied ? "Copied ✓" : "Copy planets JSON"}</button>
                                <button onClick={saveSampleJson} className="w-full px-3 py-2 rounded-full border border-white/10 text-sm">Save sample JSON</button>
                                <button onClick={() => alert("This demo does not call a live API. In production you can call your ephemeris API and update the chart mapping.")}
                                    className="w-full px-3 py-2 rounded-full text-sm">Fetch live planetary positions (demo)</button>
                            </div>
                        </div>

                        {/* Quick notes */}
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

            {/* small footer */}
            <footer className="py-8 text-center text-sm text-gray-600">
                &copy; 2025 AstroCare — Kundali demo (client-side).
            </footer>
        </div>
    );
}
