import React, { useEffect, useRef, useCallback } from "react";

/**
 * Kundali.jsx
 * React + Tailwind component — responsive canvas drawing with correct DPR handling
 * Fixes: planets not visible at certain zoom levels by using a fixed logical drawing size (size)
 * and mapping all coordinates / click events to that logical size. Fonts and positions scale
 * with the logical size so the layout stays consistent across zoom / DPR / container resizing.
 */

const SIZE = 600; // logical drawing size in px (0..SIZE corresponds to 0..100%)

const PLANETS = {
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

const HOUSE_CENTERS = {
    1: { x: 50, y: 25 },
    2: { x: 25, y: 12 },
    3: { x: 12, y: 25 },
    4: { x: 25, y: 50 },
    5: { x: 12, y: 75 },
    6: { x: 25, y: 88 },
    7: { x: 50, y: 75 },
    8: { x: 75, y: 88 },
    9: { x: 88, y: 75 },
    10: { x: 75, y: 50 },
    11: { x: 88, y: 25 },
    12: { x: 75, y: 12 },
};

export default function Kundali() {
    const canvasRef = useRef(null);
    const planetsRef = useRef(PLANETS);
    const houseCentersRef = useRef(HOUSE_CENTERS);

    // helper: percent (0..100) -> logical px (0..SIZE)
    const p2x = (p) => (p / 100) * SIZE;
    const p2y = (p) => (p / 100) * SIZE;

    const drawTriangleHouse = (ctx, x1, y1, x2, y2, x3, y3) => {
        ctx.beginPath();
        ctx.moveTo(p2x(x1), p2y(y1));
        ctx.lineTo(p2x(x2), p2y(y2));
        ctx.lineTo(p2x(x3), p2y(y3));
        ctx.closePath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#666666";
        ctx.stroke();
    };

    const drawSquareHouse = (ctx, x1, y1, x2, y2, x3, y3, x4, y4) => {
        ctx.beginPath();
        ctx.moveTo(p2x(x1), p2y(y1));
        ctx.lineTo(p2x(x2), p2y(y2));
        ctx.lineTo(p2x(x3), p2y(y3));
        ctx.lineTo(p2x(x4), p2y(y4));
        ctx.closePath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#666666";
        ctx.stroke();
    };

    const setText = (ctx, x, y, text) => {
        // scale font relative to SIZE so it looks the same when canvas scales via CSS
        ctx.font = `${Math.round(SIZE * 0.026)}px Comic Sans MS`;
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, p2x(x), p2y(y));
    };

    const drawAllPlanets = (ctx) => {
        ctx.save();
        ctx.font = `${Math.round(SIZE * 0.02)}px Arial`;
        ctx.textAlign = "center";
        ctx.fillStyle = "#0b3d91";

        const mapping = planetsRef.current;
        for (const [houseStr, center] of Object.entries(houseCentersRef.current)) {
            const house = parseInt(houseStr, 10);
            const planets = mapping[house] || [];
            if (planets.length === 0) continue;

            const startX = p2x(center.x);
            let startY = p2y(center.y) + (SIZE * 0.033); // offset below house number
            const lineHeight = SIZE * 0.023;
            planets.forEach((p, idx) => {
                ctx.fillText(p, startX, startY + idx * lineHeight);
            });
        }

        ctx.restore();
    };

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        // Responsive CSS size: width = container width (minus small padding)
        const parentW = canvas.parentElement.offsetWidth;
        canvas.style.width = `${parentW - 8}px`;
        canvas.style.height = `${parentW - 8}px`;

        // Pixel ratio handling: keep internal resolution = SIZE * DPR, but draw in logical coords 0..SIZE
        const dpr = window.devicePixelRatio || 1;
        canvas.width = Math.round(SIZE * dpr);
        canvas.height = Math.round(SIZE * dpr);

        // Map logical coordinates to device pixels with a single transform
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        // Clear logical drawing area
        ctx.clearRect(0, 0, SIZE, SIZE);

        // Draw houses using logical SIZE coordinates
        drawTriangleHouse(ctx, 50, 0, 0, 50, 25, 25);

        drawSquareHouse(ctx, 50, 0, 75, 25, 50, 50, 25, 25);
        setText(ctx, 50, 25, "1");

        drawTriangleHouse(ctx, 0, 0, 50, 0, 25, 25);
        setText(ctx, 25, 12, "2");

        drawTriangleHouse(ctx, 0, 0, 25, 25, 0, 50);
        setText(ctx, 12, 25, "3");

        drawSquareHouse(ctx, 25, 25, 50, 50, 25, 75, 0, 50);
        setText(ctx, 25, 50, "4");

        drawTriangleHouse(ctx, 0, 50, 25, 75, 0, 100);
        setText(ctx, 12, 75, "5");

        drawTriangleHouse(ctx, 25, 75, 50, 100, 0, 100);
        setText(ctx, 25, 88, "6");

        drawSquareHouse(ctx, 50, 50, 75, 75, 50, 100, 25, 75);
        setText(ctx, 50, 75, "7");

        drawTriangleHouse(ctx, 75, 75, 100, 100, 50, 100);
        setText(ctx, 75, 88, "8");

        drawTriangleHouse(ctx, 75, 75, 100, 50, 100, 100);
        setText(ctx, 88, 75, "9");

        drawSquareHouse(ctx, 75, 25, 100, 50, 75, 75, 50, 50);
        setText(ctx, 75, 50, "10");

        drawTriangleHouse(ctx, 100, 0, 100, 50, 75, 25);
        setText(ctx, 88, 25, "11");

        drawTriangleHouse(ctx, 50, 0, 100, 0, 75, 25);
        setText(ctx, 75, 12, "12");

        // Planets
        drawAllPlanets(ctx);
    }, []);

    useEffect(() => {
        draw();
        // redraw on resize
        const onResize = () => draw();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [draw]);

    // Click mapping: client -> logical 0..SIZE coordinates -> percent
    const onCanvasClick = (e) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();

        // rect.width is the CSS width in px (what user sees)
        const cssWidth = rect.width;

        // scale factor from CSS px -> logical SIZE px
        const scale = SIZE / cssWidth;

        const cx = (e.clientX - rect.left) * scale;
        const cy = (e.clientY - rect.top) * scale;

        const px = (cx / SIZE) * 100;
        const py = (cy / SIZE) * 100;

        let nearest = null;
        let bestDist = Infinity;
        for (const [houseStr, c] of Object.entries(houseCentersRef.current)) {
            const dx = px - c.x;
            const dy = py - c.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < bestDist) {
                bestDist = d;
                nearest = houseStr;
            }
        }

        if (nearest) {
            const houseNum = parseInt(nearest, 10);
            const planets = planetsRef.current[houseNum] || [];
            alert("House " + houseNum + "\nPlanets: " + (planets.join(", ") || "—"));
        }
    };

    return (
        <div className="max-w-[600px] mx-auto p-3">
            <canvas
                ref={canvasRef}
                onClick={onCanvasClick}
                className="border border-gray-200 bg-white w-full h-auto block"
                role="img"
                aria-label="Kundali chart"
                style={{ touchAction: "manipulation" }}
            />
            <div className="text-gray-600 text-sm mt-2">Click a house to log its planets (demo). To fetch live data, call your API and update planetsRef.current then call draw().</div>
        </div>
    );
}
