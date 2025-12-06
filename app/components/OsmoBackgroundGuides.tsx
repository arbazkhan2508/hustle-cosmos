import React from 'react'

const OsmoBackgroundGuides = () => {
    const radius = 1250;           // SAME as card radius
    const centerY = 1400;          // SAME as card centerY

    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">

            {/* --- CENTER VERTICAL LINE --- */}
            <div
                className="absolute left-1/2 top-0 h-full"
                style={{
                    width: "2px",
                    background:
                        "linear-gradient(to bottom, transparent, rgba(0,0,0,0.15), transparent)",
                    transform: "translateX(-50%)",
                    opacity: 0.4,
                }}
            ></div>

            {/* --- DASHED ARC UNDER CARDS --- */}
            <svg
                width="100%"
                height={centerY + radius}
                className="absolute left-0 top-0"
                style={{ opacity: 0.25 }}
            >
                <path
                    d={`
            M 0 ${centerY}
            A ${radius} ${radius} 0 0 1 ${typeof window !== "undefined" ? window.innerWidth : 1600} ${centerY}
          `}
                    fill="none"
                    stroke="rgba(0,0,0,0.25)"
                    strokeWidth="1.5"
                    strokeDasharray="12 14"
                />
            </svg>
        </div>
    );
}

export default OsmoBackgroundGuides

