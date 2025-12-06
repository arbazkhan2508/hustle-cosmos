"use client";

export default function BackgroundGuides() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden -z-1">
            {/* === CENTER VERTICAL LINE (FULL HEIGHT) === */}
            <div
                className="absolute left-1/2 top-0"
                style={{
                    width: "1.5px",
                    height: "100%",
                    transform: "translateX(-50%)",
                    background:
                        "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.22), rgba(0,0,0,0))",
                    opacity: 0.55,
                }}
            />
        </div>
    );
}