import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
    const iconRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!iconRef.current) return;

        gsap.fromTo(
            iconRef.current,
            { rotate: -20, scale: 0.5, opacity: 0 },
            {
                rotate: 0,
                scale: 1,
                opacity: 1,
                duration: 1.2,
                ease: "expo.out",
                delay: 0.2,
            }
        );
    }, []);

    return (
        <section
            style={{
                width: "100%",
                paddingTop: "60px",
                paddingBottom: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
            }}
        >
            {/* MAIN HEADING */}
            <h1
                style={{
                    fontSize: "90px",
                    fontWeight: 520,
                    display: "flex",
                    alignItems: "center",
                    gap: "32px",
                    color: "#201d1d",
                }}
            >
                Dev Toolkit
                <div
                    ref={iconRef}
                    style={{
                        width: "40px",
                        height: "40px",
                        background: "#6f43ff",
                        borderRadius: "10px",
                        transform: "rotate(45deg)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "32px",
                        fontWeight: 700,
                    }}
                >
                    ✦
                </div>
                Built to Flex
            </h1>

            {/* SUB TEXT */}
            <div
                style={{
                    marginTop: "30px",
                    fontSize: "18px",
                    color: "#333",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "10px",
                    maxWidth: "600px",
                }}
            >
                <span>Platform packed with</span>

                <Tag>Webflow</Tag>
                <span>&</span>
                <Tag>HTML</Tag>

                <span>resources,</span>
                <Tag>icons</Tag>
                <Tag>easings</Tag>

                <span>and a page transition</span>

                <Tag>course</Tag>
            </div>
        </section>
    );
}

function Tag({ children }: { children: React.ReactNode }) {
    return (
        <span
            style={{
                padding: "4px 14px",
                background: "#eaeaea",
                borderRadius: "8px",
                fontSize: "18px",
                fontWeight: 500,
                color: "#333",
            }}
        >
            {children}
        </span>
    );
}