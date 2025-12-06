"use client";

const BackgroundGuides = () => {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">

            {/* CENTER VERTICAL LINE */}
            <div
                className="absolute left-1/2 top-0 h-full"
                style={{
                    width: "2px",
                    background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.15), transparent)",
                    transform: "translateX(-50%)",
                    opacity: 0.4,
                }}
            ></div>

            {/* RADIAL ARC LINES */}
            <svg
                width="100%"
                height="2000px"
                className="absolute left-0 top-[300px]"
                style={{ opacity: 0.18 }}
            >
                {Array.from({ length: 22 }).map((_, i) => {
                    const radius = 800 + i * 45; // spacing between arcs

                    return (
                        <path
                            key={i}
                            d={`
                M 0 ${radius}
                A ${radius} ${radius} 0 0 1 ${typeof window !== "undefined" ? window.innerWidth : 1600} ${radius}
              `}
                            fill="none"
                            stroke="rgba(0,0,0,0.15)"
                            strokeWidth="1"
                            strokeDasharray="6 10"
                        />
                    );
                })}
            </svg>
        </div>
    )
}

export default BackgroundGuides;