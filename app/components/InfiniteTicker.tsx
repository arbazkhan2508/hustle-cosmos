import { useEffect, useRef } from "react";
import gsap from "gsap";

interface TickerProps {
    text: string;
}

export default function InfiniteTicker({ text }: TickerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const content = contentRef.current;

        if (!container || !content) return;

        // Duplicate text until it fills the screen
        const clone = content.cloneNode(true);
        container.appendChild(clone);

        // GSAP infinite loop
        const width = content.offsetWidth;

        gsap.to(container, {
            x: -width,
            duration: 100,
            repeat: -1,
            ease: "none"
        });

    }, []);

    return (
        <div
            style={{
                width: "100%",
                overflow: "hidden",
                whiteSpace: "nowrap",
                background: "#a1ff62", // neon green
                padding: "4px 0",
            }}
        >
            <div
                ref={containerRef}
                style={{
                    display: "flex",
                    position: "relative",
                }}
            >
                <div
                    ref={contentRef}
                    style={{
                        display: "flex",
                        gap: "40px",
                        fontSize: "10px",
                        fontWeight: "400",
                        letterSpacing: "0.5px",
                        color: "#000000",
                        alignItems: "center",
                    }}
                >
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div
                            key={i}
                            style={{ display: "flex", alignItems: "center", gap: "40px" }}
                        >
                            <span>{text}</span>
                            <span>✦</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}